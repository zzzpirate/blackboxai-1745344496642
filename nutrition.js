// Create nutritional breakdown card
const createNutritionalBreakdown = (item) => {
    return `
        <div class="nutrition-card transform scale-0 opacity-0 transition-all duration-300 absolute top-full left-0 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-[9999]">
            <div class="flex justify-between items-start mb-4">
                <h4 class="text-lg font-semibold dark:text-white">${item.name}</h4>
                <button class="close-nutrition text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <h5 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Nutrition Facts</h5>
                    <ul class="space-y-1 text-sm">
                        <li class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Calories:</span>
                            <span class="font-medium dark:text-white">${item.nutrition.calories} kcal</span>
                        </li>
                        <li class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Protein:</span>
                            <span class="font-medium dark:text-white">${item.nutrition.protein}g</span>
                        </li>
                        <li class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Carbs:</span>
                            <span class="font-medium dark:text-white">${item.nutrition.carbs}g</span>
                        </li>
                        <li class="flex justify-between">
                            <span class="text-gray-600 dark:text-gray-400">Fat:</span>
                            <span class="font-medium dark:text-white">${item.nutrition.fat}g</span>
                        </li>
                    </ul>
                </div>
                
                <div>
                    ${item.allergens ? `
                        <h5 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Allergens</h5>
                        <div class="flex flex-wrap gap-2">
                            ${item.allergens.map(allergen => 
                                `<span class="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-full text-xs">${allergen}</span>`
                            ).join('')}
                        </div>
                    ` : ''}
                    
                    ${item.dietTypes ? `
                        <h5 class="font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">Diet Types</h5>
                        <div class="flex flex-wrap gap-2">
                            ${item.dietTypes.map(diet => 
                                `<span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-xs">${diet}</span>`
                            ).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
};

// Toggle nutrition card
const toggleNutritionCard = (button, itemId) => {
    const card = button.nextElementSibling;
    const allCards = document.querySelectorAll('.nutrition-card');
    
    // Close all other cards
    allCards.forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove('scale-100', 'opacity-100');
            otherCard.classList.add('scale-0', 'opacity-0');
        }
    });
    
    // Toggle current card
    if (card.classList.contains('scale-0')) {
        card.classList.remove('scale-0', 'opacity-0');
        card.classList.add('scale-100', 'opacity-100');
    } else {
        card.classList.remove('scale-100', 'opacity-100');
        card.classList.add('scale-0', 'opacity-0');
    }
};
