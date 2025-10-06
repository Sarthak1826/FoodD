// Initialize Swiper for image sliders or banners

var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});

// -------------------- DOM ELEMENT SELECTION --------------------
// Selecting important elements from HTML for interaction
const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closeBtn = document.querySelector('.close-btn');
const cardList = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list');
const cartTotal = document.querySelector('.cart-total');
const cartvalue = document.querySelector('.cart-value');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const bars = document.querySelector('.fa-bars');


// -------------------- EVENT LISTENERS FOR UI --------------------
// Open Cart tab
cartIcon.addEventListener('click', () => cartTab.classList.add('cart-tab-active'));

// Close Cart tab
closeBtn.addEventListener('click', () => cartTab.classList.remove('cart-tab-active'));

// Toggle mobile menu visibility
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('mobile-menu-active'));

// Change hamburger icon to cross
hamburger.addEventListener('click', () => bars.classList.toggle('fa-xmark'));


// -------------------- GLOBAL VARIABLES --------------------
// Empty arrays to hold product and cart data
let productList = [];  //Transferring data from json to this Empty Array
let cartProduct = [];


// -------------------- UPDATE CART TOTALS --------------------
// Calculates total price and quantity in the cart
const updateTotals = () =>{
  let totalPrice = 0;
  let totalQuantity = 0;

  document.querySelectorAll('.item').forEach(item => {

    const quantity = parseInt(item.querySelector('.quantity-value').textContent);
const price = parseFloat(item.querySelector('.item-total').textContent.replace('$', ''));

totalPrice += price;
totalQuantity+= quantity;

});

cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
cartvalue.textContent = totalQuantity;
}


// -------------------- DISPLAY PRODUCT CARDS --------------------
// Dynamically show product cards on the page
const showCards = () => {

  productList.forEach(product => {

    const orderCard = document.createElement('div');
    orderCard.classList.add('order-card');


    // HTML structure for each product card
    orderCard.innerHTML = `
    <div class="card-image">
    <img src="${product.image}">

    </div>
    <h4>${product.name}</h4>
    <h4 class="price">${product.price}</h4>
    <a href="#" class="btn card-btn">Add to Cart</a>
                        `;

    cardList.appendChild(orderCard);
    
    // Add product to cart when button is clicked
    const cardBtn = orderCard.querySelector('.card-btn');
    cardBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      addToCart(product);

    });
  });
};

// -------------------- ADD TO CART FUNCTION --------------------
// Adds selected product to the cart
const addToCart = (product) =>{

const existingProduct = cartProduct.find(item => item.id === product.id);
if(existingProduct){
  alert('Item already in your Cart!');
  return;
} 

cartProduct.push(product);

let quantity = 1;
let price = parseFloat(product.price.replace('$',''))

  // Create new cart item element
  const cartItem = document.createElement('div');
  cartItem.classList.add('item');


  // HTML structure for cart item
  cartItem.innerHTML = `
   <div class="item-image">
  <img src="${product.image}">
  </div>
  <div class="detail">
  <h4>${product.name}</h4>
 <h4 class="item-total">${product.price}</h4>
</div>
<div class="flex">
<a href="#" class="quantity-btn minus">
<i class="fas fa-minus"></i>
</a>
<h4 class="quantity-value">${quantity}</h4>
<a href="#" class="quantity-btn plus">
<i class="fas fa-plus"></i>
</a>
</div>
  `;

  cartList.appendChild(cartItem);
  updateTotals();

   // Select quantity buttons
  const plusBtn = cartItem.querySelector('.plus');
  const quantityValue = cartItem.querySelector('.quantity-value');
  const itemTotal = cartItem.querySelector('.item-total');
const minusBtn = cartItem.querySelector('.minus');


// Increase quantity
  plusBtn.addEventListener('click', (e) =>{
    e.preventDefault();
     quantity++;
     quantityValue.textContent = quantity;
     itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
     updateTotals();
  })

  // Decrease quantity or remove item
  minusBtn.addEventListener('click', (e)=>
  {
      e.preventDefault();
      if(quantity > 1){
           quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
      updateTotals();
      }
      else{

        // Animate and remove item from cart
        cartItem.classList.add('slide-out')

        setTimeout(() => {
            cartItem.remove();
        cartProduct = cartProduct.filter(item => item.id !== product.id);
        updateTotals();

        }, 300);
      
      }
})
}

// -------------------- INITIALIZE APPLICATION --------------------
// Fetch product data from products.json file and display it
const initApp = () => {

  fetch('products.json').then(    //Fetching data from json file
    response => response.json()).then   // Convert the response to JSON
    (data => {
      productList = data;         //Data will store in productList
      showCards();
    })
}


// -------------------- POPUP HANDLING --------------------
// Show the popup window
function showPopup(event) {
    event.preventDefault(); // Prevent default link behavior
    document.getElementById("popup").style.display = "flex";
}


// Close the popup window
function closePopup() {
    document.getElementById("popup").style.display = "none";
}



// -------------------- EMAIL SENDING FUNCTION --------------------
// Sends email using EmailJS API
function sendEmail(){
  const templateParams = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,

  };

  emailjs
  .send("service_h0wt4gh" , "template_zquj65o", templateParams)
  .then(() => {
    alert("Email sent SuccessFully!");
  })
  .catch((error) => {
    console.log("Error sending email: ", error);
    alert("Failed to send email. Please try Again. ");
  });
}


// -------------------- CHECKOUT BUTTON FUNCTIONALITY --------------------
// Redirects to checkout page if cart is not empty
const checkoutBtn = document.getElementById('checkout-btn');

checkoutBtn.addEventListener('click', () => {
  if (cartProduct.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  localStorage.setItem('cart', JSON.stringify(cartProduct));
  window.location.href = 'checkout.html';
});


// -------------------- START THE APP --------------------
// Runs when page is loaded
initApp(); //Calling init Function



