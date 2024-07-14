let cart = [];

function addToCart(item, price) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ item, price, quantity: 1 });
    }
    displayCart();
    document.getElementById('cart-message').innerText = `${item} was added to your cart!`;
    updateCartCount();
    setTimeout(() => {
        document.getElementById('cart-message').innerText = '';
    }, 2000);
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    const ul = document.createElement('ul');
    cart.forEach((cartItem, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="item-details">${cartItem.item} - $${cartItem.price.toFixed(2)} x ${cartItem.quantity}</span>
            <button class="item-remove" onclick="removeFromCart(${index})">Remove</button>
        `;
        ul.appendChild(li);
    });
    cartItems.appendChild(ul);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById('cart-total').innerText = total.toFixed(2);
}

function removeFromCart(index) {
    cart[index].quantity--;
    if (cart[index].quantity === 0) {
        cart.splice(index, 1);
    }
    displayCart();
    updateCartCount();
}

function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

function checkout() {
    alert('Thank you for your purchase!');
    cart = [];
    displayCart();
    document.getElementById('cart-count').innerText = 0;
}
