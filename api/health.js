// Cek cepat konfigurasi deploy: buka https://DOMAIN-ANDA/api/health
// Hanya menampilkan apakah variabel TERISI (true/false), tidak pernah nilainya.
const { readEnv, missingNames } = require('./_env');

module.exports = (req, res) => {
    const cfg = readEnv();
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
        ok: missingNames(cfg).length === 0,
        SUPABASE_URL: !!cfg.url,
        SUPABASE_ANON_KEY: !!cfg.anon,
        SUPABASE_SERVICE_ROLE_KEY: !!cfg.service,
        missing: missingNames(cfg)
    });
};
