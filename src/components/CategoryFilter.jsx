import React from 'react';
import { MapPin } from 'lucide-react';
import { useEventContext } from '../context/EventContext';

const CATEGORIES = ['All', 'Tech', 'Music', 'Education', 'Business', 'Food & Drink', 'Virtual'];
const CITIES = ['All', 'Lagos', 'Abuja', 'Ibadan', 'Port Harcourt', 'Online'];

export const CategoryFilter = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedCity,
    setSelectedCity,
    priceFilter,
    setPriceFilter,
  } = useEventContext();

  return (
    <div className="space-y-4 mb-8">
      {/* Category Pills & Filters Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-brand-500/30">

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20 font-bold border border-brand-500'
                    : 'bg-dark-800/80 text-slate-300 hover:bg-brand-500/10 hover:text-brand-400 border border-brand-500/30'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* City & Price Filter Dropdowns */}
        <div className="flex items-center gap-3 self-end lg:self-auto">
          {/* City Dropdown */}
          <div className="relative flex items-center">
            <MapPin className="absolute left-3 w-4 h-4 text-brand-500 pointer-events-none" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="pl-9 pr-8 py-2 bg-dark-800 border border-brand-500/30 rounded-xl text-xs sm:text-sm font-medium text-slate-200 focus:outline-none focus:border-brand-500 cursor-pointer appearance-none"
            >
              {CITIES.map(city => (
                <option key={city} value={city}>
                  City: {city}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter Dropdown */}
          <div className="relative flex items-center">
            <span className="absolute left-3 text-sm font-semibold text-emerald-400 pointer-events-none">
              ₦
            </span>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="pl-9 pr-8 py-2 bg-dark-800 border border-brand-500/30 rounded-xl text-xs sm:text-sm font-medium text-slate-200 focus:outline-none focus:border-brand-500 cursor-pointer appearance-none"
            >
              <option value="All">All Prices</option>
              <option value="Free">Free RSVP (₦0)</option>
              <option value="Paid">Paid Events (₦)</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};
