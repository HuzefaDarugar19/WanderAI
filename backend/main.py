from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import random
import uuid
from datetime import datetime, timedelta

app = FastAPI(
    title="AI Travel Itinerary Planner API",
    version="1.0.0",
    description="Lightweight backend for generating structured AI travel itineraries"
)

# Enable CORS for frontend Vite dev server (usually port 5173 or any origin)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------------
# Data Models
# -------------------------------------------------------------
class Activity(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4())[:8])
    slot: str  # "Morning" | "Afternoon" | "Evening"
    time: str
    title: str
    description: str
    location: str
    estimatedCost: float
    tag: str  # "Food" | "Sightseeing" | "Adventure" | "Relax" | "Culture"
    duration: str

class Dining(BaseModel):
    lunch: dict
    dinner: dict
    snackOrCafe: Optional[dict] = None

class ItineraryDay(BaseModel):
    dayNumber: int
    date: str
    theme: str
    activities: List[Activity]
    dining: Dining
    dayTotalCost: float
    tips: str

class TripRequest(BaseModel):
    destination: str
    startDate: str
    endDate: str
    budget: str  # "Budget" | "Mid" | "Luxury"
    travelerType: str  # "Solo" | "Couple" | "Group"
    interests: List[str]

class RegenerateDayRequest(BaseModel):
    destination: str
    dayNumber: int
    budget: str
    travelerType: str
    interests: List[str]
    notes: Optional[str] = None

class Trip(BaseModel):
    id: str
    title: str
    destination: str
    startDate: str
    endDate: str
    durationDays: int
    budget: str
    travelerType: str
    interests: List[str]
    totalEstimatedCost: float
    currency: str = "USD"
    summary: str
    coverImage: str
    days: List[ItineraryDay]
    createdAt: str

# -------------------------------------------------------------
# Curated Destination Imagery & Catalogs
# -------------------------------------------------------------
CITY_IMAGES = {
    "tokyo": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    "paris": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    "amalfi": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    "costa rica": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    "barcelona": "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
    "kyoto": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    "rome": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    "bali": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    "new york": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
}

DEFAULT_IMAGE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"

def get_cover_image(destination: str) -> str:
    dest_lower = destination.lower()
    for key, url in CITY_IMAGES.items():
        if key in dest_lower:
            return url
    return DEFAULT_IMAGE

# Activity templates categorized by interest
ACTIVITY_POOL = {
    "Food": [
        {"title": "Artisanal Coffee & Morning Pastry Crawl", "slot": "Morning", "time": "09:00 AM", "duration": "1.5 hrs", "desc": "Sample single-origin roasts and freshly baked neighborhood pastries at an iconic bakery.", "cost_tier": [12, 25, 45]},
        {"title": "Historic Farmers Market & Gourmet Tasting Tour", "slot": "Afternoon", "time": "01:30 PM", "duration": "2.5 hrs", "desc": "Guided walk through lively stall rows tasting local cheeses, fresh fruits, cured delicacies, and street bites.", "cost_tier": [20, 48, 85]},
        {"title": "Chef-Led Culinary Masterclass & Wine Pairing", "slot": "Evening", "time": "06:30 PM", "duration": "3 hrs", "desc": "Hands-on evening making traditional signature dishes followed by a candlelit multi-course feast.", "cost_tier": [40, 85, 175]},
        {"title": "Night Food Street Exploration & Craft Drinks", "slot": "Evening", "time": "08:00 PM", "duration": "2.5 hrs", "desc": "Hit buzzing alleys for skewered delicacies, dumpling spots, and signature local craft brews.", "cost_tier": [18, 38, 70]}
    ],
    "Sightseeing": [
        {"title": "Panoramic City Viewpoint & Historic Landmark", "slot": "Morning", "time": "08:30 AM", "duration": "2 hrs", "desc": "Beat the crowds to capture sunrise views and explore landmark architectural wonders.", "cost_tier": [0, 15, 35]},
        {"title": "Old Quarter Walking Circuit & Hidden Courtyards", "slot": "Afternoon", "time": "02:00 PM", "duration": "2.5 hrs", "desc": "Stroll cobblestone lanes discovering secret gardens, preserved facades, and artisan workshops.", "cost_tier": [0, 20, 40]},
        {"title": "Sunset Cruise / Scenic Waterfront Promenade", "slot": "Evening", "time": "06:00 PM", "duration": "2 hrs", "desc": "Watch the golden hour light reflect across the water with spectacular skyline vistas.", "cost_tier": [15, 45, 110]}
    ],
    "Adventure": [
        {"title": "Ridge Trail Hike or Coastal Kayaking", "slot": "Morning", "time": "08:00 AM", "duration": "3 hrs", "desc": "Active morning expedition through dramatic natural cliffs with panoramic coastal views.", "cost_tier": [10, 45, 95]},
        {"title": "Electric Bike Safari to Scenic Valleys", "slot": "Afternoon", "time": "02:00 PM", "duration": "2.5 hrs", "desc": "Cruise across scenic backroads and rolling overlooks with effortless electric assist.", "cost_tier": [25, 55, 90]},
        {"title": "Twilight Night Kayak / Canopy Observation", "slot": "Evening", "time": "07:30 PM", "duration": "2 hrs", "desc": "Immersive wildlife and dusk adventure under starry skies with certified naturalists.", "cost_tier": [30, 60, 120]}
    ],
    "Culture": [
        {"title": "World-Class Heritage Museum & Guided Gallery Walk", "slot": "Morning", "time": "09:30 AM", "duration": "2.5 hrs", "desc": "Admire masterworks and ancient relics with insightful priority-access curator notes.", "cost_tier": [15, 30, 65]},
        {"title": "Traditional Craft Workshop (Pottery/Textiles)", "slot": "Afternoon", "time": "02:30 PM", "duration": "2 hrs", "desc": "Learn century-old artisanal techniques from a master craftsperson and create your own keepsake.", "cost_tier": [20, 45, 80]},
        {"title": "Classical Performance or Authentic Folk Music", "slot": "Evening", "time": "07:30 PM", "duration": "2 hrs", "desc": "Experience spellbinding live acoustic performance in a historic theater or courtyard.", "cost_tier": [25, 50, 120]}
    ],
    "Relax": [
        {"title": "Serene Botanical Gardens Meditation & Tea", "slot": "Morning", "time": "09:30 AM", "duration": "2 hrs", "desc": "Peaceful morning walk amidst exotic flora, soothing koi ponds, and organic herbal infusions.", "cost_tier": [5, 18, 35]},
        {"title": "Thermal Bath & Holistic Spa Ritual", "slot": "Afternoon", "time": "02:00 PM", "duration": "2.5 hrs", "desc": "Unwind in rejuvenating thermal mineral pools with restorative steam therapy and aromatherapy.", "cost_tier": [35, 75, 160]},
        {"title": "Rooftop Lounge Sunset Chill & Ambient Beats", "slot": "Evening", "time": "06:30 PM", "duration": "2.5 hrs", "desc": "Lounge above the city with plush seating, handcrafted mocktails/cocktails, and gentle ambient music.", "cost_tier": [20, 45, 90]}
    ]
}

DINING_OPTIONS = {
    "Budget": {
        "lunch": [
            {"name": "Local Market Canteen", "cuisine": "Authentic Regional", "price": "$", "desc": "Bustling neighborhood eatery serving hearty lunch sets loved by locals."},
            {"name": "Artisan Street Deli", "cuisine": "Fresh Sandwiches & Bowls", "price": "$", "desc": "Fast, high-quality seasonal focaccia and crisp garden salads."}
        ],
        "dinner": [
            {"name": "Cozy Family Trattoria / Bistro", "cuisine": "Homestyle Classics", "price": "$$", "desc": "Generous portions of freshly prepared traditional comfort recipes."},
            {"name": "Lantern-Lit Noodle Bar", "cuisine": "Hand-pulled Noodles & Broth", "price": "$", "desc": "Rich simmering broth and aromatic house-made dumplings."}
        ],
        "snackOrCafe": [
            {"name": "Corner Espresso Counter", "desc": "Velvety flat whites and crispy cinnamon pastry ($4)"}
        ]
    },
    "Mid": {
        "lunch": [
            {"name": "Sunlit Garden Brasserie", "cuisine": "Farm-to-Table European", "price": "$$", "desc": "Bright courtyard atmosphere serving locally harvested produce and wine."},
            {"name": "Seaside Bistro & Raw Bar", "cuisine": "Fresh Seafood & Crudo", "price": "$$", "desc": "Catch of the day grilled with lemon, herbs, and warm sourdough."}
        ],
        "dinner": [
            {"name": "Heritage Cellar Osteria", "cuisine": "Modern Regional Gastronomy", "price": "$$$", "desc": "Intimate vaulted stone cellar featuring curated sommelier pairings."},
            {"name": "Contemporary Fusion Atelier", "cuisine": "Chef's Modern Plate", "price": "$$$", "desc": "Creative culinary twists blending traditional spices with modern techniques."}
        ],
        "snackOrCafe": [
            {"name": "Patisserie & Specialty Roasters", "desc": "Artisan matcha latte & pistachio cream tart ($9)"}
        ]
    },
    "Luxury": {
        "lunch": [
            {"name": "Cliffside Panoramic Terrace", "cuisine": "Mediterranean Fine Dining", "price": "$$$", "desc": "Breathtaking cliff views paired with champagne and black truffle carpaccio."},
            {"name": "Michelin Star Veranda", "cuisine": "Elevated Seasonal Degustation", "price": "$$$", "desc": "Artful multi-course lunch celebrating rare regional delicacies."}
        ],
        "dinner": [
            {"name": "Grand Pavilion Michelin Restaurant", "cuisine": "Haute Gastronomy & Grand Cru", "price": "$$$$", "desc": "World-renowned dining experience with bespoke personalized wine flight."},
            {"name": "Private Waterfront Dining Salon", "cuisine": "Exclusive Tasting Menu", "price": "$$$$", "desc": "Chauffeured arrival, private balcony seating, and customized sommelier service."}
        ],
        "snackOrCafe": [
            {"name": "Grand Hotel Palm Court", "desc": "Traditional high tea service with champagne & warm scones ($28)"}
        ]
    }
}

THEMES = [
    "Historic Landmarks & Secret Courtyards",
    "Culinary Gems & Vibrant Food Alleys",
    "Scenic Heights & Sunset Panoramas",
    "Artisan Workshops & Cultural Heritage",
    "Coastal Serenity & Waterfront Walks",
    "Hidden Gems & Local Neighborhood Vibe",
    "Nature Immersion & Sunset Relaxation"
]

def generate_day_content(destination: str, day_num: int, date_str: str, budget: str, traveler_type: str, interests: List[str]) -> ItineraryDay:
    tier_idx = 0 if budget == "Budget" else (1 if budget == "Mid" else 2)
    selected_interests = interests if interests else ["Sightseeing", "Food", "Culture"]
    
    # Pick theme
    theme = THEMES[(day_num - 1) % len(THEMES)]
    
    # Generate 3 activities (Morning, Afternoon, Evening)
    slots = ["Morning", "Afternoon", "Evening"]
    activities: List[Activity] = []
    total_day_cost = 0.0

    for idx, slot in enumerate(slots):
        # Pick relevant interest tag
        interest_tag = selected_interests[(day_num + idx) % len(selected_interests)]
        pool = ACTIVITY_POOL.get(interest_tag, ACTIVITY_POOL["Sightseeing"])
        slot_candidates = [act for act in pool if act["slot"] == slot]
        if not slot_candidates:
            slot_candidates = pool
        
        chosen = random.choice(slot_candidates)
        cost = float(chosen["cost_tier"][tier_idx])
        
        # Adjust slightly for traveler type (e.g. Group gets small bundle/sharing factor or multiplied)
        multiplier = 1.0
        if traveler_type == "Group":
            # cost per person in group context
            cost = round(cost * 0.9, 1)

        activities.append(
            Activity(
                slot=slot,
                time=chosen["time"],
                title=f"{chosen['title']} in {destination}",
                description=chosen["desc"],
                location=f"{destination} Central & District {idx+1}",
                estimatedCost=cost,
                tag=interest_tag,
                duration=chosen["duration"]
            )
        )
        total_day_cost += cost

    # Pick Dining
    dining_catalog = DINING_OPTIONS.get(budget, DINING_OPTIONS["Mid"])
    lunch_opt = random.choice(dining_catalog["lunch"])
    dinner_opt = random.choice(dining_catalog["dinner"])
    snack_opt = random.choice(dining_catalog["snackOrCafe"])

    lunch_cost = 15 if budget == "Budget" else (35 if budget == "Mid" else 75)
    dinner_cost = 25 if budget == "Budget" else (65 if budget == "Mid" else 150)
    total_day_cost += (lunch_cost + dinner_cost)

    tips_pool = [
        f"Wear comfortable shoes for walking around {destination}.",
        f"Book evening dining 24-hours ahead to secure prime window seats.",
        f"Keep local transport transit card or contactless payment handy.",
        f"Early morning is the best time for photos before crowds arrive.",
        f"Carry a light reusable water bottle and an umbrella just in case."
    ]

    return ItineraryDay(
        dayNumber=day_num,
        date=date_str,
        theme=theme,
        activities=activities,
        dining=Dining(
            lunch={**lunch_opt, "estimatedCost": lunch_cost},
            dinner={**dinner_opt, "estimatedCost": dinner_cost},
            snackOrCafe=snack_opt
        ),
        dayTotalCost=round(total_day_cost, 2),
        tips=random.choice(tips_pool)
    )

# -------------------------------------------------------------
# Endpoints
# -------------------------------------------------------------
@app.get("/api/health")
def health_check():
    return {"status": "ok", "app": "AI Travel Itinerary Planner", "timestamp": datetime.now().isoformat()}

@app.get("/api/presets")
def get_presets():
    """Return pre-configured 3 presets: Solo, Couple, Group"""
    return {
        "solo": {
            "id": "preset-solo-tokyo",
            "title": "Tokyo 48-Hour Weekend Rush",
            "destination": "Tokyo, Japan",
            "startDate": "2026-11-07",
            "endDate": "2026-11-08",
            "durationDays": 2,
            "budget": "Budget",
            "travelerType": "Solo",
            "interests": ["Food", "Sightseeing"],
            "totalEstimatedCost": 178.0,
            "currency": "USD",
            "summary": "Fast-paced, budget-smart solo escape maximizing famous ramen spots, neon alleys, vintage thrifting, and iconic viewpoints.",
            "coverImage": CITY_IMAGES["tokyo"],
            "createdAt": "2026-10-28T10:00:00Z",
            "days": [
                {
                    "dayNumber": 1,
                    "date": "Day 1 (Saturday)",
                    "theme": "Neon Lights, Ramen Alleys & Shibuya Beat",
                    "activities": [
                        {
                            "id": "act-s1",
                            "slot": "Morning",
                            "time": "08:30 AM",
                            "title": "Meiji Jingu Shrine & Yoyogi Morning Walk in Tokyo",
                            "description": "Quiet forested stroll through century-old cedar trees before the city wakes up.",
                            "location": "Shibuya / Harajuku",
                            "estimatedCost": 0.0,
                            "tag": "Culture",
                            "duration": "1.5 hrs"
                        },
                        {
                            "id": "act-s2",
                            "slot": "Afternoon",
                            "time": "01:30 PM",
                            "title": "Shinjuku Gyoen & Vintage Shopping in Tokyo",
                            "description": "Explore lush garden greenhouses followed by vintage record stores in Shimokitazawa.",
                            "location": "Shinjuku & Shimokitazawa",
                            "estimatedCost": 15.0,
                            "tag": "Sightseeing",
                            "duration": "3 hrs"
                        },
                        {
                            "id": "act-s3",
                            "slot": "Evening",
                            "time": "07:30 PM",
                            "title": "Omoide Yokocho Food Stalls & Golden Gai",
                            "description": "Hop between cozy yakitori taverns and lively counter-service speakeasies.",
                            "location": "Memory Lane, Shinjuku",
                            "estimatedCost": 22.0,
                            "tag": "Food",
                            "duration": "2.5 hrs"
                        }
                    ],
                    "dining": {
                        "lunch": {"name": "Fuunji Tsukemen", "cuisine": "Rich Dipping Ramen", "price": "$", "desc": "Famous counter ramen stall with velvety chicken fish broth.", "estimatedCost": 12.0},
                        "dinner": {"name": "Torikizoku Yakitori", "cuisine": "Grilled Skewers", "price": "$", "desc": "High-value, quick-fire grilled yakitori skewers and draft beer.", "estimatedCost": 20.0},
                        "snackOrCafe": {"name": "Fuglen Tokyo", "desc": "Nordic light roast drip coffee ($5)"}
                    },
                    "dayTotalCost": 89.0,
                    "tips": "Pick up a Suica digital card on your phone for seamless subway taps without queueing."
                },
                {
                    "dayNumber": 2,
                    "date": "Day 2 (Sunday)",
                    "theme": "Old Town Heritage & Panoramic Sunset",
                    "activities": [
                        {
                            "id": "act-s4",
                            "slot": "Morning",
                            "time": "09:00 AM",
                            "title": "Senso-ji Temple & Asakusa Nakamise Stalls in Tokyo",
                            "description": "Experience Tokyo's oldest temple and taste warm melon pan and sweet dango snacks.",
                            "location": "Asakusa",
                            "estimatedCost": 5.0,
                            "tag": "Culture",
                            "duration": "2 hrs"
                        },
                        {
                            "id": "act-s5",
                            "slot": "Afternoon",
                            "time": "02:00 PM",
                            "title": "Akihabara Tech District & Retro Arcades",
                            "description": "Dive into multi-level retro gaming centers, vinyl shops, and electronic specialty alleys.",
                            "location": "Akihabara",
                            "estimatedCost": 18.0,
                            "tag": "Sightseeing",
                            "duration": "2.5 hrs"
                        },
                        {
                            "id": "act-s6",
                            "slot": "Evening",
                            "time": "06:30 PM",
                            "title": "Roppongi Hills Sunset Sky Deck",
                            "description": "Breathtaking 360-degree dusk panoramas highlighting the illuminated Tokyo Tower.",
                            "location": "Roppongi Hills",
                            "estimatedCost": 16.0,
                            "tag": "Sightseeing",
                            "duration": "2 hrs"
                        }
                    ],
                    "dining": {
                        "lunch": {"name": "Katsukura Tonkatsu", "cuisine": "Crispy Panko Pork", "price": "$$", "desc": "Golden fried pork cutlets with freshly ground sesame and free shredded cabbage.", "estimatedCost": 18.0},
                        "dinner": {"name": "Ebisu Yokocho", "cuisine": "Buzzy Izakaya Alley", "price": "$$", "desc": "Retro food hall atmosphere packed with lively small dishes and gyoza.", "estimatedCost": 25.0},
                        "snackOrCafe": {"name": "Kagetsudo Asakusa", "desc": "Freshly baked giant fluffy melonpan ($3)"}
                    },
                    "dayTotalCost": 89.0,
                    "tips": "Coin lockers at major stations make luggage storage easy on checkout day."
                }
            ]
        },
        "couple": {
            "id": "preset-couple-amalfi",
            "title": "Romantic Amalfi Coast & Capri Escape",
            "destination": "Amalfi Coast, Italy",
            "startDate": "2026-06-12",
            "endDate": "2026-06-15",
            "durationDays": 4,
            "budget": "Luxury",
            "travelerType": "Couple",
            "interests": ["Relax", "Sightseeing", "Food"],
            "totalEstimatedCost": 1420.0,
            "currency": "USD",
            "summary": "Dreamy 4-day romantic getaway featuring cliffside private boat cruises, lemon grove walks, candlelit sea-terrace dinners, and serene luxury stays.",
            "coverImage": CITY_IMAGES["amalfi"],
            "createdAt": "2026-10-28T10:00:00Z",
            "days": [
                {
                    "dayNumber": 1,
                    "date": "Day 1 (Friday)",
                    "theme": "Arrival, Positano Vistas & Sunset Cocktails",
                    "activities": [
                        {
                            "id": "act-c1",
                            "slot": "Morning",
                            "time": "10:00 AM",
                            "title": "Cliffside Arrival & Villa Check-in",
                            "description": "Private transfer through dramatic coastal bends to your sea-view terrace suite.",
                            "location": "Positano Heights",
                            "estimatedCost": 0.0,
                            "tag": "Relax",
                            "duration": "1.5 hrs"
                        },
                        {
                            "id": "act-c2",
                            "slot": "Afternoon",
                            "time": "02:30 PM",
                            "title": "Positano Pebble Beach & Boutique Stroll",
                            "description": "Wander pastel alleyways draped in bougainvillea, artisanal linen shops, and ceramic ateliers.",
                            "location": "Spiaggia Grande",
                            "estimatedCost": 35.0,
                            "tag": "Sightseeing",
                            "duration": "2.5 hrs"
                        },
                        {
                            "id": "act-c3",
                            "slot": "Evening",
                            "time": "07:00 PM",
                            "title": "Franco's Bar Sunset Champagne & Aperitivo",
                            "description": "Sip chilled Bellinis overlooking the glowing Mediterranean as sea breezes sweep in.",
                            "location": "Sirenuse Terrace",
                            "estimatedCost": 90.0,
                            "tag": "Relax",
                            "duration": "2 hrs"
                        }
                    ],
                    "dining": {
                        "lunch": {"name": "Chez Black", "cuisine": "Heart-shaped Seafood Pizza & Scampi", "price": "$$$", "desc": "Famous beachfront eatery with relaxed maritime charm.", "estimatedCost": 75.0},
                        "dinner": {"name": "La Sponda", "cuisine": "Candlelit Mediterranean Haute", "price": "$$$$", "desc": "Illuminated by 400 beeswax candles with romantic mandolin music.", "estimatedCost": 160.0},
                        "snackOrCafe": {"name": "Collina Bakery", "desc": "Lemon granita with brioche ($12)"}
                    },
                    "dayTotalCost": 360.0,
                    "tips": "Book beach umbrellas on Spiaggia Grande at least a week ahead during summer."
                },
                {
                    "dayNumber": 2,
                    "date": "Day 2 (Saturday)",
                    "theme": "Private Capri Wooden Boat & Blue Grotto",
                    "activities": [
                        {
                            "id": "act-c4",
                            "slot": "Morning",
                            "time": "09:30 AM",
                            "title": "Private Gozzo Boat Charter to Faraglioni",
                            "description": "Cruise turquoise bays, swim in secluded sea coves, and glide under the Faraglioni arches.",
                            "location": "Marina Grande / Capri",
                            "estimatedCost": 120.0,
                            "tag": "Adventure",
                            "duration": "4 hrs"
                        },
                        {
                            "id": "act-c5",
                            "slot": "Afternoon",
                            "time": "03:00 PM",
                            "title": "Anacapri Villa San Michele Gardens",
                            "description": "Stroll marble colonnades and fragrant pergolas with dizzying views over the Bay of Naples.",
                            "location": "Anacapri",
                            "estimatedCost": 30.0,
                            "tag": "Culture",
                            "duration": "2 hrs"
                        },
                        {
                            "id": "act-c6",
                            "slot": "Evening",
                            "time": "07:30 PM",
                            "title": "Private Balcony Wine Tasting & Stargazing",
                            "description": "Sommelier tasting of chilled Furore Bianco and local artisan pecorino.",
                            "location": "Hotel Cliff Veranda",
                            "estimatedCost": 60.0,
                            "tag": "Relax",
                            "duration": "2 hrs"
                        }
                    ],
                    "dining": {
                        "lunch": {"name": "La Fontelina Capri", "cuisine": "Fresh Grilled Catch on the Rocks", "price": "$$$$", "desc": "Iconic beach club lunch directly facing the towering rock stacks.", "estimatedCost": 95.0},
                        "dinner": {"name": "Ristorante Da Paolino", "cuisine": "Dine Under Giant Lemon Canopies", "price": "$$$$", "desc": "Magical garden setting under hundreds of fragrant hanging Amalfi lemons.", "estimatedCost": 150.0},
                        "snackOrCafe": {"name": "Buonocore Gelateria", "desc": "Warm freshly made waffle cone with pistachio gelato ($8)"}
                    },
                    "dayTotalCost": 455.0,
                    "tips": "Wear deck shoes or water shoes for rocky swimming spots along the coves."
                },
                {
                    "dayNumber": 3,
                    "date": "Day 3 (Sunday)",
                    "theme": "Ravello Romance & Cliffside Garden Villas",
                    "activities": [
                        {
                            "id": "act-c7",
                            "slot": "Morning",
                            "time": "10:00 AM",
                            "title": "Villa Cimbrone Infinity Terrace in Ravello",
                            "description": "Stand before the marble bust terrace 1,200 feet above the sapphire sea.",
                            "location": "Ravello",
                            "estimatedCost": 25.0,
                            "tag": "Sightseeing",
                            "duration": "2.5 hrs"
                        },
                        {
                            "id": "act-c8",
                            "slot": "Afternoon",
                            "time": "02:30 PM",
                            "title": "Villa Rufolo Moorish Gardens & Classical Grounds",
                            "description": "Explore Wagner's inspirational cloister gardens bursting with vibrant seasonal blossoms.",
                            "location": "Piazza Duomo Ravello",
                            "estimatedCost": 20.0,
                            "tag": "Culture",
                            "duration": "2 hrs"
                        },
                        {
                            "id": "act-c9",
                            "slot": "Evening",
                            "time": "07:00 PM",
                            "title": "Cliffside Sunset Classical Piano Recital",
                            "description": "Open-air chamber music as golden hour turns the cliffs into amber and pink.",
                            "location": "Ravello Belvedere",
                            "estimatedCost": 55.0,
                            "tag": "Culture",
                            "duration": "2 hrs"
                        }
                    ],
                    "dining": {
                        "lunch": {"name": "Cumpa' Cosimo", "cuisine": "Mama Netta's Homemade Pasta", "price": "$$$", "desc": "Warm hospitality with five different handmade pastas served simultaneously.", "estimatedCost": 65.0},
                        "dinner": {"name": "Rossellinis (Palazzo Avino)", "cuisine": "Michelin Star Ravello Feast", "price": "$$$$", "desc": "Top-tier gastronomy looking out to sea from a pink 12th-century palace.", "estimatedCost": 170.0},
                        "snackOrCafe": {"name": "Bar Il Calice", "desc": "Espresso and sfogliatella Santa Rosa ($10)"}
                    },
                    "dayTotalCost": 330.0,
                    "tips": "Taxis between Positano and Ravello take 45 mins; arrange in advance with the hotel concierge."
                },
                {
                    "dayNumber": 4,
                    "date": "Day 4 (Monday)",
                    "theme": "Path of the Gods & Farewell Serenade",
                    "activities": [
                        {
                            "id": "act-c10",
                            "slot": "Morning",
                            "time": "09:00 AM",
                            "title": "Sentiero degli Dei (Gentle Panorama Section)",
                            "description": "Scenic stroll along cliff contours with goats, wild rosemary, and endless ocean horizons.",
                            "location": "Nocelle",
                            "estimatedCost": 10.0,
                            "tag": "Adventure",
                            "duration": "2.5 hrs"
                        },
                        {
                            "id": "act-c11",
                            "slot": "Afternoon",
                            "time": "01:30 PM",
                            "title": "Thermal Spa & Couple Massage",
                            "description": "Hydromassage cliff pools, lavender body wraps, and herbal infusion relaxation.",
                            "location": "Conca dei Marini",
                            "estimatedCost": 120.0,
                            "tag": "Relax",
                            "duration": "2 hrs"
                        },
                        {
                            "id": "act-c12",
                            "slot": "Evening",
                            "time": "06:30 PM",
                            "title": "Private Sunset Yacht Dinner",
                            "description": "Candlelit seafood supper on the deck while gently anchored off the Amalfi bay.",
                            "location": "Amalfi Port",
                            "estimatedCost": 160.0,
                            "tag": "Relax",
                            "duration": "3 hrs"
                        }
                    ],
                    "dining": {
                        "lunch": {"name": "Trattoria Santa Croce", "cuisine": "Rustic Cliffside Pasta & Lemon Chicken", "price": "$$", "desc": "Accessible by boat or stairway; secluded and authentic.", "estimatedCost": 55.0},
                        "dinner": {"name": "Rada Restaurant Positano", "cuisine": "Mediterranean Fine Dining Over Waves", "price": "$$$$", "desc": "Built into the living sea rock with soothing acoustic guitar accompaniment.", "estimatedCost": 180.0},
                        "snackOrCafe": {"name": "Pasticceria Pansa Amalfi", "desc": "Famous Amalfi candied orange peel & artisan chocolates ($15)"}
                    },
                    "dayTotalCost": 475.0,
                    "tips": "Take the ferry back to Salerno or Naples for the smoothest departure avoiding cliff traffic."
                }
            ]
        },
        "group": {
            "id": "preset-group-costarica",
            "title": "Costa Rica Adventure & Rainforest Expedition",
            "destination": "Costa Rica (Arenal & Manuel Antonio)",
            "startDate": "2026-12-05",
            "endDate": "2026-12-09",
            "durationDays": 5,
            "budget": "Mid",
            "travelerType": "Group",
            "interests": ["Adventure", "Culture", "Relax"],
            "totalEstimatedCost": 685.0,
            "currency": "USD",
            "summary": "High-energy 5-day group getaway balancing volcanic hot springs, white-water rapids, zip-line canopies, and beach sunsets with shared logistics.",
            "coverImage": CITY_IMAGES["costa rica"],
            "createdAt": "2026-10-28T10:00:00Z",
            "days": [
                {
                    "dayNumber": 1,
                    "date": "Day 1 (Saturday)",
                    "theme": "Rainforest Arrival & Natural Geothermal Springs",
                    "activities": [
                        {
                            "id": "act-g1",
                            "slot": "Morning",
                            "time": "09:00 AM",
                            "title": "Group Shuttle to Arenal Volcano Valley",
                            "description": "Scenic drive through coffee plantations and rolling hills with panoramic volcano view stops.",
                            "location": "La Fortuna Valley",
                            "estimatedCost": 25.0,
                            "tag": "Sightseeing",
                            "duration": "3 hrs"
                        },
                        {
                            "id": "act-g2",
                            "slot": "Afternoon",
                            "time": "02:30 PM",
                            "title": "La Fortuna Waterfall Hike & Natural Pool Swim",
                            "description": "Descend 500 jungle steps to swim at the base of a roaring 230-foot jungle cascade.",
                            "location": "La Fortuna Reserve",
                            "estimatedCost": 18.0,
                            "tag": "Adventure",
                            "duration": "2.5 hrs"
                        },
                        {
                            "id": "act-g3",
                            "slot": "Evening",
                            "time": "06:30 PM",
                            "title": "Tabacon River Geothermal Hot Springs & Night Swim",
                            "description": "Unwind in multi-temperature cascading thermal pools surrounded by tropical flora.",
                            "location": "Tabacon Valley",
                            "estimatedCost": 45.0,
                            "tag": "Relax",
                            "duration": "3 hrs"
                        }
                    ],
                    "dining": {
                        "lunch": {"name": "Soda La Hormiga", "cuisine": "Traditional Costa Rican Casados", "price": "$", "desc": "Plates piled high with rice, black beans, plantains, fresh salad, and roast chicken.", "estimatedCost": 15.0},
                        "dinner": {"name": "Don Rufino", "cuisine": "Contemporary Costa Rican Grill", "price": "$$", "desc": "Wood-fired steaks, artisanal ceviche, and craft tropical infusions.", "estimatedCost": 35.0},
                        "snackOrCafe": {"name": "Cafe Metropoli", "desc": "Pour-over Tarrazu coffee & empanadas ($5)"}
                    },
                    "dayTotalCost": 138.0,
                    "tips": "Pack quick-dry water shoes and waterproof phone pouches for the river pools."
                },
                {
                    "dayNumber": 2,
                    "date": "Day 2 (Sunday)",
                    "theme": "Canopy Ziplining & Hanging Bridges Expedition",
                    "activities": [
                        {
                            "id": "act-g4",
                            "slot": "Morning",
                            "time": "08:30 AM",
                            "title": "Sky Trek Extreme Canopy Zipline Course",
                            "description": "Fly over miles of treetops with incredible views of Arenal Lake and Volcano.",
                            "location": "Monteverde / Arenal Cloudforest",
                            "estimatedCost": 60.0,
                            "tag": "Adventure",
                            "duration": "3 hrs"
                        },
                        {
                            "id": "act-g5",
                            "slot": "Afternoon",
                            "time": "02:00 PM",
                            "title": "Mistico Hanging Bridges Wildlife Safari",
                            "description": "Guided walk spotting toucans, howler monkeys, sloths, and vibrant morpho butterflies.",
                            "location": "Mistico Park",
                            "estimatedCost": 28.0,
                            "tag": "Culture",
                            "duration": "2.5 hrs"
                        },
                        {
                            "id": "act-g6",
                            "slot": "Evening",
                            "time": "07:00 PM",
                            "title": "Jungle Campfire & Craft Beer Tasting",
                            "description": "Relax together around outdoor firepits sampling tropical microbrews and roasted plantains.",
                            "location": "Arenal Brewing Co.",
                            "estimatedCost": 22.0,
                            "tag": "Food",
                            "duration": "2.5 hrs"
                        }
                    ],
                    "dining": {
                        "lunch": {"name": "Chante Verde", "cuisine": "Organic Farm Bowls", "price": "$$", "desc": "Fresh farm salads, yucca chips, and fresh passionfruit juice.", "estimatedCost": 18.0},
                        "dinner": {"name": "El Novillo del Arenal", "cuisine": "Lakeside Steakhouse", "price": "$$", "desc": "Grilled meats, fresh guacamole, and hearty group share platters.", "estimatedCost": 32.0},
                        "snackOrCafe": {"name": "Rainforest Cacao Stand", "desc": "Organic dark chocolate bark ($4)"}
                    },
                    "dayTotalCost": 160.0,
                    "tips": "Split group gear into one shared dry-bag carried on rotation during canopy tours."
                },
                {
                    "dayNumber": 3,
                    "date": "Day 3 (Monday)",
                    "theme": "Balsa River Class II-III White Water Rafting",
                    "activities": [
                        {
                            "id": "act-g7",
                            "slot": "Morning",
                            "time": "09:00 AM",
                            "title": "Rio Balsa White Water Rafting Challenge",
                            "description": "Thrilling 2-hour paddle through crystal rapids punctuated by calm swimming pools.",
                            "location": "Rio Balsa River Canyon",
                            "estimatedCost": 55.0,
                            "tag": "Adventure",
                            "duration": "3.5 hrs"
                        },
                        {
                            "id": "act-g8",
                            "slot": "Afternoon",
                            "time": "02:30 PM",
                            "title": "Artisanal Coffee & Sugar Cane Processing Tour",
                            "description": "Learn traditional ox-cart sugar cane extraction and sample freshly pressed cane juice.",
                            "location": "Don Juan Plantation",
                            "estimatedCost": 25.0,
                            "tag": "Culture",
                            "duration": "2 hrs"
                        },
                        {
                            "id": "act-g9",
                            "slot": "Evening",
                            "time": "07:30 PM",
                            "title": "Sunset Lookout & Group Salsa Dance Class",
                            "description": "Fun beginner-friendly salsa and bachata lesson on an open-air deck overlooking the jungle.",
                            "location": "La Fortuna Social Club",
                            "estimatedCost": 15.0,
                            "tag": "Culture",
                            "duration": "2 hrs"
                        }
                    ],
                    "dining": {
                        "lunch": {"name": "Riverside Traditional Rancho", "cuisine": "Wood-stove Feast", "price": "$$", "desc": "Riverside buffet cooked over wood fires after rafting.", "estimatedCost": 18.0},
                        "dinner": {"name": "La Parada Pizzeria", "cuisine": "Wood-fired Pizza & Craft Beer", "price": "$$", "desc": "Giant family-style artisanal pizzas ideal for group sharing.", "estimatedCost": 22.0},
                        "snackOrCafe": {"name": "Fruta Fresca Kiosk", "desc": "Fresh coconut water straight from green pipa ($3)"}
                    },
                    "dayTotalCost": 135.0,
                    "tips": "River guides take high-res team photos; split the flash drive cost across the whole group."
                },
                {
                    "dayNumber": 4,
                    "date": "Day 4 (Tuesday)",
                    "theme": "Pacific Coast Transition & Ocean Catamaran Cruise",
                    "activities": [
                        {
                            "id": "act-g10",
                            "slot": "Morning",
                            "time": "08:00 AM",
                            "title": "Scenic Group Drive to Manuel Antonio Coast",
                            "description": "Stop at Tarcoles Crocodile Bridge to view colossal American crocodiles from above.",
                            "location": "Tarcoles & Central Coast",
                            "estimatedCost": 15.0,
                            "tag": "Sightseeing",
                            "duration": "3 hrs"
                        },
                        {
                            "id": "act-g11",
                            "slot": "Afternoon",
                            "time": "02:00 PM",
                            "title": "Manuel Antonio Ocean Catamaran Cruise & Snorkel",
                            "description": "Sail along dramatic cliffs, snorkel with reef fish, and slide down on-board water chutes.",
                            "location": "Marina Pez Vela",
                            "estimatedCost": 65.0,
                            "tag": "Adventure",
                            "duration": "3.5 hrs"
                        },
                        {
                            "id": "act-g12",
                            "slot": "Evening",
                            "time": "07:30 PM",
                            "title": "Beachside Bonfire & Acoustic Jam",
                            "description": "Relax on Espadilla Beach with guitar music, tide murmurs, and glowing coastal skies.",
                            "location": "Playa Espadilla",
                            "estimatedCost": 10.0,
                            "tag": "Relax",
                            "duration": "2 hrs"
                        }
                    ],
                    "dining": {
                        "lunch": {"name": "El Avion Restaurant", "cuisine": "Seafood & Burgers inside Fairchild C-123 Plane", "price": "$$", "desc": "Famous pub and dining lounge built into a Cold War cargo plane.", "estimatedCost": 24.0},
                        "dinner": {"name": "Agua Azul Seaside Lounge", "cuisine": "Tuna Steaks & Plantain Nachos", "price": "$$", "desc": "Stunning sunset cliff views over Manuel Antonio national park beaches.", "estimatedCost": 35.0},
                        "snackOrCafe": {"name": "Beach Cart", "desc": "Shaved ice Churchill with condensed milk ($4)"}
                    },
                    "dayTotalCost": 149.0,
                    "tips": "Book the afternoon catamaran slot to catch the golden hour sunset from the open sea."
                },
                {
                    "dayNumber": 5,
                    "date": "Day 5 (Wednesday)",
                    "theme": "National Park Wildlife & Farewell Beach Fiesta",
                    "activities": [
                        {
                            "id": "act-g13",
                            "slot": "Morning",
                            "time": "07:30 AM",
                            "title": "Manuel Antonio National Park Guided Safari",
                            "description": "Spot capuchin monkeys, iguanas, and sloths lounging right next to pristine white sand beaches.",
                            "location": "Manuel Antonio National Park",
                            "estimatedCost": 22.0,
                            "tag": "Culture",
                            "duration": "3 hrs"
                        },
                        {
                            "id": "act-g14",
                            "slot": "Afternoon",
                            "time": "01:30 PM",
                            "title": "Group Surf Lesson or SUP Paddleboarding",
                            "description": "Catch friendly, rolling beginner waves with certified local instructors.",
                            "location": "Playa Manuel Antonio",
                            "estimatedCost": 35.0,
                            "tag": "Adventure",
                            "duration": "2 hrs"
                        },
                        {
                            "id": "act-g15",
                            "slot": "Evening",
                            "time": "06:30 PM",
                            "title": "Celebratory Farewell Sunset Feast",
                            "description": "Celebrate an unforgettable expedition with fresh ceviche bowls, grilled mahi-mahi, and tropical music.",
                            "location": "Marina Boardwalk",
                            "estimatedCost": 20.0,
                            "tag": "Food",
                            "duration": "2.5 hrs"
                        }
                    ],
                    "dining": {
                        "lunch": {"name": "Cafe Milagro", "cuisine": "Artisan Costa Rican Bistro", "price": "$$", "desc": "Shaded garden patio serving grilled fish tacos and cold craft brews.", "estimatedCost": 18.0},
                        "dinner": {"name": "Ronny's Place", "cuisine": "Sunset Sangria & Seafood Grill", "price": "$$", "desc": "One of the best sunset views in Costa Rica, serving massive paella pans.", "estimatedCost": 30.0},
                        "snackOrCafe": {"name": "Pops Gelato", "desc": "Tropical Guanabana scoop ($3)"}
                    },
                    "dayTotalCost": 125.0,
                    "tips": "Keep food securely in zipped backpacks inside Manuel Antonio Park as raccoons are clever!"
                }
            ]
        }
    }

@app.post("/api/generate-itinerary", response_model=Trip)
def generate_itinerary(req: TripRequest):
    """
    Mock AI generator returning structured JSON itinerary tailored to user preferences.
    Saves tokens and responds in milliseconds with realistic, rich plans.
    """
    try:
        start_d = datetime.strptime(req.startDate, "%Y-%m-%d")
        end_d = datetime.strptime(req.endDate, "%Y-%m-%d")
    except Exception:
        # Fallback to 3 days if format parse fails
        start_d = datetime.now() + timedelta(days=7)
        end_d = start_d + timedelta(days=2)

    num_days = max(1, min((end_d - start_d).days + 1, 10))
    trip_id = f"trip-{str(uuid.uuid4())[:8]}"
    
    days: List[ItineraryDay] = []
    total_cost = 0.0

    for i in range(1, num_days + 1):
        curr_date = start_d + timedelta(days=i - 1)
        date_str = f"Day {i} ({curr_date.strftime('%a, %b %d')})"
        day_obj = generate_day_content(
            destination=req.destination,
            day_num=i,
            date_str=date_str,
            budget=req.budget,
            traveler_type=req.travelerType,
            interests=req.interests
        )
        days.append(day_obj)
        total_cost += day_obj.dayTotalCost

    interests_summary = ", ".join(req.interests) if req.interests else "Sightseeing & Dining"
    summary_text = (
        f"A tailored {num_days}-day {req.travelerType.lower()} journey in {req.destination} "
        f"designed for a {req.budget.lower()} budget, spotlighting {interests_summary}."
    )

    return Trip(
        id=trip_id,
        title=f"{req.destination} {num_days}-Day {req.travelerType} Expedition",
        destination=req.destination,
        startDate=req.startDate,
        endDate=req.endDate,
        durationDays=num_days,
        budget=req.budget,
        travelerType=req.travelerType,
        interests=req.interests,
        totalEstimatedCost=round(total_cost, 2),
        currency="USD",
        summary=summary_text,
        coverImage=get_cover_image(req.destination),
        days=days,
        createdAt=datetime.now().isoformat()
    )

@app.post("/api/regenerate-day", response_model=ItineraryDay)
def regenerate_day(req: RegenerateDayRequest):
    """
    Regenerates a specific day with refreshed activities and dining suggestions.
    """
    date_str = f"Day {req.dayNumber} (Refreshed)"
    day_obj = generate_day_content(
        destination=req.destination,
        day_num=req.dayNumber + random.randint(10, 50), # mix up seed
        date_str=date_str,
        budget=req.budget,
        traveler_type=req.travelerType,
        interests=req.interests
    )
    # Ensure correct dayNumber
    day_obj.dayNumber = req.dayNumber
    return day_obj

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
