import React, { useState } from 'react';
import { CLIENT_REVIEWS, BARBERS, BARBER_SERVICES, BARBER_SERVICES_EN } from '../data/barbershopData';
import { CustomerReview } from '../types';
import { Star, CheckCircle, Plus, X } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLanguage } from '../i18n/LanguageContext';

export const ReviewsSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const services = lang === 'en' ? BARBER_SERVICES_EN : BARBER_SERVICES;
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(CLIENT_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [newService, setNewService] = useState(services[0].name);
  const [newBarber] = useState(BARBERS[0].name);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const created: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80`,
      rating: newRating,
      date: lang === 'en' ? 'Just now' : 'Zojuist',
      text: newText,
      serviceName: newService,
      barberName: newBarber,
      verified: true
    };

    setReviewsList([created, ...reviewsList]);
    setIsModalOpen(false);
    setNewAuthor('');
    setNewText('');
  };

  return (
    <section id="reviews" className="py-20 bg-[#0F0F14] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <Reveal className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{t.reviews.badge}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {t.reviews.title} <span className="gold-text-gradient">{t.reviews.titleHighlight}</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {t.reviews.subtitle}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 font-bold text-xs flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t.reviews.addReview}</span>
          </button>
        </Reveal>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((rev, idx) => (
            <Reveal key={rev.id} delayMs={(idx % 3) * 90}>
            <div
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between h-full hover:border-amber-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-3">
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-white text-sm">{rev.author}</h3>
                        {rev.verified && (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" title={t.reviews.verifiedCustomer} />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400">{rev.date}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Service Tag */}
              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span>{rev.serviceName}</span>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

      </div>

      {/* Leave Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-xl font-bold text-white mb-4">{t.reviews.modalTitle}</h3>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">{t.reviews.nameLabel}</label>
                <input
                  type="text"
                  required
                  placeholder={t.reviews.namePlaceholder}
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">{t.reviews.scoreLabel}</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewRating(s)}
                      className={`p-2 rounded-lg border text-sm font-bold flex items-center gap-1 ${
                        newRating >= s
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${newRating >= s ? 'fill-amber-400 text-amber-400' : ''}`} />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">{t.reviews.serviceLabel}</label>
                <select
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">{t.reviews.commentLabel}</label>
                <textarea
                  required
                  rows={3}
                  placeholder={t.reviews.commentPlaceholder}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full gold-button py-3 rounded-xl font-bold text-xs shadow-md mt-2"
              >
                {t.reviews.submit}
              </button>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
