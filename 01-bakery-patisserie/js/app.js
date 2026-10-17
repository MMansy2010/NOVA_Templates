/**
 * منطق وتفاعلية قالب المخبز والحلويات (Bakery & Patisserie)
 * إدارة السلة، فلترة الأصناف، والطلب الذكي عبر واتساب
 */

// حالة التطبيق والسلة
const AppState = {
  currentCategory: 'all',
  cart: [], // { product, quantity }
  customerDetails: {
    name: '',
    phone: '',
    address: '',
    method: 'delivery', // delivery or pickup
    notes: ''
  }
};

// تهيئة التطبيق عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  initBrandInfo();
  renderCategories();
  renderProducts();
  renderFeatures();
  renderTestimonials();
  setupEventListeners();
  loadCartFromStorage();
});

// ملء معلومات البراند الأساسية من ملف الإعدادات
function initBrandInfo() {
  const brand = BAKERY_CONFIG.brand;
  const contact = BAKERY_CONFIG.contact;

  document.querySelectorAll('.js-brand-name').forEach(el => el.textContent = brand.nameAr);
  document.querySelectorAll('.js-brand-slogan').forEach(el => el.textContent = brand.sloganAr);
  document.querySelectorAll('.js-brand-rating').forEach(el => el.textContent = brand.rating);
  document.querySelectorAll('.js-brand-reviews').forEach(el => el.textContent = brand.reviewsCount);
  document.querySelectorAll('.js-contact-phone').forEach(el => {
    el.textContent = contact.phone;
    el.href = `tel:${contact.phone.replace(/\s+/g, '')}`;
  });
  document.querySelectorAll('.js-contact-address').forEach(el => el.textContent = contact.addressAr);
  document.querySelectorAll('.js-contact-hours').forEach(el => el.textContent = contact.workingHoursAr);
  
  // روابط الواتساب المباشرة
  document.querySelectorAll('.js-whatsapp-link').forEach(el => {
    el.href = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("مرحباً، أود الاستفسار عن قائمة المخبوزات والحلويات المتاحة اليوم 🥐")}`;
    el.target = "_blank";
  });
}

// رسم أزرار تصنيفات المنيو
function renderCategories() {
  const container = document.getElementById('categoryTabs');
  if (!container) return;

  container.innerHTML = BAKERY_CONFIG.categories.map(cat => `
    <button class="category-tab-btn ${cat.id === AppState.currentCategory ? 'active' : ''}" data-category="${cat.id}">
      <span>${cat.nameAr}</span>
    </button>
  `).join('');

  // تفاعل الفلترة
  container.querySelectorAll('.category-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.category-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.currentCategory = btn.dataset.category;
      renderProducts();
    });
  });
}

// رسم كروت المنتجات
function renderProducts() {
  const container = document.getElementById('productsGrid');
  if (!container) return;

  const filtered = AppState.currentCategory === 'all'
    ? BAKERY_CONFIG.products
    : BAKERY_CONFIG.products.filter(p => p.categoryId === AppState.currentCategory);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        لا توجد أصناف متوفرة في هذا القسم حالياً.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(prod => `
    <div class="product-card" data-id="${prod.id}">
      <div class="product-img-wrap">
        <img src="${prod.image}" alt="${prod.nameAr}" loading="lazy">
        ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ''}
        <button class="quick-view-btn" title="عرض التفاصيل" onclick="openQuickView('${prod.id}')">
          <i class="fa-regular fa-eye"></i>
        </button>
      </div>
      <div class="product-body">
        <div class="product-meta">
          <span class="product-freshness">
            <i class="fa-solid fa-clock"></i> ${prod.prepTime || 'طازج اليوم'}
          </span>
        </div>
        <h3 class="product-title">${prod.nameAr}</h3>
        <p class="product-desc">${prod.descAr}</p>
        <div class="product-footer">
          <div class="price-box">
            <span class="current-price">${prod.price} ${BAKERY_CONFIG.contact.currency}</span>
            ${prod.oldPrice ? `<span class="old-price">${prod.oldPrice} ${BAKERY_CONFIG.contact.currency}</span>` : ''}
          </div>
          <button class="add-to-cart-btn" onclick="addToCart('${prod.id}')">
            <i class="fa-solid fa-basket-shopping"></i> أضف للطلب
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// رسم مميزات المتجر
function renderFeatures() {
  const container = document.getElementById('featuresGrid');
  if (!container) return;

  container.innerHTML = BAKERY_CONFIG.features.map(f => `
    <div class="feature-card">
      <div class="feature-icon-box">
        <i class="fa-solid ${f.icon}"></i>
      </div>
      <h3>${f.titleAr}</h3>
      <p>${f.descAr}</p>
    </div>
  `).join('');
}

// رسم آراء العملاء
function renderTestimonials() {
  const container = document.getElementById('testimonialsGrid');
  if (!container) return;

  container.innerHTML = BAKERY_CONFIG.testimonials.map(t => `
    <div class="testimonial-card">
      <div>
        <div class="stars">
          ${'<i class="fa-solid fa-star"></i>'.repeat(t.rating)}
        </div>
        <p>"${t.comment}"</p>
      </div>
      <div class="author-box">
        <img src="${t.avatar}" alt="${t.name}">
        <div>
          <h5>${t.name}</h5>
          <span>${t.role}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// إدارة سلة المشتريات (Cart Logic)
// ==========================================================================

function addToCart(productId) {
  const product = BAKERY_CONFIG.products.find(p => p.id === productId);
  if (!product) return;

  const existing = AppState.cart.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    AppState.cart.push({ product, quantity: 1 });
  }

  saveCart();
  updateCartUI();
  openCartDrawer();
  triggerToast(`تمت إضافة "${product.nameAr}" لسلة الطلب 🥐`);
}

function updateCartQty(productId, delta) {
  const itemIndex = AppState.cart.findIndex(i => i.product.id === productId);
  if (itemIndex > -1) {
    AppState.cart[itemIndex].quantity += delta;
    if (AppState.cart[itemIndex].quantity <= 0) {
      AppState.cart.splice(itemIndex, 1);
    }
  }
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = totalCount;
    b.style.display = totalCount > 0 ? 'flex' : 'none';
  });

  const cartList = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartDeliveryEl = document.getElementById('cartDelivery');
  const cartTotalEl = document.getElementById('cartTotal');

  if (!cartList) return;

  if (AppState.cart.length === 0) {
    cartList.innerHTML = `
      <div class="empty-cart-state">
        <i class="fa-solid fa-basket-shopping"></i>
        <p>سلتك فارغة حالياً. تصفح المنيو واختر ما تشتهيه من مخبوزاتنا!</p>
        <button class="btn-primary" onclick="closeCartDrawer()" style="margin: 0 auto;">تصفح المنيو الآن</button>
      </div>
    `;
    if (cartSubtotalEl) cartSubtotalEl.textContent = `0 ${BAKERY_CONFIG.contact.currency}`;
    if (cartDeliveryEl) cartDeliveryEl.textContent = `0 ${BAKERY_CONFIG.contact.currency}`;
    if (cartTotalEl) cartTotalEl.textContent = `0 ${BAKERY_CONFIG.contact.currency}`;
    return;
  }

  cartList.innerHTML = AppState.cart.map(item => `
    <div class="cart-item">
      <img src="${item.product.image}" class="cart-item-img" alt="${item.product.nameAr}">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.product.nameAr}</div>
        <div class="cart-item-price">${item.product.price} × ${item.quantity} = ${item.product.price * item.quantity} ${BAKERY_CONFIG.contact.currency}</div>
      </div>
      <div class="cart-qty-ctrl">
        <button onclick="updateCartQty('${item.product.id}', 1)"><i class="fa-solid fa-plus"></i></button>
        <span class="cart-qty-val">${item.quantity}</span>
        <button onclick="updateCartQty('${item.product.id}', -1)"><i class="fa-solid fa-minus"></i></button>
      </div>
    </div>
  `).join('');

  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const isFreeDelivery = subtotal >= BAKERY_CONFIG.contact.freeDeliveryThreshold;
  const delivery = isFreeDelivery ? 0 : BAKERY_CONFIG.contact.deliveryFee;
  const total = subtotal + delivery;

  if (cartSubtotalEl) cartSubtotalEl.textContent = `${subtotal} ${BAKERY_CONFIG.contact.currency}`;
  if (cartDeliveryEl) {
    cartDeliveryEl.textContent = isFreeDelivery ? 'مجاني 🎉' : `${delivery} ${BAKERY_CONFIG.contact.currency}`;
  }
  if (cartTotalEl) cartTotalEl.textContent = `${total} ${BAKERY_CONFIG.contact.currency}`;
}

function openCartDrawer() {
  const overlay = document.getElementById('cartDrawerOverlay');
  if (overlay) overlay.classList.add('open');
}

function closeCartDrawer() {
  const overlay = document.getElementById('cartDrawerOverlay');
  if (overlay) overlay.classList.remove('open');
}

// إنشاء رسالة الطلب المنسقة وإرسالها إلى واتساب
function checkoutViaWhatsApp() {
  if (AppState.cart.length === 0) {
    alert("برجاء إضافة أصناف إلى السلة أولاً!");
    return;
  }

  const nameInput = document.getElementById('customerName');
  const addressInput = document.getElementById('customerAddress');
  const methodSelect = document.getElementById('orderMethod');
  const notesInput = document.getElementById('orderNotes');

  const name = nameInput ? nameInput.value.trim() : '';
  const address = addressInput ? addressInput.value.trim() : '';
  const method = methodSelect ? methodSelect.value : 'توصيل';
  const notes = notesInput ? notesInput.value.trim() : '';

  if (method === 'توصيل' && (!name || !address)) {
    alert("يرجى كتابة الاسم والعنوان لتأكيد التوصيل بدقة.");
    return;
  }

  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const isFreeDelivery = subtotal >= BAKERY_CONFIG.contact.freeDeliveryThreshold;
  const delivery = method === 'استلام من الفرع' ? 0 : (isFreeDelivery ? 0 : BAKERY_CONFIG.contact.deliveryFee);
  const total = subtotal + delivery;

  let msg = `*طلب جديد من موقع: ${BAKERY_CONFIG.brand.nameAr}* 🥐\n`;
  msg += `------------------------------------\n`;
  
  AppState.cart.forEach((item, index) => {
    msg += `${index + 1}. *${item.product.nameAr}*\n`;
    msg += `   الكمية: ${item.quantity} × السعر: ${item.product.price} = *${item.product.price * item.quantity} ${BAKERY_CONFIG.contact.currency}*\n`;
  });

  msg += `------------------------------------\n`;
  msg += `*المجموع الفرعي:* ${subtotal} ${BAKERY_CONFIG.contact.currency}\n`;
  if (method === 'استلام من الفرع') {
    msg += `*طريقة الاستلام:* استلام من الفرع (${BAKERY_CONFIG.contact.addressAr})\n`;
  } else {
    msg += `*رسوم التوصيل:* ${isFreeDelivery ? 'مجاني (أكثر من ' + BAKERY_CONFIG.contact.freeDeliveryThreshold + ' ج.م)' : delivery + ' ' + BAKERY_CONFIG.contact.currency}\n`;
  }
  msg += `*الإجمالي النهائي:* *${total} ${BAKERY_CONFIG.contact.currency}*\n\n`;

  msg += `*بيانات العميل:*\n`;
  msg += `• الاسم: ${name || 'غير محدد'}\n`;
  if (method !== 'استلام من الفرع') {
    msg += `• العنوان: ${address}\n`;
  }
  if (notes) {
    msg += `• ملاحظات خاصة: ${notes}\n`;
  }
  msg += `\nيرجى تأكيد استلام الطلب ووقت التجهيز. شكراً لكم! ✨`;

  const url = `https://wa.me/${BAKERY_CONFIG.contact.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// تفاصيل المنتج السريعة Quick View Modal
function openQuickView(productId) {
  const prod = BAKERY_CONFIG.products.find(p => p.id === productId);
  if (!prod) return;

  const modal = document.getElementById('quickViewModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalPrice = document.getElementById('modalPrice');
  const modalAllergens = document.getElementById('modalAllergens');
  const modalAddBtn = document.getElementById('modalAddBtn');

  if (modalImg) modalImg.src = prod.image;
  if (modalTitle) modalTitle.textContent = prod.nameAr;
  if (modalDesc) modalDesc.textContent = prod.descAr;
  if (modalPrice) modalPrice.textContent = `${prod.price} ${BAKERY_CONFIG.contact.currency}`;
  
  if (modalAllergens) {
    if (prod.allergens && prod.allergens.length > 0) {
      modalAllergens.innerHTML = `
        <span style="font-size: 0.85rem; color: var(--text-dim); display: block; margin-bottom: 6px;">مسببات الحساسية:</span>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          ${prod.allergens.map(a => `<span style="background: rgba(229,178,103,0.1); border: 1px solid var(--border-subtle); padding: 2px 10px; border-radius: 99px; font-size: 0.78rem; color: var(--primary-gold);">${a}</span>`).join('')}
        </div>
      `;
    } else {
      modalAllergens.innerHTML = '';
    }
  }

  if (modalAddBtn) {
    modalAddBtn.onclick = () => {
      addToCart(prod.id);
      closeQuickView();
    };
  }

  if (modal) modal.classList.add('open');
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  if (modal) modal.classList.remove('open');
}

// حفظ واسترجاع السلة في LocalStorage
function saveCart() {
  localStorage.setItem('bakery_cart', JSON.stringify(AppState.cart));
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('bakery_cart');
    if (saved) {
      AppState.cart = JSON.parse(saved);
      updateCartUI();
    }
  } catch (e) {
    console.error("Cart loading error:", e);
  }
}

// توست إشعار منبثق
function triggerToast(text) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 25px;
      left: 25px;
      background: rgba(26, 21, 17, 0.95);
      border: 1px solid var(--border-highlight);
      color: var(--accent-cream);
      padding: 12px 22px;
      border-radius: 99px;
      font-size: 0.9rem;
      box-shadow: var(--shadow-md);
      z-index: 2000;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 10px;
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #34d399;"></i> ${text}`;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
  }, 3000);
}

// الأحداث والتنقل
function setupEventListeners() {
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (header) {
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
  });

  const cartTrigger = document.getElementById('cartTriggerBtn');
  if (cartTrigger) {
    cartTrigger.addEventListener('click', openCartDrawer);
  }

  const closeCartBtn = document.getElementById('closeCartBtn');
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeCartDrawer);
  }

  const cartOverlay = document.getElementById('cartDrawerOverlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) closeCartDrawer();
    });
  }

  const modalOverlay = document.getElementById('quickViewModal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeQuickView();
    });
  }
}
