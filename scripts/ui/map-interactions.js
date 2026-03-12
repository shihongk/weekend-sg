/**
 * MapInteractions - Handles interactive map region buttons
 */

export class MapInteractions {
  constructor(preferenceManager, locations = []) {
    this.preferenceManager = preferenceManager;
    this.locations = locations;
    this.regionButtons = [];
    this.init();
  }

  init() {
    this.setupRegionButtons();
    this.updateLocationCounts();
  }

  setupRegionButtons() {
    const regionButtons = document.querySelectorAll('.region-button');
    
    regionButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const region = e.currentTarget.dataset.region;
        this.handleRegionClick(region);
      });

      button.addEventListener('mouseenter', (e) => {
        const region = e.currentTarget.dataset.region;
        this.handleRegionHover(region, true);
      });

      button.addEventListener('mouseleave', (e) => {
        const region = e.currentTarget.dataset.region;
        this.handleRegionHover(region, false);
      });
    });

    this.regionButtons = regionButtons;
  }

  handleRegionClick(region) {
    // Show recommended places for this region
    this.showRecommendedPlaces(region);
  }

  handleRegionHover(region, isHovering) {
    const button = document.querySelector(`[data-region="${region}"]`);
    if (!button) return;

    if (isHovering) {
      // Add subtle pulse effect or highlight
      button.style.transform = button.classList.contains('active') 
        ? 'translate(-50%, -50%) scale(1.15)' 
        : 'translate(-50%, -50%) scale(1.08)';
    } else {
      // Reset to normal state
      button.style.transform = button.classList.contains('active')
        ? 'translate(-50%, -50%) scale(1.1)'
        : 'translate(-50%, -50%) scale(1)';
    }
  }

  updateRegionButtonStates() {
    const selectedRegions = this.preferenceManager.getPreferences().regions;
    
    this.regionButtons.forEach(button => {
      const region = button.dataset.region;
      const isSelected = selectedRegions.includes(region);
      
      if (isSelected) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  updateRegionChipStates() {
    // Sync with the region chips in the preference panel
    const regionChips = document.querySelectorAll('.region-selector .chip');
    const selectedRegions = this.preferenceManager.getPreferences().regions;
    
    regionChips.forEach(chip => {
      const region = chip.dataset.value;
      const isSelected = selectedRegions.includes(region);
      
      if (isSelected) {
        chip.setAttribute('data-selected', 'true');
      } else {
        chip.removeAttribute('data-selected');
      }
    });
  }

  updateLocationCounts() {
    // Calculate actual counts from location data
    const counts = {
      central: 0,
      north: 0,
      northeast: 0,
      east: 0,
      west: 0
    };

    // Count locations by region
    this.locations.forEach(location => {
      const region = location.region;
      if (counts.hasOwnProperty(region)) {
        counts[region]++;
      }
    });

    // Update the count displays
    Object.entries(counts).forEach(([region, count]) => {
      const countElement = document.getElementById(`${region}-count`);
      if (countElement) {
        countElement.textContent = `${count} place${count !== 1 ? 's' : ''}`;
      }
    });
  }

  // Method to be called when regions are selected from the preference panel
  syncFromPreferencePanel() {
    this.updateRegionButtonStates();
  }

  // Method to highlight regions based on current selection
  highlightSelectedRegions() {
    const selectedRegions = this.preferenceManager.getPreferences().regions;
    
    this.regionButtons.forEach(button => {
      const region = button.dataset.region;
      if (selectedRegions.includes(region)) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  showRecommendedPlaces(region) {
    // Filter locations by region
    const regionLocations = this.locations.filter(loc => loc.region === region);
    
    // Determine how many to show (10 for central, 5 for others)
    const limit = region === 'central' ? 10 : 5;
    
    // Sort by number of tags (more diverse locations first) and take top N
    const topLocations = regionLocations
      .sort((a, b) => b.tags.length - a.tags.length)
      .slice(0, limit);
    
    // Update the UI
    const recommendedSection = document.getElementById('recommended-places');
    const recommendedTitle = document.getElementById('recommended-title');
    const recommendedList = document.getElementById('recommended-list');
    
    if (!recommendedSection || !recommendedTitle || !recommendedList) return;
    
    // Update title
    const regionName = region.charAt(0).toUpperCase() + region.slice(1);
    recommendedTitle.textContent = `Top ${limit} Places in ${regionName}`;
    
    // Clear previous content
    recommendedList.innerHTML = '';
    
    // Add location items
    topLocations.forEach((location, index) => {
      const item = document.createElement('div');
      item.className = 'recommended-item';
      
      // Format tags for display (limit to 3)
      const displayTags = location.tags.slice(0, 3).map(tag => {
        return tag.replace(/-/g, ' ').replace(/_/g, ' ');
      });
      
      item.innerHTML = `
        <div class="recommended-item__number">${index + 1}</div>
        <div class="recommended-item__content">
          <div class="recommended-item__name">${location.name}</div>
          <div class="recommended-item__description">${location.description}</div>
          <div class="recommended-item__tags">
            ${displayTags.map(tag => `<span class="recommended-item__tag">${tag}</span>`).join('')}
          </div>
        </div>
      `;
      
      recommendedList.appendChild(item);
    });
    
    // Show the section with animation
    recommendedSection.style.display = 'block';
    
    // Scroll to the recommended section smoothly
    setTimeout(() => {
      recommendedSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}