export const SHOP_TIME_ZONE = 'Europe/Amsterdam';

// Netlify Functions run with the server clock in UTC, so naively parsing
// "2026-08-05T14:00:00" (no offset) gives 14:00 UTC, not 14:00 Amsterdam
// time — off by 1h (CET) or 2h (CEST) depending on daylight saving. This
// converts a wall-clock date+time in the shop's timezone to the correct
// UTC instant, so the time we hand to Google Calendar actually matches
// what the customer booked.
export function zonedTimeToUtcISO(dateStr: string, timeStr: string, timeZone: string = SHOP_TIME_ZONE): string {
  const [y, mo, d] = dateStr.split('-').map(Number);
  const [h, mi] = timeStr.split(':').map(Number);
  const guess = new Date(Date.UTC(y, mo - 1, d, h, mi, 0));

  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const parts: Record<string, string> = {};
  for (const p of dtf.formatToParts(guess)) {
    if (p.type !== 'literal') parts[p.type] = p.value;
  }
  const asIfUTC = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  const offsetMs = asIfUTC - guess.getTime();
  return new Date(guess.getTime() - offsetMs).toISOString();
}
