import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Calendar, MapPin, Ticket, ShieldCheck, Printer, CheckCircle, AlertTriangle, Download } from 'lucide-react';
import { formatDate, formatNGN } from '../utils/formatters';
import { useEventContext } from '../context/EventContext';

export const TicketPassModal = () => {
  const { selectedTicketPass, setActiveModal, showToast } = useEventContext();
  const printRef = useRef(null);

  if (!selectedTicketPass) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md glass-modal rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-dark-900/90">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-brand-500/10 text-brand-400 rounded-lg border border-brand-500/20">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400">Digital Gate Pass</p>
              <p className="text-xs font-extrabold text-brand-400 font-mono">{selectedTicketPass.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print Pass"
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Pass Container */}
        <div ref={printRef} className="p-6 overflow-y-auto space-y-6 bg-dark-900 text-slate-100">
          
          {/* Ticket Pass Banner Card */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-gradient-to-b from-dark-800 to-slate-900 shadow-xl">
            
            {/* Top Event Cover Image */}
            <div className="relative h-28 w-full overflow-hidden">
              <img
                src={selectedTicketPass.eventImage}
                alt={selectedTicketPass.eventTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/60 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="bg-brand-600 text-white font-black text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {selectedTicketPass.ticketTypeName}
                </span>
              </div>
            </div>

            {/* Event Info */}
            <div className="p-5 space-y-4 text-center">
              <h3 className="font-extrabold text-lg text-white leading-tight">
                {selectedTicketPass.eventTitle}
              </h3>

              <div className="flex items-center justify-center gap-2 text-xs text-brand-400 font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(selectedTicketPass.eventDate)} • {selectedTicketPass.eventTime}</span>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{selectedTicketPass.eventVenue} ({selectedTicketPass.eventCity})</span>
              </div>

              {/* Scannable Dynamic QR Code */}
              <div className="pt-3 flex flex-col items-center justify-center space-y-2">
                <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-brand-500/20 inline-block">
                  <QRCodeSVG
                    value={selectedTicketPass.qrPayload || selectedTicketPass.id}
                    size={160}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-mono tracking-widest font-bold">
                  {selectedTicketPass.id}
                </p>
                <p className="text-[10px] text-slate-500">Scan at Gate for Access</p>
              </div>

              {/* Status Badge */}
              <div className="pt-2">
                {selectedTicketPass.isUsed ? (
                  <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    USED PASS (Checked In)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold px-3 py-1 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" />
                    VALID ACTIVE GATE PASS
                  </span>
                )}
              </div>
            </div>

            {/* Perforated Ticket Divider Line */}
            <div className="relative border-t-2 border-dashed border-slate-700/80 my-2">
              <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-dark-900 border border-slate-700/80" />
              <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-dark-900 border border-slate-700/80" />
            </div>

            {/* Attendee Details Footer */}
            <div className="p-5 bg-dark-900/60 grid grid-cols-2 gap-3 text-left border-t border-slate-800/80">
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase">Attendee Name</p>
                <p className="text-xs font-bold text-white truncate">{selectedTicketPass.attendeeName}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase">Ticket Tier</p>
                <p className="text-xs font-bold text-brand-400">{selectedTicketPass.ticketTypeName}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase">Paid Price</p>
                <p className="text-xs font-bold text-white">{formatNGN(selectedTicketPass.ticketPrice)}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase">Security Code</p>
                <p className="text-xs font-mono text-slate-300">3MTT-NG-SEC</p>
              </div>
            </div>

          </div>

          {/* Verification Footnote */}
          <div className="flex items-center gap-2 text-center text-xs text-slate-400 justify-center">
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            <span>Present this pass on your phone or printed paper at venue entrance.</span>
          </div>

        </div>

      </div>
    </div>
  );
};
