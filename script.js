// Restaurant Data
const restaurants = [
    {
        id: 1,
        name: "Cedele Wheelock Place",
        website: "https://www.cedelegroup.com",
        cuisine: "western",
        location: "central",
        rating: 4.0,
        price: "$$",
        noise: "moderate",
        lighting: "bright",
        smell: "moderate",
        temperature: "cool"
    },
    {
        id: 2,
        name: "The Masses Singapore",
        website: "https://www.themasses.sg",
        cuisine: "western",
        location: "central",
        rating: 4.5,
        price: "$$",
        noise: "moderate",
        lighting: "dim",
        smell: "subtle",
        temperature: "moderate"
    },
    {
        id: 3,
        name: "Sushi Tei Paragon",
        website: "https://www.sushitei.com",
        cuisine: "asian",
        location: "central",
        rating: 4.0,
        price: "$$",
        noise: "moderate",
        lighting: "moderate",
        smell: "subtle",
        temperature: "cool"
    },
    {
        id: 4,
        name: "La Saigon",
        website: "https://lasaigon.sg",
        cuisine: "asian",
        location: "east",
        rating: 4.5,
        price: "$$",
        noise: "moderate",
        lighting: "bright",
        smell: "moderate",
        temperature: "moderate"
    },
    {
        id: 5,
        name: "Grids Coffee Bar",
        website: "https://gridscoffee.com",
        cuisine: "western",
        location: "central",
        rating: 4.5,
        price: "$$",
        noise: "quiet",
        lighting: "bright",
        smell: "moderate",
        temperature: "cool"
    },
    {
        id: 6,
        name: "W39 Bistro & Bakery",
        website: "https://w39bistro.com",
        cuisine: "western",
        location: "west",
        rating: 4.0,
        price: "$$",
        noise: "moderate",
        lighting: "bright",
        smell: "moderate",
        temperature: "moderate"
    },
    {
        id: 7,
        name: "Florette",
        website: "https://florette.sg",
        cuisine: "western",
        location: "central",
        rating: 4.5,
        price: "$$$",
        noise: "quiet",
        lighting: "bright",
        smell: "subtle",
        temperature: "moderate"
    },
    {
        id: 8,
        name: "Cassia Restaurant",
        website: "https://www.capellahotels.com/singapore/dining/cassia",
        cuisine: "asian",
        location: "south",
        rating: 4.5,
        price: "$$$$",
        noise: "quiet",
        lighting: "dim",
        smell: "subtle",
        temperature: "cool"
    },
    {
        id: 9,
        name: "Gardenasia",
        website: "https://www.gardenasia.com",
        cuisine: "western",
        location: "north",
        rating: 4.0,
        price: "$$",
        noise: "quiet",
        lighting: "bright",
        smell: "subtle",
        temperature: "moderate"
    },
    {
        id: 10,
        name: "Thevar",
        website: "https://thevar.sg",
        cuisine: "other",
        location: "central",
        rating: 4.5,
        price: "$$$$",
        noise: "moderate",
        lighting: "dim",
        smell: "moderate",
        temperature: "moderate"
    },
    {
        id: 11,
        name: "Mother Earth",
        website: "https://motherearth.com.sg",
        cuisine: "other",
        location: "east",
        rating: 4.0,
        price: "$$",
        noise: "quiet",
        lighting: "bright",
        smell: "subtle",
        temperature: "moderate"
    },
    {
        id: 12,
        name: "Woody Family Cafe",
        website: "https://woodysfamilycafe.com",
        cuisine: "other",
        location: "north",
        rating: 4.0,
        price: "$$",
        noise: "quiet",
        lighting: "bright",
        smell: "subtle",
        temperature: "moderate"
    }
];

// Global Variables
let searchInitiated = false;
const searchInput = document.getElementById('searchInput');
const limitResultsToggle = document.getElementById('limitResults');

// Filter Elements
const filters = {
    search: searchInput,
    cuisine: document.querySelectorAll('input[name="cuisine"]'),
    location: document.querySelectorAll('input[name="location"]'),
    rating: document.querySelectorAll('input[name="rating"]'),
    price: document.querySelectorAll('input[name="price"]'),
    noise: document.querySelectorAll('input[name="noise"]'),
    lighting: document.querySelectorAll('input[name="lighting"]'),
    smell: document.querySelectorAll('input[name="smell"]'),
    temperature: document.querySelectorAll('input[name="temperature"]')
};

// Setup Filter Dropdowns
function setupFilterDropdowns() {
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-section')) {
            document.querySelectorAll('.filter-section.active').forEach(section => {
                section.classList.remove('active');
            });
        }
    });

    // Toggle dropdown on header or toggle button click
    document.querySelectorAll('.filter-header, .dropdown-toggle').forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            const filterSection = element.closest('.filter-section');
            
            // Close other dropdowns
            document.querySelectorAll('.filter-section.active').forEach(section => {
                if (section !== filterSection) {
                    section.classList.remove('active');
                }
            });
            
            filterSection.classList.toggle('active');
        });
    });

    // Prevent dropdown from closing when clicking inside
    document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Select all functionality
    document.querySelectorAll('.select-all-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const filterSection = button.closest('.filter-section');
            const filterType = filterSection.dataset.filter;
            const checkboxes = filterSection.querySelectorAll(`input[name="${filterType}"]`);
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            
            checkboxes.forEach(checkbox => {
                checkbox.checked = !allChecked;
            });
            
            updateActiveFilters(filterSection, checkboxes);
            searchInitiated = true;
            filterRestaurants();
        });
    });
}

// Setup Filter Group Listeners
function setupFilterGroupListeners() {
    // Search input listener
    filters.search.addEventListener('input', () => {
        searchInitiated = true;
        filterRestaurants();
    });

    // Checkbox listeners
    Object.entries(filters).forEach(([key, filterGroup]) => {
        if (NodeList.prototype.isPrototypeOf(filterGroup)) {
            filterGroup.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    const filterSection = checkbox.closest('.filter-section');
                    updateActiveFilters(filterSection, filterGroup);
                    searchInitiated = true;
                    filterRestaurants();
                });
            });
        }
    });
}

// Filter Restaurants
function filterRestaurants() {
    let filteredRestaurants = [...restaurants];

    // Text search
    const searchText = filters.search.value.toLowerCase().trim();
    if (searchText) {
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
            restaurant.name.toLowerCase().includes(searchText) ||
            restaurant.cuisine.toLowerCase().includes(searchText) ||
            restaurant.location.toLowerCase().includes(searchText)
        );
    }

    // Filter by selected options (AND between different filter types, OR within same filter type)
    Object.entries(filters).forEach(([key, filterGroup]) => {
        if (NodeList.prototype.isPrototypeOf(filterGroup)) {
            const selectedValues = Array.from(filterGroup)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

            // Skip filtering if all options are selected or none are selected
            const allOptionsCount = filterGroup.length;
            if (selectedValues.length > 0 && selectedValues.length < allOptionsCount) {
                if (key === 'rating') {
                    // For rating, use the highest selected value
                    const highestRating = Math.max(...selectedValues.map(v => parseFloat(v)));
                    filteredRestaurants = filteredRestaurants.filter(restaurant => 
                        restaurant.rating >= highestRating
                    );
                } else {
                    // For other filters, use OR logic within the same filter type
                    filteredRestaurants = filteredRestaurants.filter(restaurant =>
                        selectedValues.includes(restaurant[key])
                    );
                }
            }
        }
    });

    // Sort by rating
    filteredRestaurants.sort((a, b) => b.rating - a.rating);

    // Limit results if toggle is checked
    if (limitResultsToggle.checked) {
        filteredRestaurants = filteredRestaurants.slice(0, 3);
    }

    // Display results
    displayResults(searchInitiated ? filteredRestaurants : []);
}

// Update Active Filters Display
function updateActiveFilters(filterSection, filterGroup) {
    const activeFiltersDiv = filterSection.querySelector('.active-filters');
    if (!activeFiltersDiv) return;

    const checkedFilters = Array.from(filterGroup)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.nextElementSibling.textContent.trim());

    activeFiltersDiv.innerHTML = checkedFilters
        .map(filter => `<span class="active-filter">${filter}</span>`)
        .join('');
}

// Display Results
function displayResults(filteredRestaurants) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (!searchInitiated) {
        resultsContainer.innerHTML = `
            <div class="initial-state">
                <i class="fa-solid fa-magnifying-glass search-icon"></i>
                <p>Start searching by entering text or selecting filters</p>
            </div>
        `;
        return;
    }

    if (filteredRestaurants.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fa-solid fa-circle-exclamation"></i>
                <p>No restaurants match your criteria</p>
                <button onclick="resetFilters()" class="reset-button">Reset Filters</button>
            </div>
        `;
        return;
    }

    // Add results count
    const resultsCount = document.createElement('div');
    resultsCount.className = 'results-count';
    resultsCount.textContent = limitResultsToggle.checked 
        ? `Showing top ${Math.min(3, filteredRestaurants.length)} of ${filteredRestaurants.length} matches`
        : `Found ${filteredRestaurants.length} matches`;
    resultsContainer.appendChild(resultsCount);

    // Create results grid
    const resultsGrid = document.createElement('div');
    resultsGrid.className = 'results-grid';
    
    filteredRestaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.innerHTML = `
            <div class="restaurant-info">
                <h3 class="restaurant-name">${restaurant.name}</h3>
                <a href="${restaurant.website}" target="_blank" rel="noopener noreferrer" class="website-link">
                    <i class="fa-solid fa-globe"></i> Visit Website
                </a>
                <div class="restaurant-details">
                    <p><i class="fa-solid fa-bowl-food"></i> ${restaurant.cuisine.charAt(0).toUpperCase() + restaurant.cuisine.slice(1)}</p>
                    <p><i class="fa-solid fa-location-dot"></i> ${restaurant.location.charAt(0).toUpperCase() + restaurant.location.slice(1)}</p>
                    <p><i class="fa-solid fa-dollar-sign"></i> ${restaurant.price}</p>
                    <p><i class="fa-solid fa-star"></i> ${restaurant.rating.toFixed(1)}</p>
                </div>
                <div class="environment-info">
                    <span><i class="fa-solid fa-volume-high"></i> ${restaurant.noise}</span>
                    <span><i class="fa-solid fa-lightbulb"></i> ${restaurant.lighting}</span>
                    <span><i class="fa-solid fa-wind"></i> ${restaurant.smell}</span>
                    <span><i class="fa-solid fa-temperature-half"></i> ${restaurant.temperature}</span>
                </div>
            </div>
        `;
        resultsGrid.appendChild(card);
    });

    resultsContainer.appendChild(resultsGrid);
}

// Reset Filters
function resetFilters() {
    // Reset text search
    filters.search.value = '';
    
    // Reset all checkboxes
    Object.values(filters).forEach(filterGroup => {
        if (NodeList.prototype.isPrototypeOf(filterGroup)) {
            filterGroup.forEach(checkbox => checkbox.checked = false);
        }
    });
    
    // Reset all active filters displays
    document.querySelectorAll('.filter-section').forEach(section => {
        const filterGroup = filters[section.dataset.filter];
        if (filterGroup) {
            updateActiveFilters(section, filterGroup);
        }
    });
    
    // Reset limit results toggle
    limitResultsToggle.checked = false;
    
    // Reset search initiated flag
    searchInitiated = false;
    
    // Update display
    filterRestaurants();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupFilterDropdowns();
    setupFilterGroupListeners();
    displayResults([]);
});

// Add event listener for limit results toggle
limitResultsToggle.addEventListener('change', filterRestaurants);