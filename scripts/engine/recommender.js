/**
 * RecommendationEngine - Filters and scores locations based on preferences
 */

export class RecommendationEngine {
  constructor(locations) {
    this.locations = locations;
  }

  generateItinerary(preferences) {
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
    
    // 7. Select top N based on duration
    const count = this.getLocationCount(preferences.duration);
    const selected = candidates.slice(0, count);
    
    // 8. Order by regional grouping
    return this.orderByRegion(selected);
  }

  filterByProfile(locations, profile) {
    return locations.filter(location =>
      location.compatible_profiles.includes(profile)
    );
  }

  filterByWeather(locations, weather) {
    const weatherHierarchy = {
      'anything': ['anything', 'short-outdoor', 'indoor'],
      'short-outdoor': ['short-outdoor', 'indoor'],
      'indoor': ['indoor']
    };
    
    const acceptable = weatherHierarchy[weather];
    
    return locations.filter(location =>
      acceptable.includes(location.weather_suitability)
    );
  }

  filterByRegions(locations, selectedRegions) {
    return locations.filter(location =>
      selectedRegions.includes(location.region)
    );
  }

  scoreByActivities(locations, selectedActivities) {
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

  applyRegionBonus(locations, selectedRegions, bonusPoints = 2) {
    if (!selectedRegions || selectedRegions.length === 0) {
      return locations;
    }
    
    return locations.map(location => ({
      ...location,
      score: location.score + (selectedRegions.includes(location.region) ? bonusPoints : 0)
    }));
  }

  getLocationCount(duration) {
    const counts = {
      'half-day': 3,
      '1-day': 4,
      '2-days': 7
    };
    
    return counts[duration] || 4;
  }

  orderByRegion(locations) {
    // Group by region
    const grouped = locations.reduce((acc, loc) => {
      if (!acc[loc.region]) acc[loc.region] = [];
      acc[loc.region].push(loc);
      return acc;
    }, {});
    
    // Define region order
    const regionOrder = ['central', 'north', 'northeast', 'east', 'west', 'south'];
    
    // Flatten back to array following region order
    return regionOrder.flatMap(region => grouped[region] || []);
  }
}
