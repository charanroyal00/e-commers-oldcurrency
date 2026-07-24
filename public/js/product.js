/*========================================================

                NUMIS PRODUCTS

========================================================*/

gsap.registerPlugin(ScrollTrigger);

/*========================================================

                SELECTORS

========================================================*/

const heroTitle = document.querySelector("#categoryTitle");
const heroDescription = document.querySelector("#categoryDescription");
const breadcrumbCategory = document.querySelector("#breadcrumbCategory");
const productCount = document.querySelector("#productCount");
const productsGrid = document.querySelector("#productsGrid");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sort");
const heroCoin = document.querySelector(".hero-coin");
const loadButton = document.querySelector(".load-btn");

/*========================================================

            CATEGORY FROM URL

========================================================*/

const params = new URLSearchParams(window.location.search);

const currentCategory = params.get("category") || "coins";

/*========================================================

            CATEGORY CONFIG

========================================================*/

const categoryConfig = {
  coins: {
    title: "Rare Coins",

    description:
      "Discover authenticated historic coins curated from prestigious numismatic collections.",

    count: 188,
  },

  notes: {
    title: "Currency Notes",

    description:
      "Explore preserved banknotes featuring rare serials, error prints and commemorative issues.",

    count: 241,
  },

  international: {
    title: "International Currency",

    description: "Museum-grade collectibles from countries around the world.",

    count: 94,
  },

  collections: {
    title: "Premium Collections",

    description: "Handpicked collections assembled for passionate collectors.",

    count: 52,
  },

  auction: {
    title: "Live Auctions",

    description:
      "Bid on exclusive authenticated collectibles before they disappear.",

    count: 36,
  },

  blogs: {
    title: "Numismatic Journal",

    description: "Articles, history and educational content from experts.",

    count: 76,
  },
};

/*========================================================

            UPDATE HERO

========================================================*/

function updateHero() {
  const config = categoryConfig[currentCategory] || categoryConfig.coins;

  heroTitle.textContent = config.title;

  heroDescription.textContent = config.description;

  breadcrumbCategory.textContent = config.title;

  productCount.textContent = config.count;
}

updateHero();

/*========================================================

            DEMO PRODUCTS

========================================================*/

const demoProducts = [
  {
    id: 888976,

    name: "Victoria Silver Rupee",

    category: "coins",

    price: 18500,

    image: "images/demo-coin.png",

    label: "BRITISH INDIA",

    description: "Museum authenticated silver rupee from 1886.",
  },

  {
    id: 2,

    name: "Akbar Gold Mohur",

    category: "coins",

    price: 74000,

    image: "images/demo-coin2.png",

    label: "MUGHAL",

    description: "Imperial gold issue with exceptional preservation.",
  },

  {
    id: 3,

    name: "Bombay Mint Coin",

    category: "coins",

    price: 11600,

    image: "images/demo-coin3.png",

    label: "REPUBLIC",

    description: "Historic silver collectible.",
  },

  {
    id: 4,

    name: "₹10 Error Note",

    category: "notes",

    price: 32000,

    image: "images/demo-note.png",

    label: "ERROR NOTE",

    description: "Exceptional printing error.",
  },

  {
    id: 5,

    name: "₹100 Star Note",

    category: "notes",

    price: 8200,

    image: "images/demo-note2.png",

    label: "STAR NOTE",

    description: "Highly collectible preserved banknote.",
  },

  {
    id: 6,

    name: "US Dollar 1934",

    category: "international",

    price: 12800,

    image: "images/usd.png",

    label: "USA",

    description: "Historic international collectible.",
  },

  {
    id: 7,

    name: "Premium Heritage Set",

    category: "collections",

    price: 49500,

    image: "images/collection.png",

    label: "LIMITED",

    description: "Luxury curated collection.",
  },

  {
    id: 8,

    name: "Live Auction Lot #102",

    category: "auction",

    price: 25000,

    image: "images/auction.png",

    label: "LIVE",

    description: "Ending in a few hours.",
  },
];

/*========================================================

        FILTER PRODUCTS

========================================================*/

let visibleProducts = demoProducts.filter((product) => {
  if (currentCategory === "coins") return product.category === "coins";

  if (currentCategory === "notes") return product.category === "notes";

  if (currentCategory === "international")
    return product.category === "international";

  if (currentCategory === "collections")
    return product.category === "collections";

  if (currentCategory === "auction") return product.category === "auction";

  return true;
});

/*========================================================

            CREATE CARD

========================================================*/

function createCard(product, index) {
  const sizeClasses = ["large", "wide", "tall", "", ""];

  const size = sizeClasses[index % sizeClasses.length];

  return `

<article class="product-card ${size}" data-id="${product.id}">

<div class="spotlight"></div>

<div class="product-image">

<img src="${product.image}" alt="${product.name}">

</div>

<div class="product-content">

<span class="product-category">

${product.label}

</span>

<h2>

${product.name}

</h2>

<p>

${product.description}

</p>

<div class="product-bottom">

<strong>

₹${product.price.toLocaleString()}

</strong>

<a href="product-information.html?id=${product.id}">

View Details →

</a>

</div>

</div>

</article>

`;
}

/*========================================================

            RENDER PRODUCTS

========================================================*/

function renderProducts(products) {
  productsGrid.innerHTML = "";

  products.forEach((product, index) => {
    productsGrid.innerHTML += createCard(product, index);
  });
}

renderProducts(visibleProducts);

/*========================================================

                SEARCH

========================================================*/

let filteredProducts = [...visibleProducts];

function performSearch() {
  const value = searchInput.value.toLowerCase().trim();

  filteredProducts = visibleProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(value) ||
      product.label.toLowerCase().includes(value) ||
      product.description.toLowerCase().includes(value)
    );
  });

  renderProducts(filteredProducts);

  applyCardAnimations();
}

if (searchInput) {
  searchInput.addEventListener("input", performSearch);
}

/*========================================================

                SORTING

========================================================*/

function sortProducts(type) {
  switch (type) {
    case "Newest":
      filteredProducts.sort((a, b) => b.id - a.id);

      break;

    case "Oldest":
      filteredProducts.sort((a, b) => a.id - b.id);

      break;

    case "Price Low → High":
      filteredProducts.sort((a, b) => a.price - b.price);

      break;

    case "Price High → Low":
      filteredProducts.sort((a, b) => b.price - a.price);

      break;

    case "Most Rare":
      filteredProducts.sort((a, b) => b.price - a.price);

      break;

    default:
      break;
  }

  renderProducts(filteredProducts);

  applyCardAnimations();
}

if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    sortProducts(e.target.value);
  });
}

/*========================================================

                LOAD MORE

========================================================*/

let productsShown = 6;

function renderLimitedProducts() {
  const display = filteredProducts.slice(0, productsShown);

  renderProducts(display);

  applyCardAnimations();
}

productsShown = 6;

renderLimitedProducts();

if (loadButton) {
  loadButton.addEventListener("click", () => {
    productsShown += 6;

    renderLimitedProducts();

    if (productsShown >= filteredProducts.length) {
      loadButton.innerHTML = "All Products Loaded";

      loadButton.disabled = true;
    }
  });
}

/*========================================================

            FILTER CHECKBOXES

========================================================*/

const filterCheckboxes = document.querySelectorAll(
  ".filter-group input[type='checkbox']",
);

filterCheckboxes.forEach((box) => {
  box.addEventListener("change", () => {
    let active = [];

    filterCheckboxes.forEach((cb) => {
      if (cb.checked) {
        active.push(cb.parentElement.innerText.toLowerCase());
      }
    });

    if (active.length === 0) {
      filteredProducts = [...visibleProducts];

      renderLimitedProducts();

      return;
    }

    filteredProducts = visibleProducts.filter((product) => {
      const text = (
        product.name +
        product.label +
        product.description
      ).toLowerCase();

      return active.some((item) => text.includes(item));
    });

    productsShown = 6;

    renderLimitedProducts();
  });
});

/*========================================================

            PRODUCT COUNTER

========================================================*/

function updateCounter() {
  productCount.textContent = filteredProducts.length;
}

updateCounter();

/*========================================================

            CARD CLICK

========================================================*/

document.addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");

  if (!card) return;

  const id = card.dataset.id;

  window.location.href = `product-information.html?id=${id}`;
});

/*========================================================

            HERO BUTTON EFFECT

========================================================*/

const heroButtons = document.querySelectorAll(".hero-actions a");

heroButtons.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, {
      scale: 1.05,

      duration: 0.35,
    });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      scale: 1,

      duration: 0.35,
    });
  });
});

/*========================================================

            NAVBAR SCROLL

========================================================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/*========================================================

            LOAD BUTTON HOVER

========================================================*/

if (loadButton) {
  loadButton.addEventListener("mouseenter", () => {
    gsap.to(loadButton, {
      y: -6,

      scale: 1.03,

      duration: 0.3,
    });
  });

  loadButton.addEventListener("mouseleave", () => {
    gsap.to(loadButton, {
      y: 0,

      scale: 1,

      duration: 0.3,
    });
  });
}

/*========================================================

            NEWSLETTER

========================================================*/

const newsletter = document.querySelector(".newsletter button");

if (newsletter) {
  newsletter.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.querySelector(".newsletter input");

    if (email.value === "") {
      alert("Please enter your email.");

      return;
    }

    alert("Thank you for subscribing to NUMIS.");

    email.value = "";
  });
}

/*========================================================

                GSAP PAGE INTRO

========================================================*/

const intro = gsap.timeline();

intro

  .from(".navbar", {
    y: -80,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
  })

  .from(
    ".hero-content > *",
    {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: "power3.out",
    },
    "-=.6",
  )

  .from(
    ".hero-coin",
    {
      scale: 0.6,
      opacity: 0,
      rotation: -180,
      duration: 1.4,
      ease: "back.out(1.7)",
    },
    "-=1",
  )

  .from(
    ".top-filter",
    {
      y: 40,
      opacity: 0,
      duration: 0.8,
    },
    "-=.8",
  )

  .from(
    ".sidebar",
    {
      x: -60,
      opacity: 0,
      duration: 0.9,
    },
    "-=.7",
  );

/*========================================================

            PRODUCT REVEAL

========================================================*/

function applyCardAnimations() {
  gsap.utils.toArray(".product-card").forEach((card) => {
    gsap.fromTo(
      card,

      {
        opacity: 0,

        y: 70,

        scale: 0.95,
      },

      {
        opacity: 1,

        y: 0,

        scale: 1,

        duration: 0.8,

        ease: "power3.out",

        scrollTrigger: {
          trigger: card,

          start: "top 88%",
        },
      },
    );
  });
}

applyCardAnimations();

/*========================================================

            HERO COIN ROTATION

========================================================*/

if (heroCoin) {
  gsap.to(heroCoin, {
    rotation: 360,

    duration: 28,

    ease: "none",

    repeat: -1,
  });

  gsap.to(heroCoin, {
    y: -18,

    duration: 4,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut",
  });
}

/*========================================================

        FLOATING BACKGROUND

========================================================*/

gsap.utils.toArray(".background-orb").forEach((orb, index) => {
  gsap.to(orb, {
    y: index % 2 === 0 ? -45 : 45,

    x: index % 2 === 0 ? 25 : -25,

    duration: 7 + index,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut",
  });
});

/*========================================================

            CARD TILT

========================================================*/

document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 12;

    const rotateX = (y / rect.height - 0.5) * -12;

    gsap.to(card, {
      rotationY: rotateY,

      rotationX: rotateX,

      transformPerspective: 1000,

      transformOrigin: "center",

      duration: 0.35,

      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotationX: 0,

      rotationY: 0,

      duration: 0.6,

      ease: "power3.out",
    });
  });
});

/*========================================================

            SPOTLIGHT

========================================================*/

document.querySelectorAll(".product-card").forEach((card) => {
  const light = card.querySelector(".spotlight");

  if (!light) return;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    gsap.to(light, {
      left: x - 140,

      top: y - 140,

      duration: 0.15,

      ease: "none",
    });
  });
});

/*========================================================

            IMAGE PARALLAX

========================================================*/

document.querySelectorAll(".product-card").forEach((card) => {
  const image = card.querySelector("img");

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;

    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(image, {
      x: x * 22,

      y: y * 22,

      scale: 1.08,

      duration: 0.4,
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(image, {
      x: 0,

      y: 0,

      scale: 1,

      duration: 0.6,
    });
  });
});

/*========================================================

            BUTTON HOVER

========================================================*/

gsap.utils.toArray("button,a").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, {
      scale: 1.05,

      duration: 0.25,
    });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      scale: 1,

      duration: 0.25,
    });
  });
});

/*========================================================

            PAGE PARALLAX

========================================================*/

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;

  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  gsap.to(".hero-content", {
    x: x,

    y: y,

    duration: 2,

    ease: "power2.out",
  });

  gsap.to(".hero-coin", {
    x: -x,

    y: -y,

    duration: 2,

    ease: "power2.out",
  });
});

/*========================================================

            SECTION FADE

========================================================*/

gsap.utils.toArray(".newsletter,.footer").forEach((section) => {
  gsap.from(section, {
    opacity: 0,

    y: 80,

    duration: 1,

    scrollTrigger: {
      trigger: section,

      start: "top 85%",
    },
  });
});

/*========================================================

            SMOOTH SCROLL TO TOP

========================================================*/

const logo = document.querySelector(".logo");

if (logo) {
  logo.addEventListener("click", (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  });
}

