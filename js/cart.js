let cart = [];

function addToCart(item, price) {
    cart.push({ item, price });
    displayCart();
    document.getElementById('cart-message').innerText = `${item} was added to your cart!`;
    document.getElementById('cart-count').innerText = cart.length;
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
            <span class="item-details">${cartItem.item} - $${cartItem.price.toFixed(2)}</span>
            <button class="item-remove" onclick="removeFromCart(${index})">Remove</button>
        `;
        ul.appendChild(li);
    });
    cartItems.appendChild(ul);

    const total = cart.reduce((acc, item) => acc + item.price, 0);
    document.getElementById('cart-total').innerText = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
    document.getElementById('cart-count').innerText = cart.length;
}

function checkout() {
    alert('Thank you for your purchase!');
    cart = [];
    displayCart();
    document.getElementById('cart-count').innerText = 0;
}
