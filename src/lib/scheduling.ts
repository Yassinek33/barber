import { SHOP_INFO } from '../data/barbershopData';

export const WEEKDAY_HEADERS_NL = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
export const WEEKDAY_HEADERS_EN = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
export const WEEKEND_SERVICE_ID = 'weekend-thuis';

// The at-home weekend service isn't tied to the shop's own hours — the barber
// travels to the client, so it runs 09:00–18:00 on both Saturday and Sunday.
export const WEEKEND_SERVICE_OPEN_MIN = 9 * 60;
export const WEEKEND_SERVICE_CLOSE_MIN = 18 * 60;

export const toDateStr = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getNextWeekendDate = () => {
  const d = startOfToday();
  while (d.getDay() !== 0 && d.getDay() !== 6) {
    d.setDate(d.getDate() + 1);
  }
  return d;
};

export const formatDateLong = (dateStr: string, lang: 'nl' | 'en') => {
  const d = new Date(`${dateStr}T00:00:00`);
  const formatted = d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const parseSlotMinutes = (slot: string) => {
  const [h, m] = slot.split(':').map(Number);
  return h * 60 + m;
};

// Dutch day names indexed the same way as Date#getDay() (0 = Sunday) — this
// is the canonical business-logic source and stays Dutch regardless of the
// display language, since it must match SHOP_INFO.openingHours entries.
export const DAY_NAMES = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];

export const getOpeningEntry = (dateStr: string) => {
  const dayName = DAY_NAMES[new Date(`${dateStr}T00:00:00`).getDay()];
  return SHOP_INFO.openingHours.find(h => h.day === dayName);
};

// "12.00 tot 18.00" -> { openMin: 720, closeMin: 1080 }
export const parseOpeningRange = (hoursStr: string) => {
  const [openStr, closeStr] = hoursStr.split(' tot ');
  const toMinutes = (s: string) => {
    const [h, m] = s.split('.').map(Number);
    return h * 60 + (m || 0);
  };
  return { openMin: toMinutes(openStr), closeMin: toMinutes(closeStr) };
};

export const buildHalfHourSlots = (openMin: number, closeMin: number): string[] => {
  const slots: string[] = [];
  for (let t = openMin; t < closeMin; t += 30) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
  }
  return slots;
};

// Every half hour between opening and closing time for that specific day
export const generateDaySlots = (dateStr: string): string[] => {
  const entry = getOpeningEntry(dateStr);
  if (!entry || !entry.open) return [];
  const { openMin, closeMin } = parseOpeningRange(entry.hours);
  return buildHalfHourSlots(openMin, closeMin);
};

// Drops any slot that overlaps a busy range from the barber's real,
// connected Google Calendar — this is what makes something they book on
// their phone disappear from the site.
export const filterSlotsAgainstCalendar = (
  slots: string[],
  dateStr: string,
  durationMinutes: number,
  busyRanges: { start: string; end: string }[]
): string[] => {
  if (busyRanges.length === 0) return slots;
  return slots.filter(slot => {
    const slotStart = new Date(`${dateStr}T${slot}:00`);
    const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60000);
    return !busyRanges.some(b => slotStart < new Date(b.end) && new Date(b.start) < slotEnd);
  });
};

export const buildCalendarCells = (monthDate: Date): (Date | null)[] => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = (firstDay.getDay() + 6) % 7; // Monday-start week
  const cells: (Date | null)[] = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
};

export const isDayDisabled = (d: Date, isWeekendOnly: boolean): boolean => {
  const todayMidnight = startOfToday();
  if (d < todayMidnight) return true;
  if (isWeekendOnly) {
    const dow = d.getDay();
    return dow !== 0 && dow !== 6;
  }
  const entry = getOpeningEntry(toDateStr(d));
  return !entry || !entry.open;
};
