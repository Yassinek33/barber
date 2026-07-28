import React from 'react';
import { Scissors, Award, Heart, ChevronRight, Users } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLanguage } from '../i18n/LanguageContext';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const { t } = useLanguage();

  return (
    <section id="over-ons" className="py-20 bg-[#0F0F14] relative border-t border-slate-900 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-glow w-[500px] h-[500px] bg-amber-500/10 -top-40 left-1/3" />
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <Reveal className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5" />
            <span>{t.about.badge}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t.about.title} <span className="gold-text-gradient">{t.about.titleHighlight}</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            {t.about.subtitle}
          </p>
        </Reveal>

        {/* Body copy */}
        <Reveal delayMs={100} className="space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
          <p>{t.about.paragraph1}</p>
          <p>{t.about.paragraph2}</p>
          <p>{t.about.paragraph3}</p>
          <p>{t.about.paragraph4}</p>
        </Reveal>

        {/* Values */}
        <Reveal delayMs={200} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-xs text-slate-300 font-medium">{t.about.value1}</span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Scissors className="w-4 h-4" />
            </div>
            <span className="text-xs text-slate-300 font-medium">{t.about.value2}</span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-xs text-slate-300 font-medium">{t.about.value3}</span>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delayMs={280} className="pt-10 text-center">
          <button
            onClick={onOpenBooking}
            className="gold-button px-6 py-3.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
          >
            <Scissors className="w-4 h-4" />
            <span>{t.about.cta}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </Reveal>

      </div>
    </section>
  );
};
