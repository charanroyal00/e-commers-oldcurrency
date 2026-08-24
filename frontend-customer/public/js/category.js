const API_BASE = "http://127.0.0.1:8000/api";

const params = new URLSearchParams(window.location.search);

const categoryId = params.get("id");

console.log(window.location.href);
console.log(categoryId);

const categoryName = params.get("name");

const productContainer = document.getElementById("productContainer");
const categoryContainer = document.getElementById("categoryContainer");
const searchInput = document.getElementById("searchInput");

let categories = [];

/* =============================================
            Loading Skeleton
============================================= */

function showLoading() {
    productContainer.innerHTML = "";

    for (let i = 0; i < 6; i++) {
        productContainer.innerHTML += `
            <div class="loading-card"></div>
        `;
    }
}

/* =============================================
            Render Categories
============================================= */

function renderProducts(products){

    productContainer.innerHTML = "";

    products.forEach(product=>{

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <button a="product-information.html?id=${product.id}" class="view-details-btn">
                View Details
            </button>

        `;

        card.addEventListener("click",()=>{

            window.location.href =
                `product.html?id=${product.id}`;

        });

        productContainer.appendChild(card);

    });

}

/* =============================================
            Fetch Categories
============================================= */

async function loadProducts() {
    showLoading();

    try {

        const response = await fetch(
    `${API_BASE}/categories/?category=${categoryId}`
);

        if (!response.ok) {
            throw new Error("Unable to fetch products");
        }

        const products = await response.json();


        renderProducts(products);

    }

    catch(err){

        console.error(err);

        productContainer.innerHTML = `
            <h2>Unable to load products.</h2>
        `;

    }

}

loadProducts();

/* =============================================
                Search
============================================= */

searchInput.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();

  const filtered = categories.filter((category) =>
    category.name.toLowerCase().includes(keyword),
  );

  renderProducts(filtered);
});

/* =============================================
            GSAP Animation
============================================= */

function animateCards() {
  gsap.from(".category-card", {
    y: 50,

    opacity: 0,

    stagger: 0.12,

    duration: 0.8,

    ease: "power3.out",
  });
}

/* =============================================
            Hero Animation
============================================= */

gsap.from(".hero", {
  opacity: 0,

  y: -40,

  duration: 1,
});

gsap.from(".search-box", {
  opacity: 0,

  y: 30,

  delay: 0.4,

  duration: 0.8,
});

/* =============================================
        Ambient Animation
============================================= */

gsap.to(".ambient-one", {
  x: 60,

  y: 40,

  repeat: -1,

  yoyo: true,

  duration: 8,

  ease: "sine.inOut",
});

gsap.to(".ambient-two", {
  x: -70,

  y: -30,

  repeat: -1,

  yoyo: true,

  duration: 10,

  ease: "sine.inOut",
});

gsap.to(".ambient-three", {
  y: -40,

  repeat: -1,

  yoyo: true,

  duration: 9,

  ease: "sine.inOut",
});