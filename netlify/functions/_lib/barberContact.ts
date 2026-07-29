import { zonedTimeToUtcISO } from './time';

// Per-barber direct phone number, shown to a customer who's past the
// self-service deadline and needs to call to change/cancel their
// appointment. Falls back to the shop's general line if a specific
// barber's number isn't on file yet.
const SHOP_PHONE = '06-84289005';

const BARBER_PHONES: Record<string, string> = {
  majid: '06-84289005',
  ayoub: '06-20491298',
};

export function getBarberPhone(barberId: string): string {
  return BARBER_PHONES[barberId] || SHOP_PHONE;
}

// Self-service reschedule/cancel is only allowed up to this many hours
// before the appointment — after that, the customer needs to call.
export const MANAGE_DEADLINE_HOURS = 3;

export function hoursUntil(dateStr: string, timeStr: string): number {
  const appointmentUTC = new Date(zonedTimeToUtcISO(dateStr, timeStr));
  return (appointmentUTC.getTime() - Date.now()) / 3_600_000;
}
