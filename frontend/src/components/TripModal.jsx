import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Heart, 
  Zap, 
  Check, 
  Compass,
  Utensils,
  Landmark,
  Mountain,
  Palmtree,
  Palette
} from 'lucide-react';

const POPULAR_DESTINATIONS = [
  'Tokyo, Japan',
  'Amalfi Coast, Italy',
  'Costa Rica',
  'Paris, France',
  'Kyoto, Japan',
  'Barcelona, Spain',
  'Bali, Indonesia',
  'New York, USA'
];

const INTEREST_OPTIONS = [
  { id: 'Food', label: 'Food & Dining', icon: Utensils, emoji: '🍜' },
  { id: 'Sightseeing', label: 'Sightseeing', icon: Landmark, emoji: '🏛️' },
  { id: 'Adventure', label: 'Adventure', icon: Mountain, emoji: '⛰️' },
  { id: 'Relax', label: 'Relaxation', icon: Palmtree, emoji: '🌴' },
  { id: 'Culture', label: 'Art & Culture', icon: Palette, emoji: '🎨' },
];

export default function TripModal({ isOpen, onClose, onGenerate, isGenerating }) {
  if (!isOpen) return null;

  // Form states with sensible defaults
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('2026-11-06');
  const [endDate, setEndDate] = useState('2026-11-09');
  const [budget, setBudget] = useState('Mid'); // Budget | Mid | Luxury
  const [travelerType, setTravelerType] = useState('Couple'); // Solo | Couple | Group
  const [selectedInterests, setSelectedInterests] = useState(['Food', 'Sightseeing']);

  const toggleInterest = (id) => {
    if (selectedInterests.includes(id)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter(item => item !== id));
      }
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim()) return;

    onGenerate({
      destination: destination.trim(),
      startDate,
      endDate,
      budget,
      travelerType,
      interests: selectedInterests
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/30 border border-indigo-400/30 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">AI Trip Builder</h2>
              <p className="text-xs text-slate-300">Design your dream custom travel itinerary in seconds</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Destination */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Where do you want to go? *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Kyoto, Japan or Amalfi Coast, Italy"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
              />
            </div>
            {/* Quick picks */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] text-slate-400 font-medium">Quick ideas:</span>
              {POPULAR_DESTINATIONS.slice(0, 4).map((dest) => (
                <button
                  type="button"
                  key={dest}
                  onClick={() => setDestination(dest)}
                  className="px-2 py-0.5 rounded-md text-[11px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 font-medium transition-colors"
                >
                  {dest.split(',')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Dates Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Budget Tier */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Budget Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Budget', label: 'Budget', sub: 'Hostels & street eats', icon: '$' },
                { id: 'Mid', label: 'Mid-Range', sub: 'Boutique & fine bistro', icon: '$$' },
                { id: 'Luxury', label: 'Luxury', sub: '5-star & private tours', icon: '$$$' }
              ].map((tier) => (
                <button
                  type="button"
                  key={tier.id}
                  onClick={() => setBudget(tier.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    budget === tier.id
                      ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-sm text-slate-900">{tier.label}</span>
                    <span className="text-xs font-mono font-bold text-indigo-600">{tier.icon}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 leading-tight">{tier.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Traveler Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Traveler Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Solo', label: 'Solo', sub: 'Fast & agile', icon: Zap, color: 'text-amber-500' },
                { id: 'Couple', label: 'Couple', sub: 'Romantic & relaxed', icon: Heart, color: 'text-rose-500' },
                { id: 'Group', label: 'Group', sub: 'Adventure & fun', icon: Users, color: 'text-emerald-500' }
              ].map((t) => {
                const IconComponent = t.icon;
                return (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setTravelerType(t.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      travelerType === t.id
                        ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <IconComponent className={`w-4 h-4 ${t.color}`} />
                      <span className="font-extrabold text-sm text-slate-900">{t.label}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 leading-tight">{t.sub}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interest Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Interest Tags (Choose 1 or more)
            </label>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((item) => {
                const isSelected = selectedInterests.includes(item.id);
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => toggleInterest(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{item.emoji}</span>
                    <span>{item.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white ml-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={isGenerating || !destination.trim()}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-bold text-sm shadow-lg shadow-indigo-300 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Sparkles className={`w-4 h-4 text-amber-300 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Generating AI Itinerary...' : 'Generate Itinerary with AI'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
