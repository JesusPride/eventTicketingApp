import React from 'react';
import { Ticket, ShieldCheck, QrCode, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useEventContext } from '../context/EventContext';

export const HeroBanner = ({ setActiveTab }) => {
  const { events, setSelectedEvent, setActiveModal } = useEventContext();
  const featuredEvent = events.find(e => e.featured) || events[0];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dark-800 via-slate-900 to-dark-900 border border-slate-800 shadow-2xl p-6 sm:p-10 mb-10">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -ml-20 -mb-20 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Hero Copy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            3MTT NextGen Capstone Project by Adewunmi Esther Opeyemi
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Discover & Book Local <span className="text-gradient">Nigerian Events</span> with Instant QR Tickets
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
            Streamline your event entry with automated ticket generation in Naira (₦), real-time gate scanner verification, and organizer revenue insights. Built specifically to eliminate duplicate ticket fraud across Nigeria.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg border-t border-slate-800/80">
            <div>
              <p className="text-xl sm:text-2xl font-black text-white">100%</p>
              <p className="text-xs text-slate-400 font-medium">Fraud-proof QR</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-brand-400">₦ NGN</p>
              <p className="text-xs text-slate-400 font-medium">Local Pricing</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-accent-400">&lt; 1s</p>
              <p className="text-xs text-slate-400 font-medium">Gate Verification</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                if (featuredEvent) {
                  setSelectedEvent(featuredEvent);
                  setActiveModal('eventDetails');
                }
              }}
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-lg shadow-brand-600/30 hover:scale-[1.02] transition-all"
            >
              <Ticket className="w-5 h-5" />
              Book Featured Event
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => setActiveTab('gate-scanner')}
              className="glass-card hover:bg-slate-800 text-slate-200 hover:text-white font-semibold px-6 py-3.5 rounded-2xl flex items-center gap-2 border border-slate-700/80 transition-all"
            >
              <QrCode className="w-5 h-5 text-accent-400" />
              Try Live Gate Scanner
            </button>
          </div>
        </div>

        {/* Right Column: Featured Event Highlight Card */}
        {featuredEvent && (
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden glass-card border border-slate-700/60 shadow-2xl group">
              <img
                src={featuredEvent.image}
                alt={featuredEvent.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-brand-600 text-white font-bold text-xs px-3 py-1 rounded-full uppercase shadow-md">
                  Featured Event
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-lg text-white group-hover:text-brand-400 transition-colors line-clamp-1">
                  {featuredEvent.title}
                </h3>
                <div className="flex items-center text-xs text-slate-400 gap-2">
                  <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
                  <span className="truncate">{featuredEvent.venue}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-xs text-slate-400">Starting from</span>
                  <span className="text-lg font-extrabold text-brand-400">
                    ₦{featuredEvent.tickets[0].price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
