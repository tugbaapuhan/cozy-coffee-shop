let cart = [];

function addToCart(item, price) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ item, price, quantity: 1 });
    }
    displayCart();
    updateCartCount();
    displayMessage(`${item} was added to your cart!`);
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
    const item = cart[index].item;
    cart[index].quantity--;
    if (cart[index].quantity === 0) {
        cart.splice(index, 1);
    }
    displayCart();
    updateCartCount();
    displayMessage(`Removed one ${item} from cart`);
}

function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

function displayMessage(message) {
    const messageElement = document.getElementById('cart-message');
    messageElement.innerText = message;
    setTimeout(() => {
        messageElement.innerText = '';
    }, 2000);
}

function checkout() {
    alert('Thank you for your purchase!');
    cart = [];
    displayCart();
    updateCartCount();
}
