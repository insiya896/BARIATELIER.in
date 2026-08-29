const products = [
  {
    name: "Heart Halo Ring",
    price: 899,
    image: "assets/ring-heart-halo.jpg"
  },
  {
    name: "Rosé Gem Ring",
    price: 799,
    image: "assets/pink-gem-ring.jpg"
  },
  {
    name: "Golden Drop Earrings",
    price: 649,
    image: "assets/gold-drop-earrings.jpg"
  },
  {
    name: "Love Drop Earrings",
    price: 599,
    image: "assets/heart-earrings.jpg"
  },
  {
    name: "Celeste Heart Ring",
    price: 749,
    image: "assets/heart-ring.jpg"
  },
  {
    name: "Amour Bow Earrings",
    price: 699,
    image: "assets/bow-heart-earrings.jpg"
  },
  {
    name: "Molten Heart Studs",
    price: 549,
    image: "assets/heart-stud-earrings.jpg"
  },
  {
    name: "Pearl Étoile Earrings",
    price: 799,
    image: "assets/pearl-x-earrings.jpg"
  },
  {
    name: "Initial H Ring",
    price: 699,
    image: "assets/letter-h-ring.jpg"
  },
  {
    name: "Éclat Halo Ring",
    price: 899,
    image: "assets/halo-diamond-ring.jpg"
  }
];

let cart = JSON.parse(localStorage.getItem("bariCart")) || [];


/* ADD TO BAG */

function addToCart(index) {
  const existing = cart.find(item => item.index === index);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      index: index,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  openCart();
}


/* SAVE CART */

function saveCart() {
  localStorage.setItem(
    "bariCart",
    JSON.stringify(cart)
  );
}


/* REMOVE */

function removeFromCart(index) {
  cart = cart.filter(
    item => item.index !== index
  );

  saveCart();
  renderCart();
}


/* QUANTITY */

function changeQuantity(index, amount) {
  const item = cart.find(
    item => item.index === index
  );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(index);
    return;
  }

  saveCart();
  renderCart();
}


/* RENDER CART */

function renderCart() {
  const container =
    document.getElementById("cartItems");

  const count =
    document.getElementById("cartCount");

  const totalElement =
    document.getElementById("cartTotal");

  let total = 0;
  let quantityTotal = 0;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        Your bag is waiting.
      </div>
    `;

    count.textContent = "0";
    totalElement.textContent = "₹0";
    return;
  }

  container.innerHTML = "";

  cart.forEach(item => {
    const product = products[item.index];

    total += product.price * item.quantity;
    quantityTotal += item.quantity;

    const div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `
      <img
        src="${product.image}"
        alt="${product.name}"
      >

      <div>
        <h4>${product.name}</h4>

        <p>
          ₹${product.price.toLocaleString("en-IN")}
        </p>

        <div class="quantity">

          <button
            onclick="changeQuantity(${item.index}, -1)">
            −
          </button>

          <span>${item.quantity}</span>

          <button
            onclick="changeQuantity(${item.index}, 1)">
            +
          </button>

        </div>
      </div>

      <button
        class="remove"
        onclick="removeFromCart(${item.index})">
        Remove
      </button>
    `;

    container.appendChild(div);
  });

  count.textContent = quantityTotal;

  totalElement.textContent =
    "₹" + total.toLocaleString("en-IN");
}


/* OPEN BAG */

function openCart() {
  document
    .getElementById("cart")
    .classList.add("active");

  document
    .getElementById("cartOverlay")
    .classList.add("active");
}


/* CLOSE BAG */

function closeCart() {
  document
    .getElementById("cart")
    .classList.remove("active");

  document
    .getElementById("cartOverlay")
    .classList.remove("active");
}


/* EMAIL CHECKOUT */

function checkoutEmail() {

  if (cart.length === 0) {
    alert("Your shopping bag is empty.");
    return;
  }

  let customerName = prompt(
    "Please enter your full name:"
  );

  if (!customerName) return;

  let customerEmail = prompt(
    "Please enter your email address:"
  );

  if (!customerEmail) return;

  let customerAddress = prompt(
    "Please enter your complete delivery address:"
  );

  if (!customerAddress) return;


  let total = 0;

  let orderDetails = "";


  cart.forEach(item => {

    const product = products[item.index];

    const itemTotal =
      product.price * item.quantity;

    total += itemTotal;

    orderDetails +=
      `${product.name} × ${item.quantity} — ₹${itemTotal.toLocaleString("en-IN")}\n`;

  });


  const subject =
    `Bari Atelier Order — ${customerName}`;


  const body =
`Hello Bari Atelier,

I would like to place an order.

CUSTOMER INFORMATION
--------------------
Name: ${customerName}
Email: ${customerEmail}

Delivery Address:
${customerAddress}

ORDER
-----
${orderDetails}
Total: ₹${total.toLocaleString("en-IN")}

Please confirm product availability, shipping charges and payment instructions.

Thank you,
${customerName}`;


  const mailto =
    "mailto:hubasakaryos@gmail.com" +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);


  window.location.href = mailto;
}


/* INITIALIZE */

renderCart();
