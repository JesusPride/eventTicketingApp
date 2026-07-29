import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Calendar, MapPin, Ticket, ShieldCheck, Printer, CheckCircle, AlertTriangle, Github } from 'lucide-react';
import { formatDate, formatNGN } from '../utils/formatters';
import { useEventContext } from '../context/EventContext';

export const TicketPassModal = () => {
  const { selectedTicketPass, setActiveModal, showToast } = useEventContext();
  const printRef = useRef(null);

  if (!selectedTicketPass) return null;

  const handlePrint = () => {
    window.print();
  };

  // Attendee Avatar (Default photo or user photo)
  const attendeeAvatar = selectedTicketPass.attendeeAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-dark-900/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl glass-modal rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl flex flex-col max-h-[96vh]">
        
        {/* Modal Control Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-dark-900/95">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-500/10 text-brand-400 rounded-xl border border-brand-500/20">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Digital Gate Pass</p>
              <p className="text-xs font-extrabold text-brand-400 font-mono">{selectedTicketPass.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-dark-800 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4 text-brand-400" />
              <span>Print Ticket</span>
            </button>
            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Container */}
        <div ref={printRef} className="p-4 sm:p-8 overflow-y-auto space-y-6 bg-dark-950 text-slate-100 flex flex-col items-center justify-center">
          
          {/* SVG Ticket Container with Exact pattern-ticket.svg Backdrop */}
          <div className="relative w-full max-w-[650px] aspect-[600/280] rounded-3xl overflow-hidden shadow-2xl filter drop-shadow-2xl flex items-center">
            
            {/* 1. Exact SVG Ticket Background Pattern from /images/pattern-ticket.svg */}
            <img
              src="/images/pattern-ticket.svg"
              alt="Ticket Pass Pattern"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none z-0"
            />

            {/* 2. Top Squiggly Decorative Overlay Line from /images/pattern-squiggly-line-top.svg */}
            <img
              src="/images/pattern-squiggly-line-top.svg"
              alt="Decorative Line"
              className="absolute top-0 left-0 w-[80%] h-auto opacity-30 pointer-events-none z-0 mix-blend-screen"
            />

            {/* 3. Ticket Content Overlay */}
            <div className="relative z-10 w-full h-full grid grid-cols-12 px-4 sm:px-7 py-4 sm:py-6 items-center">
              
              {/* Left Main Ticket Section (col-span-8 sm:col-span-9) */}
              <div className="col-span-8 sm:col-span-9 flex flex-col justify-between h-full pr-2 sm:pr-4">
                
                {/* Event Header & Date/Location */}
                <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Brand Logo Icon */}
                    <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 p-0.5 shadow-md shrink-0">
                      <div className="w-full h-full bg-[#1c1438] rounded-[9px] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10V12H4V10Z" fill="#F97316"/>
                          <path d="M8 18C8 15.7909 9.79086 14 12 14C14.2091 14 16 15.7909 16 18V20H8V18Z" fill="#FB923C"/>
                        </svg>
                      </div>
                    </div>
                    <h2 className="font-mono font-extrabold text-base sm:text-2xl lg:text-3xl text-white tracking-tight leading-none truncate">
                      {selectedTicketPass.eventTitle}
                    </h2>
                  </div>

                  <p className="font-mono text-[10px] sm:text-xs md:text-sm text-purple-200/90 tracking-wide line-clamp-1 pl-1">
                    {formatDate(selectedTicketPass.eventDate)} / {selectedTicketPass.eventCity}, NG
                  </p>
                </div>

                {/* Attendee Profile Row */}
                <div className="flex items-center gap-2.5 sm:gap-4 pt-2">
                  {/* Avatar Photo Frame */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-purple-300/40 shadow-lg shrink-0 bg-purple-950">
                    <img
                      src={attendeeAvatar}
                      alt={selectedTicketPass.attendeeName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-0.5 sm:space-y-1">
                    <h3 className="font-mono font-bold text-xs sm:text-lg lg:text-xl text-white tracking-tight leading-tight truncate">
                      {selectedTicketPass.attendeeName}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-purple-200/80">
                      <Github className="w-3 h-3 text-purple-400 shrink-0" />
                      <span className="font-semibold">@Jesuspride</span>
                      <span className="hidden sm:inline text-slate-400">•</span>
                      <span className="hidden sm:inline truncate max-w-[130px]">{selectedTicketPass.attendeeEmail}</span>
                    </div>

                    <div className="flex items-center gap-1.5 pt-0.5">
                      <span className="bg-purple-500/20 border border-purple-300/30 text-purple-200 text-[9px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {selectedTicketPass.ticketTypeName}
                      </span>
                      <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[9px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full">
                        {formatNGN(selectedTicketPass.ticketPrice)}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Ticket Stub Section (col-span-4 sm:col-span-3) */}
              <div className="col-span-4 sm:col-span-3 flex flex-col items-center justify-between h-full pl-2 sm:pl-4 text-center">
                
                {/* Rotated Ticket Number */}
                <div className="flex flex-col items-center justify-center space-y-1 sm:space-y-2">
                  <span className="font-mono text-xs sm:text-lg font-black text-purple-200 tracking-widest">
                    #{selectedTicketPass.id.replace('TKT-NG-', '')}
                  </span>

                  {/* Scannable SVG QR Code Box */}
                  <div className="p-1.5 sm:p-2 bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 border-purple-400/40 inline-block">
                    <QRCodeSVG
                      value={selectedTicketPass.qrPayload || selectedTicketPass.id}
                      size={75}
                      className="w-14 h-14 sm:w-24 sm:h-24"
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                </div>

                {/* Gate Pass Status Badge */}
                <div className="pt-1">
                  {selectedTicketPass.isUsed ? (
                    <span className="inline-flex items-center gap-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[9px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
                      <AlertTriangle className="w-3 h-3" />
                      USED
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[9px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      VALID
                    </span>
                  )}
                </div>

              </div>

            </div>

          </div>

          {/* Gate Verification Footer Notice */}
          <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-400 pt-2">
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            <span>Present this ticket pass on your mobile device or printed copy at venue gate.</span>
          </div>

        </div>

      </div>
    </div>
  );
};
