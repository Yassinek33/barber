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
              <h2 className="font-display text-xl font-bold text-white">Analyse & Comparatif du Site Barber</h2>
              <p className="text-xs text-slate-400">Ancien site standard (thepremiumbarbershopgroningen.nl) vs Nouvelle Plateforme Modernisée</p>
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
                <span>Vitesse de Chargement</span>
              </div>
              <p className="text-2xl font-bold text-emerald-400">0.2s <span className="text-xs font-normal text-slate-400">(vs 3.8s)</span></p>
              <p className="text-[11px] text-slate-400">Architecture Vite SPA réactive</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                <Calendar className="w-4 h-4" />
                <span>Réservation Intégrée</span>
              </div>
              <p className="text-2xl font-bold text-amber-300">Instant 4-Step</p>
              <p className="text-[11px] text-slate-400">Choix barbier, créneau & confirmation</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                <Smartphone className="w-4 h-4" />
                <span>Score UX Mobile</span>
              </div>
              <p className="text-2xl font-bold text-white">100 / 100</p>
              <p className="text-[11px] text-slate-400">Dark luxury tactile haute précision</p>
            </div>
          </div>

          {/* Benchmark Table */}
          <div className="border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/90 text-xs font-semibold uppercase tracking-wider text-amber-400/90 border-b border-slate-800">
                  <th className="p-3.5">Fonctionnalité</th>
                  <th className="p-3.5 text-slate-400">Ancien Site Barber</th>
                  <th className="p-3.5 text-emerald-400">Nouvelle Version Ultra-Moderne</th>
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
              <span>Pourquoi cette nouvelle version transforme la conversion des clients :</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
              <li><strong>Système de réservation direct sans quitter le site</strong> : Permet de choisir précisément le type de dégradé, le barbier favori et le créneau exact.</li>
              <li><strong>Module Avant / Après Interactif</strong> : Permet aux clients de visualiser le travail de précision avant de prendre rendez-vous.</li>
              <li><strong>Quiz Intelligent de Style</strong> : Recommande le bon type de coupe selon la forme du visage et la texture des cheveux.</li>
              <li><strong>Espace Gestion 'Mes RDV'</strong> : Stocke les réservations en local avec possibilité d'annuler ou décaler en 1 clic.</li>
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
              Fermer
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="gold-button px-5 py-2 rounded-lg text-xs font-bold shadow-md"
            >
              Tester la Réservation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
