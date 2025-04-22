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
