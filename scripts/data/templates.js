/**
 * Rationale templates for weekend.sg
 * Used to generate human-readable explanations for itineraries
 */

export const rationaleTemplates = {
  // Base template with placeholders
  base: "Since you're planning a {{duration}} trip as a {{profile}} from {{region}}, we've picked {{activities}} spots. {{location_highlights}}",
  
  // Region-specific phrases
  region_specific: {
    'central': 'the Central area',
    'north': 'the North',
    'east': 'the East',
    'west': 'the West',
    'northeast': 'the Northeast'
  },
  
  // Activity phrases (map from data values to display text)
  activity_phrases: {
    'nature-parks': 'nature',
    'physical': 'active experiences',
    'culture': 'cultural spots',
    'art': 'art & design',
    'museums': 'museums',
    'sustainability': 'eco-friendly places',
    'history': 'historical sites',
    'heritage': 'heritage sites',
    'local_food': 'local food',
    'hidden': 'hidden gems'
  },
  
  // Profile phrases
  profile_phrases: {
    'solo': 'solo',
    'couple': 'a couple',
    'family-young-kids': 'a family with young kids',
    'family-teens': 'a family with teens',
    'group-friends': 'friends'
  },
  
  // Duration phrases
  duration_phrases: {
    'half-day': 'half-day',
    '1-day': '1-day',
    '2-days': '2-day'
  }
};
