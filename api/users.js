// Vercel Serverless Function: kelola akun pengguna (hanya Admin).
// Butuh Environment Variables di Vercel:
//   SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
// (alias yang juga diterima: lihat api/_env.js)
// SUPABASE_SERVICE_ROLE_KEY bersifat RAHASIA, jangan dimasukkan ke kode front-end.

const EMAIL_DOMAIN = 'po-salesman.app';
const toEmail = (u) => `${String(u).trim().toLowerCase()}@${EMAIL_DOMAIN}`;

const { readEnv, missingNames } = require('./_env');

function env() {
    const cfg = readEnv();
    const missing = missingNames(cfg);
    if (missing.length) {
        throw new HttpError(500, 'Environment variable belum terbaca di Vercel: ' + missing.join(', ') +
            '. Tambahkan di Settings > Environment Variables (centang Production), lalu Redeploy.');
    }
    return cfg;
}

class HttpError extends Error {
    constructor(status, message) { super(message); this.status = status; }
}

function serviceHeaders(key, extra = {}) {
    const h = { apikey: key, 'Content-Type': 'application/json', ...extra };
    // Kunci lama (JWT, awalan "eyJ") juga dikirim sebagai Bearer.
    // Kunci baru (sb_secret_...) cukup lewat header apikey.
    if (key.startsWith('eyJ')) h.Authorization = `Bearer ${key}`;
    return h;
}

async function sbFetch(url, options) {
    const res = await fetch(url, options);
    const text = await res.text();
    let json = null;
    try { json = text ? JSON.parse(text) : null; } catch (e) { /* bukan JSON */ }
    return { ok: res.ok, status: res.status, json, text };
}

async function authenticateAdmin(req, cfg) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!token) throw new HttpError(401, 'Belum login.');

    const who = await sbFetch(`${cfg.url}/auth/v1/user`, {
        headers: { apikey: cfg.anon, Authorization: `Bearer ${token}` }
    });
    if (!who.ok || !who.json || !who.json.id) throw new HttpError(401, 'Sesi tidak valid. Silakan login ulang.');

    const prof = await sbFetch(`${cfg.url}/rest/v1/profiles?id=eq.${who.json.id}&select=id,role`, {
        headers: serviceHeaders(cfg.service)
    });
    const me = prof.ok && Array.isArray(prof.json) ? prof.json[0] : null;
    if (!me || me.role !== 'admin') throw new HttpError(403, 'Hanya Admin yang boleh mengelola pengguna.');
    return me;
}

async function getProfiles(cfg) {
    const r = await sbFetch(`${cfg.url}/rest/v1/profiles?select=id,username,role`, { headers: serviceHeaders(cfg.service) });
    if (!r.ok) throw new HttpError(500, 'Gagal membaca daftar pengguna.');
    return r.json;
}

function validate(body, { needPassword }) {
    const username = String(body.username || '').trim();
    const nama = String(body.nama || '').trim();
    const role = body.role;
    const password = body.password ? String(body.password) : '';
    if (!/^[A-Za-z0-9_.-]{3,20}$/.test(username)) throw new HttpError(400, 'Username 3-20 karakter: huruf, angka, titik, strip, atau underscore.');
    if (!nama) throw new HttpError(400, 'Nama lengkap wajib diisi.');
    if (!['admin', 'kasir'].includes(role)) throw new HttpError(400, 'Role tidak valid.');
    if ((needPassword || password) && password.length < 6) throw new HttpError(400, 'Password minimal 6 karakter.');
    return { username, nama, role, password };
}

async function createUser(cfg, body) {
    const v = validate(body, { needPassword: true });
    const profiles = await getProfiles(cfg);
    if (profiles.some(p => p.username.toLowerCase() === v.username.toLowerCase())) throw new HttpError(409, 'Username sudah dipakai.');

    const created = await sbFetch(`${cfg.url}/auth/v1/admin/users`, {
        method: 'POST',
        headers: serviceHeaders(cfg.service),
        body: JSON.stringify({ email: toEmail(v.username), password: v.password, email_confirm: true })
    });
    if (!created.ok || !created.json || !created.json.id) {
        throw new HttpError(400, (created.json && (created.json.msg || created.json.message)) || 'Gagal membuat akun.');
    }

    const ins = await sbFetch(`${cfg.url}/rest/v1/profiles`, {
        method: 'POST',
        headers: serviceHeaders(cfg.service, { Prefer: 'return=minimal' }),
        body: JSON.stringify({ id: created.json.id, username: v.username, nama: v.nama, role: v.role, default_pw: false })
    });
    if (!ins.ok) {
        // batalkan akun auth agar tidak ada akun "yatim"
        await sbFetch(`${cfg.url}/auth/v1/admin/users/${created.json.id}`, { method: 'DELETE', headers: serviceHeaders(cfg.service) });
        throw new HttpError(500, 'Gagal menyimpan profil pengguna.');
    }
    return { id: created.json.id };
}

async function updateUser(cfg, me, body) {
    const id = String(body.id || '');
    if (!id) throw new HttpError(400, 'ID pengguna wajib diisi.');
    const v = validate(body, { needPassword: false });
    const profiles = await getProfiles(cfg);
    const target = profiles.find(p => p.id === id);
    if (!target) throw new HttpError(404, 'Pengguna tidak ditemukan.');
    if (profiles.some(p => p.id !== id && p.username.toLowerCase() === v.username.toLowerCase())) throw new HttpError(409, 'Username sudah dipakai.');

    if (id === me.id) v.role = target.role; // tidak boleh ubah role sendiri
    if (target.role === 'admin' && v.role !== 'admin' && profiles.filter(p => p.role === 'admin').length <= 1) {
        throw new HttpError(400, 'Minimal harus ada satu akun Admin.');
    }

    const authBody = { email: toEmail(v.username), email_confirm: true };
    if (v.password) authBody.password = v.password;
    const up = await sbFetch(`${cfg.url}/auth/v1/admin/users/${id}`, {
        method: 'PUT', headers: serviceHeaders(cfg.service), body: JSON.stringify(authBody)
    });
    if (!up.ok) throw new HttpError(400, (up.json && (up.json.msg || up.json.message)) || 'Gagal memperbarui akun.');

    const patch = { username: v.username, nama: v.nama, role: v.role };
    if (v.password) patch.default_pw = false;
    const pr = await sbFetch(`${cfg.url}/rest/v1/profiles?id=eq.${id}`, {
        method: 'PATCH', headers: serviceHeaders(cfg.service, { Prefer: 'return=minimal' }), body: JSON.stringify(patch)
    });
    if (!pr.ok) throw new HttpError(500, 'Gagal memperbarui profil pengguna.');
    return { id };
}

async function deleteUser(cfg, me, body) {
    const id = String(body.id || '');
    if (!id) throw new HttpError(400, 'ID pengguna wajib diisi.');
    if (id === me.id) throw new HttpError(400, 'Anda tidak dapat menghapus akun yang sedang dipakai.');
    const profiles = await getProfiles(cfg);
    const target = profiles.find(p => p.id === id);
    if (!target) throw new HttpError(404, 'Pengguna tidak ditemukan.');
    if (target.role === 'admin' && profiles.filter(p => p.role === 'admin').length <= 1) {
        throw new HttpError(400, 'Minimal harus ada satu akun Admin.');
    }
    const del = await sbFetch(`${cfg.url}/auth/v1/admin/users/${id}`, { method: 'DELETE', headers: serviceHeaders(cfg.service) });
    if (!del.ok) throw new HttpError(500, 'Gagal menghapus akun.');
    return { id };
}

module.exports = async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    try {
        const cfg = env();
        const me = await authenticateAdmin(req, cfg);
        const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

        let result;
        if (req.method === 'POST') result = await createUser(cfg, body);
        else if (req.method === 'PATCH') result = await updateUser(cfg, me, body);
        else if (req.method === 'DELETE') result = await deleteUser(cfg, me, body);
        else throw new HttpError(405, 'Metode tidak didukung.');

        res.status(200).json({ ok: true, ...result });
    } catch (err) {
        const status = err instanceof HttpError ? err.status : 500;
        res.status(status).json({ error: err instanceof HttpError ? err.message : 'Terjadi kesalahan server.' });
    }
};
