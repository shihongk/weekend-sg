# Requirements Document

## Introduction

weekend.sg is a rule-based web application that helps users design customized weekend itineraries for visiting Singapore. The application runs as a static site using HTML, CSS, and vanilla JavaScript, deployable on GitHub Pages. It guides users through preference selection using modern UI components, displays an interactive SVG map of Singapore locations, and generates personalized itineraries using a client-side rule-based recommendation engine with template-based rationale generation.

## Glossary

- **Application**: The weekend.sg static web application
- **User**: A person planning a weekend visit to Singapore
- **Preference_Panel**: The interactive UI section where users select their preferences
- **Duration_Selector**: UI component for selecting trip duration (Half day, 1 day, 2 days)
- **Region_Selector**: UI component for selecting starting region in Singapore
- **Profile_Selector**: UI component for selecting travel profile type
- **Activity_Selector**: UI component for selecting activity preferences
- **Weather_Selector**: UI component for selecting weather comfort level
- **Interactive_Map**: SVG-based clickable map displaying Singapore locations
- **Location**: A point of interest in Singapore with associated metadata
- **Location_Data**: JSON structure containing location properties (id, name, region, tags, weather suitability, compatible profiles, duration options, description, rationale hints)
- **Hotspot**: A clickable area on the Interactive_Map representing a Location
- **Results_Area**: UI section displaying generated itinerary and rationale
- **Itinerary**: Ordered list of Locations with timing and descriptions
- **Rationale**: Template-generated explanation of why the Itinerary fits User preferences
- **Recommendation_Engine**: Client-side JavaScript logic that filters and scores Locations
- **Generate_Button**: Call-to-action button that triggers itinerary generation
- **Tag**: A category label for Location attributes (e.g., "Nature/parks", "Local food")
- **Chip**: A pill-shaped UI element displaying text or tags
- **Profile_Card**: A clickable card UI element for selecting travel profile
- **Duration_Card**: A clickable card UI element for selecting trip duration
- **Segmented_Control**: A grouped button UI element for mutually exclusive options
- **Mobile_Summary_View**: A screenshot-optimized layout displaying the itinerary in a compact, mobile-friendly format
- **Print_Stylesheet**: CSS rules that format the page for printing

## Requirements

### Requirement 1: Interactive Preference Panel

**User Story:** As a User, I want to specify my trip preferences through modern interactive UI components, so that I can easily communicate my needs without using basic form controls.

#### Acceptance Criteria

1. THE Preference_Panel SHALL display five distinct sections for preference selection
2. THE Duration_Selector SHALL render three clickable Duration_Cards labeled "Half day", "1 day", and "2 days"
3. WHEN a User clicks a Duration_Card, THE Duration_Selector SHALL visually highlight the selected card and deselect other cards
4. THE Region_Selector SHALL render six pill-shaped Chips labeled "Central", "North", "East", "West", "Northeast", and "No preference"
5. WHEN a User clicks a region Chip, THE Region_Selector SHALL visually highlight the selected Chip and deselect other Chips
6. THE Profile_Selector SHALL render five Profile_Cards labeled "Solo", "Couple", "Family with young kids", "Family with teens", and "Group of friends"
7. WHEN a User clicks a Profile_Card, THE Profile_Selector SHALL visually highlight the selected card and deselect other cards
8. THE Activity_Selector SHALL render nine multi-select Chips labeled "Nature/parks", "Physical activity", "Culture & heritage", "Art & design", "Museums", "Sustainability", "History & politics", "Local food", and "Hidden gems"
9. WHEN a User clicks an activity Chip, THE Activity_Selector SHALL toggle the visual highlight state of that Chip without affecting other Chips
10. THE Weather_Selector SHALL render a Segmented_Control with three options labeled "Anything goes", "Mostly indoor/sheltered", and "Short outdoor walks"
11. WHEN a User clicks a Weather_Selector option, THE Segmented_Control SHALL visually highlight the selected option and deselect other options
12. THE Preference_Panel SHALL display a Generate_Button labeled "Generate my weekend"

### Requirement 2: Interactive Singapore Map

**User Story:** As a User, I want to see an interactive visual map of Singapore locations, so that I can understand the geographic distribution of potential destinations.

#### Acceptance Criteria

1. THE Interactive_Map SHALL render as an SVG element with a stylized representation of Singapore
2. THE Interactive_Map SHALL display at least three Hotspots representing Locations
3. WHEN a User hovers over a Hotspot, THE Interactive_Map SHALL display the Location name and a mini description
4. WHEN a User clicks a Hotspot, THE Interactive_Map SHALL display the Location name and a mini description
5. THE Interactive_Map SHALL support expansion to twelve Hotspots without requiring structural changes

### Requirement 3: Location Data Model

**User Story:** As a developer, I want a structured data model for Locations, so that the Recommendation_Engine can filter and score destinations effectively.

#### Acceptance Criteria

1. THE Location_Data SHALL include an id property of type string
2. THE Location_Data SHALL include a name property of type string
3. THE Location_Data SHALL include a region property matching Region_Selector options
4. THE Location_Data SHALL include a tags property as an array of strings matching Activity_Selector options
5. THE Location_Data SHALL include a weather_suitability property matching Weather_Selector options
6. THE Location_Data SHALL include a compatible_profiles property as an array matching Profile_Selector options
7. THE Location_Data SHALL include a duration_options property as an array matching Duration_Selector options
8. THE Location_Data SHALL include a description property of type string
9. THE Location_Data SHALL include a rationale_hints property as an array of strings
10. THE Application SHALL initialize with Location_Data for at least three Locations

### Requirement 4: Rule-Based Recommendation Engine

**User Story:** As a User, I want the Application to recommend Locations based on my preferences using client-side logic, so that I receive personalized itineraries without requiring a backend server.

#### Acceptance Criteria

1. WHEN the Generate_Button is clicked, THE Recommendation_Engine SHALL filter Locations by compatible_profiles matching the selected Profile_Selector value
2. WHEN the Generate_Button is clicked AND a specific region is selected, THE Recommendation_Engine SHALL apply a scoring bonus to Locations in the selected region
3. WHEN the Generate_Button is clicked, THE Recommendation_Engine SHALL score Locations by counting matching tags between Location_Data tags and selected Activity_Selector Chips
4. WHEN the Generate_Button is clicked, THE Recommendation_Engine SHALL filter Locations by weather_suitability matching the selected Weather_Selector value
5. WHEN "Half day" is selected, THE Recommendation_Engine SHALL select 2 to 3 Locations for the Itinerary
6. WHEN "1 day" is selected, THE Recommendation_Engine SHALL select 4 to 5 Locations for the Itinerary
7. WHEN "2 days" is selected, THE Recommendation_Engine SHALL select 6 to 8 Locations for the Itinerary
8. THE Recommendation_Engine SHALL order selected Locations by regional grouping to minimize travel distance
9. THE Recommendation_Engine SHALL execute entirely in client-side JavaScript without external API calls

### Requirement 5: Results Display

**User Story:** As a User, I want to see my generated itinerary with explanations, so that I understand why these Locations were recommended.

#### Acceptance Criteria

1. WHEN the Generate_Button is clicked, THE Results_Area SHALL display a Rationale paragraph
2. THE Rationale SHALL reference the selected duration, profile, region preference, and activity tags
3. THE Rationale SHALL mention specific Location names from the generated Itinerary
4. THE Results_Area SHALL display the Itinerary as an ordered list
5. WHEN "2 days" is selected, THE Results_Area SHALL split the Itinerary into "Day 1" and "Day 2" sections
6. FOR EACH Location in the Itinerary, THE Results_Area SHALL display the Location name, description, and tags as colored Chips
7. THE Results_Area SHALL render tags using the same visual style as Activity_Selector Chips

### Requirement 6: Rationale Generation

**User Story:** As a User, I want to receive a personalized explanation for my itinerary, so that I feel the recommendations are tailored to my preferences.

#### Acceptance Criteria

1. THE Application SHALL generate the Rationale using template-based text substitution
2. THE Rationale SHALL include the selected duration value from Duration_Selector
3. THE Rationale SHALL include the selected profile value from Profile_Selector
4. THE Rationale SHALL include the selected region value from Region_Selector when not "No preference"
5. THE Rationale SHALL include up to three selected activity tags from Activity_Selector
6. THE Rationale SHALL incorporate rationale_hints from selected Locations
7. THE Application SHALL generate the Rationale entirely in client-side JavaScript without external AI services

### Requirement 7: Static Site Architecture

**User Story:** As a developer, I want the Application to run as a static site, so that it can be hosted on GitHub Pages without backend infrastructure.

#### Acceptance Criteria

1. THE Application SHALL use only HTML, CSS, and vanilla JavaScript
2. THE Application SHALL use ES6 JavaScript modules OR a single script file
3. THE Application SHALL NOT require a backend server
4. THE Application SHALL NOT make external API calls to AI services
5. THE Application SHALL NOT require user authentication or login
6. THE Application SHALL function correctly when served from GitHub Pages
7. THE Application SHALL store all Location_Data in client-side JavaScript

### Requirement 8: Responsive Layout

**User Story:** As a User, I want the Application to work on mobile devices, so that I can plan my weekend on any device.

#### Acceptance Criteria

1. THE Application SHALL render correctly on viewport widths from 320px to 1920px
2. WHEN viewport width is less than 768px, THE Preference_Panel SHALL stack sections vertically
3. WHEN viewport width is less than 768px, THE Interactive_Map SHALL scale proportionally to fit the viewport
4. THE Application SHALL use responsive CSS units for layout dimensions
5. THE Application SHALL ensure touch targets are at least 44px by 44px on mobile viewports

### Requirement 9: Mobile Takeaway Features

**User Story:** As a User, I want to save my itinerary for offline use during my trip, so that I can reference it on my mobile phone without internet access.

#### Acceptance Criteria

1. THE Results_Area SHALL display a "Save for Trip" button after itinerary generation
2. WHEN the "Save for Trip" button is clicked, THE Application SHALL display a mobile-optimized summary view
3. THE mobile-optimized summary view SHALL include the Rationale, all Location names, descriptions, and key details in a compact layout
4. THE mobile-optimized summary view SHALL be optimized for mobile screenshots (single column, high contrast, readable text)
5. THE Application SHALL include a print stylesheet that formats the itinerary for printing
6. WHEN the User prints the page, THE print stylesheet SHALL hide the Preference_Panel and Interactive_Map
7. WHEN the User prints the page, THE print stylesheet SHALL display only the Rationale and Itinerary in a clean, readable format
8. THE print stylesheet SHALL use black text on white background for ink efficiency
9. THE mobile-optimized summary view SHALL include a "Back to Planning" button to return to the main interface

### Requirement 10: Enhanced Recommendation Selection

**User Story:** As a User, I want to see all available options when there are many matching locations, so that I can choose which places to include in my itinerary based on my personal preferences and past visits.

#### Acceptance Criteria

1. WHEN the Recommendation_Engine finds more matching Locations than the duration limit, THE Application SHALL display all matching Locations in an "Available Options" section
2. THE "Available Options" section SHALL display each Location as a selectable card with name, description, and tags
3. EACH Location card in "Available Options" SHALL include a checkbox or toggle to include/exclude it from the final itinerary
4. THE Application SHALL display a "Regenerate Itinerary" button when "Available Options" are shown
5. WHEN the "Regenerate Itinerary" button is clicked, THE Application SHALL generate a new itinerary using only the selected Locations from "Available Options"
6. THE Application SHALL respect the duration limits when regenerating (3 for half-day, 4 for 1-day, 7 for 2-days)
7. IF the User selects fewer Locations than the duration limit, THE Application SHALL include all selected Locations
8. IF the User selects more Locations than the duration limit, THE Application SHALL use the scoring system to select the top-rated Locations from the User's selection

### Requirement 11: Visited Location Exclusion

**User Story:** As a User, I want to exclude locations I've already visited, so that my itinerary only includes new places to explore.

#### Acceptance Criteria

1. THE Results_Area SHALL display each recommended Location with an "Already visited" checkbox or toggle
2. WHEN a User marks a Location as "Already visited", THE Application SHALL visually indicate the Location is excluded (e.g., grayed out, strikethrough)
3. THE Application SHALL display a "Regenerate Without Visited" button when any Locations are marked as visited
4. WHEN the "Regenerate Without Visited" button is clicked, THE Application SHALL exclude all marked Locations from the available pool
5. THE Application SHALL regenerate the itinerary using the remaining unvisited Locations
6. THE Application SHALL maintain the User's original preferences (duration, profile, region, activities, weather) during regeneration
7. IF excluding visited Locations results in insufficient options, THE Application SHALL display a message explaining the situation and suggest relaxing preferences
8. THE "Already visited" state SHALL persist during the current session but reset when the page is refreshed
9. THE Application SHALL allow Users to unmark "Already visited" Locations to include them back in the available pool

### Requirement 12: Initial Implementation Scaffold

**User Story:** As a developer, I want a basic working scaffold, so that I can validate the architecture before building complete functionality.

#### Acceptance Criteria

1. THE Application SHALL include an HTML file with Preference_Panel structure containing all five sections
2. THE Application SHALL include CSS styling for Duration_Cards, Chips, Profile_Cards, and Segmented_Control
3. THE Application SHALL include an SVG placeholder Interactive_Map with 3 to 4 dummy Hotspots
4. THE Application SHALL include a JavaScript array with sample Location_Data for 3 to 4 Locations
5. THE Application SHALL include a generateWeekend() function that reads all Preference_Panel selections
6. WHEN the Generate_Button is clicked, THE generateWeekend() function SHALL display placeholder text in the Results_Area
7. THE Application SHALL demonstrate click interactions for all Preference_Panel components

