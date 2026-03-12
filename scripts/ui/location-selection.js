/**
 * LocationSelectionManager - Manages enhanced recommendation selection and visited location exclusion
 */

export class LocationSelectionManager {
  constructor() {
    this.visitedLocations = new Set();
    this.selectedLocations = [];
    this.allMatches = [];
    this.selectionContainer = null;
  }

  /**
   * Show location selection interface when too many matches found
   * @param {Array} matches - All matching locations
   * @param {Object} preferences - User preferences
   * @param {Number} limit - Maximum locations to select
   */
  showLocationSelection(matches, preferences, limit) {
    this.allMatches = matches;
    this.selectedLocations = matches.slice(0, limit); // Pre-select top recommendations
    
    this.renderSelectionInterface(matches, preferences, limit);
  }

  /**
   * Render the location selection interface as a modal
   * @param {Array} matches - All matching locations
   * @param {Object} preferences - User preferences
   * @param {Number} limit - Maximum locations to select
   */
  renderSelectionInterface(matches, preferences, limit) {
    // Remove any existing modal
    this.hideLocationSelection();
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = 'location-selection-modal';
    
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    
    // Modal header
    const modalHeader = `
      <div class="modal-header">
        <button class="modal-close" id="modal-close-btn">&times;</button>
        <h3>Choose Your Locations</h3>
        <p>We found ${matches.length} great options! Please select ${limit} locations for your itinerary.</p>
      </div>
    `;
    
    // Modal body with location options and exclusion panel
    const modalBody = `
      <div class="modal-body">
        <div class="modal-body-content">
          <div class="location-options">
            ${matches.map(location => this.renderLocationOption(location)).join('')}
          </div>
          <div class="exclusion-sidebar" id="exclusion-sidebar">
            <div class="exclusion-sidebar-header">
              <h4>Skipped Locations</h4>
              <span class="exclusion-count" id="exclusion-count">0</span>
            </div>
            <div class="exclusion-list" id="exclusion-list">
              <p class="exclusion-empty">No locations skipped yet</p>
            </div>
            <button class="clear-all-skipped" id="clear-all-skipped" style="display: none;">
              Clear All
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Modal footer with regenerate, counter and confirm button
    const modalFooter = `
      <div class="modal-footer">
        <button class="modal-regenerate-button" id="modal-regenerate-btn">
          Regenerate
        </button>
        <div class="selection-counter">
          Selected: <span id="selection-count">${this.selectedLocations.length}</span>/${limit}
        </div>
        <button class="modal-generate-button" id="modal-generate-btn">
          Confirm Selection
        </button>
      </div>
    `;
    
    modalContainer.innerHTML = modalHeader + modalBody + modalFooter;
    modalOverlay.appendChild(modalContainer);
    
    // Add to document body
    document.body.appendChild(modalOverlay);
    
    // Attach event listeners
    this.attachModalListeners(modalOverlay, preferences, limit);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Store reference
    this.modalOverlay = modalOverlay;
    this.currentPreferences = preferences;
    this.currentLimit = limit;
    
    // Update exclusion panel
    this.updateExclusionPanel();
  }

  /**
   * Render a single location option for selection
   * @param {Object} location - Location data
   * @returns {String} HTML string
   */
  renderLocationOption(location) {
    const isSelected = this.selectedLocations.some(loc => loc.id === location.id);
    const isSkipped = this.visitedLocations.has(location.id);
    
    // Format region name for display
    const regionName = location.region.charAt(0).toUpperCase() + location.region.slice(1);
    
    return `
      <div class="location-option ${isSelected ? 'selected' : ''} ${isSkipped ? 'skipped' : ''}" data-location-id="${location.id}">
        <div class="location-option__checkbox">
          <input type="checkbox" id="select-${location.id}" ${isSelected ? 'checked' : ''}>
        </div>
        <div class="location-option__content">
          <div class="location-option__header">
            <div class="location-option__name">${location.name}</div>
            <span class="location-option__region-badge">${regionName}</span>
          </div>
          <div class="location-option__description">${location.description}</div>
          <div class="location-option__tags">
            ${location.tags.map(tag => `<span class="chip">${tag.replace(/-/g, ' ')}</span>`).join('')}
          </div>
          <div class="location-option__skip">
            <label class="skip-checkbox-label">
              <input type="checkbox" class="skip-checkbox" id="skip-${location.id}" ${isSkipped ? 'checked' : ''}>
              <span>Skip this time</span>
            </label>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Toggle location selection
   * @param {String} locationId - ID of location to toggle
   */
  toggleLocationSelection(locationId) {
    const location = this.allMatches.find(loc => loc.id === locationId);
    if (!location) return;
    
    const isCurrentlySelected = this.selectedLocations.some(loc => loc.id === locationId);
    
    if (isCurrentlySelected) {
      // Remove from selection
      this.selectedLocations = this.selectedLocations.filter(loc => loc.id !== locationId);
    } else {
      // Add to selection
      this.selectedLocations.push(location);
    }
    
    // Update UI
    this.updateSelectionUI(locationId);
    this.updateSelectionCounter();
    this.updateGenerateButtonState();
  }

  /**
   * Get currently selected locations
   * @returns {Array} Selected locations
   */
  getSelectedLocations() {
    return this.selectedLocations;
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

  renderVisitedIndicator(locationId) {
    const locationCard = document.querySelector(`[data-location-id="${locationId}"]`);
    if (locationCard && !locationCard.classList.contains('location-option')) {
      locationCard.classList.add('visited');
      
      // Add visited checkbox if not exists
      let visitedCheckbox = locationCard.querySelector('.visited-checkbox');
      if (!visitedCheckbox) {
        visitedCheckbox = document.createElement('div');
        visitedCheckbox.className = 'visited-checkbox';
        visitedCheckbox.innerHTML = `
          <label for="visited-${locationId}">
            <input type="checkbox" id="visited-${locationId}" checked>
            Not this time
          </label>
        `;
        locationCard.appendChild(visitedCheckbox);
        
        // Attach listener
        const checkbox = visitedCheckbox.querySelector('input');
        checkbox.addEventListener('change', (e) => {
          if (e.target.checked) {
            this.markAsVisited(locationId);
          } else {
            this.unmarkAsVisited(locationId);
          }
        });
      }
    }
  }

  removeVisitedIndicator(locationId) {
    const locationCard = document.querySelector(`[data-location-id="${locationId}"]`);
    if (locationCard) {
      locationCard.classList.remove('visited');
      const visitedCheckbox = locationCard.querySelector('.visited-checkbox');
      if (visitedCheckbox) {
        visitedCheckbox.remove();
      }
    }
  }

  renderRegenerateWithoutVisitedButton() {
    let buttonContainer = document.querySelector('.regenerate-without-visited-container');
    if (!buttonContainer) {
      buttonContainer = document.createElement('div');
      buttonContainer.className = 'regenerate-without-visited-container';
      
      // Insert after results area
      const resultsArea = document.querySelector('.results-area');
      resultsArea.parentNode.insertBefore(buttonContainer, resultsArea.nextSibling);
    }
    
    const visitedCount = this.visitedLocations.size;
    buttonContainer.innerHTML = `
      <button class="regenerate-button regenerate-without-visited" id="regenerate-without-visited">
        Regenerate Without Excluded (${visitedCount} excluded)
      </button>
      <button class="manage-exclusions-button" id="manage-exclusions">
        Manage Exclusions
      </button>
    `;
    
    // Attach listeners
    const regenerateButton = buttonContainer.querySelector('#regenerate-without-visited');
    regenerateButton.addEventListener('click', () => {
      this.onRegenerateWithoutVisited();
    });
    
    const manageButton = buttonContainer.querySelector('#manage-exclusions');
    manageButton.addEventListener('click', () => {
      this.showExclusionPanel();
    });
  }

  hideRegenerateWithoutVisitedButton() {
    const buttonContainer = document.querySelector('.regenerate-without-visited-container');
    if (buttonContainer) {
      buttonContainer.remove();
    }
  }

  updateSelectionUI(locationId) {
    const checkbox = document.querySelector(`#select-${locationId}`);
    const option = document.querySelector(`[data-location-id="${locationId}"].location-option`);
    
    if (checkbox && option) {
      const isSelected = this.selectedLocations.some(loc => loc.id === locationId);
      checkbox.checked = isSelected;
      
      if (isSelected) {
        option.classList.add('selected');
      } else {
        option.classList.remove('selected');
      }
    }
  }

  updateSelectionCounter() {
    const counter = document.querySelector('#selection-count');
    if (counter) {
      counter.textContent = this.selectedLocations.length;
    }
  }

  attachModalListeners(modalOverlay, preferences, limit) {
    // Close modal on overlay click
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        this.hideLocationSelection();
      }
    });
    
    // Close modal on close button click
    const closeBtn = modalOverlay.querySelector('#modal-close-btn');
    closeBtn.addEventListener('click', () => {
      this.hideLocationSelection();
    });
    
    // Close modal on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        this.hideLocationSelection();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Skip checkbox listeners (prevent event bubbling)
    const skipCheckboxes = modalOverlay.querySelectorAll('.skip-checkbox');
    skipCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering location selection
      });
      
      checkbox.addEventListener('change', (e) => {
        const locationId = e.target.id.replace('skip-', '');
        if (e.target.checked) {
          this.visitedLocations.add(locationId);
          // Update visual state
          const option = document.querySelector(`[data-location-id="${locationId}"]`);
          if (option) {
            option.classList.add('skipped');
          }
        } else {
          this.visitedLocations.delete(locationId);
          // Update visual state
          const option = document.querySelector(`[data-location-id="${locationId}"]`);
          if (option) {
            option.classList.remove('skipped');
          }
        }
        
        // Update exclusion panel
        this.updateExclusionPanel();
      });
    });
    
    // Location option click listeners (entire box is clickable)
    const locationOptions = modalOverlay.querySelectorAll('.location-option');
    locationOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        // Don't toggle if clicking on checkboxes or their labels
        if (e.target.type === 'checkbox' || 
            e.target.classList.contains('skip-checkbox-label') ||
            e.target.closest('.location-option__skip')) {
          return;
        }
        
        const locationId = option.getAttribute('data-location-id');
        const checkbox = option.querySelector('input[type="checkbox"]:not(.skip-checkbox)');
        
        // Toggle checkbox
        checkbox.checked = !checkbox.checked;
        
        // Toggle selection
        this.toggleLocationSelection(locationId);
      });
      
      // Add hover effect
      option.style.cursor = 'pointer';
    });
    
    // Checkbox listeners (for direct checkbox clicks)
    const checkboxes = modalOverlay.querySelectorAll('input[type="checkbox"]:not(.skip-checkbox)');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const locationId = e.target.id.replace('select-', '');
        this.toggleLocationSelection(locationId);
      });
    });
    
    // Regenerate button listener
    const regenerateButton = modalOverlay.querySelector('#modal-regenerate-btn');
    regenerateButton.addEventListener('click', () => {
      // Regenerate new recommendations with same preferences, excluding skipped locations
      if (this.onRegenerateInModal) {
        this.onRegenerateInModal(preferences, limit);
      }
    });
    
    // Clear all skipped button listener
    const clearAllButton = modalOverlay.querySelector('#clear-all-skipped');
    if (clearAllButton) {
      clearAllButton.addEventListener('click', () => {
        this.clearAllSkipped();
      });
    }
    
    // Confirm selection button listener
    const generateButton = modalOverlay.querySelector('#modal-generate-btn');
    generateButton.addEventListener('click', () => {
      if (this.selectedLocations.length > 0) {
        this.onRegenerateFromSelection();
      }
    });
    
    // Update generate button state based on selection
    this.updateGenerateButtonState();
  }

  updateGenerateButtonState() {
    const generateButton = document.querySelector('#modal-generate-btn');
    if (generateButton) {
      generateButton.disabled = this.selectedLocations.length === 0;
    }
  }

  hideLocationSelection() {
    // Remove modal overlay
    const modal = document.getElementById('location-selection-modal');
    if (modal) {
      modal.remove();
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Clear references
    this.modalOverlay = null;
    this.selectionContainer = null;
  }

  // Add visited checkboxes to existing results (DISABLED - now handled in modal)
  addVisitedCheckboxesToResults() {
    // This functionality has been moved to the modal exclusion panel
    // No longer adding "Not this time" checkboxes to final results
    return;
  }

  extractLocationIdFromCard(card) {
    // Use data attribute if available
    const locationId = card.getAttribute('data-location-id');
    if (locationId) {
      return locationId;
    }
    
    // Fallback: try to extract from name element
    const nameElement = card.querySelector('.location-card__name');
    if (nameElement) {
      const name = nameElement.textContent.trim();
      // Convert name to ID format (this is a simple approach)
      return name.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '_');
    }
    return null;
  }

  // Callback methods to be overridden by main app
  onRegenerateFromSelection() {
    console.log('Regenerate from selection requested');
  }

  onRegenerateWithoutVisited() {
    console.log('Regenerate without visited requested');
  }

  onRegenerateInModal() {
    console.log('Regenerate in modal requested');
  }

  /**
   * Update the exclusion panel in the modal
   */
  updateExclusionPanel() {
    const exclusionList = document.getElementById('exclusion-list');
    const exclusionCount = document.getElementById('exclusion-count');
    const clearAllButton = document.getElementById('clear-all-skipped');
    
    if (!exclusionList || !exclusionCount) return;
    
    const skippedCount = this.visitedLocations.size;
    exclusionCount.textContent = skippedCount;
    
    if (skippedCount === 0) {
      exclusionList.innerHTML = '<p class="exclusion-empty">No locations skipped yet</p>';
      if (clearAllButton) clearAllButton.style.display = 'none';
      return;
    }
    
    // Show clear all button
    if (clearAllButton) clearAllButton.style.display = 'block';
    
    // Get skipped location details
    const skippedLocations = Array.from(this.visitedLocations).map(locationId => {
      const location = this.allMatches.find(loc => loc.id === locationId);
      return location || { id: locationId, name: this.getLocationNameById(locationId) };
    });
    
    // Render skipped locations
    exclusionList.innerHTML = skippedLocations.map(location => `
      <div class="exclusion-item" data-location-id="${location.id}">
        <span class="exclusion-item-name">${location.name}</span>
        <button class="unskip-button" data-location-id="${location.id}" title="Add back">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    `).join('');
    
    // Attach unskip listeners
    const unskipButtons = exclusionList.querySelectorAll('.unskip-button');
    unskipButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const locationId = button.getAttribute('data-location-id');
        this.unskipLocation(locationId);
      });
    });
  }

  /**
   * Unskip a location (add it back)
   */
  unskipLocation(locationId) {
    // Remove from visited locations
    this.visitedLocations.delete(locationId);
    
    // Update the skip checkbox in the main list
    const skipCheckbox = document.getElementById(`skip-${locationId}`);
    if (skipCheckbox) {
      skipCheckbox.checked = false;
    }
    
    // Update visual state
    const option = document.querySelector(`[data-location-id="${locationId}"]`);
    if (option) {
      option.classList.remove('skipped');
    }
    
    // Update exclusion panel
    this.updateExclusionPanel();
  }

  /**
   * Clear all skipped locations
   */
  clearAllSkipped() {
    // Uncheck all skip checkboxes
    this.visitedLocations.forEach(locationId => {
      const skipCheckbox = document.getElementById(`skip-${locationId}`);
      if (skipCheckbox) {
        skipCheckbox.checked = false;
      }
      
      // Update visual state
      const option = document.querySelector(`[data-location-id="${locationId}"]`);
      if (option) {
        option.classList.remove('skipped');
      }
    });
    
    // Clear the set
    this.visitedLocations.clear();
    
    // Update exclusion panel
    this.updateExclusionPanel();
  }

  /**
   * Show exclusion management panel
   */
  showExclusionPanel() {

    // Remove any existing panel
    this.hideExclusionPanel();

    // Create panel
    const panel = document.createElement('div');
    panel.className = 'exclusion-panel';
    panel.innerHTML = this.renderExclusionPanelContent();

    // Insert into DOM
    const buttonContainer = document.querySelector('.regenerate-without-visited-container');
    buttonContainer.parentNode.insertBefore(panel, buttonContainer.nextSibling);

    // Attach listeners
    this.attachExclusionPanelListeners(panel);

    // Scroll to panel
    panel.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Render exclusion panel content
   */
  renderExclusionPanelContent() {
    const excludedLocations = Array.from(this.visitedLocations);
    
    if (excludedLocations.length === 0) {
      return `
        <div class="exclusion-panel-header">
          <h3>Manage Exclusions</h3>
          <button class="close-panel" id="close-exclusion-panel">×</button>
        </div>
        <div class="exclusion-panel-content">
          <p>No locations are currently excluded.</p>
        </div>
      `;
    }

    // Get location details for excluded locations
    const excludedLocationDetails = excludedLocations.map(locationId => {
      // Find location in original data (we'll need to pass this from main app)
      return {
        id: locationId,
        name: this.getLocationNameById(locationId) || locationId.replace(/_/g, ' ')
      };
    });

    return `
      <div class="exclusion-panel-header">
        <h3>Manage Exclusions</h3>
        <p>${excludedLocations.length} location${excludedLocations.length === 1 ? '' : 's'} excluded</p>
        <button class="close-panel" id="close-exclusion-panel">×</button>
      </div>
      <div class="exclusion-panel-content">
        <div class="excluded-locations-list">
          ${excludedLocationDetails.map(location => `
            <div class="excluded-location-item" data-location-id="${location.id}">
              <span class="excluded-location-name">${location.name}</span>
              <button class="include-back-button" data-location-id="${location.id}">
                Include Back
              </button>
            </div>
          `).join('')}
        </div>
        <div class="exclusion-panel-actions">
          <button class="clear-all-exclusions" id="clear-all-exclusions">
            Clear All Exclusions
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Attach event listeners to exclusion panel
   */
  attachExclusionPanelListeners(panel) {
    // Close panel button
    const closeButton = panel.querySelector('#close-exclusion-panel');
    closeButton.addEventListener('click', () => {
      this.hideExclusionPanel();
    });

    // Include back buttons
    const includeButtons = panel.querySelectorAll('.include-back-button');
    includeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const locationId = e.target.getAttribute('data-location-id');
        this.unmarkAsVisited(locationId);
        // Refresh panel content
        this.refreshExclusionPanel();
      });
    });

    // Clear all exclusions button
    const clearAllButton = panel.querySelector('#clear-all-exclusions');
    if (clearAllButton) {
      clearAllButton.addEventListener('click', () => {
        this.clearAllExclusions();
        this.hideExclusionPanel();
      });
    }
  }

  /**
   * Hide exclusion panel
   */
  hideExclusionPanel() {
    if (typeof document === 'undefined') return;
    
    const panel = document.querySelector('.exclusion-panel');
    if (panel) {
      panel.remove();
    }
  }

  /**
   * Refresh exclusion panel content
   */
  refreshExclusionPanel() {
    const panel = document.querySelector('.exclusion-panel');
    if (panel) {
      panel.innerHTML = this.renderExclusionPanelContent();
      this.attachExclusionPanelListeners(panel);
    }
  }

  /**
   * Clear all exclusions
   */
  clearAllExclusions() {
    // Remove all visited indicators
    this.visitedLocations.forEach(locationId => {
      this.removeVisitedIndicator(locationId);
    });
    
    // Clear the visited locations set
    this.visitedLocations.clear();
    
    // Hide regenerate button
    this.hideRegenerateWithoutVisitedButton();
  }

  /**
   * Get location name by ID (helper method)
   * This is a simple fallback - in a real implementation, 
   * you'd pass the locations data to this manager
   */
  getLocationNameById(locationId) {
    // Try to find the location name from existing DOM elements
    const locationCard = document.querySelector(`[data-location-id="${locationId}"] .location-card__name`);
    if (locationCard) {
      return locationCard.textContent.trim();
    }
    
    // Fallback: convert ID to readable name
    return locationId.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
}