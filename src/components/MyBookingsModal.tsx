import React from 'react';
import { ConfirmedBooking } from '../types';
import { X, Calendar, Trash2, Scissors } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: ConfirmedBooking[];
  onCancelBooking: (id: string) => void;
  onOpenBooking: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onOpenBooking
}) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0F0F14] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">{t.myBookings.title}</h2>
              <p className="text-xs text-slate-400">{t.myBookings.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <Scissors className="w-8 h-8" />
              </div>
              <p className="text-slate-300 font-medium text-sm">{t.myBookings.emptyText}</p>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="gold-button px-5 py-2.5 rounded-xl font-bold text-xs"
              >
                {t.myBookings.emptyCta}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{b.service.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        #{b.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{b.date} {t.myBookings.at} {b.timeSlot}</span>
                      <span className="text-slate-500">•</span>
                      <span>{t.myBookings.barber} {b.barber.name}</span>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {t.myBookings.customer} {b.customerName} ({b.customerPhone})
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="font-extrabold text-amber-400 text-base">{b.totalPrice}€</span>
                    <button
                      onClick={() => onCancelBooking(b.id)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                      title={t.myBookings.cancelTitle}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">{t.myBookings.total}: {bookings.length}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            {t.myBookings.close}
          </button>
        </div>

      </div>
    </div>
  );
};
