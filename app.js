// DOM Elements
const restaurantsList = document.getElementById('restaurants-list');
const cartCount = document.getElementById('cartCount');
const searchInput = document.querySelector('input[type="text"]');
const darkModeToggle = document.getElementById('darkModeToggle');

// State Management
let cart = JSON.parse(localStorage.getItem('cart')) || {};
let activeDietFilters = new Set();
let activeCuisine = '';
let searchTerm = '';

// Update cart count
const updateCartCount = () => {
    const count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
    localStorage.setItem('cart', JSON.stringify(cart));
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

    setTimeout(() => {
        toast.style.animation = 'toastExit 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

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

// Update quantity
const updateQuantity = (itemId, quantity) => {
    const cartIcon = document.querySelector('.fa-shopping-cart');
    const restaurant = restaurants.find(r => r.menu.some(item => item.id === itemId));
    const menuItem = restaurant.menu.find(item => item.id === itemId);
    const prevQuantity = cart[itemId]?.quantity || 0;

    if (quantity <= 0) {
        delete cart[itemId];
        showToast(`Removed ${menuItem.name} from cart`, 'info');
    } else {
        cart[itemId] = {
            name: menuItem.name,
            price: menuItem.price,
            quantity: quantity,
            restaurantName: restaurant.name
        };

        if (quantity > prevQuantity) {
            showToast(`Added ${menuItem.name} to cart`, 'success');
            cartIcon.classList.add('cart-pulse');
            setTimeout(() => cartIcon.classList.remove('cart-pulse'), 300);
        } else {
            showToast(`Updated ${menuItem.name} quantity`, 'info');
        }
    }

    updateCartCount();
    renderRestaurants(filterRestaurants());
};

</replace_in_file>
