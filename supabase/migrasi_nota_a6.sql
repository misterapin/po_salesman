-- Migrasi: kolom baru pada tabel pesanan untuk nota A6
-- (catatan, no. order, kode salesman, Cash/Tempo).
-- Jalankan SEKALI di Supabase > SQL Editor (aman dijalankan ulang).
alter table public.pesanan
    add column if not exists catatan        text not null default '',
    add column if not exists no_order       text not null default '',
    add column if not exists kode_salesman  text not null default '',
    add column if not exists pembayaran     text not null default '';

alter table public.pesanan drop constraint if exists pesanan_pembayaran_chk;
alter table public.pesanan
    add constraint pesanan_pembayaran_chk check (pembayaran in ('', 'cash', 'tempo'));
