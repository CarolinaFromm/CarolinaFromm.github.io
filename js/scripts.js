/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project



// Produktinfo
if (window.location.pathname.includes("product.html")) {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');
  const image = params.get('image');
  const description = params.get('description');

  // Fyll i på sidan
  if (name) document.getElementById('product-title').textContent = name;
  if (image) document.getElementById('product-image').src = image;
  if (description) document.getElementById('product-description').textContent = description;
}


/*
Jag har inte gjort postnummer eller telefon,
för det var jag lite mer osäker på hur jag skulle göra. 
*/


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("order-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("name");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const email = document.getElementById("email");
    const zipcode = document.getElementById("zipcode");
    const phone = document.getElementById("phone")

    // Reguljära Uttryck (kallas Regex - best practice)
    const zipcodeRegex = /^\d{5}$/;
    const phoneRegex = /^[0-9\-()+ ]{9,50}$/;



    // Namn
    if (name.value.length < 2 || name.value.length > 50) {
      name.classList.add("is-invalid");
      valid = false;
    } else {
      name.classList.remove("is-invalid");
    }

    // Gatuadress
    if (address.value.length < 2 || address.value.length > 50) {
      address.classList.add("is-invalid");
      valid = false;
    } else {
      address.classList.remove("is-invalid");
    }

    // Stad
    if (city.value.length < 2 || city.value.length > 50) {
      city.classList.add("is-invalid");
      valid = false;
    } else {
      city.classList.remove("is-invalid");
    }

    // E-post
    if (!email.value.includes("@") || email.value.length > 50) {
      email.classList.add("is-invalid");
      valid = false;
    } else {
      email.classList.remove("is-invalid");
    }

    // Postnummer
    if (!zipcodeRegex.test(zipcode.value)) {
      zipcode.classList.add("is-invalid");
      valid = false;
    } else {
      zipcode.classList.remove("is-invalid");
    }

    // Telefonnummer
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
});
document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.querySelector(".row-cols-2"); // Anpassa om din container har en annan klass
  const apiUrl = "https://fakestoreapi.com/products";

  // Hämta produkter från Fake Store API
  fetch(apiUrl)
    .then(response => response.json())
    .then(products => {
      productContainer.innerHTML = ""; // Rensa gamla produkter om några finns
      products.forEach(product => {
        // Skapa HTML för varje produkt
        const productHTML = `
                                <div class="col mb-5">
                                    <div class="card h-100">
                                        <img class="card-img-top" src="${product.image}" alt="${product.title}" />
                                        <div class="card-body p-4">
                                            <div class="text-center">
                                                <h5 class="fw-bolder">${product.title}</h5>
                                                <p>${product.price}  €</p>
                                            </div>
                                        </div>
                                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                            <div class="text-center">
                                                <a class="btn btn-outline-dark mt-auto" href="product.html?name=${encodeURIComponent(product.title)}&image=${encodeURIComponent(product.image)}&description=${encodeURIComponent(product.description)}">KÖP</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
        productContainer.innerHTML += productHTML;
      });
    })
    .catch(error => console.error("Fel vid hämtning av produkter:", error));
});