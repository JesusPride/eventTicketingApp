import React, { useState } from 'react';
import { 
  DollarSign, 
  Ticket, 
  Users, 
  PlusCircle, 
  ScanLine, 
  Download, 
  TrendingUp, 
  Building2, 
  Calendar,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { formatNGN, formatDate } from '../utils/formatters';
import { useEventContext } from '../context/EventContext';

export const OrganizerDashboard = ({ setActiveTab }) => {
  const { events, tickets, checkIns, setActiveModal, showToast } = useEventContext();

  // Calculate Metrics
  const totalRevenue = tickets.reduce((sum, t) => sum + (t.ticketPrice || 0), 0);
  const totalTicketsSold = tickets.length;
  const verifiedCheckIns = checkIns.filter(c => c.status === 'VERIFIED').length;

  const handleExportCSV = () => {
    if (tickets.length === 0) {
      showToast('No ticket sales data to export yet.', 'warning');
      return;
    }

    const headers = 'Ticket ID,Event Title,Attendee Name,Attendee Email,Phone,Ticket Tier,Price (NGN),CheckIn Status\n';
    const rows = tickets.map(t => 
      `"${t.id}","${t.eventTitle}","${t.attendeeName}","${t.attendeeEmail}","${t.attendeePhone}","${t.ticketTypeName}","${t.ticketPrice}","${t.isUsed ? 'Checked In' : 'Active'}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `3MTT_Ticketing_Attendees_Report_${Date.now()}.csv`;
    a.click();
    showToast('Attendee roster report downloaded as CSV!', 'success');
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-dark-800 via-slate-900 to-dark-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase">
            <Building2 className="w-3.5 h-3.5" />
            Organizer Analytics Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Host Event Management & Revenue
          </h1>
          <p className="text-sm text-slate-300">
            Track ticket sales revenue in ₦ NGN, monitor live check-in rates, and export attendee rosters.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-dark-800 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm rounded-xl border border-slate-700 flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-brand-400" />
            Export Attendee CSV
          </button>

          <button
            onClick={() => setActiveModal('createEvent')}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-brand-600/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Post New Event
          </button>
        </div>
      </div>

      {/* Metrics Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Total Revenue */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Sales Revenue</span>
            <div className="p-2.5 bg-brand-500/10 text-brand-400 rounded-xl border border-brand-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-brand-400">
            {formatNGN(totalRevenue)}
          </p>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <span className="text-emerald-400 font-bold">+100%</span> verified digital transactions
          </p>
        </div>

        {/* Total Tickets Sold */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tickets Issued</span>
            <div className="p-2.5 bg-brand-500/10 text-brand-400 rounded-xl border border-brand-500/20">
              <Ticket className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">
            {totalTicketsSold}
          </p>
          <p className="text-xs text-slate-400">
            Issued across active events
          </p>
        </div>

        {/* Gate Check-ins */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified Gate Scans</span>
            <div className="p-2.5 bg-accent-500/15 text-accent-400 rounded-xl border border-accent-500/30">
              <ScanLine className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-accent-400">
            {verifiedCheckIns}
          </p>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            {totalTicketsSold > 0 ? Math.round((verifiedCheckIns / totalTicketsSold) * 100) : 0}% check-in turnout rate
          </p>
        </div>

      </div>

      {/* Hosted Events Overview Table */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="font-bold text-white text-base">Hosted Events Performance</h3>
          <span className="text-xs text-slate-400 font-semibold">{events.length} Events Published</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-dark-800/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Event Title</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Tickets Sold / Cap</th>
                <th className="py-3 px-4">Est. Revenue</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {events.map((evt) => {
                const sold = evt.tickets.reduce((acc, t) => acc + t.soldQuantity, 0);
                const totalCap = evt.tickets.reduce((acc, t) => acc + t.totalQuantity, 0);
                const revenue = evt.tickets.reduce((acc, t) => acc + (t.price * t.soldQuantity), 0);

                return (
                  <tr key={evt.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">
                      {evt.title}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-300">
                      {evt.city}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {formatDate(evt.date)}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-200">
                      {sold} / {totalCap}
                    </td>
                    <td className="py-3.5 px-4 font-black text-brand-400">
                      {formatNGN(revenue)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActiveTab('gate-scanner')}
                        className="px-3 py-1 bg-accent-500/10 hover:bg-accent-500/20 text-accent-400 font-bold rounded-lg border border-accent-500/30 transition-colors"
                      >
                        Gate Scanner
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendee Roster Table */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-white text-base">Recent Ticket Buyers Roster</h3>
            <p className="text-xs text-slate-400">Real-time purchaser log & QR status</p>
          </div>
          <button
            onClick={handleExportCSV}
            className="text-xs text-brand-400 hover:text-brand-300 font-bold flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" /> Download Full CSV
          </button>
        </div>

        {tickets.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No tickets purchased yet. Buy a ticket from the Explore tab to see real-time attendee data populating here!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-dark-800/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Ticket ID</th>
                  <th className="py-3 px-4">Attendee Name</th>
                  <th className="py-3 px-4">Event</th>
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Gate Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {tickets.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-brand-400">{t.id}</td>
                    <td className="py-3 px-4 font-semibold text-white">{t.attendeeName}</td>
                    <td className="py-3 px-4 text-slate-300 truncate max-w-[200px]">{t.eventTitle}</td>
                    <td className="py-3 px-4">{t.ticketTypeName}</td>
                    <td className="py-3 px-4 font-bold text-slate-200">{formatNGN(t.ticketPrice)}</td>
                    <td className="py-3 px-4">
                      {t.isUsed ? (
                        <span className="inline-flex items-center gap-1 font-bold text-amber-400">
                          <AlertTriangle className="w-3 h-3" /> Checked In
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-400">
                          <CheckCircle className="w-3 h-3" /> Active
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
