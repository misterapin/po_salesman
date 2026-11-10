// Membaca environment variable Supabase. Menerima beberapa nama umum
// (termasuk yang dibuat oleh integrasi Vercel-Supabase) dan membersihkan
// spasi / tanda kutip yang sering ikut ter-copy.
const clean = (v) => String(v || '').trim().replace(/^["']|["']$/g, '').trim();
const pick = (...names) => {
    for (const n of names) {
        const v = clean(process.env[n]);
        if (v) return v;
    }
    return '';
};

function readEnv() {
    return {
        url: pick('SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL').replace(/\/+$/, ''),
        anon: pick('SUPABASE_ANON_KEY', 'SUPABASE_PUBLISHABLE_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'),
        service: pick('SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_SECRET_KEY')
    };
}

function missingNames(cfg) {
    const m = [];
    if (!cfg.url) m.push('SUPABASE_URL');
    if (!cfg.anon) m.push('SUPABASE_ANON_KEY');
    if (!cfg.service) m.push('SUPABASE_SERVICE_ROLE_KEY');
    return m;
}

module.exports = { readEnv, missingNames };
