import React, { useState } from 'react';
import { 
  Sunrise, 
  Sun, 
  Moon, 
  Utensils, 
  Coffee, 
  RotateCcw, 
  DollarSign, 
  Lightbulb, 
  Plus, 
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import ActivityCard from './ActivityCard';

export default function DayTimeline({
  trip,
  selectedDayIndex,
  onSelectDay,
  onEditActivity,
  onDeleteActivity,
  onAddActivity,
  onRegenerateDay,
  isRegeneratingDay
}) {
  if (!trip || !trip.days || trip.days.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">
        No days available for this trip.
      </div>
    );
  }

  const currentDay = trip.days[selectedDayIndex] || trip.days[0];

  // Group activities by slot: Morning, Afternoon, Evening
  const morningActivities = (currentDay.activities || []).filter(a => a.slot === 'Morning');
  const afternoonActivities = (currentDay.activities || []).filter(a => a.slot === 'Afternoon');
  const eveningActivities = (currentDay.activities || []).filter(a => a.slot === 'Evening');
  const otherActivities = (currentDay.activities || []).filter(a => !['Morning', 'Afternoon', 'Evening'].includes(a.slot));

  return (
    <div className="space-y-6">
      
      {/* Day Selector Tabs Strip */}
      <div className="bg-white rounded-2xl p-2 sm:p-3 border border-slate-200/90 shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar no-print">
        {trip.days.map((day, idx) => {
          const isActive = idx === selectedDayIndex;
          return (
            <button
              key={day.dayNumber || idx}
              onClick={() => onSelectDay(idx)}
              className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-xs transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {day.dayNumber || idx + 1}
              </span>
              <div className="text-left">
                <div className="font-bold whitespace-nowrap">Day {day.dayNumber || idx + 1}</div>
                <div className={`text-[10px] truncate max-w-[120px] ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                  {day.theme || day.date}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Day Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentDay.date || `Day ${currentDay.dayNumber}`}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {currentDay.theme || `Day ${currentDay.dayNumber} Exploration`}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Daily Total Cost Pill */}
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Est. Day Cost: ${currentDay.dayTotalCost || 0}</span>
            </div>

            {/* Regenerate Day Action Button */}
            <button
              onClick={() => onRegenerateDay(currentDay.dayNumber)}
              disabled={isRegeneratingDay}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 transition-all disabled:opacity-50 no-print"
              title="Regenerate this specific day using AI"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isRegeneratingDay ? 'animate-spin text-indigo-600' : 'text-slate-500'}`} />
              <span>{isRegeneratingDay ? 'Regenerating...' : 'Regenerate Day'}</span>
            </button>
          </div>
        </div>

        {/* Tips Banner */}
        {currentDay.tips && (
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
            <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">Local Pro Tip:</span> {currentDay.tips}
            </div>
          </div>
        )}
      </div>

      {/* Main Two-Column Layout: Timeline Activities on Left, Dining on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Timeline (Morning, Afternoon, Evening) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Morning Slot */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-200">
            <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-600 shadow-sm">
              <Sunrise className="w-4 h-4" />
            </div>
            
            <div className="flex items-center justify-between mb-3.5">
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-700">Morning</h3>
                <p className="text-xs text-slate-400">Early starts, culture walks, and scenic highlights</p>
              </div>
              <button
                onClick={() => onAddActivity('Morning')}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded-md transition-colors no-print"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>

            <div className="space-y-3">
              {morningActivities.length > 0 ? (
                morningActivities.map(act => (
                  <ActivityCard
                    key={act.id}
                    activity={act}
                    onEdit={onEditActivity}
                    onDelete={onDeleteActivity}
                  />
                ))
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-slate-200 text-xs text-slate-400 text-center">
                  No morning activities scheduled.
                </div>
              )}
            </div>
          </div>

          {/* Afternoon Slot */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-sky-200">
            <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-sky-100 border-2 border-sky-400 flex items-center justify-center text-sky-600 shadow-sm">
              <Sun className="w-4 h-4" />
            </div>

            <div className="flex items-center justify-between mb-3.5">
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-sky-700">Afternoon</h3>
                <p className="text-xs text-slate-400">Sightseeing, workshops, markets, and adventures</p>
              </div>
              <button
                onClick={() => onAddActivity('Afternoon')}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded-md transition-colors no-print"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>

            <div className="space-y-3">
              {afternoonActivities.length > 0 ? (
                afternoonActivities.map(act => (
                  <ActivityCard
                    key={act.id}
                    activity={act}
                    onEdit={onEditActivity}
                    onDelete={onDeleteActivity}
                  />
                ))
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-slate-200 text-xs text-slate-400 text-center">
                  No afternoon activities scheduled.
                </div>
              )}
            </div>
          </div>

          {/* Evening Slot */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-200">
            <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-indigo-100 border-2 border-indigo-400 flex items-center justify-center text-indigo-600 shadow-sm">
              <Moon className="w-4 h-4" />
            </div>

            <div className="flex items-center justify-between mb-3.5">
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-indigo-700">Evening</h3>
                <p className="text-xs text-slate-400">Sunset viewpoints, culinary feasts, and twilight ambiance</p>
              </div>
              <button
                onClick={() => onAddActivity('Evening')}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded-md transition-colors no-print"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>

            <div className="space-y-3">
              {eveningActivities.length > 0 ? (
                eveningActivities.map(act => (
                  <ActivityCard
                    key={act.id}
                    activity={act}
                    onEdit={onEditActivity}
                    onDelete={onDeleteActivity}
                  />
                ))
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-slate-200 text-xs text-slate-400 text-center">
                  No evening activities scheduled.
                </div>
              )}
            </div>
          </div>

          {/* Uncategorized or Extra Activities */}
          {otherActivities.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Additional Activities</h4>
              {otherActivities.map(act => (
                <ActivityCard
                  key={act.id}
                  activity={act}
                  onEdit={onEditActivity}
                  onDelete={onDeleteActivity}
                />
              ))}
            </div>
          )}

        </div>

        {/* Right 1 Col: Curated Dining Recommendations */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm sticky top-24">
            
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <Utensils className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Dining Recommendations</h3>
                <p className="text-[11px] text-slate-400">Curated local flavors for Day {currentDay.dayNumber}</p>
              </div>
            </div>

            <div className="space-y-4">
              
              {/* Lunch */}
              {currentDay.dining?.lunch && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-orange-200 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                      Lunch Recommendation
                    </span>
                    <span className="text-xs font-bold text-slate-600">
                      {currentDay.dining.lunch.price || '$$'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                    {currentDay.dining.lunch.name}
                  </h4>
                  <p className="text-xs font-medium text-slate-500 mb-1.5">
                    {currentDay.dining.lunch.cuisine}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {currentDay.dining.lunch.desc}
                  </p>
                  {currentDay.dining.lunch.estimatedCost && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Estimated per person</span>
                      <span className="font-semibold text-emerald-600">${currentDay.dining.lunch.estimatedCost}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Dinner */}
              {currentDay.dining?.dinner && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Dinner Recommendation
                    </span>
                    <span className="text-xs font-bold text-slate-600">
                      {currentDay.dining.dinner.price || '$$$'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                    {currentDay.dining.dinner.name}
                  </h4>
                  <p className="text-xs font-medium text-slate-500 mb-1.5">
                    {currentDay.dining.dinner.cuisine}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {currentDay.dining.dinner.desc}
                  </p>
                  {currentDay.dining.dinner.estimatedCost && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Estimated per person</span>
                      <span className="font-semibold text-emerald-600">${currentDay.dining.dinner.estimatedCost}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Cafe / Snack */}
              {currentDay.dining?.snackOrCafe && (
                <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/60 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 mb-1">
                    <Coffee className="w-3.5 h-3.5 text-amber-600" />
                    <span>Cafe & Local Bite</span>
                  </div>
                  <p className="font-semibold text-slate-800">{currentDay.dining.snackOrCafe.name}</p>
                  <p className="text-slate-600 mt-0.5 text-[11px]">{currentDay.dining.snackOrCafe.desc}</p>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
