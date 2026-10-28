import React from 'react';
import { Zap, Heart, Users, ArrowRight, Sparkles } from 'lucide-react';

export default function PresetSwitcher({ activePresetId, onSelectPreset }) {
  const presets = [
    {
      id: 'solo',
      title: 'Solo Weekend Rush',
      subtitle: '2-Day Fast Getaway',
      desc: 'Focusing on ramen alleys, vintage shops & iconic landmarks with high velocity and budget-conscious pacing.',
      destination: 'Tokyo, Japan',
      budget: 'Budget ($)',
      traveler: 'Solo',
      days: 2,
      icon: Zap,
      accentColor: 'from-amber-500 to-orange-500',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
      checkId: 'solo'
    },
    {
      id: 'couple',
      title: 'Romantic Vacation',
      subtitle: '4-Day Scenic Romance',
      desc: 'Relaxed pacing, private Capri boat charters, clifftop dining, and romantic candlelit Mediterranean sunsets.',
      destination: 'Amalfi Coast, Italy',
      budget: 'Luxury ($$$)',
      traveler: 'Couple',
      days: 4,
      icon: Heart,
      accentColor: 'from-rose-500 to-pink-500',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
      checkId: 'couple'
    },
    {
      id: 'group',
      title: 'Group Expedition',
      subtitle: '5-Day Adventure & Culture',
      desc: 'Balanced adventure with volcano hikes, white-water rafting, catamaran sunset sails, and coordinated group sharing.',
      destination: 'Costa Rica',
      budget: 'Mid-Range ($$)',
      traveler: 'Group',
      days: 5,
      icon: Users,
      accentColor: 'from-emerald-500 to-teal-500',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      checkId: 'group'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm mb-8 no-print">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">One-Click Demo Scenarios</h3>
            <p className="text-xs text-slate-500">Switch instantly between tailored travel archetypes</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Instant Structured Datasets
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {presets.map((preset) => {
          const IconComponent = preset.icon;
          const isActive = activePresetId?.includes(preset.checkId);

          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              className={`relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                isActive
                  ? 'bg-gradient-to-br from-indigo-50/60 to-white border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                  : 'bg-slate-50/80 hover:bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${preset.accentColor} text-white flex items-center justify-center shadow-sm`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${preset.badgeBg}`}>
                    {preset.days} Days • {preset.traveler}
                  </span>
                </div>

                <h4 className="font-extrabold text-slate-900 text-sm mb-0.5 flex items-center gap-1.5">
                  <span>{preset.title}</span>
                </h4>
                <div className="text-xs font-semibold text-indigo-600 mb-2">
                  {preset.destination}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {preset.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500 font-medium">{preset.budget}</span>
                <span className={`inline-flex items-center gap-1 ${isActive ? 'text-indigo-600 font-bold' : 'text-slate-400 group-hover:text-slate-600'}`}>
                  {isActive ? 'Active Demo' : 'Load Demo'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
