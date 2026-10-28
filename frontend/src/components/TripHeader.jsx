import React from 'react';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Heart, 
  Zap, 
  Sparkles, 
  Printer, 
  Clock, 
  TrendingUp,
  Tag
} from 'lucide-react';

export default function TripHeader({ trip, onOpenNewTripModal, onExportPdf }) {
  if (!trip) return null;

  // Calculate totals
  const totalActivities = trip.days.reduce((acc, d) => acc + (d.activities?.length || 0), 0);
  const avgDailyCost = trip.durationDays > 0 ? Math.round(trip.totalEstimatedCost / trip.durationDays) : 0;

  // Traveler icon & color
  const getTravelerBadge = (type) => {
    switch (type) {
      case 'Solo':
        return { label: 'Solo Traveler', icon: Zap, bg: 'bg-amber-500/20 text-amber-300 border-amber-400/30' };
      case 'Couple':
        return { label: 'Couple Escape', icon: Heart, bg: 'bg-rose-500/20 text-rose-300 border-rose-400/30' };
      case 'Group':
        return { label: 'Group Adventure', icon: Users, bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' };
      default:
        return { label: type, icon: Users, bg: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30' };
    }
  };

  const travelerInfo = getTravelerBadge(trip.travelerType);
  const TravelerIcon = travelerInfo.icon;

  const getBudgetTierLabel = (b) => {
    switch (b) {
      case 'Budget': return { text: 'Budget ($)', color: 'bg-blue-500/20 text-blue-300 border-blue-400/30' };
      case 'Mid': return { text: 'Mid-Range ($$)', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30' };
      case 'Luxury': return { text: 'Luxury ($$$)', color: 'bg-amber-400/20 text-amber-200 border-amber-300/40' };
      default: return { text: b, color: 'bg-slate-500/20 text-slate-300 border-slate-400/30' };
    }
  };

  const budgetInfo = getBudgetTierLabel(trip.budget);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl mb-8 border border-slate-800/20 bg-slate-900 text-white">
      {/* Background Cover Image with cinematic gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105"
        style={{ backgroundImage: `url(${trip.coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto flex flex-col justify-between min-h-[340px]">
        
        {/* Top Badges & Mobile Preset Callout */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Traveler Badge */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${travelerInfo.bg}`}>
              <TravelerIcon className="w-3.5 h-3.5" />
              {travelerInfo.label}
            </span>

            {/* Budget Badge */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${budgetInfo.color}`}>
              <DollarSign className="w-3.5 h-3.5" />
              {budgetInfo.text}
            </span>

            {/* Duration Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border bg-white/10 text-white border-white/20">
              <Clock className="w-3.5 h-3.5" />
              {trip.durationDays} Days / {trip.durationDays > 1 ? `${trip.durationDays - 1} Nights` : 'Day Trip'}
            </span>
          </div>

          {/* Quick Actions (Export / Customize) */}
          <div className="flex items-center gap-2 no-print">
            <button
              onClick={onExportPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-all shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={onOpenNewTripModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm shadow-indigo-900/50"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Customize Plan</span>
            </button>
          </div>
        </div>

        {/* Hero Title & Destination */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm mb-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{trip.destination}</span>
            <span className="text-slate-400">•</span>
            <Calendar className="w-4 h-4 text-indigo-300" />
            <span>{trip.startDate} to {trip.endDate}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3 max-w-4xl">
            {trip.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {trip.summary}
          </p>

          {/* Interest Tags */}
          {trip.interests && trip.interests.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
                <Tag className="w-3 h-3" /> Focus:
              </span>
              {trip.interests.map((interest) => (
                <span 
                  key={interest} 
                  className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-800/80 text-slate-200 border border-slate-700/60"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">
              Estimated Total
            </span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-400">
              ${trip.totalEstimatedCost.toLocaleString()}
            </span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">
              Avg Daily Cost
            </span>
            <span className="text-xl sm:text-2xl font-bold text-indigo-300">
              ${avgDailyCost} <span className="text-xs text-slate-400 font-normal">/ day</span>
            </span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">
              Planned Activities
            </span>
            <span className="text-xl sm:text-2xl font-bold text-amber-300">
              {totalActivities}
            </span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">
              Pacing & Style
            </span>
            <span className="text-sm sm:text-base font-semibold text-slate-200 truncate mt-1 block">
              {trip.travelerType === 'Solo' ? '⚡ High Velocity' : trip.travelerType === 'Couple' ? '🥂 Scenic Romance' : '🎒 Coordinated Fun'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
