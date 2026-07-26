import React, { useState } from 'react';
import { CLIENT_REVIEWS, BARBERS, BARBER_SERVICES } from '../data/barbershopData';
import { CustomerReview } from '../types';
import { Star, MessageSquare, CheckCircle, Plus, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(CLIENT_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [newService, setNewService] = useState(BARBER_SERVICES[0].name);
  const [newBarber, setNewBarber] = useState(BARBERS[0].name);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const created: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80`,
      rating: newRating,
      date: "À l'instant",
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Avis Vrais Clients Groningen</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Ce que disent nos <span className="gold-text-gradient">Gentlemen</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Note moyenne de 4.9/5★ basée sur plus de 488 avis vérifiés.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 font-bold text-xs flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Laisser un Avis</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between"
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
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" title="Client Vérifié" />
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
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>{rev.serviceName}</span>
                <span className="text-amber-400 font-medium">avec {rev.barberName}</span>
              </div>
            </div>
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

            <h3 className="font-display text-xl font-bold text-white mb-4">Donner votre Avis Client</h3>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Votre Nom / Pseudo :</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Julien D."
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Note de satisfaction :</label>
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
                <label className="block text-slate-300 font-semibold mb-1">Service Effectué :</label>
                <select
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                >
                  {BARBER_SERVICES.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Votre Commentaire :</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Partagez votre expérience avec la coupe, l'ambiance et le barbier..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full gold-button py-3 rounded-xl font-bold text-xs shadow-md mt-2"
              >
                Publier mon Avis
              </button>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
