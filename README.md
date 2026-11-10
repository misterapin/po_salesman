# PO SALESMAN - Online (Vercel + Supabase)

```
index.html  script.js  style.css  config.js   <- aplikasi (front-end)
api/users.js     <- fungsi server: tambah/ubah/hapus akun (hanya Admin)
api/health.js    <- cek konfigurasi: buka /api/health
api/_env.js      <- pembaca environment variable
supabase/schema.sql, seed.sql
vercel.json      <- header keamanan
```

## A. Supabase (sekali saja)
1. SQL Editor -> jalankan `supabase/schema.sql` (lalu `seed.sql` bila mau data contoh).
2. Authentication > Users > Add user > Create new user:
   email `admin@po-salesman.app`, isi password, centang **Auto Confirm User**.
3. SQL Editor -> jalankan:
   ```sql
   insert into public.profiles (id, username, nama, role, default_pw)
   select id, 'admin', 'Administrator', 'admin', false
   from auth.users where email = 'admin@po-salesman.app';
   ```
4. Authentication > Sign In / Providers: matikan **Allow new users to sign up**.
5. Project Settings > API Keys: siapkan **Project URL**, **Publishable key**, dan **Secret key**
   (bila tampil tab "Legacy": anon key dan service_role key).

## B. Isi config.js
`SUPABASE_URL` dan `SUPABASE_ANON_KEY` (publishable/anon key, aman publik).
Secret / service_role key JANGAN ditaruh di sini.

## C. Deploy ke Vercel
**Lewat GitHub (disarankan)**
1. Buat repo GitHub, upload SEMUA isi folder ini. `index.html` harus di root repo,
   dan folder `api/` harus bernama persis `api` (huruf kecil).
2. https://vercel.com > Add New > Project > Import repo tersebut.
3. Framework Preset: **Other**. Build Command, Output Directory, Install Command: kosongkan.
4. Buka **Environment Variables** (di halaman import atau Settings > Environment Variables), tambahkan:

   | Name | Value |
   |---|---|
   | `SUPABASE_URL` | Project URL, mis. `https://abcd.supabase.co` |
   | `SUPABASE_ANON_KEY` | Publishable / anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | Secret / service_role key (RAHASIA) |

   Centang **Production** (dan Preview bila perlu). Tempel nilainya TANPA tanda kutip.
5. Klik **Deploy**.
6. Setiap kali menambah/mengubah variabel SETELAH deploy: tab **Deployments** > titik tiga (...)
   pada deployment terbaru > **Redeploy**. Variabel hanya terbaca oleh deployment baru.

**Lewat CLI (alternatif)**
```
npm i -g vercel
vercel login
vercel                # deploy preview
vercel env add SUPABASE_URL production
vercel env add SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel --prod
```

## D. Verifikasi
1. Buka `https://DOMAIN-ANDA/api/health` -> harus tampil `"ok": true` dan ketiganya `true`.
   Bila ada yang `false`, nama variabel tertera di `missing`.
2. Login `admin` + password yang Anda buat di langkah A.2.
3. Menu **Pengguna** > Tambah Pengguna > buat akun Kasir, lalu coba login sebagai kasir.

## E. Pemecahan masalah
| Gejala | Penyebab / solusi |
|---|---|
| "Environment variable belum terbaca ..." | Variabel belum ada / salah nama / belum Redeploy. Cek `/api/health`. |
| "Endpoint /api/users tidak ditemukan (404)" | Folder `api/` tidak ikut ter-upload atau salah nama. |
| "Username atau password salah" | Admin belum dibuat lewat A.2-A.3, atau password salah. |
| "Akun ini belum memiliki profil" | Jalankan SQL A.3 (insert ke `profiles`). |
| Data tidak muncul setelah login | `schema.sql` belum dijalankan, atau profil belum dibuat. |
| Proyek Supabase "paused" | Free plan dijeda bila tidak aktif ~1 minggu; klik Restore di dashboard. |

## F. Pindahkan data lama
Aplikasi lama: **Backup** (unduh JSON). Aplikasi online (Admin): **Restore** (pilih file tadi).
Restore menambah/menimpa berdasarkan ID dan tidak menghapus data lain.

## G. Tampilan HP
Di layar < 640px: menu tab pindah ke bawah, tabel tampil sebagai kartu, dialog muncul dari bawah (bottom sheet),
header dua baris dengan tombol ikon. Di layar lebar tampilan tetap seperti semula.
Bila menambah kolom tabel baru, beri atribut `data-label="Nama Kolom"` pada `<td>` agar labelnya muncul di kartu HP.
