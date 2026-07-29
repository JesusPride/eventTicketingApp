import React, { useState } from 'react';
import { X, Ticket, User, Mail, Phone, CreditCard, ShieldCheck, Sparkles, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatNGN } from '../utils/formatters';
import { useEventContext } from '../context/EventContext';

export const TicketBookingModal = () => {
  const { selectedEvent, setActiveModal, setSelectedTicketPass, purchaseTicket } = useEventContext();

  if (!selectedEvent) return null;

  const [selectedTier, setSelectedTier] = useState(selectedEvent.tickets[0]);
  const [quantity, setQuantity] = useState(1);
  const [attendee, setAttendee] = useState({
    name: 'Adewunmi Esther Opeyemi',
    email: 'esther.3mtt@example.com',
    phone: '08123456789',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = selectedTier ? selectedTier.price * quantity : 0;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const createdTickets = purchaseTicket({
        event: selectedEvent,
        ticketType: selectedTier,
        quantity,
        attendee,
      });

      // Launch Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setIsProcessing(false);
      
      // Automatically show the first created ticket pass
      if (createdTickets && createdTickets.length > 0) {
        setSelectedTicketPass(createdTickets[0]);
        setActiveModal('ticketPass');
      } else {
        setActiveModal(null);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl glass-modal rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-dark-900/90">
          <div>
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Checkout & Reserve</span>
            <h2 className="text-xl font-bold text-white line-clamp-1">{selectedEvent.title}</h2>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleBookingSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          
          {/* Step 1: Select Ticket Tier */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              1. Choose Ticket Category
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {selectedEvent.tickets.map((tier) => {
                const isSelected = selectedTier?.id === tier.id;
                const isSoldOut = tier.soldQuantity >= tier.totalQuantity;
                return (
                  <div
                    key={tier.id}
                    onClick={() => !isSoldOut && setSelectedTier(tier)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-brand-500/15 border-brand-500 shadow-md shadow-brand-500/10'
                        : isSoldOut
                        ? 'bg-dark-800/40 border-slate-800 opacity-50 cursor-not-allowed'
                        : 'bg-dark-800/80 border-slate-700/60 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm text-white">{tier.name}</p>
                        {isSelected && <CheckCircle className="w-4 h-4 text-brand-400" />}
                      </div>
                      <p className="text-xs text-slate-400">
                        {isSoldOut ? 'SOLD OUT' : `${tier.totalQuantity - tier.soldQuantity} remaining`}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-extrabold text-base text-brand-400">
                        {formatNGN(tier.price)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Quantity */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              2. Quantity
            </label>
            <div className="flex items-center justify-between p-3 bg-dark-800 rounded-xl border border-slate-700/60">
              <span className="text-xs text-slate-300 font-medium">Number of Tickets</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-700 text-white font-bold text-base hover:bg-slate-600 transition-colors flex items-center justify-center"
                >
                  -
                </button>
                <span className="font-extrabold text-white text-base w-6 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="w-8 h-8 rounded-lg bg-brand-600 text-white font-bold text-base hover:bg-brand-500 transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: Attendee Details */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              3. Attendee Information
            </label>

            <div className="space-y-2.5">
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={attendee.name}
                  onChange={(e) => setAttendee({ ...attendee, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={attendee.email}
                  onChange={(e) => setAttendee({ ...attendee, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number (e.g. 08123456789)"
                  value={attendee.phone}
                  onChange={(e) => setAttendee({ ...attendee, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="p-4 bg-dark-800/90 rounded-2xl border border-slate-700/70 space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>{selectedTier?.name} x {quantity}</span>
              <span>{formatNGN(selectedTier?.price * quantity)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Gate QR Ticket Issuance Fee</span>
              <span className="text-brand-400 font-semibold">FREE (₦0)</span>
            </div>
            <div className="pt-2 border-t border-slate-700 flex justify-between items-center text-sm font-bold text-white">
              <span>Total Payable Amount</span>
              <span className="text-xl font-black text-brand-400">{formatNGN(totalPrice)}</span>
            </div>
          </div>

          {/* Guarantee Note */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0" />
            <span>Instant digital ticket pass with scannable QR code generated upon payment.</span>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 text-white font-extrabold text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-brand-600/25 transition-all"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating QR Ticket Pass...
              </span>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                Confirm & Issue Ticket ({formatNGN(totalPrice)})
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
