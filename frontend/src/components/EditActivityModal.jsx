import React, { useState, useEffect } from 'react';
import { X, Clock, MapPin, DollarSign, Tag, Check, Sparkles } from 'lucide-react';

const TAG_OPTIONS = ['Food', 'Sightseeing', 'Adventure', 'Relax', 'Culture'];
const SLOT_OPTIONS = ['Morning', 'Afternoon', 'Evening'];

export default function EditActivityModal({
  isOpen,
  onClose,
  activity,
  defaultSlot = 'Morning',
  onSave
}) {
  if (!isOpen) return null;

  const isNew = !activity?.id;

  const [title, setTitle] = useState('');
  const [slot, setSlot] = useState(defaultSlot);
  const [time, setTime] = useState('09:00 AM');
  const [duration, setDuration] = useState('2 hrs');
  const [location, setLocation] = useState('');
  const [tag, setTag] = useState('Sightseeing');
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (activity) {
      setTitle(activity.title || '');
      setSlot(activity.slot || defaultSlot);
      setTime(activity.time || '09:00 AM');
      setDuration(activity.duration || '2 hrs');
      setLocation(activity.location || '');
      setTag(activity.tag || 'Sightseeing');
      setEstimatedCost(activity.estimatedCost || 0);
      setDescription(activity.description || '');
    } else {
      setTitle('');
      setSlot(defaultSlot);
      setTime(defaultSlot === 'Morning' ? '09:00 AM' : defaultSlot === 'Afternoon' ? '02:00 PM' : '07:00 PM');
      setDuration('2 hrs');
      setLocation('');
      setTag('Sightseeing');
      setEstimatedCost(15);
      setDescription('');
    }
  }, [activity, defaultSlot]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: activity?.id || `act-${Date.now()}`,
      title: title.trim(),
      slot,
      time,
      duration,
      location: location.trim() || 'Central District',
      tag,
      estimatedCost: parseFloat(estimatedCost) || 0,
      description: description.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base">
              {isNew ? 'Add Custom Activity' : 'Edit Activity'}
            </h3>
            <p className="text-xs text-slate-400">Customize timing, costs, and description</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Activity Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Guided Sunrise Temple Tour"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
            />
          </div>

          {/* Slot & Time & Duration */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Time Slot
              </label>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium"
              >
                {SLOT_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Time
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="09:00 AM"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="2 hrs"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium"
              />
            </div>
          </div>

          {/* Location & Cost */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Asakusa District"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Est. Cost (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-medium"
                />
              </div>
            </div>
          </div>

          {/* Tag */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Category Tag
            </label>
            <div className="flex flex-wrap gap-1.5">
              {TAG_OPTIONS.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTag(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    tag === t
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Description & Highlights
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide context or key tips for this spot..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200"
            >
              Save Activity
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
