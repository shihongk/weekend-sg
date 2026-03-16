# Implementation Plan: weekend.sg

## Overview

This implementation plan follows an 11-phase incremental approach to build weekend.sg, a static web application for generating personalized Singapore weekend itineraries. Each phase builds on the previous one, starting with static structure and progressively adding interactivity, data, and logic. The application uses vanilla JavaScript (ES6+), HTML, and CSS with no build tools or backend dependencies.

## Tasks

- [x] 1. Phase 1: Static Structure (HTML/CSS Scaffold)
  - [x] 1.1 Create base HTML structure with semantic elements
    - Create `index.html` with DOCTYPE, head, and body structure
    - Add meta tags for viewport, charset, and description
    - Include title: "weekend.sg - Your Singapore Weekend Planner"
    - Set up main sections: header, preference panel, map container, results area
    - _Requirements: 10.1_
  
  - [x] 1.2 Build Preference Panel HTML structure
    - Create Duration Selector section with 3 duration cards (Half day, 1 day, 2 days)
    - Create Region Selector section with 6 region chips
    - Create Profile Selector section with 5 profile cards
    - Create Activity Selector section with 9 activity chips
    - Create Weather Selector section with segmented control (3 options)
    - Add Generate button at bottom of preference panel
    - _Requirements: 1.1, 1.2, 1.4, 1.6, 1.8, 1.10, 1.12_
  
  - [x] 1.3 Create CSS file structure and global styles
    - Create `styles/main.css` with CSS reset and global variables
    - Define color palette using CSS custom properties
    - Set up base typography (font families, sizes, line heights)
    - Create responsive grid layout for main sections
    - _Requirements: 10.2_
  
  - [x] 1.4 Style Duration Card component
    - Create `.duration-card` styles with card layout
    - Add hover state with shadow elevation
    - Add selected state with accent background and border
    - Include icon and label styling
    - Ensure minimum 44px touch targets
    - _Requirements: 10.2, 8.5_
  
  - [x] 1.5 Style Chip component
    - Create `.chip` base styles with pill shape and rounded corners
    - Add hover state with background color change
    - Add selected state with accent color background
    - Create variants for single-select and multi-select
    - Ensure minimum 44px touch targets
    - _Requirements: 10.2, 8.5_
  
  - [x] 1.6 Style Profile Card component
    - Create `.profile-card` styles with larger card layout
    - Add icon, title, and description sections
    - Add hover state with shadow elevation
    - Add selected state with accent border and background tint
    - Ensure minimum 44px touch targets
    - _Requirements: 10.2, 8.5_
  
  - [x] 1.7 Style Segmented Control component
    - Create `.segmented-control` container with grouped buttons
    - Style individual options with connected borders
    - Add hover state with subtle background change
    - Add selected state with accent background and white text
    - Ensure minimum 44px touch targets
    - _Requirements: 10.2, 8.5_
  
  - [x] 1.8 Create placeholder SVG map with dummy hotspots
    - Create inline SVG element with viewBox for Singapore outline
    - Add simplified Singapore base map paths with neutral colors
    - Add 3-4 dummy circular hotspots at different coordinates
    - Style hotspots with colored circles and hover scale effect
    - _Requirements: 10.3_
  
  - [x] 1.9 Style Results Area container
    - Create `.results-area` container styles
    - Add rationale paragraph styling
    - Add itinerary list styling with ordered list
    - Add location card styling for itinerary items
    - Style tags as chips matching activity selector
    - _Requirements: 5.4, 5.6, 5.7_

- [x] 2. Phase 2: Data Layer (Locations and Templates)
  - [x] 2.1 Create location data structure with 3-4 sample locations
    - Create `scripts/data/locations.js` file
    - Define location data schema with all required properties
    - Add 3-4 sample locations with complete data (Gardens by the Bay, Chinatown, Sentosa, National Gallery)
    - Include coordinates for map positioning
    - Export locations array as ES6 module
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10_
  
  - [ ]* 2.2 Write property test for location data schema validity
    - **Property 4: Location data schema validity**
    - **Validates: Requirements 3.1-3.9**
  
  - [x] 2.3 Create rationale template structure
    - Create `scripts/data/templates.js` file
    - Define base rationale template with placeholders
    - Define region-specific phrases object
    - Define activity phrases object
    - Define profile phrases object
    - Define duration phrases object
    - Export templates object as ES6 module
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 3. Phase 3: UI Interactions (Preference Panel)
  - [x] 3.1 Create PreferenceManager class
    - Create `scripts/ui/preferences.js` file
    - Implement PreferenceManager class with preferences state object
    - Add methods: setDuration, setRegion, setProfile, toggleActivity, setWeather
    - Add getPreferences method to return current state
    - Add isValid method to check required fields (duration and profile)
    - Export PreferenceManager as ES6 module
    - _Requirements: 1.3, 1.5, 1.7, 1.9, 1.11_
  
  - [x] 3.2 Implement Duration Selector interactions
    - Add click event listeners to duration cards
    - Implement radio button behavior (only one selected)
    - Update visual state (add/remove selected class)
    - Call PreferenceManager.setDuration on selection
    - _Requirements: 1.3, 10.7_
  
  - [ ]* 3.3 Write property test for single-select component exclusivity
    - **Property 1: Single-select component exclusivity**
    - **Validates: Requirements 1.3, 1.5, 1.7, 1.11**
  
  - [x] 3.3 Implement Region Selector interactions
    - Add click event listeners to region chips
    - Implement radio button behavior (only one selected)
    - Update visual state (add/remove selected class)
    - Call PreferenceManager.setRegion on selection
    - _Requirements: 1.5, 10.7_
  
  - [x] 3.4 Implement Profile Selector interactions
    - Add click event listeners to profile cards
    - Implement radio button behavior (only one selected)
    - Update visual state (add/remove selected class)
    - Call PreferenceManager.setProfile on selection
    - _Requirements: 1.7, 10.7_
  
  - [x] 3.5 Implement Activity Selector interactions
    - Add click event listeners to activity chips
    - Implement checkbox behavior (multiple selections allowed)
    - Update visual state (toggle selected class)
    - Call PreferenceManager.toggleActivity on click
    - _Requirements: 1.9, 10.7_
  
  - [ ]* 3.6 Write property test for multi-select component independence
    - **Property 2: Multi-select component independence**
    - **Validates: Requirements 1.9**
  
  - [x] 3.7 Implement Weather Selector interactions
    - Add click event listeners to segmented control options
    - Implement radio button behavior (only one selected)
    - Update visual state (add/remove selected class)
    - Call PreferenceManager.setWeather on selection
    - _Requirements: 1.11, 10.7_
  
  - [x] 3.8 Implement Generate button validation and state
    - Add click event listener to Generate button
    - Check PreferenceManager.isValid() before proceeding
    - Display validation message if duration or profile missing
    - Highlight missing fields with visual indicator
    - _Requirements: 10.6_

- [x] 4. Phase 4: Map Interactions (SVG Hotspots and Tooltips)
  - [x] 4.1 Create map tooltip HTML structure
    - Add tooltip div element to HTML (initially hidden)
    - Create tooltip structure with name and description sections
    - Style tooltip with white background, shadow, rounded corners
    - Position tooltip absolutely for dynamic placement
    - _Requirements: 2.3, 2.4_
  
  - [x] 4.2 Implement hotspot hover interactions
    - Create `scripts/ui/map.js` file
    - Add mouseenter event listeners to all hotspots
    - Show tooltip on hover with location name and description
    - Position tooltip near cursor/hotspot
    - Add mouseleave event listener to hide tooltip
    - _Requirements: 2.3_
  
  - [x] 4.3 Implement hotspot click interactions for touch devices
    - Add click event listeners to all hotspots
    - Show tooltip on click (for mobile/touch devices)
    - Toggle tooltip visibility on repeated clicks
    - _Requirements: 2.4_
  
  - [ ]* 4.4 Write property test for hotspot tooltip display
    - **Property 3: Hotspot tooltip display**
    - **Validates: Requirements 2.3, 2.4**
  
  - [x] 4.5 Implement tooltip positioning logic
    - Calculate tooltip position to stay within viewport bounds
    - Flip tooltip to opposite side if would render outside viewport
    - Adjust horizontal position to avoid edge overflow
    - _Requirements: 2.3, 2.4_

- [x] 5. Phase 5: Recommendation Engine (Filtering and Scoring Algorithm)
  - [x] 5.1 Create RecommendationEngine class structure
    - Create `scripts/engine/recommender.js` file
    - Implement RecommendationEngine class with locations array
    - Add generateItinerary method that orchestrates the pipeline
    - Export RecommendationEngine as ES6 module
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9_
  
  - [x] 5.2 Implement profile filtering
    - Add filterByProfile method
    - Filter locations where compatible_profiles includes selected profile
    - Return filtered array
    - _Requirements: 4.1_
  
  - [ ]* 5.3 Write property test for profile filtering
    - **Property 5: Profile filtering**
    - **Validates: Requirements 4.1**
  
  - [x] 5.4 Implement weather filtering with hierarchy
    - Add filterByWeather method
    - Define weather hierarchy (anything > short-outdoor > indoor)
    - Filter locations by weather compatibility
    - Return filtered array
    - _Requirements: 4.4_
  
  - [ ]* 5.5 Write property test for weather filtering
    - **Property 8: Weather filtering**
    - **Validates: Requirements 4.4**
  
  - [x] 5.6 Implement activity tag scoring
    - Add scoreByActivities method
    - Count matching tags between location and selected activities
    - Assign score to each location based on match count
    - Return locations with scores
    - _Requirements: 4.3_
  
  - [ ]* 5.7 Write property test for activity tag scoring
    - **Property 7: Activity tag scoring**
    - **Validates: Requirements 4.3**
  
  - [x] 5.8 Implement region bonus scoring
    - Add applyRegionBonus method
    - Add bonus points (2) to locations in selected region
    - Skip if region is "No preference"
    - Return locations with updated scores
    - _Requirements: 4.2_
  
  - [ ]* 5.9 Write property test for region scoring bonus
    - **Property 6: Region scoring bonus**
    - **Validates: Requirements 4.2**
  
  - [x] 5.10 Implement location count selection by duration
    - Add getLocationCount method
    - Return 2-3 for half-day, 4-5 for 1-day, 6-8 for 2-days
    - Sort locations by score descending
    - Select top N locations
    - _Requirements: 4.5, 4.6, 4.7_
  
  - [x] 5.11 Implement regional ordering
    - Add orderByRegion method
    - Group locations by region
    - Order regions geographically (central, north, northeast, east, west, south)
    - Flatten back to ordered array
    - _Requirements: 4.8_
  
  - [ ]* 5.12 Write property test for regional grouping in itinerary
    - **Property 9: Regional grouping in itinerary**
    - **Validates: Requirements 4.8**
  
  - [x] 5.13 Handle edge case: insufficient matching locations
    - Check if filtered locations < required count
    - Return all available locations if insufficient
    - Prepare message for UI: "We found N locations matching your preferences"
    - _Requirements: 4.5, 4.6, 4.7_

- [x] 6. Phase 6: Rationale Generation (Template-Based Text)
  - [x] 6.1 Create RationaleGenerator class
    - Create `scripts/engine/rationale.js` file
    - Implement RationaleGenerator class with templates object
    - Add generate method that takes preferences and itinerary
    - Export RationaleGenerator as ES6 module
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_
  
  - [x] 6.2 Implement template placeholder substitution
    - Add substituteValues method
    - Replace {{duration}} with duration phrase
    - Replace {{profile}} with profile phrase
    - Replace {{activities}} with formatted activity list (up to 3)
    - Replace {{region_text}} with region-specific phrase
    - _Requirements: 6.2, 6.3, 6.4, 6.5_
  
  - [ ]* 6.3 Write property test for rationale includes preferences
    - **Property 10: Rationale includes preferences**
    - **Validates: Requirements 5.2, 6.2, 6.3, 6.4, 6.5**
  
  - [x] 6.4 Implement location highlights generation
    - Add generateLocationHighlights method
    - Select 2-3 featured locations from itinerary
    - Use first rationale_hint from each location
    - Format as grammatically correct sentences
    - Join with proper punctuation (commas and "and")
    - _Requirements: 5.3, 6.6_
  
  - [ ]* 6.5 Write property test for rationale includes location names
    - **Property 11: Rationale includes location names**
    - **Validates: Requirements 5.3**
  
  - [ ]* 6.6 Write property test for rationale includes location hints
    - **Property 13: Rationale includes location hints**
    - **Validates: Requirements 6.6**

- [x] 7. Phase 7: Results Display (Itinerary Rendering)
  - [x] 7.1 Create ResultsRenderer class
    - Create `scripts/ui/results.js` file
    - Implement ResultsRenderer class with container element
    - Add render method that takes rationale, itinerary, and duration
    - Export ResultsRenderer as ES6 module
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_
  
  - [x] 7.2 Implement rationale rendering
    - Add renderRationale method
    - Create rationale paragraph element
    - Insert rationale text
    - Append to results container
    - _Requirements: 5.1, 5.2_
  
  - [x] 7.3 Implement single-day itinerary rendering
    - Add renderSingleDayItinerary method
    - Create ordered list element
    - Render each location as list item
    - Include location name, description, and tags
    - _Requirements: 5.4, 5.6_
  
  - [x] 7.4 Implement two-day itinerary rendering
    - Add renderTwoDayItinerary method
    - Split locations into Day 1 and Day 2 sections
    - Create separate ordered lists for each day
    - Add day headers ("Day 1", "Day 2")
    - _Requirements: 5.5_
  
  - [x] 7.5 Implement location card rendering
    - Add renderLocation method
    - Create location card with name, description, and tags
    - Render tags as chips matching activity selector style
    - Return location card element
    - _Requirements: 5.6, 5.7_
  
  - [ ]* 7.6 Write property test for location rendering completeness
    - **Property 12: Location rendering completeness**
    - **Validates: Requirements 5.6**
  
  - [x] 7.7 Add "Save for Trip" button to results
    - Add renderSaveButton method
    - Create button element with "Save for Trip" text
    - Style button consistently with Generate button
    - Append to results container
    - _Requirements: 9.1_

- [x] 8. Phase 8: Mobile Summary View (Screenshot-Optimized Layout)
  - [x] 8.1 Create mobile summary HTML structure
    - Add mobile summary container div to HTML (initially hidden)
    - Create header with title and "Back to Planning" button
    - Create rationale section
    - Create compact itinerary section
    - Create footer with "Generated by weekend.sg" text
    - _Requirements: 9.2, 9.3, 9.9_
  
  - [x] 8.2 Style mobile summary view for screenshots
    - Create mobile summary styles with full viewport height
    - Use white background and high contrast colors
    - Set large, readable fonts (minimum 16px)
    - Use single column layout with compact spacing
    - Optimize for mobile screenshots (375px-428px width)
    - _Requirements: 9.3, 9.4_
  
  - [x] 8.3 Create MobileSummaryRenderer class
    - Create `scripts/ui/mobile-summary.js` file
    - Implement MobileSummaryRenderer class with container element
    - Add show method that takes rationale, itinerary, and duration
    - Add hide method to close the summary view
    - Export MobileSummaryRenderer as ES6 module
    - _Requirements: 9.2, 9.9_
  
  - [x] 8.4 Implement mobile summary content rendering
    - Add renderRationale method for compact rationale display
    - Add renderCompactItinerary method
    - Add renderCompactLocation method for condensed location cards
    - Include all location details in compact format
    - _Requirements: 9.3, 9.4_
  
  - [x] 8.5 Implement "Back to Planning" button functionality
    - Add click event listener to close button
    - Call MobileSummaryRenderer.hide() on click
    - Return user to main interface
    - _Requirements: 9.9_
  
  - [x] 8.6 Connect "Save for Trip" button to mobile summary
    - Add click event listener to "Save for Trip" button
    - Call MobileSummaryRenderer.show() with current results
    - Display mobile summary overlay
    - Scroll to top of summary
    - _Requirements: 9.2_

- [x] 9. Phase 9: Integration (Connect All Components)
  - [x] 9.1 Create main application initialization file
    - Create `scripts/main.js` file
    - Import all necessary modules (PreferenceManager, RecommendationEngine, RationaleGenerator, ResultsRenderer, MobileSummaryRenderer)
    - Import location data and templates
    - Initialize all class instances
    - _Requirements: 7.1, 7.2_
  
  - [x] 9.2 Wire Generate button to complete flow
    - Add click event listener to Generate button
    - Validate preferences using PreferenceManager.isValid()
    - Get preferences from PreferenceManager
    - Call RecommendationEngine.generateItinerary()
    - Call RationaleGenerator.generate()
    - Call ResultsRenderer.render()
    - Handle validation errors with user-friendly messages
    - _Requirements: 10.6_
  
  - [x] 9.3 Add error handling for no matching locations
    - Check if itinerary is empty after generation
    - Display message: "No locations match your preferences. Try adjusting your selections."
    - Suggest relaxing weather or activity constraints
    - Do not display empty itinerary
    - _Requirements: 4.5, 4.6, 4.7_
  
  - [x] 9.4 Add error handling for insufficient locations
    - Check if itinerary has fewer locations than expected
    - Display message: "We found N locations matching your preferences"
    - Render available locations normally
    - _Requirements: 4.5, 4.6, 4.7_
  
  - [x] 9.5 Test complete user journey end-to-end
    - Select all preferences
    - Click Generate button
    - Verify results display correctly
    - Verify rationale includes preferences
    - Verify itinerary has correct location count
    - Click "Save for Trip" and verify mobile summary
    - Click "Back to Planning" and verify return to main view
    - _Requirements: 1.1-1.12, 2.1-2.4, 4.1-4.9, 5.1-5.7, 6.1-6.7, 9.1-9.9_

- [x] 10. Phase 10: Responsive Polish (Mobile Compatibility)
  - [x] 10.1 Add responsive layout media queries
    - Create media queries for mobile (<768px), tablet (768px-1024px), desktop (>1024px)
    - Stack preference sections vertically on mobile
    - Adjust card and chip sizes for mobile
    - Ensure proper spacing and padding on all screen sizes
    - _Requirements: 8.1, 8.2_
  
  - [x] 10.2 Implement responsive map scaling
    - Add CSS to scale SVG map proportionally on mobile
    - Ensure map fits viewport width on small screens
    - Maintain aspect ratio and hotspot positioning
    - _Requirements: 8.3_
  
  - [x] 10.3 Verify touch target sizes on mobile
    - Audit all interactive elements (buttons, cards, chips)
    - Ensure minimum 44x44px touch targets
    - Add padding if necessary to meet minimum size
    - Test on actual mobile devices or browser dev tools
    - _Requirements: 8.5_
  
  - [ ]* 10.4 Write property test for touch target minimum size
    - **Property 14: Touch target minimum size**
    - **Validates: Requirements 8.5**
  
  - [x] 10.5 Test responsive behavior across viewport sizes
    - Test at 320px width (small mobile)
    - Test at 375px width (iPhone)
    - Test at 768px width (tablet)
    - Test at 1024px width (desktop)
    - Test at 1920px width (large desktop)
    - Verify layout, readability, and interactions at all sizes
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 11. Phase 11: Content Expansion (Add Remaining Locations)
  - [x] 11.1 Add 8 additional locations to reach 12 total
    - Research and select 8 more Singapore locations
    - Create complete location data for each (all required properties)
    - Ensure variety across regions, profiles, activities, and weather
    - Add to locations.js data file
    - _Requirements: 2.5, 3.10_
  
  - [x] 11.2 Update SVG map with additional hotspots
    - Add 8 new circular hotspots to SVG map
    - Position hotspots at appropriate coordinates for new locations
    - Ensure hotspots are visually distinct and properly spaced
    - Update map.js to handle new hotspots
    - _Requirements: 2.5_
  
  - [x] 11.3 Test itinerary generation with full dataset
    - Generate itineraries with various preference combinations
    - Verify all 12 locations can be recommended
    - Verify scoring and filtering work correctly with larger dataset
    - Verify regional ordering with more locations
    - _Requirements: 4.1-4.9_
  
  - [x] 11.4 Validate location data completeness
    - Verify all 12 locations have required properties
    - Verify all enum values are valid (regions, profiles, weather, tags)
    - Verify coordinates are within SVG viewBox bounds
    - Verify descriptions and rationale hints are meaningful
    - _Requirements: 3.1-3.9_

- [x] 12. Final Polish and Print Stylesheet
  - [x] 12.1 Create print stylesheet
    - Create `styles/print.css` file
    - Hide preference panel, map, and buttons in print view
    - Show only rationale and itinerary
    - Use black text on white background for ink efficiency
    - Prevent location cards from splitting across pages
    - Optimize spacing for paper format
    - _Requirements: 9.5, 9.6, 9.7, 9.8_
  
  - [x] 12.2 Link print stylesheet in HTML
    - Add link tag for print.css with media="print"
    - Test print output (Cmd/Ctrl + P)
    - Verify preference panel and map are hidden
    - Verify rationale and itinerary display correctly
    - _Requirements: 9.5, 9.6, 9.7, 9.8_
  
  - [x] 12.3 Final cross-browser testing
    - Test in Chrome/Edge 90+
    - Test in Firefox 88+
    - Test in Safari 14+
    - Test in Mobile Safari 14+
    - Test in Chrome Android 90+
    - Verify all functionality works in target browsers
    - _Requirements: 7.1, 7.2, 7.6_
  
  - [x] 12.4 Final accessibility review
    - Verify keyboard navigation works for all interactive elements
    - Verify logical tab order
    - Verify ARIA labels for icon-only buttons
    - Verify sufficient color contrast (WCAG AA)
    - Verify focus indicators on all interactive elements
    - _Requirements: 8.1-8.5_
  
  - [x] 12.5 Performance optimization check
    - Verify total page weight < 150 KB
    - Verify HTML < 20 KB
    - Verify CSS < 35 KB
    - Verify JavaScript < 55 KB
    - Verify SVG < 40 KB
    - Optimize assets if necessary
    - _Requirements: 7.1, 7.2, 7.6_

## Notes

- Tasks marked with `*` are optional property-based tests and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The implementation uses vanilla JavaScript (ES6+), HTML, and CSS with no build tools
- All code should be deployable to GitHub Pages as static files
- Property tests validate universal correctness properties across all inputs
- Unit tests (not included in this task list) should be written alongside implementation for specific examples and edge cases
