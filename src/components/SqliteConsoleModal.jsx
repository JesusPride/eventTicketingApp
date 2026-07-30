import React, { useState, useEffect } from 'react';
import { useEventContext } from '../context/EventContext';
import { executeRawSql, getSqliteDbStats, resetSqliteDbToSeed } from '../services/sqlite';
import { INITIAL_EVENTS } from '../data/sampleEvents';
import { 
  Database, 
  Terminal, 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Code,
  Sparkles,
  Loader2
} from 'lucide-react';

export const SqliteConsoleModal = () => {
  const { setActiveModal, refreshFromSqlite, showToast, isSqliteReady } = useEventContext();
  const [sqlInput, setSqlInput] = useState('SELECT id, event_title, ticket_type_name, ticket_price, attendee_name, is_used FROM tickets ORDER BY rowid DESC LIMIT 10;');
  const [sqlResults, setSqlResults] = useState(null);
  const [sqlError, setSqlError] = useState(null);
  const [dbStats, setDbStats] = useState({ eventsCount: 0, ticketsCount: 0, checkInsCount: 0, dbSizeFormatted: '0 KB' });

  const sampleQueries = [
    { label: 'View All Tickets', query: 'SELECT id, event_title, ticket_type_name, ticket_price, attendee_name, is_used FROM tickets;' },
    { label: 'Sales by Event', query: 'SELECT event_title, COUNT(*) as tickets_sold, SUM(ticket_price) as total_revenue_ngn FROM tickets GROUP BY event_title;' },
    { label: 'Check-in Audit Logs', query: 'SELECT ticket_id, attendee_name, status, timestamp, message FROM check_ins ORDER BY rowid DESC;' },
    { label: 'Events in Lagos', query: "SELECT id, title, category, venue, price FROM events WHERE city = 'Lagos';" },
  ];

  const updateStats = () => {
    setDbStats(getSqliteDbStats());
  };

  const handleRunQuery = (queryToRun) => {
    setSqlError(null);
    try {
      const results = executeRawSql(queryToRun);
      setSqlResults(results);
      updateStats();
    } catch (err) {
      setSqlError(err.message || 'SQLite Syntax or Execution Error');
      setSqlResults(null);
    }
  };

  useEffect(() => {
    if (isSqliteReady) {
      updateStats();
      handleRunQuery(sqlInput);
    }
  }, [isSqliteReady]);

  const handlePresetClick = (query) => {
    setSqlInput(query);
    if (isSqliteReady) {
      handleRunQuery(query);
    }
  };

  const handleResetDb = async () => {
    if (window.confirm('Are you sure you want to reset the SQLite database to seed data?')) {
      await resetSqliteDbToSeed(INITIAL_EVENTS);
      await refreshFromSqlite();
      updateStats();
      handleRunQuery('SELECT * FROM events LIMIT 5;');
      showToast('SQLite Database reset successfully!', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="bg-dark-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-dark-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-400">
              <Database className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">SQLite Database Console</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  SQLite WASM 3.x
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Native Client-Side Relational SQL Engine • Database Size: <strong className="text-emerald-400">{dbStats.dbSizeFormatted}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSqliteReady ? (
          <div className="p-12 text-center space-y-4">
            <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mx-auto" />
            <h4 className="text-base font-bold text-white">Initializing SQLite WASM Database...</h4>
            <p className="text-xs text-slate-400">Loading WebAssembly binary file and compiling SQLite engine...</p>
          </div>
        ) : (
          <>
            {/* Database Metrics Stats Header */}
            <div className="grid grid-cols-4 gap-3 p-4 bg-slate-900/40 border-b border-slate-800 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex justify-between items-center">
                <span className="text-slate-400">`events` Table</span>
                <span className="font-mono font-bold text-brand-400">{dbStats.eventsCount} rows</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex justify-between items-center">
                <span className="text-slate-400">`tickets` Table</span>
                <span className="font-mono font-bold text-accent-400">{dbStats.ticketsCount} rows</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex justify-between items-center">
                <span className="text-slate-400">`check_ins` Table</span>
                <span className="font-mono font-bold text-emerald-400">{dbStats.checkInsCount} rows</span>
              </div>
              <button
                onClick={handleResetDb}
                className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-bold flex items-center justify-center gap-1.5 transition-all text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Seed Data
              </button>
            </div>

            {/* Console Preset Quick Action Buttons */}
            <div className="px-6 py-3 bg-dark-950/40 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-slate-400" /> Presets:
              </span>
              {sampleQueries.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetClick(item.query)}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800/60 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 whitespace-nowrap transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* SQL Input Area */}
            <div className="p-4 bg-slate-950/80 border-b border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5" /> SQL Query Command:
                </label>
                <button
                  onClick={() => handleRunQuery(sqlInput)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-900/30 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Run Query
                </button>
              </div>
              <textarea
                value={sqlInput}
                onChange={(e) => setSqlInput(e.target.value)}
                rows={2}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 font-mono text-xs text-emerald-300 focus:outline-none focus:border-emerald-500/80 transition-all"
                placeholder="Type raw SQL here (e.g. SELECT * FROM tickets;)"
              />
            </div>

            {/* Query Output View */}
            <div className="flex-1 p-6 overflow-y-auto min-h-[220px]">
              {sqlError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">SQL Execution Error:</strong>
                    <p className="font-mono mt-1 text-slate-300">{sqlError}</p>
                  </div>
                </div>
              )}

              {!sqlError && sqlResults && sqlResults.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  Query executed successfully. (0 rows returned or DDL/DML completed).
                </div>
              )}

              {!sqlError && sqlResults && sqlResults.length > 0 && (
                <div className="space-y-4">
                  {sqlResults.map((result, rIdx) => (
                    <div key={rIdx} className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-slate-950 text-slate-300 font-mono border-b border-slate-800">
                          <tr>
                            {result.columns.map((col, cIdx) => (
                              <th key={cIdx} className="p-3 border-r border-slate-800/60 last:border-0 uppercase tracking-wider text-[11px] text-emerald-400 font-semibold">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300 text-[11px]">
                          {result.values.map((row, rowIdx) => (
                            <tr key={rowIdx} className="hover:bg-slate-800/40 transition-colors">
                              {row.map((val, cellIdx) => (
                                <td key={cellIdx} className="p-3 border-r border-slate-800/40 last:border-0 max-w-[200px] truncate">
                                  {val === null ? <span className="text-slate-600 italic">NULL</span> : String(val)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="p-2 text-[10px] text-slate-400 bg-slate-950/40 border-t border-slate-800 text-right">
                        Returned {result.values.length} row(s)
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-dark-950 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Powered by WASM SQLite Engine (`sql.js`)
          </span>
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
