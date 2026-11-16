const MAGIC_COLOR_OPTIONS = [
    "139 BLACK", "140 WHITE", "101 CLEAR", "126 MEDIUM GREY", "124 STONE GREY", "129 METALLIC BLACK", "193 BRIGHT GREEN", "176 NASA GREEN", "144 ULTRA VIOLET",
    "184 BLACK DOFF", "115 IVORY", "110 CLEAR DOFF", "143 COKLAT MUDA", "177 MADORAS BROWN", "174 BOXER ORANGE", "112 METALLIC YELLOW", "116 PLASMA BLUE", "172 FEDERAL BLUE",
    "111 ELECTRIC GREEN", "114 ORANGE", "127 SOFT PINK", "141 YELLOW", "131 DARK YELLOW", "190 METALLIC RED", "180 SILVER METALLIC", "136 SILVER", "189 GOLD",
    "173 NINJA GREEN", "123 SIGNAL RED", "119 SKY BLUE", "121 OCEAN BLUE", "102 INDIGO BLUE", "145 LIGHT PURPLE", "183 ZONA BLUE", "165 GREY METALLIC", "199 METALLIC BROWN",
    "137 GRASS GREEN", "138 MAROON", "118 PURPLE ANGEL", "157 BELL FLOWER", "154 DEEP BLUE", "MC 10 CANDY TONE RED", "MC 11 CANDY TONE YELLOW", "191 PEARL WHITE", "150 BRONZE",
    "147 BALTIC WHITE", "13 - DARK GREEN", "160 TOSCA", "182 GULL YELLOW", "156 ATLANTIS BLUE", "122 ARMY GREEN", "MC 12 CANDY TONE BLUE", "MC 13 CANDY TONE GREEN", "PRIMER GREY 120"
];

// Kode warna katalog Diton (Solid, Candytone, Metallic, Gold, Special, Chrome, Hi-Temp, Fluorescent, Primer).
const DITON_COLOR_SOLID = [
    "813 DEEP GREEN", "839 BLACK", "883 BLACK SEMI DOFF", "884 BLACK DOFF", "826 MEDIUM GREY", "834 LIGHT GREY", "824 DARK GREY", "8458 ULTRA WHITE",
    "837 GRASS GREEN", "8546 PS DAKAR YELLOW", "841 YELLOW", "8459 EXECUTIVE GREY", "822 MIKROLET BLUE", "8502 INDIGO BLUE", "827 SOFT PINK", "840 WHITE",
    "812 GOJEK GREEN", "825 CHROME YELLOW", "831 DARK YELLOW", "815 IVORY", "819 CERULEAN BLUE", "8432 SAPPHIRE BLUE", "830 ROSE PINK", "820 WHITE DOFF",
    "8455 FRESH GREEN", "8177 SHOGUN YELLOW", "833 SUNKIST ORANGE", "847 BALTIC WHITE", "821 OCEAN BLUE", "8431 STRONG BLUE", "811 MAGENTA", "8540 CLEAR",
    "8173 NINJA GREEN", "8548 COLT YELLOW", "814 ORANGE", "843 COKLAT MUDA", "8460 TOSCA GREEN", "828 DARK BLUE", "818 PURPLE ANGEL", "810 CLEAR DOFF",
    "829 HINO GREEN", "823 SIGNAL RED", "886 SPECIAL RED", "838 MAROON", "845 PARADISE GREEN", "8494 BRIGHT BLUE", "8773 MADORAS BROWN", "8461 TOBACCO BROWN L300",
    "8522 ARMY GREEN"
];
const DITON_COLOR_CANDY = [
    "801 HONDA RED", "802 HONDA YELLOW", "803 HONDA BLUE", "804 YAMAHA GREEN", "805 CANDY PINK", "807 CANDY VIOLET", "808 YAMAHA RED", "809 CANDY ORANGE"
];
const DITON_COLOR_METALLIC = [
    "8142 RED PURPLE", "8144 MAGENTA METALLIC", "8190 METALLIC RED", "8253 FORMICA BEIGE", "8199 METALLIC BROWN", "8265 ANTHRACITE GREY", "8198 METALLIC GREY", "8139 METALLIC BLACK",
    "8143 BLUE PURPLE", "8176 SHOGUN GREEN", "8193 NEON GREEN", "8196 EMERALD GREEN", "8160 CARIBIC BLUE", "8511 NEON BLUE", "8174 JUPITER ORANGE", "8102 METALLIC YELLOW",
    "8172 JUPITER BLUE", "8175 SHOGUN BLUE", "8216 CURACAO BLUE", "8580 SILVER METALLIC", "836 SILVER", "835 GOLD", "858 CLEAR METALLIC", "8239 IRON METALLIC DOFF",
    "891 MUTIARA PUTIH", "894 MUTIARA UNGU", "895 MUTIARA HIJAU", "896 MUTIARA PINK", "897 MUTIARA BIRU", "850 BRONZE", "816 TITANIUM"
];
const DITON_COLOR_SPECIAL = [
    "18KT GOLD", "24KT GOLD", "777 PERUNGGU", "888 TEMBAGA", "999 SPECIAL GOLD", "CHROME", "8020 PP PRIMER GREY"
];
const DITON_COLOR_HITEMP = ["HI-TEMP BLACK", "HI-TEMP SILVER", "HI-TEMP BRONZE"];
const DITON_COLOR_FLUORESCENT = [
    "8001 FLUORESCENT RED", "8002 FLUORESCENT PINK", "8003 FLUORESCENT GREEN", "8004 FLUORESCENT BLUE", "8005 FLUORESCENT YELLOW", "8006 FLUORESCENT ORANGE"
];
const DITON_COLOR_OPTIONS = [].concat(DITON_COLOR_SOLID, DITON_COLOR_CANDY, DITON_COLOR_METALLIC, DITON_COLOR_SPECIAL, DITON_COLOR_FLUORESCENT, DITON_COLOR_HITEMP);

// Kode warna Diton Premium (400cc), dikelompokkan per tingkat bintang agar cocok dengan harga produk
// "Diton 400cc Warna Tanpa Bintang" ... "Diton 400cc Bintang *****".
const DITON_PREMIUM_BY_STAR = {
    0: [
        "9109 BLACK", "9183 BLACK SEMI DOFF", "9184 BLACK DOFF", "9102 WHITE", "9103 SUPER WHITE", "9124 SILVER", "9123 GOLD", "9112 POLICE GREY",
        "9422 BOXER BLUE", "9462 CHILLI RED", "9238 PETRONAS GREEN", "9254 PREMIUM MAROON", "9433 MAGENTA PINK", "9432 DARK GREEN", "9425 TIGER YELLOW", "9431 MASTER YELLOW",
        "9421 FORTUNE BLUE", "9303 ARMY GREEN",
        "9239 BLACK METALLIC", "9178 SILVER GREY MET", "9544 MAYFAIR GREEN", "9180 SILVER METALLIC", "9577 YELLOW METALLIC", "9215 MAGENTA BLUE",
        "9304 CANDYTONE BLACK", "9305 CANDYTONE ORANGE", "9306 CANDYTONE PINK", "9307 CANDYTONE GREEN", "9308 CANDYTONE YELLOW", "9309 CANDYTONE BLUE", "9310 CANDYTONE VIOLET", "9311 CANDYTONE RED",
        "9128 CLEAR GLOSS + ACTIVATOR", "9129 CLEAR SEMI DOFF", "9130 CLEAR DOFF", "9120 PRIMER GREY (EPOXY)"
    ],
    1: [
        "H 9231 MASTER RED", "H 9136 DELUXE SILVER", "H 9281 STYLISH RED MATTE (DOFF)", "H 9240 SCOOPY PINK", "H 9218 AMAZING BLUE", "H 9188 PEARL WHITE", "H 9284 STYLISH MATTE BROWN (DOFF)", "H 9315 DELUXE BLUE",
        "H 9237 REPSOL ORANGE", "H 9355 BEAT ORANGE", "H 9275 ELECTRIC BLUE", "H 9153 SCOOPY CREAM", "H 9320 SCOOPY BEIGE", "H 9165 PEARL LEMON YELLOW", "H 9416 SPORTY GREEN", "H 9283 STYLISH BLUE MATTE (DOFF)",
        "H 9110 PRESTIGE BLACK", "H 9280 PCX MATTE GREY (DOFF)", "H 9417 SPORTY RED", "H 9418 DELUXE BLACK", "H 9419 DELUXE GREEN",
        "Y 9295 ATLANTIS BLUE", "Y 9242 MIO PINK", "Y 9245 SNIPER GREEN", "Y 9155 PRESTIGE SILVER", "Y 9138 BRILLIANT RED", "Y 9117 HUNTER GREEN MATTE (DOFF)", "Y 9314 NMAX MATTE GREY (DOFF)", "Y 9133 NMAX MATTE BLACK (DOFF)",
        "Y 9163 SPORTY BROWN MATTE (DOFF)", "Y 9164 SPORTY TOSCA", "Y 9312 EXCELLENT BLUE", "Y 9179 DARK BLUISH GREY", "Y 9189 RACING YELLOW",
        "K 9518 NINJA GREEN", "K 9519 NINJA ORANGE", "S 9793 LIGHT BLUE PEARL", "S 9794 AURA YELLOW",
        "VG 9282 TITANIUM GREY", "VG 9613 ALU SILVER", "VG 9612 BRONZE", "VG 9610 SILVER GOLD", "VG 9817 MAGNESIUM", "VG 9816 BRONZE GOLD", "VG 9815 SILVER GREY (GUNMETAL)", "VG 9223 SPARKLING GOLD", "VG 9614 COPPER", "VG 9611 TITANIUM GOLD",
        "PL 9200 LEMBAYUNG VIOLET", "PL 9201 LEMBAYUNG GOLD", "PL 9202 LEMBAYUNG BLUE", "PL 9203 LEMBAYUNG GREEN", "FP 9000 FLUORESCENT PRIMER"
    ],
    2: [
        "F 9011 FLUORESCENT PINK", "F 9012 FLUORESCENT GREEN", "F 9013 FLUORESCENT ORANGE", "F 9014 FLUORESCENT YELLOW", "F 9015 FLUORESCENT RED",
        "V 9530 PASTEL PURPLE", "V 9531 PASTEL MINT GREEN", "V 9532 PASTEL YELLOW", "V 9533 PASTEL BLUE", "V 9534 PASTEL PINK", "V 9485 ORANGE TRAMONTO", "V 9481 WHITE INNOCENZA", "V 9482 BLUE AUDACE",
        "V 9484 MIDNIGHT BLUE", "V 9115 LIGHT IVORY", "V 9488 GREEN RELAX", "V 9480 RED PASSIONE", "V 9487 BLUE VIVACE", "V 9185 PIAGGIO BLUE", "V 9486 GRIGIO TITANIO", "V 9489 GREEN BOSCO",
        "V 9483 NARDO GREY", "V 9490 YELLOW SOLE", "V 9491 BLACK VULCANO", "V 9251 DARK BROWN MET",
        "GH 9500 GLITTER HOLOGRAM", "PP 9100 PLASTIC PRIMER (TRANSPARANT)"
    ],
    3: [
        "XP 9401 COSMIC GREEN", "XP 9402 AZTEC GOLD", "XP 9403 BLUE EYES", "XP 9404 VIOLET FIRE", "XP 9405 LASER RED", "XP 9406 LUXURY BROWN", "XP 9407 PLASMA PINK", "XP 9408 JET GREY",
        "SC 9250 ROSE GOLD"
    ],
    4: [
        "HC 9901 BLACK JACK MET", "HC 9902 BILLIARD RED", "HC 9903 SUNSET ORANGE", "HC 9904 GAUNTLET GRAY", "HC 9905 OLIVE GOLD", "HC 9906 EAGLE EYE", "HC 9907 ZEPHYR BLUE",
        "DB301 KELLY ORANGE", "DB302 MOUVE RED", "DB303 INDIGO VIOLET", "DB304 GOLDEN GREEN"
    ],
    5: ["HC 9090 SNAKE VENOM"]
};

// Daftar warna sesuai produk yang dipilih di baris pesanan:
// produk Diton -> kode Diton (Fluorescent / Hi-temp hanya warna miliknya); selain itu -> kode lama.
function getColorOptionsForRow(row) {
    const idVal = row ? row.querySelector('.product-id-val') : null;
    const prod = idVal ? produkList.find(p => p.id === idVal.value) : null;
    const nama = prod ? String(prod.nama || '').toLowerCase() : '';
    if (nama.includes('diton') && nama.includes('400cc') && nama.includes('bintang')) {
        // Tingkat bintang dibaca dari nama produk: "Tanpa Bintang" = 0, "Bintang **" = 2, dst.
        const stars = nama.includes('tanpa') ? 0 : (nama.match(/\*/g) || []).length;
        if (DITON_PREMIUM_BY_STAR[stars]) return DITON_PREMIUM_BY_STAR[stars];
    }
    if (nama.includes('diton')) {
        if (nama.includes('fluorescent') || nama.includes('flourescent')) return DITON_COLOR_FLUORESCENT;
        if (nama.includes('hi-temp') || nama.includes('hitemp')) return DITON_COLOR_HITEMP;
        return DITON_COLOR_OPTIONS;
    }
    return MAGIC_COLOR_OPTIONS;
}

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
const EXTRA_COL_RE = /catatan|no_order|kode_salesman|pembayaran|paraf_toko|area/i;
const MSG_KOLOM = 'Kolom baru (catatan / no. order / kode salesman / pembayaran / paraf toko / area) belum ada di database. Jalankan SQL migrasi di folder supabase (migrasi_nota_a6.sql, migrasi_paraf_toko.sql, migrasi_area.sql) pada Supabase SQL Editor, lalu coba lagi.';

let pelangganAreaOk = true;   // false bila kolom pelanggan.area belum dibuat (migrasi_area.sql)

const TABLE_MAP = {
    produk: {
        orderBy: 'created_at',
        to: (p) => ({ id: p.id, nama: p.nama, kategori: p.kategori || '', satuan: p.satuan, harga: p.harga }),
        from: (r) => ({ id: r.id, nama: r.nama, kategori: r.kategori || '', satuan: r.satuan, harga: Number(r.harga) })
    },
    pelanggan: {
        orderBy: 'created_at',
        to: (c) => {
            const row = { id: c.id, nama: c.nama, hp: c.hp, alamat: c.alamat || '' };
            if (c.area !== undefined && (pelangganAreaOk || c.area)) row.area = c.area || '';
            return row;
        },
        from: (r) => ({ id: r.id, nama: r.nama, hp: r.hp, alamat: r.alamat || '', area: r.area || '', ownerId: r.owner_id || '' })
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
    if (table === 'pelanggan' && out.length) pelangganAreaOk = ('area' in out[0]);
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
// tab.* = menu yang tampil; users.filter = boleh melihat/menyaring data semua pengguna;
// laporan.aksi = tombol Tambah Pesanan, Lihat Nota & Edit langsung dari menu Laporan & Rekap.
const TAB_SEMUA = ['tab.pesanan', 'tab.produk', 'tab.pelanggan', 'tab.laporan', 'tab.tagihan'];
const ROLE_PERMISSIONS = {
    admin: ['produk.write', 'pelanggan.write', 'pelanggan.delete', 'pesanan.write', 'pesanan.delete', 'backup', 'users.manage', 'users.filter', ...TAB_SEMUA],
    salesman: ['pesanan.write', 'pelanggan.write', ...TAB_SEMUA],
    // Kasir: hanya menu Laporan & Rekap; boleh tambah & edit pesanan semua salesman (tidak boleh hapus).
    kasir: ['pesanan.write', 'laporan.aksi', 'users.filter', 'tab.laporan']
};
const ROLE_LABEL = { admin: 'Admin', salesman: 'Salesman', kasir: 'Kasir' };

function roleBadgeClass(role) {
    if (role === 'admin') return 'bg-amber-100 text-amber-700';
    if (role === 'kasir') return 'bg-sky-100 text-sky-700';
    return 'bg-emerald-100 text-emerald-700';
}

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
    return { id: r.id, username: r.username, nama: r.nama, role: r.role, area: r.area || '', defaultPw: !!r.default_pw };
}

async function fetchProfile(userId) {
    const { data, error } = await sb.from('profiles').select('*').eq('id', userId).maybeSingle();
    if (error) throw error;
    return data ? mapProfile(data) : null;
}

let namaPenggunaList = [];   // untuk dropdown Nama Salesman di form pesanan

async function loadUsers() {
    if (!can('users.filter')) {
        userList = []; fillUserFilters();
        namaPenggunaList = currentUser ? [currentUser] : [];
        try {   // bila kebijakan database mengizinkan, tampilkan semua pengguna
            const { data } = await sb.from('profiles').select('*').order('created_at');
            if (data && data.length) namaPenggunaList = data.map(mapProfile);
        } catch (e) { /* cukup nama akun sendiri */ }
        return;
    }
    const { data, error } = await sb.from('profiles').select('*').order('created_at');
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
    badge.className = 'inline-block text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ' + roleBadgeClass(user.role);

    applyRole();
    switchTab(can('tab.pesanan') ? 'pesanan' : 'laporan');
}

function applyRole() {
    document.querySelectorAll('[data-perm]').forEach(el => el.classList.toggle('hidden', !can(el.dataset.perm)));
    byId('produk-readonly-note').classList.toggle('hidden', can('produk.write'));
    byId('default-pw-banner').classList.toggle('hidden', !(currentUser && currentUser.defaultPw));
}


async function logout() {
    currentUser = null;
    userList = []; produkList = []; pelangganList = []; pesananList = [];
    tagihanInit = false; tagihanIsDirty = false; tagihanLoadedDate = ''; tagihanLoadFailed = false; tagihanLoadSeq++;
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
        const badge = roleBadgeClass(u.role);
        return `
            <tr class="hover:bg-gray-50 transition">
                <td data-label="No" class="py-3 px-4 text-gray-500 font-medium">${idx + 1}</td>
                <td data-label="Username" class="py-3 px-4 font-mono font-semibold text-gray-800">${esc(u.username)}${self ? ' <span class="text-[10px] text-gray-400 font-sans">(Anda)</span>' : ''}</td>
                <td data-label="Nama" class="py-3 px-4 text-gray-700">${esc(u.nama)}</td>
                <td data-label="Area" class="py-3 px-4 text-gray-700">${esc(u.area || '-')}</td>
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
    byId('pengguna-area').value = u ? (u.area || '') : '';
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
    const area = byId('pengguna-area').value.trim();
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
        // Area disimpan lewat fungsi database po_set_area (khusus Admin; lihat supabase/migrasi_area.sql)
        const saved = userList.find(x => x.username.toLowerCase() === username.toLowerCase());
        if (saved && (saved.area || '') !== area) {
            const { error: aErr } = await sb.rpc('po_set_area', { p_id: saved.id, p_area: area });
            if (aErr) alert('Pengguna tersimpan, tetapi Area gagal disimpan: ' + aErr.message + '\nPastikan supabase/migrasi_area.sql sudah dijalankan.');
            else await loadUsers();
        }
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

// Gabungkan tanggal pilihan (YYYY-MM-DD, lokal) dengan jam dari `waktu`; hasilnya string ISO.
function tanggalPilihanKeISO(tglStr, waktu) {
    const [y, m, d] = tglStr.split('-').map(Number);
    const w = (waktu instanceof Date && !isNaN(waktu.getTime())) ? waktu : new Date();
    return new Date(y, m - 1, d, w.getHours(), w.getMinutes(), w.getSeconds()).toISOString();
}

// Nomor nota: NOTA-YYYYMMDD-KODE-NNN (urut per hari per pengguna, memakai tanggal pesanan)
function generateNoNota(tglStr) {
    const kode = kodePengguna(currentUser && currentUser.username);
    const prefix = 'NOTA-' + (tglStr || toLocalDateStr(new Date())).replace(/-/g, '') + '-' + kode + '-';
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
    if (tabId !== 'pengguna' && !can('tab.' + tabId)) return;
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
    if (tabId === 'tagihan') initTagihan();
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
// Daftar pelanggan dirender bertahap (50 baris) dan sekali tulis ke DOM agar menu tetap ringan.
const PELANGGAN_PAGE = 50;
let pelangganLimit = PELANGGAN_PAGE;
let pelangganTimer = null;

function cariPelanggan() {                 // dipanggil saat mengetik (ditunda sebentar)
    clearTimeout(pelangganTimer);
    pelangganTimer = setTimeout(renderPelanggan, 200);
}

function tampilLagiPelanggan() {
    pelangganLimit += PELANGGAN_PAGE;
    renderPelanggan(true);
}

function renderPelanggan(keepLimit) {
    if (keepLimit !== true) pelangganLimit = PELANGGAN_PAGE;
    const keyword = document.getElementById('search-pelanggan').value.toLowerCase();
    const tbody = document.getElementById('table-pelanggan-body');
    tbody.innerHTML = '';

    const filterUser = can('users.manage') && byId('filter-pengguna-pelanggan') ? (byId('filter-pengguna-pelanggan').value || '') : '';
    const filtered = pelangganList.filter(c =>
        (!filterUser || c.ownerId === filterUser) &&
        (c.nama.toLowerCase().includes(keyword) || c.hp.includes(keyword) || c.alamat.toLowerCase().includes(keyword) || (c.area || '').toLowerCase().includes(keyword)));

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-gray-400">Tidak ada pelanggan ditemukan.</td></tr>`;
        return;
    }

    const isAdminView = can('users.manage'), canEdit = can('pelanggan.write'), canDel = can('pelanggan.delete');
    const owners = {};
    if (isAdminView) userList.forEach(u => { owners[u.id] = u.nama || u.username; });
    const shown = filtered.slice(0, pelangganLimit);
    const html = shown.map((c, idx) => `
            <tr class="hover:bg-gray-50 transition">
                <td data-label="No" class="py-3 px-4 text-gray-500 font-medium">${idx + 1}</td>
                <td data-label="Pelanggan" class="py-3 px-4 font-semibold text-gray-800">${esc(c.nama)}${c.area ? ` <span class="font-sans text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-700">${esc(c.area)}</span>` : ''}${(isAdminView && owners[c.ownerId]) ? `<div class="text-[11px] font-normal text-gray-500 mt-0.5"><i class="fa-solid fa-user mr-1"></i>${esc(owners[c.ownerId])}</div>` : ''}</td>
                <td data-label="WhatsApp" class="py-3 px-4 text-emerald-600 font-medium"><i class="fa-brands fa-whatsapp mr-1"></i> ${esc(c.hp)}</td>
                <td data-label="Alamat" class="py-3 px-4 text-gray-600">${esc(c.alamat || '-')}</td>
                <td data-label="Aksi" class="py-3 px-4 text-center space-x-2">
                    ${canEdit ? `<button onclick="editPelanggan('${c.id}')" class="text-blue-600 hover:text-blue-800 p-1" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>` : ''}
                    ${canDel ? `<button onclick="deletePelanggan('${c.id}')" class="text-red-600 hover:text-red-800 p-1" title="Hapus"><i class="fa-solid fa-trash"></i></button>` : ''}
                </td>
            </tr>
        `).join('');
    const sisa = filtered.length - shown.length;
    tbody.innerHTML = html + (sisa > 0
        ? `<tr><td colspan="5" class="text-center py-4"><button onclick="tampilLagiPelanggan()" class="px-4 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition">Tampilkan ${Math.min(PELANGGAN_PAGE, sisa)} lagi <span class="text-gray-400 font-normal">(sisa ${sisa} dari ${filtered.length} toko)</span></button></td></tr>`
        : '');
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

    const lama = id ? pelangganList.find(c => c.id === id) : null;
    const row = { id: id || 'c_' + Date.now(), nama, hp, alamat, area: lama ? (lama.area || '') : ((currentUser && currentUser.area) || '') };
    try {
        await dbUpsert('pelanggan', row);
    } catch (err) {
        return dbFail(err, 'menyimpan pelanggan');
    }

    const idx = pelangganList.findIndex(c => c.id === row.id);
    if (idx !== -1) pelangganList[idx] = { ...pelangganList[idx], ...row }; else pelangganList.unshift(row);

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
        document.getElementById('pesanan-tanggal').value = toLocalDateStr(ord.tanggal);
        
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
        document.getElementById('pesanan-tanggal').value = toLocalDateStr(new Date());
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

    const colorOptions = getColorOptionsForRow(row);
    const matched = keyword
        ? colorOptions.filter(col => col.toLowerCase().includes(keyword))
        : colorOptions.slice(0, 15);

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
    const tglStr = document.getElementById('pesanan-tanggal').value || toLocalDateStr(new Date());
    const thn = parseInt(tglStr.slice(0, 4), 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(tglStr) || thn < 2000 || thn > 2100) {
        alert('Tanggal pesanan tidak valid. Pilih tanggal yang benar.');
        return;
    }

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
            // Tanggal tidak berubah -> pertahankan jam aslinya; diganti -> pakai tanggal baru dengan jam asli.
            const tanggal = (toLocalDateStr(existing.tanggal) === tglStr)
                ? existing.tanggal
                : tanggalPilihanKeISO(tglStr, new Date(existing.tanggal));
            const updated = { ...existing, tanggal, pelangganId, items, catatan, noOrder, kodeSalesman, pembayaran };
            await dbUpsert('pesanan', updated);
            Object.assign(existing, updated);
        } else {
            // Nomor nota unik di server; bila bentrok dengan perangkat lain, ambil data terbaru lalu buat ulang.
            let newOrd = null;
            for (let attempt = 0; attempt < 3 && !newOrd; attempt++) {
                const cand = {
                    id: 'ord_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
                    noNota: generateNoNota(tglStr),
                    tanggal: tanggalPilihanKeISO(tglStr, new Date()),
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
    if (!byId('section-laporan').classList.contains('hidden')) renderLaporan();
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

// Cetak rekap A4 (landscape) langsung dari komputer lewat dialog cetak browser:
// TEPAT 4 form A6 per halaman A4 (2 x 2). Di dialog cetak, pilih printer atau "Simpan sebagai PDF".
async function printLaporanA4() {
    if (notaBusy) return;
    const list = getPesananUntukCetak();
    if (!list) return;

    notaBusy = true;
    try {
        await preloadParaf(list);
        const sheets = [];
        list.forEach(ord => buildNotaSheets(ord).forEach(sh => sheets.push(sh)));
        let html = '';
        for (let i = 0; i < sheets.length; i += 4) {
            html += '<div class="a4-page">' + sheets.slice(i, i + 4).map(sh => `<div class="a4-cell">${sh}</div>`).join('') + '</div>';
        }

        const old = document.getElementById('nota-print-root');
        if (old) old.remove();
        const oldStyle = document.getElementById('nota-page-style');
        if (oldStyle) oldStyle.remove();

        const root = document.createElement('div');
        root.id = 'nota-print-root';
        root.innerHTML = html;
        document.body.appendChild(root);

        const pageStyle = document.createElement('style');
        pageStyle.id = 'nota-page-style';
        pageStyle.textContent = '@page { size: A4 landscape; margin: 0; }';
        document.head.appendChild(pageStyle);
        document.documentElement.classList.add('printing-nota', 'printing-a4');

        // pastikan gambar paraf sudah tampil sebelum dialog cetak dibuka
        await Promise.all(Array.from(root.querySelectorAll('img')).map(im =>
            im.complete ? null : new Promise(res => { im.onload = res; im.onerror = res; })));

        const cleanup = () => {
            root.remove();
            pageStyle.remove();
            document.documentElement.classList.remove('printing-nota', 'printing-a4');
            window.removeEventListener('afterprint', cleanup);
        };
        window.addEventListener('afterprint', cleanup);
        setTimeout(() => window.print(), 80);
    } catch (err) {
        alert('Gagal menyiapkan cetak A4: ' + err.message);
    } finally {
        notaBusy = false;
    }
}

// Unduh rekap A4 dalam bentuk PDF: isi dan susunan SAMA dengan Print A4 (4 form A6 per halaman, 2 x 2).
async function exportLaporanPdfA4() {
    if (notaBusy) return;
    const filtered = getPesananUntukCetak();
    if (!filtered) return;

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
    return can('users.filter') && byId('laporan-pengguna') ? (byId('laporan-pengguna').value || '') : '';
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

// Pesanan yang dicentang manual untuk Print A4 / Unduh PDF A4 (hanya yang sedang tampil di tabel).
const laporanTerpilih = new Set();
let laporanJumlahTampil = 0;

function laporanTogglePilih(id, checked) {
    if (checked) laporanTerpilih.add(id); else laporanTerpilih.delete(id);
    updateLaporanPilihUI();
}

function laporanPilihSemua(pilih) {
    laporanTerpilih.clear();
    if (pilih) getLaporanFiltered().forEach(o => laporanTerpilih.add(o.id));
    renderLaporan();
}

function updateLaporanPilihUI() {
    const n = laporanTerpilih.size;
    const total = laporanJumlahTampil;
    const info = byId('lap-sel-info');
    if (info) {
        info.innerText = total === 0 ? '' : (n > 0
            ? `${n} dari ${total} pesanan dicentang`
            : `Belum ada yang dicentang (cetak = semua ${total} pesanan)`);
    }
    ['lap-count-print', 'lap-count-pdf'].forEach(id => { const el = byId(id); if (el) el.innerText = n > 0 ? `(${n})` : ''; });
}

// Daftar pesanan yang akan dicetak / dijadikan PDF: yang dicentang; bila tidak ada, semua (setelah konfirmasi).
function getPesananUntukCetak() {
    const filtered = getLaporanFiltered();
    if (filtered.length === 0) {
        alert('Tidak ada data pesanan pada periode ini untuk dicetak!');
        return null;
    }
    const dipilih = filtered.filter(o => laporanTerpilih.has(o.id));
    if (dipilih.length > 0) return dipilih;
    if (!confirm(`Belum ada pesanan yang dicentang.\nCetak SEMUA ${filtered.length} pesanan pada periode ini?`)) return null;
    return filtered;
}

function renderLaporan() {
    const filtered = getLaporanFiltered();
    const tbody = byId('table-laporan-body');
    byId('lap-periode-label').innerText = '- ' + getLaporanLabel();

    // centang hanya berlaku untuk pesanan yang sedang tampil
    const idTampil = new Set(filtered.map(o => o.id));
    Array.from(laporanTerpilih).forEach(id => { if (!idTampil.has(id)) laporanTerpilih.delete(id); });
    laporanJumlahTampil = filtered.length;

    const bisaAksi = can('laporan.aksi');
    const tampilPemilik = can('users.filter');
    let totalItem = 0;
    let totalOmzet = 0;

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${bisaAksi ? 7 : 6}" class="text-center py-6 text-gray-400">Tidak ada transaksi pada periode ini.</td></tr>`;
    } else {
        tbody.innerHTML = filtered.map(ord => {
            const pel = pelangganList.find(c => c.id === ord.pelangganId) || { nama: 'Umum' };
            const itemSumQty = ord.items.reduce((s, i) => s + (parseFloat(i.qty) || 0), 0);
            const itemSumHarga = ord.items.reduce((s, i) => s + ((parseFloat(i.qty) || 0) * (parseFloat(i.harga) || 0)), 0);

            totalItem += itemSumQty;
            totalOmzet += itemSumHarga;

            const itemsDesc = ord.items.map(i => `${i.qty}x ${i.nama}${i.varianWarna ? ' (' + i.varianWarna + ')' : ''}`).join(', ') + (ord.catatan ? ' — 📝 ' + ord.catatan : '');
            const waktu = new Date(ord.tanggal).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
            const pemilik = tampilPemilik ? userLabel(ord.ownerId) : '';

            return `
                <tr class="hover:bg-gray-50 transition">
                    <td data-label="Cetak" class="py-3 px-4 text-center"><input type="checkbox" class="w-5 h-5 rounded accent-emerald-600 cursor-pointer" aria-label="Pilih ${esc(ord.noNota)} untuk dicetak" ${laporanTerpilih.has(ord.id) ? 'checked' : ''} onchange="laporanTogglePilih('${ord.id}', this.checked)"></td>
                    <td data-label="No. Nota" class="py-3 px-4 font-mono font-bold text-gray-800">${esc(ord.noNota)}</td>
                    <td data-label="Waktu" class="py-3 px-4 text-gray-600 text-xs whitespace-nowrap">${esc(waktu)}</td>
                    <td data-label="Pelanggan" class="py-3 px-4 font-semibold text-gray-800">${esc(pel.nama)}${pemilik ? `<div class="text-[11px] font-normal text-gray-500 mt-0.5"><i class="fa-solid fa-user mr-1"></i>${esc(pemilik)}</div>` : ''}</td>
                    <td data-label="Item" class="py-3 px-4 text-gray-600 text-xs max-w-xs truncate" title="${esc(itemsDesc)}">${esc(itemsDesc)}</td>
                    <td data-label="Subtotal" class="py-3 px-4 font-bold text-emerald-600">${formatRupiah(itemSumHarga)}</td>
                    ${bisaAksi ? `<td data-label="Aksi" class="py-3 px-4 text-center space-x-1">
                        <button onclick="previewWhatsapp('${ord.id}')" class="bg-blue-50 text-blue-600 hover:bg-blue-100 p-1.5 rounded-lg transition" title="Lihat Nota"><i class="fa-solid fa-receipt text-base"></i></button>
                        <button onclick="editPesanan('${ord.id}')" class="text-blue-600 hover:text-blue-800 p-1.5" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                    </td>` : ''}
                </tr>
            `;
        }).join('');
    }

    byId('lap-total-pesanan').innerText = filtered.length;
    byId('lap-total-item').innerText = totalItem;
    byId('lap-total-omzet').innerText = formatRupiah(totalOmzet);
    updateLaporanPilihUI();
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

// ================= TAGIHAN HARIAN =================
// Laporan Penerimaan Tagihan Harian: satu laporan per pengguna per tanggal (tabel Supabase: tagihan_harian).
// Autocomplete pelanggan memakai pelangganList yang difilter berdasarkan Wilayah/Area (default: area pengguna).
const TAGIHAN_MIN_ROWS = 10;      // baris kosong awal di layar
const TAGIHAN_A5_BATAS = 20;      // jumlah toko kurang dari ini -> PDF kertas A5, selain itu A4
const TAGIHAN_ROWS_A4 = 35;       // jumlah baris minimal pada lembar A4
const TAGIHAN_ROWS_A5 = 15;       // jumlah baris minimal pada lembar A5
const TAGIHAN_KODE = ['SMS', 'WM', 'MSJ'];
const TAGIHAN_COLS = ['nama', 'noFaktur', 'tglFaktur', 'nilai', 'cash', 'giro', 'ketGiro', 'disc', 'ket'];
const TAGIHAN_NUM = ['nilai', 'cash', 'giro', 'disc'];
const TAGIHAN_LABEL = { nama: 'Nama Pelanggan', noFaktur: 'No. Faktur', tglFaktur: 'Tgl. Faktur (dd/mm/yyyy)', nilai: 'Nilai Faktur', cash: 'Cash', giro: 'Nilai Giro', ketGiro: 'Ket Giro & Tgl', disc: 'Disc / Retur', ket: 'Keterangan' };
const TAGIHAN_MSG_TABEL = 'Tabel/kolom tagihan_harian belum lengkap di database. Jalankan supabase/migrasi_tagihan.sql pada Supabase SQL Editor, lalu muat ulang halaman.';

let tagihanInit = false;
let tagihanIsDirty = false;
let tagihanLoadedDate = '';
let tagihanLoadFailed = false;
let tagihanSaving = false;
let tagihanLoadSeq = 0;
let tagihanDdInput = null;
let tagihanDdItems = [];
let tagihanDdIndex = -1;

const tgDigits = (s) => String(s || '').replace(/\D/g, '');
const tgGroup = (d) => d.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const tgFmtNum = (v) => tgGroup(tgDigits(v).replace(/^0+(?=\d)/, ''));

// Topeng tanggal dd/mm/yyyy: hanya angka, garis miring ditambah otomatis.
function tgMaskTgl(v) {
    const d = tgDigits(v).slice(0, 8);
    let out = d.slice(0, 2);
    if (d.length > 2) out += '/' + d.slice(2, 4);
    if (d.length > 4) out += '/' + d.slice(4);
    return out;
}

function tgTglValid(s) {
    const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s);
    if (!m) return false;
    const d = +m[1], mo = +m[2], y = +m[3];
    if (y < 2000 || y > 2100) return false;
    const dt = new Date(y, mo - 1, d);
    return dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === d;
}

function tgBody() { return byId('tagihan-body'); }

function tgRowHtml(no, data) {
    data = data || {};
    const val = (k) => TAGIHAN_NUM.includes(k) ? esc(tgFmtNum(data[k])) : esc(data[k] || '');
    const inp = (k, extra) => `<input type="text" class="tg-in${TAGIHAN_NUM.includes(k) ? ' tg-num' : ''}" data-k="${k}" value="${val(k)}" autocomplete="off" aria-label="${esc(TAGIHAN_LABEL[k])} baris ${no}" ${extra || ''}>`;
    return `<tr data-pid="${esc(data.pelangganId || '')}">
        <td data-label="No" class="tg-no py-1.5 px-2 text-gray-500 text-xs align-middle">${no}</td>
        <td data-label="Nama Pelanggan" class="tg-span2 py-1.5 px-1">${inp('nama', 'enterkeyhint="next" placeholder="Ketik nama toko..."')}</td>
        <td data-label="No. Faktur" class="py-1.5 px-1">${inp('noFaktur', 'enterkeyhint="next"')}</td>
        <td data-label="Tgl. Faktur" class="py-1.5 px-1">${inp('tglFaktur', 'inputmode="numeric" maxlength="10" placeholder="dd/mm/yyyy" enterkeyhint="next"')}</td>
        <td data-label="Nilai Faktur" class="py-1.5 px-1">${inp('nilai', 'inputmode="numeric" enterkeyhint="next"')}</td>
        <td data-label="Cash" class="py-1.5 px-1">${inp('cash', 'inputmode="numeric" enterkeyhint="next"')}</td>
        <td data-label="Nilai Giro" class="py-1.5 px-1">${inp('giro', 'inputmode="numeric" enterkeyhint="next"')}</td>
        <td data-label="Ket Giro & Tgl" class="py-1.5 px-1">${inp('ketGiro', 'enterkeyhint="next"')}</td>
        <td data-label="Disc / Retur" class="py-1.5 px-1">${inp('disc', 'inputmode="numeric" enterkeyhint="next"')}</td>
        <td data-label="Keterangan" class="py-1.5 px-1">${inp('ket', 'enterkeyhint="next"')}</td>
        <td class="tg-del py-1.5 px-1 text-center align-middle"><button type="button" data-del title="Hapus baris" aria-label="Hapus baris ${no}" class="text-gray-400 hover:text-red-600 p-1.5"><i class="fa-solid fa-xmark"></i></button></td>
    </tr>`;
}

function tgRenderRows(list) {
    const rows = (list || []).slice();
    while (rows.length < TAGIHAN_MIN_ROWS) rows.push({});
    tgBody().innerHTML = rows.map((r, i) => tgRowHtml(i + 1, r)).join('');
    tgTotals();
    tgUpdatePaper();
}

function tgRenumber() {
    tgBody().querySelectorAll('tr').forEach((tr, i) => {
        tr.querySelector('.tg-no').textContent = i + 1;
    });
}

function tambahBarisTagihan() {
    const body = tgBody();
    const n = body.querySelectorAll('tr').length + 1;
    body.insertAdjacentHTML('beforeend', tgRowHtml(n, {}));
    const first = body.lastElementChild.querySelector('[data-k="nama"]');
    if (first) first.focus();
    tagihanDirty();
}

function tgCollect() {
    return Array.from(tgBody().querySelectorAll('tr')).map(tr => {
        const o = { pelangganId: tr.dataset.pid || '' };
        tr.querySelectorAll('[data-k]').forEach(el => {
            const k = el.dataset.k;
            o[k] = TAGIHAN_NUM.includes(k) ? tgDigits(el.value) : el.value.trim();
        });
        return o;
    });
}
const tgHasData = (o) => TAGIHAN_COLS.some(k => o[k]);

function tgTotals() {
    const sum = { nilai: 0, cash: 0, giro: 0, disc: 0 };
    tgBody().querySelectorAll('tr').forEach(tr => {
        TAGIHAN_NUM.forEach(k => {
            const el = tr.querySelector(`[data-k="${k}"]`);
            if (el) sum[k] += Number(tgDigits(el.value)) || 0;
        });
    });
    byId('tt-nilai').textContent = tgGroup(String(sum.nilai));
    byId('tt-cash').textContent = tgGroup(String(sum.cash));
    byId('tt-giro').textContent = tgGroup(String(sum.giro));
    byId('tt-disc').textContent = tgGroup(String(sum.disc));
    return sum;
}

function tagihanDirty() {
    tagihanIsDirty = true;
    tgUpdatePaper();
    if (!tagihanLoadFailed) tgStatus('Ada perubahan yang belum disimpan.', 'amber');
}

function tgStatus(msg, tone) {
    const el = byId('tagihan-status');
    if (!el) return;
    el.textContent = msg;
    el.className = 'text-xs mt-0.5 ' + (tone === 'red' ? 'text-red-600' : tone === 'amber' ? 'text-amber-600' : tone === 'green' ? 'text-emerald-600' : 'text-gray-500');
}

function tgError(err, action) {
    console.error(err);
    const msg = (err && err.message) ? err.message : String(err);
    const noTable = (err && (err.code === '42P01' || err.code === 'PGRST205')) || (/tagihan_harian|kode/i.test(msg) && /exist|schema cache|column/i.test(msg));
    return noTable ? TAGIHAN_MSG_TABEL : ('Gagal ' + action + ': ' + msg);
}

// ---- Autocomplete pelanggan (berdasarkan area) ----
function tgPelangganPool() {
    const area = (byId('tagihan-wilayah').value || '').trim().toLowerCase();
    const pool = pelangganList.filter(c => !area || (c.area || '').trim().toLowerCase() === area);
    return pool.sort((a, b) => a.nama.localeCompare(b.nama, 'id'));
}

function tgUpdateHint() {
    const el = byId('tagihan-hint');
    if (!el) return;
    const area = (byId('tagihan-wilayah').value || '').trim();
    const n = tgPelangganPool().length;
    let msg, warn = false;
    if (!area) msg = `Wilayah kosong, jadi saran nama menampilkan semua ${pelangganList.length} pelanggan.`;
    else if (n === 0) { msg = `Tidak ada pelanggan dengan area "${area}". Samakan Wilayah di atas dengan area pada data pelanggan (nama bisa tetap diketik manual).`; warn = true; }
    else msg = `Saran nama diambil dari ${n} pelanggan di area ${area}.`;
    el.textContent = msg;
    el.className = 'text-xs px-1 ' + (warn ? 'text-amber-600' : 'text-gray-500');
}

function tagihanWilayahDiubah() {
    tgUpdateHint();
    tagihanDirty();
}

function tgDdHide() {
    const dd = byId('tagihan-dropdown');
    if (dd) dd.classList.add('hidden');
    tagihanDdItems = []; tagihanDdIndex = -1; tagihanDdInput = null;
}

function tgDdHighlight() {
    const dd = byId('tagihan-dropdown');
    Array.from(dd.children).forEach((el, i) => {
        el.classList.toggle('bg-emerald-50', i === tagihanDdIndex);
        if (i === tagihanDdIndex) el.scrollIntoView({ block: 'nearest' });
    });
}

function tgDdShow(input) {
    const dd = byId('tagihan-dropdown');
    const kw = input.value.toLowerCase().trim();
    const pool = tgPelangganPool();
    const hit = (kw ? pool.filter(c => c.nama.toLowerCase().includes(kw) || (c.alamat || '').toLowerCase().includes(kw)) : pool).slice(0, 30);
    tagihanDdInput = input;
    tagihanDdItems = hit;
    tagihanDdIndex = -1;

    if (!hit.length) {
        dd.innerHTML = `<div class="p-2.5 text-xs text-gray-400">${pool.length ? 'Tidak ada pelanggan cocok. Nama boleh tetap diketik manual.' : 'Belum ada pelanggan di area ini.'}</div>`;
    } else {
        dd.innerHTML = hit.map((c, i) => `<div data-i="${i}" class="p-2.5 hover:bg-emerald-50 cursor-pointer text-xs border-b border-gray-100"><div class="font-bold text-gray-800">${esc(c.nama)}</div><div class="text-gray-500">${esc(c.alamat || c.hp || '')}</div></div>`).join('');
    }

    const r = input.getBoundingClientRect();
    const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const below = vh - r.bottom, above = r.top;
    dd.style.left = Math.max(4, Math.min(r.left, window.innerWidth - 4 - Math.max(r.width, 240))) + 'px';
    dd.style.width = Math.max(r.width, 240) + 'px';
    if (below < 180 && above > below) {
        dd.style.top = 'auto';
        dd.style.bottom = (window.innerHeight - r.top + 2) + 'px';
        dd.style.maxHeight = Math.min(224, above - 8) + 'px';
    } else {
        dd.style.bottom = 'auto';
        dd.style.top = (r.bottom + 2) + 'px';
        dd.style.maxHeight = Math.min(224, below - 8) + 'px';
    }
    dd.classList.remove('hidden');
}

function tgDdPick(i) {
    const c = tagihanDdItems[i];
    const input = tagihanDdInput;
    if (!c || !input) return;
    input.value = c.nama;
    input.closest('tr').dataset.pid = c.id;
    tgDdHide();
    tagihanDirty();
    const next = input.closest('tr').querySelector('[data-k="noFaktur"]');
    if (next) next.focus();
}

// ---- Navigasi keyboard / event tabel ----
function tgFocusCell(tr, k) {
    const el = tr && tr.querySelector(`[data-k="${k}"]`);
    if (el) { el.focus(); if (el.select) { try { el.select(); } catch (e) { /* abaikan */ } } }
    return !!el;
}

let tagihanEventsBound = false;   // pendengar event dipasang sekali saja (tidak ikut direset saat logout)

function tgInitEvents() {
    if (tagihanEventsBound) return;
    tagihanEventsBound = true;
    const body = tgBody();

    body.addEventListener('input', (e) => {
        const el = e.target;
        if (!el.dataset || !el.dataset.k) return;
        const k = el.dataset.k;
        if (k === 'tglFaktur') {
            el.value = tgMaskTgl(el.value);
            el.classList.remove('tg-bad');
        } else if (TAGIHAN_NUM.includes(k)) {
            const pos = el.selectionStart == null ? el.value.length : el.selectionStart;
            const before = tgDigits(el.value.slice(0, pos)).length;
            el.value = tgFmtNum(el.value);
            let cnt = 0, p = 0;
            while (p < el.value.length && cnt < before) { if (/\d/.test(el.value.charAt(p))) cnt++; p++; }
            try { el.setSelectionRange(p, p); } catch (x) { /* abaikan */ }
            tgTotals();
        } else if (k === 'nama') {
            const tr = el.closest('tr');
            const c = pelangganList.find(x => x.id === tr.dataset.pid);
            if (c && c.nama !== el.value) tr.dataset.pid = '';
            tgDdShow(el);
        }
        tagihanDirty();
    });

    body.addEventListener('focusin', (e) => {
        const el = e.target;
        if (!el.dataset || !el.dataset.k) return;
        if (el.dataset.k === 'nama') tgDdShow(el); else tgDdHide();
        if (el.tagName === 'INPUT') setTimeout(() => { try { el.select(); } catch (x) { /* abaikan */ } }, 0);
    });

    body.addEventListener('focusout', (e) => {
        const el = e.target;
        if (!el.dataset || el.dataset.k !== 'tglFaktur') return;
        let v = el.value;
        const m = /^(\d{2})\/(\d{2})\/(\d{2})$/.exec(v);       // 12/11/26 -> 12/11/2026
        if (m) { v = `${m[1]}/${m[2]}/20${m[3]}`; el.value = v; }
        el.classList.toggle('tg-bad', !!v && !tgTglValid(v));
    });

    body.addEventListener('keydown', (e) => {
        const el = e.target;
        if (!el.dataset || !el.dataset.k || el.tagName === 'SELECT') return;
        const k = el.dataset.k;
        const tr = el.closest('tr');

        if (k === 'nama' && !byId('tagihan-dropdown').classList.contains('hidden') && tagihanDdItems.length) {
            if (e.key === 'ArrowDown') { e.preventDefault(); tagihanDdIndex = Math.min(tagihanDdIndex + 1, tagihanDdItems.length - 1); tgDdHighlight(); return; }
            if (e.key === 'ArrowUp') { e.preventDefault(); tagihanDdIndex = Math.max(tagihanDdIndex - 1, 0); tgDdHighlight(); return; }
            if (e.key === 'Enter' && tagihanDdIndex >= 0) { e.preventDefault(); tgDdPick(tagihanDdIndex); return; }
        }
        if (k === 'nama' && e.key === 'Escape') { tgDdHide(); return; }

        if (e.key === 'Enter') {
            e.preventDefault();
            tgDdHide();
            const idx = TAGIHAN_COLS.indexOf(k);
            if (idx < TAGIHAN_COLS.length - 1) { tgFocusCell(tr, TAGIHAN_COLS[idx + 1]); return; }
            if (!tr.nextElementSibling) tambahBarisTagihan(); else tgFocusCell(tr.nextElementSibling, 'nama');
            return;
        }
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const target = e.key === 'ArrowDown' ? tr.nextElementSibling : tr.previousElementSibling;
            if (target) tgFocusCell(target, k);
        }
    });

    body.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-del]');
        if (!btn) return;
        const tr = btn.closest('tr');
        if (tgBody().querySelectorAll('tr').length <= 1) {
            tr.querySelectorAll('[data-k]').forEach(el => { el.value = ''; });
            tr.dataset.pid = '';
        } else {
            tr.remove();
            tgRenumber();
        }
        tgTotals();
        tagihanDirty();
    });

    const dd = byId('tagihan-dropdown');
    dd.addEventListener('mousedown', (e) => e.preventDefault());   // jaga fokus input
    dd.addEventListener('click', (e) => {
        const item = e.target.closest('[data-i]');
        if (item) tgDdPick(Number(item.dataset.i));
    });

    document.addEventListener('click', (e) => {
        if (e.target.closest('#tagihan-dropdown') || (e.target.dataset && e.target.dataset.k === 'nama')) return;
        tgDdHide();
    });
    window.addEventListener('scroll', (e) => {
        if (e.target && e.target.id === 'tagihan-dropdown') return;
        tgDdHide();
    }, true);
    window.addEventListener('resize', tgDdHide);
    window.addEventListener('beforeunload', (e) => {
        if (currentUser && tagihanIsDirty) { e.preventDefault(); e.returnValue = ''; }
    });
}

// ---- Muat & simpan ----
function tgToday() { return toLocalDateStr(new Date()); }

function tgDefaults() {
    return {
        wilayah: (currentUser && currentUser.area) || '',
        salesman: (currentUser && (currentUser.nama || currentUser.username)) || ''
    };
}

function initTagihan() {
    if (!tagihanInit) {
        tagihanInit = true;
        tgInitEvents();
        byId('tagihan-tanggal').value = tgToday();
        muatTagihan();
        return;
    }
    tgUpdateHint();   // data pelanggan mungkin baru disegarkan; jangan timpa isian yang belum disimpan
}

async function muatTagihan() {
    const dateEl = byId('tagihan-tanggal');
    const tgl = dateEl.value;
    if (!tgl) { dateEl.value = tagihanLoadedDate || tgToday(); return; }
    if (tagihanIsDirty && tgl !== tagihanLoadedDate &&
        !confirm('Perubahan yang belum disimpan akan hilang. Lanjut ganti tanggal?')) {
        dateEl.value = tagihanLoadedDate;
        return;
    }
    const seq = ++tagihanLoadSeq;
    const simpan = byId('tagihan-simpan');
    simpan.disabled = true;
    tgStatus('Memuat laporan...');

    let rec = null, failMsg = '';
    try {
        const { data, error } = await sb.from('tagihan_harian').select('*')
            .eq('owner_id', currentUser.id).eq('tanggal', tgl).maybeSingle();
        if (error) throw error;
        rec = data;
    } catch (err) {
        failMsg = tgError(err, 'memuat laporan tagihan');
    }
    if (seq !== tagihanLoadSeq) return;   // ada pemuatan yang lebih baru

    const def = tgDefaults();
    tagihanLoadedDate = tgl;
    tagihanLoadFailed = !!failMsg;
    tagihanIsDirty = false;
    byId('tagihan-wilayah').value = rec ? (rec.wilayah || '') : def.wilayah;
    tgKodeSet(rec ? rec.kode : '');
    byId('tagihan-salesman').value = rec ? (rec.salesman || '') : def.salesman;
    tgRenderRows(rec && Array.isArray(rec.rows) ? rec.rows : []);
    tgUpdateHint();

    if (failMsg) {
        // Simpan dikunci agar laporan yang sudah ada di server tidak tertimpa lembar kosong.
        simpan.disabled = true;
        tgStatus(failMsg + ' Ganti tanggal atau buka ulang menu ini untuk mencoba lagi.', 'red');
        tagihanInit = true;
        return;
    }
    simpan.disabled = false;
    tgStatus(rec ? 'Laporan tersimpan dimuat. Ubah lalu klik Simpan.' : 'Laporan baru untuk tanggal ini.');
}

async function simpanTagihan() {
    if (tagihanSaving || tagihanLoadFailed || !currentUser) return;
    const all = tgCollect();
    const trs = tgBody().querySelectorAll('tr');
    for (let i = 0; i < all.length; i++) {
        if (all[i].tglFaktur && !tgTglValid(all[i].tglFaktur)) {
            alert(`Tanggal faktur pada baris ${i + 1} tidak valid. Gunakan format dd/mm/yyyy, contoh 05/11/2026.`);
            const el = trs[i].querySelector('[data-k="tglFaktur"]');
            el.classList.add('tg-bad'); el.focus();
            return;
        }
    }
    const rows = all.filter(tgHasData);
    const tgl = byId('tagihan-tanggal').value;
    const wilayah = byId('tagihan-wilayah').value.trim();
    const salesman = byId('tagihan-salesman').value.trim();
    const kode = tgKodeGet();

    tagihanSaving = true;
    const btn = byId('tagihan-simpan');
    btn.disabled = true;
    tgStatus('Menyimpan...');
    try {
        if (!rows.length) {
            const { error } = await sb.from('tagihan_harian').delete().eq('owner_id', currentUser.id).eq('tanggal', tgl);
            if (error) throw error;
        } else {
            const { error } = await sb.from('tagihan_harian').upsert(
                { owner_id: currentUser.id, tanggal: tgl, kode, wilayah, salesman, rows, updated_at: new Date().toISOString() },
                { onConflict: 'owner_id,tanggal' });
            if (error) throw error;
        }
        tagihanIsDirty = false;
        const t = new Date();
        tgStatus(rows.length ? `Tersimpan pukul ${pad2(t.getHours())}:${pad2(t.getMinutes())}.` : 'Laporan kosong, tidak ada yang disimpan.', 'green');
    } catch (err) {
        tgStatus(tgError(err, 'menyimpan laporan tagihan'), 'red');
    } finally {
        tagihanSaving = false;
        btn.disabled = false;
    }
}

function kosongkanTagihan() {
    if (!confirm('Kosongkan semua baris pada layar? Data di server baru berubah setelah Anda klik Simpan.')) return;
    tgRenderRows([]);
    tagihanDirty();
}

// ---- Simpan PDF: A5 bila toko < TAGIHAN_A5_BATAS, selain itu A4 (portrait) ----
function tgPaper(count) {
    return count < TAGIHAN_A5_BATAS
        ? { nama: 'A5', land: true, w: 210, h: 148, m: 5, cols: [7, 38, 36, 21, 19, 19, 22, 16, 20], pt: 7, ptHead: 6.5, ptTitle: 10, ptMeta: 8, titleH: 6.5, metaH: 5, rowH: 4.6, headH: 4, footH: 12, signH: 6, salesW: 50, sigW: 70, minRows: TAGIHAN_ROWS_A5 }
        : { nama: 'A4', w: 210, h: 297, m: 8, cols: [7, 34, 36, 21, 19, 19, 22, 16, 20], pt: 8, ptHead: 7.5, ptTitle: 11, ptMeta: 9, titleH: 9, metaH: 7, rowH: 6, headH: 5, footH: 22, signH: 13, salesW: 70, sigW: 98, minRows: TAGIHAN_ROWS_A4 };
}

function tgUpdatePaper() {
    const el = byId('tagihan-paper');
    if (!el) return;
    const n = tgCollect().filter(tgHasData).length;
    el.textContent = `Simpan PDF: kertas ${tgPaper(n).nama}${tgPaper(n).land ? ' landscape' : ''} (${n} toko; A5 bila kurang dari ${TAGIHAN_A5_BATAS} toko)`;
}

// Satu halaman laporan -> canvas
function tgDrawPage(p, info, rows, chunk, sum, pageNo, pageCount, k) {
    const c = newCanvas(p.w, p.h, k);
    const ctx = c.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = '#111';
    ctx.strokeStyle = '#4a4a4a';
    ctx.lineWidth = 0.25 * k;

    const px = (pt) => pt * PT * k;
    const font = (size, bold) => `${bold ? 'bold ' : ''}${size}px ${NOTA_FONT}`;
    const X = p.m, W = p.w - 2 * p.m;
    const xs = [];
    p.cols.reduce((acc, w, i) => { xs[i] = acc; return acc + w; }, X);

    // teks yang mengecil otomatis bila tidak muat (batas bawah minScale), sisanya dipotong
    const cell = (x, y, w, h, text, o = {}) => {
        ctx.strokeRect(x * k, y * k, w * k, h * k);
        if (!text) return;
        const pad = 1;
        let size = px(o.pt || p.pt);
        ctx.font = font(size, o.bold);
        const maxW = (w - 2 * pad) * k;
        const floor = size * (o.minScale || 0.75);
        while (ctx.measureText(text).width > maxW && size > floor) { size *= 0.95; ctx.font = font(size, o.bold); }
        ctx.save();
        ctx.beginPath(); ctx.rect(x * k, y * k, w * k, h * k); ctx.clip();
        ctx.textBaseline = 'middle';
        const cy = (y + h / 2) * k + 0.15 * k;
        if (o.align === 'right') { ctx.textAlign = 'right'; ctx.fillText(text, (x + w - pad) * k, cy); }
        else if (o.align === 'center') { ctx.textAlign = 'center'; ctx.fillText(text, (x + w / 2) * k, cy); }
        else { ctx.textAlign = 'left'; ctx.fillText(text, (x + pad) * k, cy); }
        ctx.restore();
    };

    let y = p.m;

    // judul
    ctx.font = font(px(p.ptTitle));
    if ('letterSpacing' in ctx) ctx.letterSpacing = (0.04 * px(p.ptTitle)) + 'px';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('LAPORAN PENERIMAAN TAGIHAN HARIAN', p.w / 2 * k, (y + p.titleH / 2) * k);
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
    y += p.titleH;

    // baris meta (Kode, Tanggal, Wilayah, Salesman)
    const segs = [];
    if (info.kode) segs.push(['Kode :', info.kode]);
    segs.push(['TANGGAL :', info.tglTxt], ['Wilayah :', info.wilayah], ['Salesman :', info.salesman]);
    const gap = 6 * k;
    let msize = px(p.ptMeta);
    const measure = () => segs.reduce((t, s) => {
        ctx.font = font(msize, true); const a = ctx.measureText(s[0] + ' ').width;
        ctx.font = font(msize, false); return t + a + ctx.measureText(s[1]).width;
    }, 0) + gap * (segs.length - 1);
    while (measure() > W * k && msize > px(p.ptMeta) * 0.6) msize *= 0.95;
    let mx = (p.w * k - measure()) / 2;
    ctx.textAlign = 'left';
    segs.forEach(s => {
        ctx.font = font(msize, true);
        ctx.fillText(s[0] + ' ', mx, (y + p.metaH / 2) * k);
        mx += ctx.measureText(s[0] + ' ').width;
        ctx.font = font(msize, false);
        ctx.fillText(s[1], mx, (y + p.metaH / 2) * k);
        mx += ctx.measureText(s[1]).width + gap;
    });
    y += p.metaH;

    // kepala tabel
    const hh = p.headH, cw = p.cols;
    const hc = { align: 'center', pt: p.ptHead, minScale: 0.5 };
    ['No.', 'Nama Pelanggan', 'No & Tgl. Faktur', 'Nilai Faktur'].forEach((t, i) => cell(xs[i], y, cw[i], hh * 2, t, hc));
    cell(xs[4], y, cw[4] + cw[5] + cw[6], hh, 'Pembayaran', hc);
    cell(xs[4], y + hh, cw[4], hh, 'Cash', hc);
    cell(xs[5], y + hh, cw[5], hh, 'Nilai Giro', hc);
    cell(xs[6], y + hh, cw[6], hh, 'Ket Giro & Tgl', hc);
    cell(xs[7], y, cw[7], hh * 2, 'Disc / Retur', hc);
    cell(xs[8], y, cw[8], hh * 2, 'Keterangan', hc);
    y += hh * 2;

    // isi tabel
    const num = (v) => v ? tgGroup(String(Number(v))) : '';
    for (let n = chunk.from; n < chunk.to; n++) {
        const r = rows[n] || {};
        const faktur = [r.noFaktur, r.tglFaktur].filter(Boolean).join('  ');
        cell(xs[0], y, cw[0], p.rowH, `${n + 1}.`, { align: 'right', pt: p.pt - 0.5 });
        cell(xs[1], y, cw[1], p.rowH, r.nama || '');
        cell(xs[2], y, cw[2], p.rowH, faktur);
        cell(xs[3], y, cw[3], p.rowH, num(r.nilai), { align: 'right' });
        cell(xs[4], y, cw[4], p.rowH, num(r.cash), { align: 'right' });
        cell(xs[5], y, cw[5], p.rowH, num(r.giro), { align: 'right' });
        cell(xs[6], y, cw[6], p.rowH, r.ketGiro || '');
        cell(xs[7], y, cw[7], p.rowH, num(r.disc), { align: 'right' });
        cell(xs[8], y, cw[8], p.rowH, r.ket || '');
        y += p.rowH;
    }

    if (chunk.last) {
        const tot = (v) => v ? tgGroup(String(v)) : '';
        const b = { bold: true, align: 'right' };
        cell(xs[0], y, cw[0] + cw[1] + cw[2], p.rowH, 'JUMLAH', b);
        cell(xs[3], y, cw[3], p.rowH, tot(sum.nilai), b);
        cell(xs[4], y, cw[4], p.rowH, tot(sum.cash), b);
        cell(xs[5], y, cw[5], p.rowH, tot(sum.giro), b);
        cell(xs[6], y, cw[6], p.rowH, '');
        cell(xs[7], y, cw[7], p.rowH, tot(sum.disc), b);
        cell(xs[8], y, cw[8], p.rowH, '');
        y += p.rowH;

        // tanda tangan
        const fy = y + 4;
        ctx.font = font(px(p.ptHead)); ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText('Salesman / Pengambil Faktur', X * k, (fy + 1.5) * k);
        let nsize = px(p.ptMeta);
        const nm = `( ${info.salesman} )`;
        ctx.font = font(nsize);
        while (ctx.measureText(nm).width > p.salesW * k && nsize > px(p.ptMeta) * 0.6) { nsize *= 0.95; ctx.font = font(nsize); }
        ctx.textAlign = 'center';
        ctx.fillText(nm, (X + p.salesW / 2) * k, (fy + 3 + p.signH + 3) * k);

        const sx = X + W - p.sigW, sw = p.sigW / 3;
        ['Kasir', 'Accounting', 'Diperiksa Oleh'].forEach((t, i) => {
            cell(sx + i * sw, fy, sw, hh, t, { align: 'center', pt: p.ptHead, minScale: 0.6 });
            cell(sx + i * sw, fy + hh, sw, p.signH + 2, '');
        });
    }

    if (pageCount > 1) {
        ctx.font = font(px(p.ptHead)); ctx.fillStyle = '#555'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        ctx.fillText(`Hal. ${pageNo} / ${pageCount}`, (p.w - p.m) * k, (p.h - p.m / 2) * k);
    }
    return c;
}

// PDF sederhana tanpa library: tiap halaman berisi satu gambar JPEG penuh, ukuran halaman bebas (mm).
function tgBuildPdf(pages, wMm, hMm) {
    const PW = +(wMm * 72 / 25.4).toFixed(2), PH = +(hMm * 72 / 25.4).toFixed(2);
    const enc = new TextEncoder();
    const parts = [];
    const offsets = [];
    let pos = 0;
    const add = (x) => { const b = typeof x === 'string' ? enc.encode(x) : x; parts.push(b); pos += b.length; };
    const obj = (n, fn) => { offsets[n] = pos; add(`${n} 0 obj\n`); fn(); add('\nendobj\n'); };

    const total = 2 + pages.length * 3;
    add('%PDF-1.4\n');
    obj(1, () => add('<< /Type /Catalog /Pages 2 0 R >>'));
    obj(2, () => add(`<< /Type /Pages /Count ${pages.length} /Kids [${pages.map((_, i) => `${3 + i * 3} 0 R`).join(' ')}] >>`));
    pages.forEach((pg, i) => {
        const po = 3 + i * 3, co = po + 1, io = po + 2;
        obj(po, () => add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PW} ${PH}] /Resources << /XObject << /Im0 ${io} 0 R >> >> /Contents ${co} 0 R >>`));
        const content = `q ${PW} 0 0 ${PH} 0 0 cm /Im0 Do Q`;
        obj(co, () => add(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`));
        obj(io, () => {
            add(`<< /Type /XObject /Subtype /Image /Width ${pg.w} /Height ${pg.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${pg.jpeg.length} >>\nstream\n`);
            add(pg.jpeg);
            add('\nendstream');
        });
    });
    const xrefPos = pos;
    add(`xref\n0 ${total + 1}\n0000000000 65535 f \n`);
    for (let n = 1; n <= total; n++) add(String(offsets[n]).padStart(10, '0') + ' 00000 n \n');
    add(`trailer\n<< /Size ${total + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`);
    return new Blob(parts, { type: 'application/pdf' });
}

let tagihanPdfBusy = false;

async function simpanPdfTagihan() {
    if (tagihanPdfBusy) return;
    const data = tgCollect().filter(tgHasData);
    if (!data.length) { alert('Belum ada data tagihan untuk dijadikan PDF.'); return; }

    const p = tgPaper(data.length);
    const rows = data.slice();
    while (rows.length < p.minRows) rows.push({});

    const sum = { nilai: 0, cash: 0, giro: 0, disc: 0 };
    data.forEach(r => TAGIHAN_NUM.forEach(k => { sum[k] += Number(r[k]) || 0; }));

    const tgl = byId('tagihan-tanggal').value;
    const d = new Date(tgl + 'T00:00:00');
    const info = {
        kode: tgKodeGet(),
        tglTxt: isNaN(d) ? '' : d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
        wilayah: byId('tagihan-wilayah').value.trim(),
        salesman: byId('tagihan-salesman').value.trim()
    };

    // bagi baris ke halaman (kepala tabel diulang; jumlah & tanda tangan di halaman terakhir)
    const avail = p.h - 2 * p.m - p.titleH - p.metaH - 2 * p.headH;
    const capFull = Math.max(1, Math.floor(avail / p.rowH));
    const capLast = Math.max(0, Math.floor((avail - p.rowH - 4 - p.footH) / p.rowH));
    const chunks = [];
    for (let pos = 0; ;) {
        const remaining = rows.length - pos;
        if (remaining <= capLast) { chunks.push({ from: pos, to: rows.length, last: true }); break; }
        const take = Math.min(capFull, remaining);
        chunks.push({ from: pos, to: pos + take, last: false });
        pos += take;
    }

    const btn = byId('tagihan-pdf');
    const label = btn.innerHTML;
    tagihanPdfBusy = true;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Membuat PDF...';
    try {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        const k = 250 / 25.4;   // 250 dpi
        const pages = [];
        for (let i = 0; i < chunks.length; i++) {
            const canvas = tgDrawPage(p, info, rows, chunks[i], sum, i + 1, chunks.length, k);
            const blob = await canvasToBlob(canvas, 'image/jpeg', 0.92);
            pages.push({ jpeg: new Uint8Array(await blob.arrayBuffer()), w: canvas.width, h: canvas.height });
        }
        const safe = (s) => String(s || '').replace(/[^A-Za-z0-9_-]+/g, '_').replace(/^_+|_+$/g, '');
        const name = ['Laporan_Tagihan', tgl, safe(info.wilayah), p.nama].filter(Boolean).join('_') + '.pdf';
        saveBlob(tgBuildPdf(pages, p.w, p.h), name);
        tgStatus(`PDF ${p.nama} disimpan (${data.length} toko).`, 'green');
    } catch (err) {
        alert('Gagal membuat PDF: ' + (err && err.message ? err.message : err));
    } finally {
        tagihanPdfBusy = false;
        btn.disabled = false;
        btn.innerHTML = label;
    }
}

// ---- Kode (dropdown SMS / WM / MSJ / tulis manual) ----
function tgKodeGet() {
    const sel = byId('tagihan-kode');
    if (!sel) return '';
    return sel.value === '__manual' ? byId('tagihan-kode-manual').value.trim() : sel.value;
}

function tgKodeSet(v) {
    const sel = byId('tagihan-kode'), man = byId('tagihan-kode-manual');
    v = (v || '').trim();
    if (!v || TAGIHAN_KODE.includes(v)) { sel.value = v; man.value = ''; }
    else { sel.value = '__manual'; man.value = v; }
    man.classList.toggle('hidden', sel.value !== '__manual');
}

function tgKodeChanged() {
    const sel = byId('tagihan-kode'), man = byId('tagihan-kode-manual');
    man.classList.toggle('hidden', sel.value !== '__manual');
    if (sel.value === '__manual') man.focus(); else man.value = '';
    tagihanDirty();
}


initAuth();

// Penghitung karakter catatan pesanan
document.addEventListener('input', function (e) {
    if (e.target && e.target.id === 'pesanan-catatan') updateCatatanCount();
});
