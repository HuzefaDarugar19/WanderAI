import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TripHeader from './components/TripHeader';
import DayTimeline from './components/DayTimeline';
import PresetSwitcher from './components/PresetSwitcher';
import TripModal from './components/TripModal';
import EditActivityModal from './components/EditActivityModal';
import { PRESETS } from './data/presetData';
import { supabase } from './lib/mockSupabase';

const API_BASE_URL = 'http://127.0.0.1:8000';

export default function App() {
  const [currentTrip, setCurrentTrip] = useState(PRESETS.solo);
  const [savedTrips, setSavedTrips] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [isNewTripModalOpen, setIsNewTripModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegeneratingDay, setIsRegeneratingDay] = useState(false);
  
  // Modal states for edit/add activity
  const [editingActivity, setEditingActivity] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [addActivitySlot, setAddActivitySlot] = useState('Morning');

  // Load trips from Mock Supabase on mount
  useEffect(() => {
    async function loadTrips() {
      try {
        const { data } = await supabase.from('trips').select('*').order('createdAt', { ascending: false });
        if (data && data.length > 0) {
          setSavedTrips(data);
          setCurrentTrip(data[0]);
        } else {
          // Seed mock Supabase with default presets
          const initialPresets = [PRESETS.solo, PRESETS.couple, PRESETS.group];
          await supabase.from('trips').insert(initialPresets);
          setSavedTrips(initialPresets);
          setCurrentTrip(PRESETS.solo);
        }
      } catch (err) {
        console.warn('Could not load from mock Supabase:', err);
        setSavedTrips([PRESETS.solo, PRESETS.couple, PRESETS.group]);
      }
    }
    loadTrips();
  }, []);

  // Handle Preset Selection
  const handleSelectPreset = (presetKey) => {
    const selected = PRESETS[presetKey];
    if (!selected) return;

    setCurrentTrip(selected);
    setSelectedDayIndex(0);

    // Ensure it exists in savedTrips
    setSavedTrips(prev => {
      const exists = prev.find(t => t.id === selected.id);
      if (!exists) {
        supabase.from('trips').insert([selected]);
        return [selected, ...prev];
      }
      return prev;
    });
  };

  // Generate Trip via FastAPI backend (with fallback)
  const handleGenerateTrip = async (formData) => {
    setIsGenerating(true);
    try {
      let newTripData = null;

      try {
        const response = await fetch(`${API_BASE_URL}/api/generate-itinerary`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          newTripData = await response.json();
        }
      } catch (backendErr) {
        console.warn('Backend API unreachable, using client-side generator:', backendErr);
      }

      // If backend was unreachable or returned error, construct client-side
      if (!newTripData) {
        const startD = new Date(formData.startDate);
        const endD = new Date(formData.endDate);
        const daysCount = Math.max(1, Math.min(Math.round((endD - startD) / (1000 * 60 * 60 * 24)) + 1, 7));
        
        const days = [];
        let totalCost = 0;
        for (let i = 1; i <= daysCount; i++) {
          const dayCost = formData.budget === 'Luxury' ? 320 : formData.budget === 'Mid' ? 140 : 65;
          totalCost += dayCost;
          days.push({
            dayNumber: i,
            date: `Day ${i}`,
            theme: `${formData.destination} Highlights & Culture`,
            activities: [
              {
                id: `act-${Date.now()}-${i}-1`,
                slot: 'Morning',
                time: '09:00 AM',
                title: `Morning Exploration in ${formData.destination}`,
                description: `Discover historic center highlights and local architectural wonders.`,
                location: `${formData.destination} Old Quarter`,
                estimatedCost: formData.budget === 'Luxury' ? 50 : 20,
                tag: 'Sightseeing',
                duration: '2.5 hrs'
              },
              {
                id: `act-${Date.now()}-${i}-2`,
                slot: 'Afternoon',
                time: '02:00 PM',
                title: `Local Flavors & Artisan Market Walk`,
                description: `Sample regional specialties and browse artisanal boutiques.`,
                location: `${formData.destination} Center`,
                estimatedCost: formData.budget === 'Luxury' ? 80 : 30,
                tag: 'Food',
                duration: '2 hrs'
              },
              {
                id: `act-${Date.now()}-${i}-3`,
                slot: 'Evening',
                time: '07:00 PM',
                title: `Sunset Lookout & Evening Promenade`,
                description: `Enjoy scenic twilight views and chilled drinks at a rooftop terrace.`,
                location: `${formData.destination} Belvedere`,
                estimatedCost: formData.budget === 'Luxury' ? 100 : 35,
                tag: 'Relax',
                duration: '2 hrs'
              }
            ],
            dining: {
              lunch: { name: 'Regional Market Bistro', cuisine: 'Fresh Seasonal', price: '$$', desc: 'Lively lunch spot popular with locals.' },
              dinner: { name: 'Candlelit Old Town Trattoria', cuisine: 'Classic Regional', price: '$$$', desc: 'Intimate atmosphere with fine local wine.' },
              snackOrCafe: { name: 'Artisan Cafe', desc: 'Espresso & fresh pastry' }
            },
            dayTotalCost: dayCost,
            tips: 'Wear comfortable walking shoes and keep a light transit pass handy.'
          });
        }

        newTripData = {
          id: `trip-${Date.now()}`,
          title: `${formData.destination} ${daysCount}-Day ${formData.travelerType} Journey`,
          destination: formData.destination,
          startDate: formData.startDate,
          endDate: formData.endDate,
          durationDays: daysCount,
          budget: formData.budget,
          travelerType: formData.travelerType,
          interests: formData.interests,
          totalEstimatedCost: totalCost,
          currency: 'USD',
          summary: `Bespoke ${daysCount}-day itinerary in ${formData.destination} customized for a ${formData.budget} budget.`,
          coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
          days,
          createdAt: new Date().toISOString()
        };
      }

      // Save to Mock Supabase
      await supabase.from('trips').insert([newTripData]);

      // Update State
      setCurrentTrip(newTripData);
      setSavedTrips(prev => [newTripData, ...prev]);
      setSelectedDayIndex(0);
      setIsNewTripModalOpen(false);

    } catch (err) {
      console.error('Error generating trip:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Regenerate specific day via FastAPI backend
  const handleRegenerateDay = async (dayNumber) => {
    setIsRegeneratingDay(true);
    try {
      let regeneratedDay = null;

      try {
        const response = await fetch(`${API_BASE_URL}/api/regenerate-day`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            destination: currentTrip.destination,
            dayNumber: dayNumber,
            budget: currentTrip.budget,
            travelerType: currentTrip.travelerType,
            interests: currentTrip.interests || ['Sightseeing', 'Food']
          }),
        });
        if (response.ok) {
          regeneratedDay = await response.json();
        }
      } catch (backendErr) {
        console.warn('Backend unavailable for day regeneration, using fallback:', backendErr);
      }

      // Fallback if backend wasn't available
      if (!regeneratedDay) {
        const existingDay = currentTrip.days.find(d => d.dayNumber === dayNumber) || currentTrip.days[0];
        regeneratedDay = {
          ...existingDay,
          theme: `Refreshed ${currentTrip.destination} Highlights & Hidden Corners`,
          activities: [
            {
              id: `act-ref-${Date.now()}-1`,
              slot: 'Morning',
              time: '08:45 AM',
              title: `Scenic Panorama & Landmark Walk in ${currentTrip.destination}`,
              description: 'Beat the crowds to experience panoramic city views and historic architecture.',
              location: `${currentTrip.destination} Central`,
              estimatedCost: currentTrip.budget === 'Luxury' ? 45 : 15,
              tag: 'Sightseeing',
              duration: '2.5 hrs'
            },
            {
              id: `act-ref-${Date.now()}-2`,
              slot: 'Afternoon',
              time: '01:45 PM',
              title: `Artisanal Tasting & Craft Workshop`,
              description: 'Hands-on cultural experience sampling regional delicacies and visiting craft studios.',
              location: `${currentTrip.destination} Artisan Quarter`,
              estimatedCost: currentTrip.budget === 'Luxury' ? 90 : 35,
              tag: 'Culture',
              duration: '2.5 hrs'
            },
            {
              id: `act-ref-${Date.now()}-3`,
              slot: 'Evening',
              time: '07:15 PM',
              title: `Waterfront Sunset Drinks & Live Jazz`,
              description: 'Relax with ambient music and signature local beverages at a lively lounge.',
              location: `${currentTrip.destination} Waterfront`,
              estimatedCost: currentTrip.budget === 'Luxury' ? 85 : 30,
              tag: 'Relax',
              duration: '2 hrs'
            }
          ]
        };
      }

      // Replace day in current trip
      const updatedDays = currentTrip.days.map(d => (d.dayNumber === dayNumber ? regeneratedDay : d));
      const newTotalCost = updatedDays.reduce((acc, d) => acc + (d.dayTotalCost || 0), 0);

      const updatedTrip = {
        ...currentTrip,
        days: updatedDays,
        totalEstimatedCost: Math.round(newTotalCost)
      };

      setCurrentTrip(updatedTrip);

      // Persist in mock Supabase
      await supabase.from('trips').update(updatedTrip).eq('id', currentTrip.id);
      setSavedTrips(prev => prev.map(t => (t.id === currentTrip.id ? updatedTrip : t)));

    } catch (err) {
      console.error('Error regenerating day:', err);
    } finally {
      setIsRegeneratingDay(false);
    }
  };

  // Add/Edit Activity Handler
  const handleSaveActivity = async (activityData) => {
    if (!currentTrip || !currentTrip.days) return;

    const currentDay = currentTrip.days[selectedDayIndex];
    if (!currentDay) return;

    let updatedActivities = [...(currentDay.activities || [])];
    const existingIdx = updatedActivities.findIndex(a => a.id === activityData.id);

    if (existingIdx >= 0) {
      // Update existing
      updatedActivities[existingIdx] = activityData;
    } else {
      // Add new
      updatedActivities.push(activityData);
    }

    // Recalculate day cost
    const activitiesCost = updatedActivities.reduce((acc, a) => acc + (parseFloat(a.estimatedCost) || 0), 0);
    const lunchCost = currentDay.dining?.lunch?.estimatedCost || 20;
    const dinnerCost = currentDay.dining?.dinner?.estimatedCost || 35;
    const newDayCost = Math.round(activitiesCost + lunchCost + dinnerCost);

    const updatedDay = {
      ...currentDay,
      activities: updatedActivities,
      dayTotalCost: newDayCost
    };

    const updatedDays = currentTrip.days.map((d, idx) => (idx === selectedDayIndex ? updatedDay : d));
    const newTotalCost = Math.round(updatedDays.reduce((acc, d) => acc + (d.dayTotalCost || 0), 0));

    const updatedTrip = {
      ...currentTrip,
      days: updatedDays,
      totalEstimatedCost: newTotalCost
    };

    setCurrentTrip(updatedTrip);
    await supabase.from('trips').update(updatedTrip).eq('id', currentTrip.id);
    setSavedTrips(prev => prev.map(t => (t.id === currentTrip.id ? updatedTrip : t)));
  };

  // Delete Activity Handler
  const handleDeleteActivity = async (activityId) => {
    if (!currentTrip || !currentTrip.days) return;

    const currentDay = currentTrip.days[selectedDayIndex];
    if (!currentDay) return;

    const updatedActivities = (currentDay.activities || []).filter(a => a.id !== activityId);
    const activitiesCost = updatedActivities.reduce((acc, a) => acc + (parseFloat(a.estimatedCost) || 0), 0);
    const lunchCost = currentDay.dining?.lunch?.estimatedCost || 20;
    const dinnerCost = currentDay.dining?.dinner?.estimatedCost || 35;
    const newDayCost = Math.round(activitiesCost + lunchCost + dinnerCost);

    const updatedDay = {
      ...currentDay,
      activities: updatedActivities,
      dayTotalCost: newDayCost
    };

    const updatedDays = currentTrip.days.map((d, idx) => (idx === selectedDayIndex ? updatedDay : d));
    const newTotalCost = Math.round(updatedDays.reduce((acc, d) => acc + (d.dayTotalCost || 0), 0));

    const updatedTrip = {
      ...currentTrip,
      days: updatedDays,
      totalEstimatedCost: newTotalCost
    };

    setCurrentTrip(updatedTrip);
    await supabase.from('trips').update(updatedTrip).eq('id', currentTrip.id);
    setSavedTrips(prev => prev.map(t => (t.id === currentTrip.id ? updatedTrip : t)));
  };

  // Trigger browser print/export
  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        currentTrip={currentTrip}
        savedTrips={savedTrips}
        onSelectTrip={(trip) => {
          setCurrentTrip(trip);
          setSelectedDayIndex(0);
        }}
        onOpenNewTripModal={() => setIsNewTripModalOpen(true)}
        onSelectPreset={handleSelectPreset}
        onExportPdf={handleExportPdf}
        isGenerating={isGenerating}
      />

      {/* Main Dashboard View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Preset Scenario Switcher Banner */}
        <PresetSwitcher
          activePresetId={currentTrip?.id}
          onSelectPreset={handleSelectPreset}
        />

        {/* Hero Trip Header */}
        <TripHeader
          trip={currentTrip}
          onOpenNewTripModal={() => setIsNewTripModalOpen(true)}
          onExportPdf={handleExportPdf}
        />

        {/* Day Timeline & Activities */}
        <DayTimeline
          trip={currentTrip}
          selectedDayIndex={selectedDayIndex}
          onSelectDay={(idx) => setSelectedDayIndex(idx)}
          onEditActivity={(act) => {
            setEditingActivity(act);
            setIsEditModalOpen(true);
          }}
          onDeleteActivity={handleDeleteActivity}
          onAddActivity={(slot) => {
            setEditingActivity(null);
            setAddActivitySlot(slot);
            setIsEditModalOpen(true);
          }}
          onRegenerateDay={handleRegenerateDay}
          isRegeneratingDay={isRegeneratingDay}
        />

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-400 no-print">
        <p>WanderAI Travel Planner • Built with React, Tailwind CSS, FastAPI & Mock Supabase</p>
      </footer>

      {/* Trip Builder Modal */}
      <TripModal
        isOpen={isNewTripModalOpen}
        onClose={() => setIsNewTripModalOpen(false)}
        onGenerate={handleGenerateTrip}
        isGenerating={isGenerating}
      />

      {/* Edit / Add Activity Modal */}
      <EditActivityModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingActivity(null);
        }}
        activity={editingActivity}
        defaultSlot={addActivitySlot}
        onSave={handleSaveActivity}
      />

    </div>
  );
}
