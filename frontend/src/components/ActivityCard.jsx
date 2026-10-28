import React from 'react';
import { Clock, MapPin, DollarSign, Edit3, Trash2, Tag, Compass } from 'lucide-react';

const TAG_STYLES = {
  Food: { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  Sightseeing: { bg: 'bg-sky-50 text-sky-700 border-sky-200', dot: 'bg-sky-500' },
  Adventure: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  Culture: { bg: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
  Relax: { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
};

export default function ActivityCard({ activity, onEdit, onDelete }) {
  const tagStyle = TAG_STYLES[activity.tag] || {
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    dot: 'bg-slate-500',
  };

  return (
    <div className="activity-card group relative bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200">
      
      {/* Top Header: Time, Tag, and Actions */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          {/* Time Badge */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            {activity.time}
          </span>

          {/* Duration Badge */}
          {activity.duration && (
            <span className="text-[11px] font-medium text-slate-400">
              ({activity.duration})
            </span>
          )}

          {/* Interest Tag */}
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${tagStyle.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${tagStyle.dot}`} />
            {activity.tag}
          </span>
        </div>

        {/* Action Buttons (Edit / Delete) */}
        <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity no-print">
          <button
            onClick={() => onEdit(activity)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            title="Edit activity details"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(activity.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Remove activity"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Activity Title */}
      <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1.5">
        {activity.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed mb-3">
        {activity.description}
      </p>

      {/* Footer: Location & Estimated Cost */}
      <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-1 text-slate-500 truncate max-w-[220px] sm:max-w-xs">
          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{activity.location}</span>
        </div>

        <div className="flex items-center gap-1 font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
          <DollarSign className="w-3 h-3 text-emerald-500" />
          <span>{activity.estimatedCost > 0 ? `$${activity.estimatedCost}` : 'Free'}</span>
        </div>
      </div>

    </div>
  );
}
