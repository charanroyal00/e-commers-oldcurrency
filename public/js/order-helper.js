/*==========================================================
                      NUMIS ORDER SYSTEM
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inject Styles
  const style = document.createElement("style");
  style.textContent = `
    .order-modal {
      position: fixed;
      inset: 0;
      background: rgba(31, 31, 31, 0.7);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(4px);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      font-family: 'Inter', sans-serif;
    }
    .order-modal.active {
      opacity: 1;
      visibility: visible;
    }
    .order-modal-content {
      background: #fffdf9;
      border: 1px solid #e5dac8;
      max-width: 500px;
      width: 90%;
      border-radius: 12px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      color: #1d1d1d;
    }
    .order-modal-header {
      background: #f8f5ef;
      border-bottom: 1px solid #e5dac8;
      padding: 18px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .order-modal-header h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 22px;
      font-weight: 700;
      color: #1d1d1d;
      margin: 0;
    }
    .order-modal-close {
      background: none;
      border: none;
      font-size: 22px;
      cursor: pointer;
      color: #777;
      line-height: 1;
      padding: 0;
    }
    .order-modal-body {
      padding: 24px;
      max-height: 75vh;
      overflow-y: auto;
    }
    .order-summary-box {
      background: #f8f5ef;
      border: 1px solid #e5dac8;
      border-radius: 8px;
      padding: 14px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .order-summary-image {
      width: 60px;
      height: 60px;
      border-radius: 6px;
      border: 1px solid #e5dac8;
      object-cover: cover;
      background: #fffdf9;
    }
    .order-summary-info {
      flex: 1;
    }
    .order-summary-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 16px;
      font-weight: bold;
      margin: 0 0 4px 0;
    }
    .order-summary-price {
      font-size: 13px;
      font-weight: bold;
      color: #b8893d;
    }
    .order-form-grid {
      display: grid;
      gap: 14px;
      grid-template-cols: 1fr;
    }
    @media (min-width: 480px) {
      .order-form-grid {
        grid-template-columns: 1fr 1fr;
      }
      .col-span-2 {
        grid-column: span 2;
      }
    }
    .order-form-group {
      display: flex;
      flex-direction: column;
    }
    .order-form-group label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #777;
      margin-bottom: 6px;
    }
    .order-form-group input, .order-form-group textarea, .order-form-group select {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #e5dac8;
      background: #fffdf9;
      border-radius: 6px;
      font-size: 13px;
      color: #1d1d1d;
      font-family: inherit;
    }
    .order-form-group input:focus, .order-form-group textarea:focus, .order-form-group select:focus {
      outline: none;
      border-color: #b8893d;
      box-shadow: 0 0 0 2px rgba(184, 137, 61, 0.1);
    }
    .order-total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      padding-top: 15px;
      border-top: 1px solid #e5dac8;
      font-size: 14px;
    }
    .order-total-price {
      font-size: 18px;
      font-weight: bold;
      color: #1d1d1d;
    }
    .order-btn-submit {
      width: 100%;
      padding: 12px;
      background: #b8893d;
      color: #fffdf9;
      border: none;
      font-weight: 600;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 20px;
    }
    .order-btn-submit:hover {
      background: #9d712f;
    }
    .order-success-screen {
      text-align: center;
      padding: 20px 10px;
    }
    .order-success-icon {
      font-size: 40px;
      color: #b8893d;
      margin-bottom: 12px;
    }
    .order-success-screen h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 24px;
      color: #b8893d;
      margin: 0 0 10px 0;
    }
    .order-success-screen p {
      font-size: 13px;
      color: #555;
      margin-bottom: 8px;
    }
    .order-success-badge {
      display: inline-block;
      background: #e5dac8;
      color: #1d1d1d;
      padding: 6px 14px;
      border-radius: 99px;
      font-weight: bold;
      font-size: 12px;
      letter-spacing: 1px;
      margin: 10px 0 20px 0;
    }
  `;
  document.head.appendChild(style);

  // 2. Inject Modal HTML
  const modalHTML = `
    <div class="order-modal" id="orderModal">
      <div class="order-modal-content">
        <div class="order-modal-header">
          <h2>Place Acquisition Order</h2>
          <button class="order-modal-close" id="orderModalClose">&times;</button>
        </div>
        <div class="order-modal-body" id="orderModalBody">
          <div class="order-summary-box">
            <img class="order-summary-image" id="orderProductImage" src="" alt="">
            <div class="order-summary-info">
              <h4 class="order-summary-title" id="orderProductName"></h4>
              <p class="order-summary-price" id="orderProductPriceDisplay"></p>
            </div>
          </div>
          
          <form id="orderForm" class="order-form-grid" novalidate>
            <div class="order-form-group col-span-2">
              <label for="ordName">Full Name *</label>
              <input type="text" id="ordName" required placeholder="Enter your full name">
            </div>
            
            <div class="order-form-group">
              <label for="ordPhone">Mobile Number *</label>
              <input type="tel" id="ordPhone" required placeholder="e.g. +91 98765 43210">
            </div>
            
            <div class="order-form-group">
              <label for="ordEmail">Email Address *</label>
              <input type="email" id="ordEmail" required placeholder="e.g. collector@example.com">
            </div>

            <div class="order-form-group col-span-2">
              <label for="ordAddress">Delivery Address *</label>
              <textarea id="ordAddress" rows="2" required placeholder="Complete building, street address, and landmark"></textarea>
            </div>

            <div class="order-form-group">
              <label for="ordCity">City *</label>
              <input type="text" id="ordCity" required placeholder="City">
            </div>

            <div class="order-form-group">
              <label for="ordState">State *</label>
              <input type="text" id="ordState" required placeholder="State">
            </div>

            <div class="order-form-group">
              <label for="ordPin">PIN Code *</label>
              <input type="text" id="ordPin" required placeholder="PIN Code">
            </div>

            <div class="order-form-group">
              <label for="ordQuantity">Quantity *</label>
              <select id="ordQuantity">
                <option value="1">1</option>
              </select>
            </div>

            <div class="order-total-row col-span-2">
              <span>Estimated Total:</span>
              <strong class="order-total-price" id="orderTotalPrice">₹0</strong>
            </div>

            <button type="submit" class="order-btn-submit col-span-2">Submit Order Acquisition</button>
          </form>
        </div>
      </div>
    </div>
  `;
  const container = document.createElement("div");
  container.innerHTML = modalHTML;
  document.body.appendChild(container.firstElementChild);

  // 3. Elements and State
  const modal = document.getElementById("orderModal");
  const modalClose = document.getElementById("orderModalClose");
  const orderForm = document.getElementById("orderForm");
  
  let currentProduct = {
    id: "",
    name: "",
    originalPrice: 0,
    discountPercentage: 0,
    sellingPrice: 0,
    maxStock: 1
  };

  // Close modal
  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Handle quantity change
  const ordQuantity = document.getElementById("ordQuantity");
  const orderTotalPrice = document.getElementById("orderTotalPrice");
  
  ordQuantity.addEventListener("change", () => {
    const qty = parseInt(ordQuantity.value) || 1;
    const total = currentProduct.sellingPrice * qty;
    orderTotalPrice.textContent = `₹${total.toLocaleString()}`;
  });

  // 4. Global open function
  window.openOrderModal = function(productId, productName, productPrice, productImage, originalPrice = 0, discountPercentage = 0, stock = 1) {
    currentProduct = {
      id: productId,
      name: productName,
      originalPrice: parseFloat(originalPrice) || parseFloat(productPrice),
      discountPercentage: parseFloat(discountPercentage) || 0,
      sellingPrice: parseFloat(productPrice),
      maxStock: parseInt(stock) || 1
    };

    // Populate UI details
    document.getElementById("orderProductName").textContent = productName;
    document.getElementById("orderProductImage").src = productImage;
    document.getElementById("orderProductPriceDisplay").textContent = `₹${currentProduct.sellingPrice.toLocaleString()}`;
    document.getElementById("orderTotalPrice").textContent = `₹${currentProduct.sellingPrice.toLocaleString()}`;

    // Populate quantities based on stock
    ordQuantity.innerHTML = "";
    const limit = Math.min(currentProduct.maxStock, 10);
    for (let i = 1; i <= limit; i++) {
      const opt = document.createElement("option");
      opt.value = i.toString();
      opt.textContent = i.toString();
      ordQuantity.appendChild(opt);
    }
    if (limit === 0) {
      const opt = document.createElement("option");
      opt.value = "0";
      opt.textContent = "Sold Out";
      ordQuantity.appendChild(opt);
    }

    // Reset Form
    orderForm.reset();

    // Show modal
    modal.classList.add("active");
  };

  // 5. Submit Order
  orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameVal = document.getElementById("ordName").value.trim();
    const phoneVal = document.getElementById("ordPhone").value.trim();
    const emailVal = document.getElementById("ordEmail").value.trim();
    const addressVal = document.getElementById("ordAddress").value.trim();
    const cityVal = document.getElementById("ordCity").value.trim();
    const stateVal = document.getElementById("ordState").value.trim();
    const pinVal = document.getElementById("ordPin").value.trim();
    const qty = parseInt(ordQuantity.value) || 1;

    if (!nameVal || !phoneVal || !emailVal || !addressVal || !cityVal || !stateVal || !pinVal) {
      alert("Please fill out all required fields.");
      return;
    }

    if (qty <= 0) {
      alert("This item is currently sold out.");
      return;
    }

    const payload = {
      product: parseInt(currentProduct.id),
      quantity: qty,
      customer_name: nameVal,
      customer_phone: phoneVal,
      customer_email: emailVal,
      delivery_address: addressVal,
      city: cityVal,
      state: stateVal,
      pin_code: pinVal,
      original_price: currentProduct.originalPrice.toFixed(2),
      discount_percentage: currentProduct.discountPercentage.toFixed(2),
      selling_price: currentProduct.sellingPrice.toFixed(2),
      total_amount: (currentProduct.sellingPrice * qty).toFixed(2)
    };

    const submitBtn = orderForm.querySelector("button[type='submit']");
    submitBtn.textContent = "Processing acquisition...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error(`NUMIS Order API non-JSON Response. URL: ${response.url}, Status: ${response.status}. Response:`, text);
        throw new Error("Unable to place your order right now. Please try again.");
      }

      const result = await response.json();

      if (!response.ok) {
        let errorMsg = result.detail || result.quantity || result.product || "";
        if (!errorMsg && typeof result === "object") {
          errorMsg = Object.values(result).flat().join(" ");
        }
        throw new Error(errorMsg || "Acquisition request failed.");
      }

      // Show success screen
      const modalBody = document.getElementById("orderModalBody");
      modalBody.innerHTML = `
        <div class="order-success-screen">
          <div class="order-success-icon">✓</div>
          <h3>Acquisition Confirmed</h3>
          <p>Your order for historical currency has been placed successfully.</p>
          <div class="order-success-badge">${result.order_id}</div>
          <p><strong>Item:</strong> ${currentProduct.name}</p>
          <p><strong>Quantity:</strong> ${qty}</p>
          <p><strong>Total Amount:</strong> ₹${(currentProduct.sellingPrice * qty).toLocaleString()}</p>
          <p style="margin-top: 15px; font-size:11px; color:#b8893d; font-weight:600; text-transform:uppercase;">Opening Admin WhatsApp ledger...</p>
        </div>
      `;

      // Open WhatsApp click to chat
      if (result.whatsapp_url) {
        setTimeout(() => {
          window.open(result.whatsapp_url, "_blank");
        }, 1500);
      }

    } catch (err) {
      alert("Error: " + err.message);
      submitBtn.textContent = "Submit Order Acquisition";
      submitBtn.disabled = false;
    }
  });
});
