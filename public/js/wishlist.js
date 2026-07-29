gsap.registerPlugin(ScrollTrigger);

/*==========================================================

                    WISHLIST DATA

==========================================================*/

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/*==========================================================

                    ELEMENTS

==========================================================*/

const wishlistItems = document.querySelector("#wishlistItems");

const wishlistCount = document.querySelector("#wishlistCount");

const savedItems = document.querySelector("#savedItems");

const estimatedValue = document.querySelector("#estimatedValue");

const emptyWishlist = document.querySelector("#emptyWishlist");

const wishlistContainer = document.querySelector(".wishlist-container");

/*==========================================================

                    FORMAT PRICE

==========================================================*/

function formatPrice(price) {
  return "₹" + Number(price).toLocaleString("en-IN");
}

/*==========================================================

                    SAVE WISHLIST

==========================================================*/

function saveWishlist() {
  localStorage.setItem(
    "wishlist",

    JSON.stringify(wishlist),
  );
}

/*==========================================================

                    UPDATE SUMMARY

==========================================================*/

function updateSummary() {
  let total = 0;

  wishlist.forEach((product) => {
    total += Number(product.price);
  });

  wishlistCount.textContent = `${wishlist.length} Item${wishlist.length !== 1 ? "s" : ""}`;

  savedItems.textContent = wishlist.length;

  estimatedValue.textContent = formatPrice(total);
}

/*==========================================================

                    EMPTY CHECK

==========================================================*/

function checkEmptyWishlist() {
  if (wishlist.length === 0) {
    wishlistContainer.style.display = "none";

    emptyWishlist.classList.remove("hidden");
  } else {
    wishlistContainer.style.display = "grid";

    emptyWishlist.classList.add("hidden");
  }
}

/*==========================================================

                    RENDER WISHLIST

==========================================================*/

function renderWishlist() {
  wishlistItems.innerHTML = "";

  checkEmptyWishlist();

  if (wishlist.length === 0) {
    updateSummary();

    return;
  }

  wishlist.forEach((product, index) => {
    const card = document.createElement("article");

    card.className = "wishlist-item";

    card.innerHTML = `

<div class="wishlist-image">

    <img src="${product.image}"

         alt="${product.name}">

</div>

<div class="wishlist-details">

    <span class="product-category">

        ${product.category}

    </span>

    <h3 class="product-name">

        ${product.name}

    </h3>

    <p class="product-info">

        ${product.year} • ${product.grade}

    </p>

</div>

<div class="wishlist-actions">

    <h3 class="price">

        ${formatPrice(product.price)}

    </h3>

    <button class="move-cart-btn"

            data-index="${index}">

        Move To Cart

    </button>

    <button class="remove-btn"

            data-index="${index}">

        Remove

    </button>

</div>

`;

    wishlistItems.appendChild(card);
  });

  updateSummary();
}

/*==========================================================

                    EVENTS

==========================================================*/

function attachEvents() {
  /*------------------------------------------------------

                    MOVE TO CART

    ------------------------------------------------------*/

  document.querySelectorAll(".move-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      const product = wishlist[index];

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: product.id,

          name: product.name,

          category: product.category,

          year: product.year,

          grade: product.grade,

          price: Number(product.price),

          image: product.image,

          quantity: 1,
        });
      }

      localStorage.setItem(
        "cart",

        JSON.stringify(cart),
      );

      wishlist.splice(index, 1);

      saveWishlist();

      renderWishlist();
    });
  });

  /*------------------------------------------------------

                    REMOVE ITEM

    ------------------------------------------------------*/

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      gsap.to(
        button.closest(".wishlist-item"),

        {
          opacity: 0,

          x: 100,

          duration: 0.35,

          onComplete: () => {
            wishlist.splice(index, 1);

            saveWishlist();

            renderWishlist();
          },
        },
      );
    });
  });

  /*------------------------------------------------------

                CARD HOVER

    ------------------------------------------------------*/

  document.querySelectorAll(".wishlist-item").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -8,

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

  /*------------------------------------------------------

                BUTTON HOVER

    ------------------------------------------------------*/

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
}

/*==========================================================

                    RENDER PAGE

==========================================================*/

renderWishlist();

attachEvents();

if (document.querySelectorAll(".wishlist-item").length) {
  gsap.from(".wishlist-item", {
    opacity: 0,

    y: 60,

    stagger: 0.12,

    duration: 0.8,

    ease: "power3.out",
  });
}

/*==========================================================

                MOVE ALL TO CART

==========================================================*/

const moveAllBtn = document.querySelector("#moveAllBtn");

if (moveAllBtn) {
  moveAllBtn.addEventListener("click", () => {
    if (wishlist.length === 0) {
      alert("Your wishlist is empty.");

      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    wishlist.forEach((product) => {
      const existing = cart.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: product.id,

          name: product.name,

          category: product.category,

          year: product.year,

          grade: product.grade,

          price: Number(product.price),

          image: product.image,

          quantity: 1,
        });
      }
    });

    localStorage.setItem(
      "cart",

      JSON.stringify(cart),
    );

    wishlist = [];

    saveWishlist();

    renderWishlist();

    attachEvents();

    gsap.from(".wishlist-item", {
      opacity: 0,

      y: 50,

      stagger: 0.08,

      duration: 0.6,

      ease: "power3.out",
    });
  });
}

/*==========================================================

                CLEAR WISHLIST

==========================================================*/

function clearWishlist() {
  wishlist = [];

  saveWishlist();

  renderWishlist();

  attachEvents();
}

/*==========================================================

                STORAGE SYNC

==========================================================*/

window.addEventListener("storage", () => {
  wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  renderWishlist();

  attachEvents();
});

/*==========================================================

            CONTINUE SHOPPING LINKS

==========================================================*/

document.querySelectorAll(".continue-shopping").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (link.getAttribute("href")) return;

    e.preventDefault();

    window.location.href = "product.html";
  });
});

/*==========================================================

                SUMMARY BUTTON EFFECT

==========================================================*/

if (moveAllBtn) {
  moveAllBtn.addEventListener("mouseenter", () => {
    gsap.to(moveAllBtn, {
      scale: 1.04,

      duration: 0.2,
    });
  });

  moveAllBtn.addEventListener("mouseleave", () => {
    gsap.to(moveAllBtn, {
      scale: 1,

      duration: 0.2,
    });
  });
}

/*==========================================================

                PAGE LOAD ANIMATIONS

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
    ".wishlist-hero",

    {
      opacity: 0,

      y: 50,

      duration: 0.8,
    },

    "-=.3",
  )

  .from(
    ".wishlist-summary",

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

            SUMMARY CARD PARALLAX

==========================================================*/

window.addEventListener("mousemove", (e) => {
  const card = document.querySelector(".wishlist-summary");

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

                BUTTON GLOW

==========================================================*/

gsap.to(
  ".checkout-btn",

  {
    boxShadow: "0 18px 45px rgba(184,137,61,.35)",

    duration: 1.6,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut",
  },
);

/*==========================================================

            EMPTY COIN ANIMATION

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

                PAGE READY

==========================================================*/

console.log("NUMIS Wishlist Loaded Successfully");
