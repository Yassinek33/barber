import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Calendar, CheckCircle2, XCircle, Loader2, Scissors } from 'lucide-react';

type Status = 'loading' | 'invalid' | 'ready';

export const BarberConnectPage: React.FC = () => {
  const { barberId } = useParams<{ barberId: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const justConnected = searchParams.get('connected');

  const [status, setStatus] = useState<Status>('loading');
  const [name, setName] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!barberId || !token) {
      setStatus('invalid');
      return;
    }
    fetch(`/api/barber-status?barberId=${encodeURIComponent(barberId)}&token=${encodeURIComponent(token)}`)
      .then(res => {
        if (!res.ok) throw new Error('invalid');
        return res.json();
      })
      .then(data => {
        setName(data.name);
        setConnected(data.connected);
        setStatus('ready');
      })
      .catch(() => setStatus('invalid'));
  }, [barberId, token]);

  const connectUrl = `/api/google-oauth-start?barberId=${encodeURIComponent(barberId || '')}&token=${encodeURIComponent(token)}`;

  return (
    <div className="min-h-screen bg-[#0B0B0E] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#111111] border border-amber-500/30 rounded-2xl p-8 shadow-2xl text-center space-y-6">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
          <Calendar className="w-6 h-6" />
        </div>

        {status === 'loading' && (
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm py-6">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Laden...</span>
          </div>
        )}

        {status === 'invalid' && (
          <div className="space-y-2">
            <XCircle className="w-8 h-8 text-rose-400 mx-auto" />
            <h1 className="font-display text-lg font-bold text-white">Ongeldige link</h1>
            <p className="text-xs text-slate-400">
              Deze link is niet geldig of verlopen. Vraag de shopeigenaar om een nieuwe link.
            </p>
          </div>
        )}

        {status === 'ready' && (
          <div className="space-y-5">
            <div>
              <h1 className="font-display text-xl font-bold text-white">Hallo {name}</h1>
              <p className="text-xs text-slate-400 mt-1">
                Koppel je Google Agenda om afspraken van de site automatisch in jouw agenda te krijgen.
              </p>
            </div>

            {justConnected === '1' && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 justify-center">
                <CheckCircle2 className="w-4 h-4" />
                <span>Agenda succesvol gekoppeld!</span>
              </div>
            )}
            {justConnected === '0' && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 justify-center">
                <XCircle className="w-4 h-4" />
                <span>Koppelen is niet gelukt. Probeer het opnieuw.</span>
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3 text-left">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${connected ? 'bg-emerald-400' : 'bg-slate-600'}`} />
              <span className="text-xs text-slate-300">
                {connected ? 'Je Google Agenda is gekoppeld.' : 'Nog geen agenda gekoppeld.'}
              </span>
            </div>

            <a
              href={connectUrl}
              className="gold-button w-full px-6 py-3.5 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all"
            >
              <Scissors className="w-4 h-4" />
              <span>{connected ? 'Agenda opnieuw koppelen' : 'Koppel mijn Google Agenda'}</span>
            </a>

            <p className="text-[10px] text-slate-500 leading-relaxed">
              Zodra gekoppeld: nieuwe reserveringen van de site verschijnen automatisch in je Google Agenda
              (zichtbaar op je iPhone via de Google Agenda-app of je Agenda-app als je Google als account
              toevoegt). Blokkeer je zelf tijd in je agenda, dan verdwijnt dat tijdstip meteen van de site.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
