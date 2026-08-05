import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useEventContext } from '../context/EventContext';

export const Toast = () => {
  const { toast, hideToast } = useEventContext();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounceIn">
      <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl text-sm font-semibold max-w-md ${
        toast.type === 'success'
          ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
          : toast.type === 'warning'
          ? 'bg-amber-950/90 border-amber-500/50 text-amber-200'
          : toast.type === 'error'
          ? 'bg-rose-950/90 border-rose-500/50 text-rose-200 shadow-rose-900/20'
          : 'bg-slate-900/90 border-slate-700 text-slate-200'
      }`}>
        {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
        {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />}
        {toast.type === 'info' && <Info className="w-5 h-5 text-brand-400 shrink-0" />}

        <span className="flex-1">{toast.message}</span>

        <button
          onClick={hideToast}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
