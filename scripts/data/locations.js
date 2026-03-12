/**
 * Location data for weekend.sg
 * Each location includes all required properties for filtering and scoring
 */

export const locations = [
  // --- Joo Chiat & East ---
  {
    id: 'joo_chiat_area',
    name: 'Joo Chiat Area',
    region: 'east',
    tags: ['heritage', 'culture', 'local_food', 'hidden'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'family-young-kids', 'family-teens', 'group-friends'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Colorful Peranakan shophouses, heritage trails, and authentic local eateries in this charming neighborhood.',
    rationale_hints: [
      'rich Peranakan heritage',
      'authentic local food scene',
      'Instagram-worthy shophouses'
    ],
    coordinates: { x: 650, y: 320 }
  },
  {
    id: 'joo_chiat_murals',
    name: 'Joo Chiat Street Art & Murals',
    region: 'east',
    tags: ['art', 'heritage', 'culture', 'hidden'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Vibrant street art and murals celebrating Peranakan culture and local heritage.',
    rationale_hints: [
      'colorful street art',
      'great for photography',
      'cultural storytelling through art'
    ],
    coordinates: { x: 660, y: 330 }
  },
  {
    id: 'koon_seng_road',
    name: 'Koon Seng Road Shophouses',
    region: 'east',
    tags: ['heritage', 'art', 'hidden'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Stunning row of colorful Peranakan terrace houses, perfect for photography.',
    rationale_hints: [
      'iconic photo spot',
      'architectural beauty',
      'Peranakan heritage showcase'
    ],
    coordinates: { x: 655, y: 325 }
  },
  {
    id: 'geylang_serai',
    name: 'Geylang Serai & Wisma Geylang Serai',
    region: 'east',
    tags: ['heritage', 'culture', 'local_food'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Malay cultural hub with traditional markets, authentic cuisine, and heritage center.',
    rationale_hints: [
      'Malay cultural immersion',
      'traditional market experience',
      'authentic local flavors'
    ],
    coordinates: { x: 640, y: 340 }
  },
  {
    id: 'east_coast_park',
    name: 'East Coast Park',
    region: 'east',
    tags: ['nature-parks', 'physical', 'local_food'],
    weather_suitability: 'anything',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Expansive coastal park with cycling paths, beaches, water sports, and seafood restaurants.',
    rationale_hints: [
      'beach and outdoor activities',
      'cycling and water sports',
      'famous seafood dining'
    ],
    coordinates: { x: 700, y: 380 }
  },
  {
    id: 'pasir_ris_mangroves',
    name: 'Pasir Ris Park (Mangroves & Sustainability)',
    region: 'east',
    tags: ['nature-parks', 'sustainability', 'physical'],
    weather_suitability: 'anything',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Coastal park with mangrove boardwalk, nature trails, and family-friendly facilities.',
    rationale_hints: [
      'mangrove ecosystem exploration',
      'nature education',
      'family outdoor fun'
    ],
    coordinates: { x: 750, y: 280 }
  },
  {
    id: 'changi_beach',
    name: 'Changi Beach Park',
    region: 'east',
    tags: ['nature-parks', 'history'],
    weather_suitability: 'anything',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Tranquil beach park with historical significance and coastal views.',
    rationale_hints: [
      'peaceful coastal retreat',
      'historical heritage',
      'sunset views'
    ],
    coordinates: { x: 800, y: 300 }
  },

  // --- Northeast ---
  {
    id: 'seletar_hills',
    name: 'Seletar Hills Neighbourhood',
    region: 'northeast',
    tags: ['hidden', 'heritage', 'nature-parks'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'family-young-kids', 'family-teens', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Charming colonial-era neighborhood with black-and-white houses and rustic cafes.',
    rationale_hints: [
      'hidden colonial gem',
      'rustic charm',
      'peaceful escape'
    ],
    coordinates: { x: 520, y: 150 }
  },
  {
    id: 'punggol_waterway',
    name: 'Punggol Waterway Park',
    region: 'northeast',
    tags: ['nature-parks', 'physical'],
    weather_suitability: 'anything',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Modern waterfront park with scenic waterways, cycling paths, and recreational facilities.',
    rationale_hints: [
      'scenic waterway views',
      'cycling and jogging',
      'modern park design'
    ],
    coordinates: { x: 680, y: 200 }
  },
  {
    id: 'coney_island',
    name: 'Coney Island Park',
    region: 'northeast',
    tags: ['nature-parks', 'physical', 'sustainability', 'hidden'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Rustic island park with natural trails, wildlife, and unspoiled coastal landscapes.',
    rationale_hints: [
      'wild and natural',
      'off-the-beaten-path',
      'wildlife spotting'
    ],
    coordinates: { x: 720, y: 220 }
  },
  {
    id: 'kampung_lorong_buangkok',
    name: 'Kampung Lorong Buangkok',
    region: 'northeast',
    tags: ['heritage', 'hidden'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: "Singapore's last surviving kampung (village) offering a glimpse into traditional life.",
    rationale_hints: [
      'last traditional kampung',
      'living heritage',
      'step back in time'
    ],
    coordinates: { x: 600, y: 180 }
  },

  // --- North ---
  {
    id: 'sembawang_hot_spring',
    name: 'Sembawang Hot Spring Park',
    region: 'north',
    tags: ['nature-parks', 'heritage', 'hidden'],
    weather_suitability: 'anything',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'group-friends', 'solo'],
    duration_options: ['half-day', '1-day'],
    description: 'Natural hot spring park where you can collect thermal water and enjoy foot baths.',
    rationale_hints: [
      'unique natural hot spring',
      'therapeutic experience',
      'local hidden gem'
    ],
    coordinates: { x: 450, y: 100 }
  },
  {
    id: 'sungei_buloh',
    name: 'Sungei Buloh Wetland Reserve',
    region: 'north',
    tags: ['nature-parks', 'sustainability'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Internationally recognized wetland reserve with mangroves, mudflats, and migratory birds.',
    rationale_hints: [
      'birdwatching paradise',
      'wetland ecosystem',
      'nature photography'
    ],
    coordinates: { x: 350, y: 120 }
  },
  {
    id: 'kranji_marshes',
    name: 'Kranji Marshes',
    region: 'north',
    tags: ['nature-parks', 'hidden'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Freshwater marshland with diverse wildlife and scenic boardwalk trails.',
    rationale_hints: [
      'hidden nature gem',
      'wildlife sanctuary',
      'peaceful marshland walks'
    ],
    coordinates: { x: 320, y: 140 }
  },

  // --- West ---
  {
    id: 'west_coast_park',
    name: 'West Coast Park',
    region: 'west',
    tags: ['nature-parks', 'physical'],
    weather_suitability: 'anything',
    compatible_profiles: ['family-young-kids', 'family-teens', 'group-friends', 'couple', 'solo'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Coastal park with playgrounds, cycling paths, and waterfront activities.',
    rationale_hints: [
      'family-friendly facilities',
      'coastal recreation',
      'cycling and picnics'
    ],
    coordinates: { x: 250, y: 380 }
  },
  {
    id: 'queenstown_hdb',
    name: 'Queenstown Heritage HDB',
    region: 'west',
    tags: ['heritage', 'history'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'family-teens', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: "Singapore's first satellite town with heritage HDB blocks and nostalgic architecture.",
    rationale_hints: [
      'first satellite town',
      'HDB heritage',
      'nostalgic architecture'
    ],
    coordinates: { x: 320, y: 340 }
  },
  {
    id: 'jurong_lake_gardens',
    name: 'Jurong Lake Gardens',
    region: 'west',
    tags: ['nature-parks', 'physical', 'sustainability'],
    weather_suitability: 'anything',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Expansive lakeside gardens with themed areas, playgrounds, and nature trails.',
    rationale_hints: [
      'lakeside serenity',
      'themed garden areas',
      'family recreation'
    ],
    coordinates: { x: 200, y: 360 }
  },
  {
    id: 'jurong_eco_garden',
    name: 'Jurong Eco-Garden',
    region: 'west',
    tags: ['nature-parks', 'sustainability', 'hidden'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Sustainable garden showcasing native plants and eco-friendly landscaping.',
    rationale_hints: [
      'eco-friendly design',
      'native plant showcase',
      'hidden green space'
    ],
    coordinates: { x: 210, y: 370 }
  },
  {
    id: 'ntu_heritage_garden',
    name: 'NTU Heritage Garden / Yunnan Garden',
    region: 'west',
    tags: ['nature-parks', 'heritage', 'sustainability'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'family-young-kids', 'family-teens', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Tranquil Chinese-style garden on NTU campus with pagodas and scenic lake.',
    rationale_hints: [
      'Chinese garden aesthetics',
      'peaceful campus retreat',
      'heritage architecture'
    ],
    coordinates: { x: 180, y: 350 }
  },
  {
    id: 'one_north_park',
    name: 'one-north Park',
    region: 'west',
    tags: ['nature-parks'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Modern urban park in the tech and research hub with green spaces and city views.',
    rationale_hints: [
      'modern urban oasis',
      'tech district greenery',
      'contemporary design'
    ],
    coordinates: { x: 280, y: 330 }
  },

  // --- Central (Heritage & Culture) ---
  {
    id: 'chinatown_core',
    name: 'Chinatown Historic District',
    region: 'central',
    tags: ['heritage', 'culture', 'local_food', 'history'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Historic neighborhood with traditional shophouses, temples, hawker centers, and vibrant street markets.',
    rationale_hints: [
      'authentic local experience',
      'rich cultural immersion',
      'excellent street food scene'
    ],
    coordinates: { x: 400, y: 290 }
  },
  {
    id: 'chinatown_complex_hawker',
    name: 'Chinatown Complex Food Centre',
    region: 'central',
    tags: ['local_food', 'heritage'],
    weather_suitability: 'indoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Iconic hawker center with affordable local food and Michelin-starred stalls.',
    rationale_hints: [
      'legendary hawker food',
      'budget-friendly dining',
      'Michelin-starred options'
    ],
    coordinates: { x: 395, y: 295 }
  },
  {
    id: 'kampong_glam',
    name: 'Kampong Glam & Arab Street',
    region: 'central',
    tags: ['heritage', 'culture', 'art', 'local_food'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Malay-Arab quarter with Sultan Mosque, colorful murals, boutique shops, and Middle Eastern cuisine.',
    rationale_hints: [
      'vibrant cultural quarter',
      'iconic Sultan Mosque',
      'trendy cafes and shops'
    ],
    coordinates: { x: 480, y: 280 }
  },
  {
    id: 'little_india',
    name: 'Little India',
    region: 'central',
    tags: ['culture', 'heritage', 'local_food'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Vibrant Indian enclave with colorful streets, temples, spice shops, and authentic cuisine.',
    rationale_hints: [
      'sensory cultural experience',
      'authentic Indian flavors',
      'vibrant atmosphere'
    ],
    coordinates: { x: 460, y: 260 }
  },
  {
    id: 'tekka_centre_area',
    name: 'Tekka Market & Surrounds',
    region: 'central',
    tags: ['local_food', 'culture', 'heritage'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Bustling wet market and hawker center in the heart of Little India.',
    rationale_hints: [
      'local market experience',
      'authentic Indian food',
      'cultural immersion'
    ],
    coordinates: { x: 465, y: 265 }
  },
  {
    id: 'jalan_besar',
    name: 'Jalan Besar',
    region: 'central',
    tags: ['heritage', 'local_food', 'hidden'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Hip neighborhood blending heritage shophouses with modern cafes and local trades.',
    rationale_hints: [
      'hipster heritage blend',
      'vanishing trades',
      'trendy food scene'
    ],
    coordinates: { x: 470, y: 270 }
  },
  {
    id: 'moonstone_lane_estate',
    name: 'Moonstone Lane Estate',
    region: 'central',
    tags: ['heritage', 'local_food', 'hidden'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Charming heritage estate with traditional trades and local eateries.',
    rationale_hints: [
      'hidden heritage gem',
      'traditional crafts',
      'local neighborhood feel'
    ],
    coordinates: { x: 410, y: 300 }
  },
  {
    id: 'tiong_bahru',
    name: 'Tiong Bahru Estate',
    region: 'central',
    tags: ['heritage', 'local_food'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Charming pre-war estate with Art Deco architecture, indie bookstores, and trendy cafes.',
    rationale_hints: [
      'Art Deco heritage',
      'hipster cafe culture',
      'nostalgic charm'
    ],
    coordinates: { x: 380, y: 320 }
  },
  {
    id: 'holland_village',
    name: 'Holland Village & Chip Bee',
    region: 'central',
    tags: ['local_food'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Expat-favorite neighborhood with diverse dining, bars, and laid-back atmosphere.',
    rationale_hints: [
      'diverse dining scene',
      'relaxed vibe',
      'international flavors'
    ],
    coordinates: { x: 300, y: 310 }
  },
  {
    id: 'lau_pa_sat_telok_ayer',
    name: 'Lau Pa Sat & Telok Ayer Street',
    region: 'central',
    tags: ['local_food', 'heritage', 'history'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Historic Victorian market turned hawker center with satay street and heritage temples.',
    rationale_hints: [
      'iconic Victorian architecture',
      'famous satay street',
      'heritage temples nearby'
    ],
    coordinates: { x: 440, y: 310 }
  },
  {
    id: 'vanishing_trades_barber',
    name: 'Lim Beng Barber Shop (Vanishing Trades)',
    region: 'central',
    tags: ['heritage', 'local_food', 'hidden'],
    weather_suitability: 'indoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Traditional barber shop representing Singapore\'s vanishing trades and heritage crafts.',
    rationale_hints: [
      'living heritage',
      'traditional craftsmanship',
      'nostalgic experience'
    ],
    coordinates: { x: 415, y: 285 }
  },

  // --- Central (Nature & Parks) ---
  {
    id: 'sg_botanic_gardens',
    name: 'Singapore Botanic Gardens',
    region: 'central',
    tags: ['nature-parks', 'heritage'],
    weather_suitability: 'anything',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'UNESCO World Heritage Site with lush gardens, National Orchid Garden, and heritage trees.',
    rationale_hints: [
      'UNESCO heritage site',
      'stunning orchid collection',
      'peaceful green escape'
    ],
    coordinates: { x: 340, y: 280 }
  },
  {
    id: 'bukit_timah_reserve',
    name: 'Bukit Timah Nature Reserve',
    region: 'central',
    tags: ['nature-parks', 'physical'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Primary rainforest reserve with hiking trails to Singapore\'s highest natural point.',
    rationale_hints: [
      'primary rainforest',
      'challenging hikes',
      'biodiversity hotspot'
    ],
    coordinates: { x: 310, y: 260 }
  },
  {
    id: 'macritchie_treetop',
    name: 'MacRitchie Reservoir & Treetop Walk',
    region: 'central',
    tags: ['nature-parks', 'physical', 'sustainability'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Scenic reservoir with forest trails and iconic suspension bridge through the canopy.',
    rationale_hints: [
      'treetop canopy walk',
      'reservoir views',
      'nature trails'
    ],
    coordinates: { x: 420, y: 240 }
  },
  {
    id: 'fort_canning_park',
    name: 'Fort Canning Park',
    region: 'central',
    tags: ['nature-parks', 'history', 'heritage', 'physical'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'family-teens', 'group-friends', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Historic hilltop park with colonial ruins, spice garden, and city views.',
    rationale_hints: [
      'historical significance',
      'colonial heritage',
      'urban green space'
    ],
    coordinates: { x: 430, y: 300 }
  },
  {
    id: 'labrador_nature_reserve',
    name: 'Labrador Nature Reserve',
    region: 'central',
    tags: ['nature-parks', 'history'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Coastal park with WWII relics, rocky shores, and secondary forest.',
    rationale_hints: [
      'WWII heritage',
      'coastal nature',
      'historical trails'
    ],
    coordinates: { x: 300, y: 380 }
  },
  {
    id: 'mount_faber',
    name: 'Mount Faber Park',
    region: 'central',
    tags: ['nature-parks', 'physical'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Hilltop park with panoramic harbor views and cable car access.',
    rationale_hints: [
      'stunning harbor views',
      'romantic sunset spot',
      'cable car experience'
    ],
    coordinates: { x: 360, y: 390 }
  },
  {
    id: 'southern_ridges',
    name: 'Southern Ridges & Henderson Waves',
    region: 'central',
    tags: ['nature-parks', 'physical'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: '10km elevated walkway connecting parks with iconic wave-shaped bridge.',
    rationale_hints: [
      'scenic elevated walkway',
      'iconic Henderson Waves',
      'panoramic city views'
    ],
    coordinates: { x: 340, y: 370 }
  },
  {
    id: 'gardens_by_the_bay',
    name: 'Gardens by the Bay (Outdoor Gardens)',
    region: 'central',
    tags: ['nature-parks', 'sustainability', 'art'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Iconic waterfront gardens featuring futuristic Supertrees and stunning light shows.',
    rationale_hints: [
      'futuristic Supertrees',
      'spectacular light show',
      'Instagram-worthy'
    ],
    coordinates: { x: 520, y: 350 }
  },
  {
    id: 'bishan_amk_park',
    name: 'Bishan–Ang Mo Kio Park',
    region: 'central',
    tags: ['nature-parks', 'sustainability'],
    weather_suitability: 'anything',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Award-winning park with naturalized river, playgrounds, and cycling paths.',
    rationale_hints: [
      'naturalized river design',
      'family-friendly',
      'sustainable landscaping'
    ],
    coordinates: { x: 450, y: 230 }
  },
  {
    id: 'kallang_riverside',
    name: 'Kallang Riverside Park',
    region: 'central',
    tags: ['physical'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Waterfront park with cycling paths, sports facilities, and river views.',
    rationale_hints: [
      'riverside recreation',
      'cycling and jogging',
      'sports facilities'
    ],
    coordinates: { x: 500, y: 290 }
  },
  {
    id: 'marina_barrage',
    name: 'Marina Barrage Roof & Gallery',
    region: 'central',
    tags: ['sustainability'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Sustainable water solution with rooftop park, kite-flying, and interactive gallery.',
    rationale_hints: [
      'sustainable engineering marvel',
      'rooftop kite-flying',
      'city skyline views'
    ],
    coordinates: { x: 540, y: 360 }
  },

  // --- Central (Museums & Arts) ---
  {
    id: 'national_museum',
    name: 'National Museum of Singapore',
    region: 'central',
    tags: ['museums', 'history', 'heritage'],
    weather_suitability: 'indoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Singapore\'s oldest museum showcasing national history and cultural heritage.',
    rationale_hints: [
      'comprehensive history',
      'interactive exhibits',
      'architectural beauty'
    ],
    coordinates: { x: 440, y: 290 }
  },
  {
    id: 'national_gallery',
    name: 'National Gallery Singapore',
    region: 'central',
    tags: ['art', 'culture', 'museums', 'history'],
    weather_suitability: 'indoor',
    compatible_profiles: ['solo', 'couple', 'family-teens', 'group-friends', 'family-young-kids'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: "Southeast Asia's largest visual arts museum in beautifully restored national monuments.",
    rationale_hints: [
      'world-class art collection',
      'architectural masterpiece',
      'Southeast Asian focus'
    ],
    coordinates: { x: 460, y: 310 }
  },
  {
    id: 'asian_civilisations_museum',
    name: 'Asian Civilisations Museum',
    region: 'central',
    tags: ['culture', 'heritage', 'museums'],
    weather_suitability: 'indoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Riverside museum exploring pan-Asian cultures and civilizations.',
    rationale_hints: [
      'Asian cultural heritage',
      'riverside location',
      'diverse collections'
    ],
    coordinates: { x: 450, y: 315 }
  },
  {
    id: 'peranakan_museum',
    name: 'Peranakan Museum',
    region: 'central',
    tags: ['museums', 'heritage', 'culture'],
    weather_suitability: 'indoor',
    compatible_profiles: ['solo', 'couple', 'family-young-kids', 'family-teens', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Dedicated museum showcasing Peranakan culture, heritage, and traditions.',
    rationale_hints: [
      'unique Peranakan culture',
      'intricate artifacts',
      'cultural deep-dive'
    ],
    coordinates: { x: 445, y: 295 }
  },
  {
    id: 'indian_heritage_centre',
    name: 'Indian Heritage Centre',
    region: 'central',
    tags: ['museums', 'culture', 'heritage'],
    weather_suitability: 'indoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Museum documenting Indian community\'s contributions to Singapore.',
    rationale_hints: [
      'Indian diaspora history',
      'cultural contributions',
      'interactive displays'
    ],
    coordinates: { x: 465, y: 260 }
  },
  {
    id: 'malay_heritage_centre',
    name: 'Malay Heritage Centre / Kampong Gelam',
    region: 'central',
    tags: ['museums', 'culture', 'heritage'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Former Malay royal palace showcasing Malay-Singaporean heritage.',
    rationale_hints: [
      'Malay royal history',
      'cultural heritage',
      'beautiful palace grounds'
    ],
    coordinates: { x: 485, y: 280 }
  },
  {
    id: 'nus_museum_baba_house',
    name: 'NUS Museum & Baba House',
    region: 'central',
    tags: ['museums', 'heritage', 'culture'],
    weather_suitability: 'indoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'University museum and restored Peranakan ancestral home.',
    rationale_hints: [
      'authentic Peranakan home',
      'academic collections',
      'hidden gem'
    ],
    coordinates: { x: 290, y: 320 }
  },
  {
    id: 'artscience_museum',
    name: 'ArtScience Museum',
    region: 'central',
    tags: ['museums', 'art'],
    weather_suitability: 'indoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Iconic lotus-shaped museum blending art, science, and technology.',
    rationale_hints: [
      'innovative exhibitions',
      'art meets science',
      'iconic architecture'
    ],
    coordinates: { x: 510, y: 340 }
  },
  {
    id: 'gillman_barracks',
    name: 'Gillman Barracks',
    region: 'central',
    tags: ['art', 'heritage'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Contemporary art galleries in converted colonial military barracks.',
    rationale_hints: [
      'contemporary art hub',
      'colonial heritage',
      'gallery hopping'
    ],
    coordinates: { x: 330, y: 360 }
  },
  {
    id: 'esplanade',
    name: 'Esplanade – Theatres on the Bay',
    region: 'central',
    tags: ['art'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Iconic performing arts center with theaters, concerts, and waterfront views.',
    rationale_hints: [
      'world-class performances',
      'iconic durian architecture',
      'waterfront location'
    ],
    coordinates: { x: 490, y: 320 }
  },
  {
    id: 'cbd_public_art',
    name: 'CBD / Raffles Place Public Art Trail',
    region: 'central',
    tags: ['art', 'history'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Self-guided trail of sculptures and public art in the financial district.',
    rationale_hints: [
      'outdoor art gallery',
      'urban exploration',
      'architectural backdrop'
    ],
    coordinates: { x: 455, y: 320 }
  },
  {
    id: 'albatross_file_exhibition',
    name: 'The Albatross File Exhibition',
    region: 'central',
    tags: ['art', 'museums', 'sustainability'],
    weather_suitability: 'indoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Contemporary art exhibition exploring environmental themes.',
    rationale_hints: [
      'thought-provoking art',
      'environmental awareness',
      'contemporary issues'
    ],
    coordinates: { x: 470, y: 305 }
  },
  {
    id: 'civic_district_museums',
    name: 'Esplanade, National Gallery & National Museum Cluster',
    region: 'central',
    tags: ['museums', 'art', 'history', 'heritage'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['1-day', '2-days'],
    description: 'Cultural precinct with multiple museums and performing arts venues.',
    rationale_hints: [
      'cultural immersion',
      'museum hopping',
      'heritage architecture'
    ],
    coordinates: { x: 465, y: 305 }
  },

  // --- Religious & Spiritual Heritage ---
  {
    id: 'walk_of_faith',
    name: 'Walk of Faith (Multiple Places of Worship)',
    region: 'central',
    tags: ['heritage', 'culture', 'history'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'family-teens', 'group-friends', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Trail connecting diverse places of worship showcasing religious harmony.',
    rationale_hints: [
      'religious diversity',
      'cultural understanding',
      'architectural variety'
    ],
    coordinates: { x: 475, y: 285 }
  },
  {
    id: 'buddhist_learning_centre',
    name: 'Buddhist Learning Centre',
    region: 'central',
    tags: ['culture', 'heritage'],
    weather_suitability: 'indoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Buddhist center offering cultural insights and meditation sessions.',
    rationale_hints: [
      'spiritual learning',
      'peaceful atmosphere',
      'cultural education'
    ],
    coordinates: { x: 425, y: 275 }
  },
  {
    id: 'cbd_teochew_hokkien_temples',
    name: 'Teochew & Hokkien Temples in CBD',
    region: 'central',
    tags: ['heritage', 'history'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'family-teens', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Historic Chinese temples nestled among modern skyscrapers.',
    rationale_hints: [
      'old meets new',
      'Chinese heritage',
      'architectural contrast'
    ],
    coordinates: { x: 445, y: 315 }
  },
  {
    id: 'sri_mariamman_temple',
    name: 'Sri Mariamman Temple (Hindu)',
    region: 'central',
    tags: ['heritage', 'history'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Singapore\'s oldest Hindu temple with ornate gopuram tower.',
    rationale_hints: [
      'oldest Hindu temple',
      'stunning architecture',
      'cultural significance'
    ],
    coordinates: { x: 405, y: 295 }
  },
  {
    id: 'shuang_lin_monastery',
    name: 'Lian Shan Shuang Lin Monastery (Buddhist)',
    region: 'central',
    tags: ['heritage'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Historic Buddhist monastery with traditional Chinese architecture.',
    rationale_hints: [
      'serene monastery',
      'traditional architecture',
      'spiritual retreat'
    ],
    coordinates: { x: 550, y: 250 }
  },
  {
    id: 'masjid_omar_kampong_melaka',
    name: 'Masjid Omar Kampong Melaka (Oldest Mosque)',
    region: 'central',
    tags: ['heritage', 'history'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Singapore\'s oldest mosque with rich Malay heritage.',
    rationale_hints: [
      'oldest mosque',
      'Malay heritage',
      'historical significance'
    ],
    coordinates: { x: 490, y: 275 }
  },
  {
    id: 'armenian_church',
    name: 'Armenian Church of Saint Gregory',
    region: 'central',
    tags: ['heritage', 'history'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Singapore\'s oldest church with beautiful colonial architecture.',
    rationale_hints: [
      'oldest church',
      'colonial elegance',
      'peaceful sanctuary'
    ],
    coordinates: { x: 455, y: 300 }
  },
  {
    id: 'sikh_guru_singh_sabha',
    name: 'Gurdwara Sahib Sri Guru Singh Sabha',
    region: 'central',
    tags: ['heritage', 'culture'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Historic Sikh temple with distinctive architecture and community kitchen.',
    rationale_hints: [
      'Sikh heritage',
      'community spirit',
      'architectural beauty'
    ],
    coordinates: { x: 435, y: 270 }
  },
  {
    id: 'maghain_aboth_synagogue',
    name: 'Maghain Aboth Synagogue',
    region: 'central',
    tags: ['heritage', 'history'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Historic synagogue representing Singapore\'s Jewish community heritage.',
    rationale_hints: [
      'Jewish heritage',
      'historical architecture',
      'cultural diversity'
    ],
    coordinates: { x: 465, y: 295 }
  },

  // --- Additional Food Centers ---
  // West
  {
    id: 'taman_jurong_food_centre',
    name: 'Taman Jurong Market & Food Centre',
    region: 'west',
    tags: ['local_food', 'heritage'],
    weather_suitability: 'indoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Traditional neighborhood food centre with authentic local dishes and heritage atmosphere.',
    rationale_hints: [
      'authentic neighborhood dining',
      'traditional hawker culture',
      'local community hub'
    ],
    coordinates: { x: 220, y: 340 }
  },
  {
    id: 'jurong_west_505_food_centre',
    name: 'Jurong West 505 Market & Food Centre',
    region: 'west',
    tags: ['local_food'],
    weather_suitability: 'indoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Popular neighborhood food centre serving diverse local cuisines.',
    rationale_hints: [
      'diverse food options',
      'neighborhood favorite',
      'affordable dining'
    ],
    coordinates: { x: 200, y: 350 }
  },
  {
    id: 'bukit_batok_west_hawker',
    name: 'Bukit Batok West Hawker Centre',
    region: 'west',
    tags: ['local_food'],
    weather_suitability: 'indoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Local hawker centre with variety of traditional Singapore dishes.',
    rationale_hints: [
      'local hawker experience',
      'traditional dishes',
      'community dining'
    ],
    coordinates: { x: 240, y: 320 }
  },

  // North
  {
    id: 'chong_pang_food_centre',
    name: 'Chong Pang Market & Food Centre',
    region: 'north',
    tags: ['local_food', 'heritage'],
    weather_suitability: 'indoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Heritage food centre known for traditional dishes and local community atmosphere.',
    rationale_hints: [
      'heritage food culture',
      'traditional recipes',
      'local community gathering'
    ],
    coordinates: { x: 480, y: 120 }
  },
  {
    id: 'sembawang_hills_food_centre',
    name: 'Sembawang Hills Food Centre',
    region: 'north',
    tags: ['local_food'],
    weather_suitability: 'indoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Neighborhood food centre with authentic local flavors.',
    rationale_hints: [
      'neighborhood dining',
      'authentic flavors',
      'local favorites'
    ],
    coordinates: { x: 460, y: 110 }
  },

  // Northeast
  {
    id: 'ci_yuan_hawker_centre',
    name: 'Ci Yuan Hawker Centre (Hougang)',
    region: 'northeast',
    tags: ['local_food'],
    weather_suitability: 'indoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Modern hawker centre in Hougang with diverse food options.',
    rationale_hints: [
      'modern hawker experience',
      'diverse cuisines',
      'family-friendly dining'
    ],
    coordinates: { x: 620, y: 190 }
  },
  {
    id: 'serangoon_garden_market',
    name: 'Serangoon Garden Market & Food Centre',
    region: 'northeast',
    tags: ['local_food'],
    weather_suitability: 'indoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Popular market and food centre in Serangoon Garden area.',
    rationale_hints: [
      'market fresh produce',
      'local food variety',
      'neighborhood charm'
    ],
    coordinates: { x: 580, y: 210 }
  },

  // East
  {
    id: 'old_airport_road_food_centre',
    name: 'Old Airport Road Food Centre',
    region: 'east',
    tags: ['local_food', 'heritage'],
    weather_suitability: 'indoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Historic food centre with legendary hawker stalls and traditional dishes.',
    rationale_hints: [
      'legendary hawker stalls',
      'food heritage',
      'traditional recipes'
    ],
    coordinates: { x: 620, y: 350 }
  },
  {
    id: 'bedok_85_fengshan',
    name: 'Bedok 85 Fengshan Food Centre',
    region: 'east',
    tags: ['local_food'],
    weather_suitability: 'indoor',
    compatible_profiles: ['family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Popular food centre known for late-night dining and diverse food options.',
    rationale_hints: [
      'late-night dining',
      'popular food destination',
      'diverse options'
    ],
    coordinates: { x: 680, y: 370 }
  },
  {
    id: 'changi_village_hawker',
    name: 'Changi Village Hawker Centre',
    region: 'east',
    tags: ['local_food', 'heritage'],
    weather_suitability: 'indoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Waterfront hawker centre with heritage charm and fresh seafood options.',
    rationale_hints: [
      'waterfront dining',
      'heritage atmosphere',
      'fresh seafood'
    ],
    coordinates: { x: 820, y: 310 }
  },

  // Central (additional)
  {
    id: 'maxwell_food_centre',
    name: 'Maxwell Food Centre',
    region: 'central',
    tags: ['local_food', 'heritage'],
    weather_suitability: 'indoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Famous food centre in Chinatown with iconic hawker stalls and traditional dishes.',
    rationale_hints: [
      'iconic hawker stalls',
      'Chinatown location',
      'famous local dishes'
    ],
    coordinates: { x: 420, y: 300 }
  },
  {
    id: 'amoy_street_food_centre',
    name: 'Amoy Street Food Centre',
    region: 'central',
    tags: ['local_food'],
    weather_suitability: 'indoor',
    compatible_profiles: ['family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Popular food centre in the CBD area with quality hawker fare.',
    rationale_hints: [
      'CBD dining',
      'quality hawker food',
      'convenient location'
    ],
    coordinates: { x: 450, y: 320 }
  },
  {
    id: 'newton_food_centre',
    name: 'Newton Food Centre',
    region: 'central',
    tags: ['local_food', 'heritage'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Famous open-air food centre known for barbecue seafood and tourist-friendly atmosphere.',
    rationale_hints: [
      'famous barbecue seafood',
      'tourist destination',
      'open-air dining'
    ],
    coordinates: { x: 430, y: 270 }
  },
  {
    id: 'tiong_bahru_food_centre',
    name: 'Tiong Bahru Food Centre',
    region: 'central',
    tags: ['local_food', 'heritage'],
    weather_suitability: 'indoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Heritage food centre in charming Tiong Bahru estate with traditional and modern stalls.',
    rationale_hints: [
      'heritage estate dining',
      'traditional and modern mix',
      'charming neighborhood'
    ],
    coordinates: { x: 380, y: 330 }
  },

  // --- Additional North Region Locations ---
  {
    id: 'upper_seletar_reservoir_park',
    name: 'Upper Seletar Reservoir Park',
    region: 'north',
    tags: ['nature-parks', 'sustainability'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Scenic reservoir park with waterfront views, biodiversity, and city skyline vistas.',
    rationale_hints: [
      'waterfront tranquility',
      'city skyline views',
      'nature biodiversity'
    ],
    coordinates: { x: 400, y: 80 }
  },
  {
    id: 'woodlands_waterfront_park',
    name: 'Woodlands Waterfront Park',
    region: 'north',
    tags: ['nature-parks', 'physical'],
    weather_suitability: 'anything',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Family-friendly waterfront park with stunning views across the Johor Strait.',
    rationale_hints: [
      'waterfront recreation',
      'family activities',
      'cross-border views'
    ],
    coordinates: { x: 380, y: 60 }
  },
  {
    id: 'sembawang_park',
    name: 'Sembawang Park & Battleship Playground',
    region: 'north',
    tags: ['nature-parks', 'history', 'physical'],
    weather_suitability: 'anything',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Waterfront park with unique battleship-themed playground and historical significance.',
    rationale_hints: [
      'unique battleship playground',
      'waterfront activities',
      'historical heritage'
    ],
    coordinates: { x: 440, y: 90 }
  },
  {
    id: 'kranji_war_memorial',
    name: 'Kranji War Memorial',
    region: 'north',
    tags: ['history', 'heritage'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Solemn war memorial honoring WWII heroes with peaceful gardens and reflection spaces.',
    rationale_hints: [
      'historical remembrance',
      'peaceful reflection',
      'war heritage'
    ],
    coordinates: { x: 330, y: 110 }
  },
  {
    id: 'bollywood_farms',
    name: 'Bollywood Farms (Kranji Countryside)',
    region: 'north',
    tags: ['sustainability', 'nature-parks', 'local_food', 'hidden'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Hidden gem farm in Kranji countryside offering sustainable farming experiences and fresh produce.',
    rationale_hints: [
      'sustainable farming',
      'countryside escape',
      'fresh farm produce'
    ],
    coordinates: { x: 310, y: 130 }
  },
  {
    id: 'khatib_bongsu_mangroves',
    name: 'Khatib Bongsu Mangroves (Kayak Tours)',
    region: 'north',
    tags: ['nature-parks', 'sustainability', 'physical'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Pristine mangrove ecosystem accessible by kayak tours, showcasing Singapore\'s biodiversity.',
    rationale_hints: [
      'mangrove exploration',
      'kayaking adventure',
      'biodiversity discovery'
    ],
    coordinates: { x: 420, y: 70 }
  },
  {
    id: 'orto_yishun',
    name: 'ORTO @ Yishun Leisure Park',
    region: 'north',
    tags: ['physical', 'local_food', 'nature-parks'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Leisure park with recreational activities, dining options, and waterfront views.',
    rationale_hints: [
      'recreational activities',
      'waterfront dining',
      'family entertainment'
    ],
    coordinates: { x: 460, y: 140 }
  },
  {
    id: 'jenal_jetty',
    name: 'Jenal Jetty (Kranji Fishing Village)',
    region: 'north',
    tags: ['heritage', 'hidden'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Hidden heritage fishing village jetty showcasing traditional maritime trades and crafts.',
    rationale_hints: [
      'traditional fishing village',
      'maritime heritage',
      'hidden local gem'
    ],
    coordinates: { x: 300, y: 120 }
  },
  // Additional North locations
  {
    id: 'singapore_zoo_cluster',
    name: 'Singapore Zoo, River Wonders & Bird Paradise Cluster',
    region: 'north',
    tags: ['nature-parks', 'physical', 'sustainability'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'group-friends'],
    duration_options: ['1-day', '2-days'],
    description: 'World-class wildlife cluster featuring zoo, river safari, and bird park experiences.',
    rationale_hints: [
      'wildlife encounters',
      'family-friendly attractions',
      'conservation education'
    ],
    coordinates: { x: 380, y: 100 }
  },
  {
    id: 'old_ford_factory',
    name: 'Reflections at Bukit Chandu / Old Ford Factory',
    region: 'north',
    tags: ['history', 'heritage', 'museums'],
    weather_suitability: 'indoor',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Historical museum sites commemorating WWII and Singapore\'s wartime history.',
    rationale_hints: [
      'WWII history',
      'museum experience',
      'heritage education'
    ],
    coordinates: { x: 320, y: 140 }
  },
  {
    id: 'yishun_park',
    name: 'Yishun Park',
    region: 'north',
    tags: ['nature-parks', 'hidden'],
    weather_suitability: 'anything',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Neighborhood park with natural landscapes and recreational facilities.',
    rationale_hints: [
      'local park',
      'nature walks',
      'neighborhood gem'
    ],
    coordinates: { x: 420, y: 110 }
  },
  // Additional Northeast locations
  {
    id: 'punggol_park',
    name: 'Punggol Park',
    region: 'northeast',
    tags: ['nature-parks', 'hidden'],
    weather_suitability: 'anything',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Waterfront park with scenic views and family-friendly amenities.',
    rationale_hints: [
      'waterfront views',
      'family activities',
      'neighborhood park'
    ],
    coordinates: { x: 680, y: 140 }
  },
  {
    id: 'hougang_heritage_trail',
    name: 'Hougang Heritage Trail (Heartland Walk)',
    region: 'northeast',
    tags: ['heritage', 'hidden', 'local_food'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Heritage trail through heartland neighborhoods showcasing local culture and food.',
    rationale_hints: [
      'heartland heritage',
      'local neighborhoods',
      'authentic Singapore'
    ],
    coordinates: { x: 640, y: 180 }
  },
  {
    id: 'ang_mo_kio_town_garden',
    name: 'Ang Mo Kio Town Garden East & West',
    region: 'northeast',
    tags: ['nature-parks', 'physical', 'hidden'],
    weather_suitability: 'anything',
    compatible_profiles: ['family-young-kids', 'family-teens', 'couple', 'solo', 'group-friends'],
    duration_options: ['half-day', '1-day'],
    description: 'Town gardens with jogging paths, exercise areas, and green spaces.',
    rationale_hints: [
      'neighborhood gardens',
      'exercise facilities',
      'community spaces'
    ],
    coordinates: { x: 580, y: 160 }
  },
  // Additional East locations
  {
    id: 'bedok_reservoir_park',
    name: 'Bedok Reservoir Park',
    region: 'east',
    tags: ['nature-parks', 'physical', 'hidden'],
    weather_suitability: 'anything',
    compatible_profiles: ['family-teens', 'couple', 'solo', 'group-friends', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Reservoir park with water activities, jogging trails, and scenic views.',
    rationale_hints: [
      'water activities',
      'jogging trails',
      'scenic reservoir'
    ],
    coordinates: { x: 720, y: 240 }
  },
  {
    id: 'siglap_neighbourhood',
    name: 'Siglap Neighbourhood Walk',
    region: 'east',
    tags: ['heritage', 'hidden', 'local_food'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Charming neighborhood walk through heritage shophouses and local eateries.',
    rationale_hints: [
      'neighborhood charm',
      'heritage shophouses',
      'local dining'
    ],
    coordinates: { x: 700, y: 280 }
  },
  {
    id: 'changi_boardwalk',
    name: 'Changi Point Coastal Walk (Boardwalk)',
    region: 'east',
    tags: ['nature-parks', 'heritage'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Coastal boardwalk with sea views, heritage sites, and waterfront dining.',
    rationale_hints: [
      'coastal views',
      'heritage sites',
      'waterfront experience'
    ],
    coordinates: { x: 800, y: 200 }
  },
  // Additional West locations
  {
    id: 'rail_corridor_west',
    name: 'Rail Corridor (Western Segment)',
    region: 'west',
    tags: ['nature-parks', 'heritage', 'physical', 'hidden'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Historic railway corridor converted into green trail for walking and cycling.',
    rationale_hints: [
      'heritage railway',
      'green corridor',
      'urban trail'
    ],
    coordinates: { x: 240, y: 200 }
  },
  {
    id: 'bukit_batok_nature_park',
    name: 'Bukit Batok Nature Park',
    region: 'west',
    tags: ['nature-parks', 'history', 'physical'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens', 'family-young-kids'],
    duration_options: ['half-day', '1-day'],
    description: 'Nature park with WWII memorial, quarry lake, and forest trails.',
    rationale_hints: [
      'nature trails',
      'historical memorial',
      'quarry lake views'
    ],
    coordinates: { x: 280, y: 180 }
  },
  {
    id: 'clementi_forest',
    name: 'Clementi Forest (Unpaved Trail)',
    region: 'west',
    tags: ['nature-parks', 'physical', 'sustainability', 'hidden'],
    weather_suitability: 'anything',
    compatible_profiles: ['solo', 'couple', 'group-friends', 'family-teens'],
    duration_options: ['half-day', '1-day'],
    description: 'Natural forest with unpaved trails and rich biodiversity.',
    rationale_hints: [
      'natural forest',
      'unpaved trails',
      'biodiversity hotspot'
    ],
    coordinates: { x: 260, y: 220 }
  }
];
