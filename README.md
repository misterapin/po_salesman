# PO SALESMAN - Online (Vercel + Supabase)

Struktur:
```
index.html  script.js  style.css  config.js
api/users.js            <- fungsi server Vercel (kelola akun pengguna)
supabase/schema.sql     <- tabel + keamanan (RLS)
supabase/seed.sql       <- (opsional) 86 produk & 3 pelanggan contoh
```

## 1. Supabase
1. Buat proyek di https://supabase.com (pilih region Singapore).
2. **SQL Editor** -> jalankan isi `supabase/schema.sql`, lalu (opsional) `supabase/seed.sql`.
3. **Authentication > Users > Add user > Create new user**
   - Email: `admin@po-salesman.app`, isi password, centang **Auto Confirm User**.
4. Kembali ke **SQL Editor**, jalankan:
   ```sql
   insert into public.profiles (id, username, nama, role, default_pw)
   select id, 'admin', 'Administrator', 'admin', false
   from auth.users where email = 'admin@po-salesman.app';
   ```
5. **Authentication > Sign In / Providers**: matikan **Allow new users to sign up** (wajib, agar orang luar tidak bisa daftar sendiri).
6. **Project Settings > API**: catat `Project URL`, `anon/publishable key`, dan `service_role/secret key`.

## 2. Isi konfigurasi
Edit `config.js`: isi `SUPABASE_URL` dan `SUPABASE_ANON_KEY` (kunci anon boleh publik).

## 3. Vercel
1. Upload folder ini ke GitHub (atau pakai `npx vercel` dari folder ini).
2. Import repo di https://vercel.com (Framework Preset: **Other**, tanpa build command).
3. **Settings > Environment Variables**, tambahkan:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`  (RAHASIA - jangan masuk ke config.js / GitHub)
4. Deploy (atau Redeploy bila variabel ditambah setelahnya).

## 4. Pindahkan data lama
Di aplikasi versi lama (browser lama): klik **Backup** -> unduh JSON.
Di aplikasi online (login Admin): klik **Restore** -> pilih file JSON tadi.
Restore bersifat menambah/menimpa berdasarkan ID, tidak menghapus data yang sudah ada.

## Catatan
- Login memakai username; di Supabase tersimpan sebagai email `username@po-salesman.app`.
- Akun baru (kasir dll.) dibuat dari menu **Pengguna** di aplikasi (butuh `SUPABASE_SERVICE_ROLE_KEY`).
- Hak akses ditegakkan di database (RLS), bukan hanya di tampilan: Kasir tidak bisa ubah produk/hapus data walau lewat console browser.
- Mengganti password akun admin bawaan: menu di aplikasi (**Ganti Password**).
- Free plan Supabase menjeda proyek yang tidak aktif ~1 minggu; buka aplikasi berkala atau upgrade.
