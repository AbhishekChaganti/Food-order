let cart = [];

function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
    updateCartDisplay();
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(itemId) {
  const item = menuData.find((item) => item.id === itemId);
  if (!item) return;

  const existingItem = cart.find((cartItem) => cartItem.id === itemId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
  }

  saveCart();
  updateCartCount();
  updateCartDisplay();
  showToast("Item added to cart!");
}

function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  saveCart();
  updateCartCount();
  updateCartDisplay();
}

function updateQuantity(itemId, delta) {
  const item = cart.find((item) => item.id === itemId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(itemId);
    } else {
      saveCart();
      updateCartDisplay();
    }
  }
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
    cartItems.appendChild(cartItem);
  });

  cartTotal.textContent = total.toFixed(2);
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function handleCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const modal = document.getElementById("orderModal");
  modal.style.display = "block";
}

// Initialize cart functionality
document.addEventListener("DOMContentLoaded", () => {
  loadCart();

  const cartIcon = document.querySelector(".cart-icon");
  const cartSidebar = document.getElementById("cart");
  const closeCart = document.getElementById("closeCart");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const orderModal = document.getElementById("orderModal");
  const orderForm = document.getElementById("orderForm");

  cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("open");
  });

  closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
  });

  checkoutBtn.addEventListener("click", handleCheckout);

  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    cart = [];
    saveCart();
    updateCartCount();
    updateCartDisplay();
    orderModal.style.display = "none";
    cartSidebar.classList.remove("open");
  });

  window.addEventListener("click", (e) => {
    if (e.target === orderModal) {
      orderModal.style.display = "none";
    }
  });
});
