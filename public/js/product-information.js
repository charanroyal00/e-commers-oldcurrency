/*==========================================================

                NUMIS PRODUCT PAGE

==========================================================*/

gsap.registerPlugin(ScrollTrigger);

/*==========================================================

                URL PARAMETERS

==========================================================*/

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

/*==========================================================

                DEMO DATABASE

        Replace with Backend Later

==========================================================*/

const products = [
  {
    id: "888976",

    category: "coins",

    label: "AUTHENTICATED",

    name: "Victoria Silver Rupee",

    price: "₹18,500",

    country: "India",

    year: "1886",

    denomination: "1 Rupee",

    material: "Silver",

    weight: "11.66 g",

    diameter: "30.5 mm",

    mint: "Bombay Mint",

    grade: "UNC",

    certificate: "Verified",

    rarity: "Extremely Rare",

    seller: "NUMIS Official",

    stock: "Only 4 Available",

    description:
      "An exceptional British India Victoria Silver Rupee preserved in remarkable museum-grade condition. A highly sought-after collectible admired for its historical significance and rarity.",

    historyOne:
      "Minted during the reign of Queen Victoria, this silver rupee circulated across British India and remains one of the most iconic numismatic pieces in Indian history.",

    historyTwo:
      "Every specimen listed on NUMIS undergoes careful authentication, grading, and historical verification before becoming part of our premium archive.",

    historyThree:
      "Because of its excellent preservation, limited availability, and strong collector demand, this coin represents both historical heritage and long-term collectible value.",

    images: [
      "images/products/victoria-1.png",

      "images/products/victoria-2.png",

      "images/products/victoria-3.png",

      "images/products/victoria-4.png",
    ],
  },

  {
    id: "coin002",

    category: "coins",

    label: "RARE",

    name: "Mughal Gold Mohur",

    price: "₹65,000",

    country: "India",

    year: "1712",

    denomination: "Mohur",

    material: "Gold",

    weight: "10.95 g",

    diameter: "26 mm",

    mint: "Delhi",

    grade: "XF",

    certificate: "Verified",

    rarity: "Very Rare",

    seller: "NUMIS Auctions",

    stock: "Only 1 Available",

    description:
      "Original Mughal Empire gold coin featuring exquisite Persian inscriptions.",

    historyOne: "Collected from an old royal estate.",

    historyTwo: "Professionally graded by international experts.",

    historyThree: "An important collectible for advanced numismatists.",

    images: [
      "images/products/mughal-1.png",

      "images/products/mughal-2.png",

      "images/products/mughal-3.png",
    ],
  },

  {
    id: "note001",

    category: "notes",

    label: "COLLECTIBLE",

    name: "1943 One Rupee Note",

    price: "₹12,800",

    country: "India",

    year: "1943",

    denomination: "1 Rupee",

    material: "Paper",

    weight: "-",

    diameter: "-",

    mint: "British India",

    grade: "UNC",

    certificate: "Verified",

    rarity: "Rare",

    seller: "NUMIS",

    stock: "12 Available",

    description:
      "Historic British India paper currency in exceptional condition.",

    historyOne: "One of the earliest collectible paper notes.",

    historyTwo: "Highly demanded among collectors.",

    historyThree: "Museum quality preservation.",

    images: [
      "images/products/note1.png",

      "images/products/note2.png",

      "images/products/note3.png",
    ],
  },
];

/*==========================================================

                FIND PRODUCT

==========================================================*/

const product = products.find((item) => item.id === productId);

/*==========================================================

            PRODUCT NOT FOUND

==========================================================*/

if (!product) {
  document.body.innerHTML = `

<div style="
display:flex;
justify-content:center;
align-items:center;
height:100vh;
font-family:Inter,sans-serif;
background:#f8f5ef;
flex-direction:column;
">

<h1 style="font-size:60px;">404</h1>

<p>Product not found.</p>

<a href="products.html"
style="
margin-top:30px;
padding:14px 30px;
background:#b8893d;
color:white;
text-decoration:none;
border-radius:999px;
">

Back to Products

</a>

</div>

`;

  throw new Error("Invalid Product ID");
}

/*==========================================================

                ELEMENTS

==========================================================*/

const mainImage = document.querySelector("#mainImage");

const productName = document.querySelector("#productName");

const productPrice = document.querySelector("#productPrice");

const stickyPrice = document.querySelector("#stickyPrice");

const productStock = document.querySelector("#productStock");

const productLabel = document.querySelector("#productLabel");

const shortDescription = document.querySelector("#shortDescription");

const thumbnailContainer = document.querySelector("#thumbnailContainer");

const breadcrumbName = document.querySelector("#breadcrumbName");

const breadcrumbCategory = document.querySelector("#breadcrumbCategory");

/* Quick Specs */

const country = document.querySelector("#country");

const year = document.querySelector("#year");

const grade = document.querySelector("#grade");

const rarity = document.querySelector("#rarity");

/* Specifications */

const specCountry = document.querySelector("#specCountry");

const specYear = document.querySelector("#specYear");

const specDenomination = document.querySelector("#specDenomination");

const specMaterial = document.querySelector("#specMaterial");

const specWeight = document.querySelector("#specWeight");

const specDiameter = document.querySelector("#specDiameter");

const specMint = document.querySelector("#specMint");

const specGrade = document.querySelector("#specGrade");

const specCertificate = document.querySelector("#specCertificate");

const specRarity = document.querySelector("#specRarity");

const specSeller = document.querySelector("#specSeller");

const specStock = document.querySelector("#specStock");

/* History */

const historyOne = document.querySelector("#historyOne");

const historyTwo = document.querySelector("#historyTwo");

const historyThree = document.querySelector("#historyThree");

/*==========================================================

                POPULATE PAGE

==========================================================*/

function populateProduct() {
  productName.textContent = product.name;

  productPrice.textContent = product.price;

  stickyPrice.textContent = product.price;

  productStock.textContent = product.stock;

  productLabel.textContent = product.label;

  shortDescription.textContent = product.description;

  breadcrumbName.textContent = product.name;

  breadcrumbCategory.textContent = product.category;

  country.textContent = product.country;

  year.textContent = product.year;

  grade.textContent = product.grade;

  rarity.textContent = product.rarity;

  specCountry.textContent = product.country;

  specYear.textContent = product.year;

  specDenomination.textContent = product.denomination;

  specMaterial.textContent = product.material;

  specWeight.textContent = product.weight;

  specDiameter.textContent = product.diameter;

  specMint.textContent = product.mint;

  specGrade.textContent = product.grade;

  specCertificate.textContent = product.certificate;

  specRarity.textContent = product.rarity;

  specSeller.textContent = product.seller;

  specStock.textContent = product.stock;

  historyOne.textContent = product.historyOne;

  historyTwo.textContent = product.historyTwo;

  historyThree.textContent = product.historyThree;

  mainImage.src = product.images[0];

  document.querySelector("#viewerImage").src = product.images[0];
}

populateProduct();

/*==========================================================

                THUMBNAIL GALLERY

==========================================================*/

function createGallery() {
  thumbnailContainer.innerHTML = "";

  product.images.forEach((image, index) => {
    const thumb = document.createElement("div");

    thumb.className = "thumbnail";

    if (index === 0) {
      thumb.classList.add("active");
    }

    thumb.innerHTML = `

            <img src="${image}" alt="${product.name}">

        `;

    thumb.addEventListener("click", () => {
      document.querySelectorAll(".thumbnail").forEach((item) => {
        item.classList.remove("active");
      });

      thumb.classList.add("active");

      mainImage.classList.add("loading");

      gsap.to(mainImage, {
        opacity: 0,

        scale: 0.92,

        duration: 0.25,

        onComplete: () => {
          mainImage.src = image;

          document.querySelector("#viewerImage").src = image;
        },
      });
    });

    thumbnailContainer.appendChild(thumb);
  });
}

createGallery();

/*==========================================================

            MAIN IMAGE LOADED

==========================================================*/

mainImage.addEventListener("load", () => {
  mainImage.classList.remove("loading");

  gsap.fromTo(
    mainImage,

    {
      opacity: 0,

      scale: 0.92,

      rotateY: -18,
    },

    {
      opacity: 1,

      scale: 1,

      rotateY: 0,

      duration: 0.65,

      ease: "power3.out",
    },
  );
});

/*==========================================================

                RELATED PRODUCTS

==========================================================*/

const relatedGrid = document.querySelector("#relatedGrid");

function renderRelatedProducts() {
  if (!relatedGrid) return;

  relatedGrid.innerHTML = "";

  const related = products.filter((item) => item.id !== product.id).slice(0, 4);

  related.forEach((item) => {
    const card = document.createElement("div");

    card.className = "related-card";

    card.innerHTML = `

            <img src="${item.images[0]}" alt="${item.name}">

            <div class="related-content">

                <span>${item.category.toUpperCase()}</span>

                <h3>${item.name}</h3>

                <strong>${item.price}</strong>

                <button>

                    View Product

                </button>

            </div>

        `;

    card.addEventListener("click", () => {
      window.location.href = `product-information.html?id=${item.id}`;
    });

    relatedGrid.appendChild(card);
  });
}

renderRelatedProducts();

/*==========================================================

                BUY BUTTON

==========================================================*/

const buyButton = document.querySelector(".buy-btn");

if (buyButton) {
  buyButton.addEventListener("click", () => {
    gsap.fromTo(
      buyButton,

      {
        scale: 1,
      },

      {
        scale: 1.06,

        yoyo: true,

        repeat: 1,

        duration: 0.18,
      },
    );

    alert(`Proceeding to checkout for\n\n${product.name}`);
  });
}

/*==========================================================

                WISHLIST

==========================================================*/

const wishlistButton = document.querySelector(".wishlist-btn");

if (wishlistButton) {
  wishlistButton.addEventListener("click", () => {
    wishlistButton.innerHTML = "❤ Added";

    wishlistButton.style.borderColor = "#b8893d";

    wishlistButton.style.color = "#b8893d";

    gsap.fromTo(
      wishlistButton,

      {
        scale: 0.8,
      },

      {
        scale: 1,

        duration: 0.35,

        ease: "back.out(2)",
      },
    );
  });
}

/*==========================================================

            STICKY BUY BUTTON

==========================================================*/

const stickyBuy = document.querySelector(".floating-purchase button");

if (stickyBuy) {
  stickyBuy.addEventListener("click", () => {
    buyButton.click();
  });
}

/*==========================================================

            VIEWER ROTATE BUTTON

==========================================================*/

const viewerButton = document.querySelector(".viewer-btn");

const viewerImage = document.querySelector("#viewerImage");

if (viewerButton && viewerImage) {
  viewerButton.addEventListener("click", () => {
    gsap.to(
      viewerImage,

      {
        rotationY: "+=360",

        duration: 1.4,

        ease: "power2.inOut",
      },
    );
  });
}

/*==========================================================

                PAGE LOAD ANIMATIONS

==========================================================*/

gsap.set(".navbar", {
  y: -60,
  opacity: 0,
});

gsap.set(".breadcrumb", {
  y: 40,
  opacity: 0,
});

gsap.set(".gallery-wrapper", {
  x: -80,
  opacity: 0,
});

gsap.set(".product-information", {
  x: 80,
  opacity: 0,
});

gsap.set(".floating-purchase", {
  x: 80,
  opacity: 0,
});

const intro = gsap.timeline();

intro
  .to(".navbar", {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
  })

  .to(
    ".breadcrumb",
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
    },
    "-=.3",
  )

  .to(
    ".gallery-wrapper",
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    },
    "-=.2",
  )

  .to(
    ".product-information",
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    },
    "-=.8",
  )

  .to(
    ".floating-purchase",
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
    },
    "-=.7",
  );

/*==========================================================

                FLOATING IMAGE

==========================================================*/

gsap.to(mainImage, {
  y: -15,

  duration: 3,

  repeat: -1,

  yoyo: true,

  ease: "sine.inOut",
});

/*==========================================================

                CONTINUOUS ROTATION

==========================================================*/

gsap.to(mainImage, {
  rotationY: "+=360",

  duration: 20,

  ease: "none",

  repeat: -1,

  transformOrigin: "center center",
});

/*==========================================================

                GLOW

==========================================================*/

gsap.to(".coin-glow", {
  scale: 1.08,

  opacity: 0.8,

  duration: 4,

  repeat: -1,

  yoyo: true,

  ease: "sine.inOut",
});

/*==========================================================

                BACKGROUND ORBS

==========================================================*/

gsap.to(".orb-one", {
  x: 40,

  y: -50,

  duration: 14,

  repeat: -1,

  yoyo: true,

  ease: "sine.inOut",
});

gsap.to(".orb-two", {
  x: -50,

  y: 40,

  duration: 16,

  repeat: -1,

  yoyo: true,

  ease: "sine.inOut",
});

gsap.to(".orb-three", {
  x: 20,

  y: -30,

  duration: 18,

  repeat: -1,

  yoyo: true,

  ease: "sine.inOut",
});

/*==========================================================

                IMAGE TILT

==========================================================*/

const imageCard = document.querySelector(".main-image-card");

if (imageCard) {
  imageCard.addEventListener("mousemove", (e) => {
    const rect = imageCard.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 18;

    const rotateX = (y / rect.height - 0.5) * -18;

    gsap.to(imageCard, {
      rotationY: rotateY,

      rotationX: rotateX,

      transformPerspective: 1000,

      transformOrigin: "center",

      duration: 0.4,
    });
  });

  imageCard.addEventListener("mouseleave", () => {
    gsap.to(imageCard, {
      rotationX: 0,

      rotationY: 0,

      duration: 0.6,

      ease: "power3.out",
    });
  });
}

/*==========================================================

                SCROLL REVEALS

==========================================================*/

gsap.utils
  .toArray(".product-section,.certificate-section,.viewer-section,.footer")
  .forEach((section) => {
    gsap.from(section, {
      opacity: 0,

      y: 80,

      duration: 1,

      ease: "power3.out",

      scrollTrigger: {
        trigger: section,

        start: "top 80%",
      },
    });
  });

/*==========================================================

            SPECIFICATION CARDS

==========================================================*/

gsap.from(".spec-card", {
  scrollTrigger: {
    trigger: ".specifications-grid",

    start: "top 80%",
  },

  opacity: 0,

  y: 60,

  duration: 0.8,

  stagger: 0.08,

  ease: "power3.out",
});

/*==========================================================

            RELATED CARDS

==========================================================*/

gsap.from(".related-card", {
  scrollTrigger: {
    trigger: ".related-grid",

    start: "top 85%",
  },

  opacity: 0,

  y: 80,

  scale: 0.9,

  stagger: 0.12,

  duration: 0.8,

  ease: "power3.out",
});

/*==========================================================

            CERTIFICATE BADGE

==========================================================*/

gsap.to(".certificate-badge", {
  rotation: 360,

  duration: 40,

  repeat: -1,

  ease: "none",
});

/*==========================================================

                PARALLAX

==========================================================*/

window.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth - 0.5;

  const y = e.clientY / window.innerHeight - 0.5;

  gsap.to(".background-orb", {
    x: x * 40,

    y: y * 40,

    duration: 3,

    overwrite: "auto",
  });
});

/*==========================================================

                BUTTON HOVER

==========================================================*/

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, {
      scale: 1.04,

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

/*==========================================================

            PREMIUM PAGE READY

==========================================================*/

console.log("NUMIS Product Page Loaded Successfully");
