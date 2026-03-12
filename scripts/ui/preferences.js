/**
 * PreferenceManager - Manages user preference selections
 */

export class PreferenceManager {
  constructor() {
    this.preferences = {
      duration: null,
      regions: [],
      profile: null,
      activities: [],
      weather: 'anything'
    };
  }

  setDuration(value) {
    this.preferences.duration = value;
  }

  toggleRegion(value) {
    const index = this.preferences.regions.indexOf(value);
    if (index > -1) {
      this.preferences.regions.splice(index, 1);
    } else {
      this.preferences.regions.push(value);
    }
  }

  setProfile(value) {
    this.preferences.profile = value;
  }

  toggleActivity(value) {
    const index = this.preferences.activities.indexOf(value);
    if (index > -1) {
      this.preferences.activities.splice(index, 1);
    } else {
      this.preferences.activities.push(value);
    }
  }

  setWeather(value) {
    this.preferences.weather = value;
  }

  getPreferences() {
    return { ...this.preferences };
  }

  isValid() {
    return this.preferences.duration !== null && this.preferences.profile !== null;
  }
}
