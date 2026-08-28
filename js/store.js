let products = [];
let cart = [];

const catalogView = document.getElementById("catalog-view");
const detailView = document.getElementById("detail-view");
const cartView = document.getElementById("cart-view");
const cartCounter = document.getElementById("cartCounter");

const formatCurrency = (val) =>
  val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Carrega os dados do produtos.json
async function loadProducts() {
  try {
    const response = await fetch("produtos.json");
    products = await response.json();
    renderCatalog();
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    catalogView.innerHTML = "<p>Não foi possível carregar os produtos no momento.</p>";
  }
}

// Alternar Telas
function navigateStore(view) {
  catalogView.classList.add("hidden");
  detailView.classList.add("hidden");
  cartView.classList.add("hidden");

  if (view === "catalog") {
    catalogView.classList.remove("hidden");
  } else if (view === "detail") {
    detailView.classList.remove("hidden");
  } else if (view === "cart") {
    renderCart();
    cartView.classList.remove("hidden");
  }
  window.scrollTo(0, 0);
}

// Renderiza Cards
function renderCatalog() {
  catalogView.innerHTML = products.map((prod) => `
    <article class="product-card" onclick="openDetails('${prod.id}')">
      <div class="card-img-box">
        ${prod.badge ? `<span class="badge">${prod.badge}</span>` : ""}
        <img src="${prod.image}" alt="${prod.name}" />
      </div>
      <div class="card-content">
        <div>
          <span class="card-category">${prod.category}</span>
          <h2 class="card-title">${prod.name}</h2>
        </div>
        <div class="card-action-row">
          <span class="card-price">${formatCurrency(prod.price)}</span>
          <button class="btn-add-quick" onclick="addToCart('${prod.id}', event)" type="button">
            <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// Abrir Detalhes
function openDetails(productId) {
  const prod = products.find((p) => p.id === productId);
  if (!prod) return;

  document.getElementById("detailImg").src = prod.image;
  document.getElementById("detailCategory").textContent = prod.category;
  document.getElementById("detailTitle").textContent = prod.name;
  document.getElementById("detailDesc").textContent = prod.description;
  document.getElementById("detailPrice").textContent = formatCurrency(prod.price);

  const oldPriceEl = document.getElementById("detailOldPrice");
  if (prod.oldPrice) {
    oldPriceEl.textContent = formatCurrency(prod.oldPrice);
    oldPriceEl.classList.remove("hidden");
  } else {
    oldPriceEl.classList.add("hidden");
  }

  document.getElementById("detailAddBtn").onclick = () => {
    addToCart(prod.id);
  };

  navigateStore("detail");
}

// Operações de Carrinho
function addToCart(productId, event) {
  if (event) event.stopPropagation();

  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.quantity += 1;
  } else {
    const prod = products.find((p) => p.id === productId);
    cart.push({ ...prod, quantity: 1 });
  }

  updateCartBadge();
}

function updateQuantity(productId, delta) {
  const index = cart.findIndex((i) => i.id === productId);
  if (index > -1) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
  }
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const total = cart.reduce((acc, i) => acc + i.quantity, 0);
  if (cartCounter) cartCounter.textContent = total;
}

function renderCart() {
  const listEl = document.getElementById("cartList");
  const summaryEl = document.getElementById("cartSummary");

  if (cart.length === 0) {
    listEl.innerHTML = `<p style="text-align:center; padding: 2rem 0; color:#888;">Seu carrinho está vazio.</p>`;
    summaryEl.classList.add("hidden");
    return;
  }

  summaryEl.classList.remove("hidden");
  listEl.innerHTML = cart.map((item) => `
    <div class="cart-row">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <span class="cart-item-price">${formatCurrency(item.price)}</span>
      </div>
      <div class="cart-qty-ctrl">
        <button class="btn-qty" onclick="updateQuantity('${item.id}', -1)">-</button>
        <span>${item.quantity}</span>
        <button class="btn-qty" onclick="updateQuantity('${item.id}', 1)">+</button>
      </div>
    </div>
  `).join("");

  const totalVal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  document.getElementById("cartTotal").textContent = formatCurrency(totalVal);
}

function checkoutWhatsApp() {
  if (cart.length === 0) return;
  let text = "Olá! Gostaria de fazer o seguinte pedido:%0A";
  cart.forEach(item => {
    text += `- ${item.quantity}x ${item.name} (${formatCurrency(item.price * item.quantity)})%0A`;
  });
  const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  text += `%0A*Total: ${formatCurrency(total)}*`;

  window.open(`https://api.whatsapp.com/send?phone=5511999999999&text=${text}`, "_blank");
}

document.addEventListener("DOMContentLoaded", loadProducts);