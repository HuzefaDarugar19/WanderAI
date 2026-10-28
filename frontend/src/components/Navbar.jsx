import React from 'react';
import { Compass, Sparkles, Plus, Bookmark, Printer, Users, Heart, Zap } from 'lucide-react';

export default function Navbar({
  currentTrip,
  savedTrips = [],
  onSelectTrip,
  onOpenNewTripModal,
  onSelectPreset,
  onExportPdf,
  isGenerating
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectPreset('solo')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-800 bg-clip-text text-transparent">
                  WanderAI
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200">
                  PRO
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">AI Travel Itinerary Planner</p>
            </div>
          </div>

          {/* Preset Scenario Switcher Buttons (Centered Desktop) */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/60">
            <span className="text-[11px] font-semibold text-slate-400 px-2 uppercase tracking-wider">
              Presets:
            </span>
            <button
              onClick={() => onSelectPreset('solo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTrip?.id?.includes('solo')
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
              title="2-day fast weekend getaway focusing on food & sightseeing"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Solo Weekend</span>
              <span className="text-[10px] opacity-75">(2d)</span>
            </button>

            <button
              onClick={() => onSelectPreset('couple')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTrip?.id?.includes('couple')
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
              title="4-day romantic vacation with relaxed pacing, scenic spots & premium stays"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Couple Romance</span>
              <span className="text-[10px] opacity-75">(4d)</span>
            </button>

            <button
              onClick={() => onSelectPreset('group')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTrip?.id?.includes('group')
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
              title="5-day trip balancing budget, adventure, and culture for multi-person logistics"
            >
              <Users className="w-3.5 h-3.5 text-emerald-500" />
              <span>Group Expedition</span>
              <span className="text-[10px] opacity-75">(5d)</span>
            </button>
          </div>

          {/* Right Actions: Saved Trips & New Trip & PDF */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Saved Trips Selector */}
            {savedTrips.length > 0 && (
              <div className="relative hidden lg:block">
                <select
                  value={currentTrip?.id || ''}
                  onChange={(e) => {
                    const found = savedTrips.find(t => t.id === e.target.value);
                    if (found) onSelectTrip(found);
                  }}
                  className="bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-lg px-2.5 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option disabled value="">Saved Itineraries ({savedTrips.length})</option>
                  {savedTrips.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.destination} ({t.durationDays}d) - {t.travelerType}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Export PDF Button */}
            <button
              onClick={onExportPdf}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Export PDF</span>
            </button>

            {/* New Trip Button */}
            <button
              onClick={onOpenNewTripModal}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg text-xs font-semibold shadow-sm hover:shadow transition-all disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>New Trip</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
