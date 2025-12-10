document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

 
  const catButtons = document.querySelectorAll(".cat-btn");
  const products = document.querySelectorAll(".product-card");

  catButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");

      catButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      products.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || category === cardCategory) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  
  const modal = document.getElementById("preorder-modal");
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalClose = document.querySelector(".modal-close");
  const preorderButtons = document.querySelectorAll(".pre-order-btn");
  const selectedProductNameEl = document.getElementById("selected-product-name");
  const productNameInput = document.getElementById("product_name_input");
  const openEmptyPreorderBtn = document.querySelector(".open-empty-preorder");
  const form = document.getElementById("preorder-form");
  const formMessage = document.getElementById("form-message");

  function openModal(productName = "Custom / Not selected") {
    if (selectedProductNameEl) {
      selectedProductNameEl.textContent = productName;
    }
    if (productNameInput) {
      productNameInput.value = productName;
    }
    if (formMessage) {
      formMessage.textContent = "";
      formMessage.className = "form-message";
    }
    modal.classList.remove("hidden");
  }

  function closeModal() {
    modal.classList.add("hidden");
  }

  preorderButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productName = btn.getAttribute("data-product-name") || "Custom / Not selected";
      openModal(productName);
    });
  });

  if (openEmptyPreorderBtn) {
    openEmptyPreorderBtn.addEventListener("click", () => {
      openModal("Custom / Not selected");
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // Simple client-side validation
  if (form) {
    form.addEventListener("submit", (e) => {
      const name = document.getElementById("customer_name").value.trim();
      const phone = document.getElementById("phone").value.trim();

      if (!name || !phone) {
        e.preventDefault();
        if (formMessage) {
          formMessage.textContent = "Please enter both your name and phone number.";
          formMessage.className = "form-message error";
        }
        return;
      }

      
      const phonePattern = /^01[0-9]{9}$/;
      if (!phonePattern.test(phone)) {
        e.preventDefault();
        if (formMessage) {
          formMessage.textContent = "Please enter a valid Bangladeshi phone number (11 digits, starting with 01).";
          formMessage.className = "form-message error";
        }
        return;
      }

      
      
    });
  }
});

