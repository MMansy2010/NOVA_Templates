/**
 * Le Doré Artisan Bakery — Interactive Engine & 3D WebGL Canvas
 * Designed for High-End Human Aesthetic (Anti-AI Templates)
 */

// حالة التطبيق والسلة وباني البوكس
const StoreState = {
  activeCategory: 'all',
  cart: [],
  customBox: {
    maxSlots: 8,
    items: [] // { name, price, icon }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initHeroParallaxStage();
  renderProducts();
  renderFilters();
  setup3DTiltCards();
  initBoxBuilder();
  setupEventListeners();
  loadCart();
});

// ==========================================================================
// 1. REALISTIC 3D PARALLAX SHOWCASE CONTROLLER
// ==========================================================================
function initHeroParallaxStage() {
  const card = document.getElementById('parallaxCard');
  const stage = document.getElementById('heroVisualStage');
  if (!card || !stage) return;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 16;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty('--sheen-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--sheen-y', `${(y / rect.height) * 100}%`);
  });

  stage.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
}

// ==========================================================================
// 2. INTERACTIVE 3D TILT ON PRODUCT CARDS
// ==========================================================================
function setup3DTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12; // إمالة بمقدار 12 درجة
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });
}

// ==========================================================================
// 3. INTERACTIVE BOX BUILDER (تجهيز بوكس الجمعات التفاعلي)
// ==========================================================================
const BOX_OPTIONS = [
  { name: "ميني كرواسون زبدة ملكي", price: 35, icon: "🥐" },
  { name: "ميني كرواسون فستق وكريمة", price: 45, icon: "🥐" },
  { name: "ميني تارت توت العليق", price: 40, icon: "🫐" },
  { name: "ماكرون باريس مشكل", price: 30, icon: "🍪" },
  { name: "ميني سويس رول شوكولاتة", price: 35, icon: "🍫" }
];

function initBoxBuilder() {
  const container = document.getElementById('boxPickersList');
  if (!container) return;

  container.innerHTML = BOX_OPTIONS.map((item, idx) => `
    <div class="picker-item">
      <div>
        <strong>${item.icon} ${item.name}</strong>
        <span> (${item.price} ج.م للقطعة)</span>
      </div>
      <button class="btn-add-item" onclick="addItemToCustomBox(${idx})" title="إضافة للبوكس">+</button>
    </div>
  `).join('');

  updateBoxVisuals();
}

function addItemToCustomBox(index) {
  if (StoreState.customBox.items.length >= StoreState.customBox.maxSlots) {
    alert("لقد امتلأت الخانات الـ 8 في البوكس! يمكنك تأكيد طلب البوكس الآن عبر واتساب.");
    return;
  }
  const item = BOX_OPTIONS[index];
  StoreState.customBox.items.push(item);
  updateBoxVisuals();
}

function clearCustomBox() {
  StoreState.customBox.items = [];
  updateBoxVisuals();
}

function updateBoxVisuals() {
  const slotsContainer = document.getElementById('boxSlotsGrid');
  const countEl = document.getElementById('boxItemsCount');
  const totalEl = document.getElementById('boxTotalPrice');
  if (!slotsContainer) return;

  const totalItems = StoreState.customBox.items.length;
  const totalPrice = StoreState.customBox.items.reduce((s, i) => s + i.price, 0);

  if (countEl) countEl.textContent = `${totalItems} من ${StoreState.customBox.maxSlots} قطع`;
  if (totalEl) totalEl.textContent = `${totalPrice} ج.م`;

  slotsContainer.innerHTML = Array.from({ length: StoreState.customBox.maxSlots }).map((_, i) => {
    const item = StoreState.customBox.items[i];
    if (item) {
      return `<div class="box-slot filled" title="${item.name}">${item.icon}</div>`;
    }
    return `<div class="box-slot"></div>`;
  }).join('');
}

function orderCustomBoxViaWhatsApp() {
  if (StoreState.customBox.items.length === 0) {
    alert("برجاء اختيار قطع لإضافتها للبوكس أولاً!");
    return;
  }

  const itemsSummary = StoreState.customBox.items.reduce((acc, curr) => {
    acc[curr.name] = (acc[curr.name] || 0) + 1;
    return acc;
  }, {});

  const totalPrice = StoreState.customBox.items.reduce((s, i) => s + i.price, 0);

  let msg = `*طلب بوكس مخصص (Custom Gathering Box)* 🎁\n`;
  msg += `------------------------------------\n`;
  msg += `عدد القطع: ${StoreState.customBox.items.length} قطع\n\n`;
  msg += `*محتويات البوكس:*\n`;
  for (const [name, qty] of Object.entries(itemsSummary)) {
    msg += `• ${qty}x ${name}\n`;
  }
  msg += `\n*الإجمالي:* ${totalPrice} ج.م\n`;
  msg += `------------------------------------\n`;
  msg += `يرجى إفادتي بوقت تجهيز وتوصيل البوكس. شكراً لكم! ✨`;

  window.open(`https://wa.me/${BAKERY_CONFIG.contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ==========================================================================
// 4. PRODUCTS & FILTERS
// ==========================================================================
function renderFilters() {
  const container = document.getElementById('categoryFilters');
  if (!container) return;

  container.innerHTML = BAKERY_CONFIG.categories.map(c => `
    <button class="filter-pill ${c.id === StoreState.activeCategory ? 'active' : ''}" onclick="setCategory('${c.id}')">
      ${c.nameAr}
    </button>
  `).join('');
}

function setCategory(id) {
  StoreState.activeCategory = id;
  renderFilters();
  renderProducts();
  setup3DTiltCards();
}

function renderProducts() {
  const container = document.getElementById('products3dGrid');
  if (!container) return;

  const items = StoreState.activeCategory === 'all'
    ? BAKERY_CONFIG.products
    : BAKERY_CONFIG.products.filter(p => p.categoryId === StoreState.activeCategory);

  container.innerHTML = items.map(p => `
    <div class="tilt-card" data-id="${p.id}">
      <div class="card-media">
        <img src="${p.image}" alt="${p.nameAr}" loading="lazy">
        ${p.badge ? `<span class="card-wax-tag">${p.badge}</span>` : ''}
      </div>
      <div class="card-content">
        <h3 class="card-title">${p.nameAr}</h3>
        <p class="card-desc">${p.descAr}</p>
        <div class="card-bottom">
          <span class="card-price">${p.price} ${BAKERY_CONFIG.contact.currency}</span>
          <button class="btn-add-cart" onclick="addToCart('${p.id}')">
            <i class="fa-solid fa-basket-shopping"></i> أضف للطلب
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// 5. CART & WHATSAPP CHECKOUT
// ==========================================================================
function addToCart(productId) {
  const product = BAKERY_CONFIG.products.find(p => p.id === productId);
  if (!product) return;

  const existing = StoreState.cart.find(i => i.product.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    StoreState.cart.push({ product, quantity: 1 });
  }

  saveCart();
  updateCartUI();
  openCart();
}

function updateCartQty(productId, delta) {
  const idx = StoreState.cart.findIndex(i => i.product.id === productId);
  if (idx > -1) {
    StoreState.cart[idx].quantity += delta;
    if (StoreState.cart[idx].quantity <= 0) {
      StoreState.cart.splice(idx, 1);
    }
  }
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const count = StoreState.cart.reduce((s, i) => s + i.quantity, 0);
  const badge = document.getElementById('cartCounter');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  const list = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');

  if (!list) return;

  if (StoreState.cart.length === 0) {
    list.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--text-dim);">السلة فارغة حالياً.</div>`;
    if (subtotalEl) subtotalEl.textContent = '0 ج.م';
    if (totalEl) totalEl.textContent = '0 ج.م';
    return;
  }

  list.innerHTML = StoreState.cart.map(item => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border-antique);">
      <div>
        <strong style="color: #fff; font-size: 0.95rem; display: block;">${item.product.nameAr}</strong>
        <span style="color: var(--gold-leaf); font-size: 0.85rem;">${item.product.price} ج.م × ${item.quantity}</span>
      </div>
      <div style="display: flex; gap: 8px; align-items: center;">
        <button onclick="updateCartQty('${item.product.id}', 1)" style="color: var(--gold-leaf); background: rgba(230,183,108,0.15); width: 26px; height: 26px; border-radius: 50%; border: none; cursor: pointer;">+</button>
        <span style="font-weight: 800;">${item.quantity}</span>
        <button onclick="updateCartQty('${item.product.id}', -1)" style="color: var(--gold-leaf); background: rgba(230,183,108,0.15); width: 26px; height: 26px; border-radius: 50%; border: none; cursor: pointer;">-</button>
      </div>
    </div>
  `).join('');

  const subtotal = StoreState.cart.reduce((s, i) => s + (i.product.price * i.quantity), 0);
  if (subtotalEl) subtotalEl.textContent = `${subtotal} ج.م`;
  if (totalEl) totalEl.textContent = `${subtotal} ج.م`;
}

function openCart() {
  const panel = document.getElementById('cartOverlay');
  if (panel) panel.classList.add('open');
}

function closeCart() {
  const panel = document.getElementById('cartOverlay');
  if (panel) panel.classList.remove('open');
}

function checkoutWhatsApp() {
  if (StoreState.cart.length === 0) return;

  const name = document.getElementById('clientNameInput')?.value.trim() || 'عميل كريم';
  const address = document.getElementById('clientAddressInput')?.value.trim() || '';

  let msg = `*طلب مخبوزات من: ${BAKERY_CONFIG.brand.nameAr}* 🥐\n`;
  msg += `------------------------------------\n`;
  StoreState.cart.forEach((item, idx) => {
    msg += `${idx + 1}. *${item.product.nameAr}* (الكمية: ${item.quantity}) = ${item.product.price * item.quantity} ج.م\n`;
  });
  const total = StoreState.cart.reduce((s, i) => s + (i.product.price * i.quantity), 0);
  msg += `------------------------------------\n`;
  msg += `*الإجمالي:* ${total} ج.م\n`;
  msg += `الاسم: ${name}\n`;
  if (address) msg += `العنوان: ${address}\n`;
  msg += `\nيرجى تأكيد الطلب والتوصيل. شكراً! ✨`;

  window.open(`https://wa.me/${BAKERY_CONFIG.contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
}

function saveCart() {
  localStorage.setItem('bakery_3d_cart', JSON.stringify(StoreState.cart));
}

function loadCart() {
  try {
    const saved = localStorage.getItem('bakery_3d_cart');
    if (saved) {
      StoreState.cart = JSON.parse(saved);
      updateCartUI();
    }
  } catch (e) {}
}

function setupEventListeners() {
  document.getElementById('cartBtn')?.addEventListener('click', openCart);
  document.getElementById('closeCartBtn')?.addEventListener('click', closeCart);
}
