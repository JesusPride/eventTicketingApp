import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ScanLine, CheckCircle2, AlertTriangle, XCircle, Search, ShieldCheck, RefreshCw, Ticket, Clock } from 'lucide-react';
import { useEventContext } from '../context/EventContext';
import { formatDate } from '../utils/formatters';

export const GateCheckInPage = () => {
  const { verifyAndCheckInTicket, checkIns, tickets } = useEventContext();

  const [inputTicketId, setInputTicketId] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isScanningActive, setIsScanningActive] = useState(false);

  // Initialize HTML5 QR Scanner
  useEffect(() => {
    let scanner = null;

    if (isScanningActive) {
      scanner = new Html5QrcodeScanner(
        'qr-reader',
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          rememberLastUsedCamera: true
        },
        /* verbose= */ false
      );

      scanner.render(
        (decodedText) => {
          handleVerification(decodedText);
          setIsScanningActive(false);
          if (scanner) {
            scanner.clear().catch(err => console.error(err));
          }
        },
        (errorMessage) => {
          // Continuous scanning errors ignored
        }
      );
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(err => console.error(err));
      }
    };
  }, [isScanningActive]);

  const handleVerification = (ticketCode) => {
    if (!ticketCode || !ticketCode.trim()) return;
    const result = verifyAndCheckInTicket(ticketCode);
    setScanResult(result);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    handleVerification(inputTicketId);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-dark-800 via-slate-900 to-dark-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/15 border border-accent-500/30 text-accent-400 text-xs font-bold uppercase">
              <ScanLine className="w-3.5 h-3.5 animate-pulse" />
              Official 3MTT Gatekeeper Tool
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Gate Ticket Scanner & Verification
            </h1>
            <p className="text-sm text-slate-300">
              Scan attendee QR codes or validate ticket IDs in real-time to prevent duplicate gate entries.
            </p>
          </div>

          <button
            onClick={() => setIsScanningActive(!isScanningActive)}
            className={`px-5 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
              isScanningActive
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-accent-600 hover:bg-accent-500 text-white shadow-accent-600/30'
            }`}
          >
            <ScanLine className="w-5 h-5" />
            {isScanningActive ? 'Close Camera Scanner' : 'Launch Camera Scanner'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Camera Scanner & Manual Entry Input */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Camera Container */}
          {isScanningActive && (
            <div className="glass-card p-6 rounded-3xl border border-accent-500/40 space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <ScanLine className="w-4 h-4 text-accent-400" />
                Point Camera at Attendee QR Code
              </h3>
              <div id="qr-reader" className="w-full bg-dark-900 rounded-2xl overflow-hidden border border-slate-700" />
            </div>
          )}

          {/* Manual Ticket ID Validator Form */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Ticket className="w-5 h-5 text-brand-400" />
                Manual Ticket ID Validation
              </h3>
              <span className="text-xs text-slate-400">Scan or Type Code</span>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter Ticket ID (e.g. TKT-NG-9842A) or paste QR payload..."
                  value={inputTicketId}
                  onChange={(e) => setInputTicketId(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-slate-700 rounded-2xl text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 uppercase tracking-wider"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-brand-600/20"
                >
                  Verify Ticket Now
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInputTicketId('');
                    setScanResult(null);
                  }}
                  className="px-4 py-3 bg-dark-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700"
                >
                  Clear
                </button>
              </div>
            </form>

            {/* Quick Demo Fill Buttons for Testing */}
            {tickets.length > 0 && (
              <div className="pt-2 border-t border-slate-800">
                <p className="text-xs text-slate-400 mb-2 font-medium">Quick Test with Demo Ticket IDs:</p>
                <div className="flex flex-wrap gap-2">
                  {tickets.slice(0, 3).map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setInputTicketId(t.id);
                        handleVerification(t.id);
                      }}
                      className="px-2.5 py-1 bg-dark-800 hover:bg-brand-500/20 border border-slate-700 hover:border-brand-500/40 text-brand-400 font-mono text-xs rounded-lg transition-colors"
                    >
                      {t.id} ({t.attendeeName.split(' ')[0]})
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Verification Result Display */}
          {scanResult && (
            <div className={`glass-card p-6 rounded-3xl border shadow-2xl animate-fadeIn ${
              scanResult.status === 'VERIFIED'
                ? 'border-emerald-500/60 bg-emerald-950/20'
                : scanResult.status === 'DUPLICATE'
                ? 'border-amber-500/60 bg-amber-950/20'
                : 'border-rose-500/60 bg-rose-950/20'
            }`}>
              <div className="flex items-start gap-4">
                {scanResult.status === 'VERIFIED' && (
                  <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                )}
                {scanResult.status === 'DUPLICATE' && (
                  <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400 border border-amber-500/30">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                )}
                {scanResult.status === 'INVALID' && (
                  <div className="p-3 bg-rose-500/20 rounded-2xl text-rose-400 border border-rose-500/30">
                    <XCircle className="w-8 h-8" />
                  </div>
                )}

                <div className="space-y-2 flex-1">
                  <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    scanResult.status === 'VERIFIED'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : scanResult.status === 'DUPLICATE'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {scanResult.status}
                  </span>

                  <h3 className="text-lg font-black text-white">
                    {scanResult.message}
                  </h3>

                  {scanResult.ticket && (
                    <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400">Attendee:</span>
                        <p className="font-bold text-white">{scanResult.ticket.attendeeName}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Ticket Tier:</span>
                        <p className="font-bold text-brand-400">{scanResult.ticket.ticketTypeName}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-400">Event:</span>
                        <p className="font-semibold text-slate-200">{scanResult.ticket.eventTitle}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Live Gate Check-in Logs Stream */}
        <div className="lg:col-span-5">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-400" />
                Live Gate Check-in Activity
              </h3>
              <span className="text-xs text-slate-400 font-semibold">{checkIns.length} Total</span>
            </div>

            {checkIns.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <ShieldCheck className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-300">No gate check-ins logged yet</p>
                <p className="text-xs text-slate-500">Scan or enter ticket IDs above to begin gate verification.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[450px] overflow-y-auto pr-1">
                {checkIns.map((log) => (
                  <div
                    key={log.id}
                    className="gate-log-item p-3 bg-dark-800/70 rounded-xl border border-slate-800 flex items-center justify-between text-xs transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white">{log.ticketId}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          log.status === 'VERIFIED'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : log.status === 'DUPLICATE'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {log.status}
                        </span>
                      </div>
                      {log.attendeeName && (
                        <p className="text-slate-300 font-medium mt-0.5">{log.attendeeName}</p>
                      )}
                    </div>
                    <div className="text-right text-slate-400 text-[11px] font-mono">
                      {new Date(log.timestamp).toLocaleTimeString('en-GB')}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
