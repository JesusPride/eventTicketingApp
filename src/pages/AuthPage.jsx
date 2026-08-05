import React, { useState } from 'react';
import { Mail, Lock, User, ShieldCheck, Sparkles, Building2, UserCheck, ArrowRight, Ticket, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useEventContext } from '../context/EventContext';

export const AuthPage = ({ setActiveTab: propSetActiveTab }) => {
  const { loginUser, signupUser, quickDemoLogin, completeAuthAndRedirect, returnTab, pendingBookingEvent } = useEventContext();
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [showAuthNotice, setShowAuthNotice] = useState(true);

  // Auto-dismiss auth notice banner after 5 seconds
  React.useEffect(() => {
    if (pendingBookingEvent) {
      setShowAuthNotice(true);
      const timer = setTimeout(() => {
        setShowAuthNotice(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [pendingBookingEvent]);

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup State
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'attendee', // 'attendee' or 'organizer'
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginUser(loginEmail, loginPassword);
    const role = loginEmail.includes('organizer') ? 'organizer' : 'attendee';
    completeAuthAndRedirect(role);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    signupUser(signupData.name, signupData.email, signupData.role);
    completeAuthAndRedirect(signupData.role);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 py-12 animate-fadeIn">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 glass-card rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl">
        
        {/* Left Side: Brand Showcase & Features */}
        <div className="lg:col-span-5 p-8 bg-gradient-to-br from-brand-900 via-dark-900 to-slate-900 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
                <Ticket className="w-6 h-6 text-dark-900 transform -rotate-12" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">Event<span className="text-gradient">Pulse</span></span>
            </div>

            <div className="space-y-3 pt-4">
              <h2 className="text-2xl font-black text-white leading-tight">
                Smart Event Ticketing & Gate Scanner Platform
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Designed for local events in Nigeria. Instant QR ticket generation in ₦ NGN, fraud-proof gate verification, and host revenue insights.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Instant QR ticket pass issuance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Webcam live gatekeeper scanner</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Host analytics & CSV attendee reports</span>
              </div>
            </div>
          </div>

          {/* Project Credentials Badge */}
          <div className="pt-8 relative z-10 border-t border-slate-800/80">
            <p className="text-[11px] text-slate-400">3MTT NextGen Graduation Project</p>
            <p className="text-xs font-bold text-brand-400">Adewunmi Esther Opeyemi</p>
          </div>
        </div>

        {/* Right Side: Auth Form & Demo Logins */}
        <div className="lg:col-span-7 p-6 sm:p-10 bg-dark-900/95 space-y-6">
          
          {/* Sign In Required Notice Banner */}
          {pendingBookingEvent && showAuthNotice && (
            <div className="p-4 bg-rose-500/15 border border-rose-500/40 rounded-2xl flex items-start gap-3 animate-fadeIn text-rose-200 text-xs font-semibold">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white text-sm">Sign In Required</p>
                <p className="text-slate-300 mt-0.5">
                  You must sign in before you can generate your event ticket. You will be automatically brought back to complete your ticket pass after signing in!
                </p>
              </div>
            </div>
          )}

          {/* Top Switch Mode Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white">
                {mode === 'login' ? 'Welcome Back!' : 'Join EventPulse'}
              </h3>
              <p className="text-xs text-slate-400">
                {mode === 'login' ? 'Sign in to access your digital tickets & events' : 'Create an account to discover or host local events'}
              </p>
            </div>

            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-xs font-bold text-brand-400 hover:text-brand-300 underline"
            >
              {mode === 'login' ? 'Need an account?' : 'Already registered?'}
            </button>
          </div>

          {/* Quick Demo Sign In Box */}
          <div className="p-4 bg-dark-800/90 rounded-2xl border border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                1-Click Quick Demo Sign In
              </span>
              <span className="text-[10px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded font-mono">3MTT Demo</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  quickDemoLogin('attendee');
                  completeAuthAndRedirect('attendee');
                }}
                className="p-3 bg-brand-600/20 hover:bg-brand-600/30 text-brand-300 border border-brand-500/40 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <UserCheck className="w-4 h-4" />
                <span>Attendee Mode</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  quickDemoLogin('organizer');
                  completeAuthAndRedirect('organizer');
                }}
                className="p-3 bg-accent-500/20 hover:bg-accent-500/30 text-accent-300 border border-accent-500/40 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Building2 className="w-4 h-4" />
                <span>Event Host Mode</span>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-3 text-slate-500 text-xs font-medium uppercase">Or Sign In With Email</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Form */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="esther.3mtt@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20 transition-all"
              >
                Sign In to Account
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adewunmi Esther Opeyemi"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="user@example.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Select Account Type</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSignupData({ ...signupData, role: 'attendee' })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      signupData.role === 'attendee'
                        ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                        : 'bg-dark-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    👤 Event Attendee
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignupData({ ...signupData, role: 'organizer' })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      signupData.role === 'organizer'
                        ? 'bg-accent-500/20 border-accent-500 text-accent-300'
                        : 'bg-dark-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    🏢 Event Host
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20 transition-all"
              >
                Complete Registration
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
