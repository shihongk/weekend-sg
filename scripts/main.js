/**
 * weekend.sg - Main application entry point
 */

import { PreferenceManager } from './ui/preferences.js';
import { EnhancedRecommendationEngine } from './engine/enhanced-recommender.js';
import { RationaleGenerator } from './engine/rationale.js';
import { ResultsRenderer } from './ui/results.js';
import { LocationSelectionManager } from './ui/location-selection.js';
import { MapInteractions } from './ui/map-interactions.js';
import { locations } from './data/locations.js';
import { rationaleTemplates } from './data/templates.js';

console.log('weekend.sg loaded');

// Initialize managers
const preferenceManager = new PreferenceManager();
const locationSelectionManager = new LocationSelectionManager();
const recommendationEngine = new EnhancedRecommendationEngine(locations, locationSelectionManager);
const rationaleGenerator = new RationaleGenerator(rationaleTemplates);
let resultsRenderer;
let mapInteractions;

// Set up callbacks for location selection manager
locationSelectionManager.onRegenerateFromSelection = () => {
    const selectedLocations = locationSelectionManager.getSelectedLocations();
    const preferences = preferenceManager.getPreferences();
    
    if (selectedLocations.length === 0) {
        alert('Please select at least one location!');
        return;
    }
    
    // Generate itinerary from selection
    const itinerary = recommendationEngine.generateFromSelection(selectedLocations, preferences);
    const rationale = rationaleGenerator.generate(preferences, itinerary);
    
    // Hide selection interface and show results
    locationSelectionManager.hideLocationSelection();
    resultsRenderer.render(rationale, itinerary, preferences.duration);
    
    // Add visited checkboxes to new results
    setTimeout(() => {
        locationSelectionManager.addVisitedCheckboxesToResults();
    }, 100);
    
    // Scroll to results
    document.querySelector('.results-area').scrollIntoView({ behavior: 'smooth' });
};

locationSelectionManager.onRegenerateWithoutVisited = () => {
    // Regenerate with current preferences but excluding visited locations
    const preferences = preferenceManager.getPreferences();
    generateItinerary(preferences);
};

locationSelectionManager.onRegenerateInModal = (preferences, limit) => {
    // Regenerate new recommendations in the modal
    const result = recommendationEngine.generateEnhancedItinerary(preferences);
    if (result.type === 'selection_required') {
        // Modal will be refreshed automatically by the engine
    }
};

// Add empty class to results area for placeholder text
document.addEventListener('DOMContentLoaded', () => {
    const resultsArea = document.querySelector('.results-area');
    if (resultsArea) {
        resultsArea.classList.add('empty');
        resultsRenderer = new ResultsRenderer(resultsArea);
    }

    // Initialize map interactions
    mapInteractions = new MapInteractions(preferenceManager, locations);

    // Initialize all UI interactions
    initializeDurationSelector();
    initializeRegionSelector();
    initializeProfileSelector();
    initializeActivitySelector();
    initializeWeatherSelector();
    initializeGenerateButton();
});

// Duration Selector
function initializeDurationSelector() {
    const durationCards = document.querySelectorAll('.duration-card');
    durationCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected from all cards
            durationCards.forEach(c => c.removeAttribute('data-selected'));
            // Add selected to clicked card
            card.setAttribute('data-selected', 'true');
            // Update preference
            preferenceManager.setDuration(card.dataset.value);
        });
    });
}

// Region Selector
function initializeRegionSelector() {
    const regionChips = document.querySelectorAll('.region-selector .chip');
    regionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Toggle selected state
            const isSelected = chip.hasAttribute('data-selected');
            if (isSelected) {
                chip.removeAttribute('data-selected');
            } else {
                chip.setAttribute('data-selected', 'true');
            }
            // Update preference
            preferenceManager.toggleRegion(chip.dataset.value);
            
            // Sync with map
            if (mapInteractions) {
                mapInteractions.syncFromPreferencePanel();
            }
        });
    });
}

// Profile Selector
function initializeProfileSelector() {
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected from all cards
            profileCards.forEach(c => c.removeAttribute('data-selected'));
            // Add selected to clicked card
            card.setAttribute('data-selected', 'true');
            // Update preference
            preferenceManager.setProfile(card.dataset.value);
        });
    });
}

// Activity Selector (multi-select)
function initializeActivitySelector() {
    const activityChips = document.querySelectorAll('.activity-selector .chip');
    activityChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Toggle selected state
            const isSelected = chip.hasAttribute('data-selected');
            if (isSelected) {
                chip.removeAttribute('data-selected');
            } else {
                chip.setAttribute('data-selected', 'true');
            }
            // Update preference
            preferenceManager.toggleActivity(chip.dataset.value);
        });
    });
}

// Weather Selector
function initializeWeatherSelector() {
    const weatherOptions = document.querySelectorAll('.weather-selector .segmented-control__option');
    weatherOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected from all options
            weatherOptions.forEach(o => o.removeAttribute('data-selected'));
            // Add selected to clicked option
            option.setAttribute('data-selected', 'true');
            // Update preference
            preferenceManager.setWeather(option.dataset.value);
        });
    });
}

// Generate Button
function initializeGenerateButton() {
    const generateButton = document.getElementById('generate-button');
    generateButton.addEventListener('click', () => {
        if (!preferenceManager.isValid()) {
            alert('Please select a duration and who\'s going!');
            return;
        }
        
        const preferences = preferenceManager.getPreferences();
        generateItinerary(preferences);
    });
}

function generateItinerary(preferences) {
    console.log('Generating itinerary with preferences:', preferences);
    
    try {
        // Use enhanced recommendation engine
        const result = recommendationEngine.generateEnhancedItinerary(preferences);
        console.log('Generated result:', result);
        console.log('Result type:', result.type);
        
        // Handle different result types
        switch (result.type) {
            case 'selection_required':
                console.log('Selection required - showing modal selection interface');
                // Modal is already shown by the engine
                // No need to clear results area since modal is separate
                break;
                
            case 'standard':
                console.log('Standard result - showing itinerary');
                // Normal flow - show results and add visited checkboxes
                const rationale = rationaleGenerator.generate(preferences, result.itinerary);
                resultsRenderer.render(rationale, result.itinerary, preferences.duration);
                
                // Add visited checkboxes after rendering
                setTimeout(() => {
                    locationSelectionManager.addVisitedCheckboxesToResults();
                }, 100);
                
                // Scroll to results
                document.querySelector('.results-area').scrollIntoView({ behavior: 'smooth' });
                break;
                
            case 'no_matches':
                console.log('No matches found');
                // Show no results message with suggestions
                showNoResultsMessage(result.message, result.suggestions);
                break;
                
            case 'no_locations':
                console.log('No locations available');
                // All locations marked as visited
                showNoResultsMessage(result.message, ['Try unmarking some visited locations']);
                break;
                
            case 'error':
                console.log('Error occurred');
                showNoResultsMessage(result.message, []);
                break;
                
            default:
                console.error('Unknown result type:', result.type);
                showNoResultsMessage('An unexpected error occurred. Please try again.', []);
        }
    } catch (error) {
        console.error('Error in generateItinerary:', error);
        showNoResultsMessage('An error occurred while generating recommendations. Please try again.', []);
    }
}

function showNoResultsMessage(message, suggestions = []) {
    resultsRenderer.clear();
    
    const resultsArea = document.querySelector('.results-area');
    resultsArea.innerHTML = `
        <div class="no-results-message">
            <h3>No Locations Found</h3>
            <p>${message}</p>
            ${suggestions.length > 0 ? `
                <h4>Suggestions:</h4>
                <ul class="suggestions-list">
                    ${suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                </ul>
            ` : ''}
        </div>
    `;
    
    // Scroll to results
    resultsArea.scrollIntoView({ behavior: 'smooth' });
}

