// DOM Elements
const cartItemsContainer = document.getElementById('cartItems');
const cartSummary = document.getElementById('cartSummary');
const emptyCartMessage = document.getElementById('emptyCart');
const checkoutModal = document.getElementById('checkoutModal');
const darkModeToggle = document.getElementById('darkModeToggle');

// Price Elements
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const deliveryFeeElement = document.getElementById('deliveryFee');

// Constants
const TAX_RATE = 0.08;
const DELIVERY_FEE = 2.99;

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Initialize dark mode
let darkMode = localStorage.getItem('darkMode') === 'true';
if (darkMode) {
    document.body.classList.add('dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun text-xl"></i>';
}

// Create cart item element with enhanced UI
const createCartItem = (itemId, itemData) => {
    const div = document.createElement('div');
    div.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center justify-between cart-animation transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1';
    div.setAttribute('data-item-id', itemId);
    
    const itemTotal = itemData.price * itemData.quantity;
    
    div.innerHTML = `
        <div class="flex items-center space-x-6 flex-1">
            <div class="relative">
                <div class="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img src="${DEFAULT_IMAGE}" alt="${itemData.name}" class="w-full h-full object-cover">
                </div>
                <div class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    ${itemData.quantity}
                </div>
            </div>
            <div class="flex-1">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h3 class="font-medium dark:text-white text-lg">${itemData.name}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-300">
                            <i class="fas fa-store text-gray-400 mr-2"></i>${itemData.restaurantName}
                        </p>
                    </div>
                    <div class="text-right">
                        <p class="text-red-500 font-semibold text-lg">$${itemTotal.toFixed(2)}</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">$${itemData.price.toFixed(2)} each</p>
                    </div>
                </div>
                <div class="flex items-center justify-between mt-4">
                    <div class="quantity-controls inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                        <button onclick="updateQuantity('${itemId}', ${itemData.quantity - 1})"
                                class="quantity-btn flex items-center justify-center w-8 h-8 rounded-md text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="text-lg font-medium w-8 text-center dark:text-white">${itemData.quantity}</span>
                        <button onclick="updateQuantity('${itemId}', ${itemData.quantity + 1})"
                                class="quantity-btn flex items-center justify-center w-8 h-8 rounded-md text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button onclick="removeItem('${itemId}')"
                            class="text-gray-500 hover:text-red-500 transition-colors flex items-center">
                        <i class="fas fa-trash mr-2"></i>
                        <span>Remove</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return div;
};

// Create skeleton loader for cart items
const createCartSkeletonLoader = () => {
    return `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 animate-pulse">
            <div class="flex items-center space-x-6">
                <div class="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div class="flex-1 space-y-4">
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div class="flex justify-between">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Show loading state
const showCartLoading = () => {
    cartItemsContainer.innerHTML = Array(3).fill(createCartSkeletonLoader()).join('');
    cartSummary.classList.add('opacity-50');
};

// Update cart summary with animation
const updateCartSummary = () => {
    const subtotal = Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + DELIVERY_FEE;

    // Animate the numbers changing
    const animateValue = (element, start, end, duration) => {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const animate = () => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                element.textContent = `$${end.toFixed(2)}`;
            } else {
                element.textContent = `$${current.toFixed(2)}`;
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    };

    const currentSubtotal = parseFloat(subtotalElement.textContent.replace('$', '')) || 0;
    const currentTax = parseFloat(taxElement.textContent.replace('$', '')) || 0;
    const currentTotal = parseFloat(totalElement.textContent.replace('$', '')) || 0;

    animateValue(subtotalElement, currentSubtotal, subtotal, 300);
    animateValue(taxElement, currentTax, tax, 300);
    animateValue(totalElement, currentTotal, total, 300);
    
    // Enable/disable checkout button with animation
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (subtotal === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
};

// Update item quantity with animation
const updateQuantity = (itemId, quantity) => {
    const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);
    
    if (quantity <= 0) {
        if (itemElement) {
            itemElement.classList.add('scale-95', 'opacity-0');
            setTimeout(() => removeItem(itemId), 300);
        }
    } else {
        cart[itemId].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Animate the quantity change
        if (itemElement) {
            itemElement.classList.add('scale-105');
            setTimeout(() => {
                itemElement.classList.remove('scale-105');
                renderCart();
            }, 200);
        } else {
            renderCart();
        }
    }
};

// Remove item from cart with animation
const removeItem = (itemId) => {
    const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);
    
    if (itemElement) {
        itemElement.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            delete cart[itemId];
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }, 300);
    } else {
        delete cart[itemId];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
};

// Render cart with loading state and animations
const renderCart = () => {
    showCartLoading();
    
    setTimeout(() => {
        cartItemsContainer.innerHTML = '';
        
        if (Object.keys(cart).length === 0) {
            cartSummary.classList.add('hidden');
            emptyCartMessage.classList.remove('hidden');
            emptyCartMessage.classList.add('fade-in');
            return;
        }
        
        cartSummary.classList.remove('hidden', 'opacity-50');
        emptyCartMessage.classList.add('hidden');
        
        Object.entries(cart).forEach(([itemId, itemData], index) => {
            const itemElement = createCartItem(itemId, itemData);
            itemElement.classList.add('fade-in');
            itemElement.style.animationDelay = `${index * 0.1}s`;
            cartItemsContainer.appendChild(itemElement);
        });
        
        updateCartSummary();
    }, 500);
};

// Create order summary item for modal
const createModalOrderItem = (itemData) => {
    return `
        <div class="flex justify-between items-center text-sm">
            <div class="flex items-center">
                <span class="w-6 h-6 bg-red-100 dark:bg-red-900 text-red-500 rounded-full flex items-center justify-center mr-2">
                    ${itemData.quantity}
                </span>
                <span class="dark:text-white">${itemData.name}</span>
            </div>
            <span class="text-gray-600 dark:text-gray-400">$${(itemData.price * itemData.quantity).toFixed(2)}</span>
        </div>
    `;
};

// Update order progress with smooth transitions
const updateOrderProgress = () => {
    const steps = ['preparing', 'on-the-way', 'delivered'];
    let currentStep = 0;

    const updateStep = (step) => {
        const stepElement = document.querySelector(`[data-step="${step}"]`);
        if (stepElement) {
            // Add transition classes
            stepElement.classList.add('transition-all', 'duration-500');
            
            // Update colors
            stepElement.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-500', 'dark:text-gray-400');
            stepElement.classList.add('bg-green-500', 'text-white');
            
            // Add scale animation
            stepElement.classList.add('transform', 'scale-110');
            setTimeout(() => stepElement.classList.remove('scale-110'), 500);
            
            // Update the progress line before this step
            const progressLine = stepElement.closest('.flex').previousElementSibling;
            if (progressLine && progressLine.classList.contains('absolute')) {
                const width = ((currentStep + 1) / (steps.length + 1)) * 100;
                progressLine.innerHTML = `
                    <div class="absolute left-0 top-0 h-full bg-green-500 transition-all duration-500"
                         style="width: ${width}%"></div>
                `;
            }
        }
    };

    // First step is already complete (order placed)
    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            updateStep(steps[currentStep]);
            currentStep++;
            
            // Update estimated time text
            const timeElement = document.querySelector('.text-green-800');
            if (timeElement) {
                switch(currentStep) {
                    case 1:
                        timeElement.textContent = 'Food is being prepared...';
                        break;
                    case 2:
                        timeElement.textContent = 'Order is on the way!';
                        break;
                    case 3:
                        timeElement.textContent = 'Order delivered successfully!';
                        break;
                }
            }
        } else {
            clearInterval(interval);
            
            // Show completion message
            showToast('Order delivered successfully!');
            
            // Enable "Track Order" button
            const trackButton = document.getElementById('trackOrder');
            if (trackButton) {
                trackButton.classList.remove('opacity-50', 'cursor-not-allowed');
                trackButton.disabled = false;
            }
        }
    }, 2000);
};

// Handle checkout with loading state
const handleCheckout = async () => {
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutText = checkoutBtn.querySelector('.checkout-text');
    const checkoutLoader = checkoutBtn.querySelector('.checkout-loader');
    
    // Disable button and show loading state
    checkoutBtn.disabled = true;
    checkoutText.textContent = 'Processing Order...';
    checkoutLoader.classList.remove('hidden');
    
    try {
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show modal with fade in
        checkoutModal.classList.remove('hidden');
        checkoutModal.classList.add('fade-in');
        
        // Populate order items in modal with animation
        const modalOrderItems = document.getElementById('modalOrderItems');
        modalOrderItems.innerHTML = Object.values(cart)
            .map((item, index) => `
                <div class="fade-in" style="animation-delay: ${index * 0.1}s">
                    ${createModalOrderItem(item)}
                </div>
            `)
            .join('');
        
        // Start progress animation
        updateOrderProgress();
        
        // Clear cart
        cart = {};
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Disable track order button initially
        const trackButton = document.getElementById('trackOrder');
        if (trackButton) {
            trackButton.classList.add('opacity-50', 'cursor-not-allowed');
            trackButton.disabled = true;
        }
        
        // Show success message
        showToast('Order placed successfully!');
        
    } catch (error) {
        // Handle error
        showToast('Error processing order. Please try again.');
        
        // Reset button state
        checkoutBtn.disabled = false;
        checkoutText.textContent = 'Proceed to Checkout';
        checkoutLoader.classList.add('hidden');
    }
};

// Event Listeners
document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);

// Close modal button
document.getElementById('closeModal').addEventListener('click', () => {
    checkoutModal.classList.add('hidden');
    window.location.href = 'index.html';
});

// Track order button
document.getElementById('trackOrder').addEventListener('click', () => {
    // Here you could implement order tracking functionality
    showToast('Tracking information sent to your phone');
});

darkModeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', darkMode);
    darkModeToggle.innerHTML = darkMode ? 
        '<i class="fas fa-sun text-xl"></i>' : 
        '<i class="fas fa-moon text-xl"></i>';
});

// Close modal when clicking outside
checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
        checkoutModal.classList.add('hidden');
        window.location.href = 'index.html';
    }
});

// Initialize cart
document.addEventListener('DOMContentLoaded', renderCart);

// Show enhanced toast notification
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
