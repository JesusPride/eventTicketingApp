import React, { useState } from 'react';
import { X, Mail, Lock, User, ShieldCheck, Sparkles, Building2, UserCheck, ArrowRight } from 'lucide-react';
import { useEventContext } from '../context/EventContext';

export const AuthModal = () => {
  const { setActiveModal, loginUser, signupUser, quickDemoLogin } = useEventContext();
  const [tab, setTab] = useState('login'); // 'login' or 'signup'

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
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    signupUser(signupData.name, signupData.email, signupData.role);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md glass-modal rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-dark-900/90">
          <div>
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Account Portal</span>
            <h2 className="text-xl font-extrabold text-white">
              {tab === 'login' ? 'Sign In to EventPulse' : 'Create New Account'}
            </h2>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-dark-900">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
              tab === 'login'
                ? 'border-brand-500 text-brand-400 bg-brand-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
              tab === 'signup'
                ? 'border-brand-500 text-brand-400 bg-brand-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          
          {/* Quick Demo Logins Section */}
          <div className="p-4 bg-dark-800/90 rounded-2xl border border-slate-700 space-y-2.5">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              ⚡ 1-Click Quick Demo Sign In
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => quickDemoLogin('attendee')}
                className="p-2.5 bg-brand-600/20 hover:bg-brand-600/30 text-brand-300 border border-brand-500/40 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <UserCheck className="w-4 h-4" />
                Attendee Account
              </button>

              <button
                type="button"
                onClick={() => quickDemoLogin('organizer')}
                className="p-2.5 bg-accent-500/20 hover:bg-accent-500/30 text-accent-300 border border-accent-500/40 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Building2 className="w-4 h-4" />
                Event Host Account
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-3 text-slate-500 text-xs font-medium">OR USE EMAIL</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Form */}
          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Email Address</label>
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
                <label className="text-xs font-semibold text-slate-400 block mb-1">Password</label>
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
                className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20 transition-all"
              >
                Sign In to Account
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Full Name</label>
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
                <label className="text-xs font-semibold text-slate-400 block mb-1">Email Address</label>
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
                <label className="text-xs font-semibold text-slate-400 block mb-1">Account Role</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSignupData({ ...signupData, role: 'attendee' })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      signupData.role === 'attendee'
                        ? 'bg-brand-500/20 border-brand-500 text-brand-300'
                        : 'bg-dark-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    Event Attendee
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignupData({ ...signupData, role: 'organizer' })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      signupData.role === 'organizer'
                        ? 'bg-accent-500/20 border-accent-500 text-accent-300'
                        : 'bg-dark-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    Event Host / Organizer
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20 transition-all"
              >
                Create Account
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
