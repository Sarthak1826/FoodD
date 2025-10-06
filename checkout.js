// Get cart data from localStorage
const cartItemsEl = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const payBtn = document.getElementById('pay-btn');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

if(cart.length === 0){
    alert('Your cart is empty!');
    window.location.href = 'index.html';
}

let total = 0;
cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x1`;
    const price = parseFloat(item.price.replace('$',''));
    total += price;
    const span = document.createElement('span');
    span.textContent = `$${price.toFixed(2)}`;
    li.appendChild(span);
    cartItemsEl.appendChild(li);
});
totalPriceEl.textContent = `$${total.toFixed(2)}`;

// Payment simulation
payBtn.addEventListener('click', ()=>{
    alert('Payment Successful!');
    localStorage.setItem('order', JSON.stringify(cart));
    window.location.href = 'order-status.html';
});
