-- Migrasi: tambah kolom catatan pada pesanan.
-- Jalankan SEKALI di Supabase > SQL Editor (aman dijalankan ulang).
alter table public.pesanan
    add column if not exists catatan text not null default '';
