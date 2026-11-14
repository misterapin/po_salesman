-- Menyimpan paraf toko (goresan tanda tangan) pada nota pesanan.
-- Jalankan sekali di Supabase > SQL Editor.
alter table public.pesanan add column if not exists paraf_toko text not null default '';

-- Muat ulang skema agar kolom baru langsung dikenali API
notify pgrst, 'reload schema';
