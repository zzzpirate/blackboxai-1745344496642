// DOM Elements
const restaurantsList = document.getElementById('restaurants-list');
const cartCount = document.getElementById('cartCount');

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Update cart count
const updateCartCount = () => {
    const count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Create restaurant card
const createRestaurantCard = (restaurant) => {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    
    // Calculate average price
    const avgPrice = restaurant.menu.reduce((sum, item) => sum + item.price, 0) / restaurant.menu.length;
    const priceRange = '₹'.repeat(Math.ceil(avgPrice / 10));
    
    // Get popular dishes
    const popularDishes = restaurant.menu.slice(0, 2).map(item => item.name).join(', ');
    
    card.innerHTML = `
        <div class="relative">
            <img src="${restaurant.image}" 
                 alt="${restaurant.name}" 
                 class="restaurant-image"
                 onerror="this.src='${DEFAULT_IMAGE}'">
            <div class="absolute top-2 right-2 bg-white dark:bg-gray-800 px-2 py-1 rounded-lg shadow-md">
                <span class="text-yellow-500">★</span>
                <span class="text-gray-800 dark:text-white font-medium">${restaurant.rating}</span>
            </div>
            <div class="absolute top-2 left-2 ${restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'} text-white text-sm px-2 py-1 rounded-lg shadow-md">
                ${restaurant.isOpen ? 'Open Now' : 'Closed'}
            </div>
        </div>
        <div class="restaurant-info">
            <h3 class="text-xl font-semibold mb-2">${restaurant.name}</h3>
            <div class="flex items-center space-x-2 mb-2">
                <span class="text-gray-600 dark:text-gray-300">${restaurant.cuisine}</span>
                <span class="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                <span class="text-gray-500 dark:text-gray-400">${restaurant.deliveryTime}</span>
            </div>
            <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>${priceRange}</span>
                <span class="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                <span>For Two</span>
            </div>
            
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                <i class="fas fa-fire-alt text-orange-500 mr-2"></i>
                Popular: ${popularDishes}
            </div>
            
            <div class="space-y-4">
                ${restaurant.menu.map(item => createMenuItem(item)).join('')}
            </div>
        </div>
    `;
    return card;
};

// Create menu item
const createMenuItem = (item) => {
    const itemId = item.id;
    const quantity = cart[itemId]?.quantity || 0;
    
    return `
        <div class="menu-item group">
            <div class="flex items-center space-x-4">
                <div class="relative">
                    <img src="${item.image}" alt="${item.name}" 
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
                </div>
                <div class="flex-grow">
                    <h4 class="font-medium dark:text-white">${item.name}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-300">${item.description}</p>
                    <div class="flex items-center space-x-2 mt-2">
                        <p class="text-red-500 font-medium">$${item.price.toFixed(2)}</p>
                        ${item.dietTypes ? item.dietTypes.map(diet => 
                            `<span class="diet-type-tag bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100">${diet}</span>`
                        ).join('') : ''}
                    </div>
                </div>
                
                <div class="quantity-controls">
                    <button onclick="updateQuantity('${itemId}', ${quantity - 1})"
                            class="quantity-btn ${quantity === 0 ? 'text-gray-400' : ''}"
                            ${quantity === 0 ? 'disabled' : ''}>
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="w-8 text-center font-medium dark:text-white">${quantity}</span>
                    <button onclick="updateQuantity('${itemId}', ${quantity + 1})"
                            class="quantity-btn">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            
            ${item.nutrition ? `
                <div class="nutrition-tooltip">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <h6 class="font-semibold mb-2">Nutrition Facts</h6>
                            <ul class="space-y-1 text-sm">
                                <li>Calories: ${item.nutrition.calories} kcal</li>
                                <li>Protein: ${item.nutrition.protein}g</li>
                                <li>Carbs: ${item.nutrition.carbs}g</li>
                                <li>Fat: ${item.nutrition.fat}g</li>
                            </ul>
                        </div>
                        ${item.allergens ? `
                            <div>
                                <h6 class="font-semibold mb-2">Allergens</h6>
                                <div class="flex flex-wrap gap-1">
                                    ${item.allergens.map(allergen => 
                                        `<span class="text-xs px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-full">${allergen}</span>`
                                    ).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
};

// Show toast notification
const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    // Remove after delay
    setTimeout(() => {
        toast.style.animation = 'toastExit 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Update quantity with animations
const updateQuantity = (itemId, quantity) => {
    const restaurant = restaurants.find(r => r.menu.some(item => item.id === itemId));
    const menuItem = restaurant.menu.find(item => item.id === itemId);
    const prevQuantity = cart[itemId]?.quantity || 0;

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

        // Show appropriate message
        if (quantity > prevQuantity) {
            showToast(`Added ${menuItem.name} to cart`);
            // Animate cart icon
            const cartIcon = document.querySelector('.fa-shopping-cart');
            cartIcon.classList.add('scale-125');
            setTimeout(() => cartIcon.classList.remove('scale-125'), 200);
        } else {
            showToast(`Updated ${menuItem.name} quantity`);
        }
    }

    updateCartCount();
    renderRestaurants(restaurants);
};

// Create skeleton loader
const createSkeletonLoader = () => {
    return `
        <div class="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div class="h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div class="p-4 space-y-4">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div class="space-y-3">
                    <div class="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div class="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        </div>
    `;
};

// Show loading state
const showLoading = () => {
    restaurantsList.innerHTML = Array(6).fill(createSkeletonLoader()).join('');
};

// Render restaurants with loading and animations
const renderRestaurants = (restaurantsToRender) => {
    showLoading();
    
    setTimeout(() => {
        restaurantsList.innerHTML = '';
        restaurantsToRender.forEach((restaurant, index) => {
            const card = createRestaurantCard(restaurant);
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            restaurantsList.appendChild(card);
            
            // Trigger animation
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 800);
};

// Filter state
let activeDietFilters = new Set();
let activeCuisine = '';
let searchTerm = '';

// Filter restaurants based on all criteria
const filterRestaurants = () => {
    return restaurants.filter(restaurant => {
        // Check cuisine filter
        if (activeCuisine && restaurant.cuisine.toLowerCase() !== activeCuisine.toLowerCase()) {
            return false;
        }

        // Check search term
        const matchesSearch = !searchTerm || 
            restaurant.name.toLowerCase().includes(searchTerm) ||
            restaurant.cuisine.toLowerCase().includes(searchTerm) ||
            restaurant.menu.some(item => 
                item.name.toLowerCase().includes(searchTerm) || 
                item.description.toLowerCase().includes(searchTerm)
            );

        if (!matchesSearch) return false;

        // Check diet filters
        if (activeDietFilters.size > 0) {
            return restaurant.menu.some(item => 
                item.dietTypes && item.dietTypes.some(diet => 
                    activeDietFilters.has(diet.toLowerCase())
                )
            );
        }

        return true;
    });
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

    renderRestaurants(filterRestaurants());
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize dark mode
    const darkModeToggle = document.getElementById('darkModeToggle');
    const searchInput = document.querySelector('input[type="text"]');
    
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun text-xl"></i>';
    }

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('darkMode', isDark);
        darkModeToggle.innerHTML = isDark ? 
            '<i class="fas fa-sun text-xl"></i>' : 
            '<i class="fas fa-moon text-xl"></i>';
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderRestaurants(filterRestaurants());
    });

    // Initialize cuisine filter buttons
    document.querySelectorAll('.cuisine-card').forEach(button => {
        button.addEventListener('click', () => {
            const cuisine = button.dataset.cuisine;
            
            // Toggle cuisine filter
            if (activeCuisine === cuisine) {
                activeCuisine = '';
                button.querySelector('div').classList.remove('bg-red-200', 'dark:bg-red-900');
                button.classList.remove('scale-110');
            } else {
                activeCuisine = cuisine;
                // Update active state
                document.querySelectorAll('.cuisine-card').forEach(btn => {
                    btn.querySelector('div').classList.remove('bg-red-200', 'dark:bg-red-900');
                    btn.classList.remove('scale-110');
                });
                button.querySelector('div').classList.add('bg-red-200', 'dark:bg-red-900');
                button.classList.add('scale-110');
            }
            
            renderRestaurants(filterRestaurants());
        });
    });

    // Initialize diet filter buttons
    document.querySelectorAll('.diet-filter').forEach(button => {
        button.addEventListener('click', () => handleDietFilter(button.dataset.diet));
    });

    // Initialize sort options
    document.getElementById('sortOption').addEventListener('change', (e) => {
        const sortedRestaurants = [...filterRestaurants()];
        switch (e.target.value) {
            case 'rating':
                sortedRestaurants.sort((a, b) => b.rating - a.rating);
                break;
            case 'deliveryTime':
                sortedRestaurants.sort((a, b) => {
                    const timeA = parseInt(a.deliveryTime);
                    const timeB = parseInt(b.deliveryTime);
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
        renderRestaurants(sortedRestaurants);
    });

    renderRestaurants(restaurants);
    updateCartCount();
});
