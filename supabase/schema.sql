-- =====================================================================
-- PO SALESMAN - Skema Supabase
-- Jalankan seluruh file ini di Supabase > SQL Editor (sekali saja).
-- =====================================================================

-- ---------- TABEL ----------
create table if not exists public.profiles (
    id          uuid primary key references auth.users(id) on delete cascade,
    username    text not null unique,
    nama        text not null,
    role        text not null check (role in ('admin', 'kasir')),
    default_pw  boolean not null default false,
    created_at  timestamptz not null default now()
);

create table if not exists public.produk (
    id          text primary key,
    nama        text not null,
    kategori    text not null default '',
    satuan      text not null,
    harga       numeric not null check (harga >= 0),
    created_at  timestamptz not null default now()
);

create table if not exists public.pelanggan (
    id          text primary key,
    nama        text not null,
    hp          text not null,
    alamat      text not null default '',
    created_at  timestamptz not null default now()
);

create table if not exists public.pesanan (
    id            text primary key,
    no_nota       text not null unique,
    tanggal       timestamptz not null default now(),
    pelanggan_id  text,
    items         jsonb not null default '[]'::jsonb,
    created_by    uuid default auth.uid() references auth.users(id) on delete set null
);

create index if not exists pesanan_tanggal_idx on public.pesanan (tanggal desc);

-- ---------- FUNGSI ROLE ----------
create or replace function public.app_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
    select role from public.profiles where id = auth.uid()
$$;

revoke all on function public.app_role() from public, anon;
grant execute on function public.app_role() to authenticated;

-- ---------- HAK AKSES TABEL ----------
revoke all on public.profiles, public.produk, public.pelanggan, public.pesanan from anon, authenticated;

grant select on public.profiles to authenticated;
grant update (default_pw) on public.profiles to authenticated;   -- hanya flag ini yang boleh diubah dari browser
grant select, insert, update, delete on public.produk, public.pelanggan, public.pesanan to authenticated;

-- ---------- ROW LEVEL SECURITY ----------
alter table public.profiles  enable row level security;
alter table public.produk    enable row level security;
alter table public.pelanggan enable row level security;
alter table public.pesanan   enable row level security;

-- profiles: user melihat dirinya sendiri, admin melihat semua. Tulis lewat API server (service role).
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select to authenticated
    using (id = auth.uid() or public.app_role() = 'admin');

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles for update to authenticated
    using (id = auth.uid()) with check (id = auth.uid());

-- produk: semua login boleh lihat; hanya admin yang boleh ubah
drop policy if exists produk_select on public.produk;
create policy produk_select on public.produk for select to authenticated using (true);
drop policy if exists produk_write on public.produk;
create policy produk_write on public.produk for all to authenticated
    using (public.app_role() = 'admin') with check (public.app_role() = 'admin');

-- pelanggan: admin & kasir boleh tambah/ubah; hapus hanya admin
drop policy if exists pelanggan_select on public.pelanggan;
create policy pelanggan_select on public.pelanggan for select to authenticated using (true);
drop policy if exists pelanggan_insert on public.pelanggan;
create policy pelanggan_insert on public.pelanggan for insert to authenticated
    with check (public.app_role() in ('admin', 'kasir'));
drop policy if exists pelanggan_update on public.pelanggan;
create policy pelanggan_update on public.pelanggan for update to authenticated
    using (public.app_role() in ('admin', 'kasir')) with check (public.app_role() in ('admin', 'kasir'));
drop policy if exists pelanggan_delete on public.pelanggan;
create policy pelanggan_delete on public.pelanggan for delete to authenticated
    using (public.app_role() = 'admin');

-- pesanan: admin & kasir boleh tambah/ubah; hapus hanya admin
drop policy if exists pesanan_select on public.pesanan;
create policy pesanan_select on public.pesanan for select to authenticated using (true);
drop policy if exists pesanan_insert on public.pesanan;
create policy pesanan_insert on public.pesanan for insert to authenticated
    with check (public.app_role() in ('admin', 'kasir'));
drop policy if exists pesanan_update on public.pesanan;
create policy pesanan_update on public.pesanan for update to authenticated
    using (public.app_role() in ('admin', 'kasir')) with check (public.app_role() in ('admin', 'kasir'));
drop policy if exists pesanan_delete on public.pesanan;
create policy pesanan_delete on public.pesanan for delete to authenticated
    using (public.app_role() = 'admin');

-- =====================================================================
-- AKUN ADMIN PERTAMA (lihat README.md langkah 1.3 - 1.4)
--
-- insert into public.profiles (id, username, nama, role, default_pw)
-- select id, 'admin', 'Administrator', 'admin', false
-- from auth.users where email = 'admin@po-salesman.app';
-- =====================================================================
