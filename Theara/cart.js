document.addEventListener('DOMContentLoaded', function() {
    // Get current product from page
    const productName = document.querySelector('h2.text-4xl').textContent;
    const productPrice = parseFloat(document.querySelector('h3.text-4xl').textContent.replace('$', ''));
    const productImage = document.querySelector('.prodcutpic').src;
    
    // Variables for order details
    let selectedSize = 'M';
    let selectedLocation = '';
    let quantity = 1;
    
    // ===== SIZE SELECTION =====
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from all buttons
            sizeButtons.forEach(btn => {
                btn.style.background = 'white';
                btn.style.color = '#4b5563';
            });
            
            // Add selected class to clicked button
            this.style.background = '#A6171B';
            this.style.color = 'white';
            this.style.transform = 'scale(1.05)';
            
            selectedSize = this.textContent;
        });
        
        // Set default selection (M)
        if (button.textContent === 'M') {
            button.style.background = '#A6171B';
            button.style.color = 'white';
        }
    });
    
    // ===== QUANTITY SELECTION =====
    const minusBtn = document.querySelector('.minus-btn');
    const plusBtn = document.querySelector('.plus-btn');
    const quantityDisplay = document.querySelector('.quantity-value');
    
    minusBtn.addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        quantity++;
        quantityDisplay.textContent = quantity;
    });
    
    // ===== LOCATION SELECTION =====
    const locationSelect = document.querySelector('.select-location');
    locationSelect.addEventListener('change', function() {
        selectedLocation = this.value;
    });
    
    // ===== ADD TO CART =====
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', function() {
        if (!selectedLocation) {
            alert('Please select a location first');
            return;
        }
        
        // Get existing cart or create new one
        const cart = JSON.parse(localStorage.getItem('yummyCart')) || [];
        
        // Create cart item
        const cartItem = {
            id: productName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: quantity,
            size: selectedSize,
            location: selectedLocation,
            addedDate: new Date().toISOString()
        };
        
        // Check if same item already exists
        const existingItemIndex = cart.findIndex(item => 
            item.name === cartItem.name && 
            item.size === cartItem.size && 
            item.location === cartItem.location
        );
        
        if (existingItemIndex > -1) {
            // Update quantity if item exists
            cart[existingItemIndex].quantity += cartItem.quantity;
        } else {
            // Add new item
            cart.push(cartItem);
        }
        
        // Save to localStorage
        localStorage.setItem('yummyCart', JSON.stringify(cart));
        
        // Update cart counter
        updateCartCounter();
    });
    
    // ===== CART COUNTER =====
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('yummyCart')) || [];
        const cartCounter = document.getElementById('shopping-items-counter');
        
        if (cartCounter) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCounter.innerHTML = `
                ${totalItems} 
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                </svg>
            `;
            
            // Make cart icon clickable
            cartCounter.addEventListener('click', function() {
                showSimpleCart(cart);
            });
        }
    }
    
    // Initialize cart counter
    updateCartCounter();
    
    // ===== SHOW CART FUNCTION =====
    function showSimpleCart(cart) {
        // Create cart overlay
        const cartOverlay = document.createElement('div');
        cartOverlay.id = 'cartOverlay'; // Add ID
        cartOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            display: flex;
            justify-content: flex-end;
        `;
        
        // Create cart sidebar
        const cartSidebar = document.createElement('div');
        cartSidebar.style.cssText = `
            background: white;
            width: 350px;
            height: 100%;
            padding: 20px;
            overflow-y: auto;
        `;
        
        // Cart content
        let cartHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="font-size: 24px; font-weight: bold; color: #A6171B;">Your Cart</h2>
                <button id="closeCart" style="background: none; border: none; font-size: 24px; cursor: pointer; padding: 5px;">×</button>
            </div>
        `;
        
        if (cart.length === 0) {
            cartHTML += `
                <div style="text-align: center; padding: 40px 0;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#ccc" viewBox="0 0 16 16" style="margin-bottom: 10px;">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                    <p style="color: #666;">Your cart is empty</p>
                </div>
            `;
        } else {
            cartHTML += `<div style="margin-bottom: 20px;">`;
            
            let total = 0;
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                cartHTML += `
                    <div style="display: flex; padding: 10px 0; border-bottom: 1px solid #eee;">
                        <div style="width: 60px; height: 60px; background: #f5f5f5; border-radius: 8px; margin-right: 10px; 
                             display: flex; align-items: center; justify-content: center; overflow: hidden;">
                            <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div style="flex: 1;">
                            <div style="font-weight: bold; margin-bottom: 4px;">${item.name}</div>
                            <div style="color: #666; font-size: 13px;">Size: ${item.size}</div>
                            <div style="color: #666; font-size: 13px;">Location: ${item.location}</div>
                            <div style="color: #666; font-size: 13px;">Qty: ${item.quantity}</div>
                        </div>
                        <div style="font-weight: bold; color: #A6171B; text-align: right;">
                            $${item.price.toFixed(2)}<br>
                            <span style="font-size: 12px; color: #666;">x${item.quantity}</span>
                        </div>
                    </div>
                `;
            });
            
            cartHTML += `
                <div style="border-top: 2px solid #A6171B; padding-top: 15px;">
                    <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold;">
                        <span>Total:</span>
                        <span>$${total.toFixed(2)}</span>
                    </div>
                    
                    <!-- Checkout Button -->
                    <button id="checkoutBtn" style="width: 100%; margin-top: 15px; padding: 12px; 
                           background: #A6171B; color: white; border: none; border-radius: 8px; 
                           font-weight: bold; cursor: pointer; font-size: 16px;">
                        Checkout Now
                    </button>
                    
                    <!-- Clear Cart Button -->
                    <button id="clearCartBtn" style="width: 100%; margin-top: 10px; padding: 10px; 
                           background: #dc2626; color: white; border: none; border-radius: 8px; 
                           font-weight: bold; cursor: pointer; font-size: 14px;">
                        Clear Cart
                    </button>
                </div>
            `;
        }
        
        cartSidebar.innerHTML = cartHTML;
        cartOverlay.appendChild(cartSidebar);
        document.body.appendChild(cartOverlay);
        
        // Close button function
        function closeCart() {
            const overlay = document.getElementById('cartOverlay');
            if (overlay && document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }
        
        // Close button event listener
        const closeCartBtn = cartSidebar.querySelector('#closeCart');
        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', closeCart);
        }
        
        // Checkout button event listener
        const checkoutBtn = cartSidebar.querySelector('#checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                // Store cart data temporarily for the receipt page
                localStorage.setItem('lastOrder', JSON.stringify(cart));
                // Clear cart after redirecting
                localStorage.removeItem('yummyCart');
                // Redirect to payment page
                window.location.href = 'Payment.html';
            });
        }

        // Clear Cart button event listener
        const clearCartBtn = cartSidebar.querySelector('#clearCartBtn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to clear your cart?')) {
                    // Clear localStorage
                    localStorage.removeItem('yummyCart');
                    
                    // Update cart counter
                    updateCartCounter();
                    
                    // Close cart overlay
                    closeCart();
                    
                }
            });
        }
        
        // Prevent clicks inside the sidebar from closing the overlay
        cartSidebar.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Close when clicking outside
        cartOverlay.addEventListener('click', function(e) {
            if (e.target === cartOverlay) {
                closeCart();
            }
        });
    }
});