// Main JavaScript file for Craftify website

// Console Log 1: Page Load Tracking
// Purpose: Debug - Track which page is loaded and when, useful for debugging navigation issues
console.log('Craftify website loaded at:', new Date().toISOString());
console.log('Current page:', window.location.pathname);

document.addEventListener('DOMContentLoaded', function() {
    // Console Log 2: DOM Ready State
    // Purpose: Debug - Verify DOM is fully loaded before attaching event listeners
    console.log('DOM fully loaded. Initializing event listeners...');
    
    // Quantity selector functionality
    const quantityButtons = document.querySelectorAll('.quantity-btn');
    
    quantityButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selector = this.closest('.quantity-selector');
            const valueSpan = selector.querySelector('.quantity-value');
            let currentValue = parseInt(valueSpan.textContent);
            
            if (this.textContent === '+') {
                currentValue++;
            } else if (this.textContent === '-' && currentValue > 1) {
                currentValue--;
            }
            
            valueSpan.textContent = currentValue;
            
            // Update total price (if on cart page)
            updateCartTotal();
        });
    });

        // Slide-in Menu from Right - Hamburger Menu Toggle
        const hamburger = document.querySelector('.hamburger-menu');
        const slideMenu = document.querySelector('.slide-menu');
        const slideMenuOverlay = document.querySelector('.slide-menu-overlay');
        const slideMenuClose = document.querySelector('.slide-menu-close');
        
        function openSlideMenu() {
            if (hamburger && slideMenu && slideMenuOverlay) {
                hamburger.classList.add('active');
                slideMenu.classList.add('active');
                slideMenuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                hamburger.setAttribute('aria-expanded', 'true');
            }
        }
        
        function closeSlideMenu() {
            if (hamburger && slideMenu && slideMenuOverlay) {
                hamburger.classList.remove('active');
                slideMenu.classList.remove('active');
                slideMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }
        
        if (hamburger) {
            hamburger.addEventListener('click', function(e) {
                e.stopPropagation();
                if (slideMenu && slideMenu.classList.contains('active')) {
                    closeSlideMenu();
                } else {
                    openSlideMenu();
                }
            });
        }
        
        if (slideMenuClose) {
            slideMenuClose.addEventListener('click', closeSlideMenu);
        }
        
        if (slideMenuOverlay) {
            slideMenuOverlay.addEventListener('click', closeSlideMenu);
        }
        
        // Close menu when clicking on a link
        if (slideMenu) {
            const slideMenuLinks = slideMenu.querySelectorAll('a');
            slideMenuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    closeSlideMenu();
                });
            });
        }
        
        // Close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && slideMenu && slideMenu.classList.contains('active')) {
                closeSlideMenu();
            }
        });
    
    // Form validation
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('.input, .textarea, .select');
        const submitButton = form.querySelector('.btn-yellow, .btn-yellow-large');
        
        if (submitButton) {
            submitButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                let isValid = true;
                inputs.forEach(input => {
                    if (input.hasAttribute('required') && !input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = '#EA4335';
                    } else {
                        input.style.borderColor = '#D9D9D9';
                    }
                    
                    // Email validation
                    if (input.type === 'email' && input.value.trim()) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value.trim())) {
                            isValid = false;
                            input.style.borderColor = '#EA4335';
                        }
                    }
                });
                
                if (isValid) {
                    // Console Log 1: Form Input Data Before Submission
                    // Purpose: Debug - Log form input data before submission to track user input and debug form issues
                    const formData = {};
                    inputs.forEach(input => {
                        const fieldName = input.name || input.id || input.type || 'unknown';
                        formData[fieldName] = input.value;
                    });
                    console.log('Form submission - Input data:', formData);
                    console.log('Form is valid, proceeding with submission');
                    
                    // Form is valid, proceed with submission
                    alert('Form submitted successfully!');
                    
                    // Redirect to home page if on login/registration page
                    if (window.location.pathname.includes('login.html')) {
                        setTimeout(function() {
                            window.location.href = 'index.html';
                        }, 500);
                    }
                    // In a real application, you would submit the form data here
                } else {
                    alert('Please fill in all required fields.');
                }
            });
        }
    });
    
    // Product card click handlers
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            // Navigate to product detail page
            if (this.closest('.page').querySelector('h3')?.textContent === 'Product List') {
                window.location.href = 'product-detail.html';
            }
        });
    });
    
    // Search functionality
    // BUG: Search only works on Enter key - no search button handler
    const searchInputs = document.querySelectorAll('.navbar-search');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value;
                if (searchTerm.trim()) {
                    // Console Log 3: Search Query Tracking
                    // Purpose: Debug - Track user search queries for analytics and debugging search functionality
                    console.log('Search query submitted:', {
                        searchTerm: searchTerm,
                        timestamp: new Date().toISOString(),
                        url: `products.html?search=${encodeURIComponent(searchTerm)}`
                    });
                    // Navigate to products page with search term
                    window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    });
    
    // Initialize product recommendations feature
    initializeProductRecommendations();
    
    // Initialize cart checkout alert
    initializeCartCheckout();
    
    // Initialize product sorting
    initializeProductSorting();
    
    // Initialize product filters
    initializeProductFilters();
});

// Update cart total (if on cart page)
function updateCartTotal() {
    const cart = getCart();
    let subtotal = 0;
    const cartContents = [];
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        cartContents.push({
            itemIndex: index + 1,
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
            itemTotal: itemTotal
        });
        
        // Update item total in DOM if cart is loaded
        const cartItem = document.querySelector(`[data-item-id="${item.id}"]`);
        if (cartItem) {
            const totalElement = cartItem.querySelector('.item-total-price');
            if (totalElement) {
                totalElement.textContent = `$${itemTotal.toFixed(2)}`;
            }
        }
    });
    
    // Calculate tax (5%)
    const tax = subtotal * 0.05;
    const shipping = 5.00;
    const total = subtotal + tax + shipping;
    
    // Console Log 2: Cart Contents and Calculations
    // Purpose: Debug - Log cart contents and calculations to track cart state and debug pricing issues
    console.log('Cart contents:', cartContents);
    console.log('Cart calculations:', {
        subtotal: subtotal,
        tax: tax,
        shipping: shipping,
        total: total,
        itemCount: cart.length
    });
    
    // Update summary
    if (document.getElementById('subtotal')) {
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('total').innerHTML = `<strong>$${total.toFixed(2)}</strong>`;
    }
}

// Remove cart item
function removeCartItem(button) {
    const item = button.closest('.cart-item');
    if (confirm('Are you sure you want to remove this item from your cart?')) {
        item.remove();
        updateCartTotal();
    }
}

// Initialize cart calculations on page load
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('cart.html')) {
        updateCartTotal();
        
        // Update totals when quantity changes
        const quantityButtons = document.querySelectorAll('.quantity-btn');
        quantityButtons.forEach(button => {
            button.addEventListener('click', function() {
                setTimeout(updateCartTotal, 100);
            });
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// UNIQUE TECHNICAL FEATURE: Product Recommendations
// ============================================
// This feature provides personalized product recommendations based on user behavior
// and product categories. It's implemented as a modeled system with hardcoded
// recommendations that demonstrate the functionality.

const productRecommendations = {
    // Sample product data with categories and tags
    products: [
        { id: 1, name: 'Vanilla Bean Candle', category: 'Candles', tags: ['aromatic', 'handmade'], price: 3500 },
        { id: 2, name: 'Fort Sketch Art', category: 'Wall Art', tags: ['decorative', 'modern'], price: 2500 },
        { id: 3, name: 'Wood Box Gift Set', category: 'Gift Box', tags: ['premium', 'handmade'], price: 6500 },
        { id: 4, name: 'Lavender Candle', category: 'Candles', tags: ['aromatic', 'relaxing'], price: 3200 },
        { id: 5, name: 'Abstract Canvas', category: 'Wall Art', tags: ['modern', 'colorful'], price: 2800 },
        { id: 6, name: 'Leather Handbag', category: 'Handbags', tags: ['premium', 'elegant'], price: 4500 },
        { id: 7, name: 'Rose Gift Box', category: 'Gift Box', tags: ['romantic', 'premium'], price: 5500 },
        { id: 8, name: 'Jasmine Candle', category: 'Candles', tags: ['aromatic', 'floral'], price: 3400 }
    ],
    
    // Get recommendations based on current product or category
    getRecommendations: function(currentProductId = null, category = null) {
        let recommendations = [];
        
        if (currentProductId) {
            // Find similar products based on category or tags
            const currentProduct = this.products.find(p => p.id === currentProductId);
            if (currentProduct) {
                recommendations = this.products
                    .filter(p => p.id !== currentProductId && 
                                (p.category === currentProduct.category || 
                                 p.tags.some(tag => currentProduct.tags.includes(tag))))
                    .slice(0, 4);
            }
        } else if (category) {
            // Get products from same category
            recommendations = this.products
                .filter(p => p.category === category)
                .slice(0, 4);
        } else {
            // Get popular/featured products
            recommendations = this.products.slice(0, 4);
        }
        
        return recommendations;
    },
    
    // Display recommendations on product detail page
    displayRecommendations: function(containerId, currentProductId = null, category = null) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const recommendations = this.getRecommendations(currentProductId, category);
        
        if (recommendations.length === 0) {
            container.innerHTML = '<p style="color: #FFFFFF;">No recommendations available.</p>';
            return;
        }
        
        let html = '<h4 style="color: #FFBF46; margin-bottom: 20px;">Recommended for You</h4>';
        html += '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">';
        
        recommendations.forEach(product => {
            html += `
                <div class="product-card" style="width: 200px; height: 200px; cursor: pointer; background: var(--color-gray); border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px;" onclick="window.location.href='product-detail.html?id=${product.id}'">
                    <div style="width: 150px; height: 150px; background: var(--color-light-gray); border-radius: 8px; margin-bottom: 10px;"></div>
                    <p style="color: #FFFFFF; font-size: 14px; text-align: center; margin: 0;">${product.name}</p>
                    <p style="color: #FFBF46; font-size: 16px; margin: 5px 0 0 0;">Rs ${product.price}</p>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }
};

// Initialize product recommendations feature
function initializeProductRecommendations() {
    // Check if we're on product detail page
    if (window.location.pathname.includes('product-detail.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id')) || 1;
        const category = urlParams.get('category') || null;
        
        // Display recommendations
        productRecommendations.displayRecommendations('recommendations-container', productId, category);
    }
    
    // Check if we're on products page with category filter
    if (window.location.pathname.includes('products.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const searchTerm = urlParams.get('search');
        
        if (category || searchTerm) {
            // Filter products based on category or search
            filterProducts(category, searchTerm);
        }
    }
}

// Product category mapping for products page
const productCategories = {
    1: 'candles',      // Handmade Candle Set
    2: 'gifts',        // Artisan Wooden Box
    3: 'home-decor',   // Ceramic Vase Collection
    4: 'gifts',        // Leather Journal
    5: 'home-decor',   // Handwoven Basket
    6: 'home-decor',   // Macrame Wall Hanging
    7: 'gifts',        // Soap Gift Set
    8: 'home-decor'    // Copper Plant Pot
};

// Filter products on products page
function filterProducts(category, searchTerm) {
    const productCards = document.querySelectorAll('.products-grid .product-card');
    let visibleCount = 0;
    
    productCards.forEach((card, index) => {
        const productIndex = index + 1;
        const productCategory = productCategories[productIndex] || 'accessories';
        const productName = card.querySelector('.product-card-title')?.textContent || '';
        
        let shouldShow = true;
        
        // Apply category filter
        if (category && category !== 'all') {
            // Direct category matching
            if (productCategory !== category) {
                shouldShow = false;
            }
        }
        
        // Apply search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            const nameLower = productName.toLowerCase();
            
            if (!nameLower.includes(searchLower)) {
                shouldShow = false;
            }
        }
        
        // Store category filter state
        if (shouldShow) {
            card.dataset.categoryMatch = 'true';
        } else {
            card.dataset.categoryMatch = 'false';
            card.style.display = 'none';
        }
    });
    
    // Apply price filter if active
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter && priceFilter.value !== 'all') {
        applyPriceFilter(priceFilter.value);
    } else {
        // Show all category-matched products
        productCards.forEach(card => {
            if (card.dataset.categoryMatch === 'true') {
                card.style.display = 'flex';
                visibleCount++;
            }
        });
    }
    
    // Log product filter application (part of Console Log 3 - Search/Filter tracking)
    if (category || searchTerm) {
        console.log('Product filter applied:', {
            category: category || 'none',
            searchTerm: searchTerm || 'none',
            visibleProducts: visibleCount,
            totalProducts: productCards.length
        });
    }
    
    // If no filter, show all products
    if (!category && !searchTerm) {
        productCards.forEach(card => {
            card.style.display = 'flex';
            delete card.dataset.categoryMatch;
        });
    }
}

// Filter products by category dropdown
function applyCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;
    const selectedCategory = categoryFilter.value;
    const priceFilter = document.getElementById('priceFilter');
    const selectedPrice = priceFilter ? priceFilter.value : 'all';
    
    // Apply category filter
    filterProducts(selectedCategory === 'all' ? null : selectedCategory, null);
    
    // Apply price filter if not "all"
    if (selectedPrice !== 'all') {
        applyPriceFilter(selectedPrice);
    }
}

// Filter products by price range (simplified - top to bottom, bottom to top)
function applyPriceFilter(priceRange) {
    if (priceRange === 'all') {
        // Reset all price filters - show all category-matched products
        const productCards = document.querySelectorAll('.products-grid .product-card');
        productCards.forEach(card => {
            delete card.dataset.priceFiltered;
            // Only show if category filter allows
            if (card.dataset.categoryMatch === 'true' || !card.dataset.categoryMatch) {
                card.style.display = 'flex';
            }
        });
        return;
    }
    
    const productCards = Array.from(document.querySelectorAll('.products-grid .product-card'));
    let visibleCount = 0;
    
    // Collect all products with their prices
    const productsWithPrices = productCards.map((card, index) => {
        const priceElement = card.querySelector('.product-card-price');
        if (!priceElement) return null;
        
        const priceText = priceElement.textContent;
        const price = parseFloat(priceText.replace('$', '').replace(',', '')) || 0;
        
        // Check if category filter allows this product
        const categoryMatch = card.dataset.categoryMatch !== 'false';
        
        return {
            card: card,
            price: price,
            index: index,
            categoryMatch: categoryMatch
        };
    }).filter(item => item !== null);
    
    // Apply price filter
    productsWithPrices.forEach(item => {
        // Skip if hidden by category filter
        if (!item.categoryMatch) {
            item.card.style.display = 'none';
            return;
        }
        
        let shouldShow = false;
        
        switch(priceRange) {
            case '0-25':
                shouldShow = item.price >= 0 && item.price <= 25;
                break;
            case '25-50':
                shouldShow = item.price > 25 && item.price <= 50;
                break;
            case '50-100':
                shouldShow = item.price > 50 && item.price <= 100;
                break;
            case '100+':
                shouldShow = item.price > 100;
                break;
            default:
                shouldShow = true;
        }
        
        if (shouldShow) {
            item.card.style.display = 'flex';
            item.card.dataset.priceFiltered = 'true';
            visibleCount++;
        } else {
            item.card.style.display = 'none';
            item.card.dataset.priceFiltered = 'true';
        }
    });
    
    // Reorder products: show filtered products from lowest to highest price (top to bottom)
    const visibleProducts = productsWithPrices.filter(item => 
        item.card.style.display !== 'none' && item.categoryMatch
    );
    visibleProducts.sort((a, b) => a.price - b.price); // Sort by price: low to high
    
    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid && visibleProducts.length > 0) {
        // Reorder in DOM: lowest price first (top), highest price last (bottom)
        visibleProducts.forEach(item => {
            productsGrid.appendChild(item.card);
        });
    }
    
    console.log('Price filter applied:', {
        priceRange: priceRange,
        visibleProducts: visibleCount,
        totalProducts: productCards.length,
        sorted: 'low to high'
    });
}

// Initialize product filters
function initializeProductFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            const selectedPrice = priceFilter ? priceFilter.value : 'all';
            
            // Apply category filter first
            filterProducts(selectedCategory === 'all' ? null : selectedCategory, null);
            
            // Then apply price filter if not "all"
            if (selectedPrice !== 'all') {
                applyPriceFilter(selectedPrice);
            }
        });
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', function() {
            const selectedPrice = this.value;
            const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
            
            if (selectedPrice === 'all') {
                // Reset price filter, apply category filter only
                if (selectedCategory === 'all') {
                    filterProducts(null, null);
                    // Reset to original order
                    resetProductOrder();
                } else {
                    filterProducts(selectedCategory, null);
                    resetProductOrder();
                }
            } else {
                // Apply category filter first if not "all"
                if (selectedCategory !== 'all') {
                    filterProducts(selectedCategory, null);
                }
                // Then apply price filter (which will sort by price)
                applyPriceFilter(selectedPrice);
            }
        });
    }
}

// Reset products to original order
function resetProductOrder() {
    const productCards = Array.from(document.querySelectorAll('.products-grid .product-card'));
    const productsGrid = document.querySelector('.products-grid');
    
    if (!productsGrid) return;
    
    // Remove price filter markers
    productCards.forEach(card => {
        delete card.dataset.priceFiltered;
    });
    
    // Get original order by product index
    const productsWithIndex = productCards.map((card, currentIndex) => {
        const productIndex = Array.from(productCards).indexOf(card) + 1;
        return {
            card: card,
            originalIndex: productIndex
        };
    });
    
    // Sort by original index
    productsWithIndex.sort((a, b) => a.originalIndex - b.originalIndex);
    
    // Re-append in original order
    productsWithIndex.forEach(item => {
        productsGrid.appendChild(item.card);
    });
}

// Initialize product sorting
function initializeProductSorting() {
    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            sortProducts();
        });
    }
}

// Sort products
function sortProducts() {
    const sortFilter = document.getElementById('sortFilter');
    if (!sortFilter) return;
    
    const sortValue = sortFilter.value;
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    // Get all product cards (only visible ones if filtering is active)
    const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));
    
    if (productCards.length === 0) return;
    
    // Extract product data and create sortable array
    const productsWithData = productCards.map(card => {
        // Extract price
        const priceElement = card.querySelector('.product-card-price');
        const priceText = priceElement ? priceElement.textContent : '$0';
        const price = parseFloat(priceText.replace('$', '').replace(',', '')) || 0;
        
        // Extract rating (count stars)
        const starsElement = card.querySelector('.stars');
        const starsText = starsElement ? starsElement.textContent : '';
        const rating = (starsText.match(/★/g) || []).length; // Count filled stars
        
        // Extract rating count (number of reviews)
        const ratingCountElement = card.querySelector('.rating-count');
        const ratingCountText = ratingCountElement ? ratingCountElement.textContent : '(0)';
        const ratingCount = parseInt(ratingCountText.replace(/[()]/g, '')) || 0;
        
        // Extract title for alphabetical sorting
        const titleElement = card.querySelector('.product-card-title');
        const title = titleElement ? titleElement.textContent.trim() : '';
        
        return {
            element: card,
            price: price,
            rating: rating,
            ratingCount: ratingCount,
            title: title
        };
    });
    
    // Sort based on selected criteria
    let sortedProducts;
    
    if (sortValue === 'price-low') {
        sortedProducts = productsWithData.sort((a, b) => a.price - b.price);
        console.log('Sorting products by price: Low to High');
    } else if (sortValue === 'price-high') {
        sortedProducts = productsWithData.sort((a, b) => b.price - a.price);
        console.log('Sorting products by price: High to Low');
    } else if (sortValue === 'rating') {
        // Sort by rating (stars), then by number of reviews as tiebreaker
        sortedProducts = productsWithData.sort((a, b) => {
            if (b.rating !== a.rating) {
                return b.rating - a.rating;
            }
            return b.ratingCount - a.ratingCount;
        });
        console.log('Sorting products by rating: Highest Rated');
    } else if (sortValue === 'newest') {
        // For "newest", we'll use the original order (first items are newest)
        // In a real app, this would use a date field
        sortedProducts = productsWithData; // Keep original order
        console.log('Sorting products by: Newest First (using original order)');
    } else if (sortValue === 'popular') {
        // Sort by rating count (number of reviews) as popularity indicator
        sortedProducts = productsWithData.sort((a, b) => b.ratingCount - a.ratingCount);
        console.log('Sorting products by: Most Popular (by review count)');
    } else {
        // Default: keep original order
        sortedProducts = productsWithData;
    }
    
    // Reorder products in DOM
    sortedProducts.forEach(product => {
        productsGrid.appendChild(product.element);
    });
    
    // Log sorting results
    console.log('Products sorted:', {
        sortType: sortValue,
        productCount: sortedProducts.length,
        priceRange: sortedProducts.length > 0 ? {
            min: Math.min(...sortedProducts.map(p => p.price)),
            max: Math.max(...sortedProducts.map(p => p.price))
        } : null
    });
}

// Initialize cart checkout alert
function initializeCartCheckout() {
    // Alert 3: Cart Checkout Confirmation
    // Purpose: User Experience - Confirm before proceeding to payment, preventing accidental checkout
    const proceedButtons = document.querySelectorAll('.btn-yellow-large');
    proceedButtons.forEach(button => {
        if (button.textContent.includes('Proceed to Payment') || button.textContent.includes('Proceed to Checkout') || button.textContent.includes('Payment')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const confirmed = confirm('Are you sure you want to proceed to payment? Please review your cart items.');
                if (confirmed) {
                    // Check if it's a link or button
                    if (button.tagName === 'A') {
                        window.location.href = button.getAttribute('href') || 'checkout.html';
                    } else {
                        window.location.href = 'checkout.html';
                    }
                }
            });
        }
    });
}

// FAQ Toggle Function
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('span');
    
    if (answer.style.display === 'none' || answer.style.display === '') {
        answer.style.display = 'block';
        icon.textContent = '−';
    } else {
        answer.style.display = 'none';
        icon.textContent = '+';
    }
}

// ============================================
// CART MANAGEMENT SYSTEM
// ============================================

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('craftifyCart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('craftifyCart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in navigation
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        if (totalItems > 0) {
            el.textContent = totalItems;
            el.style.display = 'inline-block';
        } else {
            el.style.display = 'none';
        }
    });
}

// Add item to cart from products page
function addToCartFromProducts(productId, productName, price, imageUrl) {
    const cart = getCart();
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Increase quantity if item exists
        existingItem.quantity += 1;
    } else {
        // Add new item to cart
        cart.push({
            id: productId,
            name: productName,
            price: price,
            image: imageUrl,
            quantity: 1
        });
    }
    
    saveCart(cart);
    
    // Show confirmation alert
    alert(`Added ${productName} to cart!`);
    
    // Console log for debugging
    console.log('Item added to cart:', {
        productId: productId,
        productName: productName,
        price: price,
        quantity: existingItem ? existingItem.quantity : 1,
        cartTotal: cart.length
    });
}

// Load cart items on cart page
function loadCartItems() {
    const cart = getCart();
    const cartItemsSection = document.querySelector('.cart-items-section');
    
    if (!cartItemsSection) return;
    
    if (cart.length === 0) {
        cartItemsSection.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Your cart is empty. <a href="products.html" style="color: #00BBF9;">Continue Shopping</a></p>';
        return;
    }
    
    let cartHTML = '';
    let itemCounter = 1;
    
    cart.forEach((item, index) => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        cartHTML += `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                </div>
                <div class="cart-item-details">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-specs">Color: Standard | Size: Standard</p>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <label for="qty${itemCounter}" class="quantity-label-small">Qty:</label>
                    <div class="quantity-controls-small">
                        <button class="quantity-btn-small" onclick="updateCartItemQuantity(${index}, -1)">-</button>
                        <input type="number" id="qty${itemCounter}" value="${item.quantity}" min="1" class="quantity-input-small" onchange="updateCartItemQuantity(${index}, 0, this.value)">
                        <button class="quantity-btn-small" onclick="updateCartItemQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    <p class="item-total-price">$${itemTotal}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-btn" onclick="removeCartItemById(${item.id})" aria-label="Remove item">×</button>
                    <button class="save-later-btn" onclick="saveForLater(this)">Save for Later</button>
                </div>
            </div>
        `;
        itemCounter++;
    });
    
    cartItemsSection.innerHTML = cartHTML;
    updateCartTotal();
}

// Update cart item quantity
function updateCartItemQuantity(index, change, newValue) {
    const cart = getCart();
    
    if (newValue !== undefined) {
        cart[index].quantity = parseInt(newValue) || 1;
    } else {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) {
            cart[index].quantity = 1;
        }
    }
    
    saveCart(cart);
    loadCartItems(); // Reload cart display
}

// Remove cart item by ID
function removeCartItemById(productId) {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
        const cart = getCart();
        const newCart = cart.filter(item => item.id !== productId);
        saveCart(newCart);
        loadCartItems(); // Reload cart display
    }
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Load cart items if on cart page
    if (window.location.pathname.includes('shopping-cart.html')) {
        loadCartItems();
    }
});
