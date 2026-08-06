import React, { useState } from 'react';
import { 
  Ticket, 
  Sparkles, 
  MapPin, 
  Mail, 
  ArrowRight, 
  Heart, 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useEventContext } from '../context/EventContext';

export const Footer = ({ setActiveTab }) => {
  const { setSelectedCity, setSelectedCategory, setActiveModal, showToast, setPendingBookingEvent, setReturnTab } = useEventContext();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to EventPulse Nigerian Event Digest!', 'success');
    setEmailInput('');

    // Auto-dismiss the subscription success alert after 4 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  const handleCityClick = (cityName) => {
    setSelectedCity(cityName);
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-dark-950 text-slate-300 pt-16 pb-10 px-4 sm:px-6 lg:px-8 mt-16 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 right-0 -mr-24 -mb-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/4 -ml-24 -mt-24 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Top Newsletter Subscribe Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-dark-900 via-slate-900 to-dark-800 border border-slate-800/80 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Event Digest Nigeria
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">Never Miss Top Events in Nigeria</h3>
            <p className="text-xs sm:text-sm text-slate-400">Get weekly updates on tech fests, concerts, and conferences in Lagos, Abuja & Ibadan.</p>
          </div>

          {subscribed ? (
            <div className="px-6 py-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              You're subscribed! Check your inbox for event alerts.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex items-center w-full max-w-md gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-dark-950 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-brand-600/30 transition-all shrink-0"
              >
                Subscribe
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pt-4 border-b border-slate-800/80 pb-12">
          
          {/* Brand Column (col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 p-0.5 shadow-lg shadow-brand-500/20">
                <div className="w-full h-full bg-dark-900 rounded-[9px] flex items-center justify-center">
                  <Ticket className="w-5 h-5 text-brand-500" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">Event<span className="text-gradient">Pulse</span> Nigeria</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Nigeria's smart event ticketing & gate scanner platform. Built with local Naira (₦) payments, dynamic fraud-proof QR codes, and instant gate verification.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com/Jesuspride" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-dark-900 border border-slate-800 hover:border-brand-500/40 text-slate-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-dark-900 border border-slate-800 hover:border-brand-500/40 text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-dark-900 border border-slate-800 hover:border-brand-500/40 text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-dark-900 border border-slate-800 hover:border-brand-500/40 text-slate-400 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Attendee Navigation (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => { setActiveTab('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-400 transition-colors">
                  Explore Events
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('my-tickets'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-400 transition-colors">
                  My Digital Passes
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('gate-scanner'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-400 transition-colors">
                  Gate Scanner
                </button>
              </li>
              <li>
                <button onClick={() => { setPendingBookingEvent(null); setReturnTab('explore'); setActiveTab('auth'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-400 transition-colors">
                  Account Sign In
                </button>
              </li>
            </ul>
          </div>

          {/* Top Nigerian Cities (col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Event Cities</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {['Lagos', 'Abuja', 'Ibadan', 'Port Harcourt', 'Enugu'].map((city) => (
                <li key={city}>
                  <button 
                    onClick={() => handleCityClick(city)}
                    className="hover:text-brand-400 transition-colors flex items-center gap-1.5"
                  >
                    <MapPin className="w-3 h-3 text-brand-500" />
                    Events in {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Categories (col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Event Categories</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {['Tech & Innovation', 'Music & Concerts', 'Business & Summits', 'Education & Workshops', 'Food & Drink'].map((cat) => {
                const cleanCat = cat.split(' ')[0];
                return (
                  <li key={cat}>
                    <button 
                      onClick={() => handleCategoryClick(cleanCat)}
                      className="hover:text-brand-400 transition-colors"
                    >
                      {cat}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-2">
          <p>© 2026 EventPulse Nigeria. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Fraud-Proof QR Ticketing
            </span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
