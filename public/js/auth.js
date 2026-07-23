document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       ELEMENTS
    ===================================================== */

  const registerTab = document.getElementById("registerTab");
  const loginTab = document.getElementById("loginTab");

  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const forgotForm = document.getElementById("forgotForm");
  const otpForm = document.getElementById("otpForm");

  const indicator = document.querySelector(".tab-indicator");

  const switchToLogin = document.getElementById("switchToLogin");
  const switchToRegister = document.getElementById("switchToRegister");

  const forgotBtn = document.getElementById("Forgot-Password");
  const backToLogin1 = document.getElementById("backToLogin1");
  const backToLogin2 = document.getElementById("backToLogin2");

  const forgotPasswordForm = document.getElementById("forgotPasswordForm");

  const coin = document.querySelector(".visual-coin");
  const orbitOne = document.querySelector(".orbit-one");
  const orbitTwo = document.querySelector(".orbit-two");
  const ambient = document.querySelectorAll(".ambient");

  /* =====================================================
       INTRO ANIMATION
    ===================================================== */

  const introTimeline = gsap.timeline();

  introTimeline

    .from(".auth-visual", {
      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    })

    .from(
      ".auth-panel",
      {
        x: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=1",
    )

    .from(
      ".visual-coin",
      {
        scale: 0,
        rotationY: -180,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
      },
      "-=0.7",
    )

    .from(
      ".visual-eyebrow,.visual-center h1,.visual-description",
      {
        y: 25,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.8",
    )

    .from(
      ".auth-switcher,.form-heading,form,.form-footer",
      {
        y: 25,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.7",
    );

  /* =====================================================
       CONTINUOUS ANIMATIONS
    ===================================================== */

  gsap.to(coin, {
    rotationY: "+=360",
    duration: 18,
    repeat: -1,
    ease: "none",
  });

  gsap.to(coin, {
    y: -12,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(orbitOne, {
    rotation: "+=360",
    duration: 25,
    repeat: -1,
    ease: "none",
  });

  gsap.to(orbitTwo, {
    rotation: "-=360",
    duration: 32,
    repeat: -1,
    ease: "none",
  });

  ambient.forEach((circle, index) => {
    gsap.to(circle, {
      x: index % 2 === 0 ? 50 : -50,
      y: index % 2 === 0 ? -30 : 30,
      duration: 6 + index,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  /* =====================================================
       HELPER
    ===================================================== */

  function hideAllForms() {
    registerForm.classList.remove("active");
    loginForm.classList.remove("active");
    forgotForm.classList.remove("active");
    otpForm.classList.remove("active");
  }

  /* =====================================================
       REGISTER
    ===================================================== */

  function showRegister() {
    hideAllForms();

    registerForm.classList.add("active");

    registerTab.classList.add("active");
    loginTab.classList.remove("active");

    gsap.to(indicator, {
      x: 0,
      width: registerTab.offsetWidth,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.fromTo(
      registerForm,
      {
        opacity: 0,
        x: -25,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
      },
    );
  }

  /* =====================================================
       LOGIN
    ===================================================== */

  function showLogin() {
    hideAllForms();

    loginForm.classList.add("active");

    registerTab.classList.remove("active");
    loginTab.classList.add("active");

    gsap.to(indicator, {
      x: loginTab.offsetLeft,
      width: loginTab.offsetWidth,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.fromTo(
      loginForm,
      {
        opacity: 0,
        x: 25,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
      },
    );
  }

  /* =====================================================
       FORGOT PASSWORD
    ===================================================== */

  function showForgot() {
    hideAllForms();

    forgotForm.classList.add("active");

    registerTab.classList.remove("active");
    loginTab.classList.add("active");

    gsap.fromTo(
      forgotForm,
      {
        opacity: 0,
        x: 30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
      },
    );
  }

  /* =====================================================
       OTP
    ===================================================== */

  function showOTP() {
    hideAllForms();

    otpForm.classList.add("active");

    registerTab.classList.remove("active");
    loginTab.classList.add("active");

    gsap.fromTo(
      otpForm,
      {
        opacity: 0,
        x: 30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
      },
    );
  }

  /* =====================================================
       EVENT LISTENERS
    ===================================================== */

  registerTab.addEventListener("click", showRegister);

  loginTab.addEventListener("click", showLogin);

  switchToLogin.addEventListener("click", showLogin);

  switchToRegister.addEventListener("click", showRegister);

  forgotBtn.addEventListener("click", function (e) {
    e.preventDefault();

    showForgot();
  });

  backToLogin1.addEventListener("click", function () {
    showLogin();
  });

  backToLogin2.addEventListener("click", function () {
    showLogin();
  });

  forgotPasswordForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Call backend here to send OTP

    showOTP();
  });

  /* =====================================================
       INITIAL TAB INDICATOR
    ===================================================== */

  gsap.set(indicator, {
    x: 0,
    width: registerTab.offsetWidth,
  });
});
