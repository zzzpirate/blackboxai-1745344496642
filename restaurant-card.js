// Create restaurant card
const createRestaurantCard = (restaurant) => {
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1';
    
    // Calculate average price
    const avgPrice = restaurant.menu.reduce((sum, item) => sum + item.price, 0) / restaurant.menu.length;
    const priceRange = '₹'.repeat(Math.ceil(avgPrice / 10));
    
    // Get popular dishes
    const popularDishes = restaurant.menu.slice(0, 2).map(item => item.name).join(', ');
    
    card.innerHTML = `
        <div class="relative">
            <img src="${restaurant.image}" 
                 alt="${restaurant.name}" 
                 class="w-full h-48 object-cover"
                 onerror="this.src='${DEFAULT_IMAGE}'">
            <div class="absolute top-2 right-2 bg-white dark:bg-gray-800 px-2 py-1 rounded-lg shadow-md">
                <span class="text-yellow-500">★</span>
                <span class="text-gray-800 dark:text-white font-medium">${restaurant.rating}</span>
            </div>
            <div class="absolute top-2 left-2 ${restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'} text-white text-sm px-2 py-1 rounded-lg shadow-md">
                ${restaurant.isOpen ? 'Open Now' : 'Closed'}
            </div>
        </div>
        <div class="p-4">
            <h3 class="text-xl font-semibold dark:text-white mb-2">${restaurant.name}</h3>
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
            
            <div class="space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4">
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
                         class="w-16 h-16 object-cover rounded-lg"
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
                            `<span class="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full">${diet}</span>`
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
