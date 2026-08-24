const API_BASE = "http://127.0.0.1:8000/api";
let forgotEmail = "";

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

  const resetForm = document.getElementById("resetForm");

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
    resetForm.classList.remove("active");
}

  /* =====================================================
       REGISTER
    ===================================================== */

    function showReset() {

    hideAllForms();

    resetForm.classList.add("active");

    gsap.fromTo(
        resetForm,
        {
            opacity: 0,
            x: 30,
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.5,
        }
    );

}

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

 forgotPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  forgotEmail = document.getElementById("forgotEmail").value.trim();

  try {
    const response = await fetch(`${API_BASE}/forgot-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: forgotEmail,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("OTP Sent Successfully");
      showOTP();
    } else {
      alert(data.email?.[0] || data.message || "Unable to send OTP");
    }
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
});

  /* =====================================================
       INITIAL TAB INDICATOR
    ===================================================== */

  gsap.set(indicator, {
    x: 0,
    width: registerTab.offsetWidth,
  });
});

const registerForm = document.getElementById("registerFormElement");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("registerEmail").value.trim();
  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value;
  const phone = document.getElementById("registerContact").value.trim();

  try {
    const response = await fetch(`${API_BASE}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        phone,
        role: "customer",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration Successful!");

      registerForm.reset();

      document.getElementById("loginTab").click();
    } else {
      console.log(data);

      alert(
        data.username?.[0] ||
          data.email?.[0] ||
          data.password?.[0] ||
          "Registration Failed",
      );
    }
  } catch (error) {
    console.error(error);

    alert("Unable to connect to server.");
  }
});

const loginForm = document.getElementById("loginFormElement");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username_login = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch(`${API_BASE}/login/`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
    username: username_login,
    password: password,
}),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      alert("Login Successful!");

      window.location.href = "../index.html";
    } else {
      console.log(data);

      alert("Invalid Credentials");
    }
  } catch (error) {
    console.error(error);

    alert("Unable to connect to server.");
  }
});

const otpVerifyForm = document.getElementById("otpVerifyForm");

otpVerifyForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const otp =
    document.getElementById("otp1").value +
    document.getElementById("otp2").value +
    document.getElementById("otp3").value +
    document.getElementById("otp4").value +
    document.getElementById("otp5").value +
    document.getElementById("otp6").value;

  try {
    const response = await fetch(`${API_BASE}/verify-otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: forgotEmail,
        otp: otp,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("OTP Verified");

      document.getElementById("otpForm").classList.remove("active");
      document.getElementById("resetForm").classList.add("active");
    } else {
      alert(data.detail || data.non_field_errors?.[0] || "Invalid OTP");
    }
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
});

const resetPasswordForm = document.getElementById("resetPasswordForm");

resetPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newPassword = document.getElementById("newPassword").value;

  try {
    const response = await fetch(`${API_BASE}/reset-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: forgotEmail,
        new_password: newPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Password Reset Successful");

      document.getElementById("loginTab").click();
    } else {
      alert(data.detail || data.message || "Unable to reset password");
    }
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
});
