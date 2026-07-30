import React, { useState } from 'react';
import { EventProvider, useEventContext } from './context/EventContext';
import { Navbar } from './components/Navbar';
import { ExplorePage } from './pages/ExplorePage';
import { MyTicketsPage } from './pages/MyTicketsPage';
import { GateCheckInPage } from './pages/GateCheckInPage';
import { OrganizerDashboard } from './pages/OrganizerDashboard';
import { AuthPage } from './pages/AuthPage';

import { EventModal } from './components/EventModal';
import { TicketBookingModal } from './components/TicketBookingModal';
import { TicketPassModal } from './components/TicketPassModal';
import { CreateEventModal } from './components/CreateEventModal';
import { Toast } from './components/Toast';
import { Ticket, Heart, ShieldCheck } from 'lucide-react';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const { activeModal } = useEventContext();

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-dark-900">
      
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'explore' && <ExplorePage setActiveTab={setActiveTab} />}
        {activeTab === 'my-tickets' && <MyTicketsPage setActiveTab={setActiveTab} />}
        {activeTab === 'gate-scanner' && <GateCheckInPage />}
        {activeTab === 'organizer' && <OrganizerDashboard setActiveTab={setActiveTab} />}
        {activeTab === 'auth' && <AuthPage setActiveTab={setActiveTab} />}
      </main>

      {/* Active Modals */}
      {activeModal === 'eventDetails' && <EventModal />}
      {activeModal === 'booking' && <TicketBookingModal />}
      {activeModal === 'ticketPass' && <TicketPassModal />}
      {activeModal === 'createEvent' && <CreateEventModal />}

      {/* Global Toast */}
      <Toast />

      {/* Footer Credentials */}
      <footer className="border-t border-slate-800/80 bg-dark-950 py-8 px-4 text-center text-xs text-slate-400 space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Ticket className="w-4 h-4 text-brand-500" />
          <span className="font-extrabold text-white text-sm">Event<span className="text-gradient">Pulse</span> Nigeria</span>
        </div>
        <p className="max-w-xl mx-auto text-slate-400 leading-relaxed">
          Submitted for the <strong className="text-white">3MTT NextGen Programme Graduation</strong> by <strong className="text-brand-400">Adewunmi Esther Opeyemi</strong>. Designed to solve local Nigerian event ticketing challenges with dynamic QR codes & instant gate verification.
        </p>
        <p className="text-[11px] text-slate-500 font-mono">
          Submission Deadline: 31 July 2026 • Build Version 1.0.0 (Vite + React + Tailwind CSS)
        </p>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <EventProvider>
      <AppContent />
    </EventProvider>
  );
}
