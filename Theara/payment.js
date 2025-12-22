// Get order data from localStorage or URL parameters
    document.addEventListener('DOMContentLoaded', function() {
      // Generate random order ID
      const orderId = Math.floor(Math.random() * 90000) + 10000;
      document.getElementById('orderId').textContent = orderId;
      
      // Set current date
      const now = new Date();
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      document.getElementById('orderDate').textContent = now.toLocaleDateString('en-US', options);
      
      // Get cart data from localStorage
      const cartData = JSON.parse(localStorage.getItem('lastOrder')) || [];
      
      // If no cart data, show demo data
      if (cartData.length === 0) {
        showDemoReceipt();
      } else {
        populateReceipt(cartData);
        // Clear cart after checkout
        localStorage.removeItem('lastOrder');
      }
      
      // Update cart counter to 0
      updateCartCounter();
    });
    
    function populateReceipt(cartItems) {
      const receiptItems = document.getElementById('receiptItems');
      let subtotal = 0;
      
      cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const itemHTML = `
          <div class="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
              </div>
              <div>
                <p class="font-semibold">${item.name}</p>
                <p class="text-sm text-gray-600">Size: ${item.size} | Location: ${item.location}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold">$${item.price.toFixed(2)}</p>
              <p class="text-sm text-gray-600">Qty: ${item.quantity}</p>
              <p class="font-bold text-[#A6171B]">$${itemTotal.toFixed(2)}</p>
            </div>
          </div>
        `;
        
        receiptItems.innerHTML += itemHTML;
        
        // Set shipping location from first item
        if (index === 0) {
          document.getElementById('shippingLocation').textContent = 
            item.location.charAt(0).toUpperCase() + item.location.slice(1) + " Store";
        }
      });
      
      // Calculate totals
      const tax = subtotal * 0.1; // 10% tax
      const total = subtotal + tax;
      
      document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
      document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
      document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
    
    function updateCartCounter() {
      const cartCounter = document.getElementById('shopping-items-counter');
      if (cartCounter) {
        cartCounter.innerHTML = `
          0 
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
          </svg>
        `;
      }
    }
    
    function printReceipt() {
      window.print();
    }
    
    function goToHome() {
      window.location.href = "../Dyna/Home/Home.html";
    }