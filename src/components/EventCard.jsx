import React from 'react';
import { Calendar, MapPin, Ticket, Tag, Users, ArrowUpRight } from 'lucide-react';
import { formatNGN, formatDate } from '../utils/formatters';
import { useEventContext } from '../context/EventContext';

export const EventCard = ({ event }) => {
  const { setSelectedEvent, setActiveModal } = useEventContext();

  const lowestPrice = Math.min(...event.tickets.map(t => t.price));
  const totalCapacity = event.tickets.reduce((acc, t) => acc + t.totalQuantity, 0);
  const totalSold = event.tickets.reduce((acc, t) => acc + t.soldQuantity, 0);
  const percentSold = Math.min(100, Math.round((totalSold / totalCapacity) * 100));

  const handleCardClick = () => {
    setSelectedEvent(event);
    setActiveModal('eventDetails');
  };

  const handleBookClick = (e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setActiveModal('booking');
  };

  return (
    <div 
      onClick={handleCardClick}
      className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between cursor-pointer group"
    >
      <div>
        {/* Event Image */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />
          
          {/* Top Category Badge & City Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="bg-dark-900/90 text-brand-400 border border-brand-500/30 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
              {event.category}
            </span>
            <span className="bg-dark-900/90 text-slate-300 border border-slate-700/60 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
              <MapPin className="w-3 h-3 text-brand-500" />
              {event.city}
            </span>
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-3 right-3">
            <span className="bg-brand-600 text-white font-extrabold text-xs sm:text-sm px-3 py-1 rounded-xl shadow-lg">
              {lowestPrice === 0 ? 'FREE RSVP' : `From ${formatNGN(lowestPrice)}`}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(event.date)} • {event.time}</span>
          </div>

          <h3 className="font-bold text-lg text-white group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          <div className="flex items-center text-xs text-slate-400 gap-1.5 pt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Sales Progress & Action */}
      <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 space-y-3">
        {/* Ticket Availability Progress Bar */}
        <div>
          <div className="flex justify-between items-center text-[11px] text-slate-400 mb-1 font-medium">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-brand-500" />
              {totalSold} / {totalCapacity} Sold
            </span>
            <span className="text-slate-300 font-semibold">{percentSold}%</span>
          </div>
          <div className="w-full h-1.5 bg-dark-900 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                percentSold > 85 ? 'bg-amber-500' : 'bg-brand-500'
              }`} 
              style={{ width: `${percentSold}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleBookClick}
          className="w-full bg-dark-800 hover:bg-brand-600 text-slate-200 hover:text-white font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 border border-slate-700/80 hover:border-brand-500 transition-all duration-300 shadow-sm"
        >
          <Ticket className="w-4 h-4" />
          <span>Get Tickets</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
        </button>
      </div>

    </div>
  );
};
