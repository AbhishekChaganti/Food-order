const menuData = [
  {
    id: 1,
    name: "Grilled Salmon",
    category: "main",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1565895405138-6c3a1555da6a",
    description: "Fresh Atlantic salmon grilled to perfection with herbs",
  },
  {
    id: 2,
    name: "Beef Tenderloin",
    category: "main",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1565895405137-3ca0cc5088c8",
    description: "Premium cut beef tenderloin with red wine sauce",
  },
  {
    id: 3,
    name: "Caesar Salad",
    category: "starters",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1565720490528-48e5be3d6a1f",
    description: "Classic Caesar salad with homemade dressing",
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    category: "desserts",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1563897539633-7374c276c212",
    description: "Warm chocolate cake with molten center",
  },
  {
    id: 5,
    name: "Bruschetta",
    category: "starters",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1566670829021-13ba5cc73518",
    description: "Toasted bread with tomatoes and fresh basil",
  },
  {
    id: 6,
    name: "Mojito",
    category: "beverages",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1566670735914-b2038696981d",
    description: "Classic mint mojito with fresh lime",
  },
  {
    id: 7,
    name: "Pasta Carbonara",
    category: "main",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1564844536311-de546a28c87d",
    description: "Creamy pasta with pancetta and parmesan",
  },
  {
    id: 8,
    name: "Tiramisu",
    category: "desserts",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1565895405227-31cffbe0cf86",
    description: "Classic Italian dessert with coffee and mascarpone",
  },
];

function displayMenuItems(items) {
  const menuContainer = document.getElementById("menuItems");
  menuContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const menuCard = document.createElement("div");
    menuCard.className = "menu-card";
    menuCard.innerHTML = `
            <img src="${item.image}?auto=format&fit=crop&w=400&q=80" 
                 alt="${item.name}"
                 loading="lazy"
                 width="400"
                 height="225">
            <div class="menu-card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">$${item.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${item.id})">
                    Add to Cart
                </button>
            </div>
        `;
    fragment.appendChild(menuCard);
  });

  menuContainer.appendChild(fragment);
}

function filterMenuByCategory(category) {
  const filteredItems =
    category === "all"
      ? menuData
      : menuData.filter((item) => item.category === category);
  displayMenuItems(filteredItems);
}

function searchMenu(query) {
  if (!query.trim()) {
    displayMenuItems(menuData);
    return;
  }
  const searchResults = menuData.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );
  displayMenuItems(searchResults);
}

// Initialize menu display
document.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(menuData);

  // Set up category filters
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      filterMenuByCategory(e.target.dataset.category);
    });
  });

  // Set up search functionality
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  searchBtn.addEventListener("click", () => {
    searchMenu(searchInput.value);
  });

  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      searchMenu(searchInput.value);
    }
  });
});
