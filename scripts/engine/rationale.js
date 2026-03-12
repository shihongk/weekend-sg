/**
 * RationaleGenerator - Generates human-readable explanations using templates
 */

export class RationaleGenerator {
  constructor(templates) {
    this.templates = templates;
  }

  generate(preferences, itinerary) {
    // Check if we have activity preferences but no matching locations
    const hasActivityPreferences = preferences.activities && preferences.activities.length > 0;
    const hasMatchingActivities = hasActivityPreferences && itinerary.some(location => 
      location.tags.some(tag => preferences.activities.includes(tag))
    );
    
    let text;
    
    if (hasActivityPreferences && !hasMatchingActivities) {
      // User wanted specific activities but we couldn't find matching locations
      text = this.generateMismatchRationale(preferences, itinerary);
    } else {
      // Normal case - use base template
      text = this.generateNormalRationale(preferences, itinerary);
    }
    
    return text;
  }

  generateMismatchRationale(preferences, itinerary) {
    // Summarize what user wanted
    const activityPhrases = preferences.activities
      .map(tag => this.templates.activity_phrases[tag])
      .filter(Boolean);
    
    const regionPhrase = this.getRegionPhrase(preferences.regions);
    const profilePhrase = this.templates.profile_phrases[preferences.profile];
    const durationPhrase = this.templates.duration_phrases[preferences.duration];
    
    let text = `You're looking for ${activityPhrases.join(' and ')} spots for a ${durationPhrase} trip as ${profilePhrase}`;
    
    if (preferences.regions && preferences.regions.length > 0) {
      text += ` in ${regionPhrase}`;
    }
    
    text += `. We couldn't find locations that match those specific preferences, but here's what we recommend instead in your selected area. `;
    
    // Generate location highlights
    const highlights = this.generateLocationHighlights(itinerary);
    text += highlights;
    
    return text;
  }

  generateNormalRationale(preferences, itinerary) {
    let text = this.templates.base;
    
    // Substitute duration
    const durationPhrase = this.templates.duration_phrases[preferences.duration];
    text = text.replace('{{duration}}', durationPhrase);
    
    // Substitute profile
    const profilePhrase = this.templates.profile_phrases[preferences.profile];
    text = text.replace('{{profile}}', profilePhrase);
    
    // Substitute region(s)
    const regionPhrase = this.getRegionPhrase(preferences.regions);
    text = text.replace('{{region}}', regionPhrase);
    
    // Substitute activities (up to 3)
    const activityPhrases = preferences.activities
      .slice(0, 3)
      .map(tag => this.templates.activity_phrases[tag])
      .filter(Boolean);
    
    const activitiesText = activityPhrases.length > 0 
      ? activityPhrases.join(', ') 
      : 'various';
    text = text.replace('{{activities}}', activitiesText);
    
    // Generate location highlights
    const highlights = this.generateLocationHighlights(itinerary);
    text = text.replace('{{location_highlights}}', highlights);
    
    return text;
  }

  getRegionPhrase(regions) {
    if (!regions || regions.length === 0) {
      return 'around Singapore';
    } else if (regions.length === 1) {
      return this.templates.region_specific[regions[0]];
    } else {
      const regionNames = regions.map(r => this.templates.region_specific[r]);
      return regionNames.join(' and ');
    }
  }

  generateLocationHighlights(itinerary) {
    if (itinerary.length === 0) return '';
    
    // Pick up to 2 locations to highlight
    const featured = itinerary.slice(0, 2);
    
    const highlights = featured.map(location => {
      const hint = location.rationale_hints[0];
      return `${location.name} (${hint})`;
    });
    
    if (highlights.length === 1) {
      return `Check out ${highlights[0]}.`;
    } else if (highlights.length === 2) {
      return `Check out ${highlights[0]} and ${highlights[1]}.`;
    }
    
    return '';
  }
}
