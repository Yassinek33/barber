import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BARBER_SERVICES, BARBERS, BOOKING_EXTRAS } from '../data/barbershopData';
import { BarberService, Barber, ConfirmedBooking } from '../types';
import { X, Scissors, Calendar, Clock, User, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, CreditCard, Download, ExternalLink, Plus } from 'lucide-react';

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
  const [step, setStep] = useState(1);

  // Form Selections
  const [selectedService, setSelectedService] = useState<BarberService>(
    BARBER_SERVICES.find(s => s.id === preselectedServiceId) || BARBER_SERVICES[0]
  );
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(
    BARBERS.find(b => b.id === preselectedBarberId) || null
  );

  // Date selection (defaults to tomorrow if today is past hours)
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedSlot, setSelectedSlot] = useState<string>('11:00');

  // Customer info
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [customerNotes, setCustomerNotes] = useState('');

  // Confirmation result
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  useEffect(() => {
    if (preselectedServiceId) {
      const match = BARBER_SERVICES.find(s => s.id === preselectedServiceId);
      if (match) setSelectedService(match);
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedBarberId) {
      const match = BARBERS.find(b => b.id === preselectedBarberId);
      if (match) setSelectedBarber(match);
    }
  }, [preselectedBarberId]);

  if (!isOpen) return null;

  // Time Slots Generation
  const timeSlotsMorning = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
  const timeSlotsAfternoon = ['12:30', '13:15', '14:00', '14:45', '15:30', '16:15'];
  const timeSlotsEvening = ['17:00', '17:45', '18:30', '19:15'];

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
      const match = BOOKING_EXTRAS.find(e => e.id === extId);
      if (match) total += match.price;
    });
    return total;
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerEmail) return;

    // Pick barber if null
    const finalBarber = selectedBarber || BARBERS[0];

    const extrasData = selectedExtras.map(id => {
      const ex = BOOKING_EXTRAS.find(e => e.id === id);
      return { name: ex ? ex.name : id, price: ex ? ex.price : 0 };
    });

    const booking: ConfirmedBooking = {
      id: `PBG-${Math.floor(1000 + Math.random() * 9000)}`,
      service: selectedService,
      barber: finalBarber,
      date: selectedDate,
      timeSlot: selectedSlot,
      customerName,
      customerPhone,
      customerEmail,
      extras: extrasData,
      totalPrice: calculateTotalPrice(),
      durationMinutes: selectedService.durationMinutes,
      createdAt: new Date().toLocaleDateString('fr-FR'),
      status: 'confirmé'
    };

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
    onClose();
  };

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
              <h2 className="font-display text-lg font-bold text-white">Réservation de Créneau Barber</h2>
              <p className="text-xs text-slate-400">The Premium Barbershop Groningen • Instantané & Sans Attente</p>
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
              <span className="hidden sm:inline">Service</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-700" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-amber-400' : 'text-slate-600'}`}>
              <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px]">2</span>
              <span className="hidden sm:inline">Barbier</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-700" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-amber-400' : 'text-slate-600'}`}>
              <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px]">3</span>
              <span className="hidden sm:inline">Date & Horaire</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-700" />
            <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-amber-400' : 'text-slate-600'}`}>
              <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px]">4</span>
              <span className="hidden sm:inline">Confirmation</span>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-white text-base">Étape 1 : Choisissez votre Prestation</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BARBER_SERVICES.map((srv) => (
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
                    <div className="mt-2 text-[11px] text-amber-300/80 font-medium">⏱ {srv.durationMinutes} minutes</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT BARBER */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-white text-base">Étape 2 : Choisissez votre Barbier Favori</h3>
              
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
                  <h4 className="font-bold text-sm text-white">N'importe quel Barbier Disponible</h4>
                  <p className="text-xs text-slate-400">Attribution automatique selon la meilleure disponibilité</p>
                </div>
              </div>

              {/* Specific Barbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BARBERS.map((b) => (
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
              <h3 className="font-display font-bold text-white text-base">Étape 3 : Choisissez le Jour & l'Heure</h3>
              
              {/* Date Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">Date du rendez-vous :</label>
                <input
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Time Slots Categorized */}
              <div className="space-y-4 pt-2">
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-2">🌅 Matinée</p>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {timeSlotsMorning.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                          selectedSlot === slot
                            ? 'bg-amber-500 text-black border-amber-500 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-2">☀️ Après-midi</p>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {timeSlotsAfternoon.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                          selectedSlot === slot
                            ? 'bg-amber-500 text-black border-amber-500 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-2">🌙 Fin de journée / Nocturne</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlotsEvening.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                          selectedSlot === slot
                            ? 'bg-amber-500 text-black border-amber-500 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: CUSTOMER DETAILS & EXTRAS */}
          {step === 4 && (
            <form id="booking-form" onSubmit={handleConfirmSubmit} className="space-y-5">
              <h3 className="font-display font-bold text-white text-base">Étape 4 : Vos Coordonnées & Options VIP</h3>

              {/* Summary Bar */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">{selectedService.name}</p>
                  <p className="text-slate-400">
                    Le {selectedDate} à {selectedSlot} • Avec {selectedBarber ? selectedBarber.name : 'Barbier Disponible'}
                  </p>
                </div>
                <span className="text-amber-400 font-extrabold text-lg">{calculateTotalPrice()}€</span>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nom & Prénom * :</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Lucas Dupont"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Numéro de Téléphone * :</label>
                  <input
                    type="tel"
                    required
                    placeholder="ex: +31 6 1234 5678"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-slate-300 font-semibold mb-1">Adresse Email (pour confirmation) * :</label>
                <input
                  type="email"
                  required
                  placeholder="ex: lucas@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Optional Extras Checkboxes */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-slate-300">Options Complémentaires Offertes ou VIP :</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {BOOKING_EXTRAS.map((extra) => (
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
                      <span className="font-bold text-amber-400">{extra.price > 0 ? `+${extra.price}€` : 'Offert'}</span>
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
                <h3 className="font-display text-2xl font-bold text-white">Réservation Confirmée !</h3>
                <p className="text-xs text-amber-400 font-mono font-bold">Référence : #{confirmedBooking.id}</p>
                <p className="text-xs text-slate-400">Un SMS & Email de confirmation a été généré pour {confirmedBooking.customerEmail}.</p>
              </div>

              {/* Receipt Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-950 border border-amber-500/30 text-left space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Prestation :</span>
                  <span className="font-bold text-white">{confirmedBooking.service.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Barbier :</span>
                  <span className="font-bold text-amber-300">{confirmedBooking.barber.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Date & Heure :</span>
                  <span className="font-bold text-white">{confirmedBooking.date} à {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-sm">
                  <span className="text-slate-300">Total à régler au salon :</span>
                  <span className="text-amber-400">{confirmedBooking.totalPrice}€</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:RDV Barbershop Groningen%0ADESCRIPTION:Prestation ${confirmedBooking.service.name}%0ALOCATION:Oosterstraat 42 Groningen%0AEND:VEVENT%0AEND:VCALENDAR`}
                  download="rdv-barbershop.ics"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4 text-amber-400" />
                  <span>Ajouter à mon Calendrier</span>
                </a>

                <button
                  onClick={resetModal}
                  className="w-full sm:w-auto gold-button px-6 py-2.5 rounded-xl font-bold text-xs"
                >
                  Terminer
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
                <span>Retour</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="gold-button px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1 shadow-md"
              >
                <span>Continuer</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="booking-form"
                className="gold-button px-7 py-2.5 rounded-xl font-bold text-xs shadow-lg flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirmer ma Réservation ({calculateTotalPrice()}€)</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
