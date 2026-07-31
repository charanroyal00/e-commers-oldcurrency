gsap.registerPlugin(ScrollTrigger);

/*==========================================================

                    DEMO ORDER DATA

==========================================================*/

let orders = [
  {
    id: "NUM-240731-001",

    date: "31 July 2026",

    status: "Delivered",

    total: 39500,

    items: [
      {
        id: 1,

        name: "Victoria Silver Rupee",

        category: "British India Coin",

        year: "1886",

        grade: "UNC",

        quantity: 1,

        price: 18500,

        image: "images/products/coin1.png",
      },

      {
        id: 2,

        name: "King George V Rupee",

        category: "British India Coin",

        year: "1918",

        grade: "XF",

        quantity: 1,

        price: 21000,

        image: "images/products/coin2.png",
      },
    ],
  },

  {
    id: "NUM-240725-002",

    date: "25 July 2026",

    status: "Processing",

    total: 76000,

    items: [
      {
        id: 3,

        name: "Mughal Gold Mohur",

        category: "Mughal Empire",

        year: "1707",

        grade: "AU",

        quantity: 1,

        price: 76000,

        image: "images/products/coin3.png",
      },
    ],
  },
];

/*==========================================================

                    ELEMENTS

==========================================================*/

const ordersContainer = document.querySelector("#ordersContainer");

const totalOrders = document.querySelector("#totalOrders");

const totalSpent = document.querySelector("#totalSpent");

const totalItems = document.querySelector("#totalItems");

const orderCount = document.querySelector("#orderCount");

const emptyOrders = document.querySelector("#emptyOrders");

const ordersSection = document.querySelector(".orders-section");

/*==========================================================

                    FORMAT PRICE

==========================================================*/

function formatPrice(price) {
  return "₹" + Number(price).toLocaleString("en-IN");
}

/*==========================================================

                    UPDATE STATS

==========================================================*/

function updateStats() {
  totalOrders.textContent = orders.length;

  orderCount.textContent = `${orders.length} Order${orders.length !== 1 ? "s" : ""}`;

  let investment = 0;

  let collectibles = 0;

  orders.forEach((order) => {
    investment += order.total;

    order.items.forEach((item) => {
      collectibles += item.quantity;
    });
  });

  totalSpent.textContent = formatPrice(investment);

  totalItems.textContent = collectibles;
}

/*==========================================================

                    EMPTY CHECK

==========================================================*/

function checkEmptyOrders() {
  if (orders.length === 0) {
    ordersSection.classList.add("hidden");

    emptyOrders.classList.remove("hidden");
  } else {
    ordersSection.classList.remove("hidden");

    emptyOrders.classList.add("hidden");
  }
}

/*==========================================================

                    RENDER ORDERS

==========================================================*/

function renderOrders() {
  ordersContainer.innerHTML = "";

  checkEmptyOrders();

  updateStats();

  if (orders.length === 0) {
    return;
  }

  orders.forEach((order) => {
    const card = document.createElement("div");

    card.className = "order-card";

    let productsHTML = "";

    order.items.forEach((item) => {
      productsHTML += `

            <div class="order-product">

                <img src="${item.image}" alt="${item.name}">

                <div class="product-details">

                    <span class="product-category">

                        ${item.category}

                    </span>

                    <h4>

                        ${item.name}

                    </h4>

                    <p>

                        ${item.year} • ${item.grade}

                    </p>

                    <div class="product-meta">

                        <span>Quantity : ${item.quantity}</span>

                    </div>

                </div>

                <div class="product-price">

                    <h3>

                        ${formatPrice(item.price)}

                    </h3>

                </div>

            </div>

            `;
    });

    const statusClass =
      order.status === "Delivered"
        ? "status-delivered"
        : order.status === "Processing"
          ? "status-processing"
          : order.status === "Shipped"
            ? "status-shipped"
            : "status-cancelled";

    card.innerHTML = `

        <div class="order-top">

            <div class="order-left">

                <h3>

                    Order #${order.id}

                </h3>

                <p>

                    Placed on ${order.date}

                </p>

            </div>

            <span class="order-status ${statusClass}">

                ${order.status}

            </span>

        </div>

        <div class="order-products">

            ${productsHTML}

        </div>

        <div class="order-bottom">

            <div class="order-total">

                <span>

                    Grand Total

                </span>

                <h2>

                    ${formatPrice(order.total)}

                </h2>

            </div>

            <div class="order-actions">

                <button class="track-btn">

                    Track Order

                </button>

                <button class="invoice-btn">

                    Download Invoice

                </button>

            </div>

        </div>

        `;

    ordersContainer.appendChild(card);
  });
}

/*==========================================================

                BUTTON EVENTS

==========================================================*/

function attachEvents() {
  document.querySelectorAll(".track-btn").forEach((button) => {
    button.addEventListener("click", () => {
      alert("Tracking feature will be integrated with the backend.");
    });
  });

  document.querySelectorAll(".invoice-btn").forEach((button) => {
    button.addEventListener("click", () => {
      alert("Invoice download will be available after payment integration.");
    });
  });
}

/*==========================================================

                INITIALIZE PAGE

==========================================================*/

renderOrders();

attachEvents();

/*==========================================================

                PAGE LOAD ANIMATION

==========================================================*/

const intro = gsap.timeline();

intro

  .from(".navbar", {
    y: -80,


    duration: 0.8,

    ease: "power3.out",
  })

  .from(
    ".breadcrumb",
    {
      y: 30,


      duration: 0.6,
    },
    "-=.4",
  )

  .from(
    ".orders-hero",
    {
      y: 40,


      duration: 0.8,
    },
    "-=.3",
  )

  .from(
    ".stat-card",
    {
      y: 60,


      stagger: 0.15,

      duration: 0.8,

      ease: "power3.out",
    },
    "-=.3",
  )

  .from(
    ".order-card",
    {
      y: 70,


      stagger: 0.18,

      duration: 0.8,

      ease: "power3.out",
    },
    "-=.4",
  );

/*==========================================================

                HOVER EFFECTS

==========================================================*/

document.addEventListener("mouseover", (e) => {
  if (e.target.closest(".order-card")) {
    gsap.to(e.target.closest(".order-card"), {
      y: -8,

      duration: 0.3,

      overwrite: "auto",
    });
  }
});

document.addEventListener("mouseout", (e) => {
  if (e.target.closest(".order-card")) {
    gsap.to(e.target.closest(".order-card"), {
      y: 0,

      duration: 0.3,

      overwrite: "auto",
    });
  }
});

/*==========================================================

                FLOATING ORBS

==========================================================*/

gsap.to(".orb-one", {
  x: 45,

  y: -35,

  duration: 10,

  repeat: -1,

  yoyo: true,

  ease: "sine.inOut",
});

gsap.to(".orb-two", {
  x: -55,

  y: 30,

  duration: 12,

  repeat: -1,

  yoyo: true,

  ease: "sine.inOut",
});

gsap.to(".orb-three", {
  x: 40,

  y: -45,

  duration: 15,

  repeat: -1,

  yoyo: true,

  ease: "sine.inOut",
});

/*==========================================================

                SCROLL REVEAL

==========================================================*/

gsap.utils.toArray(".trust-card,.footer").forEach((section) => {
  gsap.from(section, {

    y: 70,

    duration: 0.8,

    ease: "power3.out",

    scrollTrigger: {
      trigger: section,

      start: "top 85%",
    },
  });
});

/*==========================================================

                STAT CARD HOVER

==========================================================*/

document.querySelectorAll(".stat-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      scale: 1.03,

      duration: 0.25,
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,

      duration: 0.25,
    });
  });
});

/*==========================================================

                PAGE READY

==========================================================*/

console.log("NUMIS Order History Loaded Successfully");
