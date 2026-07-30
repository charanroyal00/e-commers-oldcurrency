gsap.registerPlugin(ScrollTrigger);

/*==========================================================

                    CHECKOUT DATA

==========================================================*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/*==========================================================

                    ELEMENTS

==========================================================*/

/*==========================================================

                    ELEMENTS

==========================================================*/

const checkoutItems = document.querySelector("#checkoutItems");

const subtotal = document.querySelector("#subtotal");

const grandTotal = document.querySelector("#grandTotal");

const checkoutContainer = document.querySelector(".checkout-container");

const emptyCheckout = document.querySelector("#emptyCheckout");


let shippingCharge = 0;
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
  localStorage.setItem(
    "cart",

    JSON.stringify(cart),
  );
}


/*==========================================================

                UPDATE TOTALS

==========================================================*/

function updateTotals() {
  let total = 0;

  cart.forEach((product) => {
    total += Number(product.price) * Number(product.quantity);
  });

  if (subtotal) {
    subtotal.textContent = formatPrice(total);
  }

  if (grandTotal) {
    grandTotal.textContent = formatPrice(total);
  }

  if (shippingCost) {
    shippingCost.textContent = "Free";
  }
}

/*==========================================================

                EMPTY CART

==========================================================*/

function checkEmptyCart() {
  if (cart.length === 0) {
    if (checkoutContainer) {
      checkoutContainer.style.display = "none";
    }

    if (emptyCheckout) {
      emptyCheckout.classList.remove("hidden");
    }
  } else {
    if (checkoutContainer) {
      checkoutContainer.style.display = "grid";
    }

    if (emptyCheckout) {
      emptyCheckout.classList.add("hidden");
    }
  }
}

/*==========================================================

                RENDER ORDER ITEMS

==========================================================*/

function renderCheckout() {
  if (!checkoutItems) return;

  checkoutItems.innerHTML = "";

  checkEmptyCart();

  if (cart.length === 0) {
    updateTotals();

    return;
  }

  cart.forEach((product, index) => {
    const item = document.createElement("article");

    item.className = "checkout-item";

    item.innerHTML = `

<div class="checkout-image">

    <img src="${product.image}"

         alt="${product.name}">

</div>

<div class="checkout-details">

    <span class="product-category">

        ${product.category}

    </span>

    <h3>

        ${product.name}

    </h3>

    <p>

        ${product.year} • ${product.grade}

    </p>

    <small>

        Qty : ${product.quantity}

    </small>

</div>

<div class="checkout-price">

    ${formatPrice(product.price * product.quantity)}

</div>

`;

    checkoutItems.appendChild(item);
  });

  updateTotals();
}

/*==========================================================

                RENDER ORDER ITEMS

==========================================================*/

function renderCheckout() {
  if (!checkoutItems) return;

  checkoutItems.innerHTML = "";

  checkEmptyCart();

  if (cart.length === 0) {
    checkoutItems.innerHTML = `

            <p class="empty-message">

                Your cart is empty.

            </p>

        `;

    updateTotals();

    return;
  }

  cart.forEach((product, index) => {
    const card = document.createElement("article");

card.className = "checkout-item";

card.innerHTML = `

<div class="checkout-image">

    <img src="${product.image}" alt="${product.name}">

</div>

<div class="checkout-details">

    <span class="product-category">

        ${product.category}

    </span>

    <h3>

        ${product.name}

    </h3>

    <p>

        ${product.year} • ${product.grade}

    </p>

    <div class="checkout-bottom">

        <span>Qty : ${product.quantity}</span>

        <strong>${formatPrice(product.price)}</strong>

    </div>

</div>

`;

    checkoutItems.appendChild(card);
  });

  updateTotals();

  gsap.from(".checkout-product", {
    opacity: 0,

    y: 40,

    duration: 0.7,

    stagger: 0.08,

    ease: "power3.out",
  });
}

renderCheckout();

/*==========================================================

                STORAGE SYNC

==========================================================*/

window.addEventListener("storage", () => {
  cart = JSON.parse(localStorage.getItem("cart")) || [];

  renderCheckout();
});

/*==========================================================

            DELIVERY CHARGES

==========================================================*/


const deliveryCards = document.querySelectorAll(".delivery-card");

const shippingCost = document.querySelector("#shippingCost");

deliveryCards.forEach((card) => {
  card.addEventListener("click", () => {
    deliveryCards.forEach((item) => item.classList.remove("active"));

    card.classList.add("active");

    const option = card.querySelector("input").value;

    if (option === "standard") {
      shippingCharge = 0;

      shippingCost.textContent = "Free";
    } else if (option === "express") {
      shippingCharge = 499;

      shippingCost.textContent = formatPrice(499);
    } else {
      shippingCharge = 999;

      shippingCost.textContent = formatPrice(999);
    }

    updateTotals();
  });
});

/*==========================================================

            UPDATE TOTALS

==========================================================*/

function updateTotals() {
  let subtotalAmount = 0;

  cart.forEach((item) => {
    subtotalAmount += item.price * item.quantity;
  });

  subtotal.textContent = formatPrice(subtotalAmount);

  grandTotal.textContent = formatPrice(subtotalAmount + shippingCharge);
}

/*==========================================================

            FORM VALIDATION

==========================================================*/

const checkoutForm = document.querySelector("#checkoutForm");

function validateForm() {
  const fullName = document.querySelector("#fullName").value.trim();

  const email = document.querySelector("#email");

  const phone = document.querySelector("#phone").value.trim();

  const address = document.querySelector("#address").value.trim();

  const city = document.querySelector("#city").value.trim();

  const state = document.querySelector("#state").value.trim();

  const pincode =
    document.querySelector("#pincode") || document.querySelector("#zip");

  if (fullName === "") {
    alert("Please enter your full name.");

    return false;
  }

  if (email && email.value.trim() === "") {
    alert("Please enter your email address.");

    return false;
  }

  if (phone.length < 10) {
    alert("Please enter a valid phone number.");

    return false;
  }

  if (address === "") {
    alert("Please enter your address.");

    return false;
  }

  if (city === "") {
    alert("Please enter your city.");

    return false;
  }

  if (state === "") {
    alert("Please enter your state.");

    return false;
  }

  if (pincode && pincode.value.trim().length !== 6) {
    alert("Please enter a valid PIN Code.");

    return false;
  }

  return true;
}

updateTotals();

/*==========================================================

            PROCEED TO PAYMENT

==========================================================*/

const paymentBtn = document.querySelector("#paymentBtn");

if (paymentBtn) {
  paymentBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");

      return;
    }

    if (!validateForm()) {
      return;
    }

    const customerDetails = {
      fullName: document.querySelector("#fullName").value.trim(),

      email: document.querySelector("#email")
        ? document.querySelector("#email").value.trim()
        : "",

      phone: document.querySelector("#phone").value.trim(),

      address: document.querySelector("#address").value.trim(),

      city: document.querySelector("#city").value.trim(),

      state: document.querySelector("#state").value.trim(),

      pincode: document.querySelector("#pincode")
        ? document.querySelector("#pincode").value.trim()
        : document.querySelector("#zip").value.trim(),

      shipping: shippingCharge,

      total: grandTotal.textContent,
    };

    localStorage.setItem(
      "checkoutDetails",

      JSON.stringify(customerDetails),
    );

    gsap
      .timeline()

      .to(paymentBtn, {
        scale: 1.05,

        duration: 0.18,
      })

      .to(paymentBtn, {
        scale: 1,

        duration: 0.18,
      })

      .to(paymentBtn, {
        background: "#2f6f42",

        duration: 0.35,
      });

    paymentBtn.innerHTML = "Preparing Secure Payment...";

    paymentBtn.disabled = true;

    setTimeout(() => {
      /*
            ==================================================
                    RAZORPAY WILL BE CALLED HERE
            ==================================================
            */

      alert("Redirecting to Secure Payment Gateway...");

      // window.location.href="payment.html";
    }, 1000);
  });
}

/*==========================================================

                PAGE LOAD ANIMATION

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
    ".checkout-hero",
    {
      opacity: 0,

      y: 50,

      duration: 0.8,
    },
    "-=.3",
  )

  .from(
    ".checkout-container",
    {
      opacity: 0,

      y: 60,

      duration: 1,

      ease: "power3.out",
    },
    "-=.4",
  )

  .from(
    ".summary-card",
    {
      opacity: 0,

      x: 80,

      duration: 0.8,

      ease: "power3.out",
    },
    "-=.7",
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

gsap.utils.toArray(".checkout-card,.trust-card,.footer").forEach((section) => {
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

                FORM INPUT EFFECTS

==========================================================*/

document.querySelectorAll("input,textarea,select").forEach((input) => {
  input.addEventListener("focus", () => {
    gsap.to(input, {
      scale: 1.02,

      duration: 0.25,
    });
  });

  input.addEventListener("blur", () => {
    gsap.to(input, {
      scale: 1,

      duration: 0.25,
    });
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

            SUMMARY CARD PARALLAX

==========================================================*/

window.addEventListener("mousemove", (e) => {
  const card = document.querySelector(".summary-card");

  if (!card) return;

  const x = e.clientX / window.innerWidth - 0.5;

  const y = e.clientY / window.innerHeight - 0.5;

  gsap.to(card, {
    rotationY: x * 5,

    rotationX: -y * 5,

    transformPerspective: 1000,

    duration: 0.5,

    overwrite: "auto",
  });
});

/*==========================================================

            PAYMENT BUTTON GLOW

==========================================================*/

if (paymentBtn) {
  gsap.to(paymentBtn, {
    boxShadow: "0 18px 45px rgba(184,137,61,.35)",

    duration: 1.6,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut",
  });
}

/*==========================================================

            TRUST CARD HOVER

==========================================================*/

document.querySelectorAll(".trust-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      y: -10,

      duration: 0.3,

      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      y: 0,

      duration: 0.3,

      ease: "power2.out",
    });
  });
});

/*==========================================================

                PAGE READY

==========================================================*/

console.log("NUMIS Checkout Loaded Successfully");
