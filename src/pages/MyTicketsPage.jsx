import React, { useState } from 'react';
import { Ticket, QrCode, Calendar, MapPin, CheckCircle, AlertTriangle, ShoppingBag } from 'lucide-react';
import { formatDate, formatNGN } from '../utils/formatters';
import { useEventContext } from '../context/EventContext';

export const MyTicketsPage = ({ setActiveTab }) => {
  const { tickets, setSelectedTicketPass, setActiveModal } = useEventContext();
  const [filterTab, setFilterTab] = useState('active'); // 'active', 'used', 'all'

  const filteredTickets = tickets.filter(t => {
    if (filterTab === 'active') return !t.isUsed;
    if (filterTab === 'used') return t.isUsed;
    return true;
  });

  const handleOpenPass = (ticket) => {
    setSelectedTicketPass(ticket);
    setActiveModal('ticketPass');
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-dark-800 via-slate-900 to-dark-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase">
            <Ticket className="w-3.5 h-3.5" />
            Digital Ticket Wallet
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            My Purchased Event Passes
          </h1>
          <p className="text-sm text-slate-300">
            Access your QR gate passes, view venue details, or print tickets for local event check-ins.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('explore')}
          className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm px-5 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20 transition-all self-start md:self-auto shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          Explore More Events
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setFilterTab('active')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            filterTab === 'active'
              ? 'bg-brand-500 text-dark-900 shadow-md'
              : 'bg-dark-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          Active Gate Passes ({tickets.filter(t => !t.isUsed).length})
        </button>

        <button
          onClick={() => setFilterTab('used')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            filterTab === 'used'
              ? 'bg-brand-500 text-dark-900 shadow-md'
              : 'bg-dark-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          Used / Checked-In ({tickets.filter(t => t.isUsed).length})
        </button>

        <button
          onClick={() => setFilterTab('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            filterTab === 'all'
              ? 'bg-brand-500 text-dark-900 shadow-md'
              : 'bg-dark-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          All Tickets ({tickets.length})
        </button>
      </div>

      {/* Ticket List Cards Grid (3 in a row on desktop) */}
      {filteredTickets.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl border border-slate-800 text-center space-y-4 max-w-lg mx-auto">
          <Ticket className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Tickets Found</h3>
          <p className="text-xs text-slate-400">
            {filterTab === 'active'
              ? "You don't have any active upcoming event passes."
              : 'No tickets matched this wallet filter.'}
          </p>
          <button
            onClick={() => setActiveTab('explore')}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl transition-all"
          >
            Browse Nigerian Events
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between"
            >
              <div>
                {/* Event Image Banner */}
                <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                  <img
                    src={ticket.eventImage}
                    alt={ticket.eventTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-brand-600 text-white font-bold text-xs px-2.5 py-0.5 rounded-full uppercase">
                      {ticket.ticketTypeName}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="font-mono text-xs font-bold text-white bg-dark-900/90 border border-slate-700/80 px-2.5 py-0.5 rounded-full">
                      {ticket.id}
                    </span>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-base text-white line-clamp-1">
                    {ticket.eventTitle}
                  </h3>

                  <div className="space-y-1 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      <span>{formatDate(ticket.eventDate)} • {ticket.eventTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{ticket.eventVenue} ({ticket.eventCity})</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400">Attendee:</span>
                      <p className="font-bold text-white">{ticket.attendeeName}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400">Paid:</span>
                      <p className="font-extrabold text-brand-400">{formatNGN(ticket.ticketPrice)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 bg-dark-900 border-t border-slate-800 flex items-center justify-between gap-2">
                <div>
                  {ticket.isUsed ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400">
                      <AlertTriangle className="w-3 h-3" /> Checked In
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                      <CheckCircle className="w-3 h-3" /> Active Pass
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleOpenPass(ticket)}
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-md transition-all shrink-0"
                >
                  <QrCode className="w-4 h-4" />
                  View QR Pass
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};
