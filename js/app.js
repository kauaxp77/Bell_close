import { PRODUCTS } from './products.js';
import {
  createCart,
  addItem,
  removeItem,
  updateQuantity,
  getItemCount,
  calculateTotal,
  formatCurrency,
  generateWhatsAppUrl
} from './cart.js';

// Estado da aplicação
let cart = createCart();
let selectedSizes = {}; // { [productId]: size }
let currentCategory = 'all';

// Elementos do DOM
const productsGrid = document.getElementById('products-grid');
const cartDrawer = document.getElementById('cart-drawer');
const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
const btnOpenCart = document.getElementById('btn-open-cart');
const btnCloseCart = document.getElementById('btn-close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartEmptyState = document.getElementById('cart-empty-state');
const cartBadgeCount = document.getElementById('cart-badge-count');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTotalEl = document.getElementById('cart-total');
const btnCheckoutWhatsApp = document.getElementById('btn-checkout-whatsapp');
const filterButtons = document.querySelectorAll('.filter-btn');

// Inputs de entrega
const inputCustomerName = document.getElementById('customer-name');
const selectNeighborhood = document.getElementById('customer-neighborhood');
const inputAddress = document.getElementById('customer-address');
const selectPayment = document.getElementById('payment-method');

/**
 * Inicialização
 */
function init() {
  // Tamanho padrão 'M' para cada produto
  PRODUCTS.forEach((p) => {
    selectedSizes[p.id] = p.sizes[0] || 'M';
  });

  renderProducts();
  setupEventListeners();
  updateCartUI();
}

/**
 * Renderização da vitrine de produtos
 */
function renderProducts() {
  if (!productsGrid) return;

  const filtered = currentCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category.toLowerCase() === currentCategory.toLowerCase());

  productsGrid.innerHTML = filtered.map((product) => {
    const currentSelectedSize = selectedSizes[product.id] || product.sizes[0];

    const sizePillsHtml = product.sizes.map((s) => `
      <button 
        type="button" 
        class="size-pill ${s === currentSelectedSize ? 'selected' : ''}" 
        data-product-id="${product.id}" 
        data-size="${s}"
        aria-label="Tamanho ${s}">
        ${s}
      </button>
    `).join('');

    return `
      <article class="product-card" data-category="${product.category}">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <span class="product-tag">${product.category}</span>
        </div>
        <div class="product-body">
          <span class="product-category-name">${product.category}</span>
          <h3 class="product-title">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <div class="product-price">${formatCurrency(product.price)}</div>
          
          <div class="size-selector-wrap">
            <span class="size-selector-label">Selecione o tamanho:</span>
            <div class="size-buttons-group">
              ${sizePillsHtml}
            </div>
          </div>

          <div class="product-actions-wrap">
            <button 
              type="button" 
              class="btn-add-cart" 
              data-product-id="${product.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Adicionar à Sacola
            </button>
            <button 
              type="button" 
              class="btn-quick-wpp" 
              data-product-id="${product.id}">
              Pedir direto no WhatsApp
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Atualização dos elementos visuais da gaveta do carrinho
 */
function updateCartUI() {
  const totalCount = getItemCount(cart);
  const totalValue = calculateTotal(cart);

  if (cartBadgeCount) {
    cartBadgeCount.textContent = totalCount;
  }

  if (cartSubtotalEl) cartSubtotalEl.textContent = formatCurrency(totalValue);
  if (cartTotalEl) cartTotalEl.textContent = formatCurrency(totalValue);

  if (!cartItemsContainer || !cartEmptyState) return;

  if (cart.items.length === 0) {
    cartEmptyState.style.display = 'block';
    cartItemsContainer.innerHTML = '';
    if (btnCheckoutWhatsApp) {
      btnCheckoutWhatsApp.disabled = true;
      btnCheckoutWhatsApp.style.opacity = '0.5';
      btnCheckoutWhatsApp.style.pointerEvents = 'none';
    }
  } else {
    cartEmptyState.style.display = 'none';
    if (btnCheckoutWhatsApp) {
      btnCheckoutWhatsApp.disabled = false;
      btnCheckoutWhatsApp.style.opacity = '1';
      btnCheckoutWhatsApp.style.pointerEvents = 'auto';
    }

    cartItemsContainer.innerHTML = cart.items.map((item) => {
      // Buscar dados do produto para obter foto
      const originalProduct = PRODUCTS.find((p) => p.id === item.id) || {};
      const imgUrl = originalProduct.image || '';

      return `
        <div class="cart-item-row" data-id="${item.id}" data-size="${item.size}">
          ${imgUrl ? `<img src="${imgUrl}" alt="${item.name}" class="cart-item-thumb" />` : ''}
          <div class="cart-item-details">
            <h5 class="cart-item-title">${item.name}</h5>
            <div class="cart-item-meta">Tamanho: <strong>${item.size}</strong> • ${formatCurrency(item.price)}</div>
            <div class="cart-item-controls">
              <div class="qty-control-group">
                <button type="button" class="btn-qty btn-minus" data-id="${item.id}" data-size="${item.size}">−</button>
                <span class="qty-display">${item.quantity}</span>
                <button type="button" class="btn-qty btn-plus" data-id="${item.id}" data-size="${item.size}">+</button>
              </div>
              <button type="button" class="btn-remove-item" data-id="${item.id}" data-size="${item.size}">Remover</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

/**
 * Abertura e fechamento da gaveta
 */
function openCart() {
  cartDrawer.classList.add('active');
  cartDrawerOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('active');
  cartDrawerOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Disparo para o WhatsApp
 */
function handleWhatsAppCheckout() {
  if (cart.items.length === 0) return;

  const customerDetails = {
    name: inputCustomerName ? inputCustomerName.value.trim() : '',
    neighborhood: selectNeighborhood ? selectNeighborhood.value : '',
    address: inputAddress ? inputAddress.value.trim() : '',
    paymentMethod: selectPayment ? selectPayment.value : 'Pix'
  };

  const url = generateWhatsAppUrl(cart, customerDetails, '5561982335867');
  window.open(url, '_blank');
}

/**
 * Compra rápida de 1 clique direto no WhatsApp
 */
function handleQuickBuy(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const chosenSize = selectedSizes[productId] || product.sizes[0];
  const quickCart = addItem(createCart(), {
    id: product.id,
    name: product.name,
    price: product.price,
    size: chosenSize,
    quantity: 1
  });

  const url = generateWhatsAppUrl(quickCart, {
    name: '',
    neighborhood: 'Águas Lindas de Goiás',
    address: 'A combinar no chat',
    paymentMethod: 'A combinar'
  }, '5561982335867');

  window.open(url, '_blank');
}

/**
 * Event Listeners
 */
function setupEventListeners() {
  // Abrir / Fechar carrinho
  if (btnOpenCart) btnOpenCart.addEventListener('click', openCart);
  if (btnCloseCart) btnCloseCart.addEventListener('click', closeCart);
  if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', closeCart);

  // Filtros de Categoria
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category') || 'all';
      renderProducts();
    });
  });

  // Cliques no Grid de Produtos (delegação)
  if (productsGrid) {
    productsGrid.addEventListener('click', (e) => {
      // Seletor de tamanho
      const sizeBtn = e.target.closest('.size-pill');
      if (sizeBtn) {
        const prodId = sizeBtn.getAttribute('data-product-id');
        const size = sizeBtn.getAttribute('data-size');
        selectedSizes[prodId] = size;

        // Atualizar visual dos pills dentro do card
        const card = sizeBtn.closest('.product-card');
        card.querySelectorAll('.size-pill').forEach((p) => p.classList.remove('selected'));
        sizeBtn.classList.add('selected');
        return;
      }

      // Adicionar à sacola
      const addBtn = e.target.closest('.btn-add-cart');
      if (addBtn) {
        const prodId = addBtn.getAttribute('data-product-id');
        const product = PRODUCTS.find((p) => p.id === prodId);
        if (product) {
          const chosenSize = selectedSizes[prodId] || product.sizes[0];
          cart = addItem(cart, {
            id: product.id,
            name: product.name,
            price: product.price,
            size: chosenSize,
            quantity: 1
          });
          updateCartUI();
          openCart();
        }
        return;
      }

      // Pedir direto no WhatsApp
      const quickBtn = e.target.closest('.btn-quick-wpp');
      if (quickBtn) {
        const prodId = quickBtn.getAttribute('data-product-id');
        handleQuickBuy(prodId);
      }
    });
  }

  // Cliques dentro da Sacola (quantidade / remoção)
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', (e) => {
      const btnMinus = e.target.closest('.btn-minus');
      const btnPlus = e.target.closest('.btn-plus');
      const btnRemove = e.target.closest('.btn-remove-item');

      if (btnMinus) {
        const id = btnMinus.getAttribute('data-id');
        const size = btnMinus.getAttribute('data-size');
        const item = cart.items.find((i) => i.id === id && i.size === size);
        if (item) {
          cart = updateQuantity(cart, id, size, item.quantity - 1);
          updateCartUI();
        }
        return;
      }

      if (btnPlus) {
        const id = btnPlus.getAttribute('data-id');
        const size = btnPlus.getAttribute('data-size');
        const item = cart.items.find((i) => i.id === id && i.size === size);
        if (item) {
          cart = updateQuantity(cart, id, size, item.quantity + 1);
          updateCartUI();
        }
        return;
      }

      if (btnRemove) {
        const id = btnRemove.getAttribute('data-id');
        const size = btnRemove.getAttribute('data-size');
        cart = removeItem(cart, id, size);
        updateCartUI();
      }
    });
  }

  // Checkout no WhatsApp
  if (btnCheckoutWhatsApp) {
    btnCheckoutWhatsApp.addEventListener('click', handleWhatsAppCheckout);
  }
}

// Inicia quando o DOM carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
