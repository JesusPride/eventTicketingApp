import React from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { CategoryFilter } from '../components/CategoryFilter';
import { EventCard } from '../components/EventCard';
import { useEventContext } from '../context/EventContext';
import { Sparkles, Frown } from 'lucide-react';

export const ExplorePage = ({ setActiveTab }) => {
  const {
    events,
    searchQuery,
    selectedCategory,
    selectedCity,
    priceFilter,
  } = useEventContext();

  // Filter events based on search, category, city, and price
  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || evt.category === selectedCategory;

    const matchesCity =
      selectedCity === 'All' || evt.city.toLowerCase() === selectedCity.toLowerCase();

    const lowestPrice = Math.min(...evt.tickets.map(t => t.price));
    const matchesPrice =
      priceFilter === 'All' ||
      (priceFilter === 'Free' && lowestPrice === 0) ||
      (priceFilter === 'Paid' && lowestPrice > 0);

    return matchesSearch && matchesCategory && matchesCity && matchesPrice;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner Header */}
      {!searchQuery && selectedCategory === 'All' && selectedCity === 'All' && (
        <HeroBanner setActiveTab={setActiveTab} />
      )}

      {/* Filter Toolbar */}
      <CategoryFilter />

      {/* Events Section Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-400" />
            Upcoming Events in Nigeria
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Event Cards Grid */}
      {filteredEvents.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl border border-slate-800 text-center space-y-4 max-w-lg mx-auto my-12">
          <Frown className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Events Found</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            No events matched your search query or selected filter criteria. Try resetting your search filter or host a new event!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      )}
    </div>
  );
};
