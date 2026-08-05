import React, { useState } from 'react';
import { X, PlusCircle, Calendar, MapPin, DollarSign, Image, FileText, Building2 } from 'lucide-react';
import { useEventContext } from '../context/EventContext';

export const CreateEventModal = () => {
  const { addEvent, setActiveModal } = useEventContext();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Tech',
    city: 'Lagos',
    venue: '',
    date: '2026-09-01',
    time: '10:00 AM - 04:00 PM',
    description: '',
    organizer: 'Adewunmi Esther Opeyemi (Event Host)',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    tickets: [
      { id: 't-reg', name: 'Regular Pass', price: 5000, totalQuantity: 200, soldQuantity: 0 },
      { id: 't-vip', name: 'VIP Pass', price: 20000, totalQuantity: 50, soldQuantity: 0 }
    ]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(formData);
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-modal rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-dark-900/90">
          <div>
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Host & Publish Event</span>
            <h2 className="text-xl font-bold text-white">Create New Event</h2>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-slate-200">

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
              Event Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lagos AI & Web Development Summit 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-dark-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-dark-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
              >
                <option value="Tech">Tech</option>
                <option value="Music">Music</option>
                <option value="Education">Education</option>
                <option value="Business">Business</option>
                <option value="Food & Drink">Food & Drink</option>
                <option value="Virtual">Virtual</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                City / Region
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2.5 bg-dark-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
              >
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Ibadan">Ibadan</option>
                <option value="Port Harcourt">Port Harcourt</option>
                <option value="Online">Online / Virtual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
              Venue Location Address
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Eko Hotel & Suites, Victoria Island, Lagos"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="w-full px-4 py-2.5 bg-dark-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2.5 bg-dark-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                Time
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 09:00 AM - 05:00 PM"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2.5 bg-dark-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
              Description
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe event highlights, speakers, schedule..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-dark-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
              Image URL
            </label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2.5 bg-dark-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Ticket Tier 1 */}
          <div className="p-4 bg-dark-800/80 rounded-2xl border border-slate-700 space-y-3">
            <h4 className="font-bold text-xs text-brand-400 uppercase">Regular Ticket Tier Settings</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Price (₦ NGN)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.tickets[0].price}
                  onChange={(e) => {
                    const updated = [...formData.tickets];
                    updated[0].price = Number(e.target.value);
                    setFormData({ ...formData, tickets: updated });
                  }}
                  className="w-full px-3 py-2 bg-dark-900 border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Total Capacity</label>
                <input
                  type="number"
                  min="1"
                  value={formData.tickets[0].totalQuantity}
                  onChange={(e) => {
                    const updated = [...formData.tickets];
                    updated[0].totalQuantity = Number(e.target.value);
                    setFormData({ ...formData, tickets: updated });
                  }}
                  className="w-full px-3 py-2 bg-dark-900 border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20 transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            Publish Event & Open Ticketing
          </button>

        </form>

      </div>
    </div>
  );
};
