gsap.registerPlugin(ScrollTrigger);

/*==========================================================

                    CART DATA

==========================================================*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/*==========================================================

                    ELEMENTS

==========================================================*/

const cartItems = document.querySelector("#cartItems");
const subtotal = document.querySelector("#subtotal");
const grandTotal = document.querySelector("#grandTotal");
const itemCount = document.querySelector("#itemCount");
const emptyCart = document.querySelector("#emptyCart");
const cartContainer = document.querySelector(".cart-container");

/*==========================================================

                    FORMAT PRICE

==========================================================*/

function formatPrice(price) {
  return "₹" + Number(price).toLocaleString("en-IN");
}

/*==========================================================

                    SAVE CART

==========================================================*/

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/*==========================================================

                    UPDATE TOTALS

==========================================================*/

function updateTotals() {
  let total = 0;

  let totalItems = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    totalItems += item.quantity;
  });

  subtotal.textContent = formatPrice(total);

  grandTotal.textContent = formatPrice(total);

  itemCount.textContent = `${totalItems} Item${totalItems !== 1 ? "s" : ""}`;
}

/*==========================================================

                EMPTY CART CHECK

==========================================================*/

function checkEmptyCart() {
  if (cart.length === 0) {
    cartContainer.style.display = "none";

    emptyCart.classList.remove("hidden");
  } else {
    cartContainer.style.display = "grid";

    emptyCart.classList.add("hidden");
  }
}

/*==========================================================

                    RENDER CART

==========================================================*/

function renderCart() {
  cartItems.innerHTML = "";

  checkEmptyCart();

  if (cart.length === 0) {
    updateTotals();

    return;
  }

  cart.forEach((product, index) => {

    console.log("Rendering product:", product);

    const card = document.createElement("article");

    card.className = "cart-item";

    card.innerHTML = `
<div class="cart-image">
    <img src="${product.image || 'images/products/default.png'}"
         alt="${product.name || 'Product'}">
</div>

<div class="cart-details">

    <span class="product-category">
        ${product.category || "Collectible"}
    </span>

    <h3 class="product-name">
        ${product.name || "Unnamed Product"}
    </h3>

    <p class="product-info">
        ${(product.year || "-")} • ${(product.grade || "-")}
    </p>

    <div class="quantity-controls">

        <button class="minus" data-index="${index}">
            −
        </button>

        <span class="quantity">
            ${product.quantity}
        </span>

        <button class="plus" data-index="${index}">
            +
        </button>

    </div>

</div>

<div class="cart-price">

    <h3 class="price">
        ${formatPrice(product.price || 0)}
    </h3>

    <button class="remove-btn"
            data-index="${index}">
        Remove
    </button>

</div>
`;
    cartItems.appendChild(card);
  });

  updateTotals();

  attachEvents();

  gsap.from(".cart-item", {
    opacity: 0,

    y: 60,

    duration: 0.8,

    stagger: 0.1,

    ease: "power3.out",
  });
}

renderCart();

/*==========================================================

                    EVENTS

==========================================================*/

function attachEvents() {
  /*---------------- PLUS ----------------*/

  document.querySelectorAll(".plus").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      cart[index].quantity++;

      saveCart();

      renderCart();
    });
  });

  /*---------------- MINUS ----------------*/

  document.querySelectorAll(".minus").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }

      saveCart();

      renderCart();
    });
  });

  /*---------------- REMOVE ----------------*/

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      gsap.to(button.closest(".cart-item"), {
        opacity: 0,

        x: 120,

        duration: 0.35,

        onComplete: () => {
          cart.splice(index, 1);

          saveCart();

          renderCart();
        },
      });
    });
  });
}

/*==========================================================

                CHECKOUT BUTTON

==========================================================*/

const checkoutBtn = document.querySelector("#checkoutBtn");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");

      return;
    }

    gsap.to(checkoutBtn, {
      scale: 1.06,

      repeat: 1,

      yoyo: true,

      duration: 0.18,
    });

    window.location.href="./cart-checkout.html"
  });
}

/*==========================================================

            CONTINUE SHOPPING

==========================================================*/

document.querySelectorAll(".continue-shopping").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    window.location.href = "products.html";
  });
});

/*==========================================================

                CLEAR CART

==========================================================*/

function clearCart() {
  cart = [];

  saveCart();

  renderCart();
}

/*==========================================================

                PAGE REFRESH

==========================================================*/

window.addEventListener("storage", () => {
  cart = JSON.parse(localStorage.getItem("cart")) || [];

  renderCart();
});

/*==========================================================

                GSAP PAGE LOAD

==========================================================*/

const intro = gsap.timeline();

intro

  .from(".navbar", {
    y: -80,

    opacity: 0,

    duration: 0.8,

    ease: "power3.out",
  })

  .from(
    ".breadcrumb",
    {
      opacity: 0,

      y: 30,

      duration: 0.6,
    },
    "-=.4",
  )

  .from(
    ".cart-hero",
    {
      opacity: 0,

      y: 50,

      duration: 0.8,
    },
    "-=.3",
  )

  .from(
    ".summary-card",
    {
      opacity: 0,

      x: 80,

      duration: 0.8,

      ease: "power3.out",
    },
    "-=.5",
  );

/*==========================================================

                FLOATING ORBS

==========================================================*/

gsap.to(".orb-one", {
  x: 50,

  y: -40,

  duration: 10,

  repeat: -1,

  yoyo: true,

  ease: "sine.inOut",
});

gsap.to(".orb-two", {
  x: -60,

  y: 35,

  duration: 12,

  repeat: -1,

  yoyo: true,

  ease: "sine.inOut",
});

gsap.to(".orb-three", {
  x: 35,

  y: -45,

  duration: 15,

  repeat: -1,

  yoyo: true,

  ease: "sine.inOut",
});

/*==========================================================

            SCROLL REVEALS

==========================================================*/

gsap.utils.toArray(".trust-card,.footer").forEach((section) => {
  gsap.from(section, {
    opacity: 0,

    y: 60,

    duration: 0.8,

    ease: "power3.out",

    scrollTrigger: {
      trigger: section,

      start: "top 85%",
    },
  });
});

/*==========================================================

            BUTTON HOVER EFFECT

==========================================================*/

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("mouseenter", () => {
    gsap.to(button, {
      scale: 1.05,

      duration: 0.2,
    });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(button, {
      scale: 1,

      duration: 0.2,
    });
  });
});

/*==========================================================

            CHECKOUT GLOW

==========================================================*/

const checkoutGlow = document.querySelector(".checkout-btn");

if (checkoutGlow) {

    gsap.to(checkoutGlow, {
        boxShadow: "0 18px 45px rgba(184,137,61,.35)",
        duration: 1.6,
        repeat: -1,
        yoyo: true
    });

}

/*==========================================================

            EMPTY CART COIN

==========================================================*/

if (document.querySelector(".empty-coin img")) {
  gsap.to(".empty-coin img", {
    rotationY: 360,

    duration: 12,

    repeat: -1,

    ease: "none",
  });
}

/*==========================================================

            CARD HOVER EFFECT

==========================================================*/

document.addEventListener("mouseover", (e) => {
  const card = e.target.closest(".cart-item");

  if (!card) return;

  gsap.to(card, {
    y: -8,

    duration: 0.3,

    ease: "power2.out",
  });
});

document.addEventListener("mouseout", (e) => {
  const card = e.target.closest(".cart-item");

  if (!card) return;

  gsap.to(card, {
    y: 0,

    duration: 0.3,

    ease: "power2.out",
  });
});

/*==========================================================

            SUMMARY PARALLAX

==========================================================*/

window.addEventListener("mousemove", (e) => {
  const card = document.querySelector(".summary-card");

  if (!card) return;

  const x = e.clientX / window.innerWidth - 0.5;

  const y = e.clientY / window.innerHeight - 0.5;

  gsap.to(card, {
    rotationY: x * 4,

    rotationX: -y * 4,

    transformPerspective: 1000,

    duration: 0.5,

    overwrite: "auto",
  });
});

/*==========================================================

            PAGE READY

==========================================================*/

console.log("NUMIS Cart Loaded Successfully");
