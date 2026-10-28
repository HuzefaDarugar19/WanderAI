# 🌍 WanderAI — AI Travel Itinerary Planner

> **Generate bespoke multi-day travel itineraries in seconds.**  
> WanderAI is a full-stack, lightweight AI travel planner featuring a stunning React dashboard, a FastAPI mock-AI backend, and localStorage-backed trip storage.

![WanderAI Banner](https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

### 🗺️ Trip Builder
- Input **Destination**, **Travel Dates**, **Budget Level** (Budget / Mid / Luxury)
- Choose **Traveler Type** (Solo / Couple / Group)
- Select **Interest Tags** — Food, Sightseeing, Adventure, Relax, Culture

### 📅 Itinerary View
- **Timeline layout** — Morning, Afternoon, Evening slots per day
- **Dining recommendations** — Lunch, Dinner, Café/Snack picks per day
- **Estimated costs** per activity and daily totals
- **Edit activity** — Modify title, time, cost, tag, and description
- **Add activity** — Add custom activities to any time slot
- **Delete activity** — Remove any planned activity
- **Regenerate Day** — Re-roll a day's plan via AI backend
- **Export PDF** — Print-optimized layout for offline use

### ⚡ One-Click Preset Scenarios
| Preset | Destination | Duration | Style |
|--------|-------------|----------|-------|
| **Solo Weekend Rush** | Tokyo, Japan | 2 Days | Budget · Food & Sightseeing |
| **Romantic Couple Escape** | Amalfi Coast, Italy | 4 Days | Luxury · Relax & Scenic |
| **Group Expedition** | Costa Rica | 5 Days | Mid-Range · Adventure & Culture |

### 💾 Mock Supabase Storage
- Lightweight mock client replicating Supabase query-builder API
- Persists trips to browser `localStorage` — no external DB needed
- Supports `select`, `insert`, `update`, `delete`, `eq`, `order`, `limit`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite |
| **Styling** | Tailwind CSS v3 |
| **Icons** | Lucide React |
| **Backend** | FastAPI (Python 3.11+) |
| **Server** | Uvicorn (ASGI) |
| **Storage** | Mock Supabase (localStorage) |
| **Fonts** | Plus Jakarta Sans (Google Fonts) |

---

## 📁 Project Structure

```
travelApp/
├── backend/
│   ├── main.py               # FastAPI app — endpoints & mock AI generator
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx               # Root component — state, routing, API calls
│       ├── index.css             # Tailwind base + custom styles
│       ├── components/
│       │   ├── Navbar.jsx            # Top nav with preset buttons & actions
│       │   ├── TripHeader.jsx        # Hero banner with cover image & stats
│       │   ├── DayTimeline.jsx       # Day selector tabs + Morning/Afternoon/Evening slots
│       │   ├── ActivityCard.jsx      # Individual activity card with edit/delete
│       │   ├── PresetSwitcher.jsx    # One-click demo scenario selector
│       │   ├── TripModal.jsx         # New trip builder modal form
│       │   └── EditActivityModal.jsx # Add/edit individual activity modal
│       ├── data/
│       │   └── presetData.js         # Rich curated preset trips (Solo/Couple/Group)
│       └── lib/
│           └── mockSupabase.js       # localStorage-backed Supabase mock client
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ and **npm** v9+
- **Python** 3.11+

---

### 1️⃣ Backend — FastAPI Server

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the server (runs on http://127.0.0.1:8000)
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

**Available API Endpoints:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server health check |
| `GET` | `/api/presets` | Fetch all 3 preset itineraries |
| `POST` | `/api/generate-itinerary` | Generate a custom AI trip |
| `POST` | `/api/regenerate-day` | Regenerate a single trip day |

> 📖 Interactive docs available at [`http://127.0.0.1:8000/docs`](http://127.0.0.1:8000/docs)

---

### 2️⃣ Frontend — React + Vite Dev Server

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server (runs on http://localhost:5173)
npm run dev
```

Then open **[http://localhost:5173](http://localhost:5173)** in your browser.

> ⚠️ **Note:** The frontend runs standalone with full client-side fallbacks even without the backend running. The backend enhances trip generation with richer AI-templated data.

---

### 3️⃣ Build for Production

```bash
cd frontend
npm run build
# Output in: frontend/dist/
```

---

## 🎮 Usage Guide

### Try the Demo Presets
Click any of the three preset cards at the top of the dashboard:
- **Solo Weekend Rush** → Budget Tokyo 2-day trip
- **Couple Romance** → Luxury Amalfi Coast 4-day escape
- **Group Expedition** → Mid-range Costa Rica 5-day adventure

### Generate a Custom Trip
1. Click **"New Trip"** in the top navbar
2. Enter your destination (e.g. `Kyoto, Japan`)
3. Set travel dates, budget level, traveler type, and interests
4. Click **"Generate Itinerary with AI"**

### Manage Activities
- **Edit**: Hover over any activity card → click the ✏️ pencil icon
- **Delete**: Hover over any activity card → click the 🗑️ trash icon
- **Add**: Click the **"+ Add"** button next to any time slot header

### Regenerate a Day
Click **"Regenerate Day"** inside the Day header to get fresh activities and dining recommendations for that specific day.

### Export to PDF
Click **"Export PDF"** in the navbar or trip header — opens the browser print dialog with a clean, print-optimized layout.

---

## 🔧 Configuration

### Changing the Backend URL
If deploying to a different host, update `API_BASE_URL` in [`frontend/src/App.jsx`](frontend/src/App.jsx):

```js
const API_BASE_URL = 'http://127.0.0.1:8000'; // Change to your deployed URL
```

### Adding Real Supabase
Replace the mock client in [`frontend/src/lib/mockSupabase.js`](frontend/src/lib/mockSupabase.js) with:

```js
import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

---

## 📸 Screenshots

| Dashboard | Trip Builder Modal |
|-----------|-------------------|
| Preset switcher + hero banner + day timeline | Destination, dates, budget & interest selector |

---

## 📄 License

MIT License — feel free to use, fork, and modify for personal or commercial projects.

---

## 🙏 Credits

- Cover images via [Unsplash](https://unsplash.com)
- Icons via [Lucide React](https://lucide.dev)
- Fonts via [Google Fonts](https://fonts.google.com) (Plus Jakarta Sans)
- UI inspired by modern travel apps and glassmorphism design trends
