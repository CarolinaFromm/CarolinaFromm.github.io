/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

// ========== SIDEBAR CART FUNKTIONER ==========
function renderSidebarCart() {
  const cartData = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartCountEl = document.querySelector(".cart-count");
  const sidebarBody = document.querySelector(".offcanvas-body");

  const totalPrice = cartData.reduce((sum, item) => sum + item.quantity * item.price, 0);
  if (cartCountEl) {
    cartCountEl.textContent = cartData.reduce((sum, item) => sum + item.quantity, 0);
  }

  if (!sidebarBody) return;

  if (cartData.length === 0) {
    sidebarBody.innerHTML = `<p class="text-center">Din varukorg är tom</p>`;
    return;
  }

  let itemsHtml = cartData.map((item, index) => `
    <div class="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <div>${item.name}</div>
        <div class="small">
          <button class="btn btn-sm btn-outline-secondary me-1" onclick="updateQuantity(${index}, -1)">-</button>
          ${item.quantity}
          <button class="btn btn-sm btn-outline-secondary ms-1" onclick="updateQuantity(${index}, 1)">+</button>
        </div>
        <small>${item.price} €/st</small>
      </div>
      <div>
        ${item.quantity * item.price} €
        <button class="btn btn-sm btn-danger ms-2" onclick="removeItem(${index})">&times;</button>
      </div>
    </div>
  `).join("");

  sidebarBody.innerHTML = `
    <div class="list-group mb-3">${itemsHtml}</div>
    <div class="d-flex justify-content-between fw-bold px-2 mb-2">
      <span>Totalt:</span>
      <span class="text-danger">${totalPrice.toFixed(2)} €</span>
    </div>
    <div class="d-grid px-2 mb-2">
      <a href="cart.html" class="btn btn-dark fw-bold">Till kassan</a>
      <button class="btn btn-outline-danger mt-2" onclick="clearCart()">Töm varukorg</button>
    </div>
  `;
}
window.renderSidebarCart = renderSidebarCart; // Gör tillgänglig globalt

function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  if (!cart[index]) return;

  cart[index].quantity += change;
  if (cart[index].quantity <= 0) cart.splice(index, 1);

  localStorage.setItem("cartItems", JSON.stringify(cart));
  renderSidebarCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  renderSidebarCart();
}

function clearCart() {
  localStorage.removeItem("cartItems");
  renderSidebarCart();
}

// ========== DOMContentLoaded ==========
document.addEventListener("DOMContentLoaded", () => {
  renderSidebarCart();

  // ========== API: Lista produkter ==========
  const productContainer = document.getElementById("product-list");
  const apiUrl = "https://fakestoreapi.com/products";

  if (productContainer) {
    fetch(apiUrl)
      .then(response => response.json())
      .then(products => {
        productContainer.innerHTML = "";
        products.forEach(product => {
          const productHTML = `
            <div class="col mb-5">
              <div class="card h-100">
                <img class="card-img-top" src="${product.image}" alt="${product.title}">
                <div class="card-body p-4">
                  <div class="text-center">
                    <h5 class="fw-bolder">${product.title}</h5>
                    <p>${product.price} €</p>
                  </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div class="text-center">
                    <a class="btn btn-outline-dark mt-auto" href="product.html?name=${encodeURIComponent(product.title)}&image=${encodeURIComponent(product.image)}&description=${encodeURIComponent(product.description)}&price=${product.price}">KÖP</a>
                  </div>
                </div>
              </div>
            </div>`;
          productContainer.innerHTML += productHTML;
        });
      })
      .catch(error => console.error("Fel vid hämtning av produkter:", error));
  }

  // ========== PRODUCT.HTML: Visa vald produkt ==========
  if (window.location.pathname.includes("product.html")) {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const image = params.get('image');
    const description = params.get('description');
    const price = params.get('price');

    if (name) document.getElementById('product-title').textContent = decodeURIComponent(name);
    if (image) document.getElementById('product-image').src = decodeURIComponent(image);
    if (description) document.getElementById('product-description').textContent = decodeURIComponent(description);
    if (price) document.getElementById('product-price').textContent = `Pris: ${price} €`;

    // LÄGG TILL I VARUKORG
    document.getElementById("addToCartBtn")?.addEventListener("click", () => {
      const title = document.getElementById("product-title").textContent;
      const price = parseFloat(document.getElementById("product-price").textContent.replace(/[^\d.]/g, ""));
      const image = document.getElementById("product-image").src;

      let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
      const existingItem = cart.find(item => item.name === title);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name: title, price: price, image: image, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(cart));
      renderSidebarCart(); // ← Detta funkar nu!
    });
  }

  // ========== FORMULÄRVALIDERING ==========
  const form = document.getElementById("order-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let valid = true;

      const name = document.getElementById("name");
      const address = document.getElementById("address");
      const city = document.getElementById("city");
      const email = document.getElementById("email");
      const zipcode = document.getElementById("zipcode");
      const phone = document.getElementById("phone");

      const zipcodeRegex = /^\d{5}$/;
      const phoneRegex = /^[0-9\-()+ ]{9,50}$/;

      if (name.value.length < 2 || name.value.length > 50) {
        name.classList.add("is-invalid");
        valid = false;
      } else {
        name.classList.remove("is-invalid");
      }

      if (address.value.length < 2 || address.value.length > 50) {
        address.classList.add("is-invalid");
        valid = false;
      } else {
        address.classList.remove("is-invalid");
      }

      if (city.value.length < 2 || city.value.length > 50) {
        city.classList.add("is-invalid");
        valid = false;
      } else {
        city.classList.remove("is-invalid");
      }

      if (!email.value.includes("@") || email.value.length > 50) {
        email.classList.add("is-invalid");
        valid = false;
      } else {
        email.classList.remove("is-invalid");
      }

      if (!zipcodeRegex.test(zipcode.value)) {
        zipcode.classList.add("is-invalid");
        valid = false;
      } else {
        zipcode.classList.remove("is-invalid");
      }

      if (!phoneRegex.test(phone.value)) {
        phone.classList.add("is-invalid");
        valid = false;
      } else {
        phone.classList.remove("is-invalid");
      }

      if (valid) {
        alert("Tack för din beställning!");
        form.reset();
      }
    });
  }
});
