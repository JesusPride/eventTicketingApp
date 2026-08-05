import React, { useState, useEffect } from 'react';
import { EventProvider, useEventContext } from './context/EventContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ExplorePage } from './pages/ExplorePage';
import { MyTicketsPage } from './pages/MyTicketsPage';
import { GateCheckInPage } from './pages/GateCheckInPage';
import { OrganizerDashboard } from './pages/OrganizerDashboard';
import { AuthPage } from './pages/AuthPage';

import { EventModal } from './components/EventModal';
import { TicketBookingModal } from './components/TicketBookingModal';
import { TicketPassModal } from './components/TicketPassModal';
import { CreateEventModal } from './components/CreateEventModal';
import { SqliteConsoleModal } from './components/SqliteConsoleModal';
import { Toast } from './components/Toast';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const { activeModal, setActiveModal, theme } = useEventContext();

  // Developer Keyboard Shortcut (Cmd/Ctrl + Shift + S) to open SQLite console
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        setActiveModal(prev => (prev === 'sqliteConsole' ? null : 'sqliteConsole'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveModal]);

  return (
    <div className={`min-h-screen ${
      theme === 'light' ? 'light bg-slate-100 text-slate-900' : 'dark bg-dark-900 text-slate-100'
    } flex flex-col transition-colors duration-300 selection:bg-brand-500 selection:text-dark-900`}>
      
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
      {activeModal === 'sqliteConsole' && <SqliteConsoleModal />}

      {/* Global Toast */}
      <Toast />

      {/* Real Modern Web Footer Component */}
      <Footer setActiveTab={setActiveTab} />

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
