/**
 * EnhancedRecommendationEngine - Extended recommendation engine with selection management
 */

import { RecommendationEngine } from './recommender.js';

export class EnhancedRecommendationEngine extends RecommendationEngine {
  constructor(locations, selectionManager) {
    super(locations);
    this.selectionManager = selectionManager;
    this.originalLocations = locations;
  }

  /**
   * Generate itinerary with enhanced selection handling
   * @param {Object} preferences - User preferences
   * @returns {Object} Result with itinerary and metadata
   */
  generateEnhancedItinerary(preferences) {
    try {
      // Apply visited location exclusion
      const availableLocations = this.selectionManager.getUnvisitedLocations(this.originalLocations);
      
      if (availableLocations.length === 0) {
        return {
          type: 'no_locations',
          message: 'All locations have been marked as visited. Try unmarking some locations or refresh the page.'
        };
      }
      
      // Temporarily replace locations for filtering
      this.locations = availableLocations;
      
      // Run standard pipeline to get all matches
      const result = this.generateItineraryWithMatches(preferences);
      
      // Restore original locations
      this.locations = this.originalLocations;
      
      // Check if we have more matches than limit
      const limit = this.getLocationCount(preferences.duration);
      
      if (result.allMatches.length > limit) {
        // Show selection interface
        this.selectionManager.showLocationSelection(result.allMatches, preferences, limit);
        
        return {
          type: 'selection_required',
          availableCount: result.allMatches.length,
          limit: limit,
          topRecommendations: result.itinerary,
          message: `Found ${result.allMatches.length} great options! Please select your preferred locations.`
        };
      }
      
      if (result.allMatches.length === 0) {
        return {
          type: 'no_matches',
          message: 'No locations match your current preferences. Try selecting different regions or activities.',
          suggestions: this.generateSuggestions(preferences, availableLocations)
        };
      }
      
      return {
        type: 'standard',
        itinerary: result.itinerary,
        allMatches: result.allMatches
      };
    } catch (error) {
      console.error('Error in generateEnhancedItinerary:', error);
      return {
        type: 'error',
        message: 'An error occurred while generating recommendations. Please try again.'
      };
    }
  }

  /**
   * Generate itinerary and capture all matches
   * @param {Object} preferences - User preferences
   * @returns {Object} Result with itinerary and all matches
   */
  generateItineraryWithMatches(preferences) {
    // 1. Filter by profile compatibility
    let candidates = this.filterByProfile(this.locations, preferences.profile);
    
    // 2. Filter by weather suitability
    candidates = this.filterByWeather(candidates, preferences.weather);
    
    // 3. Filter by regions if any selected
    if (preferences.regions && preferences.regions.length > 0) {
      candidates = this.filterByRegions(candidates, preferences.regions);
    }
    
    // 4. Score by activity tag matching
    candidates = this.scoreByActivities(candidates, preferences.activities);
    
    // 5. Apply region bonus for selected regions
    candidates = this.applyRegionBonus(candidates, preferences.regions);
    
    // 6. Sort by score
    candidates.sort((a, b) => b.score - a.score);
    
    // Store all matches AFTER sorting so modal shows them in priority order
    const allMatches = [...candidates];
    
    // 7. Select top N based on duration
    const count = this.getLocationCount(preferences.duration);
    const selected = candidates.slice(0, count);
    
    // 8. Order by regional grouping
    const itinerary = this.orderByRegion(selected);
    
    return {
      itinerary: itinerary,
      allMatches: allMatches
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
    
    if (selectedLocations.length === 0) {
      return [];
    }
    
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
   * Generate suggestions when no matches found
   * @param {Object} preferences - User preferences
   * @param {Array} availableLocations - Locations not marked as visited
   * @returns {Array} Suggestion messages
   */
  generateSuggestions(preferences, availableLocations) {
    const suggestions = [];
    
    // Check if region filtering is too restrictive
    if (preferences.regions && preferences.regions.length > 0) {
      // Test without region filter
      let withoutRegionFilter = this.filterByProfile(availableLocations, preferences.profile);
      const withoutRegionAndWeather = this.filterByWeather(withoutRegionFilter, preferences.weather);
      
      if (withoutRegionAndWeather.length > 0) {
        suggestions.push('Try selecting different regions or choose "no regions" to see more options');
      }
    }
    
    // Check if activity filtering is too restrictive
    if (preferences.activities && preferences.activities.length > 3) {
      suggestions.push('Try selecting fewer activity types to see more options');
    }
    
    // Check if profile is too restrictive
    const profileCandidates = availableLocations.filter(loc => 
      loc.compatible_profiles.includes(preferences.profile)
    );
    
    if (profileCandidates.length === 0) {
      suggestions.push('Try selecting a different travel profile');
    }
    
    // Check weather restrictions
    if (preferences.weather === 'indoor') {
      const outdoorOptions = availableLocations.filter(loc => 
        loc.weather_suitability === 'anything' || loc.weather_suitability === 'short-outdoor'
      );
      
      if (outdoorOptions.length > profileCandidates.length) {
        suggestions.push('Try selecting "Any weather" to see outdoor options');
      }
    }
    
    if (suggestions.length === 0) {
      suggestions.push('Try refreshing the page or unmarking some visited locations');
    }
    
    return suggestions;
  }

  /**
   * Filter locations by regions (override to handle empty regions)
   * @param {Array} locations - Locations to filter
   * @param {Array} selectedRegions - Selected regions
   * @returns {Array} Filtered locations
   */
  filterByRegions(locations, selectedRegions) {
    if (!selectedRegions || selectedRegions.length === 0) {
      return locations;
    }
    
    return locations.filter(location =>
      selectedRegions.includes(location.region)
    );
  }
}