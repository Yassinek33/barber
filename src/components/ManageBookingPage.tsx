import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Calendar, CheckCircle2, XCircle, Loader2, Scissors, ChevronLeft, ChevronRight, Clock, User, Ban } from 'lucide-react';
import {
  WEEKDAY_HEADERS_NL, WEEKEND_SERVICE_ID, WEEKEND_SERVICE_OPEN_MIN, WEEKEND_SERVICE_CLOSE_MIN,
  toDateStr, startOfToday, formatDateLong, parseSlotMinutes,
  buildHalfHourSlots, generateDaySlots, filterSlotsAgainstCalendar,
  buildCalendarCells, isDayDisabled,
} from '../lib/scheduling';

type PageStatus = 'loading' | 'invalid' | 'ready';
type Mode = 'view' | 'wijzigen' | 'annuleren';

interface BookingDetails {
  id: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  durationMinutes: number | null;
  customerName: string;
  extras: { name: string; price: number }[];
  totalPrice: number;
  status: string;
  canManage: boolean;
}

export const ManageBookingPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const initialAction = searchParams.get('action');

  const [status, setStatus] = useState<PageStatus>('loading');
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [mode, setMode] = useState<Mode>('view');
  const [actionError, setActionError] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  // Reschedule sub-state
  const [calendarMonth, setCalendarMonth] = useState(() => startOfToday());
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [busyRanges, setBusyRanges] = useState<{ start: string; end: string }[]>([]);

  useEffect(() => {
    if (!bookingId || !token) {
      setStatus('invalid');
      return;
    }
    fetch(`/api/get-booking?id=${encodeURIComponent(bookingId)}&token=${encodeURIComponent(token)}`)
      .then(res => {
        if (!res.ok) throw new Error('not_found');
        return res.json();
      })
      .then((data: BookingDetails) => {
        setBooking(data);
        setSelectedDate(data.date);
        setCalendarMonth(new Date(`${data.date}T00:00:00`));
        if (data.canManage && (initialAction === 'wijzigen' || initialAction === 'annuleren')) {
          setMode(initialAction);
        }
        setStatus('ready');
      })
      .catch(() => setStatus('invalid'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId, token]);

  useEffect(() => {
    if (mode !== 'wijzigen' || !booking) return;
    let cancelled = false;
    fetch(`/api/availability?barberId=${encodeURIComponent(booking.barberId)}&date=${encodeURIComponent(selectedDate)}`)
      .then(res => (res.ok ? res.json() : { busy: [] }))
      .then(data => { if (!cancelled) setBusyRanges(data.busy || []); })
      .catch(() => { if (!cancelled) setBusyRanges([]); });
    return () => { cancelled = true; };
  }, [mode, booking, selectedDate]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0B0B0E] flex items-center justify-center p-6">
        <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Laden...</span>
        </div>
      </div>
    );
  }

  if (status === 'invalid' || !booking) {
    return (
      <div className="min-h-screen bg-[#0B0B0E] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#111111] border border-amber-500/30 rounded-2xl p-8 shadow-2xl text-center space-y-2">
          <XCircle className="w-8 h-8 text-rose-400 mx-auto" />
          <h1 className="font-display text-lg font-bold text-white">Afspraak niet gevonden</h1>
          <p className="text-xs text-slate-400">
            Deze link is niet geldig, verlopen, of de afspraak is al geannuleerd.
          </p>
        </div>
      </div>
    );
  }

  const isWeekendOnly = booking.serviceId === WEEKEND_SERVICE_ID;
  const calendarCells = buildCalendarCells(calendarMonth);
  const todayStr = toDateStr(startOfToday());

  const rawDaySlots = isWeekendOnly
    ? buildHalfHourSlots(WEEKEND_SERVICE_OPEN_MIN, WEEKEND_SERVICE_CLOSE_MIN)
    : generateDaySlots(selectedDate);
  const daySlots = filterSlotsAgainstCalendar(rawDaySlots, selectedDate, booking.durationMinutes || 60, busyRanges);
  const now = new Date();
  const isSelectedDateToday = selectedDate === toDateStr(now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const availableSlots = isSelectedDateToday ? daySlots.filter(s => parseSlotMinutes(s) > nowMinutes) : daySlots;

  const canGoPrevMonth = () => {
    const prev = new Date(calendarMonth);
    prev.setMonth(prev.getMonth() - 1);
    const todayMidnight = startOfToday();
    const currentMonthStart = new Date(todayMidnight.getFullYear(), todayMidnight.getMonth(), 1);
    return prev >= currentMonthStart;
  };
  const goPrevMonth = () => {
    if (!canGoPrevMonth()) return;
    const prev = new Date(calendarMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCalendarMonth(prev);
  };
  const goNextMonth = () => {
    const next = new Date(calendarMonth);
    next.setMonth(next.getMonth() + 1);
    setCalendarMonth(next);
  };
  const monthLabel = calendarMonth.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' });

  const confirmReschedule = async () => {
    if (!selectedSlot) return;
    setIsBusy(true);
    setActionError('');
    try {
      const res = await fetch('/api/reschedule-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: booking.id, token, newDate: selectedDate, newTimeSlot: selectedSlot }),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(
          data.error === 'slot_no_longer_available'
            ? 'Dit tijdstip is net bezet geraakt. Kies een ander tijdstip.'
            : 'Wijzigen is niet gelukt. Probeer het opnieuw.'
        );
        setIsBusy(false);
        return;
      }
      setBooking({ ...booking, date: data.date, timeSlot: data.timeSlot });
      setResultMessage('Je afspraak is succesvol gewijzigd!');
      setMode('view');
    } catch {
      setActionError('Er ging iets mis. Controleer je internetverbinding en probeer opnieuw.');
    }
    setIsBusy(false);
  };

  const confirmCancel = async () => {
    setIsBusy(true);
    setActionError('');
    try {
      const res = await fetch('/api/cancel-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: booking.id, manageToken: token }),
      });
      if (!res.ok) {
        setActionError('Annuleren is niet gelukt. Probeer het opnieuw.');
        setIsBusy(false);
        return;
      }
      setBooking({ ...booking, status: 'geannuleerd', canManage: false });
      setResultMessage('Je afspraak is geannuleerd.');
      setMode('view');
    } catch {
      setActionError('Er ging iets mis. Controleer je internetverbinding en probeer opnieuw.');
    }
    setIsBusy(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0E] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-[#111111] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden">

        <div className="p-6 text-center border-b border-amber-500/15">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 mb-3">
            <Calendar className="w-6 h-6" />
          </div>
          <h1 className="font-display text-lg font-bold text-white">Mijn afspraak</h1>
          <p className="text-xs text-slate-400 mt-1">#{booking.id}</p>
        </div>

        <div className="p-6 space-y-5">
          {resultMessage && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{resultMessage}</span>
            </div>
          )}

          {/* Summary card */}
          <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">{booking.serviceName}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                  booking.status === 'bevestigd'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : booking.status === 'geannuleerd'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : 'bg-slate-700/30 text-slate-400 border-slate-700'
                }`}
              >
                {booking.status === 'bevestigd' ? 'Bevestigd' : booking.status === 'geannuleerd' ? 'Geannuleerd' : booking.status}
              </span>
            </div>
            <p className="text-xs text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{formatDateLong(booking.date, 'nl')}</span>
            </p>
            <p className="text-xs text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{booking.timeSlot}{booking.durationMinutes ? ` (${booking.durationMinutes} min)` : ''}</span>
            </p>
            <p className="text-xs text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Barbier: {booking.barberName}</span>
            </p>
            {booking.extras.length > 0 && (
              <p className="text-[11px] text-slate-400">
                Extra's: {booking.extras.map(e => e.name).join(', ')}
              </p>
            )}
            <div className="pt-2 mt-1 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Totaal</span>
              <span className="font-extrabold text-amber-400 text-base">€{booking.totalPrice}</span>
            </div>
          </div>

          {actionError && (
            <p className="text-xs text-rose-400 font-medium bg-rose-500/10 border border-rose-500/30 rounded-xl px-3.5 py-2.5">{actionError}</p>
          )}

          {/* View mode: action buttons */}
          {mode === 'view' && booking.canManage && (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setMode('wijzigen'); setResultMessage(''); setSelectedSlot(''); }}
                className="gold-button w-full px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all"
              >
                <Scissors className="w-4 h-4" />
                <span>Afspraak wijzigen</span>
              </button>
              <button
                onClick={() => { setMode('annuleren'); setResultMessage(''); }}
                className="w-full px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 bg-transparent border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 transition-all"
              >
                <Ban className="w-4 h-4" />
                <span>Afspraak annuleren</span>
              </button>
            </div>
          )}

          {mode === 'view' && !booking.canManage && !resultMessage && (
            <p className="text-xs text-slate-500 text-center">
              {booking.status === 'geannuleerd'
                ? 'Deze afspraak is geannuleerd.'
                : 'Deze afspraak kan niet meer online gewijzigd worden.'}
            </p>
          )}

          {/* Reschedule mode */}
          {mode === 'wijzigen' && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-white text-sm">Kies een nieuwe datum en tijd</h2>

              <div className="max-w-xs mx-auto rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="flex items-center justify-between mb-2.5">
                  <button
                    type="button"
                    onClick={goPrevMonth}
                    disabled={!canGoPrevMonth()}
                    className="p-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-xs font-bold text-white capitalize">{monthLabel}</p>
                  <button
                    type="button"
                    onClick={goNextMonth}
                    className="p-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-0.5 mb-1">
                  {WEEKDAY_HEADERS_NL.map((wd) => (
                    <div key={wd} className="text-center text-[9px] font-bold text-slate-500 uppercase py-0.5">
                      {wd}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-0.5">
                  {calendarCells.map((cell, idx) => {
                    if (!cell) return <div key={`blank-${idx}`} />;
                    const dateStr = toDateStr(cell);
                    const disabled = isDayDisabled(cell, isWeekendOnly);
                    const isSelected = dateStr === selectedDate;
                    const isToday = dateStr === todayStr;
                    return (
                      <button
                        key={dateStr}
                        type="button"
                        disabled={disabled}
                        onClick={() => { setSelectedDate(dateStr); setSelectedSlot(''); }}
                        className={`aspect-square rounded-md text-[11px] font-semibold flex items-center justify-center transition-all ${
                          disabled
                            ? 'text-slate-700 cursor-not-allowed'
                            : isSelected
                              ? 'bg-amber-500 text-black shadow-md'
                              : isToday
                                ? 'border border-amber-500/50 text-amber-300 hover:bg-slate-800'
                                : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {cell.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {availableSlots.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                      selectedSlot === slot
                        ? 'bg-amber-500 text-black border-amber-500'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-amber-500/50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {availableSlots.length === 0 && (
                <p className="text-xs text-rose-400 font-medium text-center">Geen beschikbare tijden op deze dag.</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setMode('view')}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Terug
                </button>
                <button
                  onClick={confirmReschedule}
                  disabled={!selectedSlot || isBusy}
                  className="gold-button flex-1 px-4 py-2.5 rounded-xl font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isBusy ? 'Bezig...' : 'Bevestig nieuwe tijd'}
                </button>
              </div>
            </div>
          )}

          {/* Cancel confirm mode */}
          {mode === 'annuleren' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-center space-y-2">
                <Ban className="w-6 h-6 text-rose-400 mx-auto" />
                <p className="text-sm text-white font-semibold">Weet je het zeker?</p>
                <p className="text-xs text-slate-400">
                  Deze actie kan niet ongedaan gemaakt worden. Je afspraak op {formatDateLong(booking.date, 'nl')} om {booking.timeSlot} wordt geannuleerd.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setMode('view')}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Terug
                </button>
                <button
                  onClick={confirmCancel}
                  disabled={isBusy}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs disabled:opacity-40"
                >
                  {isBusy ? 'Bezig...' : 'Ja, annuleren'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
