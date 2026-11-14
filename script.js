const MAGIC_COLOR_OPTIONS = [
    "139 BLACK", "140 WHITE", "101 CLEAR", "126 MEDIUM GREY", "124 STONE GREY", "129 METALLIC BLACK", "193 BRIGHT GREEN", "176 NASA GREEN", "144 ULTRA VIOLET",
    "184 BLACK DOFF", "115 IVORY", "110 CLEAR DOFF", "143 COKLAT MUDA", "177 MADORAS BROWN", "174 BOXER ORANGE", "112 METALLIC YELLOW", "116 PLASMA BLUE", "172 FEDERAL BLUE",
    "111 ELECTRIC GREEN", "114 ORANGE", "127 SOFT PINK", "141 YELLOW", "131 DARK YELLOW", "190 METALLIC RED", "180 SILVER METALLIC", "136 SILVER", "189 GOLD",
    "173 NINJA GREEN", "123 SIGNAL RED", "119 SKY BLUE", "121 OCEAN BLUE", "102 INDIGO BLUE", "145 LIGHT PURPLE", "183 ZONA BLUE", "165 GREY METALLIC", "199 METALLIC BROWN",
    "137 GRASS GREEN", "138 MAROON", "118 PURPLE ANGEL", "157 BELL FLOWER", "154 DEEP BLUE", "MC 10 CANDY TONE RED", "MC 11 CANDY TONE YELLOW", "191 PEARL WHITE", "150 BRONZE",
    "147 BALTIC WHITE", "13 - DARK GREEN", "160 TOSCA", "182 GULL YELLOW", "156 ATLANTIS BLUE", "122 ARMY GREEN", "MC 12 CANDY TONE BLUE", "MC 13 CANDY TONE GREEN", "PRIMER GREY 120"
];

// ================= TEMA (TERANG / GELAP) =================
function applyTheme(theme) {
    const dark = theme === 'dark';
    document.documentElement.classList.toggle('dark', dark);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.innerHTML = `<i class="fa-solid ${dark ? 'fa-sun' : 'fa-moon'}"></i>`;
        btn.title = dark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap';
    });
}

function toggleTheme() {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    try { localStorage.setItem('app_theme', next); } catch (e) { /* abaikan */ }
    applyTheme(next);
}

// Sinkronkan ikon dengan tema awal; bila belum memilih manual, ikuti pengaturan sistem.
applyTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
if (window.matchMedia) {
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = (e) => {
        let saved = null;
        try { saved = localStorage.getItem('app_theme'); } catch (err) { /* abaikan */ }
        if (!saved) applyTheme(e.matches ? 'dark' : 'light');
    };
    if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
}

// ================= HELPER UMUM =================
const byId = (id) => document.getElementById(id);

function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function pad2(n) { return String(n).padStart(2, '0'); }

// Tanggal LOKAL (YYYY-MM-DD) dari string ISO / Date. Dipakai untuk semua filter tanggal,
// karena toISOString() memakai UTC sehingga pesanan dini hari WIB bisa "mundur" sehari.
function toLocalDateStr(input) {
    const d = input instanceof Date ? input : new Date(input);
    if (isNaN(d.getTime())) return '';
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

// Awal & akhir bulan berjalan (format YYYY-MM-DD, tanggal lokal) dan namanya.
function getBulanIniRange() {
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth();
    return {
        dari: toLocalDateStr(new Date(y, m, 1)),
        sampai: toLocalDateStr(new Date(y, m + 1, 0)),
        nama: now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    };
}

// ================= KONEKSI SUPABASE =================
let sb = null;
try {
    if (window.supabase && window.APP_CONFIG && window.APP_CONFIG.SUPABASE_URL && window.APP_CONFIG.SUPABASE_ANON_KEY) {
        sb = window.supabase.createClient(window.APP_CONFIG.SUPABASE_URL, window.APP_CONFIG.SUPABASE_ANON_KEY);
    }
} catch (e) {
    console.error('Supabase belum siap:', e);
}

// Login memakai username; Supabase Auth memakai email, jadi username dipetakan ke email internal.
const EMAIL_DOMAIN = 'po-salesman.app';
const usernameToEmail = (u) => `${String(u).trim().toLowerCase()}@${EMAIL_DOMAIN}`;

// Kolom tambahan pada tabel pesanan. Bila kolom belum ada di database, pesanan yang tidak
// memakai kolom itu tetap bisa disimpan; mengisinya akan menampilkan pesan pengingat migrasi.
const PESANAN_EXTRA = { catatan: 'catatan', noOrder: 'no_order', kodeSalesman: 'kode_salesman', pembayaran: 'pembayaran', parafToko: 'paraf_toko' };
const extraSupported = { catatan: true, no_order: true, kode_salesman: true, pembayaran: true, paraf_toko: true };
const EXTRA_COL_RE = /catatan|no_order|kode_salesman|pembayaran|paraf_toko/i;
const MSG_KOLOM = 'Kolom baru (catatan / no. order / kode salesman / pembayaran / paraf toko) belum ada di database. Jalankan SQL migrasi di folder supabase (migrasi_nota_a6.sql dan migrasi_paraf_toko.sql) pada Supabase SQL Editor, lalu coba lagi.';

const TABLE_MAP = {
    produk: {
        orderBy: 'created_at',
        to: (p) => ({ id: p.id, nama: p.nama, kategori: p.kategori || '', satuan: p.satuan, harga: p.harga }),
        from: (r) => ({ id: r.id, nama: r.nama, kategori: r.kategori || '', satuan: r.satuan, harga: Number(r.harga) })
    },
    pelanggan: {
        orderBy: 'created_at',
        to: (c) => ({ id: c.id, nama: c.nama, hp: c.hp, alamat: c.alamat || '' }),
        from: (r) => ({ id: r.id, nama: r.nama, hp: r.hp, alamat: r.alamat || '', ownerId: r.owner_id || '' })
    },
    pesanan: {
        orderBy: 'tanggal',
        to: (o) => {
            const d = new Date(o.tanggal);
            const row = {
                id: o.id,
                no_nota: o.noNota,
                tanggal: isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString(),
                pelanggan_id: o.pelangganId || null,
                items: o.items || []
            };
            Object.keys(PESANAN_EXTRA).forEach(k => {
                const col = PESANAN_EXTRA[k];
                if (extraSupported[col] || o[k]) row[col] = o[k] || '';
            });
            return row;
        },
        from: (r) => ({ id: r.id, noNota: r.no_nota, tanggal: r.tanggal, pelangganId: r.pelanggan_id, items: r.items || [], catatan: r.catatan || '', noOrder: r.no_order || '', kodeSalesman: r.kode_salesman || '', pembayaran: r.pembayaran || '', parafToko: r.paraf_toko || '', ownerId: r.owner_id || '' })
    }
};

function dbFail(err, action) {
    console.error(err);
    alert('Gagal ' + action + ': ' + ((err && err.message) ? err.message : err));
}

async function dbFetchAll(table) {
    const cfg = TABLE_MAP[table];
    const out = [];
    const size = 1000;
    for (let from = 0; ; from += size) {
        const { data, error } = await sb.from(table).select('*')
            .order(cfg.orderBy, { ascending: false }).order('id', { ascending: true })
            .range(from, from + size - 1);
        if (error) throw error;
        out.push(...data);
        if (data.length < size) break;
    }
    if (table === 'pesanan' && out.length) Object.keys(extraSupported).forEach(col => { extraSupported[col] = (col in out[0]); });
    return out.map(cfg.from);
}

async function dbUpsert(table, obj) {
    const { error } = await sb.from(table).upsert(TABLE_MAP[table].to(obj));
    if (error) {
        if (EXTRA_COL_RE.test(error.message || '')) error.message = MSG_KOLOM;
        throw error;
    }
}

async function dbUpsertMany(table, list) {
    const rows = list.map(TABLE_MAP[table].to);
    for (let i = 0; i < rows.length; i += 500) {
        const { error } = await sb.from(table).upsert(rows.slice(i, i + 500));
        if (error) {
            if (EXTRA_COL_RE.test(error.message || '')) error.message = MSG_KOLOM;
            throw error;
        }
    }
}

async function dbDelete(table, id) {
    const { data, error } = await sb.from(table).delete().eq('id', id).select('id');
    if (error) throw error;
    if (!data || data.length === 0) throw new Error('Data tidak ditemukan atau Anda tidak punya izin.');
}

async function loadAllData() {
    const [p, c, o] = await Promise.all([dbFetchAll('produk'), dbFetchAll('pelanggan'), dbFetchAll('pesanan')]);
    produkList = p;
    pelangganList = c;
    pesananList = o;
}

async function reloadPesanan() {
    pesananList = await dbFetchAll('pesanan');
}

// Panggil API server (Vercel) untuk kelola akun pengguna - hanya Admin.
async function callUsersApi(method, body) {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) throw new Error('Sesi habis. Silakan login ulang.');
    let res;
    try {
        res = await fetch('/api/users', {
            method,
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + session.access_token },
            body: JSON.stringify(body)
        });
    } catch (err) {
        throw new Error('Tidak dapat terhubung ke endpoint /api/users. Pastikan backend serverless Vercel aktif.');
    }
    let json = {};
    try { json = await res.json(); } catch (e) { /* bukan JSON */ }
    if (!res.ok) {
        if (res.status === 404) {
            throw new Error('Endpoint /api/users tidak ditemukan (404). Fitur ini membutuhkan deploy di Vercel dengan environment variables Supabase.');
        }
        throw new Error(json.error || ('Permintaan gagal (' + res.status + ')'));
    }
    return json;
}

// ================= AUTH & ROLE =================
// Ubah daftar izin di sini bila ingin menyesuaikan hak akses tiap role.
const ROLE_PERMISSIONS = {
    admin: ['produk.write', 'pelanggan.write', 'pelanggan.delete', 'pesanan.write', 'pesanan.delete', 'backup', 'users.manage'],
    salesman: ['pesanan.write', 'pelanggan.write']
};
const ROLE_LABEL = { admin: 'Admin', salesman: 'Salesman' };

let userList = [];
let currentUser = null;
let failedLogins = 0;
let lockUntil = 0;

function can(perm) {
    return !!currentUser && (ROLE_PERMISSIONS[currentUser.role] || []).includes(perm);
}

function requirePerm(perm) {
    if (can(perm)) return true;
    alert('Anda tidak memiliki izin untuk melakukan aksi ini.');
    return false;
}

function showLoginError(msg) {
    const box = byId('login-error');
    box.innerText = msg;
    box.classList.remove('hidden');
}

function togglePw(inputId, btn) {
    const input = byId(inputId);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.innerHTML = `<i class="fa-solid ${show ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
}


function setLoginBusy(busy) {
    const btn = byId('login-submit');
    btn.disabled = busy;
    btn.classList.toggle('opacity-60', busy);
}

function mapProfile(r) {
    return { id: r.id, username: r.username, nama: r.nama, role: r.role, defaultPw: !!r.default_pw };
}

async function fetchProfile(userId) {
    const { data, error } = await sb.from('profiles').select('id, username, nama, role, default_pw').eq('id', userId).maybeSingle();
    if (error) throw error;
    return data ? mapProfile(data) : null;
}

let namaPenggunaList = [];   // untuk dropdown Nama Salesman di form pesanan

async function loadUsers() {
    if (!can('users.manage')) {
        userList = []; fillUserFilters();
        namaPenggunaList = currentUser ? [currentUser] : [];
        try {   // bila kebijakan database mengizinkan, tampilkan semua pengguna
            const { data } = await sb.from('profiles').select('id, username, nama, role, default_pw').order('created_at');
            if (data && data.length) namaPenggunaList = data.map(mapProfile);
        } catch (e) { /* cukup nama akun sendiri */ }
        return;
    }
    const { data, error } = await sb.from('profiles').select('id, username, nama, role, default_pw').order('created_at');
    if (error) throw error;
    userList = data.map(mapProfile);
    namaPenggunaList = userList;
    fillUserFilters();
}

function isiPilihanSalesman(nilai) {
    const sel = document.getElementById('pesanan-kode-salesman');
    if (!sel) return;
    const names = [];
    (namaPenggunaList.length ? namaPenggunaList : (currentUser ? [currentUser] : [])).forEach(u => {
        const n = (u.nama || u.username || '').trim();
        if (n && !names.includes(n)) names.push(n);
    });
    if (nilai && !names.includes(nilai)) names.push(nilai);   // data lama tetap terpilih
    sel.innerHTML = '<option value="">Pilih nama pengguna</option>' + names.map(n => `<option value="${esc(n)}">${esc(n)}</option>`).join('');
    sel.value = nilai || '';
}

async function handleLogin(e) {
    e.preventDefault();
    byId('login-error').classList.add('hidden');
    if (!sb) { showLoginError('Koneksi Supabase belum siap. Periksa config.js dan koneksi internet.'); return; }

    const now = Date.now();
    if (now < lockUntil) {
        showLoginError(`Terlalu banyak percobaan gagal. Coba lagi dalam ${Math.ceil((lockUntil - now) / 1000)} detik.`);
        return;
    }

    const username = byId('login-username').value.trim().toLowerCase();
    const pw = byId('login-password').value;

    setLoginBusy(true);
    try {
        const { data, error } = await sb.auth.signInWithPassword({ email: usernameToEmail(username), password: pw });
        if (error) {
            if ([400, 401, 422].includes(error.status)) {
                failedLogins++;
                if (failedLogins >= 5) {
                    failedLogins = 0;
                    lockUntil = Date.now() + 30000;
                    showLoginError('Terlalu banyak percobaan gagal. Coba lagi dalam 30 detik.');
                } else {
                    showLoginError('Username atau password salah.');
                }
            } else {
                showLoginError('Gagal masuk: ' + error.message);
            }
            return;
        }

        const profile = await fetchProfile(data.user.id);
        if (!profile) {
            await sb.auth.signOut();
            showLoginError('Akun ini belum memiliki profil/role. Hubungi Admin.');
            return;
        }
        failedLogins = 0;
        await enterApp(profile);
    } catch (err) {
        showLoginError('Gagal terhubung ke server: ' + (err.message || err));
    } finally {
        setLoginBusy(false);
    }
}


async function enterApp(user) {
    currentUser = user;
    try {
        await Promise.all([loadAllData(), loadUsers()]);
    } catch (err) {
        dbFail(err, 'memuat data dari server');
    }

    byId('login-form').reset();
    byId('login-error').classList.add('hidden');
    byId('login-screen').classList.add('hidden');
    byId('app-shell').classList.remove('hidden');

    byId('user-nama').innerText = user.nama || user.username;
    const badge = byId('user-role');
    badge.innerText = ROLE_LABEL[user.role] || user.role;
    badge.className = 'inline-block text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ' +
        (user.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700');

    applyRole();
    switchTab('pesanan');
}

function applyRole() {
    document.querySelectorAll('[data-perm]').forEach(el => el.classList.toggle('hidden', !can(el.dataset.perm)));
    byId('produk-readonly-note').classList.toggle('hidden', can('produk.write'));
    byId('default-pw-banner').classList.toggle('hidden', !(currentUser && currentUser.defaultPw));
}


async function logout() {
    currentUser = null;
    userList = []; produkList = []; pelangganList = []; pesananList = [];
    try { if (sb) await sb.auth.signOut(); } catch (e) { /* abaikan */ }
    ['modal-pesanan', 'modal-produk', 'modal-pelanggan', 'modal-whatsapp', 'modal-pengguna', 'modal-password']
        .forEach(id => byId(id).classList.add('hidden'));
    byId('app-shell').classList.add('hidden');
    byId('login-screen').classList.remove('hidden');
    byId('login-username').focus();
}


async function initAuth() {
    const cfg = window.APP_CONFIG;
    if (!window.supabase) {
        showLoginError('Gagal memuat library Supabase dari CDN. Periksa koneksi internet Anda lalu muat ulang halaman.');
        return;
    }
    if (!cfg || !cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY || /GANTI/.test(cfg.SUPABASE_URL || '')) {
        showLoginError('Konfigurasi Supabase belum diisi. Edit file config.js (URL & anon key), lalu deploy ulang.');
        return;
    }
    if (!sb) {
        try {
            sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
        } catch (e) {
            showLoginError('Inisialisasi Supabase gagal: ' + e.message);
            return;
        }
    }
    try {
        const { data: { session } } = await sb.auth.getSession();
        if (session) {
            const profile = await fetchProfile(session.user.id);
            if (profile) { await enterApp(profile); return; }
            await sb.auth.signOut();
        }
    } catch (err) {
        console.warn('Gagal memulihkan sesi:', err);
    }
    byId('login-username').focus();
}

// Sesi berakhir (mis. dicabut dari server) -> kembali ke layar login.
if (sb) {
    sb.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_OUT' && currentUser) {
            currentUser = null;
            location.reload();
        }
    });
}

// Segarkan data saat tab/aplikasi kembali dibuka (agar sinkron dengan perangkat lain).
document.addEventListener('visibilitychange', async () => {
    if (document.hidden || !currentUser || !sb) return;
    const modals = ['modal-pesanan', 'modal-produk', 'modal-pelanggan', 'modal-whatsapp', 'modal-pengguna', 'modal-password'];
    if (modals.some(id => !byId(id).classList.contains('hidden'))) return;
    try {
        await loadAllData();
        refreshActiveTab();
    } catch (err) {
        console.warn('Gagal menyegarkan data:', err);
    }
});

function refreshActiveTab() {
    const active = Array.from(document.querySelectorAll('.tab-content')).find(el => !el.classList.contains('hidden'));
    if (active) switchTab(active.id.replace('section-', ''));
}

// ---- Ganti password (akun sendiri) ----
function openModalPassword() {
    ['password-lama', 'password-baru', 'password-ulang'].forEach(id => byId(id).value = '');
    byId('password-error').classList.add('hidden');
    byId('modal-password').classList.remove('hidden');
}

function closeModalPassword() {
    byId('modal-password').classList.add('hidden');
}


async function submitPassword() {
    const err = byId('password-error');
    const fail = (msg) => { err.innerText = msg; err.classList.remove('hidden'); };
    const lama = byId('password-lama').value;
    const baru = byId('password-baru').value;
    const ulang = byId('password-ulang').value;

    if (!currentUser) return;
    if (baru.length < 6) return fail('Password baru minimal 6 karakter.');
    if (baru !== ulang) return fail('Konfirmasi password baru tidak sama.');

    try {
        const { error: reErr } = await sb.auth.signInWithPassword({ email: usernameToEmail(currentUser.username), password: lama });
        if (reErr) return fail('Password saat ini salah.');
        const { error } = await sb.auth.updateUser({ password: baru });
        if (error) return fail(error.message);
        const { error: pErr } = await sb.from('profiles').update({ default_pw: false }).eq('id', currentUser.id);
        if (pErr) console.warn('Gagal menghapus penanda password bawaan:', pErr);
    } catch (e) {
        return fail(e.message || 'Gagal mengganti password.');
    }

    currentUser.defaultPw = false;
    closeModalPassword();
    applyRole();
    alert('Password berhasil diganti.');
}

// ---- Manajemen pengguna (admin) ----
function renderPengguna() {
    if (!can('users.manage')) return;
    const tbody = byId('table-pengguna-body');
    tbody.innerHTML = userList.map((u, idx) => {
        const self = currentUser && u.id === currentUser.id;
        const badge = u.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700';
        return `
            <tr class="hover:bg-gray-50 transition">
                <td data-label="No" class="py-3 px-4 text-gray-500 font-medium">${idx + 1}</td>
                <td data-label="Username" class="py-3 px-4 font-mono font-semibold text-gray-800">${esc(u.username)}${self ? ' <span class="text-[10px] text-gray-400 font-sans">(Anda)</span>' : ''}</td>
                <td data-label="Nama" class="py-3 px-4 text-gray-700">${esc(u.nama)}</td>
                <td data-label="Role" class="py-3 px-4"><span class="${badge} px-2.5 py-1 rounded-md text-xs font-bold uppercase">${esc(ROLE_LABEL[u.role] || u.role)}</span></td>
                <td data-label="Aksi" class="py-3 px-4 text-center space-x-2">
                    <button onclick="openModalPengguna('${u.id}')" class="text-blue-600 hover:text-blue-800 p-1" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                    ${self ? '' : `<button onclick="deletePengguna('${u.id}')" class="text-red-600 hover:text-red-800 p-1" title="Hapus"><i class="fa-solid fa-trash"></i></button>`}
                </td>
            </tr>`;
    }).join('');
}

function openModalPengguna(id = null) {
    if (!requirePerm('users.manage')) return;
    const u = id ? userList.find(x => x.id === id) : null;
    byId('modal-pengguna-title').innerText = u ? 'Edit Pengguna' : 'Tambah Pengguna';
    byId('pengguna-id').value = u ? u.id : '';
    byId('pengguna-username').value = u ? u.username : '';
    byId('pengguna-nama').value = u ? u.nama : '';
    byId('pengguna-role').value = u ? u.role : 'salesman';
    byId('pengguna-role').disabled = !!(u && currentUser && u.id === currentUser.id);
    byId('pengguna-password').value = '';
    byId('pengguna-pw-hint').innerText = u ? 'Kosongkan jika tidak ingin mengubah password.' : 'Minimal 6 karakter.';
    byId('modal-pengguna').classList.remove('hidden');
}

function closeModalPengguna() {
    byId('modal-pengguna').classList.add('hidden');
}


async function savePengguna() {
    if (!requirePerm('users.manage')) return;
    const id = byId('pengguna-id').value;
    const username = byId('pengguna-username').value.trim();
    const nama = byId('pengguna-nama').value.trim();
    let role = byId('pengguna-role').value;
    const pw = byId('pengguna-password').value;

    if (!/^[A-Za-z0-9_.-]{3,20}$/.test(username)) { alert('Username 3-20 karakter: huruf, angka, titik, strip, atau underscore (tanpa spasi).'); return; }
    if (!nama) { alert('Nama lengkap wajib diisi.'); return; }
    if (!ROLE_PERMISSIONS[role]) { alert('Role tidak valid.'); return; }
    if (userList.some(u => u.id !== id && u.username.toLowerCase() === username.toLowerCase())) { alert('Username sudah dipakai.'); return; }
    if ((!id || pw) && pw.length < 6) { alert('Password minimal 6 karakter.'); return; }

    if (id) {
        const u = userList.find(x => x.id === id);
        if (!u) return;
        if (currentUser && u.id === currentUser.id) role = u.role; // tidak boleh ubah role sendiri
        if (u.role === 'admin' && role !== 'admin' && userList.filter(x => x.role === 'admin').length <= 1) {
            alert('Minimal harus ada satu akun Admin.');
            return;
        }
    }

    try {
        if (id) await callUsersApi('PATCH', { id, username, nama, role, password: pw });
        else await callUsersApi('POST', { username, nama, role, password: pw });
        await loadUsers();
    } catch (err) {
        alert('Gagal menyimpan pengguna: ' + err.message);
        return;
    }

    if (currentUser) {
        const me = userList.find(x => x.id === currentUser.id);
        if (me) { currentUser.username = me.username; currentUser.nama = me.nama; currentUser.role = me.role; }
        byId('user-nama').innerText = currentUser.nama || currentUser.username;
        applyRole();
    }
    closeModalPengguna();
    renderPengguna();
}


async function deletePengguna(id) {
    if (!requirePerm('users.manage')) return;
    const u = userList.find(x => x.id === id);
    if (!u) return;
    if (currentUser && u.id === currentUser.id) { alert('Anda tidak dapat menghapus akun yang sedang dipakai.'); return; }
    if (u.role === 'admin' && userList.filter(x => x.role === 'admin').length <= 1) { alert('Minimal harus ada satu akun Admin.'); return; }
    if (!confirm(`Hapus pengguna "${u.username}"?`)) return;
    try {
        await callUsersApi('DELETE', { id });
        await loadUsers();
    } catch (err) {
        alert('Gagal menghapus pengguna: ' + err.message);
        return;
    }
    renderPengguna();
}

// ================= STATE DATA =================
let produkList = [];
let pelangganList = [];
let pesananList = [];

// Kode pengguna untuk nomor nota: username dalam huruf besar, hanya A-Z dan 0-9 (mis. budi -> BUDI).
function kodePengguna(username) {
    return String(username || '').toUpperCase().replace(/[^A-Z0-9]/g, '') || 'USER';
}

// Nomor nota: NOTA-YYYYMMDD-KODE-NNN (urut per hari per pengguna, memakai tanggal lokal)
function generateNoNota() {
    const kode = kodePengguna(currentUser && currentUser.username);
    const prefix = 'NOTA-' + toLocalDateStr(new Date()).replace(/-/g, '') + '-' + kode + '-';
    let max = 0;
    pesananList.forEach(o => {
        if (o.noNota && o.noNota.startsWith(prefix)) {
            const rest = o.noNota.slice(prefix.length);
            if (!/^\d+$/.test(rest)) return;   // abaikan kode lain yang diawali sama (mis. BUDI vs BUDI2)
            const n = parseInt(rest, 10);
            if (n > max) max = n;
        }
    });
    return prefix + String(max + 1).padStart(3, '0');
}

// ================= FILTER PER PENGGUNA (Admin) =================
// Nilai '' = semua pengguna. Salesman tidak punya dropdown ini (RLS sudah membatasi datanya).
function userLabel(id) {
    const u = userList.find(x => x.id === id);
    return u ? (u.nama || u.username) : '';
}

function fillUserFilters() {
    ['filter-pengguna', 'laporan-pengguna', 'filter-pengguna-pelanggan'].forEach(elId => {
        const el = byId(elId);
        if (!el) return;
        const cur = el.value;
        el.innerHTML = '<option value="">Semua pengguna</option>' + userList.map(u =>
            `<option value="${esc(u.id)}">${esc(u.nama || u.username)} (${esc(u.username)})</option>`).join('');
        el.value = userList.some(u => u.id === cur) ? cur : '';
    });
}

function updateClock() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('realtime-clock').innerText = now.toLocaleDateString('id-ID', options);
}
setInterval(updateClock, 1000);
updateClock();

function switchTab(tabId) {
    if (tabId === 'pengguna' && !can('users.manage')) return;
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(el => {
        el.classList.remove('border-primary', 'text-primary');
        el.classList.add('border-transparent', 'text-gray-500');
    });

    document.getElementById(`section-${tabId}`).classList.remove('hidden');
    window.scrollTo({ top: 0 });
    const activeBtn = document.getElementById(`tab-${tabId}`);
    activeBtn.classList.add('border-primary', 'text-primary');
    activeBtn.classList.remove('border-transparent', 'text-gray-500');

    if (tabId === 'pesanan') renderPesanan();
    if (tabId === 'produk') renderProduk();
    if (tabId === 'pelanggan') renderPelanggan();
    if (tabId === 'laporan') {
        if (!laporanInitialized || laporanAutoMonth) {
            // pertama dibuka / belum diubah manual: selalu bulan berjalan (otomatis kosong di awal bulan)
            laporanInitialized = true;
            setLaporanBulanIni();
        } else {
            renderLaporan();
        }
    }
    if (tabId === 'pengguna') renderPengguna();
}

function formatRupiah(num) {
    return 'Rp ' + Number(num).toLocaleString('id-ID');
}

// ================= RENDER PRODUK =================
function renderProduk() {
    const keyword = document.getElementById('search-produk').value.toLowerCase();
    const tbody = document.getElementById('table-produk-body');
    tbody.innerHTML = '';

    const filtered = produkList.filter(p => p.nama.toLowerCase().includes(keyword) || p.kategori.toLowerCase().includes(keyword));

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-gray-400">Tidak ada produk ditemukan.</td></tr>`;
        return;
    }

    filtered.forEach((p, idx) => {
        tbody.innerHTML += `
            <tr class="hover:bg-gray-50 transition">
                <td data-label="No" class="py-3 px-4 text-gray-500 font-medium">${idx + 1}</td>
                <td data-label="Produk" class="py-3 px-4 font-semibold text-gray-800">${esc(p.nama)}</td>
                <td data-label="Kategori" class="py-3 px-4"><span class="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">${esc(p.kategori || '-')}</span></td>
                <td data-label="Satuan" class="py-3 px-4 text-gray-600">${esc(p.satuan)}</td>
                <td data-label="Harga" class="py-3 px-4 font-bold text-emerald-600">${formatRupiah(p.harga)}</td>
                ${can('produk.write') ? `<td data-label="Aksi" class="py-3 px-4 text-center space-x-2">
                    <button onclick="editProduk('${p.id}')" class="text-blue-600 hover:text-blue-800 p-1" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onclick="deleteProduk('${p.id}')" class="text-red-600 hover:text-red-800 p-1" title="Hapus"><i class="fa-solid fa-trash"></i></button>
                </td>` : ''}
            </tr>
        `;
    });
}

function openModalProduk(id = null) {
    if (!requirePerm('produk.write')) return;
    document.getElementById('modal-produk').classList.remove('hidden');
    if (id) {
        document.getElementById('modal-produk-title').innerText = 'Edit Produk';
        const p = produkList.find(item => item.id === id);
        document.getElementById('produk-id').value = p.id;
        document.getElementById('produk-nama').value = p.nama;
        document.getElementById('produk-kategori').value = p.kategori;
        document.getElementById('produk-satuan').value = p.satuan;
        document.getElementById('produk-harga').value = p.harga;
    } else {
        document.getElementById('modal-produk-title').innerText = 'Tambah Produk Baru';
        document.getElementById('produk-id').value = '';
        document.getElementById('produk-nama').value = '';
        document.getElementById('produk-kategori').value = '';
        document.getElementById('produk-satuan').value = 'PCS';
        document.getElementById('produk-harga').value = '';
    }
}

function closeModalProduk() {
    document.getElementById('modal-produk').classList.add('hidden');
}


async function saveProduk() {
    if (!requirePerm('produk.write')) return;
    const id = document.getElementById('produk-id').value;
    const nama = document.getElementById('produk-nama').value.trim();
    const kategori = document.getElementById('produk-kategori').value.trim();
    const satuan = document.getElementById('produk-satuan').value.trim().toUpperCase();
    const harga = parseFloat(document.getElementById('produk-harga').value) || 0;

    if (!nama || !satuan || harga <= 0) {
        alert('Mohon isi nama produk, satuan, dan harga dengan benar!');
        return;
    }

    const row = { id: id || 'p_' + Date.now(), nama, kategori, satuan, harga };
    try {
        await dbUpsert('produk', row);
    } catch (err) {
        return dbFail(err, 'menyimpan produk');
    }

    const idx = produkList.findIndex(p => p.id === row.id);
    if (idx !== -1) produkList[idx] = row; else produkList.unshift(row);

    closeModalProduk();
    renderProduk();
}

function editProduk(id) {
    openModalProduk(id);
}


async function deleteProduk(id) {
    if (!requirePerm('produk.write')) return;
    const hasPesanan = pesananList.some(o => (o.items || []).some(i => i.produkId === id));
    const msg = hasPesanan
        ? 'Produk ini pernah digunakan dalam pesanan. Menghapusnya tidak akan merusak riwayat nota lama. Yakin ingin menghapus produk ini?'
        : 'Yakin ingin menghapus produk ini?';
    if (!confirm(msg)) return;
    try {
        await dbDelete('produk', id);
    } catch (err) {
        return dbFail(err, 'menghapus produk');
    }
    produkList = produkList.filter(p => p.id !== id);
    renderProduk();
}

// ================= RENDER PELANGGAN =================
function renderPelanggan() {
    const keyword = document.getElementById('search-pelanggan').value.toLowerCase();
    const tbody = document.getElementById('table-pelanggan-body');
    tbody.innerHTML = '';

    const filterUser = can('users.manage') && byId('filter-pengguna-pelanggan') ? (byId('filter-pengguna-pelanggan').value || '') : '';
    const filtered = pelangganList.filter(c =>
        (!filterUser || c.ownerId === filterUser) &&
        (c.nama.toLowerCase().includes(keyword) || c.hp.includes(keyword) || c.alamat.toLowerCase().includes(keyword)));

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-gray-400">Tidak ada pelanggan ditemukan.</td></tr>`;
        return;
    }

    filtered.forEach((c, idx) => {
        tbody.innerHTML += `
            <tr class="hover:bg-gray-50 transition">
                <td data-label="No" class="py-3 px-4 text-gray-500 font-medium">${idx + 1}</td>
                <td data-label="Pelanggan" class="py-3 px-4 font-semibold text-gray-800">${esc(c.nama)}${(can('users.manage') && userLabel(c.ownerId)) ? `<div class="text-[11px] font-normal text-gray-500 mt-0.5"><i class="fa-solid fa-user mr-1"></i>${esc(userLabel(c.ownerId))}</div>` : ''}</td>
                <td data-label="WhatsApp" class="py-3 px-4 text-emerald-600 font-medium"><i class="fa-brands fa-whatsapp mr-1"></i> ${esc(c.hp)}</td>
                <td data-label="Alamat" class="py-3 px-4 text-gray-600">${esc(c.alamat || '-')}</td>
                <td data-label="Aksi" class="py-3 px-4 text-center space-x-2">
                    ${can('pelanggan.write') ? `<button onclick="editPelanggan('${c.id}')" class="text-blue-600 hover:text-blue-800 p-1" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>` : ''}
                    ${can('pelanggan.delete') ? `<button onclick="deletePelanggan('${c.id}')" class="text-red-600 hover:text-red-800 p-1" title="Hapus"><i class="fa-solid fa-trash"></i></button>` : ''}
                </td>
            </tr>
        `;
    });
}

function openModalPelanggan(id = null) {
    if (!requirePerm('pelanggan.write')) return;
    document.getElementById('modal-pelanggan').classList.remove('hidden');
    if (id) {
        document.getElementById('modal-pelanggan-title').innerText = 'Edit Pelanggan';
        const c = pelangganList.find(item => item.id === id);
        document.getElementById('pelanggan-id').value = c.id;
        document.getElementById('pelanggan-nama').value = c.nama;
        document.getElementById('pelanggan-hp').value = c.hp;
        document.getElementById('pelanggan-alamat').value = c.alamat;
    } else {
        document.getElementById('modal-pelanggan-title').innerText = 'Tambah Pelanggan Baru';
        document.getElementById('pelanggan-id').value = '';
        document.getElementById('pelanggan-nama').value = '';
        document.getElementById('pelanggan-hp').value = '';
        document.getElementById('pelanggan-alamat').value = '';
    }
}

function closeModalPelanggan() {
    document.getElementById('modal-pelanggan').classList.add('hidden');
}


async function savePelanggan() {
    if (!requirePerm('pelanggan.write')) return;
    const id = document.getElementById('pelanggan-id').value;
    const nama = document.getElementById('pelanggan-nama').value.trim();
    const hp = document.getElementById('pelanggan-hp').value.trim();
    const alamat = document.getElementById('pelanggan-alamat').value.trim();

    if (!nama || !hp) {
        alert('Nama dan No. WhatsApp wajib diisi!');
        return;
    }

    const row = { id: id || 'c_' + Date.now(), nama, hp, alamat };
    try {
        await dbUpsert('pelanggan', row);
    } catch (err) {
        return dbFail(err, 'menyimpan pelanggan');
    }

    const idx = pelangganList.findIndex(c => c.id === row.id);
    if (idx !== -1) pelangganList[idx] = row; else pelangganList.unshift(row);

    closeModalPelanggan();
    renderPelanggan();
}

function editPelanggan(id) {
    openModalPelanggan(id);
}


async function deletePelanggan(id) {
    if (!requirePerm('pelanggan.delete')) return;
    const hasPesanan = pesananList.some(o => o.pelangganId === id);
    const msg = hasPesanan 
        ? 'Pelanggan ini memiliki riwayat pesanan. Jika dihapus, pesanan terkait akan tetap tersimpan namun nama pelanggan menjadi "Umum". Yakin ingin menghapus?'
        : 'Yakin ingin menghapus pelanggan ini?';
    if (!confirm(msg)) return;
    try {
        await dbDelete('pelanggan', id);
    } catch (err) {
        return dbFail(err, 'menghapus pelanggan');
    }
    pelangganList = pelangganList.filter(c => c.id !== id);
    renderPelanggan();
}

// ================= RENDER PESANAN =================
function renderPesanan() {
    const keyword = document.getElementById('search-pesanan').value.toLowerCase();
    const filterDate = document.getElementById('filter-tanggal').value;
    const filterUser = can('users.manage') ? (byId('filter-pengguna').value || '') : '';
    const tbody = document.getElementById('table-pesanan-body');
    tbody.innerHTML = '';

    // Tanpa filter tanggal: hanya pesanan BULAN BERJALAN (awal bulan otomatis kosong).
    // Pesanan bulan/tanggal lain tampil lewat Filter Tanggal.
    const bulan = getBulanIniRange();
    const hint = document.getElementById('pesanan-scope-hint');
    if (hint) {
        hint.textContent = filterDate
            ? `Menampilkan pesanan tanggal ${formatTanggalIndo(filterDate)}. Klik Reset untuk kembali ke bulan ini.`
            : `Menampilkan pesanan bulan ${bulan.nama}. Pilih Filter Tanggal untuk melihat pesanan tanggal / bulan lain.`;
    }

    let filtered = pesananList.filter(ord => {
        const pel = pelangganList.find(c => c.id === ord.pelangganId);
        const pelName = pel ? pel.nama.toLowerCase() : '';
        const matchKeyword = ord.noNota.toLowerCase().includes(keyword) || pelName.includes(keyword) ||
            (ord.noOrder || '').toLowerCase().includes(keyword) || (ord.kodeSalesman || '').toLowerCase().includes(keyword);
        
        const ordDate = toLocalDateStr(ord.tanggal);
        const matchDate = filterDate ? ordDate === filterDate : (ordDate >= bulan.dari && ordDate <= bulan.sampai);

        const matchUser = !filterUser || ord.ownerId === filterUser;

        return matchKeyword && matchDate && matchUser;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-gray-400">${filterDate ? 'Tidak ada pesanan ditemukan pada tanggal ini.' : 'Belum ada pesanan bulan ini. Pilih Filter Tanggal untuk melihat pesanan sebelumnya.'}</td></tr>`;
        return;
    }

    filtered.forEach(ord => {
        const pel = pelangganList.find(c => c.id === ord.pelangganId) || { nama: 'Umum', hp: '-' };
        const totalQty = ord.items.reduce((sum, item) => sum + parseInt(item.qty || 0), 0);
        const totalHarga = ord.items.reduce((sum, item) => sum + (item.qty * item.harga), 0);
        const formattedDate = new Date(ord.tanggal).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

        tbody.innerHTML += `
            <tr class="hover:bg-gray-50 transition">
                <td data-label="No. Nota" class="py-3 px-4 font-mono font-bold text-gray-800">${esc(ord.noNota)}${ord.pembayaran ? ` <span class="font-sans text-[10px] font-bold px-1.5 py-0.5 rounded ${ord.pembayaran === 'tempo' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}">${esc(ord.pembayaran.toUpperCase())}</span>` : ''}${(ord.noOrder || ord.kodeSalesman) ? `<div class="font-sans text-[11px] font-normal text-gray-500 mt-0.5">${ord.noOrder ? 'Order: ' + esc(ord.noOrder) : ''}${(ord.noOrder && ord.kodeSalesman) ? ' &bull; ' : ''}${ord.kodeSalesman ? 'Sales: ' + esc(ord.kodeSalesman) : ''}</div>` : ''}</td>
                <td data-label="Waktu" class="py-3 px-4 text-gray-600 text-xs">${formattedDate}</td>
                <td data-label="Pelanggan" class="py-3 px-4 font-semibold text-gray-800">${esc(pel.nama)}${ord.catatan ? `<div class="text-[11px] font-normal text-amber-600 mt-0.5 max-w-xs sm:truncate" title="${esc(ord.catatan)}">📝 ${esc(ord.catatan)}</div>` : ''}</td>
                <td data-label="Total Item" class="py-3 px-4 text-gray-600">${totalQty} item</td>
                <td data-label="Total" class="py-3 px-4 font-bold text-emerald-600">${formatRupiah(totalHarga)}</td>
                <td data-label="Aksi" class="py-3 px-4 text-center space-x-1">
                    <button onclick="previewWhatsapp('${ord.id}')" class="bg-blue-50 text-blue-600 hover:bg-blue-100 p-1.5 rounded-lg transition" title="Lihat Nota / Unduh Gambar"><i class="fa-solid fa-receipt text-base"></i></button>
                    ${can('pesanan.write') ? `<button onclick="editPesanan('${ord.id}')" class="text-blue-600 hover:text-blue-800 p-1.5" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>` : ''}
                    ${can('pesanan.delete') ? `<button onclick="deletePesanan('${ord.id}')" class="text-red-600 hover:text-red-800 p-1.5" title="Hapus"><i class="fa-solid fa-trash"></i></button>` : ''}
                </td>
            </tr>
        `;
    });
}

function resetFilterPesanan() {
    document.getElementById('search-pesanan').value = '';
    document.getElementById('filter-tanggal').value = '';
    if (byId('filter-pengguna')) byId('filter-pengguna').value = '';
    renderPesanan();
}

function openModalPesanan(id = null) {
    if (!requirePerm('pesanan.write')) return;
    document.getElementById('modal-pesanan').classList.remove('hidden');

    if (id) {
        document.getElementById('modal-pesanan-title').innerText = 'Edit Pesanan';
        const ord = pesananList.find(o => o.id === id);
        document.getElementById('pesanan-id').value = ord.id;
        
        const pel = pelangganList.find(c => c.id === ord.pelangganId);
        document.getElementById('pesanan-pelanggan-id').value = '';
        document.getElementById('pesanan-pelanggan-input').value = '';
        if (pel) {
            document.getElementById('pesanan-pelanggan-id').value = pel.id;
            document.getElementById('pesanan-pelanggan-input').value = pel.nama;
        }

        const container = document.getElementById('items-container');
        container.innerHTML = '';
        ord.items.forEach(item => addItemRow(item));
        document.getElementById('pesanan-catatan').value = ord.catatan || '';
        document.getElementById('pesanan-no-order').value = ord.noOrder || '';
        isiPilihanSalesman(ord.kodeSalesman || '');
        setPembayaran(ord.pembayaran || '');
    } else {
        document.getElementById('modal-pesanan-title').innerText = 'Buat Pesanan Baru';
        document.getElementById('pesanan-id').value = '';
        document.getElementById('pesanan-pelanggan-id').value = '';
        document.getElementById('pesanan-pelanggan-input').value = '';
        document.getElementById('items-container').innerHTML = '';
        document.getElementById('pesanan-catatan').value = '';
        document.getElementById('pesanan-no-order').value = '';
        isiPilihanSalesman('');
        setPembayaran('');
        addItemRow();
    }
    updateCatatanCount();
    calculateTotalPesanan();
}

// Cash / Tempo: dua kotak centang yang saling meniadakan (boleh keduanya kosong)
function onBayarChange(which) {
    const cash = document.getElementById('pesanan-bayar-cash');
    const tempo = document.getElementById('pesanan-bayar-tempo');
    if (which === 'cash' && cash.checked) tempo.checked = false;
    if (which === 'tempo' && tempo.checked) cash.checked = false;
}
function setPembayaran(val) {
    document.getElementById('pesanan-bayar-cash').checked = (val === 'cash');
    document.getElementById('pesanan-bayar-tempo').checked = (val === 'tempo');
}
function getPembayaran() {
    if (document.getElementById('pesanan-bayar-cash').checked) return 'cash';
    if (document.getElementById('pesanan-bayar-tempo').checked) return 'tempo';
    return '';
}

function updateCatatanCount() {
    const el = document.getElementById('pesanan-catatan');
    const out = document.getElementById('pesanan-catatan-count');
    if (el && out) out.innerText = el.value.length;
}

function closeModalPesanan() {
    document.getElementById('modal-pesanan').classList.add('hidden');
}

// ================= AUTOCOMPLETE PELANGGAN =================
function onPelangganInput() {
    const input = document.getElementById('pesanan-pelanggan-input');
    const keyword = input.value.toLowerCase().trim();
    const listDiv = document.getElementById('pelanggan-dropdown-list');
    const idInput = document.getElementById('pesanan-pelanggan-id');
    listDiv.innerHTML = '';

    // Bila teks input berubah dan tidak lagi sama dengan nama pelanggan yang tersimpan, kosongkan ID
    const currentSelected = pelangganList.find(c => c.id === idInput.value);
    if (currentSelected && currentSelected.nama.toLowerCase() !== keyword) {
        idInput.value = '';
    }

    // Tampilkan data yang cocok, atau bila input kosong tampilkan maksimal 10 data pertama
    const matched = keyword
        ? pelangganList.filter(c => c.nama.toLowerCase().includes(keyword) || c.hp.includes(keyword) || (c.alamat && c.alamat.toLowerCase().includes(keyword)))
        : pelangganList.slice(0, 10);

    if (matched.length === 0) {
        listDiv.innerHTML = `<div class="p-2.5 text-xs text-gray-400">Tidak ada toko/pelanggan ditemukan</div>`;
    } else {
        matched.forEach(c => {
            const item = document.createElement('div');
            item.className = 'p-2.5 hover:bg-emerald-50 cursor-pointer text-xs border-b border-gray-100 transition';
            item.innerHTML = `<div class="font-bold text-gray-800">${esc(c.nama)}</div><div class="text-gray-500">${esc(c.hp)} - ${esc(c.alamat || '')}</div>`;
            item.onmousedown = function(e) {
                e.preventDefault();
                idInput.value = c.id;
                input.value = c.nama;
                listDiv.classList.add('hidden');
            };
            listDiv.appendChild(item);
        });
    }
    listDiv.classList.remove('hidden');
}

// ================= AUTOCOMPLETE PRODUK & VARIAN WARNA =================
function addItemRow(existingData = null) {
    const container = document.getElementById('items-container');
    const rowId = 'item_row_' + Date.now() + Math.random().toString(36).substring(2,7);

    const qtyVal = existingData ? existingData.qty : 1;
    const existingProdId = existingData ? existingData.produkId : '';
    const existingProd = produkList.find(p => p.id === existingProdId);
    const existingProdName = existingProd ? existingProd.nama : (existingData ? existingData.nama : '');
    const existingVarian = existingData ? (existingData.varianWarna || '') : '';
    // Harga yang tersimpan di pesanan dipakai apa adanya (bisa berbeda dari harga master)
    const hargaVal = existingData ? (existingData.harga ?? (existingProd ? existingProd.harga : '')) : '';

    const rowDiv = document.createElement('div');
    rowDiv.id = rowId;
    rowDiv.className = 'bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-2';
    if (existingData) {
        rowDiv.dataset.fbNama = existingData.nama || '';
        rowDiv.dataset.fbSatuan = existingData.satuan || '';
    }
    rowDiv.innerHTML = `
        <div class="flex flex-wrap sm:flex-nowrap items-center gap-2 relative">
            <div class="relative w-full sm:w-auto sm:flex-1 sm:min-w-0">
                <input type="hidden" class="product-id-val" value="${esc(existingProdId)}">
                <input type="text" oninput="onProductInput('${rowId}')" onkeydown="onProductKey(event, '${rowId}')" autocomplete="off" placeholder="Ketik nama produk..." class="product-search-input w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary" value="${esc(existingProdName)}">
                <div class="product-dropdown-list absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto hidden"></div>
            </div>
            <div class="w-20">
                <input type="number" min="1" value="${qtyVal}" onchange="calculateTotalPesanan()" oninput="calculateTotalPesanan()" class="item-qty w-full text-xs border border-gray-200 rounded-lg p-2 text-center bg-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Qty">
            </div>
            <div class="w-28" title="Harga satuan (bisa diedit)">
                <input type="number" min="0" step="any" inputmode="decimal" value="${esc(hargaVal)}" oninput="calculateTotalPesanan()" onchange="calculateTotalPesanan()" class="item-harga w-full text-xs border border-gray-200 rounded-lg p-2 text-right bg-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Harga">
            </div>
            <div class="flex-1 sm:flex-none sm:w-28 text-right font-bold text-sm sm:text-xs text-emerald-600 item-subtotal">
                Rp 0
            </div>
            <button type="button" onclick="document.getElementById('${rowId}').remove(); calculateTotalPesanan();" class="text-red-500 hover:text-red-700 w-9 h-9 sm:w-auto sm:h-auto sm:p-1 text-sm flex items-center justify-center" aria-label="Hapus baris"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="harga-hint hidden text-[11px] text-amber-600"></div>
        <div class="varian-container hidden relative">
            <label class="block text-[10px] font-semibold text-gray-500 uppercase mb-1">Varian / Kode Warna Cat Semprot</label>
            <input type="text" oninput="onVarianInput('${rowId}')" onfocus="onVarianInput('${rowId}')" autocomplete="off" placeholder="Ketik atau pilih kode/nama warna (misal: 139 BLACK)..." class="varian-search-input w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary" value="${esc(existingVarian)}">
            <div class="varian-dropdown-list absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto hidden"></div>
        </div>
    `;
    container.appendChild(rowDiv);

    if (existingData && existingProd) {
        checkVarianAndSubtotal(rowId, existingProd, existingVarian);
    } else if (existingData && !existingProd && existingData.harga) {
        // Fallback bila produk master lama terhapus namun data item pesanan masih ada harga
        checkVarianAndSubtotal(rowId, existingData, existingVarian);
    } else if (!existingData) {
        // Auto-focus input nama produk bila baris baru ditambah
        setTimeout(() => {
            const inp = rowDiv.querySelector('.product-search-input');
            if (inp) inp.focus();
        }, 50);
    }
    calculateTotalPesanan();
}

// Autocomplete produk: hanya muncul setelah mengetik (tanpa daftar dropdown saat kolom kosong).
function onProductInput(rowId) {
    const row = document.getElementById(rowId);
    if (!row) return;
    const input = row.querySelector('.product-search-input');
    const idVal = row.querySelector('.product-id-val');
    const listDiv = row.querySelector('.product-dropdown-list');
    const keyword = input.value.toLowerCase().trim();

    listDiv.innerHTML = '';

    // Teks diubah setelah memilih produk -> pilihan lama dilepas agar tidak salah produk
    const picked = produkList.find(p => p.id === idVal.value);
    if (idVal.value && (!picked || picked.nama !== input.value)) {
        idVal.value = '';
        checkVarianAndSubtotal(rowId, null);
    }

    if (!keyword) {
        listDiv.classList.add('hidden');
        return;
    }

    const matched = produkList
        .filter(p => p.nama.toLowerCase().includes(keyword) || (p.kategori && p.kategori.toLowerCase().includes(keyword)))
        .slice(0, 20);

    if (matched.length === 0) {
        listDiv.innerHTML = `<div class="p-2 text-xs text-gray-400">Produk tidak ditemukan</div>`;
    } else {
        matched.forEach(p => {
            const item = document.createElement('div');
            item.dataset.pick = '1';
            item.className = 'p-2 hover:bg-emerald-50 cursor-pointer text-xs border-b border-gray-100 transition';
            item.innerHTML = `<div class="font-bold text-gray-800">${esc(p.nama)}</div><div class="text-emerald-600">${formatRupiah(p.harga)} / ${esc(p.satuan)}</div>`;
            item.onmousedown = function(e) {
                e.preventDefault();
                idVal.value = p.id;
                input.value = p.nama;
                listDiv.classList.add('hidden');
                checkVarianAndSubtotal(rowId, p, '', true);
            };
            listDiv.appendChild(item);
        });
    }
    listDiv.classList.remove('hidden');
}

// Enter = pilih saran pertama; Escape = tutup saran
function onProductKey(e, rowId) {
    const row = document.getElementById(rowId);
    if (!row) return;
    const listDiv = row.querySelector('.product-dropdown-list');
    if (e.key === 'Escape') { listDiv.classList.add('hidden'); return; }
    if (e.key !== 'Enter' || listDiv.classList.contains('hidden')) return;
    const first = listDiv.querySelector('[data-pick]');
    if (first) { e.preventDefault(); first.onmousedown({ preventDefault() {} }); }
}

function checkVarianAndSubtotal(rowId, prod, selectedVarian = '', resetHarga = false) {
    const row = document.getElementById(rowId);
    if (!row) return;
    const subtotalDiv = row.querySelector('.item-subtotal');
    const varianContainer = row.querySelector('.varian-container');
    const varianInput = row.querySelector('.varian-search-input');

    if (prod) {
        // Produk baru dipilih -> harga diisi dengan harga master (tetap bisa diedit)
        if (resetHarga) row.querySelector('.item-harga').value = prod.harga;

        const isCatSemprot = (prod.nama && prod.nama.toLowerCase().includes('cat semprot')) ||
                             (prod.kategori && prod.kategori.toLowerCase().includes('cat semprot'));
        if (isCatSemprot) {
            varianContainer.classList.remove('hidden');
            if (selectedVarian) varianInput.value = selectedVarian;
        } else {
            varianContainer.classList.add('hidden');
            varianInput.value = '';
        }
    } else {
        subtotalDiv.innerText = formatRupiah(0);
        varianContainer.classList.add('hidden');
        varianInput.value = '';
    }
    calculateTotalPesanan();
}

// ================= AUTOCOMPLETE VARIAN WARNA =================
function onVarianInput(rowId) {
    const row = document.getElementById(rowId);
    if (!row) return;
    const input = row.querySelector('.varian-search-input');
    const listDiv = row.querySelector('.varian-dropdown-list');
    const keyword = input.value.toLowerCase().trim();

    listDiv.innerHTML = '';

    const matched = keyword
        ? MAGIC_COLOR_OPTIONS.filter(col => col.toLowerCase().includes(keyword))
        : MAGIC_COLOR_OPTIONS.slice(0, 15);

    if (matched.length === 0) {
        listDiv.innerHTML = `<div class="p-2 text-xs text-gray-400">Warna tidak ditemukan</div>`;
    } else {
        matched.forEach(col => {
            const item = document.createElement('div');
            item.className = 'p-2 hover:bg-emerald-50 cursor-pointer text-xs border-b border-gray-100 font-medium text-gray-800 transition';
            item.innerText = col;
            item.onmousedown = function(e) {
                e.preventDefault();
                input.value = col;
                listDiv.classList.add('hidden');
            };
            listDiv.appendChild(item);
        });
    }
    listDiv.classList.remove('hidden');
}

function calculateTotalPesanan() {
    let total = 0;
    const rows = document.querySelectorAll('#items-container > div');
    rows.forEach(row => {
        const idVal = row.querySelector('.product-id-val');
        const qtyInput = row.querySelector('.item-qty');
        const subtotalDiv = row.querySelector('.item-subtotal');

        const hargaInput = row.querySelector('.item-harga');
        const hint = row.querySelector('.harga-hint');

        const prodId = idVal.value;
        const prod = produkList.find(p => p.id === prodId);
        if (prodId) {
            const qty = parseFloat(qtyInput.value) || 0;
            const harga = parseFloat(hargaInput.value) || 0;
            const sub = qty * harga;
            subtotalDiv.innerText = formatRupiah(sub);
            total += sub;
            if (prod && hargaInput.value !== '' && harga !== prod.harga) {
                hint.innerText = `Harga diubah dari harga normal ${formatRupiah(prod.harga)} / ${prod.satuan}`;
                hint.classList.remove('hidden');
            } else {
                hint.classList.add('hidden');
            }
        } else {
            subtotalDiv.innerText = formatRupiah(0);
            hint.classList.add('hidden');
        }
    });
    document.getElementById('pesanan-total-display').innerText = formatRupiah(total);
}

let savingPesanan = false;

async function savePesanan() {
    if (!requirePerm('pesanan.write')) return;
    const id = document.getElementById('pesanan-id').value;
    const pelangganId = document.getElementById('pesanan-pelanggan-id').value;
    const catatan = document.getElementById('pesanan-catatan').value.trim();
    const noOrder = document.getElementById('pesanan-no-order').value.trim();
    const kodeSalesman = document.getElementById('pesanan-kode-salesman').value.trim();
    const pembayaran = getPembayaran();

    const rows = document.querySelectorAll('#items-container > div');
    let items = [];
    let hargaInvalid = false;

    rows.forEach(row => {
        const idVal = row.querySelector('.product-id-val');
        const qtyInput = row.querySelector('.item-qty');
        const hargaInput = row.querySelector('.item-harga');
        const varianInput = row.querySelector('.varian-search-input');
        const prodId = idVal.value;
        const qty = parseFloat(qtyInput.value) || 0;
        const harga = parseFloat(hargaInput.value);
        const varianWarna = varianInput ? varianInput.value.trim() : '';

        if (prodId && qty > 0) {
            if (!(harga > 0)) { hargaInvalid = true; return; }
            const prod = produkList.find(p => p.id === prodId);
            items.push({
                produkId: prodId,
                nama: prod ? prod.nama : (row.dataset.fbNama || ''),
                satuan: prod ? prod.satuan : (row.dataset.fbSatuan || 'PCS'),
                qty: qty,
                harga: harga,
                varianWarna: varianWarna
            });
        }
    });

    if (hargaInvalid) {
        alert('Harga satuan pada setiap produk harus diisi dan lebih dari 0!');
        return;
    }

    if (!pelangganId || items.length === 0) {
        alert('Pilih toko pelanggan yang valid dari daftar pencarian dan pastikan minimal ada 1 produk pesanan!');
        return;
    }

    if (savingPesanan) return;
    savingPesanan = true;
    try {
        if (id) {
            const existing = pesananList.find(o => o.id === id);
            if (!existing) { alert('Pesanan tidak ditemukan. Muat ulang halaman lalu coba lagi.'); return; }
            const updated = { ...existing, pelangganId, items, catatan, noOrder, kodeSalesman, pembayaran };
            await dbUpsert('pesanan', updated);
            Object.assign(existing, updated);
        } else {
            // Nomor nota unik di server; bila bentrok dengan perangkat lain, ambil data terbaru lalu buat ulang.
            let newOrd = null;
            for (let attempt = 0; attempt < 3 && !newOrd; attempt++) {
                const cand = {
                    id: 'ord_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
                    noNota: generateNoNota(),
                    tanggal: new Date().toISOString(),
                    pelangganId: pelangganId,
                    items: items,
                    catatan: catatan,
                    noOrder: noOrder,
                    kodeSalesman: kodeSalesman,
                    pembayaran: pembayaran
                };
                try {
                    await dbUpsert('pesanan', cand);
                    newOrd = cand;
                } catch (err) {
                    if (err && err.code === '23505') { await reloadPesanan(); continue; }
                    throw err;
                }
            }
            if (!newOrd) throw new Error('Nomor nota bentrok dengan perangkat lain. Silakan coba simpan lagi.');
            pesananList.unshift(newOrd);
        }
    } catch (err) {
        return dbFail(err, 'menyimpan pesanan');
    } finally {
        savingPesanan = false;
    }

    closeModalPesanan();
    renderPesanan();
}

function editPesanan(id) {
    openModalPesanan(id);
}


async function deletePesanan(id) {
    if (!requirePerm('pesanan.delete')) return;
    if (!confirm('Yakin ingin menghapus pesanan ini?')) return;
    try {
        await dbDelete('pesanan', id);
    } catch (err) {
        return dbFail(err, 'menghapus pesanan');
    }
    pesananList = pesananList.filter(o => o.id !== id);
    renderPesanan();
}

// ================= PREVIEW, UNDUH GAMBAR & WHATSAPP =================
let currentNotaNo = '';

function previewWhatsapp(id) {
    const ord = pesananList.find(o => o.id === id);
    if (!ord) return;
    currentNotaNo = ord.noNota;
    currentNotaId = ord.id;

    // Pratinjau lembar nota A6 landscape
    document.getElementById('inv-sheets').innerHTML = buildNotaSheets(ord)
        .map(sheet => `<div class="nota-fit"><div class="nota-fit-inner">${sheet}</div></div>`).join('');
    document.getElementById('modal-whatsapp').classList.remove('hidden');
    fitNotaPreview();
}

function closeModalWhatsapp() {
    document.getElementById('modal-whatsapp').classList.add('hidden');
}

// ================= PARAF TOKO: goresan tanda tangan di layar =================
// Disimpan permanen di kolom pesanan.paraf_toko (gambar PNG transparan berbentuk data URL).
const parafImgCache = {};   // { dataURL: Image } agar tidak dimuat ulang tiap menggambar

function loadParafImg(url) {
    return new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = url; });
}

function getParafImg(url) {
    if (!url) return null;
    if (!parafImgCache[url]) { const im = new Image(); im.src = url; parafImgCache[url] = im; }
    return parafImgCache[url];
}

// Pastikan gambar paraf sudah termuat sebelum nota digambar ke Canvas.
async function preloadParaf(list) {
    await Promise.all(list.filter(o => o.parafToko).map(o => new Promise(res => {
        const im = getParafImg(o.parafToko);
        if (im.complete) res(); else { im.onload = res; im.onerror = res; }
    })));
}

let savingParaf = false;
let sigCtx = null, sigDrawing = false, sigHas = false, sigLast = null, sigMid = null, sigBox = null, sigBound = false;
const SIG_LW = 4;       // tebal goresan (px layar)

function loadParafImg(url) {
    return new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = url; });
}

function sigSetup() {
    const c = byId('paraf-canvas');
    const dpr = window.devicePixelRatio || 1;
    c.width = Math.max(1, Math.round(c.clientWidth * dpr));
    c.height = Math.max(1, Math.round(c.clientHeight * dpr));
    sigCtx = c.getContext('2d');
    sigCtx.lineCap = 'round'; sigCtx.lineJoin = 'round';
    sigCtx.lineWidth = SIG_LW * dpr; sigCtx.strokeStyle = '#111'; sigCtx.fillStyle = '#111';
    sigHas = false; sigBox = null;
    if (sigBound) return;
    sigBound = true;
    const pt = (e) => { const r = c.getBoundingClientRect(); return { x: (e.clientX - r.left) * c.width / r.width, y: (e.clientY - r.top) * c.height / r.height }; };
    const grow = (p) => {
        sigBox = sigBox ? { x0: Math.min(sigBox.x0, p.x), y0: Math.min(sigBox.y0, p.y), x1: Math.max(sigBox.x1, p.x), y1: Math.max(sigBox.y1, p.y) } : { x0: p.x, y0: p.y, x1: p.x, y1: p.y };
    };
    c.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        try { c.setPointerCapture(e.pointerId); } catch (err) { /* abaikan */ }
        sigDrawing = true; sigHas = true;
        const p = pt(e); sigLast = p; sigMid = p; grow(p);
        sigCtx.beginPath(); sigCtx.arc(p.x, p.y, sigCtx.lineWidth / 2, 0, Math.PI * 2); sigCtx.fill();
    });
    c.addEventListener('pointermove', (e) => {
        if (!sigDrawing) return;
        e.preventDefault();
        const p = pt(e); grow(p);
        const mid = { x: (sigLast.x + p.x) / 2, y: (sigLast.y + p.y) / 2 };
        sigCtx.beginPath(); sigCtx.moveTo(sigMid.x, sigMid.y);
        sigCtx.quadraticCurveTo(sigLast.x, sigLast.y, mid.x, mid.y); sigCtx.stroke();
        sigMid = mid; sigLast = p;
    });
    const end = () => { sigDrawing = false; };
    c.addEventListener('pointerup', end);
    c.addEventListener('pointercancel', end);
    c.addEventListener('pointerleave', end);
}

function openParafToko() {
    if (!currentNotaId) return;
    byId('modal-paraf').classList.remove('hidden');
    const cur = pesananList.find(o => o.id === currentNotaId);
    byId('paraf-hapus').classList.toggle('hidden', !(cur && cur.parafToko));
    requestAnimationFrame(sigSetup);
}

function closeParafToko() {
    byId('modal-paraf').classList.add('hidden');
    sigDrawing = false;
}

function clearParafCanvas() {
    if (!sigCtx) return;
    sigCtx.clearRect(0, 0, sigCtx.canvas.width, sigCtx.canvas.height);
    sigHas = false; sigBox = null;
}

async function simpanParafKeDb(ord, url) {
    if (!requirePerm('pesanan.write')) return false;
    if (savingParaf) return false;
    savingParaf = true;
    try {
        await dbUpsert('pesanan', { ...ord, parafToko: url });
        ord.parafToko = url;
        return true;
    } catch (err) {
        dbFail(err, 'menyimpan paraf toko');
        return false;
    } finally {
        savingParaf = false;
    }
}

async function saveParafToko() {
    if (!sigHas || !sigBox) { alert('Belum ada goresan paraf. Silakan goreskan paraf di kotak terlebih dahulu.'); return; }
    const ord = pesananList.find(o => o.id === currentNotaId);
    if (!ord) return;
    const src = sigCtx.canvas;
    const pad = Math.ceil(sigCtx.lineWidth * 1.5);
    const x = Math.max(0, Math.floor(sigBox.x0 - pad)), y = Math.max(0, Math.floor(sigBox.y0 - pad));
    const w = Math.min(src.width - x, Math.ceil(sigBox.x1 - sigBox.x0 + pad * 2));
    const h = Math.min(src.height - y, Math.ceil(sigBox.y1 - sigBox.y0 + pad * 2));
    const sc = Math.min(1, 600 / Math.max(1, w));   // batasi lebar 600 px agar ukuran data kecil
    const out = document.createElement('canvas');
    out.width = Math.max(1, Math.round(w * sc)); out.height = Math.max(1, Math.round(h * sc));
    out.getContext('2d').drawImage(src, x, y, w, h, 0, 0, out.width, out.height);
    const url = out.toDataURL('image/png');
    if (!(await simpanParafKeDb(ord, url))) return;
    closeParafToko();
    previewWhatsapp(currentNotaId);   // segarkan pratinjau nota
}

async function hapusParafToko() {
    const ord = pesananList.find(o => o.id === currentNotaId);
    if (!ord) return;
    if (!confirm('Hapus paraf toko pada nota ini?')) return;
    if (!(await simpanParafKeDb(ord, ''))) return;
    closeParafToko();
    previewWhatsapp(currentNotaId);
}

// ================= UNDUH GAMBAR A4 REKAP SEMUA PESANAN =================
// ================= NOTA A6 LANDSCAPE (148 x 105 mm) =================
let currentNotaId = '';
const NOTA_TITLE = 'CV Mitra Sejahtera';   // judul pada lembar nota (tanpa nomor nota)
const NOTA_ROWS_LAST = 12;      // baris item pada lembar terakhir (memuat total + kotak paraf)
const NOTA_ROWS_LAST_CAT = 10;  // idem, bila ada catatan
const NOTA_ROWS_MID = 16;       // baris item pada lembar lanjutan (bila item sangat banyak)
// Unduhan gambar ~300 dpi (A6 = 1748 x 1240 px, A4 = 3508 x 2480 px), digambar di Canvas (lihat drawNotaSheet)

function fmtNum(n) {
    return Number(n || 0).toLocaleString('id-ID');
}

// Membagi pesanan menjadi model lembar A6. Satu pesanan = 1 lembar; bila item melebihi
// kapasitas, otomatis bersambung ke lembar berikutnya (total & paraf di lembar terakhir).
// Model ini dipakai bersama oleh pratinjau/cetak (HTML) dan unduhan gambar (Canvas).
function buildNotaModels(ord) {
    const pel = pelangganList.find(c => c.id === ord.pelangganId) || { nama: 'Umum', hp: '', alamat: '-' };
    const items = ord.items || [];
    const catatan = (ord.catatan || '').trim();
    const capLast = catatan ? NOTA_ROWS_LAST_CAT : NOTA_ROWS_LAST;

    const chunks = [];
    let rest = items.slice();
    while (rest.length > capLast) {
        const take = Math.min(NOTA_ROWS_MID, rest.length - 1);
        chunks.push(rest.slice(0, take));
        rest = rest.slice(take);
    }
    chunks.push(rest);

    const grand = items.reduce((t, i) => t + i.qty * i.harga, 0);
    const tgl = new Date(ord.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
    const alamat = (pel.alamat && pel.alamat !== '-') ? pel.alamat : '';
    const hp = (pel.hp && pel.hp !== '-') ? pel.hp : '';
    let no = 0;

    return chunks.map((chunk, idx) => ({
        idx,
        total: chunks.length,
        isLast: idx === chunks.length - 1,
        noNota: ord.noNota,
        tgl,
        shop: pel.nama,
        alamatLine: [alamat, hp].filter(Boolean).join('  \u2022  '),
        noOrder: ord.noOrder || '',
        kodeSalesman: ord.kodeSalesman || '',
        parafToko: ord.parafToko || '',
        parafImg: getParafImg(ord.parafToko),
        bayar: ord.pembayaran || '',
        catatan,
        grand,
        rows: chunk.map(it => ({
            no: ++no,
            nama: String(it.nama || ''),
            varian: it.varianWarna ? String(it.varianWarna) : '',
            qty: String(it.qty),
            satuan: it.satuan || 'Pcs',
            harga: it.harga,
            sub: it.qty * it.harga
        }))
    }));
}

// Mengembalikan daftar HTML lembar A6 (untuk pratinjau & cetak).
function buildNotaSheets(ord) {
    return buildNotaModels(ord).map(m => {
        const rows = m.rows.map(r => {
            const nama = esc(r.nama) + (r.varian ? ` <span class="na-var">(${esc(r.varian)})</span>` : '');
            return `<div class="na-tr"><span class="na-c-no">${r.no}</span><span class="na-c-nm">${nama}</span>` +
                `<span class="na-c-q">${esc(r.qty)} ${esc(r.satuan)}</span>` +
                `<span class="na-c-h">${fmtNum(r.harga)}</span><span class="na-c-s">${fmtNum(r.sub)}</span></div>`;
        }).join('');

        const footer = m.isLast
            ? (m.catatan ? `<div class="na-note"><b>Catatan:</b> ${esc(m.catatan)}</div>` : '') +
              `<div class="na-total"><span>TOTAL</span><span>${formatRupiah(m.grand)}</span></div>` +
              `<div class="na-sign">` +
              ['Paraf Toko', 'Gudang', 'Salesman', 'Kacab'].map(n => `<div class="na-sb"><div class="na-sl">${n}</div>${(n === 'Paraf Toko' && m.parafToko) ? `<img class="na-sig" src="${m.parafToko}" alt="">` : ''}</div>`).join('') +
              `</div>`
            : `<div class="na-more">bersambung ke halaman berikutnya &rarr;</div>`;

        return `<div class="nota-a6">` +
            `<div class="na-head">` +
              `<div class="na-head-l"><div class="na-shop">${esc(m.shop)}</div><div class="na-addr">${esc(m.alamatLine)}</div></div>` +
              `<div class="na-head-r"><div class="na-title">${esc(NOTA_TITLE)}</div><div class="na-meta">${esc(m.tgl)}</div>` +
              (m.total > 1 ? `<div class="na-meta">Hal ${m.idx + 1}/${m.total}</div>` : '') + `</div>` +
            `</div>` +
            `<div class="na-info">` +
              `<div class="na-f"><span class="na-fl">No. Order</span><span class="na-fv">${esc(m.noOrder)}</span></div>` +
              `<div class="na-f"><span class="na-fl">Nama Salesman</span><span class="na-fv">${esc(m.kodeSalesman)}</span></div>` +
              `<div class="na-pay"><span class="na-cb"><i class="na-box">${m.bayar === 'cash' ? 'X' : ''}</i>Cash</span>` +
              `<span class="na-cb"><i class="na-box">${m.bayar === 'tempo' ? 'X' : ''}</i>Tempo</span></div>` +
            `</div>` +
            `<div class="na-tbl">` +
              `<div class="na-tr na-th"><span class="na-c-no">No</span><span class="na-c-nm">Nama Produk</span><span class="na-c-q">Qty</span><span class="na-c-h">Harga</span><span class="na-c-s">Subtotal</span></div>` +
              rows +
            `</div>` +
            footer +
            `</div>`;
    });
}

// Pratinjau diperkecil agar muat di lebar layar (HP); ukuran asli tetap 148 x 105 mm.
function fitNotaPreview() {
    document.querySelectorAll('#inv-sheets .nota-fit').forEach(wrap => {
        const inner = wrap.firstElementChild;
        const sheet = inner.firstElementChild;
        const w = sheet.offsetWidth, hgt = sheet.offsetHeight;
        if (!w) return;
        const scale = Math.min(1, wrap.clientWidth / w);
        inner.style.transform = `scale(${scale})`;
        inner.style.transformOrigin = 'top left';
        wrap.style.height = (hgt * scale + 2) + 'px';
    });
}
window.addEventListener('resize', fitNotaPreview);

// ================= UNDUH GAMBAR: digambar langsung di Canvas =================
// Tidak memotret HTML (html2canvas), jadi posisi teks tidak bergeser/terpotong di browser mana pun.
// Semua ukuran dalam mm, sama dengan CSS .nota-a6 agar hasilnya setara dengan pratinjau & cetak.
const NOTA_FONT = 'Arial, Helvetica, "Liberation Sans", sans-serif';
const PT = 25.4 / 72;   // 1 pt dalam mm

// Teks dipotong dengan "..." bila melebihi lebar.
function cvFit(ctx, text, maxW) {
    text = String(text);
    if (maxW <= 0) return '';
    if (ctx.measureText(text).width <= maxW) return text;
    const ell = '\u2026';
    let lo = 0, hi = text.length;
    while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (ctx.measureText(text.slice(0, mid).trimEnd() + ell).width <= maxW) lo = mid; else hi = mid - 1;
    }
    return lo ? text.slice(0, lo).trimEnd() + ell : ell;
}

// Bungkus teks per kata, maksimal maxLines baris (baris terakhir diberi "...").
function cvWrap(ctx, text, maxW, maxLines) {
    const words = String(text).split(/\s+/).filter(Boolean);
    const lines = [];
    let cur = '';
    for (let i = 0; i < words.length; i++) {
        const test = cur ? cur + ' ' + words[i] : words[i];
        if (ctx.measureText(test).width <= maxW || !cur) { cur = test; continue; }
        lines.push(cur);
        cur = words[i];
        if (lines.length === maxLines - 1) { cur = words.slice(i).join(' '); break; }
    }
    if (cur) lines.push(cur);
    return lines.slice(0, maxLines).map((ln, i, arr) => i === arr.length - 1 ? cvFit(ctx, ln, maxW) : ln);
}

// Menggambar satu lembar A6 (148 x 105 mm) dengan sudut kiri-atas di (ox, oy) mm; k = piksel per mm.
function drawNotaSheet(ctx, m, ox, oy, k) {
    const X = v => (ox + v) * k;     // koordinat mm -> piksel
    const Y = v => (oy + v) * k;
    const L = v => v * k;            // panjang mm -> piksel
    const W = 148, H = 105, PX = 5, PY = 3.5;
    const x0 = PX, x1 = W - PX, cw = x1 - x0;
    const ink = '#111';

    const font = (pt, bold, italic) => {
        ctx.font = `${italic ? 'italic ' : ''}${bold ? 'bold ' : ''}${(pt * PT * k).toFixed(2)}px ${NOTA_FONT}`;
        return pt * PT;
    };
    // Teks diletakkan pada garis dasar yang dihitung dari tengah kotak baris (bukan dari line-height).
    const text = (str, x, boxTop, boxH, pt, opt = {}) => {
        const fs = font(pt, opt.bold, opt.italic);
        ctx.fillStyle = opt.color || ink;
        ctx.textAlign = opt.align || 'left';
        ctx.textBaseline = 'alphabetic';
        const base = boxTop + boxH / 2 + fs * 0.35;      // tengah tinggi huruf kapital Arial
        ctx.fillText(str, X(x), Y(base));
    };
    const tw = (str, pt, bold, italic) => { font(pt, bold, italic); return ctx.measureText(str).width / k; };
    const rect = (x, y, w, h, fill) => { ctx.fillStyle = fill; ctx.fillRect(X(x), Y(y), L(w), L(h)); };
    const frame = (x, y, w, h, lw, color) => {      // garis di DALAM kotak (seperti border-box CSS)
        ctx.strokeStyle = color; ctx.lineWidth = L(lw);
        ctx.strokeRect(X(x + lw / 2), Y(y + lw / 2), L(w - lw), L(h - lw));
    };
    const hline = (x, y, w, lw, color) => rect(x, y, w, lw, color);
    // lebar teks dalam mm untuk ukuran/gaya tertentu (dipakai cvFit yang bekerja dalam piksel)
    const fit = (str, pt, bold, maxWmm) => { font(pt, bold); return cvFit({ measureText: s => ({ width: ctx.measureText(s).width / k }) }, str, maxWmm); };

    // latar putih
    rect(0, 0, W, H, '#fff');

    // ---- kepala ----
    const headH = 10.5;
    const rTitleW = tw(NOTA_TITLE, 9, true) + 0.14 * NOTA_TITLE.length;
    const rMeta = m.tgl;
    const rightW = Math.max(rTitleW, tw(rMeta, 6.5), m.total > 1 ? tw(`Hal ${m.idx + 1}/${m.total}`, 6.5) : 0);
    const leftW = cw - rightW - 4;
    text(fit(m.shop, 10, true, leftW), x0, PY, 4.2, 10, { bold: true });
    text(fit(m.alamatLine, 6.5, false, leftW), x0, PY + 4.6, 3, 6.5, { color: '#444' });
    try { ctx.letterSpacing = (0.14 * k).toFixed(2) + 'px'; } catch (e) { /* tidak didukung */ }
    text(NOTA_TITLE, x1, PY, 4.2, 9, { bold: true, align: 'right' });
    try { ctx.letterSpacing = '0px'; } catch (e) { /* tidak didukung */ }
    text(rMeta, x1, PY + 4.3, 3, 6.5, { color: '#333', align: 'right' });
    if (m.total > 1) text(`Hal ${m.idx + 1}/${m.total}`, x1, PY + 7.4, 3, 6.5, { color: '#333', align: 'right' });
    hline(x0, PY + headH - 0.3, cw, 0.3, ink);

    // ---- baris info (No. Order, Nama Salesman, Cash/Tempo) ----
    const infoTop = PY + headH + 1.5, infoBot = infoTop + 5.5;
    const cbW = t => 3.4 + 1 + tw(t, 7, true);
    const payW = cbW('Cash') + 3 + cbW('Tempo');
    const fW = (cw - 6 - payW) / 2;
    const field = (label, value, fx) => {
        text(label, fx, infoBot - 3.6, 3.6, 6.5, { bold: true });
        const lw = tw(label, 6.5, true) + 1;
        const vx = fx + lw, vw = fW - lw;
        hline(vx, infoBot - 0.25, vw, 0.25, ink);
        if (value) text(fit(value, 7, true, vw - 1.6), vx + 0.8, infoBot - 3.8, 3.55, 7, { bold: true });
    };
    field('No. Order', m.noOrder, x0);
    field('Nama Salesman', m.kodeSalesman, x0 + fW + 3);
    let px = x0 + 2 * fW + 6;
    const payMid = infoBot - 2.25;
    [['Cash', 'cash'], ['Tempo', 'tempo']].forEach(([lab, key]) => {
        frame(px, payMid - 1.7, 3.4, 3.4, 0.3, ink);
        if (m.bayar === key) text('X', px + 1.7, payMid - 1.7, 3.4, 7, { bold: true, align: 'center' });
        text(lab, px + 4.4, payMid - 2, 4, 7, { bold: true });
        px += cbW(lab) + 3;
    });

    // ---- hitung posisi dari bawah ----
    const bottom = H - PY;
    const signTop = bottom - 15;
    let tblBottom;
    let noteLines = [], noteTop = 0, noteH = 0, totalTop = 0;
    if (m.isLast) {
        totalTop = signTop - 1.2 - 4.5;
        if (m.catatan) {
            font(6.5);
            const mctx = { measureText: s => ({ width: ctx.measureText(s).width / k }) };
            noteLines = cvWrap(mctx, 'Catatan: ' + m.catatan, cw, 2);
            noteH = Math.min(5.6, noteLines.length * 6.5 * PT * 1.2);
            noteTop = totalTop - 1 - noteH;
            tblBottom = noteTop - 1;
        } else {
            tblBottom = totalTop - 1;
        }
    } else {
        tblBottom = bottom - 4;
    }

    // ---- tabel ----
    const tblTop = infoBot + 1.5, tblH = tblBottom - tblTop;
    frame(x0, tblTop, cw, tblH, 0.3, ink);
    ctx.save();
    ctx.beginPath(); ctx.rect(X(x0 + 0.3), Y(tblTop + 0.3), L(cw - 0.6), L(tblH - 0.6)); ctx.clip();
    const tx = x0 + 0.3 + 1, tW = cw - 0.6 - 2;
    const wNo = 6, wQ = 20, wH = 18, wS = 24, gap = 1;
    const wNm = tW - wNo - wQ - wH - wS - 4 * gap;
    const cNo = tx, cNm = cNo + wNo + gap, cQ = cNm + wNm + gap, cH = cQ + wQ + gap, cS = cH + wH + gap;

    let ry = tblTop + 0.3;
    rect(x0 + 0.3, ry, cw - 0.6, 4, '#ececec');
    hline(x0 + 0.3, ry + 3.7, cw - 0.6, 0.3, ink);
    text('No', cNo + wNo / 2, ry, 3.7, 6.5, { bold: true, align: 'center' });
    text('Nama Produk', cNm, ry, 3.7, 6.5, { bold: true });
    text('Qty', cQ + wQ, ry, 3.7, 6.5, { bold: true, align: 'right' });
    text('Harga', cH + wH, ry, 3.7, 6.5, { bold: true, align: 'right' });
    text('Subtotal', cS + wS, ry, 3.7, 6.5, { bold: true, align: 'right' });
    ry += 4;

    m.rows.forEach(r => {
        text(String(r.no), cNo + wNo / 2, ry, 4.05, 7, { align: 'center' });
        // nama produk dipotong "..." bila panjang; varian warna tetap terlihat
        const varTxt = r.varian ? `(${r.varian})` : '';
        const varW = varTxt ? tw(varTxt, 6) + 0.9 : 0;
        const nm = fit(r.nama, 7, false, wNm - varW);
        text(nm, cNm, ry, 4.05, 7);
        if (varTxt) {
            const nmW = tw(nm, 7);
            text(fit(varTxt, 6, false, Math.max(2, wNm - nmW - 0.9)), cNm + nmW + 0.9, ry, 4.05, 6, { color: '#555' });
        }
        text(fit(`${r.qty} ${r.satuan}`, 7, false, wQ), cQ + wQ, ry, 4.05, 7, { align: 'right' });
        text(fmtNum(r.harga), cH + wH, ry, 4.05, 7, { align: 'right' });
        text(fmtNum(r.sub), cS + wS, ry, 4.05, 7, { align: 'right' });
        hline(x0 + 0.3, ry + 4.05, cw - 0.6, 0.15, '#cccccc');
        ry += 4.2;
    });
    ctx.restore();

    // ---- footer ----
    if (m.isLast) {
        if (noteLines.length) {
            const lh = 6.5 * PT * 1.2;
            noteLines.forEach((ln, i) => {
                if (i === 0) {
                    const lab = 'Catatan:';
                    text(lab, x0, noteTop, lh, 6.5, { bold: true });
                    const labW = tw(lab, 6.5, true) + tw(' ', 6.5);
                    text(ln.replace(/^Catatan:\s?/, ''), x0 + labW, noteTop, lh, 6.5);
                } else {
                    text(ln, x0, noteTop + i * lh, lh, 6.5);
                }
            });
        }
        text('TOTAL', x0, totalTop, 4.5, 8.5, { bold: true });
        text(formatRupiah(m.grand), x1, totalTop, 4.5, 8.5, { bold: true, align: 'right' });

        const bw = (cw - 6) / 4;
        ['Paraf Toko', 'Gudang', 'Salesman', 'Kacab'].forEach((n, i) => {
            const bx = x0 + i * (bw + 2);
            rect(bx + 0.3, signTop + 0.3, bw - 0.6, 3.8, '#f1f1f1');
            hline(bx + 0.3, signTop + 0.3 + 3.8 - 0.2, bw - 0.6, 0.2, '#888888');
            frame(bx, signTop, bw, 15, 0.3, ink);
            text(n, bx + bw / 2, signTop + 0.3, 3.4, 6.5, { bold: true, align: 'center' });
            if (n === 'Paraf Toko' && m.parafImg && m.parafImg.naturalWidth) {
                const ax = bx + 0.9, ay = signTop + 4.4, aw = bw - 1.8, ah = 10.1;
                const sc = Math.min(aw / m.parafImg.naturalWidth, ah / m.parafImg.naturalHeight);
                const dw = m.parafImg.naturalWidth * sc, dh = m.parafImg.naturalHeight * sc;
                ctx.drawImage(m.parafImg, X(ax + (aw - dw) / 2), Y(ay + (ah - dh) / 2), L(dw), L(dh));
            }
        });
    } else {
        text('bersambung ke halaman berikutnya \u2192', x1, tblBottom + 1, 3, 6.5, { italic: true, color: '#444', align: 'right' });
    }
}

function newCanvas(wMm, hMm, k) {
    const c = document.createElement('canvas');
    c.width = Math.round(wMm * k);
    c.height = Math.round(hMm * k);
    return c;
}

// Satu lembar A6 -> canvas (~300 dpi: 1748 x 1240 px)
function renderNotaCanvas(model) {
    const k = 300 / 25.4;
    const c = newCanvas(148, 105, k);
    const ctx = c.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    drawNotaSheet(ctx, model, 0, 0, k);
    return c;
}

// Satu halaman A4 landscape (297 x 210 mm) berisi maksimal 4 lembar A6 (2 x 2) -> canvas (3508 x 2480 px)
function renderA4Canvas(models) {
    const k = 300 / 25.4;
    const c = newCanvas(297, 210, k);
    const ctx = c.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, c.width, c.height);
    models.forEach((m, i) => {
        const cx = (i % 2) * 148.5, cy = Math.floor(i / 2) * 105;
        drawNotaSheet(ctx, m, cx, cy, k);
        ctx.save();
        ctx.setLineDash([0.8 * k, 0.5 * k]);
        ctx.strokeStyle = '#b5b5b5';
        ctx.lineWidth = 0.2 * k;
        ctx.strokeRect(cx * k + 0.1 * k, cy * k + 0.1 * k, 148.5 * k - 0.2 * k, 105 * k - 0.2 * k);
        ctx.restore();
    });
    return c;
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function saveBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = filename;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
}

function canvasToBlob(canvas, type, quality) {
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Gambar gagal dibuat.')), type, quality);
    });
}

async function saveCanvas(canvas, filename) {
    saveBlob(await canvasToBlob(canvas, 'image/png'), filename);
}

// Membuat file PDF sederhana (tanpa library): tiap halaman berisi satu gambar JPEG penuh.
// pages = [{ jpeg: Uint8Array, w: piksel, h: piksel }], ukuran halaman A4 landscape (297 x 210 mm).
function buildPdfFromJpegs(pages) {
    const PW = 841.89, PH = 595.28;   // A4 landscape dalam poin
    const enc = new TextEncoder();
    const parts = [];
    const offsets = [];
    let pos = 0;
    const add = (x) => { const b = typeof x === 'string' ? enc.encode(x) : x; parts.push(b); pos += b.length; };
    const obj = (n, fn) => { offsets[n] = pos; add(`${n} 0 obj\n`); fn(); add('\nendobj\n'); };

    const total = 2 + pages.length * 3;
    add('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
    obj(1, () => add('<< /Type /Catalog /Pages 2 0 R >>'));
    obj(2, () => add(`<< /Type /Pages /Count ${pages.length} /Kids [${pages.map((_, i) => `${3 + i * 3} 0 R`).join(' ')}] >>`));
    pages.forEach((p, i) => {
        const po = 3 + i * 3, co = po + 1, io = po + 2;
        obj(po, () => add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PW} ${PH}] /Resources << /XObject << /Im0 ${io} 0 R >> >> /Contents ${co} 0 R >>`));
        const content = `q ${PW} 0 0 ${PH} 0 0 cm /Im0 Do Q`;
        obj(co, () => add(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`));
        obj(io, () => {
            add(`<< /Type /XObject /Subtype /Image /Width ${p.w} /Height ${p.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${p.jpeg.length} >>\nstream\n`);
            add(p.jpeg);
            add('\nendstream');
        });
    });
    const xrefPos = pos;
    add(`xref\n0 ${total + 1}\n0000000000 65535 f \n`);
    for (let n = 1; n <= total; n++) add(String(offsets[n]).padStart(10, '0') + ' 00000 n \n');
    add(`trailer\n<< /Size ${total + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`);
    return new Blob(parts, { type: 'application/pdf' });
}

let notaBusy = false;

async function downloadInvoiceImage() {
    if (notaBusy) return;
    const ord = pesananList.find(o => o.id === currentNotaId);
    if (!ord) return;

    notaBusy = true;
    try {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        await preloadParaf([ord]);
        const models = buildNotaModels(ord);
        for (let i = 0; i < models.length; i++) {
            const canvas = renderNotaCanvas(models[i]);
            const suffix = models.length > 1 ? `_hal${i + 1}` : '';
            await saveCanvas(canvas, `Nota_${currentNotaNo || 'Pesanan'}${suffix}.png`);
            if (i < models.length - 1) await sleep(400);
        }
    } catch (err) {
        alert('Gagal mengunduh gambar nota: ' + err.message);
    } finally {
        notaBusy = false;
    }
}

// Cetak nota ukuran A6 landscape (148 x 105 mm)
function printNota() {
    const ord = pesananList.find(o => o.id === currentNotaId);
    if (!ord) return;

    const root = document.createElement('div');
    root.id = 'nota-print-root';
    root.innerHTML = buildNotaSheets(ord).join('');
    document.body.appendChild(root);

    const pageStyle = document.createElement('style');
    pageStyle.id = 'nota-page-style';
    pageStyle.textContent = '@page { size: 148mm 105mm; margin: 0; }';
    document.head.appendChild(pageStyle);
    document.documentElement.classList.add('printing-nota');

    const cleanup = () => {
        root.remove();
        pageStyle.remove();
        document.documentElement.classList.remove('printing-nota');
        window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    setTimeout(() => window.print(), 80);
}

// Unduh rekap ukuran A4 (landscape): TEPAT 4 form A6 per halaman A4 (2 x 2).
async function exportLaporanImageA4() {
    if (notaBusy) return;
    const filtered = getLaporanFiltered();
    if (filtered.length === 0) {
        alert('Tidak ada data pesanan pada periode ini untuk diunduh!');
        return;
    }

    const models = [];
    await preloadParaf(filtered);
    filtered.forEach(ord => buildNotaModels(ord).forEach(m => models.push(m)));
    const pages = [];
    for (let i = 0; i < models.length; i += 4) pages.push(models.slice(i, i + 4));

    notaBusy = true;
    try {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        for (let i = 0; i < pages.length; i++) {
            const canvas = renderA4Canvas(pages[i]);
            const suffix = pages.length > 1 ? `_hal${i + 1}-dari-${pages.length}` : '';
            await saveCanvas(canvas, `Rekap_Pesanan_A4_${getLaporanFileSuffix()}${suffix}.png`);
            if (i < pages.length - 1) await sleep(500);
        }
        if (pages.length > 1) alert(`${pages.length} file gambar A4 telah diunduh (masing-masing berisi maksimal 4 form).`);
    } catch (err) {
        alert('Gagal mengunduh rekap A4: ' + err.message);
    } finally {
        notaBusy = false;
    }
}

// Unduh rekap A4 dalam bentuk PDF: isi dan susunan SAMA dengan Unduh Gambar A4 (4 form A6 per halaman, 2 x 2).
async function exportLaporanPdfA4() {
    if (notaBusy) return;
    const filtered = getLaporanFiltered();
    if (filtered.length === 0) {
        alert('Tidak ada data pesanan pada periode ini untuk diunduh!');
        return;
    }

    const models = [];
    await preloadParaf(filtered);
    filtered.forEach(ord => buildNotaModels(ord).forEach(m => models.push(m)));
    const groups = [];
    for (let i = 0; i < models.length; i += 4) groups.push(models.slice(i, i + 4));

    notaBusy = true;
    try {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        const pages = [];
        for (let i = 0; i < groups.length; i++) {
            const canvas = renderA4Canvas(groups[i]);
            const blob = await canvasToBlob(canvas, 'image/jpeg', 0.92);
            pages.push({ jpeg: new Uint8Array(await blob.arrayBuffer()), w: canvas.width, h: canvas.height });
            await sleep(0);
        }
        saveBlob(buildPdfFromJpegs(pages), `Rekap_Pesanan_A4_${getLaporanFileSuffix()}.pdf`);
    } catch (err) {
        alert('Gagal membuat PDF rekap A4: ' + err.message);
    } finally {
        notaBusy = false;
    }
}

// ================= LAPORAN & REKAP =================
let laporanInitialized = false;

let laporanAutoMonth = true;   // true = rentang otomatis bulan berjalan (belum diubah manual)

// Dipanggil saat tanggal diubah manual lewat kolom tanggal.
function laporanTanggalDiubah() {
    laporanAutoMonth = false;
    renderLaporan();
}

function getLaporanRange() {
    let dari = byId('laporan-dari').value;
    let sampai = byId('laporan-sampai').value;
    // Kedua tanggal kosong -> otomatis bulan berjalan (bukan semua data)
    if (!dari && !sampai) {
        const b = getBulanIniRange();
        dari = b.dari; sampai = b.sampai;
    }
    if (dari && sampai && dari > sampai) [dari, sampai] = [sampai, dari];
    return { dari, sampai };
}

// Filter berdasarkan TANGGAL PESANAN (tanggal lokal), lalu urut dari yang paling awal.
function getLaporanFiltered() {
    const { dari, sampai } = getLaporanRange();
    const filterUser = getLaporanUser();
    return pesananList
        .filter(ord => {
            if (filterUser && ord.ownerId !== filterUser) return false;
            const d = toLocalDateStr(ord.tanggal);
            if (!d) return false;
            if (dari && d < dari) return false;
            if (sampai && d > sampai) return false;
            return true;
        })
        .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
}

function formatTanggalIndo(str) {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getLaporanUser() {
    return can('users.manage') && byId('laporan-pengguna') ? (byId('laporan-pengguna').value || '') : '';
}

function getLaporanLabel() {
    const { dari, sampai } = getLaporanRange();
    let t;
    if (dari && sampai) t = dari === sampai ? formatTanggalIndo(dari) : `${formatTanggalIndo(dari)} - ${formatTanggalIndo(sampai)}`;
    else t = dari ? `Mulai ${formatTanggalIndo(dari)}` : `Sampai ${formatTanggalIndo(sampai)}`;
    const uid = getLaporanUser();
    return uid ? `${t} \u2022 ${userLabel(uid)}` : t;
}

function getLaporanFileSuffix() {
    const { dari, sampai } = getLaporanRange();
    let t;
    if (dari && sampai) t = dari === sampai ? dari : `${dari}_sd_${sampai}`;
    else t = dari ? `mulai_${dari}` : `sampai_${sampai}`;
    const uid = getLaporanUser();
    const u = uid ? userList.find(x => x.id === uid) : null;
    return u ? `${t}_${kodePengguna(u.username)}` : t;
}

function setLaporanHariIni() {
    laporanAutoMonth = false;
    const today = toLocalDateStr(new Date());
    byId('laporan-dari').value = today;
    byId('laporan-sampai').value = today;
    renderLaporan();
}

function setLaporanBulanIni() {
    laporanAutoMonth = true;
    const b = getBulanIniRange();
    byId('laporan-dari').value = b.dari;
    byId('laporan-sampai').value = b.sampai;
    renderLaporan();
}

function renderLaporan() {
    const filtered = getLaporanFiltered();
    const tbody = byId('table-laporan-body');
    byId('lap-periode-label').innerText = '- ' + getLaporanLabel();

    let totalItem = 0;
    let totalOmzet = 0;

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-gray-400">Tidak ada transaksi pada periode ini.</td></tr>`;
    } else {
        tbody.innerHTML = filtered.map(ord => {
            const pel = pelangganList.find(c => c.id === ord.pelangganId) || { nama: 'Umum' };
            const itemSumQty = ord.items.reduce((s, i) => s + (parseFloat(i.qty) || 0), 0);
            const itemSumHarga = ord.items.reduce((s, i) => s + ((parseFloat(i.qty) || 0) * (parseFloat(i.harga) || 0)), 0);

            totalItem += itemSumQty;
            totalOmzet += itemSumHarga;

            const itemsDesc = ord.items.map(i => `${i.qty}x ${i.nama}${i.varianWarna ? ' (' + i.varianWarna + ')' : ''}`).join(', ') + (ord.catatan ? ' — 📝 ' + ord.catatan : '');
            const waktu = new Date(ord.tanggal).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

            return `
                <tr class="hover:bg-gray-50 transition">
                    <td data-label="No. Nota" class="py-3 px-4 font-mono font-bold text-gray-800">${esc(ord.noNota)}</td>
                    <td data-label="Waktu" class="py-3 px-4 text-gray-600 text-xs whitespace-nowrap">${esc(waktu)}</td>
                    <td data-label="Pelanggan" class="py-3 px-4 font-semibold text-gray-800">${esc(pel.nama)}</td>
                    <td data-label="Item" class="py-3 px-4 text-gray-600 text-xs max-w-xs truncate" title="${esc(itemsDesc)}">${esc(itemsDesc)}</td>
                    <td data-label="Subtotal" class="py-3 px-4 font-bold text-emerald-600">${formatRupiah(itemSumHarga)}</td>
                </tr>
            `;
        }).join('');
    }

    byId('lap-total-pesanan').innerText = filtered.length;
    byId('lap-total-item').innerText = totalItem;
    byId('lap-total-omzet').innerText = formatRupiah(totalOmzet);
}

function exportExcelLaporan() {
    const filtered = getLaporanFiltered();

    if (filtered.length === 0) {
        alert('Tidak ada data untuk diexport!');
        return;
    }

    const dataToExport = [];
    filtered.forEach(ord => {
        const pel = pelangganList.find(c => c.id === ord.pelangganId) || { nama: 'Umum' };
        const waktu = new Date(ord.tanggal).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        ord.items.forEach(item => {
            dataToExport.push({
                'No Nota': ord.noNota,
                'Pengguna': userLabel(ord.ownerId),
                'Tanggal': toLocalDateStr(ord.tanggal),
                'Waktu': waktu,
                'Pelanggan': pel.nama,
                'Nama Produk': item.nama,
                'Varian / Kode Warna': item.varianWarna || '-',
                'Qty': item.qty,
                'Satuan': item.satuan || 'Pcs',
                'Harga Satuan': item.harga,
                'Subtotal': item.qty * item.harga,
                'No. Order': ord.noOrder || '',
                'Nama Salesman': ord.kodeSalesman || '',
                'Pembayaran': ord.pembayaran ? ord.pembayaran.toUpperCase() : '',
                'Catatan Pesanan': ord.catatan || ''
            });
        });
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Pesanan");
    XLSX.writeFile(workbook, `Rekap_Pesanan_${getLaporanFileSuffix()}.xlsx`);
}

function printLaporan() {
    exportLaporanPdfA4();
}

// ================= BACKUP & RESTORE DATABASE =================
function exportDatabase() {
    if (!requirePerm('backup')) return;
    const db = {
        produk: produkList,
        pelanggan: pelangganList,
        pesanan: pesananList,
        backupDate: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `backup_database_pesanan_${toLocalDateStr(new Date())}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
}


function importDatabase(event) {
    if (!requirePerm('backup')) return;
    const input = event.target;
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function (e) {
        try {
            const db = JSON.parse(e.target.result);
            if (!(Array.isArray(db.produk) && Array.isArray(db.pelanggan) && Array.isArray(db.pesanan))) {
                alert('Format file JSON backup tidak valid!');
                return;
            }
            const msg = `Restore akan menambah/menimpa data di database online (berdasarkan ID):\\n` +
                `- ${db.produk.length} produk\\n- ${db.pelanggan.length} pelanggan\\n- ${db.pesanan.length} pesanan\\n\\n` +
                `Data lain yang sudah ada TIDAK dihapus. Lanjutkan?`;
            if (!confirm(msg)) return;

            await dbUpsertMany('produk', db.produk);
            await dbUpsertMany('pelanggan', db.pelanggan);
            await dbUpsertMany('pesanan', db.pesanan);
            await loadAllData();
            refreshActiveTab();
            alert('Database berhasil dipulihkan!');
        } catch (err) {
            dbFail(err, 'restore database');
        } finally {
            input.value = '';
        }
    };
    reader.readAsText(file);
}

// Tutup dropdown autocomplete saat pengguna mengklik di luar area input / dropdown
document.addEventListener('click', function (e) {
    // Dropdown Pelanggan
    if (!e.target.closest('#pesanan-pelanggan-input') && !e.target.closest('#pelanggan-dropdown-list')) {
        const pList = document.getElementById('pelanggan-dropdown-list');
        if (pList) pList.classList.add('hidden');
    }
    // Dropdown Produk
    document.querySelectorAll('.product-dropdown-list').forEach(list => {
        const row = list.closest('#items-container > div');
        const input = row ? row.querySelector('.product-search-input') : null;
        if (input && !e.target.closest('.product-dropdown-list') && e.target !== input) {
            list.classList.add('hidden');
        }
    });
    // Dropdown Varian
    document.querySelectorAll('.varian-dropdown-list').forEach(list => {
        const row = list.closest('#items-container > div');
        const input = row ? row.querySelector('.varian-search-input') : null;
        if (input && !e.target.closest('.varian-dropdown-list') && e.target !== input) {
            list.classList.add('hidden');
        }
    });
});

initAuth();

// Penghitung karakter catatan pesanan
document.addEventListener('input', function (e) {
    if (e.target && e.target.id === 'pesanan-catatan') updateCatatanCount();
});
