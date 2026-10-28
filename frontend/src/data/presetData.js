export const PRESETS = {
  solo: {
    id: "preset-solo-tokyo",
    title: "Tokyo 48-Hour Weekend Rush",
    destination: "Tokyo, Japan",
    startDate: "2026-11-07",
    endDate: "2026-11-08",
    durationDays: 2,
    budget: "Budget",
    travelerType: "Solo",
    interests: ["Food", "Sightseeing"],
    totalEstimatedCost: 178.0,
    currency: "USD",
    summary: "Fast-paced, budget-smart solo escape maximizing famous ramen spots, neon alleys, vintage thrifting, and iconic viewpoints.",
    coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-10-28T10:00:00Z",
    days: [
      {
        dayNumber: 1,
        date: "Day 1 (Saturday, Nov 07)",
        theme: "Neon Lights, Ramen Alleys & Shibuya Beat",
        activities: [
          {
            id: "act-s1",
            slot: "Morning",
            time: "08:30 AM",
            title: "Meiji Jingu Shrine & Forested Yoyogi Walk",
            description: "Quiet morning stroll through 70-hectare ancient evergreen forest before the Shibuya morning rush begins.",
            location: "Shibuya / Harajuku",
            estimatedCost: 0.0,
            tag: "Culture",
            duration: "1.5 hrs"
          },
          {
            id: "act-s2",
            slot: "Afternoon",
            time: "01:30 PM",
            title: "Shinjuku Gyoen Greenhouses & Vintage Thrifting",
            description: "Explore lush botanical greenhouses followed by vinyl and streetwear thirfting in Shimokitazawa.",
            location: "Shinjuku & Shimokitazawa",
            estimatedCost: 15.0,
            tag: "Sightseeing",
            duration: "3 hrs"
          },
          {
            id: "act-s3",
            slot: "Evening",
            time: "07:30 PM",
            title: "Omoide Yokocho Food Alleys & Golden Gai Exploration",
            description: "Hop between legendary smoke-filled yakitori stalls and microscopic 4-seat izakaya speakeasies.",
            location: "Memory Lane, Shinjuku",
            estimatedCost: 22.0,
            tag: "Food",
            duration: "2.5 hrs"
          }
        ],
        dining: {
          lunch: { name: "Fuunji Tsukemen", cuisine: "Rich Dipping Ramen", price: "$", desc: "Velvety chicken fish broth with springy thick noodles.", estimatedCost: 12.0 },
          dinner: { name: "Torikizoku Yakitori", cuisine: "Grilled Skewers & Drafts", price: "$", desc: "High-value, fast-paced skewered chicken favorites with chilled draft mugs.", estimatedCost: 20.0 },
          snackOrCafe: { name: "Fuglen Tokyo", desc: "Scandinavian light roast drip coffee ($5)" }
        },
        dayTotalCost: 89.0,
        tips: "Pick up a digital Suica card on Apple/Google Wallet for effortless subway tap-ins without waiting in line."
      },
      {
        dayNumber: 2,
        date: "Day 2 (Sunday, Nov 08)",
        theme: "Old Town Heritage & Panoramic Sky View",
        activities: [
          {
            id: "act-s4",
            slot: "Morning",
            time: "09:00 AM",
            title: "Senso-ji Temple & Asakusa Nakamise Stalls",
            description: "Tokyo's oldest Buddhist temple, tasting freshly made sweet melon pan and dango skewers.",
            location: "Asakusa",
            estimatedCost: 5.0,
            tag: "Culture",
            duration: "2 hrs"
          },
          {
            id: "act-s5",
            slot: "Afternoon",
            time: "02:00 PM",
            title: "Akihabara Electronic Town & Retro Arcades",
            description: "Dive into multi-level retro gaming centers, vinyl shops, and electronic specialty alleys.",
            location: "Akihabara",
            estimatedCost: 18.0,
            tag: "Sightseeing",
            duration: "2.5 hrs"
          },
          {
            id: "act-s6",
            slot: "Evening",
            time: "06:30 PM",
            title: "Roppongi Hills Sunset Sky Deck",
            description: "Spectacular 360-degree open-air observation deck looking over the illuminated red Tokyo Tower.",
            location: "Roppongi Hills",
            estimatedCost: 16.0,
            tag: "Sightseeing",
            duration: "2 hrs"
          }
        ],
        dining: {
          lunch: { name: "Katsukura Tonkatsu", cuisine: "Crispy Panko Cutlet", price: "$$", desc: "Golden fried pork cutlets with freshly ground roasted sesame dip.", estimatedCost: 18.0 },
          dinner: { name: "Ebisu Yokocho", cuisine: "Buzzy Izakaya Alley", price: "$$", desc: "Retro food alley packed with sizzle, gyoza, and grilled meats.", estimatedCost: 25.0 },
          snackOrCafe: { name: "Kagetsudo Asakusa", desc: "Freshly baked giant fluffy melonpan ($3)" }
        },
        dayTotalCost: 89.0,
        tips: "Store luggage in station coin lockers in the morning to roam hands-free until your night flight."
      }
    ]
  },

  couple: {
    id: "preset-couple-amalfi",
    title: "Romantic Amalfi Coast & Capri Escape",
    destination: "Amalfi Coast, Italy",
    startDate: "2026-06-12",
    endDate: "2026-06-15",
    durationDays: 4,
    budget: "Luxury",
    travelerType: "Couple",
    interests: ["Relax", "Sightseeing", "Food"],
    totalEstimatedCost: 1420.0,
    currency: "USD",
    summary: "Dreamy 4-day romantic getaway featuring cliffside private boat cruises, lemon grove walks, candlelit sea-terrace dinners, and serene luxury stays.",
    coverImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-10-28T10:00:00Z",
    days: [
      {
        dayNumber: 1,
        date: "Day 1 (Friday, Jun 12)",
        theme: "Arrival, Cliffside Positano & Sunset Cocktails",
        activities: [
          {
            id: "act-c1",
            slot: "Morning",
            time: "10:00 AM",
            title: "Private Scenic Transfer & Suite Check-in",
            description: "Chauffeured arrival along breathtaking serpentine cliff roads to your private sea-facing balcony.",
            location: "Positano Heights",
            estimatedCost: 0.0,
            tag: "Relax",
            duration: "1.5 hrs"
          },
          {
            id: "act-c2",
            slot: "Afternoon",
            time: "02:30 PM",
            title: "Positano Pebble Beach & Bougainvillea Lanes",
            description: "Hand-in-hand stroll through cascading pastel cliff alleys, artisan linen boutiques, and ceramic shops.",
            location: "Spiaggia Grande",
            estimatedCost: 35.0,
            tag: "Sightseeing",
            duration: "2.5 hrs"
          },
          {
            id: "act-c3",
            slot: "Evening",
            time: "07:00 PM",
            title: "Franco's Bar Sunset Champagne & Aperitivo",
            description: "Sip chilled vintage Bellinis perched on the cliff terrace as twilight paints the Mediterranean pink.",
            location: "Sirenuse Terrace",
            estimatedCost: 90.0,
            tag: "Relax",
            duration: "2 hrs"
          }
        ],
        dining: {
          lunch: { name: "Chez Black", cuisine: "Beachside Scampi & Heart Pizza", price: "$$$", desc: "Famous beachfront restaurant with maritime flair and fresh seafood.", estimatedCost: 75.0 },
          dinner: { name: "La Sponda", cuisine: "Candlelit Mediterranean Haute", price: "$$$$", desc: "400 romantic beeswax candles lit nightly with sweet mandolin serenades.", estimatedCost: 160.0 },
          snackOrCafe: { name: "Collina Bakery", desc: "Shaved Amalfi lemon granita with warm brioche ($12)" }
        },
        dayTotalCost: 360.0,
        tips: "Reserve your Spiaggia Grande beach chairs 1-2 weeks early during peak Mediterranean season."
      },
      {
        dayNumber: 2,
        date: "Day 2 (Saturday, Jun 13)",
        theme: "Private Capri Wooden Boat & Faraglioni Rocks",
        activities: [
          {
            id: "act-c4",
            slot: "Morning",
            time: "09:30 AM",
            title: "Private Gozzo Charter Cruise around Capri",
            description: "Sail into crystalline emerald grottos, swim in secluded rocky coves, and pass beneath Faraglioni's Arch of Love.",
            location: "Capri & Faraglioni",
            estimatedCost: 120.0,
            tag: "Adventure",
            duration: "4 hrs"
          },
          {
            id: "act-c5",
            slot: "Afternoon",
            time: "03:00 PM",
            title: "Anacapri Villa San Michele Gardens",
            description: "Walk under fragrant wisteria pergolas with dizzying cliff views across the entire Gulf of Naples.",
            location: "Anacapri",
            estimatedCost: 30.0,
            tag: "Culture",
            duration: "2 hrs"
          },
          {
            id: "act-c6",
            slot: "Evening",
            time: "07:30 PM",
            title: "Private Sea Veranda Wine & Artisan Cheese",
            description: "Sommelier-curated tasting of local Campania white wines and aged pecorino under the stars.",
            location: "Hotel Sea Terrace",
            estimatedCost: 60.0,
            tag: "Relax",
            duration: "2 hrs"
          }
        ],
        dining: {
          lunch: { name: "La Fontelina Capri", cuisine: "Seafood Platter on the Rocks", price: "$$$$", desc: "Legendary beach club lunch directly facing the sea needles.", estimatedCost: 95.0 },
          dinner: { name: "Ristorante Da Paolino", cuisine: "Dine Under Lemon Canopies", price: "$$$$", desc: "Dine beneath a ceiling of fragrant yellow Amalfi lemons.", estimatedCost: 150.0 },
          snackOrCafe: { name: "Buonocore Gelateria", desc: "Freshly pressed waffle cone with pistachio cream ($8)" }
        },
        dayTotalCost: 455.0,
        tips: "Slip into water shoes before disembarking the gozzo boat at secluded pebble swim inlets."
      },
      {
        dayNumber: 3,
        date: "Day 3 (Sunday, Jun 14)",
        theme: "Ravello Romance & Infinity Terrace Views",
        activities: [
          {
            id: "act-c7",
            slot: "Morning",
            time: "10:00 AM",
            title: "Villa Cimbrone Infinity Terrace in Ravello",
            description: "Stand suspended between sea and sky at the famous marble bust terrace 1,200 feet above the waves.",
            location: "Ravello",
            estimatedCost: 25.0,
            tag: "Sightseeing",
            duration: "2.5 hrs"
          },
          {
            id: "act-c8",
            slot: "Afternoon",
            time: "02:30 PM",
            title: "Villa Rufolo Moorish Cloisters & Gardens",
            description: "Explore the historic Moorish courtyard gardens that famously inspired Wagner's operas.",
            location: "Piazza Duomo, Ravello",
            estimatedCost: 20.0,
            tag: "Culture",
            duration: "2 hrs"
          },
          {
            id: "act-c9",
            slot: "Evening",
            time: "07:00 PM",
            title: "Cliffside Twilight Piano Recital",
            description: "Open-air piano and violin chamber concert under the starry Italian sky.",
            location: "Ravello Belvedere",
            estimatedCost: 55.0,
            tag: "Culture",
            duration: "2 hrs"
          }
        ],
        dining: {
          lunch: { name: "Cumpa' Cosimo", cuisine: "Mama Netta's Homemade Pasta", price: "$$$", desc: "Beloved family restaurant serving sampler plates of five different handmade pastas.", estimatedCost: 65.0 },
          dinner: { name: "Rossellinis (Palazzo Avino)", cuisine: "Michelin Fine Dining", price: "$$$$", desc: "Extraordinary cliff dining from a 12th-century pink palace.", estimatedCost: 170.0 },
          snackOrCafe: { name: "Bar Il Calice", desc: "Espresso and warm sfogliatella ($10)" }
        },
        dayTotalCost: 330.0,
        tips: "Book a private driver between Positano and Ravello to skip crowded public buses on winding roads."
      },
      {
        dayNumber: 4,
        date: "Day 4 (Monday, Jun 15)",
        theme: "Path of the Gods Panorama & Farewell Spa",
        activities: [
          {
            id: "act-c10",
            slot: "Morning",
            time: "09:00 AM",
            title: "Sentiero degli Dei (Gentle Coastal Section)",
            description: "Breathtaking mountain path walking past wild rosemary bushes, ancient shepherd huts, and sea cliffs.",
            location: "Nocelle",
            estimatedCost: 10.0,
            tag: "Adventure",
            duration: "2.5 hrs"
          },
          {
            id: "act-c11",
            slot: "Afternoon",
            time: "01:30 PM",
            title: "Thermal Salt Pools & Couple Aromatherapy",
            description: "Private sea-cave spa circuit with rosemary-infused body wraps and hydrotherapy.",
            location: "Conca dei Marini",
            estimatedCost: 120.0,
            tag: "Relax",
            duration: "2 hrs"
          },
          {
            id: "act-c12",
            slot: "Evening",
            time: "06:30 PM",
            title: "Private Sunset Yacht Dinner",
            description: "Intimate candlelit lobster and champagne supper anchored peacefully in the Amalfi bay.",
            location: "Amalfi Port",
            estimatedCost: 160.0,
            tag: "Relax",
            duration: "3 hrs"
          }
        ],
        dining: {
          lunch: { name: "Trattoria Santa Croce", cuisine: "Cliff Cove Pasta & Lemon Chicken", price: "$$", desc: "Secluded cliffside restaurant reachable by boat.", estimatedCost: 55.0 },
          dinner: { name: "Rada Restaurant Positano", cuisine: "Modern Mediterranean Over Waves", price: "$$$$", desc: "Carved into the natural coastal rock with soft live jazz.", estimatedCost: 180.0 },
          snackOrCafe: { name: "Pasticceria Pansa Amalfi", desc: "Artisanal candied Amalfi lemon peel ($15)" }
        },
        dayTotalCost: 475.0,
        tips: "Take the hydrofoil ferry back to Salerno or Naples to enjoy one final scenic view from the water."
      }
    ]
  },

  group: {
    id: "preset-group-costarica",
    title: "Costa Rica Adventure & Rainforest Expedition",
    destination: "Costa Rica (Arenal & Manuel Antonio)",
    startDate: "2026-12-05",
    endDate: "2026-12-09",
    durationDays: 5,
    budget: "Mid",
    travelerType: "Group",
    interests: ["Adventure", "Culture", "Relax"],
    totalEstimatedCost: 685.0,
    currency: "USD",
    summary: "High-energy 5-day group getaway balancing volcanic hot springs, white-water rapids, zip-line canopies, and beach sunsets with shared logistics.",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-10-28T10:00:00Z",
    days: [
      {
        dayNumber: 1,
        date: "Day 1 (Saturday, Dec 05)",
        theme: "Rainforest Arrival & Thermal River Springs",
        activities: [
          {
            id: "act-g1",
            slot: "Morning",
            time: "09:00 AM",
            title: "Group Shuttle to Arenal Volcano Valley",
            description: "Scenic private minivan journey through rolling pineapple and coffee plantations with photo lookouts.",
            location: "La Fortuna Valley",
            estimatedCost: 25.0,
            tag: "Sightseeing",
            duration: "3 hrs"
          },
          {
            id: "act-g2",
            slot: "Afternoon",
            time: "02:30 PM",
            title: "La Fortuna Waterfall Hike & Pool Swim",
            description: "Descend 500 rainforest steps to swim in the icy turquoise pool below the roaring 230-foot cascade.",
            location: "La Fortuna Reserve",
            estimatedCost: 18.0,
            tag: "Adventure",
            duration: "2.5 hrs"
          },
          {
            id: "act-g3",
            slot: "Evening",
            time: "06:30 PM",
            title: "Tabacon Natural Geothermal Springs Night Soak",
            description: "Unwind tired muscles in natural warm mineral river currents illuminated by tropical tiki torches.",
            location: "Tabacon Valley",
            estimatedCost: 45.0,
            tag: "Relax",
            duration: "3 hrs"
          }
        ],
        dining: {
          lunch: { name: "Soda La Hormiga", cuisine: "Costa Rican Casados", price: "$", desc: "Brimming plates of rice, beans, plantains, fresh salad, and roast chicken.", estimatedCost: 15.0 },
          dinner: { name: "Don Rufino", cuisine: "Contemporary Costa Rican Grill", price: "$$", desc: "Tender steaks, artisan ceviche bowls, and tropical cocktails.", estimatedCost: 35.0 },
          snackOrCafe: { name: "Cafe Metropoli", desc: "Pour-over Tarrazu coffee & warm empanadas ($5)" }
        },
        dayTotalCost: 138.0,
        tips: "Bring water-resistant phone cases and quick-dry water shoes for rocky geothermal river beds."
      },
      {
        dayNumber: 2,
        date: "Day 2 (Sunday, Dec 06)",
        theme: "Canopy Ziplining & Cloud Forest Suspension",
        activities: [
          {
            id: "act-g4",
            slot: "Morning",
            time: "08:30 AM",
            title: "Sky Trek Extreme Canopy Zipline Course",
            description: "Glide over jungle canopies on seven cables reaching speeds of 45 mph with Arenal Lake views.",
            location: "Monteverde / Arenal",
            estimatedCost: 60.0,
            tag: "Adventure",
            duration: "3 hrs"
          },
          {
            id: "act-g5",
            slot: "Afternoon",
            time: "02:00 PM",
            title: "Mistico Hanging Bridges Guided Safari",
            description: "Walk across six towering suspension bridges spotting toucans, sloths, and colorful poison dart frogs.",
            location: "Mistico Park",
            estimatedCost: 28.0,
            tag: "Culture",
            duration: "2.5 hrs"
          },
          {
            id: "act-g6",
            slot: "Evening",
            time: "07:00 PM",
            title: "Jungle Campfire & Craft Beer Flight",
            description: "Gather around outdoor firepits under palm trees to sample tropical passionfruit and IPA brews.",
            location: "Arenal Brewing Co.",
            estimatedCost: 22.0,
            tag: "Food",
            duration: "2.5 hrs"
          }
        ],
        dining: {
          lunch: { name: "Chante Verde", cuisine: "Organic Farm-to-Table Bowls", price: "$$", desc: "Crisp cassava fries, fresh avocado salads, and passionfruit juice.", estimatedCost: 18.0 },
          dinner: { name: "El Novillo del Arenal", cuisine: "Wood-fired Steakhouse", price: "$$", desc: "Shared platters of grilled meats, chimichurri, and fresh guacamole.", estimatedCost: 32.0 },
          snackOrCafe: { name: "Rainforest Cacao Stand", desc: "Fresh organic dark chocolate bark ($4)" }
        },
        dayTotalCost: 160.0,
        tips: "Keep one member in charge of the group dry-bag so others can freely navigate ziplines."
      },
      {
        dayNumber: 3,
        date: "Day 3 (Monday, Dec 07)",
        theme: "Rio Balsa White Water Rafting Challenge",
        activities: [
          {
            id: "act-g7",
            slot: "Morning",
            time: "09:00 AM",
            title: "Rio Balsa Class II-III White Water Rafting",
            description: "Exciting 2-hour paddle through crystal jungle canyons, tackling rolling rapids with experienced river guides.",
            location: "Rio Balsa Canyon",
            estimatedCost: 55.0,
            tag: "Adventure",
            duration: "3.5 hrs"
          },
          {
            id: "act-g8",
            slot: "Afternoon",
            time: "02:30 PM",
            title: "Artisanal Coffee & Sugar Cane Press Tour",
            description: "Grind roasted coffee beans, taste fresh sugar cane juice pressed with traditional wood rollers.",
            location: "Don Juan Plantation",
            estimatedCost: 25.0,
            tag: "Culture",
            duration: "2 hrs"
          },
          {
            id: "act-g9",
            slot: "Evening",
            time: "07:30 PM",
            title: "Sunset Lookout & Group Salsa Lesson",
            description: "Lively beginner dance session on an open-air deck as tropical evening air cools down.",
            location: "La Fortuna Social Club",
            estimatedCost: 15.0,
            tag: "Culture",
            duration: "2 hrs"
          }
        ],
        dining: {
          lunch: { name: "Riverside Traditional Rancho", cuisine: "Country Buffet", price: "$$", desc: "Hot buffet cooked over wood stoves after rafting.", estimatedCost: 18.0 },
          dinner: { name: "La Parada Pizzeria", cuisine: "Wood-fired Pizza Platters", price: "$$", desc: "Giant hand-tossed artisan pizzas ideal for group sharing.", estimatedCost: 22.0 },
          snackOrCafe: { name: "Fruta Fresca Kiosk", desc: "Fresh green coconut with straw ($3)" }
        },
        dayTotalCost: 135.0,
        tips: "Purchase the rafting guide photo package as a group; it costs very little when split 4-6 ways."
      },
      {
        dayNumber: 4,
        date: "Day 4 (Tuesday, Dec 08)",
        theme: "Pacific Coast Transition & Catamaran Sunset",
        activities: [
          {
            id: "act-g10",
            slot: "Morning",
            time: "08:00 AM",
            title: "Scenic Coast Drive via Tarcoles Croc Bridge",
            description: "Head south toward the sparkling Pacific, pausing to view giant wild crocodiles basking on river sandbars.",
            location: "Tarcoles & Central Coast",
            estimatedCost: 15.0,
            tag: "Sightseeing",
            duration: "3 hrs"
          },
          {
            id: "act-g11",
            slot: "Afternoon",
            time: "02:00 PM",
            title: "Catamaran Snorkel Cruise & Ocean Water Slides",
            description: "Sail along dramatic jungle headlands, snorkel with reef fish, and plunge down catamaran water slides.",
            location: "Marina Pez Vela",
            estimatedCost: 65.0,
            tag: "Adventure",
            duration: "3.5 hrs"
          },
          {
            id: "act-g12",
            slot: "Evening",
            time: "07:30 PM",
            title: "Playa Espadilla Beachside Acoustic Bonfire",
            description: "Relax on warm sands with gentle ocean breezes, fresh drinks, and acoustic guitar melodies.",
            location: "Playa Espadilla",
            estimatedCost: 10.0,
            tag: "Relax",
            duration: "2 hrs"
          }
        ],
        dining: {
          lunch: { name: "El Avion Restaurant", cuisine: "Pub Classics in a Cargo Plane", price: "$$", desc: "Iconic restaurant built inside a historic military transport aircraft.", estimatedCost: 24.0 },
          dinner: { name: "Agua Azul Seaside Lounge", cuisine: "Tuna Steaks & Plantain Nachos", price: "$$", desc: "Top-deck cliff views over the Pacific with great cocktails.", estimatedCost: 35.0 },
          snackOrCafe: { name: "Beach Cart", desc: "Costa Rican Churchill shaved ice ($4)" }
        },
        dayTotalCost: 149.0,
        tips: "Board the catamaran promptly to claim upper sun deck cushions before departure."
      },
      {
        dayNumber: 5,
        date: "Day 5 (Wednesday, Dec 09)",
        theme: "National Park Wildlife & Farewell Fiesta",
        activities: [
          {
            id: "act-g13",
            slot: "Morning",
            time: "07:30 AM",
            title: "Manuel Antonio National Park Guided Safari",
            description: "Spot playful white-faced capuchin monkeys, iguanas, and three-toed sloths on secluded cove trails.",
            location: "Manuel Antonio National Park",
            estimatedCost: 22.0,
            tag: "Culture",
            duration: "3 hrs"
          },
          {
            id: "act-g14",
            slot: "Afternoon",
            time: "01:30 PM",
            title: "Group Surf Clinic or Stand-Up Paddleboard",
            description: "Catch gentle tropical waves together with patient local surf instructors.",
            location: "Playa Manuel Antonio",
            estimatedCost: 35.0,
            tag: "Adventure",
            duration: "2 hrs"
          },
          {
            id: "act-g15",
            slot: "Evening",
            time: "06:30 PM",
            title: "Grand Farewell Sunset Seafood Feast",
            description: "Celebrate the epic adventure with massive paella pans, grilled mahi-mahi, and tropical dance beats.",
            location: "Marina Boardwalk",
            estimatedCost: 20.0,
            tag: "Food",
            duration: "2.5 hrs"
          }
        ],
        dining: {
          lunch: { name: "Cafe Milagro", cuisine: "Artisanal Jungle Bistro", price: "$$", desc: "Shaded garden patio serving grilled fish tacos and cold craft brews.", estimatedCost: 18.0 },
          dinner: { name: "Ronny's Place", cuisine: "Sunset Sangria & Seafood Grill", price: "$$", desc: "Celebrated cliff sunset spot with panoramic views and massive seafood platters.", estimatedCost: 30.0 },
          snackOrCafe: { name: "Pops Gelato", desc: "Tropical soursop / guanabana scoop ($3)" }
        },
        dayTotalCost: 125.0,
        tips: "Leave snacks zipped securely inside bags in the park—the monkeys are expert pickpockets!"
      }
    ]
  }
};
