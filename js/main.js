// Main application initialization and global event handlers
document.addEventListener("DOMContentLoaded", () => {
  // Initialize smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Add intersection observer for animation on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document.querySelectorAll(".menu-card").forEach((card) => {
    observer.observe(card);
  });

  // Handle responsive navigation
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      document.querySelector(".cart-sidebar").style.width = "100%";
    } else {
      document.querySelector(".cart-sidebar").style.width = "400px";
    }
  };

  window.addEventListener("resize", handleResize);
  handleResize();

  // Add loading state to buttons
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function () {
      const originalText = this.innerHTML;
      this.disabled = true;
      this.innerHTML = "Loading...";

      setTimeout(() => {
        this.disabled = false;
        this.innerHTML = originalText;
      }, 500);
    });
  });

  // Handle form validation
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    const inputs = orderForm.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      input.addEventListener("invalid", (e) => {
        e.preventDefault();
        input.classList.add("error");
      });

      input.addEventListener("input", () => {
        input.classList.remove("error");
      });
    });
  }

  // Handle scroll-based header transparency
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.style.backgroundColor = "white";
      navbar.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    } else if (currentScroll > lastScroll) {
      navbar.style.backgroundColor = "rgba(255,255,255,0.95)";
      navbar.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    }
    lastScroll = currentScroll;
  });
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle search input with debouncing
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener(
    "input",
    debounce((e) => {
      searchMenu(e.target.value);
    }, 300)
  );
}

// Add error handling
window.addEventListener("error", (e) => {
  console.error("Global error:", e.message);
  // You could add error reporting service here
});

// Handle offline/online status
window.addEventListener("online", () => {
  document.body.classList.remove("offline");
});

window.addEventListener("offline", () => {
  document.body.classList.add("offline");
});
