/**
 * ResultsRenderer - Renders itinerary and rationale to DOM
 */

export class ResultsRenderer {
  constructor(containerElement) {
    this.container = containerElement;
    this.currentRationale = '';
    this.currentItinerary = [];
    this.currentDuration = '';
  }

  render(rationale, itinerary, duration) {
    // Store current data for copy functionality
    this.currentRationale = rationale;
    this.currentItinerary = itinerary;
    this.currentDuration = duration;
    
    this.clear();
    this.renderRationale(rationale);
    
    if (duration === '2-days') {
      this.renderTwoDayItinerary(itinerary);
    } else {
      this.renderSingleDayItinerary(itinerary);
    }
    
    this.renderSaveButton();
  }

  renderRationale(text) {
    const rationaleDiv = document.createElement('div');
    rationaleDiv.className = 'rationale';
    rationaleDiv.innerHTML = `
      <h3>Your Weekend Plan</h3>
      <p>${text}</p>
    `;
    this.container.appendChild(rationaleDiv);
  }

  renderSingleDayItinerary(locations) {
    const itineraryDiv = document.createElement('div');
    itineraryDiv.className = 'itinerary';
    itineraryDiv.innerHTML = '<h3>Your Itinerary</h3>';
    
    const list = document.createElement('div');
    list.className = 'itinerary-list';
    
    locations.forEach(location => {
      list.appendChild(this.renderLocation(location));
    });
    
    itineraryDiv.appendChild(list);
    this.container.appendChild(itineraryDiv);
  }

  renderTwoDayItinerary(locations) {
    const itineraryDiv = document.createElement('div');
    itineraryDiv.className = 'itinerary';
    
    // Split locations into Day 1 and Day 2
    const midpoint = Math.ceil(locations.length / 2);
    const day1 = locations.slice(0, midpoint);
    const day2 = locations.slice(midpoint);
    
    // Day 1
    const day1Section = document.createElement('div');
    day1Section.className = 'day-section';
    day1Section.innerHTML = '<h4>Day 1</h4>';
    const day1List = document.createElement('div');
    day1List.className = 'itinerary-list';
    day1.forEach(location => {
      day1List.appendChild(this.renderLocation(location));
    });
    day1Section.appendChild(day1List);
    
    // Day 2
    const day2Section = document.createElement('div');
    day2Section.className = 'day-section';
    day2Section.innerHTML = '<h4>Day 2</h4>';
    const day2List = document.createElement('div');
    day2List.className = 'itinerary-list';
    day2.forEach(location => {
      day2List.appendChild(this.renderLocation(location));
    });
    day2Section.appendChild(day2List);
    
    itineraryDiv.appendChild(day1Section);
    itineraryDiv.appendChild(day2Section);
    this.container.appendChild(itineraryDiv);
  }

  renderLocation(location) {
    const card = document.createElement('div');
    card.className = 'location-card';
    card.setAttribute('data-location-id', location.id);
    
    // Create header with name and region badge
    const header = document.createElement('div');
    header.className = 'location-card__header';
    
    const name = document.createElement('div');
    name.className = 'location-card__name';
    name.textContent = location.name;
    
    const regionBadge = document.createElement('span');
    regionBadge.className = 'location-card__region-badge';
    regionBadge.textContent = location.region.charAt(0).toUpperCase() + location.region.slice(1);
    
    header.appendChild(name);
    header.appendChild(regionBadge);
    
    const description = document.createElement('div');
    description.className = 'location-card__description';
    description.textContent = location.description;
    
    const tags = document.createElement('div');
    tags.className = 'location-card__tags';
    location.tags.forEach(tag => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = tag.replace(/-/g, ' ');
      tags.appendChild(chip);
    });
    
    card.appendChild(header);
    card.appendChild(description);
    card.appendChild(tags);
    
    return card;
  }

  renderSaveButton() {
    const button = document.createElement('button');
    button.className = 'save-button';
    button.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="margin-right: 8px;">
        <path d="M8 2H4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8l-8-6z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 18v-6H6v6M6 2v6h7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Copy to Clipboard
    `;
    
    button.addEventListener('click', () => {
      this.copyToClipboard();
    });
    
    this.container.appendChild(button);
  }

  /**
   * Copy itinerary to clipboard as formatted text
   */
  async copyToClipboard() {
    const text = this.formatItineraryAsText();
    
    try {
      await navigator.clipboard.writeText(text);
      this.showCopyFeedback(true);
    } catch (err) {
      // Fallback for older browsers
      this.fallbackCopyToClipboard(text);
    }
  }

  /**
   * Format itinerary as plain text
   */
  formatItineraryAsText() {
    let text = '🌴 MY SINGAPORE WEEKEND 🌴\n\n';
    text += `${this.currentRationale}\n\n`;
    text += '━━━━━━━━━━━━━━━━━━━━\n\n';
    
    if (this.currentDuration === '2-days') {
      const midpoint = Math.ceil(this.currentItinerary.length / 2);
      const day1 = this.currentItinerary.slice(0, midpoint);
      const day2 = this.currentItinerary.slice(midpoint);
      
      text += '📅 DAY 1\n\n';
      day1.forEach((location, index) => {
        text += this.formatLocationAsText(location, index + 1);
      });
      
      text += '\n📅 DAY 2\n\n';
      day2.forEach((location, index) => {
        text += this.formatLocationAsText(location, index + 1);
      });
    } else {
      this.currentItinerary.forEach((location, index) => {
        text += this.formatLocationAsText(location, index + 1);
      });
    }
    
    text += '\n━━━━━━━━━━━━━━━━━━━━\n';
    text += 'Generated by weekend.sg 🇸🇬';
    
    return text;
  }

  /**
   * Format a single location as text
   */
  formatLocationAsText(location, number) {
    let text = `${number}. ${location.name}\n`;
    text += `   ${location.description}\n`;
    if (location.tags && location.tags.length > 0) {
      text += `   🏷️  ${location.tags.slice(0, 3).join(' • ')}\n`;
    }
    text += '\n';
    return text;
  }

  /**
   * Fallback copy method for older browsers
   */
  fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showCopyFeedback(true);
    } catch (err) {
      this.showCopyFeedback(false);
    }
    
    document.body.removeChild(textArea);
  }

  /**
   * Show visual feedback after copy
   */
  showCopyFeedback(success) {
    const button = this.container.querySelector('.save-button');
    if (!button) return;
    
    const originalHTML = button.innerHTML;
    
    if (success) {
      button.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="margin-right: 8px;">
          <path d="M16 6L7.5 14.5L4 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Copied!
      `;
      button.style.background = '#10B981';
    } else {
      button.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="margin-right: 8px;">
          <path d="M10 6v4M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/>
        </svg>
        Failed to copy
      `;
      button.style.background = '#EF4444';
    }
    
    // Reset after 2 seconds
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.style.background = '';
    }, 2000);
  }

  clear() {
    this.container.innerHTML = '';
    this.container.classList.remove('empty');
  }
}
