# weekend.sg 🇸🇬

Your personalized Singapore weekend planner. Generate custom itineraries based on your preferences, weather, and interests.

## 🌟 Features

- **Personalized Recommendations**: Choose your travel profile, duration, activities, and weather preferences
- **98 Curated Locations**: Covering all regions of Singapore with diverse activities
- **Interactive Map**: Click regions to see top recommendations
- **Smart Filtering**: Locations are filtered and scored based on your preferences
- **Location Selection**: Choose from multiple matching locations with skip/exclusion management
- **Copy to Clipboard**: Share your itinerary easily
- **Region Badges**: See which region each location belongs to
- **Print-Friendly**: Optimized print stylesheet for paper itineraries
- **Mobile-Responsive**: Works seamlessly on all devices

## 🚀 Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weekend-sg.git
cd weekend-sg
```

2. Start a local server:
```bash
python3 -m http.server 8000
```

3. Open your browser to `http://localhost:8000`

### GitHub Pages Deployment

This is a static site that works perfectly with GitHub Pages:

1. Push to GitHub
2. Go to Settings → Pages
3. Select branch `main` and folder `/` (root)
4. Your site will be live at `https://yourusername.github.io/weekend-sg/`

## 📁 Project Structure

```
weekend-sg/
├── index.html              # Main HTML file
├── styles/
│   ├── main.css           # Global styles and layout
│   ├── components.css     # Component-specific styles
│   ├── map.css           # Map and region button styles
│   └── print.css         # Print-optimized stylesheet
├── scripts/
│   ├── main.js           # Application entry point
│   ├── data/
│   │   ├── locations.js  # 98 location data entries
│   │   └── templates.js  # Rationale generation templates
│   ├── engine/
│   │   ├── recommender.js           # Base recommendation engine
│   │   ├── enhanced-recommender.js  # Enhanced engine with selection
│   │   └── rationale.js            # Rationale text generation
│   └── ui/
│       ├── preferences.js          # Preference management
│       ├── map-interactions.js     # Map and region interactions
│       ├── location-selection.js   # Selection modal and exclusions
│       └── results.js             # Results rendering
└── assets/
    └── Singapore Map.png  # Map image asset
```

## 🎯 How It Works

### 1. Preference Selection
Users select:
- **Duration**: Half day, 1 day, or 2 days
- **Profile**: Solo, Couple, Family (young kids/teens), or Friends
- **Regions**: Central, North, Northeast, East, West (multi-select)
- **Activities**: Nature, Culture, Food, Museums, etc. (multi-select)
- **Weather**: Any weather, Indoor only, or Mixed

### 2. Recommendation Algorithm

The engine follows this pipeline:
1. **Profile Filtering**: Only locations compatible with selected profile
2. **Weather Filtering**: Respects weather hierarchy (anything > short-outdoor > indoor)
3. **Region Filtering**: If regions selected, only show those regions
4. **Activity Scoring**: Locations matching selected activities get higher scores
5. **Region Bonus**: Locations in selected regions get bonus points
6. **Sorting**: Sort by total score (highest first)
7. **Selection**: If many matches, show selection modal; otherwise show top N
8. **Regional Ordering**: Final itinerary ordered by geographic regions

### 3. Location Selection Modal
When more locations match than needed:
- Shows all matching locations sorted by score
- Pre-selects top recommendations
- Users can check/uncheck locations
- "Skip this time" to exclude locations from future recommendations
- Exclusion management panel to review and unskip locations
- Regenerate button to get new recommendations

### 4. Results Display
- Personalized rationale explaining the recommendations
- Numbered itinerary with location details
- Region badges showing which area each location is in
- Activity tags for each location
- Copy to clipboard for easy sharing
- For 2-day trips, automatically splits into Day 1 and Day 2

## 🗺️ Interactive Map Features

- **Region Buttons**: Click Central, North, Northeast, East, or West
- **Auto-Recommendations**: Shows top 5-10 places for clicked region
- **Dynamic Counts**: Region buttons show actual location counts
- **Visual Feedback**: Selected regions highlighted on map

## 📊 Data Structure

Each location includes:
- `id`: Unique identifier
- `name`: Location name
- `region`: Geographic region (central/north/northeast/east/west)
- `tags`: Activity tags (nature-parks, culture, local_food, etc.)
- `weather_suitability`: Weather compatibility (anything/short-outdoor/indoor)
- `compatible_profiles`: Suitable for which traveler types
- `duration_options`: Suitable trip durations
- `description`: Brief description
- `rationale_hints`: Phrases for rationale generation
- `coordinates`: Map positioning (x, y)

## 🛠️ Technology Stack

- **Vanilla JavaScript (ES6+)**: No frameworks, just modern JS
- **CSS3**: Custom properties, flexbox, grid
- **HTML5**: Semantic markup
- **ES6 Modules**: Clean, modular code organization
- **No Build Tools**: Works directly in browser
- **No Backend**: Fully static, deployable anywhere

## 🎨 Design Principles

- **Mobile-First**: Responsive design for all screen sizes
- **Accessibility**: Keyboard navigation, sufficient contrast, touch targets
- **Performance**: Minimal dependencies, optimized assets
- **User-Friendly**: Clear interface, helpful feedback, intuitive interactions
- **Singaporean**: Local language, familiar locations, authentic recommendations

## 📝 License

MIT License - feel free to use and modify!

## 🤝 Contributing

Contributions welcome! Feel free to:
- Add more locations
- Improve the recommendation algorithm
- Enhance the UI/UX
- Fix bugs
- Add features

## 🙏 Acknowledgments

Built with ❤️ for Singapore weekend explorers.
