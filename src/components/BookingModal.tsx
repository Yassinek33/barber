import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BARBER_SERVICES, BARBER_SERVICES_EN, BARBERS, BARBERS_EN, BOOKING_EXTRAS, BOOKING_EXTRAS_EN } from '../data/barbershopData';
import { BarberService, Barber, ConfirmedBooking } from '../types';
import { X, Scissors, Calendar, User, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  WEEKDAY_HEADERS_NL, WEEKDAY_HEADERS_EN, WEEKEND_SERVICE_ID,
  WEEKEND_SERVICE_OPEN_MIN, WEEKEND_SERVICE_CLOSE_MIN,
  toDateStr, startOfToday, getNextWeekendDate, formatDateLong, parseSlotMinutes,
  buildHalfHourSlots, generateDaySlots, filterSlotsAgainstCalendar,
  buildCalendarCells, isDayDisabled,
} from '../lib/scheduling';
import { DEFAULT_COUNTRY, COUNTRY_OPTIONS, formatPhoneForSubmit } from '../lib/phone';
import type { CountryCode } from 'libphonenumber-js';

// Letters (incl. accented), spaces, hyphens and apostrophes only — rejects a
// name containing digits or other stray characters.
const NAME_REGEX = /^[\p{L}\p{M}][\p{L}\p{M}\s'’.-]*$/u;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedBarberId?: string;
  onBookingConfirmed: (booking: ConfirmedBooking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedBarberId,
  onBookingConfirmed
}) => {
  const { t, lang } = useLanguage();
  const services = lang === 'en' ? BARBER_SERVICES_EN : BARBER_SERVICES;
  const barbers = lang === 'en' ? BARBERS_EN : BARBERS;
  const extras = lang === 'en' ? BOOKING_EXTRAS_EN : BOOKING_EXTRAS;
  const weekdayHeaders = lang === 'en' ? WEEKDAY_HEADERS_EN : WEEKDAY_HEADERS_NL;

  const [step, setStep] = useState(1);

  // Form Selections
  const [selectedService, setSelectedService] = useState<BarberService>(
    services.find(s => s.id === preselectedServiceId) || services[0]
  );
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(
    barbers.find(b => b.id === preselectedBarberId) || null
  );

  // Date & time selection — a real month calendar, live-aware of the current time
  const [now, setNow] = useState(() => new Date());
  const todayStr = toDateStr(startOfToday());
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // Customer info
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [customerEmail, setCustomerEmail] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [nameTouched, setNameTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const isNameValid = NAME_REGEX.test(customerName.trim());
  const isPhoneValid = formatPhoneForSubmit(customerPhone, phoneCountry) !== null;

  // Confirmation result
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real busy ranges pulled from the selected barber's connected Google
  // Calendar for the selected day — empty when no barber is chosen yet, the
  // barber hasn't connected a calendar, or the backend isn't reachable (e.g.
  // running locally without Netlify Functions), so the site degrades
  // gracefully back to plain opening-hours availability.
  const [busyRanges, setBusyRanges] = useState<{ start: string; end: string }[]>([]);

  useEffect(() => {
    if (!selectedBarber) {
      setBusyRanges([]);
      return;
    }
    let cancelled = false;
    fetch(`/api/availability?barberId=${encodeURIComponent(selectedBarber.id)}&date=${encodeURIComponent(selectedDate)}`)
      .then(res => (res.ok ? res.json() : { busy: [] }))
      .then(data => { if (!cancelled) setBusyRanges(data.busy || []); })
      .catch(() => { if (!cancelled) setBusyRanges([]); });
    return () => { cancelled = true; };
  }, [selectedBarber, selectedDate]);

  // Keep "now" live so past time slots drop away automatically while the modal stays open
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (preselectedServiceId) {
      const match = services.find(s => s.id === preselectedServiceId);
      if (match) setSelectedService(match);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preselectedServiceId, lang]);

  useEffect(() => {
    if (preselectedBarberId) {
      const match = barbers.find(b => b.id === preselectedBarberId);
      if (match) setSelectedBarber(match);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preselectedBarberId, lang]);

  // The weekend home-visit service can only be booked on a Saturday or Sunday —
  // jump the calendar to the nearest upcoming weekend date when it's selected.
  useEffect(() => {
    if (selectedService.id !== WEEKEND_SERVICE_ID) return;
    const current = new Date(`${selectedDate}T00:00:00`);
    if (current.getDay() === 0 || current.getDay() === 6) return;
    const weekendDate = getNextWeekendDate();
    setSelectedDate(toDateStr(weekendDate));
    setCalendarMonth(new Date(weekendDate.getFullYear(), weekendDate.getMonth(), 1));
  }, [selectedService]);

  // Time Slots — generated every 30 minutes from the real opening hours of the selected day,
  // then narrowed further by whatever the barber's own connected Google Calendar reports as busy.
  const rawDaySlots = selectedService.id === WEEKEND_SERVICE_ID
    ? buildHalfHourSlots(WEEKEND_SERVICE_OPEN_MIN, WEEKEND_SERVICE_CLOSE_MIN)
    : generateDaySlots(selectedDate);
  const daySlots = filterSlotsAgainstCalendar(rawDaySlots, selectedDate, selectedService.durationMinutes || 60, busyRanges);

  const isSelectedDateToday = selectedDate === toDateStr(now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const filterPastSlots = (slots: string[]) =>
    isSelectedDateToday ? slots.filter(s => parseSlotMinutes(s) > nowMinutes) : slots;

  const morningSlots = filterPastSlots(daySlots.filter(s => parseSlotMinutes(s) < 12 * 60));
  const afternoonSlots = filterPastSlots(daySlots.filter(s => parseSlotMinutes(s) >= 12 * 60 && parseSlotMinutes(s) < 17 * 60));
  const eveningSlots = filterPastSlots(daySlots.filter(s => parseSlotMinutes(s) >= 17 * 60));
  const allAvailableSlots = [...morningSlots, ...afternoonSlots, ...eveningSlots];

  // If the currently selected slot fell out of the available list (date changed,
  // or time simply passed), snap to the first slot that is still valid.
  useEffect(() => {
    if (allAvailableSlots.length === 0) {
      if (selectedSlot !== '') setSelectedSlot('');
      return;
    }
    if (!allAvailableSlots.includes(selectedSlot)) {
      setSelectedSlot(allAvailableSlots[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, isSelectedDateToday, nowMinutes]);

  if (!isOpen) return null;

  const isWeekendOnly = selectedService.id === WEEKEND_SERVICE_ID;
  const todayMidnight = startOfToday();

  const canGoPrevMonth = () => {
    const prev = new Date(calendarMonth);
    prev.setMonth(prev.getMonth() - 1);
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

  const monthLabel = calendarMonth.toLocaleDateString(lang === 'en' ? 'en-GB' : 'nl-NL', { month: 'long', year: 'numeric' });
  const calendarCells = buildCalendarCells(calendarMonth);

  const toggleExtra = (extraId: string) => {
    if (selectedExtras.includes(extraId)) {
      setSelectedExtras(selectedExtras.filter(id => id !== extraId));
    } else {
      setSelectedExtras([...selectedExtras, extraId]);
    }
  };

  const calculateTotalPrice = () => {
    let total = selectedService.price;
    selectedExtras.forEach(extId => {
      const match = extras.find(e => e.id === extId);
      if (match) total += match.price;
    });
    return total;
  };

  const handleConfirmSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerEmail || !selectedSlot) return;

    setNameTouched(true);
    setPhoneTouched(true);

    if (!isNameValid) {
      setSubmitError(t.booking.invalidName);
      return;
    }
    const formattedPhone = formatPhoneForSubmit(customerPhone, phoneCountry);
    if (!formattedPhone) {
      setSubmitError(t.booking.invalidPhone);
      return;
    }

    // Pick barber if null
    const finalBarber = selectedBarber || barbers[0];

    const extrasData = selectedExtras.map(id => {
      const ex = extras.find(e => e.id === id);
      return { name: ex ? ex.name : id, price: ex ? ex.price : 0 };
    });

    const booking: ConfirmedBooking = {
      id: `PBG-${Math.floor(1000 + Math.random() * 9000)}`,
      service: selectedService,
      barber: finalBarber,
      date: selectedDate,
      timeSlot: selectedSlot,
      customerName: customerName.trim(),
      customerPhone: formattedPhone,
      customerEmail,
      extras: extrasData,
      totalPrice: calculateTotalPrice(),
      durationMinutes: selectedService.durationMinutes,
      createdAt: new Date().toLocaleDateString(lang === 'en' ? 'en-GB' : 'nl-NL'),
      status: 'bevestigd'
    };

    setSubmitError('');
    setIsSubmitting(true);

    // Best-effort sync to the barber's Google Calendar via the backend. If
    // the backend isn't deployed/reachable (e.g. local dev without Netlify
    // Functions running), this fails silently and the booking still goes
    // through locally exactly like before — only a real 409 "someone just
    // took this slot" response blocks confirmation.
    try {
      const res = await fetch('/api/create-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: booking.id,
          barberId: finalBarber.id,
          barberName: finalBarber.name,
          serviceId: selectedService.id,
          serviceName: selectedService.name,
          date: selectedDate,
          timeSlot: selectedSlot,
          durationMinutes: selectedService.durationMinutes,
          customerName: booking.customerName,
          customerPhone: booking.customerPhone,
          customerEmail,
          extras: extrasData,
          totalPrice: booking.totalPrice,
        }),
      });
      if (res.status === 409) {
        setIsSubmitting(false);
        setSubmitError(t.booking.slotTaken);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        if (data.manageToken) booking.manageToken = data.manageToken;
      }
    } catch {
      // Backend unreachable — proceed with the local-only booking flow.
    }

    setIsSubmitting(false);
    setConfirmedBooking(booking);
    onBookingConfirmed(booking);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    setStep(5); // Show confirmation receipt
  };

  const resetModal = () => {
    setStep(1);
    setConfirmedBooking(null);
    setSubmitError('');
    onClose();
  };

  const renderSlotGrid = (label: string, emoji: string, slots: string[], colsClass: string) => (
    <div>
      <p className="text-xs font-semibold text-slate-400 mb-2">{emoji} {label}</p>
      {slots.length > 0 ? (
        <div className={`grid ${colsClass} gap-2.5`}>
          {slots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedSlot(slot)}
              className={`py-3.5 rounded-xl text-base font-bold border transition-all ${
                selectedSlot === slot
                  ? 'bg-amber-500 text-black border-amber-500 shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-slate-600 italic">{t.booking.noSlotsLeft}</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#0F0F14] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">{t.booking.modalTitle}</h2>
              <p className="text-xs text-slate-400">{t.booking.modalSubtitle}</p>
            </div>
          </div>
          <button
            onClick={resetModal}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker (Steps 1 to 4) */}
        {step <= 4 && (
          <div className="px-6 py-3 bg-slate-950/80 border-b border-slate-800/60 flex items-center justify-between text-xs font-semibold">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-amber-400' : 'text-slate-600'}`}>
              <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px]">1</span>
              <span className="hidden sm:inline">{t.booking.stepService}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-700" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-amber-400' : 'text-slate-600'}`}>
              <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px]">2</span>
              <span className="hidden sm:inline">{t.booking.stepBarber}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-700" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-amber-400' : 'text-slate-600'}`}>
              <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px]">3</span>
              <span className="hidden sm:inline">{t.booking.stepDateTime}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-700" />
            <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-amber-400' : 'text-slate-600'}`}>
              <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px]">4</span>
              <span className="hidden sm:inline">{t.booking.stepConfirmation}</span>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">

          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-white text-base">{t.booking.step1Title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedService.id === srv.id
                        ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-white">{srv.name}</h4>
                      <span className="text-amber-400 font-extrabold text-base">{srv.price}€</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">{srv.description}</p>
                    {srv.durationMinutes && (
                      <div className="mt-2 text-[11px] text-amber-300/80 font-medium">⏱ {srv.durationMinutes} {t.booking.minutes}</div>
                    )}
                    {srv.id === WEEKEND_SERVICE_ID && (
                      <div className="mt-2 text-[11px] text-amber-300/80 font-medium">📅 {t.booking.weekendOnlyNote}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT BARBER */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-white text-base">{t.booking.step2Title}</h3>

              {/* Option: Any available */}
              <div
                onClick={() => setSelectedBarber(null)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${
                  selectedBarber === null
                    ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-amber-400">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{t.booking.anyBarberTitle}</h4>
                  <p className="text-xs text-slate-400">{t.booking.anyBarberDesc}</p>
                </div>
              </div>

              {/* Specific Barbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {barbers.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBarber(b)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all text-center space-y-2 ${
                      selectedBarber?.id === b.id
                        ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={b.avatarUrl}
                      alt={b.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-amber-500/30"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-white">{b.name}</h4>
                      <p className="text-[11px] text-amber-400 font-medium">{b.nickname}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{b.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: PICK DATE & TIME SLOT */}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="font-display font-bold text-white text-base">{t.booking.step3Title}</h3>

              {isWeekendOnly && (
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-medium">
                  {t.booking.weekendOnlyBanner}
                </div>
              )}

              {/* Month Calendar */}
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
                  {weekdayHeaders.map((wd) => (
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
                        onClick={() => setSelectedDate(dateStr)}
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

              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.booking.selected} <strong className="text-white">{formatDateLong(selectedDate, lang)}</strong></span>
              </p>

              {/* Time Slots Categorized — automatically excludes times already passed today */}
              <div className="space-y-4 pt-2">
                {renderSlotGrid(t.booking.morning, '🌅', morningSlots, 'grid-cols-3 sm:grid-cols-4')}
                {renderSlotGrid(t.booking.afternoon, '☀️', afternoonSlots, 'grid-cols-3 sm:grid-cols-4')}
                {renderSlotGrid(t.booking.evening, '🌙', eveningSlots, 'grid-cols-2 sm:grid-cols-3')}
              </div>

              {allAvailableSlots.length === 0 && (
                <p className="text-xs text-rose-400 font-medium">{t.booking.noSlotsForDay}</p>
              )}
            </div>
          )}

          {/* STEP 4: CUSTOMER DETAILS & EXTRAS */}
          {step === 4 && (
            <form id="booking-form" onSubmit={handleConfirmSubmit} className="space-y-5">
              <h3 className="font-display font-bold text-white text-base">{t.booking.step4Title}</h3>

              {submitError && (
                <p className="text-xs text-rose-400 font-medium bg-rose-500/10 border border-rose-500/30 rounded-xl px-3.5 py-2.5">{submitError}</p>
              )}

              {/* Summary Bar */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">{selectedService.name}</p>
                  <p className="text-slate-400">
                    {formatDateLong(selectedDate, lang)} {t.booking.at} {selectedSlot || '—'} • {t.booking.withBarber} {selectedBarber ? selectedBarber.name : t.booking.availableBarber}
                  </p>
                </div>
                <span className="text-amber-400 font-extrabold text-lg">{calculateTotalPrice()}€</span>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">{t.booking.fullNameLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder={t.booking.fullNamePlaceholder}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    onBlur={() => setNameTouched(true)}
                    className={`w-full px-3 py-2.5 rounded-xl bg-slate-950 border text-white focus:outline-none ${
                      nameTouched && customerName && !isNameValid
                        ? 'border-rose-500 focus:border-rose-400'
                        : 'border-slate-800 focus:border-amber-400'
                    }`}
                  />
                  {nameTouched && customerName && !isNameValid && (
                    <p className="text-[10px] text-rose-400 mt-1">{t.booking.invalidName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">{t.booking.phoneLabel}</label>
                  <div className="flex gap-1.5">
                    <select
                      value={phoneCountry}
                      onChange={(e) => setPhoneCountry(e.target.value as CountryCode)}
                      className="px-2 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400 shrink-0 max-w-[6.5rem]"
                    >
                      {COUNTRY_OPTIONS.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.dialCode}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      required
                      placeholder={t.booking.phonePlaceholder}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      onBlur={() => setPhoneTouched(true)}
                      className={`w-full min-w-0 px-3 py-2.5 rounded-xl bg-slate-950 border text-white focus:outline-none ${
                        phoneTouched && customerPhone && !isPhoneValid
                          ? 'border-rose-500 focus:border-rose-400'
                          : 'border-slate-800 focus:border-amber-400'
                      }`}
                    />
                  </div>
                  {phoneTouched && customerPhone && !isPhoneValid && (
                    <p className="text-[10px] text-rose-400 mt-1">{t.booking.invalidPhone}</p>
                  )}
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-slate-300 font-semibold mb-1">{t.booking.emailLabel}</label>
                <input
                  type="email"
                  required
                  placeholder={t.booking.emailPlaceholder}
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Optional Extras Checkboxes */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-slate-300">{t.booking.extrasLabel}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {extras.map((extra) => (
                    <div
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        selectedExtras.includes(extra.id)
                          ? 'bg-amber-500/20 border-amber-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span className="font-medium">{extra.name}</span>
                      <span className="font-bold text-amber-400">{extra.price > 0 ? `+${extra.price}€` : t.booking.free}</span>
                    </div>
                  ))}
                </div>
              </div>

            </form>
          )}

          {/* STEP 5: CONFIRMATION RECEIPT */}
          {step === 5 && confirmedBooking && (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-2xl font-bold text-white">{t.booking.confirmedTitle}</h3>
                <p className="text-xs text-amber-400 font-mono font-bold">{t.booking.referenceLabel} #{confirmedBooking.id}</p>
                <p className="text-xs text-slate-400">{t.booking.confirmationSent} {confirmedBooking.customerEmail}.</p>
              </div>

              {/* Receipt Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-950 border border-amber-500/30 text-left space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">{t.booking.receiptTreatment}</span>
                  <span className="font-bold text-white">{confirmedBooking.service.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">{t.booking.receiptBarber}</span>
                  <span className="font-bold text-amber-300">{confirmedBooking.barber.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">{t.booking.receiptDateTime}</span>
                  <span className="font-bold text-white">{formatDateLong(confirmedBooking.date, lang)} {t.booking.at} {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-sm">
                  <span className="text-slate-300">{t.booking.receiptTotal}</span>
                  <span className="text-amber-400">{confirmedBooking.totalPrice}€</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:${lang === 'en' ? 'Appointment' : 'Afspraak'} Barbershop Groningen%0ADESCRIPTION:${lang === 'en' ? 'Treatment' : 'Behandeling'} ${confirmedBooking.service.name}%0ALOCATION:Oosterstraat 42 Groningen%0AEND:VEVENT%0AEND:VCALENDAR`}
                  download="afspraak-barbershop.ics"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4 text-amber-400" />
                  <span>{t.booking.addToCalendar}</span>
                </a>

                <button
                  onClick={resetModal}
                  className="w-full sm:w-auto gold-button px-6 py-2.5 rounded-xl font-bold text-xs"
                >
                  {t.booking.done}
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer Navigation Buttons (Steps 1 to 4) */}
        {step <= 4 && (
          <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t.booking.back}</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={step === 3 && !selectedSlot}
                className="gold-button px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1 shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>{t.booking.continueBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="booking-form"
                disabled={isSubmitting}
                className="gold-button px-7 py-2.5 rounded-xl font-bold text-xs shadow-lg flex items-center gap-2 disabled:opacity-60 disabled:cursor-wait"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? t.booking.submitting : `${t.booking.confirmBooking} (${calculateTotalPrice()}€)`}</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
