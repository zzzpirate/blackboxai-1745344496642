// Shared state
let cart = JSON.parse(localStorage.getItem('cart')) || {};
let darkMode = localStorage.getItem('darkMode') === 'true';
let activeDietFilters = new Set();
let activeCuisine = '';
let searchTerm = '';

// Default image
const DEFAULT_IMAGE = 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg';

// Show toast notification
const showToast = (message, type = 'success') => {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Add icon based on type
    let icon;
    switch(type) {
        case 'success':
            icon = 'check-circle';
            break;
        case 'error':
            icon = 'exclamation-circle';
            break;
        case 'info':
            icon = 'info-circle';
            break;
        default:
            icon = 'bell';
    }
    
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Remove toast after delay
    setTimeout(() => {
        toast.style.animation = 'toastExit 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Update cart count
const updateCartCount = () => {
    const count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = count;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
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
const showLoading = (container, count = 6) => {
    if (container) {
        container.innerHTML = Array(count).fill(createSkeletonLoader()).join('');
    }
};

// Format price
const formatPrice = (price) => `$${price.toFixed(2)}`;

// Calculate average price
const calculateAveragePrice = (menu) => {
    return menu.reduce((sum, item) => sum + item.price, 0) / menu.length;
};

// Get popular dishes
const getPopularDishes = (menu, count = 2) => {
    return menu.slice(0, count).map(item => item.name).join(', ');
};

// Update quantity with cart icon animation
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
            if (cartIcon) {
                cartIcon.classList.add('cart-pulse');
                setTimeout(() => cartIcon.classList.remove('cart-pulse'), 300);
            }
        } else {
            showToast(`Updated ${menuItem.name} quantity`, 'info');
        }
    }

    updateCartCount();
};
