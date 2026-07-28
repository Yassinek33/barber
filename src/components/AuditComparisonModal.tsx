import React from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Smartphone, Sparkles, Calendar } from 'lucide-react';
import { AUDIT_BENCHMARKS } from '../data/barbershopData';

interface AuditComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const AuditComparisonModal: React.FC<AuditComparisonModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0F0F14] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white">Analyse & Vergelijking van de Barbier Website</h2>
              <p className="text-xs text-slate-400">Oude standaard site (thepremiumbarbershopgroningen.nl) vs Nieuw Gemoderniseerd Platform</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          
          {/* Key Metrics Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                <Zap className="w-4 h-4" />
                <span>Laadsnelheid</span>
              </div>
              <p className="text-2xl font-bold text-emerald-400">0.2s <span className="text-xs font-normal text-slate-400">(vs 3.8s)</span></p>
              <p className="text-[11px] text-slate-400">Reactieve Vite SPA architectuur</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                <Calendar className="w-4 h-4" />
                <span>Geïntegreerd Reserveren</span>
              </div>
              <p className="text-2xl font-bold text-amber-300">Direct in 4 Stappen</p>
              <p className="text-[11px] text-slate-400">Keuze barbier, tijdslot & bevestiging</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                <Smartphone className="w-4 h-4" />
                <span>Mobiele UX Score</span>
              </div>
              <p className="text-2xl font-bold text-white">100 / 100</p>
              <p className="text-[11px] text-slate-400">Precieze dark-luxury touch-ervaring</p>
            </div>
          </div>

          {/* Benchmark Table */}
          <div className="border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-amber-400/90 border-b border-slate-800">
                  <th className="p-3.5">Functie</th>
                  <th className="p-3.5 text-slate-400">Oude Barbier Site</th>
                  <th className="p-3.5 text-emerald-400">Nieuwe Ultra-Moderne Versie</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {AUDIT_BENCHMARKS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-3.5 font-bold text-white">{item.feature}</td>
                    <td className="p-3.5 text-slate-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500/70 shrink-0" />
                      <span>{item.oldSite}</span>
                    </td>
                    <td className="p-3.5 text-emerald-300 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item.newSite}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Special Features Highlights */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
            <h4 className="font-display font-bold text-amber-300 flex items-center gap-2 text-base">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Waarom deze nieuwe versie de klantconversie transformeert:</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
              <li><strong>Direct reserveringssysteem zonder de site te verlaten</strong>: Hiermee kiest u precies het type fade, de favoriete barbier en het exacte tijdslot.</li>
              <li><strong>Interactieve Voor/Na Module</strong>: Laat klanten het precisiewerk zien voordat ze een afspraak maken.</li>
              <li><strong>VIP Service aan Huis</strong>: Boek een knipbeurt of weekendafspraak gewoon bij u thuis, zonder de deur uit te hoeven.</li>
              <li><strong>'Mijn Afspraken' Beheeromgeving</strong>: Slaat reserveringen lokaal op met de mogelijkheid om in 1 klik te annuleren of te verzetten.</li>
            </ul>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 hidden sm:inline">The Premium Barbershop Groningen</span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Sluiten
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="gold-button px-5 py-2 rounded-lg text-xs font-bold shadow-md"
            >
              Test de Reservering
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
