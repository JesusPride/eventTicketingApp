import React from 'react';
import { X, Calendar, Clock, MapPin, Building2, Ticket, CheckCircle2, Share2, ShieldCheck } from 'lucide-react';
import { formatNGN, formatDate, getCategoryBadgeStyle } from '../utils/formatters';
import { useEventContext } from '../context/EventContext';

export const EventModal = () => {
  const { selectedEvent, setActiveModal, setSelectedEvent, showToast } = useEventContext();

  if (!selectedEvent) return null;

  // const handleShare = () => {
  //   navigator.clipboard.writeText(window.location.href);
  //   showToast('Event link copied to clipboard!', 'info');
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-modal rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl max-h-[90vh] flex flex-col">

        {/* Header Image */}
        <div className="relative h-64 sm:h-72 w-full shrink-0">
          <img
            src={selectedEvent.image}
            alt={selectedEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />

          {/* Close & Share Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {/* <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-dark-900/80 hover:bg-dark-900 text-slate-300 hover:text-white backdrop-blur-md border border-slate-700/60 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button> */}
            <button
              onClick={() => setActiveModal(null)}
              className="p-2.5 rounded-full bg-dark-900/80 hover:bg-dark-900 text-slate-300 hover:text-white backdrop-blur-md border border-slate-700/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <span className={`border text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getCategoryBadgeStyle(selectedEvent.category)}`}>
              {selectedEvent.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 leading-tight">
              {selectedEvent.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-200">

          {/* Quick Date, Time & Location Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-dark-800/80 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-brand-500/10 rounded-xl text-brand-400 border border-brand-500/20">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Date & Time</p>
                <p className="text-sm font-semibold text-white">{formatDate(selectedEvent.date)}</p>
                <p className="text-xs text-slate-400">{selectedEvent.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-brand-500/10 rounded-xl text-brand-400 border border-brand-500/20">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Venue Location</p>
                <p className="text-sm font-semibold text-white">{selectedEvent.venue}</p>
                <p className="text-xs text-brand-400 font-medium">{selectedEvent.city}, Nigeria</p>
              </div>
            </div>
          </div>

          {/* Organizer Info */}
          <div className="flex items-center gap-3 p-3.5 bg-dark-800/40 rounded-xl border border-slate-800/60">
            <Building2 className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">Organized by</p>
              <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                {selectedEvent.organizer}
                <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
              </p>
            </div>
          </div>

          {/* About Event */}
          <div className="space-y-2">
            <h3 className="font-bold text-white text-base">About This Event</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedEvent.description}
            </p>
          </div>

          {/* Ticket Options Grid */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Ticket className="w-4 h-4 text-brand-500" />
              Available Ticket Packages
            </h3>

            <div className="space-y-2.5">
              {selectedEvent.tickets.map((tier) => (
                <div
                  key={tier.id}
                  className="flex items-center justify-between p-3.5 bg-dark-800 rounded-xl border border-slate-700/60 hover:border-brand-500/50 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-sm text-white">{tier.name}</p>
                    <p className="text-xs text-slate-400">
                      {tier.totalQuantity - tier.soldQuantity} tickets left
                    </p>
                  </div>
                  <span className="font-black text-base text-brand-400">
                    {formatNGN(tier.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-dark-900 border-t border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Tickets starting from</p>
            <p className="text-xl font-black text-brand-400">
              {formatNGN(Math.min(...selectedEvent.tickets.map(t => t.price)))}
            </p>
          </div>

          <button
            onClick={() => setActiveModal('booking')}
            className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-brand-600/30 hover:scale-[1.02] transition-all"
          >
            <Ticket className="w-4 h-4" />
            Proceed to Select Tickets
          </button>
        </div>

      </div>
    </div>
  );
};
