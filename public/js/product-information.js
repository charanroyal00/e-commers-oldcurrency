/*==========================================================

                NUMIS PRODUCT PAGE

==========================================================*/
gsap.registerPlugin(ScrollTrigger);

const API_URL = "http://127.0.0.1:8000/api";

gsap.registerPlugin(ScrollTrigger);

const wishlistButton = document.querySelector(".wishlist-btn");

let product = null;

const params = new URLSearchParams(window.location.search);

console.log(window.location.search);

const productId = params.get("id");

console.log(productId);
console.log(typeof productId);

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

    productPrice.textContent = `₹${product.price}`;

    stickyPrice.textContent = `₹${product.price}`;

    productStock.textContent =
        product.stock || "Available";

    productLabel.textContent =
        product.category_name || "";

    shortDescription.textContent =
        product.description || "";

    breadcrumbName.textContent =
        product.name;

    breadcrumbCategory.textContent =
        product.category_name || "Products";

    country.textContent =
        product.country || "-";

    year.textContent =
        product.year || "-";

    grade.textContent =
        product.grade || "-";

    rarity.textContent =
        product.rarity || "-";

    specCountry.textContent =
        product.country || "-";

    specYear.textContent =
        product.year || "-";

    specDenomination.textContent =
        product.denomination || "-";

    specMaterial.textContent =
        product.material || "-";

    specWeight.textContent =
        product.weight || "-";

    specDiameter.textContent =
        product.diameter || "-";

    specMint.textContent =
        product.mint || "-";

    specGrade.textContent =
        product.grade || "-";

    specCertificate.textContent =
        product.certificate || "-";

    specRarity.textContent =
        product.rarity || "-";

    specSeller.textContent =
        product.seller || "-";

    specStock.textContent =
        product.stock || "Available";

    historyOne.textContent =
        product.history_one || "";

    historyTwo.textContent =
        product.history_two || "";

    historyThree.textContent =
        product.history_three || "";

    const image =
        product.image ||
        product.image_url ||
        "https://placehold.co/600x600";

    mainImage.src = image;

    viewerImage.src = image;

}

/*==========================================================

                THUMBNAIL GALLERY

==========================================================*/

function createGallery() {

    thumbnailContainer.innerHTML = "";

    const image =
        product.image ||
        product.image_url ||
        "https://placehold.co/600x600";

    const thumb = document.createElement("div");

    thumb.className = "thumbnail active";

    thumb.innerHTML = `
        <img src="${image}">
    `;

    thumbnailContainer.appendChild(thumb);

}


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

                ADD TO CART

==========================================================*/

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({

    id: product.id,

    name: product.name,

    price: Number(product.price),

    image:
        product.image ||
        product.image_url,

    quantity: 1

});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

/*==========================================================

                ADD TO WISHLIST

==========================================================*/

function addToWishlist(product) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const exists = wishlist.some((item) => item.id === product.id);

  if (exists) {
    return;
  }

  wishlist.push({

    id: product.id,

    name: product.name,

    price: Number(product.price),

    image:
        product.image ||
        product.image_url

});

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  console.log("Wishlist Updated:", wishlist);
}

/*==========================================================

                BUY BUTTON

==========================================================*/

const buyButton = document.querySelector(".buy-btn");

if (buyButton) {
  buyButton.addEventListener("click", () => {
    addToCart(product);

    gsap.fromTo(
      buyButton,

      {
        scale: 1,
      },

      {
        scale: 1.08,
        duration: 0.25,
        repeat: 1,
        yoyo: true,
      },
    );

    window.location.href = "cart.html";
  });
}

if (wishlistButton) {
  wishlistButton.addEventListener("click", () => {
    addToWishlist(product);

    wishlistButton.innerHTML = "❤ Added";

    wishlistButton.style.borderColor = "#b8893d";

    wishlistButton.style.color = "#b8893d";

    gsap.fromTo(
      wishlistButton,
      { scale: 0.8 },
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
    addToCart(product);

    window.location.href = "cart.html";
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

async function loadProduct() {

    try {

        const response = await fetch(`${API_URL}/products/${productId}/`);

        if (!response.ok) {
            throw new Error("Product not found");
        }

        product = await response.json();

        populateProduct();

        createGallery();

    }

    catch(error){

        console.error(error);

        document.body.innerHTML = `
            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                height:100vh;
                flex-direction:column;
                font-family:Inter,sans-serif;
                background:#f8f5ef;
            ">

                <h1>404</h1>

                <p>Product not found.</p>

                <a href="product.html"
                style="
                    padding:12px 30px;
                    background:#b8893d;
                    color:#fff;
                    text-decoration:none;
                    border-radius:999px;
                ">
                    Back
                </a>

            </div>
        `;

    }

}

loadProduct();

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

const wishlistLink = document.querySelector(".outline");

if (wishlistLink) {
  wishlistLink.addEventListener("click", () => {
    window.location.href = "wishlist.html";
  });
}

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
