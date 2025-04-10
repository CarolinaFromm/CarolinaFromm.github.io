/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project



// Produktinfo på produkt-sidan (product.html)
if (window.location.pathname.includes("product.html")) {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');
  const image = params.get('image');
  const description = params.get('description');
  const price = params.get('price');

  // Fyller i produktinfo i rätt HTML-element
  // decodeURIComponent används för att säkerställa att specialtecken i URL:en tolkas korrekt
  if (name) document.getElementById('product-title').textContent = decodeURIComponent(name);
  if (image) document.getElementById('product-image').src = decodeURIComponent(image);
  if (description) document.getElementById('product-description').textContent = decodeURIComponent(description);
  if (price) document.getElementById('product-price').textContent = `Pris: ${price} €`;
}

document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-list"); // hämtar referens till html elementet där varorna ska visas: "product-list"
  const apiUrl = "https://fakestoreapi.com/products"; // API URL för att hämta varorna
  
if (productContainer) { // kontroll och kör vidare om elementet finns
fetch(apiUrl) // fetchar och startar en http get request till apiURL
  .then(response => response.json()) // när det hämtats, tolka svaret som JSON
  .then(products => {                // därefter går vidare med array objekt från APIt
    productContainer.innerHTML = ""; // Rensa gamla varor om några finns
    products.forEach(product => {    // Loopar igenom varje vara och bygger html 
      // Skapas html struktur för alla varor från API
      // Rad 50 skickar vidare till produktsidan där formuläret finns. Man skickas vidare när man klickat på köp
      // encodeURI gör att inga specialtecken förstör länken såsom mellanslag åäö m.m.
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
              </div>
          `;
        productContainer.innerHTML += productHTML; // Lägg in html 
      });
    })
  .catch(error => console.error("Fel vid hämtning av produkter:", error)); // error visas i consolen om något är fel
}
});


// KOD RELATERAT TILL FORMULÄR
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("order-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Förhindra att formuläret skickas direkt

    let valid = true;

    const name = document.getElementById("name");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const email = document.getElementById("email");
    const zipcode = document.getElementById("zipcode");
    const phone = document.getElementById("phone")
    
    // Reguljära Uttryck, Regex (BP), postnummer och telefonnummer
    const zipcodeRegex = /^\d{5}$/;
    const phoneRegex = /^[0-9\-()+ ]{9,50}$/;

    // Fältvalidering (namn, adress, stad, e-post, postnummer och telefonnummer)
    // Lägger till "is-invalid"-klass om något är fel, vilket aktiverar Bootstrap-stilar

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
      form.reset(); // Återställ formuläret
    }
  });
});

