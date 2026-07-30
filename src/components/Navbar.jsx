import React, { useState } from 'react';
import { Ticket, ScanLine, LayoutDashboard, Sparkles, Search, PlusCircle, RefreshCw, LogIn, LogOut } from 'lucide-react';
import { useEventContext } from '../context/EventContext';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { 
    tickets, 
    searchQuery, 
    setSearchQuery, 
    setActiveModal, 
    resetDemoData, 
    currentUser, 
    logoutUser,
    quickDemoLogin 
  } = useEventContext();

  const [showUserMenu, setShowUserMenu] = useState(false);

  const isOrganizer = currentUser?.role === 'organizer';

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-slate-800/80 bg-dark-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 p-0.5 shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
                <Ticket className="w-6 h-6 text-brand-500 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white">Event<span className="text-gradient">Pulse</span></span>
                <span className="bg-brand-500/10 text-brand-400 border border-brand-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  3MTT NG
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">Smart Ticketing & Gate Scanner</p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search events, tech, music, cities in Nigeria..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'explore') setActiveTab('explore');
                }}
                className="w-full pl-10 pr-4 py-2 bg-dark-800/80 border border-slate-700/60 rounded-full text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            
            {/* Explore Link */}
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'explore' 
                  ? 'bg-brand-500/10 text-brand-400 border border-brand-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Explore</span>
            </button>

            {/* My Tickets Link */}
            <button
              onClick={() => setActiveTab('my-tickets')}
              className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'my-tickets' 
                  ? 'bg-brand-500/10 text-brand-400 border border-brand-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span className="hidden sm:inline">My Tickets</span>
              {tickets.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs font-bold bg-brand-500 text-dark-900 rounded-full">
                  {tickets.length}
                </span>
              )}
            </button>

            {/* Organizer Links */}
            {isOrganizer && (
              <>
                <button
                  onClick={() => setActiveTab('gate-scanner')}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === 'gate-scanner' 
                      ? 'bg-accent-500/15 text-accent-400 border border-accent-500/40 shadow-lg shadow-accent-500/10' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <ScanLine className="w-4 h-4 text-accent-400 animate-pulse" />
                  <span className="hidden md:inline">Gate Scanner</span>
                </button>

                <button
                  onClick={() => setActiveTab('organizer')}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === 'organizer' 
                      ? 'bg-brand-500/10 text-brand-400 border border-brand-500/30' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden lg:inline">Host Hub</span>
                </button>

                <button
                  onClick={() => setActiveModal('createEvent')}
                  className="ml-1 sm:ml-2 bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 text-white font-semibold text-xs sm:text-sm px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-brand-600/20 hover:scale-[1.02] transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Post Event</span>
                </button>
              </>
            )}

            {/* User Profile & Auth Menu */}
            {currentUser ? (
              <div className="relative ml-2">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 bg-dark-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl transition-all"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-xl object-cover border border-brand-500/40"
                  />
                  <div className="hidden xl:block text-left pr-2">
                    <p className="text-xs font-bold text-white line-clamp-1">{currentUser.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-brand-400 uppercase font-mono">{currentUser.role}</p>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 glass-modal rounded-2xl border border-slate-700 shadow-2xl p-2 z-50 animate-fadeIn">
                    <div className="p-3 border-b border-slate-800">
                      <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <span className={`px-2 py-0.5 border text-[10px] font-bold rounded-full uppercase ${
                          isOrganizer 
                            ? 'bg-accent-500/20 border-accent-500/40 text-accent-300'
                            : 'bg-brand-500/20 border-brand-500/40 text-brand-300'
                        }`}>
                          {currentUser.role} Mode
                        </span>

                        <button
                          onClick={() => {
                            quickDemoLogin(isOrganizer ? 'attendee' : 'organizer');
                            setShowUserMenu(false);
                          }}
                          className="text-[10px] text-brand-400 hover:underline font-semibold"
                        >
                          Switch to {isOrganizer ? 'Attendee' : 'Host'} Mode
                        </button>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setActiveTab('my-tickets');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-xl flex items-center gap-2 font-medium"
                      >
                        <Ticket className="w-4 h-4 text-brand-400" /> My Digital Wallet
                      </button>

                      {isOrganizer && (
                        <button
                          onClick={() => {
                            setActiveTab('organizer');
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-xl flex items-center gap-2 font-medium"
                        >
                          <LayoutDashboard className="w-4 h-4 text-accent-400" /> Host Dashboard
                        </button>
                      )}
                    </div>

                    <div className="pt-1 border-t border-slate-800">
                      <button
                        onClick={() => {
                          logoutUser();
                          setShowUserMenu(false);
                          setActiveTab('auth');
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl flex items-center gap-2 font-bold"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('auth')}
                className={`ml-2 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                  activeTab === 'auth'
                    ? 'bg-brand-500 text-dark-900 shadow-md'
                    : 'bg-dark-800 hover:bg-slate-800 text-brand-400 border border-brand-500/40'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}

            <button
              onClick={resetDemoData}
              title="Reset Demo State"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
