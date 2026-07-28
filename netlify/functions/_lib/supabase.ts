import { createClient } from '@supabase/supabase-js';

// Service-role client — only ever used inside Netlify Functions (server
// side). Never import this from frontend code: the service role key
// bypasses Row Level Security entirely.
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

export interface BarberRow {
  id: string;
  name: string;
  connect_token: string;
  google_refresh_token: string | null;
  google_calendar_id: string | null;
  connected: boolean;
}

export interface BookingRow {
  id: string;
  barber_id: string;
  service_id: string;
  service_name: string;
  date: string;
  time_slot: string;
  duration_minutes: number | null;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  extras: { name: string; price: number }[];
  total_price: number;
  status: string;
  google_event_id: string | null;
  created_at: string;
}
