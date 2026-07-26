import React from 'react';
import { SHOP_INFO } from '../data/barbershopData';
import { MapPin, Phone, Mail, Clock, Navigation, Car, ShieldCheck } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const todayName = new Date().toLocaleDateString('fr-FR', { weekday: 'long' });

  return (
    <section id="location" className="py-20 bg-[#0B0B0E] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>Adresse & Horaires d'Ouverture</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Au Cœur du Centre-Ville de <span className="gold-text-gradient">Groningen</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Retrouvez-nous facilement dans la rue commerçante d'Oosterstraat à quelques minutes du Grote Markt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info & Opening Hours Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Cards */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Adresse du Salon</h3>
                  <p className="text-xs text-slate-300 mt-0.5">{SHOP_INFO.address}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(SHOP_INFO.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline mt-2"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Ouvrir dans Google Maps</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Téléphone</h3>
                  <a href={`tel:${SHOP_INFO.phone}`} className="text-xs text-slate-300 hover:text-amber-400 transition-colors">
                    {SHOP_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Parking à proximité</h3>
                  <p className="text-xs text-slate-300">Q-Park Rademarkt & Damsterdiep (3 min à pied)</p>
                </div>
              </div>
            </div>

            {/* Opening Hours Table */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-white font-display font-bold text-base">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>Horaires d'Ouverture</span>
              </div>

              <div className="space-y-2 text-xs">
                {SHOP_INFO.openingHours.map((item, idx) => {
                  const isToday = item.day.toLowerCase() === todayName.toLowerCase();
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                        isToday
                          ? 'bg-amber-500/20 border border-amber-500/40 font-bold text-amber-300'
                          : 'text-slate-300 hover:bg-slate-800/50'
                      }`}
                    >
                      <span className="capitalize">{item.day} {isToday && '(Aujourd\'hui)'}</span>
                      <span>{item.hours}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Map Visual Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 h-96 sm:h-[480px] shadow-2xl flex flex-col">
              {/* Styled Dark Map Simulation */}
              <iframe
                title="Google Maps The Premium Barbershop Groningen"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2389.0438!2d6.5683!3d53.2185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDEzJzA2LjYiTiA2wrAzNCcwNS45IkU!5e0!3m2!1sfr!2snl!4v1620000000000!5m2!1sfr!2snl"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Footer Overlay */}
              <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Accès PMR & Climatisation Haute Performance</span>
                </span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(SHOP_INFO.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="gold-button px-3.5 py-1.5 rounded-lg text-xs font-bold"
                >
                  Calculer l'Itinéraire
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
