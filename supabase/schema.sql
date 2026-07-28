-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query)
-- for the barbershop's Supabase project.

create extension if not exists pgcrypto;

create table if not exists barbers (
  id text primary key,
  name text not null,
  connect_token text not null unique default encode(gen_random_bytes(12), 'hex'),
  google_refresh_token text,
  google_calendar_id text,
  connected boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists bookings (
  id text primary key,
  barber_id text not null references barbers(id),
  service_id text not null,
  service_name text not null,
  date date not null,
  time_slot text not null,
  duration_minutes integer,
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  extras jsonb not null default '[]'::jsonb,
  total_price numeric not null,
  status text not null default 'bevestigd',
  google_event_id text,
  created_at timestamptz not null default now()
);

create index if not exists bookings_barber_date_idx on bookings (barber_id, date);

-- Row Level Security is enabled with NO policies attached on purpose: the
-- public/anon API key therefore has zero access to these tables. Only the
-- Netlify Functions (which use the Supabase service_role key, a secret that
-- only lives in Netlify's environment variables) can read or write here.
alter table barbers enable row level security;
alter table bookings enable row level security;

-- Seed the three barbers. connect_token is the secret in each barber's
-- private "connect my calendar" link — after running this, read the tokens
-- back out with:
--   select id, name, connect_token from barbers;
-- and send each barber their own link:
--   https://<your-site>/team/<id>/agenda?token=<connect_token>
insert into barbers (id, name) values
  ('majid', 'Majid'),
  ('ayoub', 'Ayoub'),
  ('yanti', 'Yanti')
on conflict (id) do nothing;
