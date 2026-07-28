import React, { useState } from 'react';
import { BARBER_SERVICES } from '../data/barbershopData';
import { ServiceCategory } from '../types';
import { Scissors, Crown, Flame, Sparkles, Clock, Check, User } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: 'Alle Diensten' },
    { id: 'haircut', label: 'Knipbeurten & Skin Fades' },
    { id: 'beard', label: 'Baardtrim & Scheren' },
    { id: 'combo', label: 'Signature VIP Pakketten' },
    { id: 'junior', label: 'Jonge Gentleman' },
  ];

  const filteredServices = activeCategory === 'all'
    ? BARBER_SERVICES
    : BARBER_SERVICES.filter(s => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown': return <Crown className="w-5 h-5 text-amber-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'User': return <User className="w-5 h-5 text-amber-400" />;
      default: return <Scissors className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-[#0B0B0E] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Scissors className="w-3.5 h-3.5" />
            <span>Menu & Behandelingen Hoogwaardig Kappen</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Tarieven & <span className="gold-text-gradient">Barbering</span> Behandelingen
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Elke behandeling omvat een persoonlijke diagnose, hoogwaardige verzorgingsproducten voor mannen en een gratis drankje.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`relative rounded-2xl p-6 bg-slate-900/80 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                service.popular
                  ? 'border-amber-500/50 shadow-xl gold-border-glow'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header Badge & Price */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                      {getIcon(service.icon)}
                    </div>
                    <div>
                      {service.badge && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-amber-500 text-black mb-1">
                          {service.badge}
                        </span>
                      )}
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                        {service.name}
                      </h3>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-2xl font-black text-amber-300">{service.price}€</span>
                  </div>
                </div>

                {/* Duration */}
                {service.durationMinutes && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Geschatte duur: {service.durationMinutes} min</span>
                  </div>
                )}

                {/* Description */}
                <p className="text-slate-300 text-xs leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectServiceToBook(service.id)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  service.popular
                    ? 'gold-button shadow-md'
                    : 'bg-slate-800 hover:bg-amber-500 hover:text-black text-slate-200 border border-slate-700'
                }`}
              >
                <Scissors className="w-4 h-4" />
                <span>Reserveer deze Dienst</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
