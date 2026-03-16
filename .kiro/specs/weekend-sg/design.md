# Design Document: weekend.sg

## Overview

weekend.sg is a client-side static web application that generates personalized weekend itineraries for Singapore visitors. The application uses a rule-based recommendation engine to match user preferences with curated locations, presenting results through an interactive interface featuring a custom SVG map and modern UI components.

The design prioritizes simplicity and deployability: no backend server, no external APIs, no build tools required. All logic executes in vanilla JavaScript, all data lives in client-side JSON structures, and the entire application can be served as static files from GitHub Pages.

### Key Design Principles

1. **Static-first architecture**: Pure HTML/CSS/JavaScript with no server dependencies
2. **Progressive enhancement**: Core functionality works without JavaScript, enhanced with interactivity
3. **Component-based UI**: Reusable UI patterns (cards, chips, segmented controls) with consistent styling
4. **Rule-based recommendations**: Transparent, deterministic scoring algorithm without AI/ML complexity
5. **Template-based rationale**: Human-readable explanations generated from structured templates

## Architecture

### System Architecture

The application follows a simple three-layer client-side architecture:

```
┌─────────────────────────────────────────────────────────┐
│                     Presentation Layer                   │
│  (HTML structure + CSS styling + DOM manipulation)       │
│                                                           │
│  - Preference Panel Components                           │
│  - Interactive SVG Map                                   │
│  - Results Display                                       │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      Business Logic Layer                │
│              (Vanilla JavaScript modules)                │
│                                                           │
│  - Recommendation Engine (filtering + scoring)           │
│  - Rationale Generator (template substitution)           │
│  - UI State Manager (selection tracking)                 │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                        Data Layer                        │
│                  (Static JSON structures)                │
│                                                           │
│  - Location Data (locations.js)                          │
│  - Rationale Templates (templates.js)                    │
└─────────────────────────────────────────────────────────┘
```

### File Structure

```
weekend-sg/
├── index.html              # Main HTML structure
├── styles/
│   ├── main.css           # Global styles and layout
│   ├── components.css     # UI component styles (cards, chips, etc.)
│   ├── map.css            # SVG map specific styles
│   └── print.css          # Print-friendly stylesheet
├── scripts/
│   ├── data/
│   │   ├── locations.js   # Location data array
│   │   └── templates.js   # Rationale templates
│   ├── ui/
│   │   ├── preferences.js # Preference panel interactions
│   │   ├── map.js         # Map interactions and tooltips
│   │   ├── results.js     # Results rendering
│   │   └── mobile-summary.js # Mobile summary view
│   ├── engine/
│   │   ├── recommender.js # Recommendation algorithm
│   │   └── rationale.js   # Rationale generation
│   └── main.js            # Application initialization
└── assets/
    └── map.svg            # Singapore map SVG (optional external)
```

### Module Organization

**Option 1: ES6 Modules** (recommended for maintainability)
- Use `type="module"` in script tags
- Import/export between modules
- Better code organization and testability

**Option 2: Single Script File** (simpler deployment)
- Concatenate all JavaScript into one file
- Use IIFE pattern for namespace isolation
- Fewer HTTP requests

The design supports both approaches. For initial development, ES6 modules provide better structure. For production, modules can be concatenated if needed.

## Components and Interfaces

### UI Components

#### 1. Duration Card Component

Visual card for selecting trip duration.

**Structure:**
```html
<div class="duration-card" data-value="1-day">
  <div class="duration-card__icon">📅</div>
  <div class="duration-card__label">1 day</div>
</div>
```

**States:**
- Default: Neutral background, subtle border
- Hover: Elevated shadow, border color change
- Selected: Accent background, bold border, checkmark indicator

**Behavior:**
- Click toggles selection (radio button behavior)
- Only one card selected at a time
- Emits custom event: `duration-selected` with value

#### 2. Chip Component

Pill-shaped button for tags and categories.

**Structure:**
```html
<button class="chip" data-value="nature-parks">
  Nature/parks
</button>
```

**Variants:**
- Single-select chip (Region Selector)
- Multi-select chip (Activity Selector)
- Display-only chip (Results tags)

**States:**
- Default: Light background, rounded corners
- Hover: Darker background
- Selected: Accent color background, white text
- Disabled: Grayed out, no pointer events

**Behavior:**
- Single-select: Radio button behavior
- Multi-select: Checkbox behavior
- Emits custom event: `chip-toggled` with value and state

#### 3. Profile Card Component

Larger card for selecting travel profile.

**Structure:**
```html
<div class="profile-card" data-value="family-young-kids">
  <div class="profile-card__icon">👨‍👩‍👧‍👦</div>
  <div class="profile-card__title">Family with young kids</div>
  <div class="profile-card__description">Kid-friendly activities</div>
</div>
```

**States:**
- Default: White background, border
- Hover: Shadow elevation
- Selected: Accent border, background tint

**Behavior:**
- Click toggles selection (radio button behavior)
- Only one profile selected at a time
- Emits custom event: `profile-selected` with value

#### 4. Segmented Control Component

Grouped button control for mutually exclusive options.

**Structure:**
```html
<div class="segmented-control">
  <button class="segmented-control__option" data-value="anything">
    Anything goes
  </button>
  <button class="segmented-control__option" data-value="indoor">
    Mostly indoor/sheltered
  </button>
  <button class="segmented-control__option" data-value="short-outdoor">
    Short outdoor walks
  </button>
</div>
```

**States:**
- Default: Light background, borders between options
- Hover: Slight background change
- Selected: Accent background, white text

**Behavior:**
- Click selects option (radio button behavior)
- Visual connection between buttons (no gaps)
- Emits custom event: `weather-selected` with value

#### 5. Interactive Map Component

SVG-based map with clickable hotspots.

**Structure:**
```html
<svg id="singapore-map" viewBox="0 0 800 600">
  <!-- Base map paths -->
  <g id="map-base">
    <path d="..." fill="#f0f0f0" />
  </g>
  
  <!-- Hotspots -->
  <g id="hotspots">
    <circle class="hotspot" 
            data-location-id="gardens-by-bay"
            cx="450" cy="380" r="20" />
  </g>
</svg>

<div id="map-tooltip" class="map-tooltip hidden">
  <div class="map-tooltip__name"></div>
  <div class="map-tooltip__description"></div>
</div>
```

**Behavior:**
- Hover shows tooltip with location name and mini description
- Click shows same tooltip (for touch devices)
- Tooltip positioned near cursor/hotspot
- Hotspots visually distinct (colored circles or custom icons)

**Styling:**
- Hotspots: Colored circles with hover scale effect
- Tooltip: White background, shadow, rounded corners
- Map base: Simplified Singapore outline, neutral colors

#### 6. Mobile Summary View Component

Screenshot-optimized itinerary display for saving to mobile devices.

**Structure:**
```html
<div id="mobile-summary" class="mobile-summary hidden">
  <div class="mobile-summary__header">
    <h2>Your Weekend.sg Itinerary</h2>
    <button class="mobile-summary__close">Back to Planning</button>
  </div>
  
  <div class="mobile-summary__rationale">
    <!-- Rationale text -->
  </div>
  
  <div class="mobile-summary__itinerary">
    <!-- Compact location cards -->
  </div>
  
  <div class="mobile-summary__footer">
    <p>Generated by weekend.sg</p>
  </div>
</div>
```

**Behavior:**
- Triggered by "Save for Trip" button in results area
- Displays full-screen overlay with itinerary
- Optimized for mobile screenshots (single column, high contrast)
- "Back to Planning" button returns to main interface

**Styling:**
- Full viewport height, white background
- Large, readable fonts (16px minimum)
- High contrast colors for readability
- Compact spacing to fit more content
- No interactive elements except close button
- Clean, minimal design suitable for screenshots

### JavaScript Interfaces

#### PreferenceManager

Manages user preference selections and state.

```javascript
class PreferenceManager {
  constructor() {
    this.preferences = {
      duration: null,        // 'half-day' | '1-day' | '2-days'
      region: 'no-preference', // 'central' | 'north' | 'east' | 'west' | 'northeast' | 'no-preference'
      profile: null,         // 'solo' | 'couple' | 'family-young-kids' | 'family-teens' | 'group-friends'
      activities: [],        // Array of activity tag strings
      weather: 'anything'    // 'anything' | 'indoor' | 'short-outdoor'
    };
  }
  
  setDuration(value) { /* ... */ }
  setRegion(value) { /* ... */ }
  setProfile(value) { /* ... */ }
  toggleActivity(value) { /* ... */ }
  setWeather(value) { /* ... */ }
  getPreferences() { return this.preferences; }
  isValid() { /* Check if required fields are set */ }
}
```

#### RecommendationEngine

Core algorithm for filtering and scoring locations.

```javascript
class RecommendationEngine {
  constructor(locations) {
    this.locations = locations;
  }
  
  /**
   * Generate itinerary based on preferences
   * @param {Object} preferences - User preferences from PreferenceManager
   * @returns {Array} Ordered array of location objects
   */
  generateItinerary(preferences) {
    // 1. Filter by profile compatibility
    let candidates = this.filterByProfile(preferences.profile);
    
    // 2. Filter by weather suitability
    candidates = this.filterByWeather(candidates, preferences.weather);
    
    // 3. Score by activity tag matching
    candidates = this.scoreByActivities(candidates, preferences.activities);
    
    // 4. Apply region bonus
    candidates = this.applyRegionBonus(candidates, preferences.region);
    
    // 5. Select top N based on duration
    const count = this.getLocationCount(preferences.duration);
    const selected = candidates.slice(0, count);
    
    // 6. Order by regional grouping
    return this.orderByRegion(selected);
  }
  
  filterByProfile(profile) { /* ... */ }
  filterByWeather(locations, weather) { /* ... */ }
  scoreByActivities(locations, activities) { /* ... */ }
  applyRegionBonus(locations, region) { /* ... */ }
  getLocationCount(duration) { /* ... */ }
  orderByRegion(locations) { /* ... */ }
}
```

#### RationaleGenerator

Generates human-readable explanations using templates.

```javascript
class RationaleGenerator {
  constructor(templates) {
    this.templates = templates;
  }
  
  /**
   * Generate rationale text
   * @param {Object} preferences - User preferences
   * @param {Array} itinerary - Selected locations
   * @returns {String} Formatted rationale text
   */
  generate(preferences, itinerary) {
    // Select template based on preferences
    const template = this.selectTemplate(preferences);
    
    // Substitute placeholders
    return this.substituteValues(template, {
      duration: preferences.duration,
      profile: preferences.profile,
      region: preferences.region,
      activities: preferences.activities.slice(0, 3),
      locations: itinerary.map(loc => loc.name),
      hints: this.collectHints(itinerary)
    });
  }
  
  selectTemplate(preferences) { /* ... */ }
  substituteValues(template, values) { /* ... */ }
  collectHints(itinerary) { /* ... */ }
}
```

#### ResultsRenderer

Renders itinerary and rationale to DOM.

```javascript
class ResultsRenderer {
  constructor(containerElement) {
    this.container = containerElement;
  }
  
  /**
   * Render complete results
   * @param {String} rationale - Generated rationale text
   * @param {Array} itinerary - Ordered locations
   * @param {String} duration - Selected duration
   */
  render(rationale, itinerary, duration) {
    this.clear();
    this.renderRationale(rationale);
    
    if (duration === '2-days') {
      this.renderTwoDayItinerary(itinerary);
    } else {
      this.renderSingleDayItinerary(itinerary);
    }
    
    this.renderSaveButton();
  }
  
  renderRationale(text) { /* ... */ }
  renderSingleDayItinerary(locations) { /* ... */ }
  renderTwoDayItinerary(locations) { /* ... */ }
  renderLocation(location) { /* ... */ }
  renderSaveButton() { /* ... */ }
  clear() { /* ... */ }
}
```

#### MobileSummaryRenderer

Renders screenshot-optimized mobile summary view.

```javascript
class MobileSummaryRenderer {
  constructor(containerElement) {
    this.container = containerElement;
  }
  
  /**
   * Show mobile-optimized summary
   * @param {String} rationale - Generated rationale text
   * @param {Array} itinerary - Ordered locations
   * @param {String} duration - Selected duration
   */
  show(rationale, itinerary, duration) {
    this.container.classList.remove('hidden');
    this.renderHeader();
    this.renderRationale(rationale);
    this.renderCompactItinerary(itinerary, duration);
    this.renderFooter();
    this.attachCloseHandler();
  }
  
  hide() {
    this.container.classList.add('hidden');
  }
  
  renderHeader() { /* ... */ }
  renderRationale(text) { /* ... */ }
  renderCompactItinerary(locations, duration) { /* ... */ }
  renderCompactLocation(location) { /* ... */ }
  renderFooter() { /* ... */ }
  attachCloseHandler() { /* ... */ }
}
```

#### LocationSelectionManager

Manages enhanced recommendation selection and visited location exclusion.

```javascript
class LocationSelectionManager {
  constructor() {
    this.availableLocations = [];
    this.selectedLocations = [];
    this.visitedLocations = new Set();
    this.originalPreferences = null;
  }
  
  /**
   * Handle case where more locations match than duration limit
   * @param {Array} matchingLocations - All locations that match preferences
   * @param {Object} preferences - User preferences
   * @param {Number} limit - Duration-based location limit
   */
  showLocationSelection(matchingLocations, preferences, limit) {
    this.availableLocations = matchingLocations;
    this.originalPreferences = preferences;
    this.selectedLocations = matchingLocations.slice(0, limit); // Pre-select top locations
    
    this.renderAvailableOptions();
    this.renderRegenerateButton();
  }
  
  /**
   * Mark location as visited and trigger regeneration option
   * @param {String} locationId - ID of visited location
   */
  markAsVisited(locationId) {
    this.visitedLocations.add(locationId);
    this.renderVisitedIndicator(locationId);
    this.renderRegenerateWithoutVisitedButton();
  }
  
  /**
   * Unmark location as visited
   * @param {String} locationId - ID of location to unmark
   */
  unmarkAsVisited(locationId) {
    this.visitedLocations.delete(locationId);
    this.removeVisitedIndicator(locationId);
    
    if (this.visitedLocations.size === 0) {
      this.hideRegenerateWithoutVisitedButton();
    }
  }
  
  /**
   * Get locations excluding visited ones
   * @param {Array} locations - Original location pool
   * @returns {Array} Filtered locations
   */
  getUnvisitedLocations(locations) {
    return locations.filter(location => !this.visitedLocations.has(location.id));
  }
  
  /**
   * Toggle location selection in available options
   * @param {String} locationId - ID of location to toggle
   */
  toggleLocationSelection(locationId) {
    const index = this.selectedLocations.findIndex(loc => loc.id === locationId);
    
    if (index > -1) {
      this.selectedLocations.splice(index, 1);
    } else {
      const location = this.availableLocations.find(loc => loc.id === locationId);
      if (location) {
        this.selectedLocations.push(location);
      }
    }
    
    this.updateSelectionUI(locationId);
  }
  
  /**
   * Get currently selected locations for regeneration
   * @returns {Array} Selected locations
   */
  getSelectedLocations() {
    return [...this.selectedLocations];
  }
  
  renderAvailableOptions() { /* ... */ }
  renderRegenerateButton() { /* ... */ }
  renderVisitedIndicator(locationId) { /* ... */ }
  renderRegenerateWithoutVisitedButton() { /* ... */ }
  hideRegenerateWithoutVisitedButton() { /* ... */ }
  removeVisitedIndicator(locationId) { /* ... */ }
  updateSelectionUI(locationId) { /* ... */ }
}
```

#### EnhancedRecommendationEngine

Extended recommendation engine with selection management capabilities.

```javascript
class EnhancedRecommendationEngine extends RecommendationEngine {
  constructor(locations, selectionManager) {
    super(locations);
    this.selectionManager = selectionManager;
  }
  
  /**
   * Generate itinerary with enhanced selection handling
   * @param {Object} preferences - User preferences
   * @returns {Object} Result with itinerary and metadata
   */
  generateEnhancedItinerary(preferences) {
    // Apply visited location exclusion
    const availableLocations = this.selectionManager.getUnvisitedLocations(this.locations);
    
    // Run standard pipeline on available locations
    const result = this.generateItineraryFromPool(availableLocations, preferences);
    
    // Check if we have more matches than limit
    const limit = this.getLocationCount(preferences.duration);
    
    if (result.allMatches.length > limit) {
      // Show selection interface
      this.selectionManager.showLocationSelection(result.allMatches, preferences, limit);
      
      return {
        type: 'selection_required',
        availableCount: result.allMatches.length,
        limit: limit,
        topRecommendations: result.itinerary
      };
    }
    
    return {
      type: 'standard',
      itinerary: result.itinerary,
      allMatches: result.allMatches
    };
  }
  
  /**
   * Generate itinerary from user-selected locations
   * @param {Array} selectedLocations - User-chosen locations
   * @param {Object} preferences - Original preferences
   * @returns {Array} Final itinerary
   */
  generateFromSelection(selectedLocations, preferences) {
    const limit = this.getLocationCount(preferences.duration);
    
    if (selectedLocations.length <= limit) {
      // Use all selected locations
      return this.orderByRegion(selectedLocations);
    } else {
      // Apply scoring to user selection and take top N
      const scored = this.scoreByActivities(selectedLocations, preferences.activities);
      const withBonus = this.applyRegionBonus(scored, preferences.regions);
      const sorted = withBonus.sort((a, b) => b.score - a.score);
      const selected = sorted.slice(0, limit);
      
      return this.orderByRegion(selected);
    }
  }
  
  /**
   * Generate itinerary from location pool (internal method)
   * @param {Array} locationPool - Available locations
   * @param {Object} preferences - User preferences
   * @returns {Object} Result with itinerary and all matches
   */
  generateItineraryFromPool(locationPool, preferences) {
    // Standard pipeline but return both final itinerary and all matches
    let candidates = this.filterByProfile(locationPool, preferences.profile);
    candidates = this.filterByWeather(candidates, preferences.weather);
    
    if (preferences.regions && preferences.regions.length > 0) {
      candidates = this.filterByRegions(candidates, preferences.regions);
    }
    
    const allMatches = [...candidates]; // Store all matches before scoring/limiting
    
    candidates = this.scoreByActivities(candidates, preferences.activities);
    candidates = this.applyRegionBonus(candidates, preferences.regions);
    candidates.sort((a, b) => b.score - a.score);
    
    const limit = this.getLocationCount(preferences.duration);
    const selected = candidates.slice(0, limit);
    const itinerary = this.orderByRegion(selected);
    
    return {
      itinerary: itinerary,
      allMatches: allMatches
    };
  }
}
```
```

## Data Models

### Location Data Structure

Each location is represented as a JavaScript object with the following schema:

```javascript
{
  id: String,                    // Unique identifier (kebab-case)
  name: String,                  // Display name
  region: String,                // 'central' | 'north' | 'east' | 'west' | 'northeast'
  tags: Array<String>,           // Activity tags matching Activity_Selector options
  weather_suitability: String,   // 'anything' | 'indoor' | 'short-outdoor'
  compatible_profiles: Array<String>, // Profile types that would enjoy this location
  duration_options: Array<String>,    // Which trip durations this fits
  description: String,           // 1-2 sentence description for results display
  rationale_hints: Array<String>, // Phrases to use in rationale generation
  coordinates: {                 // For map positioning
    x: Number,                   // SVG x coordinate
    y: Number                    // SVG y coordinate
  }
}
```

### Example Location Data

```javascript
const locations = [
  {
    id: 'gardens-by-bay',
    name: 'Gardens by the Bay',
    region: 'central',
    tags: ['Nature/parks', 'Sustainability', 'Art & design'],
    weather_suitability: 'short-outdoor',
    compatible_profiles: ['couple', 'family-young-kids', 'family-teens', 'group-friends'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Iconic waterfront gardens featuring futuristic Supertrees, climate-controlled conservatories, and stunning light shows.',
    rationale_hints: [
      'perfect for nature lovers',
      'combines outdoor exploration with indoor comfort',
      'great photo opportunities'
    ],
    coordinates: { x: 450, y: 380 }
  },
  {
    id: 'chinatown',
    name: 'Chinatown Heritage District',
    region: 'central',
    tags: ['Culture & heritage', 'Local food', 'History & politics', 'Hidden gems'],
    weather_suitability: 'indoor',
    compatible_profiles: ['solo', 'couple', 'family-teens', 'group-friends'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Historic neighborhood with traditional shophouses, temples, hawker centers, and vibrant street markets.',
    rationale_hints: [
      'authentic local experience',
      'rich cultural immersion',
      'excellent street food scene'
    ],
    coordinates: { x: 380, y: 360 }
  },
  {
    id: 'sentosa',
    name: 'Sentosa Island',
    region: 'south',
    tags: ['Physical activity', 'Nature/parks', 'Museums'],
    weather_suitability: 'anything',
    compatible_profiles: ['family-young-kids', 'family-teens', 'group-friends'],
    duration_options: ['1-day', '2-days'],
    description: 'Resort island with beaches, theme parks, nature trails, and family attractions.',
    rationale_hints: [
      'full day of entertainment',
      'something for everyone',
      'beach and adventure combined'
    ],
    coordinates: { x: 400, y: 450 }
  },
  {
    id: 'national-gallery',
    name: 'National Gallery Singapore',
    region: 'central',
    tags: ['Art & design', 'Culture & heritage', 'Museums', 'History & politics'],
    weather_suitability: 'indoor',
    compatible_profiles: ['solo', 'couple', 'family-teens'],
    duration_options: ['half-day', '1-day', '2-days'],
    description: 'Southeast Asia\'s largest visual arts museum housed in two beautifully restored national monuments.',
    rationale_hints: [
      'world-class art collection',
      'architectural masterpiece',
      'perfect for culture enthusiasts'
    ],
    coordinates: { x: 420, y: 350 }
  }
];
```

### Rationale Template Structure

Templates use placeholder syntax for value substitution:

```javascript
const rationaleTemplates = {
  base: "Based on your preferences for a {{duration}} trip as a {{profile}}, we've curated an itinerary that highlights {{activities}}. {{region_text}} {{location_highlights}}",
  
  region_specific: {
    'central': "Starting from Singapore's central district,",
    'north': "Exploring the northern region,",
    'east': "Discovering the eastern coast,",
    'west': "Venturing to the western side,",
    'northeast': "Heading to the northeast area,",
    'no-preference': "Spanning across Singapore,"
  },
  
  activity_phrases: {
    'Nature/parks': 'green spaces and natural beauty',
    'Physical activity': 'active experiences',
    'Culture & heritage': 'cultural immersion',
    'Art & design': 'artistic exploration',
    'Museums': 'educational exhibits',
    'Sustainability': 'eco-conscious attractions',
    'History & politics': 'historical insights',
    'Local food': 'authentic culinary experiences',
    'Hidden gems': 'off-the-beaten-path discoveries'
  },
  
  profile_phrases: {
    'solo': 'solo traveler',
    'couple': 'couple',
    'family-young-kids': 'family with young children',
    'family-teens': 'family with teenagers',
    'group-friends': 'group of friends'
  },
  
  duration_phrases: {
    'half-day': 'half-day',
    '1-day': 'full day',
    '2-days': 'two-day'
  }
};
```

### Preference State Model

User selections stored in a simple object:

```javascript
{
  duration: 'half-day' | '1-day' | '2-days' | null,
  region: 'central' | 'north' | 'east' | 'west' | 'northeast' | 'no-preference',
  profile: 'solo' | 'couple' | 'family-young-kids' | 'family-teens' | 'group-friends' | null,
  activities: ['Nature/parks', 'Local food', ...],  // 0-9 items
  weather: 'anything' | 'indoor' | 'short-outdoor'
}
```

### Itinerary Result Model

Generated itinerary structure:

```javascript
{
  rationale: String,           // Generated explanation text
  locations: Array<Location>,  // Ordered array of location objects
  metadata: {
    generatedAt: Date,
    preferences: Object,       // Copy of input preferences
    totalScore: Number         // Sum of location scores (for debugging)
  }
}
```

## Recommendation Engine Algorithm

### Scoring and Filtering Pipeline

The recommendation engine processes locations through a multi-stage pipeline:

```
Input: User Preferences + All Locations
  ↓
[Stage 1: Profile Filter]
  Filter locations where compatible_profiles includes selected profile
  ↓
[Stage 2: Weather Filter]
  Filter locations where weather_suitability matches or is more permissive
  ↓
[Stage 3: Activity Scoring]
  Score each location by counting matching tags
  Score = count of (location.tags ∩ preferences.activities)
  ↓
[Stage 4: Region Bonus]
  If region != 'no-preference':
    Add bonus points to locations in selected region
  ↓
[Stage 5: Sort by Score]
  Sort locations descending by total score
  ↓
[Stage 6: Select Top N]
  Select first N locations based on duration:
    - half-day: 2-3 locations
    - 1-day: 4-5 locations
    - 2-days: 6-8 locations
  ↓
[Stage 7: Regional Ordering]
  Group selected locations by region
  Order to minimize travel (adjacent regions together)
  ↓
Output: Ordered Itinerary
```

### Detailed Algorithm Specifications

#### Stage 1: Profile Filtering

```javascript
function filterByProfile(locations, selectedProfile) {
  return locations.filter(location => 
    location.compatible_profiles.includes(selectedProfile)
  );
}
```

**Logic:** Hard filter - locations must explicitly support the selected profile.

#### Stage 2: Weather Filtering

```javascript
function filterByWeather(locations, selectedWeather) {
  const weatherHierarchy = {
    'anything': ['anything', 'short-outdoor', 'indoor'],
    'short-outdoor': ['short-outdoor', 'indoor'],
    'indoor': ['indoor']
  };
  
  const acceptable = weatherHierarchy[selectedWeather];
  
  return locations.filter(location =>
    acceptable.includes(location.weather_suitability)
  );
}
```

**Logic:** Hierarchical matching - "anything" accepts all, "short-outdoor" accepts short-outdoor and indoor, "indoor" only accepts indoor.

#### Stage 3: Activity Scoring

```javascript
function scoreByActivities(locations, selectedActivities) {
  return locations.map(location => {
    const matchCount = location.tags.filter(tag =>
      selectedActivities.includes(tag)
    ).length;
    
    return {
      ...location,
      score: matchCount
    };
  });
}
```

**Logic:** Simple intersection count - more matching tags = higher score.

#### Stage 4: Region Bonus

```javascript
function applyRegionBonus(locations, selectedRegion, bonusPoints = 2) {
  if (selectedRegion === 'no-preference') {
    return locations;
  }
  
  return locations.map(location => ({
    ...location,
    score: location.score + (location.region === selectedRegion ? bonusPoints : 0)
  }));
}
```

**Logic:** Add fixed bonus to locations in preferred region. Bonus value (2 points) balances regional preference with activity matching.

#### Stage 5-6: Selection

```javascript
function selectTopLocations(locations, duration) {
  const counts = {
    'half-day': 3,
    '1-day': 5,
    '2-days': 7
  };
  
  const sorted = [...locations].sort((a, b) => b.score - a.score);
  return sorted.slice(0, counts[duration]);
}
```

**Logic:** Take top N highest-scoring locations. Fixed counts provide consistent itinerary sizes.

#### Stage 7: Regional Ordering

```javascript
function orderByRegion(locations) {
  // Group by region
  const grouped = locations.reduce((acc, loc) => {
    if (!acc[loc.region]) acc[loc.region] = [];
    acc[loc.region].push(loc);
    return acc;
  }, {});
  
  // Define region adjacency for logical ordering
  const regionOrder = ['central', 'north', 'northeast', 'east', 'west', 'south'];
  
  // Flatten back to array following region order
  return regionOrder.flatMap(region => grouped[region] || []);
}
```

**Logic:** Group locations by region, then order regions geographically to minimize travel distance.

### Edge Cases and Defaults

1. **Insufficient matches after filtering:**
   - If fewer locations pass filters than required count, return all passing locations
   - Display message: "We found N locations matching your preferences"

2. **No activity tags selected:**
   - All locations score 0 from activity matching
   - Region bonus and profile/weather filters still apply
   - Results ordered primarily by region

3. **Tie scores:**
   - Maintain original data order (stable sort)
   - Alternatively: randomize tied locations for variety

4. **Missing required preferences:**
   - Duration and Profile are required
   - Show validation message if Generate clicked without these
   - Other preferences have sensible defaults (region: no-preference, weather: anything, activities: [])


## Rationale Generation System

### Template-Based Approach

The rationale generator uses string templates with placeholder substitution rather than AI generation. This ensures:
- Predictable, consistent output
- No external API dependencies
- Fast generation (milliseconds)
- Full control over messaging

### Template Structure

Base template with placeholders:

```
"Based on your preferences for a {{duration}} trip as a {{profile}}, we've curated 
an itinerary that highlights {{activities}}. {{region_text}} {{location_highlights}}"
```

### Substitution Logic

```javascript
function generateRationale(preferences, itinerary) {
  let text = rationaleTemplates.base;
  
  // Substitute duration
  text = text.replace('{{duration}}', 
    rationaleTemplates.duration_phrases[preferences.duration]);
  
  // Substitute profile
  text = text.replace('{{profile}}', 
    rationaleTemplates.profile_phrases[preferences.profile]);
  
  // Substitute activities (up to 3)
  const activityPhrases = preferences.activities
    .slice(0, 3)
    .map(tag => rationaleTemplates.activity_phrases[tag]);
  text = text.replace('{{activities}}', 
    formatList(activityPhrases));
  
  // Substitute region text
  const regionText = rationaleTemplates.region_specific[preferences.region];
  text = text.replace('{{region_text}}', regionText);
  
  // Substitute location highlights
  const highlights = generateLocationHighlights(itinerary);
  text = text.replace('{{location_highlights}}', highlights);
  
  return text;
}
```

### Location Highlights Generation

Incorporate rationale hints from selected locations:

```javascript
function generateLocationHighlights(itinerary) {
  // Pick 2-3 locations to highlight
  const featured = itinerary.slice(0, 3);
  
  // Build highlight sentences
  const sentences = featured.map(location => {
    const hint = location.rationale_hints[0]; // Use first hint
    return `${location.name} offers ${hint}`;
  });
  
  // Join with proper grammar
  if (sentences.length === 1) return sentences[0] + '.';
  if (sentences.length === 2) return sentences.join(' and ') + '.';
  
  const last = sentences.pop();
  return sentences.join(', ') + ', and ' + last + '.';
}
```

### Example Output

Input preferences:
- Duration: 1-day
- Profile: couple
- Region: central
- Activities: ['Culture & heritage', 'Local food', 'Art & design']

Generated rationale:
```
"Based on your preferences for a full day trip as a couple, we've curated an 
itinerary that highlights cultural immersion, authentic culinary experiences, 
and artistic exploration. Starting from Singapore's central district, you'll 
discover locations that perfectly match your interests. Chinatown Heritage 
District offers authentic local experience, National Gallery Singapore offers 
world-class art collection, and Gardens by the Bay offers perfect for nature 
lovers."
```

## Implementation Approach

### Development Phases

#### Phase 1: Static Structure (Scaffold)
**Goal:** Create HTML structure and CSS styling for all components

**Deliverables:**
- `index.html` with complete Preference Panel structure
- `styles/components.css` with all component styles
- `styles/main.css` with layout and responsive rules
- Placeholder SVG map with 3-4 dummy hotspots
- No JavaScript functionality yet

**Validation:** Visual review of all UI components in browser

#### Phase 2: Data Layer
**Goal:** Define data structures and sample data

**Deliverables:**
- `scripts/data/locations.js` with 3-4 sample locations
- `scripts/data/templates.js` with rationale templates
- Data validation (all required fields present)

**Validation:** Console log data structures, verify schema compliance

#### Phase 3: UI Interactions
**Goal:** Implement component interactivity

**Deliverables:**
- `scripts/ui/preferences.js` - Selection state management
- Click handlers for all preference components
- Visual state updates (selected/unselected)
- `PreferenceManager` class implementation

**Validation:** Click through all components, verify state tracking

#### Phase 4: Map Interactions
**Goal:** Implement SVG map hover and click behaviors

**Deliverables:**
- `scripts/ui/map.js` - Hotspot interactions
- Tooltip positioning and display
- Hover and click event handlers

**Validation:** Hover/click all hotspots, verify tooltip content

#### Phase 5: Recommendation Engine
**Goal:** Implement core algorithm

**Deliverables:**
- `scripts/engine/recommender.js` - Complete algorithm
- All filtering and scoring functions
- Regional ordering logic

**Validation:** Unit tests for each pipeline stage

#### Phase 6: Rationale Generation
**Goal:** Implement template-based text generation

**Deliverables:**
- `scripts/engine/rationale.js` - Template substitution
- Placeholder replacement logic
- Location highlight generation

**Validation:** Test with various preference combinations

#### Phase 7: Results Display
**Goal:** Render itinerary and rationale to DOM

**Deliverables:**
- `scripts/ui/results.js` - Results rendering
- Single-day and two-day layout logic
- Location card rendering with tags
- "Save for Trip" button

**Validation:** Generate results with different durations

#### Phase 8: Mobile Summary View
**Goal:** Create screenshot-optimized mobile view

**Deliverables:**
- `scripts/ui/mobile-summary.js` - Mobile summary renderer
- `styles/print.css` - Print stylesheet
- Compact itinerary layout
- "Back to Planning" button
- Print-friendly formatting

**Validation:** Test screenshot on mobile, test print output

#### Phase 9: Integration
**Goal:** Connect all components

**Deliverables:**
- `scripts/main.js` - Application initialization
- Generate button click handler
- End-to-end flow from preferences to results

**Validation:** Complete user journey testing

#### Phase 10: Responsive Polish
**Goal:** Ensure mobile compatibility

**Deliverables:**
- Media queries for mobile layouts
- Touch target sizing
- Map scaling on small screens

**Validation:** Test on devices from 320px to 1920px width

#### Phase 11: Content Expansion
**Goal:** Add remaining locations (up to 12)

**Deliverables:**
- Complete location data for 12 locations
- Updated SVG map with all hotspots
- Coordinate positioning for all locations

**Validation:** Generate itineraries with full dataset

### Technology Choices

#### CSS Framework: None (Custom CSS)
**Rationale:** 
- No build step required
- Full control over styling
- Smaller file size
- Modern CSS features (Grid, Flexbox, Custom Properties) sufficient

#### JavaScript: Vanilla ES6+
**Rationale:**
- No framework overhead
- Direct DOM manipulation is sufficient for this scope
- Better performance for simple interactions
- Easier to understand and maintain

#### Module System: ES6 Modules
**Rationale:**
- Native browser support (all modern browsers)
- Clean import/export syntax
- Better code organization
- Can be bundled later if needed

#### SVG Map: Inline SVG
**Rationale:**
- Direct DOM access for interactions
- CSS styling capabilities
- No additional HTTP request
- Easy to add/modify hotspots

### File Size Considerations

Target sizes for GitHub Pages performance:
- HTML: < 20 KB
- CSS (total): < 35 KB (including print.css)
- JavaScript (total): < 55 KB (including mobile-summary.js)
- SVG map: < 40 KB
- **Total page weight: < 150 KB**

This ensures fast loading even on slower connections.

## Mobile Takeaway Features

### Print Stylesheet Design

The print stylesheet (`print.css`) optimizes the page for printing:

**Hidden Elements:**
```css
@media print {
  .preference-panel,
  .interactive-map,
  .generate-button,
  .save-button,
  .mobile-summary__close {
    display: none !important;
  }
}
```

**Print-Optimized Styling:**
```css
@media print {
  body {
    background: white;
    color: black;
    font-size: 12pt;
  }
  
  .results-area {
    width: 100%;
    max-width: none;
    padding: 0;
  }
  
  .rationale {
    margin-bottom: 1cm;
    page-break-after: avoid;
  }
  
  .location-card {
    page-break-inside: avoid;
    border: 1px solid #ccc;
    padding: 0.5cm;
    margin-bottom: 0.5cm;
  }
  
  .chip {
    border: 1px solid #666;
    background: white;
    color: black;
  }
}
```

**Print Behavior:**
- Black text on white background (ink efficient)
- Removes all interactive elements
- Ensures location cards don't split across pages
- Optimized spacing for paper

### Mobile Summary View Design

The mobile summary view provides a screenshot-optimized layout:

**Layout Characteristics:**
- Full-screen overlay (100vh height)
- Single column layout
- White background, dark text
- Large, readable fonts (minimum 16px)
- High contrast for outdoor readability
- Compact spacing to fit more content

**Content Structure:**
```
┌─────────────────────────────────┐
│  Your Weekend.sg Itinerary      │
│  [Back to Planning]             │
├─────────────────────────────────┤
│                                 │
│  Rationale paragraph...         │
│                                 │
├─────────────────────────────────┤
│  Day 1 (or single day)          │
│  ┌───────────────────────────┐ │
│  │ 1. Location Name          │ │
│  │    Brief description      │ │
│  │    [tag] [tag] [tag]      │ │
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │ 2. Location Name          │ │
│  │    Brief description      │ │
│  │    [tag] [tag]            │ │
│  └───────────────────────────┘ │
│                                 │
│  Day 2 (if applicable)          │
│  ┌───────────────────────────┐ │
│  │ 3. Location Name          │ │
│  │    Brief description      │ │
│  │    [tag] [tag]            │ │
│  └───────────────────────────┘ │
├─────────────────────────────────┤
│  Generated by weekend.sg        │
└─────────────────────────────────┘
```

**User Flow:**
1. User generates itinerary
2. User clicks "Save for Trip" button
3. Mobile summary view appears as full-screen overlay
4. User takes screenshot on their phone
5. User clicks "Back to Planning" to return

### Enhanced User Flows

#### Flow 1: Location Selection (Too Many Options)

**Scenario:** User preferences match more locations than duration limit

**User Flow:**
1. User selects preferences and clicks "Plan my weekend"
2. System finds 8 matching locations but duration limit is 4
3. System displays "Available Options" section with all 8 locations as selectable cards
4. Each location card shows checkbox, name, description, and tags
5. Top 4 locations are pre-selected based on scoring
6. User can uncheck/check locations to customize selection
7. User clicks "Regenerate Itinerary" button
8. System generates final itinerary from user's selection (max 4 locations)
9. If user selected >4, system applies scoring to pick top 4 from selection

**UI Components:**
- Available Options section (appears above standard results)
- Location selection cards with checkboxes
- "Regenerate Itinerary" button
- Selection counter: "4 of 8 locations selected"

#### Flow 2: Visited Location Exclusion

**Scenario:** User wants to exclude places they've already visited

**User Flow:**
1. User generates initial itinerary
2. User sees recommended locations in results
3. User clicks "Already visited" checkbox on locations they've been to
4. Visited locations get visual indicator (grayed out, strikethrough)
5. "Regenerate Without Visited" button appears
6. User clicks regenerate button
7. System excludes visited locations from pool and regenerates
8. New itinerary shows only unvisited locations
9. User can uncheck "Already visited" to include locations back

**UI Components:**
- "Already visited" checkbox on each location card
- Visual indicators for visited locations
- "Regenerate Without Visited" button
- Visited location counter in button text

#### Flow 3: Combined Enhanced Flow

**Scenario:** User has both too many options AND wants to exclude visited locations

**User Flow:**
1. User generates itinerary → triggers location selection (too many options)
2. User customizes selection from available options
3. User regenerates → sees final itinerary
4. User marks some locations as "Already visited"
5. User regenerates without visited → system re-runs selection process excluding visited
6. If still too many options after excluding visited, show selection interface again
7. Process continues until user has satisfactory itinerary

**Error Handling:**
- If excluding visited locations results in insufficient options, show message: "Not enough unvisited locations match your preferences. Try selecting different regions or activities."
- Suggest specific actions: "Try selecting 'Central' region" or "Try removing some activity filters"

**Screenshot Optimization:**
- Fits typical mobile screen (375px - 428px width)
- Scrollable if content exceeds screen height
- No interactive elements except close button
- Clean, minimal design
- High contrast for readability in various lighting

### Implementation Details

**Save for Trip Button:**
```javascript
function renderSaveButton() {
  const button = document.createElement('button');
  button.className = 'save-button';
  button.textContent = 'Save for Trip';
  button.addEventListener('click', () => {
    mobileSummaryRenderer.show(rationale, itinerary, duration);
  });
  resultsContainer.appendChild(button);
}
```

**Mobile Summary Renderer:**
```javascript
class MobileSummaryRenderer {
  show(rationale, itinerary, duration) {
    // Populate summary content
    this.renderRationale(rationale);
    this.renderCompactItinerary(itinerary, duration);
    
    // Show overlay
    this.container.classList.remove('hidden');
    
    // Scroll to top
    this.container.scrollTop = 0;
  }
  
  renderCompactLocation(location, index) {
    return `
      <div class="compact-location">
        <div class="compact-location__number">${index + 1}</div>
        <div class="compact-location__content">
          <h3>${location.name}</h3>
          <p>${location.description}</p>
          <div class="compact-location__tags">
            ${location.tags.map(tag => 
              `<span class="compact-chip">${tag}</span>`
            ).join('')}
          </div>
        </div>
      </div>
    `;
  }
}
```

**Print Trigger:**
Users can print using:
- Browser print function (Cmd/Ctrl + P)
- Browser menu: File → Print
- Print stylesheet automatically applies

### Browser Compatibility

Target browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+
- Chrome Android 90+

Features used:
- ES6 modules (supported in all target browsers)
- CSS Grid and Flexbox (widely supported)
- CSS Custom Properties (widely supported)
- SVG (universal support)

No polyfills required for target browsers.

### Accessibility Considerations

1. **Keyboard Navigation:**
   - All interactive elements focusable
   - Logical tab order
   - Enter/Space to activate buttons

2. **Screen Readers:**
   - Semantic HTML (button, nav, main, section)
   - ARIA labels for icon-only buttons
   - ARIA live regions for results updates
   - Alt text for map hotspots

3. **Visual:**
   - Sufficient color contrast (WCAG AA minimum)
   - Focus indicators on all interactive elements
   - Text scalable to 200% without breaking layout

4. **Touch Targets:**
   - Minimum 44x44px touch targets on mobile
   - Adequate spacing between interactive elements

### Performance Optimizations

1. **Lazy Rendering:**
   - Only render results when Generate button clicked
   - Don't render hidden elements

2. **Event Delegation:**
   - Single event listener for chip groups
   - Reduces memory footprint

3. **CSS Containment:**
   - Use `contain` property for independent components
   - Improves paint performance

4. **Debouncing:**
   - Not needed (no real-time filtering)
   - All computation triggered by explicit button click

### Testing Strategy

#### Manual Testing Checklist

**Preference Selection:**
- [ ] Each duration card selects/deselects correctly
- [ ] Only one duration selected at a time
- [ ] Each region chip selects/deselects correctly
- [ ] Only one region selected at a time
- [ ] Each profile card selects/deselects correctly
- [ ] Only one profile selected at a time
- [ ] Activity chips toggle independently
- [ ] Multiple activities can be selected
- [ ] Weather segmented control selects correctly
- [ ] Only one weather option selected at a time

**Map Interactions:**
- [ ] Hovering hotspot shows tooltip
- [ ] Tooltip displays correct location name
- [ ] Tooltip displays correct description
- [ ] Clicking hotspot shows tooltip (mobile)
- [ ] Tooltip positioned correctly near hotspot

**Results Generation:**
- [ ] Generate button disabled when required fields missing
- [ ] Generate button enabled when duration and profile selected
- [ ] Clicking Generate displays results
- [ ] Rationale text includes selected preferences
- [ ] Itinerary displays correct number of locations
- [ ] Half-day shows 2-3 locations
- [ ] 1-day shows 4-5 locations
- [ ] 2-days shows 6-8 locations split into Day 1 and Day 2
- [ ] Each location shows name, description, and tags
- [ ] Tags styled as chips matching activity selector
- [ ] "Save for Trip" button appears after generation

**Mobile Summary View:**
- [ ] Clicking "Save for Trip" shows mobile summary overlay
- [ ] Mobile summary displays rationale
- [ ] Mobile summary displays all locations in compact format
- [ ] Mobile summary uses high contrast colors
- [ ] Mobile summary fits mobile screen width (375px - 428px)
- [ ] "Back to Planning" button returns to main view
- [ ] Mobile summary is scrollable if content exceeds screen height

**Print Functionality:**
- [ ] Print (Cmd/Ctrl + P) hides preference panel
- [ ] Print hides interactive map
- [ ] Print hides all buttons
- [ ] Print shows only rationale and itinerary
- [ ] Print uses black text on white background
- [ ] Print prevents location cards from splitting across pages
- [ ] Print output is readable and well-formatted

**Responsive Behavior:**
- [ ] Layout works at 320px width
- [ ] Layout works at 768px width
- [ ] Layout works at 1920px width
- [ ] Preference sections stack vertically on mobile
- [ ] Map scales proportionally on mobile
- [ ] Touch targets at least 44x44px on mobile

#### Automated Testing Approach

While the initial implementation focuses on manual testing, the codebase should be structured to support future automated testing:

**Unit Tests (for recommendation engine):**
- Test each filtering function independently
- Test scoring logic with known inputs
- Test regional ordering algorithm
- Test rationale generation with various inputs

**Integration Tests:**
- Test complete recommendation pipeline
- Test preference state management
- Test results rendering with different data

**Property-Based Tests:**
- Generate random preference combinations
- Verify itinerary always contains valid locations
- Verify location count matches duration requirements
- Verify all returned locations pass filters

Testing framework recommendation: **Vitest** (lightweight, fast, ES modules support)

### Deployment

#### GitHub Pages Setup

1. Create repository: `username/weekend-sg`
2. Push code to `main` branch
3. Enable GitHub Pages in repository settings
4. Select source: `main` branch, `/` (root)
5. Site available at: `https://username.github.io/weekend-sg/`

#### Pre-deployment Checklist

- [ ] All file paths relative (no absolute URLs)
- [ ] ES6 modules use `.js` extensions in imports
- [ ] No console.log statements in production code
- [ ] All images optimized
- [ ] CSS minified (optional)
- [ ] JavaScript minified (optional)
- [ ] Test on GitHub Pages preview before public launch

#### Future Enhancements (Out of Scope)

- URL parameter support for sharing itineraries
- Print-friendly stylesheet
- Export itinerary as PDF
- Add more locations (beyond 12)
- Multi-language support
- Dark mode theme
- Animation and transitions
- Progressive Web App features
- Analytics integration


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Single-select component exclusivity

*For any* single-select UI component (Duration_Selector, Region_Selector, Profile_Selector, Weather_Selector), when a user clicks any option, only that option should be in the selected state and all other options should be deselected.

**Validates: Requirements 1.3, 1.5, 1.7, 1.11**

### Property 2: Multi-select component independence

*For any* activity chip in the Activity_Selector, clicking that chip should toggle only its own selection state without affecting the selection state of any other activity chip.

**Validates: Requirements 1.9**

### Property 3: Hotspot tooltip display

*For any* hotspot on the Interactive_Map, when a user hovers over or clicks that hotspot, the tooltip should display the correct location name and description for that specific hotspot.

**Validates: Requirements 2.3, 2.4**

### Property 4: Location data schema validity

*For any* location in the Location_Data array, that location must have all required properties with correct types: id (string), name (string), region (valid region value), tags (array of valid activity tags), weather_suitability (valid weather value), compatible_profiles (array of valid profile values), duration_options (array of valid duration values), description (string), and rationale_hints (array of strings).

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9**

### Property 5: Profile filtering

*For any* selected profile and any generated itinerary, all locations in that itinerary must include the selected profile in their compatible_profiles array.

**Validates: Requirements 4.1**

### Property 6: Region scoring bonus

*For any* selected region (other than "No preference") and any location in that region, the location's score after applying the region bonus should be higher than its score before the bonus was applied.

**Validates: Requirements 4.2**

### Property 7: Activity tag scoring

*For any* location and any set of selected activities, the location's activity score should equal the count of tags that appear in both the location's tags array and the selected activities array.

**Validates: Requirements 4.3**

### Property 8: Weather filtering

*For any* selected weather preference and any generated itinerary, all locations in that itinerary must have weather_suitability that is compatible with the selected preference according to the weather hierarchy (where "anything" accepts all, "short-outdoor" accepts short-outdoor and indoor, and "indoor" accepts only indoor).

**Validates: Requirements 4.4**

### Property 9: Regional grouping in itinerary

*For any* generated itinerary, locations should be ordered such that locations from the same region are grouped together (all locations from region A appear consecutively before moving to region B).

**Validates: Requirements 4.8**

### Property 10: Rationale includes preferences

*For any* generated rationale and the preferences used to generate it, the rationale text must contain references to the selected duration, profile, region (when not "No preference"), and at least one selected activity tag (when activities are selected).

**Validates: Requirements 5.2, 6.2, 6.3, 6.4, 6.5**

### Property 11: Rationale includes location names

*For any* generated rationale and itinerary, the rationale text must mention at least one location name from the itinerary.

**Validates: Requirements 5.3**

### Property 12: Location rendering completeness

*For any* location displayed in the Results_Area, the rendered output must include the location's name, description, and all of its tags displayed as chips.

**Validates: Requirements 5.6**

### Property 13: Rationale includes location hints

*For any* generated rationale and itinerary, the rationale text must incorporate at least one rationale_hint from at least one location in the itinerary.

**Validates: Requirements 6.6**

### Property 14: Touch target minimum size

*For any* interactive element (button, chip, card) on mobile viewports (width < 768px), the element's clickable area must be at least 44px by 44px.

**Validates: Requirements 8.5**

## Error Handling

### User Input Validation

**Missing Required Preferences:**
- Duration and Profile are required fields
- When Generate button is clicked without these selections:
  - Display inline validation message: "Please select a trip duration and travel profile"
  - Highlight missing fields with visual indicator (red border or icon)
  - Do not proceed with generation

**Default Values:**
- Region: Defaults to "No preference" (always has a value)
- Weather: Defaults to "Anything goes" (always has a value)
- Activities: Defaults to empty array (valid state)

### Data Validation

**Location Data Integrity:**
- Validate location data on application initialization
- Check for required fields and correct types
- If validation fails:
  - Log error to console with specific validation failure
  - Display user-friendly message: "Unable to load location data. Please refresh the page."
  - Disable Generate button

**Invalid Property Values:**
- If location has invalid region/profile/weather/tag values:
  - Log warning to console
  - Skip that location during filtering (treat as incompatible)
  - Continue with remaining valid locations

### Recommendation Engine Edge Cases

**Insufficient Matching Locations:**
- If fewer locations pass filters than required count:
  - Return all passing locations (don't fail)
  - Display message: "We found N locations matching your preferences" (instead of expected count)
  - Adjust itinerary display accordingly

**No Matching Locations:**
- If no locations pass all filters:
  - Display message: "No locations match your preferences. Try adjusting your selections."
  - Suggest relaxing weather or activity constraints
  - Do not display empty itinerary

**Tie Scores:**
- When multiple locations have identical scores:
  - Use stable sort (maintain original data order)
  - Ensures consistent results for same preferences
  - Alternative: Add small random tiebreaker for variety

### Map Interaction Errors

**Missing Hotspot Data:**
- If hotspot clicked but location data not found:
  - Log warning to console
  - Display generic tooltip: "Location information unavailable"
  - Do not crash application

**Tooltip Positioning:**
- If tooltip would render outside viewport:
  - Adjust position to stay within bounds
  - Flip to opposite side of hotspot if needed
  - Ensure tooltip always visible

### Browser Compatibility

**ES6 Module Support:**
- If browser doesn't support ES6 modules:
  - Display message: "Your browser is not supported. Please use a modern browser."
  - Provide links to Chrome, Firefox, Safari

**SVG Support:**
- All target browsers support SVG (universal)
- No fallback needed

### Network Errors

**GitHub Pages Serving:**
- All resources are local (no external API calls)
- No network error handling needed for core functionality
- If page fails to load, standard browser error handling applies

## Testing Strategy

### Dual Testing Approach

The application requires both unit tests and property-based tests for comprehensive coverage:

**Unit Tests** focus on:
- Specific examples of UI component rendering
- Edge cases for duration-based location counts
- Integration between preference selection and state management
- Specific rationale template outputs
- Error conditions and validation messages

**Property-Based Tests** focus on:
- Universal behaviors across all preference combinations
- Data validation for all locations
- Recommendation engine correctness across random inputs
- UI component behavior patterns (single-select, multi-select)
- Rationale generation with varied inputs

Together, these approaches ensure both concrete examples work correctly and general rules hold across all possible inputs.

### Property-Based Testing Configuration

**Framework:** fast-check (JavaScript property-based testing library)

**Configuration:**
- Minimum 100 iterations per property test
- Each test tagged with reference to design property
- Tag format: `Feature: weekend-sg, Property {number}: {property_text}`

**Example Test Structure:**

```javascript
import fc from 'fast-check';

// Feature: weekend-sg, Property 5: Profile filtering
test('all itinerary locations must be compatible with selected profile', () => {
  fc.assert(
    fc.property(
      fc.constantFrom('solo', 'couple', 'family-young-kids', 'family-teens', 'group-friends'),
      fc.array(fc.constantFrom('Nature/parks', 'Local food', 'Museums'), { minLength: 0, maxLength: 9 }),
      (profile, activities) => {
        const preferences = {
          duration: '1-day',
          region: 'no-preference',
          profile: profile,
          activities: activities,
          weather: 'anything'
        };
        
        const engine = new RecommendationEngine(locations);
        const itinerary = engine.generateItinerary(preferences);
        
        // Property: all locations must include selected profile
        return itinerary.every(location => 
          location.compatible_profiles.includes(profile)
        );
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing Strategy

**Framework:** Vitest (fast, ES modules support, modern API)

**Test Organization:**

```
tests/
├── unit/
│   ├── components/
│   │   ├── duration-selector.test.js
│   │   ├── chip.test.js
│   │   ├── profile-card.test.js
│   │   └── segmented-control.test.js
│   ├── engine/
│   │   ├── recommender.test.js
│   │   └── rationale.test.js
│   ├── ui/
│   │   ├── preferences.test.js
│   │   ├── map.test.js
│   │   └── results.test.js
│   └── data/
│       └── locations.test.js
└── property/
    ├── recommendation.property.test.js
    ├── rationale.property.test.js
    ├── ui-components.property.test.js
    └── data-validation.property.test.js
```

**Key Unit Test Cases:**

1. **Preference Panel Components:**
   - Duration selector renders 3 cards with correct labels
   - Region selector renders 6 chips with correct labels
   - Profile selector renders 5 cards with correct labels
   - Activity selector renders 9 chips with correct labels
   - Weather selector renders 3 options with correct labels
   - Generate button exists with correct label

2. **Interactive Map:**
   - Map renders as SVG element
   - Map contains at least 3 hotspots
   - Tooltip displays on hover
   - Tooltip displays on click

3. **Recommendation Engine:**
   - Half-day duration returns 2-3 locations
   - 1-day duration returns 4-5 locations
   - 2-days duration returns 6-8 locations
   - Profile filtering removes incompatible locations
   - Weather filtering respects hierarchy
   - Activity scoring counts matches correctly
   - Region bonus adds points correctly
   - Regional ordering groups by region

4. **Rationale Generation:**
   - Template substitution replaces all placeholders
   - Duration phrase appears in output
   - Profile phrase appears in output
   - Region phrase appears when not "No preference"
   - Activity phrases appear (up to 3)
   - Location names appear in output
   - Rationale hints incorporated

5. **Results Rendering:**
   - Rationale paragraph displays
   - Itinerary displays as ordered list
   - 2-day itinerary splits into Day 1 and Day 2
   - Each location shows name, description, tags
   - Tags render as chips
   - "Save for Trip" button appears

6. **Mobile Summary:**
   - Clicking "Save for Trip" shows mobile summary
   - Mobile summary displays rationale and compact itinerary
   - "Back to Planning" returns to main view
   - Layout optimized for screenshots

7. **Print Output:**
   - Print hides preference panel and map
   - Print shows only rationale and itinerary
   - Print uses black on white for ink efficiency

6. **Data Validation:**
   - All locations have required fields
   - All locations have correct types
   - All enum values are valid
   - Minimum 3 locations in dataset

7. **Error Handling:**
   - Missing duration shows validation message
   - Missing profile shows validation message
   - No matching locations shows helpful message
   - Invalid location data logs error

### Integration Testing

**End-to-End User Flows:**

1. **Complete Itinerary Generation:**
   - Select all preferences
   - Click Generate button
   - Verify results display
   - Verify rationale includes preferences
   - Verify itinerary has correct count

2. **Preference Changes:**
   - Generate initial itinerary
   - Change preferences
   - Generate again
   - Verify results update

3. **Map Interaction:**
   - Hover over hotspots
   - Verify tooltips display
   - Click hotspots
   - Verify tooltips persist

### Manual Testing Checklist

See "Testing Strategy" section in Implementation Approach for complete manual testing checklist covering:
- All preference selection interactions
- Map hover and click behaviors
- Results generation and display
- Responsive behavior at different viewport sizes
- Touch target sizes on mobile

### Test Coverage Goals

- **Unit test coverage:** 80%+ of business logic code
- **Property test coverage:** All correctness properties implemented
- **Integration test coverage:** All major user flows
- **Manual test coverage:** All UI interactions and responsive behaviors

### Continuous Testing

**Pre-commit:**
- Run all unit tests
- Run all property tests
- Verify no console errors

**Pre-deployment:**
- Run full test suite
- Manual testing on multiple browsers
- Manual testing on mobile devices
- Verify on GitHub Pages preview

