// DOM Elements
const restaurantsList = document.getElementById('restaurants-list');
const searchInput = document.querySelector('input[type="text"]');
const darkModeToggle = document.getElementById('darkModeToggle');
const cartCount = document.getElementById('cartCount');

// State Management
let cart = JSON.parse(localStorage.getItem('cart')) || {};
let darkMode = localStorage.getItem('darkMode') === 'true';

// Initialize dark mode
if (darkMode) {
    document.body.classList.add('dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun text-xl"></i>';
}

// Update cart count
const updateCartCount = () => {
    const count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Show toast notification
const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

// Create restaurant card
const createRestaurantCard = (restaurant) => {
    const card = document.createElement('div');
    card.className = 'restaurant-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1';
    
    // Calculate average price from menu items
    const avgPrice = restaurant.menu.reduce((sum, item) => sum + item.price, 0) / restaurant.menu.length;
    const priceRange = '₹'.repeat(Math.ceil(avgPrice / 10));
    
    // Get popular dishes (first 2 menu items)
    const popularDishes = restaurant.menu.slice(0, 2).map(item => item.name).join(', ');
    
    // Calculate if restaurant is currently open (random for demo)
    const isOpen = Math.random() > 0.3;
    
    card.innerHTML = `
        <div class="relative group">
            <img src="${restaurant.image}" alt="${restaurant.name}" 
                 class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                 onerror="this.src='${DEFAULT_IMAGE}'">
            <div class="absolute top-2 right-2 bg-white dark:bg-gray-800 px-2 py-1 rounded-lg shadow-md flex items-center space-x-1">
                <span class="text-yellow-500">★</span>
                <span class="text-gray-800 dark:text-white font-medium">${restaurant.rating}</span>
            </div>
            ${isOpen ? `
                <div class="absolute top-2 left-2 bg-green-500 text-white text-sm px-2 py-1 rounded-lg shadow-md">
                    Open Now
                </div>
            ` : `
                <div class="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded-lg shadow-md">
                    Closed
                </div>
            `}
        </div>
        <div class="p-6">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-xl font-semibold dark:text-white mb-2">${restaurant.name}</h3>
                    <div class="flex items-center space-x-2 mb-2">
                        <span class="text-gray-600 dark:text-gray-300">${restaurant.cuisine}</span>
                        <span class="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                        <span class="text-gray-500 dark:text-gray-400">${restaurant.deliveryTime}</span>
                    </div>
                    <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>${priceRange}</span>
                        <span class="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                        <span>For Two</span>
                    </div>
                </div>
                <div class="flex flex-col items-end">
                    <div class="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full mb-2">
                        50% OFF
                    </div>
                    <div class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">
                        Free Delivery
                    </div>
                </div>
            </div>
            
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                <i class="fas fa-fire-alt text-orange-500 mr-2"></i>
                Popular: ${popularDishes}
            </div>
            
            <div class="space-y-6">
                <div class="border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div class="flex justify-between items-center mb-4">
                        <h4 class="text-lg font-semibold dark:text-white">Menu Items</h4>
                        <button class="text-red-500 hover:text-red-600 transition-colors text-sm font-medium">
                            View Full Menu
                        </button>
                    </div>
                    <div class="space-y-4">
                        ${restaurant.menu.map(item => createMenuItem(item)).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    return card;
};

// Create menu item
// Active diet filters
let activeDietFilters = new Set();

// Create nutrition tooltip content
const createNutritionTooltip = (item) => {
    if (!item.nutrition || !item.dietTypes || !item.allergens || !item.healthTags) {
        return '';
    }

    const { nutrition, dietTypes, allergens, healthTags } = item;

    return `
        <div class="nutrition-tooltip bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <h6 class="font-semibold mb-2 dark:text-white">Nutrition Facts</h6>
                    <ul class="space-y-1 text-sm dark:text-gray-300">
                        <li>Calories: ${nutrition.calories} kcal</li>
                        <li>Protein: ${nutrition.protein}g</li>
                        <li>Carbs: ${nutrition.carbs}g</li>
                        <li>Fat: ${nutrition.fat}g</li>
                        <li>Fiber: ${nutrition.fiber}g</li>
                    </ul>
                </div>
                <div>
                    ${dietTypes.length ? `
                        <h6 class="font-semibold mb-2 dark:text-white">Diet Types</h6>
                        <div class="flex flex-wrap gap-1">
                            ${dietTypes.map(diet => 
                                `<span class="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full">${diet}</span>`
                            ).join('')}
                        </div>
                    ` : ''}
                    
                    ${allergens.length ? `
                        <h6 class="font-semibold mt-3 mb-2 dark:text-white">Allergens</h6>
                        <div class="flex flex-wrap gap-1">
                            ${allergens.map(allergen => 
                                `<span class="text-xs px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-full">${allergen}</span>`
                            ).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
            ${healthTags.length ? `
                <div class="border-t dark:border-gray-700 pt-2 mt-2">
                    <div class="flex flex-wrap gap-1">
                        ${healthTags.map(tag => 
                            `<span class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">${tag}</span>`
                        ).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
};

const createMenuItem = (item) => {
    const itemId = `${item.id}`;
    const isInCart = cart[itemId] && cart[itemId].quantity > 0;
    
    return `
        <div class="menu-item flex justify-between items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all duration-300 relative group"
             data-diet-types='${JSON.stringify(item.dietTypes || [])}'>
            <div class="flex items-start space-x-4 w-full">
                <div class="relative w-24 h-24 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <img src="${item.image}" alt="${item.name}" 
                         class="w-full h-full object-cover rounded-lg shadow-sm"
                         onerror="this.src='${DEFAULT_IMAGE}'">
                    ${item.isVeg ? `
                        <div class="absolute top-1 left-1 bg-green-500 w-4 h-4 rounded-full flex items-center justify-center">
                            <div class="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    ` : `
                        <div class="absolute top-1 left-1 bg-red-500 w-4 h-4 rounded-full flex items-center justify-center">
                            <div class="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    `}
                    ${item.nutrition && item.nutrition.calories ? `
                        <div class="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                            ${item.nutrition.calories} cal
                        </div>
                    ` : ''}
                </div>
                <div class="flex-grow">
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="flex items-center space-x-2">
                                <h5 class="font-medium dark:text-white text-lg">${item.name}</h5>
                                ${item.healthTags && item.healthTags.includes('High Protein') ? `
                                    <span class="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full">High Protein</span>
                                ` : ''}
                            </div>
                            <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">${item.description}</p>
                            <div class="flex items-center space-x-2 mt-2">
                                <p class="text-red-500 font-semibold">$${item.price.toFixed(2)}</p>
                                ${item.dietTypes && item.dietTypes.map(diet => 
                                    `<span class="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full">${diet}</span>`
                                ).join('')}
                            </div>
                        </div>
                        <div class="quantity-controls ${isInCart ? 'bg-red-50 dark:bg-red-900' : 'bg-gray-100 dark:bg-gray-700'} rounded-lg p-1.5 transition-colors">
                            <button onclick="updateQuantity('${itemId}', ${cart[itemId] ? cart[itemId].quantity - 1 : 0})"
                                    class="quantity-btn flex items-center justify-center w-7 h-7 rounded-md ${isInCart ? 'text-red-500' : 'text-gray-400'} hover:text-white hover:bg-red-500 transition-colors">
                                <i class="fas fa-minus text-sm"></i>
                            </button>
                            <div class="w-7 h-7 flex items-center justify-center bg-white dark:bg-gray-800 rounded-md">
                                <span class="text-sm font-medium dark:text-white">
                                    ${cart[itemId] ? cart[itemId].quantity : '0'}
                                </span>
                            </div>
                            <button onclick="updateQuantity('${itemId}', ${cart[itemId] ? cart[itemId].quantity + 1 : 1})"
                                    class="quantity-btn flex items-center justify-center w-7 h-7 rounded-md text-red-500 hover:text-white hover:bg-red-500 transition-colors">
                                <i class="fas fa-plus text-sm"></i>
                            </button>
                        </div>
                    </div>
                    
                    ${item.allergens && item.allergens.length > 0 ? `
                        <div class="mt-2">
                            <span class="text-xs text-gray-500 dark:text-gray-400">
                                <i class="fas fa-exclamation-circle mr-1"></i>
                                Contains: ${item.allergens.join(', ')}
                            </span>
                        </div>
                    ` : ''}
                    
                    <!-- Nutrition Tooltip -->
                    <div class="nutrition-tooltip opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute left-1/2 -translate-x-1/2 top-full mt-2 z-[200] w-[400px] transition-all duration-200 transform">
                        ${createNutritionTooltip(item)}
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Update item quantity in cart
const updateQuantity = (itemId, quantity) => {
    const restaurant = restaurants.find(r => r.menu.some(item => item.id === itemId));
    const menuItem = restaurant.menu.find(item => item.id === itemId);

    if (quantity <= 0) {
        delete cart[itemId];
        showToast(`Removed ${menuItem.name} from cart`);
    } else {
        cart[itemId] = {
            name: menuItem.name,
            price: menuItem.price,
            quantity: quantity,
            restaurantName: restaurant.name
        };
        showToast(`Updated ${menuItem.name} quantity to ${quantity}`);
    }

    updateCartCount();
    renderRestaurants(restaurants); // Re-render to update quantity controls
};

// Filter restaurants and menu items
const filterContent = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    const filtered = restaurants.filter(restaurant => {
        // First check if restaurant matches search term
        const matchesRestaurant = restaurant.name.toLowerCase().includes(term) ||
                                restaurant.cuisine.toLowerCase().includes(term);
        
        // Then check if any menu items match search term
        const matchesMenuItem = restaurant.menu.some(item => {
            const textMatch = item.name.toLowerCase().includes(term) ||
                            item.description.toLowerCase().includes(term);
            
            // Check if item matches active diet filters
            const matchesDietFilters = activeDietFilters.size === 0 || 
                                     (item.dietTypes && item.dietTypes.some(diet => activeDietFilters.has(diet)));
            
            return textMatch && matchesDietFilters;
        });

        return matchesRestaurant || matchesMenuItem;
    });
    renderRestaurants(filtered);
};

// Handle diet filter clicks
const handleDietFilter = (dietType) => {
    const button = document.querySelector(`[data-diet="${dietType}"]`);
    
    if (activeDietFilters.has(dietType)) {
        activeDietFilters.delete(dietType);
        button.classList.remove('bg-red-500', 'text-white');
        button.classList.add('border-gray-300', 'dark:border-gray-600');
    } else {
        activeDietFilters.add(dietType);
        button.classList.add('bg-red-500', 'text-white');
        button.classList.remove('border-gray-300', 'dark:border-gray-600');
    }
    
    // Update all diet filter buttons' appearance
    document.querySelectorAll('.diet-filter').forEach(btn => {
        const diet = btn.dataset.diet;
        if (activeDietFilters.has(diet)) {
            btn.classList.add('bg-red-500', 'text-white');
            btn.classList.remove('border-gray-300', 'dark:border-gray-600');
        } else {
            btn.classList.remove('bg-red-500', 'text-white');
            btn.classList.add('border-gray-300', 'dark:border-gray-600');
        }
    });
    
    // Refilter with current search term and diet filters
    filterContent(searchInput.value);
};

// Create skeleton loading template
const createSkeletonLoader = () => {
    return `
        <div class="skeleton-restaurant skeleton">
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
                <div class="skeleton-text title"></div>
                <div class="skeleton-text medium"></div>
                <div class="skeleton-text short"></div>
            </div>
        </div>
    `;
};

// Show loading state
const showLoading = () => {
    restaurantsList.innerHTML = Array(6).fill(createSkeletonLoader()).join('');
};

// Render restaurants with loading and animation
const renderRestaurants = (restaurantsToRender) => {
    // Show loading state first
    showLoading();
    
    // Simulate loading delay
    setTimeout(() => {
        restaurantsList.innerHTML = '';
        restaurantsToRender.forEach((restaurant, index) => {
            const card = createRestaurantCard(restaurant);
            card.classList.add('fade-in');
            card.style.animationDelay = `${index * 0.1}s`;
            restaurantsList.appendChild(card);
        });
    }, 800);
};

// Add smooth scroll behavior
document.documentElement.classList.add('smooth-scroll');

// Sorting function
const sortRestaurants = (restaurants, sortOption) => {
    const sortedRestaurants = [...restaurants];
    
    switch (sortOption) {
        case 'rating':
            sortedRestaurants.sort((a, b) => b.rating - a.rating);
            break;
        case 'deliveryTime':
            sortedRestaurants.sort((a, b) => {
                const timeA = parseInt(a.deliveryTime.split('-')[0]);
                const timeB = parseInt(b.deliveryTime.split('-')[0]);
                return timeA - timeB;
            });
            break;
        case 'priceHighToLow':
            sortedRestaurants.sort((a, b) => {
                const avgPriceA = a.menu.reduce((sum, item) => sum + item.price, 0) / a.menu.length;
                const avgPriceB = b.menu.reduce((sum, item) => sum + item.price, 0) / b.menu.length;
                return avgPriceB - avgPriceA;
            });
            break;
        case 'priceLowToHigh':
            sortedRestaurants.sort((a, b) => {
                const avgPriceA = a.menu.reduce((sum, item) => sum + item.price, 0) / a.menu.length;
                const avgPriceB = b.menu.reduce((sum, item) => sum + item.price, 0) / b.menu.length;
                return avgPriceA - avgPriceB;
            });
            break;
    }
    
    return sortedRestaurants;
};

// Event Listeners
searchInput.addEventListener('input', (e) => filterContent(e.target.value));

// Add event listeners to diet filter buttons
document.querySelectorAll('.diet-filter').forEach(button => {
    button.addEventListener('click', () => handleDietFilter(button.dataset.diet));
});

// Add event listener for sort option
document.getElementById('sortOption').addEventListener('change', (e) => {
    const sortedRestaurants = sortRestaurants(restaurants, e.target.value);
    renderRestaurants(sortedRestaurants);
});

darkModeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', darkMode);
    darkModeToggle.innerHTML = darkMode ? 
        '<i class="fas fa-sun text-xl"></i>' : 
        '<i class="fas fa-moon text-xl"></i>';
});

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderRestaurants(restaurants);
    updateCartCount();
});

// Handle image errors
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.src = DEFAULT_IMAGE;
    }
}, true);
