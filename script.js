/* =====================================================
   NUMIS — HERO + FOOTER ANIMATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* =================================================
       REGISTER GSAP PLUGIN
    ================================================= */

  gsap.registerPlugin(ScrollTrigger);

  /* =================================================
       SELECT ELEMENTS
    ================================================= */

  const loader = document.querySelector(".loader");

  const loaderProgress = document.querySelector(".loader-progress");

  const loaderPercentage = document.querySelector(".loader-percentage");

  const navbar = document.querySelector(".navbar");

  const coinContainer = document.querySelector(".coin-container");

  const coin = document.querySelector(".coin");

  const coinEmblem = document.querySelector(".coin-emblem");

  const coinHeading = document.querySelector(".coin-inner h1");

  const coinDivider = document.querySelector(".coin-divider");

  const coinDescription = document.querySelector(".coin-inner p");

  const heroActions = document.querySelector(".hero-actions");

  const backgroundWaves = document.querySelectorAll(".background-wave");

  const Account = document.querySelector(".nav-account");

  /* =================================================
       FEATURE CARDS
    ================================================= */

  const authenticatedCard = document.querySelector(".card-authenticated");

  const historicCard = document.querySelector(".card-historic");

  const rareCard = document.querySelector(".card-rare");

  const collectibleCard = document.querySelector(".card-collectible");

  const featureCards = [
    authenticatedCard,

    historicCard,

    rareCard,

    collectibleCard,
  ];

  /* =================================================
       CARD CONTENT
    ================================================= */

  const featureIcons = document.querySelectorAll(".feature-icon");

  const featureTop = document.querySelectorAll(".feature-top");

  const featureTitles = document.querySelectorAll(".feature-card h3");

  const featureDescriptions = document.querySelectorAll(".feature-card p");

  /* =================================================
       SAFETY CHECK
    ================================================= */

  if (
    !loader ||
    !loaderProgress ||
    !loaderPercentage ||
    !navbar ||
    !coinContainer ||
    !coin ||
    !heroActions ||
    featureCards.some((card) => !card)
  ) {
    console.error("NUMIS: Required elements are missing.");

    return;
  }

  Account.addEventListener("click" , ()=> {
    window.location.href="/registration-form.html"
  });

  /* =================================================
       INITIAL STATES
    ================================================= */

  gsap.set(navbar, {
    y: -40,

    opacity: 0,
  });

  gsap.set(coinContainer, {
    scale: 0.65,

    opacity: 0,
  });

  gsap.set(coin, {
    rotationY: -90,

    opacity: 0,
  });

  gsap.set(featureCards, {
    opacity: 0,

    y: 35,
  });

  gsap.set(heroActions, {
    opacity: 0,

    y: 30,
  });

  gsap.set(
    [coinEmblem, coinHeading, coinDivider, coinDescription],

    {
      opacity: 0,

      y: 20,
    },
  );

  gsap.set(
    [...featureIcons, ...featureTop, ...featureTitles, ...featureDescriptions],

    {
      opacity: 0,

      y: 10,
    },
  );

  /* =================================================
       LOADER PROGRESS
    ================================================= */

  const loaderObject = {
    progress: 0,
  };

  const masterTimeline = gsap.timeline();

  masterTimeline.to(
    loaderObject,

    {
      progress: 100,

      duration: 2.8,

      ease: "power2.inOut",

      onUpdate: () => {
        const progress = Math.round(loaderObject.progress);

        loaderProgress.style.width = `${progress}%`;

        loaderPercentage.textContent = `${String(progress).padStart(2, "0")}%`;
      },
    },
  );

  /* =================================================
       LOADER EXIT
    ================================================= */

  masterTimeline.to(
    loader,

    {
      opacity: 0,

      duration: 1,

      ease: "power2.inOut",

      onComplete: () => {
        loader.style.visibility = "hidden";

        loader.style.pointerEvents = "none";
      },
    },
  );

  /* =================================================
       NAVBAR REVEAL
    ================================================= */

  masterTimeline.to(
    navbar,

    {
      y: 0,

      opacity: 1,

      duration: 1.1,

      ease: "power3.out",
    },
  );

  /* =================================================
       COIN CONTAINER REVEAL
    ================================================= */

  masterTimeline.to(
    coinContainer,

    {
      scale: 1,

      opacity: 1,

      duration: 1.4,

      ease: "expo.out",
    },

    "-=0.6",
  );

  /* =================================================
       COIN REVEAL
    ================================================= */

  masterTimeline.to(
    coin,

    {
      rotationY: 0,

      opacity: 1,

      duration: 1.6,

      ease: "power4.out",
    },

    "-=1",
  );

  /* =================================================
       COIN CONTENT REVEAL
    ================================================= */

  masterTimeline.to(
    coinEmblem,

    {
      opacity: 1,

      y: 0,

      duration: 0.6,

      ease: "power3.out",
    },

    "-=0.8",
  );

  masterTimeline.to(
    coinHeading,

    {
      opacity: 1,

      y: 0,

      duration: 0.8,

      ease: "power3.out",
    },

    "-=0.4",
  );

  masterTimeline.to(
    coinDivider,

    {
      opacity: 1,

      y: 0,

      duration: 0.5,

      ease: "power3.out",
    },

    "-=0.45",
  );

  masterTimeline.to(
    coinDescription,

    {
      opacity: 1,

      y: 0,

      duration: 0.7,

      ease: "power3.out",
    },

    "-=0.3",
  );

  /* =================================================
       CARD REVEAL
    ================================================= */

  masterTimeline.to(
    authenticatedCard,

    {
      opacity: 1,

      y: 0,

      duration: 0.8,

      ease: "power3.out",
    },

    "-=0.6",
  );

  masterTimeline.to(
    historicCard,

    {
      opacity: 1,

      y: 0,

      duration: 0.8,

      ease: "power3.out",
    },

    "-=0.55",
  );

  masterTimeline.to(
    rareCard,

    {
      opacity: 1,

      y: 0,

      duration: 0.8,

      ease: "power3.out",
    },

    "-=0.55",
  );

  masterTimeline.to(
    collectibleCard,

    {
      opacity: 1,

      y: 0,

      duration: 0.8,

      ease: "power3.out",
    },

    "-=0.55",
  );

  /* =================================================
       CARD CONTENT REVEAL
    ================================================= */

  masterTimeline.to(
    featureIcons,

    {
      opacity: 1,

      y: 0,

      duration: 0.5,

      stagger: 0.08,

      ease: "power3.out",
    },

    "-=0.5",
  );

  masterTimeline.to(
    [...featureTop, ...featureTitles, ...featureDescriptions],

    {
      opacity: 1,

      y: 0,

      duration: 0.6,

      stagger: 0.04,

      ease: "power3.out",
    },

    "-=0.35",
  );

  /* =================================================
       BUTTON REVEAL
    ================================================= */

  masterTimeline.to(
    heroActions,

    {
      opacity: 1,

      y: 0,

      duration: 0.8,

      ease: "power3.out",
    },

    "-=0.3",
  );

  /* =================================================
       CONTINUOUS 3D COIN ROTATION
    ================================================= */

  gsap.to(
    coin,

    {
      rotationY: "+=360",

      duration: 16,

      repeat: -1,

      ease: "none",
    },
  );

  /* =================================================
       COIN FLOATING EFFECT
    ================================================= */

  gsap.to(
    coinContainer,

    {
      y: -8,

      duration: 3,

      repeat: -1,

      yoyo: true,

      ease: "sine.inOut",
    },
  );

  /* =================================================
       CARD FLOATING EFFECT
    ================================================= */

  featureCards.forEach((card, index) => {
    gsap.to(
      card,

      {
        y: -3,

        duration: 3 + index * 0.25,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut",

        delay: index * 0.2,
      },
    );
  });

  /* =================================================
       ICON FLOATING EFFECT
    ================================================= */

  featureIcons.forEach((icon, index) => {
    gsap.to(
      icon,

      {
        y: -3,

        rotation: 4,

        duration: 2.5,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut",

        delay: index * 0.2,
      },
    );
  });

  /* =================================================
       BACKGROUND WAVE ANIMATION
    ================================================= */

  if (backgroundWaves.length) {
    gsap.to(
      backgroundWaves,

      {
        x: 15,

        duration: 5,

        repeat: -1,

        yoyo: true,

        stagger: 0.5,

        ease: "sine.inOut",
      },
    );
  }

  /* =================================================
       HERO BUTTON HOVER
    ================================================= */

  document

    .querySelectorAll(".primary-button, .secondary-button")

    .forEach((button) => {
      button.addEventListener(
        "mouseenter",

        () => {
          gsap.to(
            button,

            {
              y: -4,

              duration: 0.3,

              ease: "power2.out",
            },
          );
        },
      );

      button.addEventListener(
        "mouseleave",

        () => {
          gsap.to(
            button,

            {
              y: 0,

              duration: 0.3,

              ease: "power2.out",
            },
          );
        },
      );
    });

    /* ==========================================================
        NUMIS SHOWCASE ANIMATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

gsap.registerPlugin(ScrollTrigger);

/*=============================================
        ELEMENTS
=============================================*/

const cards = gsap.utils.toArray(".editorial-card");
const images = gsap.utils.toArray(".card-image img");
const section = document.querySelector(".showcase-section");

/*=============================================
        INITIAL STATE
=============================================*/

gsap.set(cards,{
    opacity:0,
    y:80,
    scale:.95
});

gsap.set(".showcase-heading .heading-tag",{
    opacity:0,
    y:25
});

gsap.set(".showcase-heading h2",{
    opacity:0,
    y:40
});

gsap.set(".showcase-heading p",{
    opacity:0,
    y:30
});

/*=============================================
        HEADING
=============================================*/

const headingTL = gsap.timeline({
    scrollTrigger:{
        trigger:section,
        start:"top 75%"
    }
});

headingTL
.to(".showcase-heading .heading-tag",{
    opacity:1,
    y:0,
    duration:.6
})
.to(".showcase-heading h2",{
    opacity:1,
    y:0,
    duration:.9,
    ease:"power3.out"
},"-=.3")
.to(".showcase-heading p",{
    opacity:1,
    y:0,
    duration:.8
},"-=.5");

/*=============================================
        CARDS STAGGER
=============================================*/

gsap.to(cards,{

    opacity:1,

    y:0,

    scale:1,

    stagger:.18,

    duration:1,

    ease:"power3.out",

    scrollTrigger:{
        trigger:".editorial-layout",
        start:"top 72%"
    }

});

/*=============================================
        FLOATING IMAGES
=============================================*/

images.forEach((img,index)=>{

gsap.to(img,{

    y:-10,

    duration:3+(index*.25),

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

});

});

/*=============================================
        CARD HOVER
=============================================*/

cards.forEach(card=>{

const img=card.querySelector("img");
const info=card.querySelector(".card-info");

card.addEventListener("mouseenter",()=>{

gsap.to(img,{
    scale:1.08,
    y:-12,
    duration:.6,
    ease:"power2.out"
});

gsap.to(info,{
    opacity:1,
    y:0,
    duration:.45
});

});

card.addEventListener("mouseleave",()=>{

gsap.to(img,{
    scale:1,
    y:0,
    rotationX:0,
    rotationY:0,
    duration:.6
});

gsap.to(info,{
    opacity:0,
    y:25,
    duration:.3
});

});

});

/*=============================================
        3D PARALLAX
=============================================*/

cards.forEach(card=>{

const img = card.querySelector("img");

card.addEventListener("mousemove",(e)=>{

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const rotateY = ((x / rect.width) - 0.5) * 18;
const rotateX = ((0.5 - y / rect.height)) * 18;

gsap.to(img,{
    rotationY:rotateY,
    rotationX:rotateX,
    transformPerspective:1000,
    transformOrigin:"center center",
    duration:.35,
    ease:"power2.out"
});

});

card.addEventListener("mouseleave",()=>{

gsap.to(img,{
    rotationX:0,
    rotationY:0,
    duration:.7,
    ease:"power3.out"
});

});

});

/*=============================================
        SPOTLIGHT FOLLOW
=============================================*/

const light=document.createElement("div");

light.className="mouse-light";

document.body.appendChild(light);

document.addEventListener("mousemove",(e)=>{

gsap.to(light,{
    x:e.clientX-175,
    y:e.clientY-175,
    duration:.35,
    ease:"power2.out"
});

});

/*=============================================
        SUBTLE CARD FLOAT
=============================================*/

cards.forEach((card,index)=>{

gsap.to(card,{

    y:-6,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut",

    duration:4+(index*.3)

});

});

/*=============================================
        PARALLAX ON SCROLL
=============================================*/

images.forEach((img,index)=>{

gsap.to(img,{

    yPercent:-12,

    ease:"none",

    scrollTrigger:{

        trigger:img,

        start:"top bottom",

        end:"bottom top",

        scrub:true

    }

});

});

});

  /* =================================================
       FOOTER ELEMENTS
    ================================================= */

  const archiveFooter = document.querySelector(".archive-footer");

  const footerGlow = document.querySelector(".footer-glow");

  const footerCta = document.querySelector(".footer-cta");

  const footerMain = document.querySelector(".footer-main");

  const footerBottom = document.querySelector(".footer-bottom");

  const footerLinks = document.querySelectorAll(".footer-column");

  const footerRings = document.querySelectorAll(".footer-ring");

  /* =================================================
       FOOTER ANIMATION
    ================================================= */

  if (archiveFooter) {
    /* INITIAL STATES */

    gsap.set(footerCta, {
      opacity: 0,

      y: 60,
    });

    gsap.set(footerMain, {
      opacity: 0,

      y: 40,
    });

    gsap.set(footerBottom, {
      opacity: 0,
    });

    gsap.set(footerLinks, {
      opacity: 0,

      y: 25,
    });

    /* FOOTER SCROLL REVEAL */

    const footerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: archiveFooter,

        start: "top 75%",

        toggleActions: "play none none reverse",
      },
    });

    footerTimeline.to(
      footerCta,

      {
        opacity: 1,

        y: 0,

        duration: 1.2,

        ease: "power3.out",
      },
    );

    footerTimeline.to(
      footerMain,

      {
        opacity: 1,

        y: 0,

        duration: 1,

        ease: "power3.out",
      },

      "-=0.65",
    );

    footerTimeline.to(
      footerLinks,

      {
        opacity: 1,

        y: 0,

        duration: 0.7,

        stagger: 0.12,

        ease: "power3.out",
      },

      "-=0.65",
    );

    footerTimeline.to(
      footerBottom,

      {
        opacity: 1,

        duration: 0.8,

        ease: "power2.out",
      },

      "-=0.35",
    );

    /* GLOW BREATHING */

    if (footerGlow) {
      gsap.to(
        footerGlow,

        {
          scale: 1.25,

          opacity: 0.65,

          duration: 5,

          repeat: -1,

          yoyo: true,

          ease: "sine.inOut",
        },
      );
    }

    /* CTA FLOAT */

    gsap.to(
      footerCta,

      {
        y: -5,

        duration: 4,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut",
      },
    );

    /* ARCHIVE RING ONE */

    if (footerRings[0]) {
      gsap.to(
        footerRings[0],

        {
          rotation: 360,

          duration: 90,

          repeat: -1,

          ease: "none",
        },
      );
    }

    /* ARCHIVE RING TWO */

    if (footerRings[1]) {
      gsap.to(
        footerRings[1],

        {
          rotation: -360,

          duration: 120,

          repeat: -1,

          ease: "none",
        },
      );
    }
  }

  /* =================================================
       FOOTER CTA BUTTON HOVER
    ================================================= */

  const footerButton = document.querySelector(".footer-cta-button");

  if (footerButton) {
    footerButton.addEventListener(
      "mouseenter",

      () => {
        gsap.to(
          footerButton,

          {
            y: -4,

            scale: 1.03,

            duration: 0.3,

            ease: "power2.out",
          },
        );
      },
    );

    footerButton.addEventListener(
      "mouseleave",

      () => {
        gsap.to(
          footerButton,

          {
            y: 0,

            scale: 1,

            duration: 0.3,

            ease: "power2.out",
          },
        );
      },
    );
  }

  /* =================================================
       BACK TO TOP
    ================================================= */

  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    backToTop.addEventListener(
      "click",

      () => {
        window.scrollTo({
          top: 0,

          behavior: "smooth",
        });
      },
    );
  }
});
