const productList = document.getElementById("productList");
const cart = document.getElementById("cart");
const sortHighToLowButton = document.getElementById("sortHighToLow");
const sortLowToHighButton = document.getElementById("sortLowToHigh");
const cartCountIcon = document.getElementById("cartCount");

let products = [];
let cartItems = [];

// Fetch data from the API
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    displayProducts(products);
  });

// Display products in the list
function displayProducts(products) {
  productList.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="product-details">
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    productList.appendChild(productCard);
  });
}

// Add a product to the cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cartItems.push(product);
    displayCart();
    cartCountIcon.innerHTML = cartItems.length;
  }
}

// Remove a product from the cart
function removeFromCart(productId) {
  cartItems = cartItems.filter((product) => product.id !== productId);
  displayCart();
  cartCountIcon.innerHTML = cartItems.length;
}

// Display the cart
function displayCart() {
  cart.innerHTML = "";
  cartItems.forEach((product) => {
    const cartItem = document.createElement("li");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `${product.title} - $${product.price} <button onclick="removeFromCart(${product.id})">Remove</button>`;
    cart.appendChild(cartItem);
  });
}

// Sort products by price
sortHighToLowButton.addEventListener("click", () => {
  products.sort((a, b) => b.price - a.price);
  displayProducts(products);
});

sortLowToHighButton.addEventListener("click", () => {
  products.sort((a, b) => a.price - b.price);
  displayProducts(products);
});
