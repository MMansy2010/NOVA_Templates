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
  initHeroInteractiveBackground();
  initHeroParallaxStage();
  renderProducts();
  renderFilters();
  setup3DTiltCards();
  initBoxBuilder();
  setupEventListeners();
  loadCart();
});

// ==========================================================================
// 1. BESPOKE INTERACTIVE BACKGROUND ENGINE (Flour & Golden Dust Particles)
// ==========================================================================
function initHeroInteractiveBackground() {
  const heroSection = document.getElementById('home');
  const canvas = document.getElementById('heroBackgroundCanvas');
  const ambientGlow = document.getElementById('ambientCursorGlow');
  const floatingItems = document.querySelectorAll('.bg-float-item');

  if (!heroSection || !canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let animationId = null;
  let isHeroVisible = true;

  // إعدادات الماوس مع تنعيم حركة الهالة الضوئية
  const mouse = {
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    glowX: -1000,
    glowY: -1000,
    radius: 140,
    isInside: false,
    prevX: 0,
    prevY: 0,
    speed: 0
  };

  // نظام الجزيئات (ذرات الدقيق وشرارات الذهب الدافئة)
  const particles = [];
  const PARTICLE_COUNT = 65;
  const particleColors = [
    'rgba(230, 183, 108, 0.75)',  // ذهبي براق
    'rgba(245, 209, 153, 0.65)',  // شامبين دافئ
    'rgba(252, 249, 242, 0.55)',  // أبيض عاجي نقي (دقيق فرنسي)
    'rgba(229, 152, 56, 0.60)',   // عنبر دافئ
    'rgba(180, 83, 9, 0.45)'      // نحاسي مخملي
  ];

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.5 + 0.8;
      this.baseSize = this.size;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -(Math.random() * 0.5 + 0.2); // طفو طبيعي للأعلى
      this.alpha = Math.random() * 0.55 + 0.2;
      this.baseAlpha = this.alpha;
      this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      this.wobbleSpeed = Math.random() * 0.03 + 0.01;
      this.wobbleAngle = Math.random() * Math.PI * 2;
      this.wobbleRadius = Math.random() * 1.2 + 0.3;
      this.life = 1;
      this.isSpark = false;
    }

    update() {
      this.wobbleAngle += this.wobbleSpeed;
      this.x += this.vx + Math.cos(this.wobbleAngle) * this.wobbleRadius;
      this.y += this.vy;

      // تفاعل فيزيائي عند اقتراب الماوس من الجزيء
      if (mouse.isInside) {
        const dx = this.x - mouse.targetX;
        const dy = this.y - mouse.targetY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius);
          const pushX = (dx / dist) * force * 4.5;
          const pushY = (dy / dist) * force * 4.5;

          this.x += pushX;
          this.y += pushY;
          this.alpha = Math.min(1, this.baseAlpha + force * 0.45);
          this.size = this.baseSize + force * 1.5;
        } else {
          this.alpha += (this.baseAlpha - this.alpha) * 0.05;
          this.size += (this.baseSize - this.size) * 0.05;
        }
      }

      // إذا كانت شرارة مؤقتة من حركة الماوس السريعة
      if (this.isSpark) {
        this.life -= 0.025;
        this.alpha = this.life * 0.8;
        if (this.life <= 0) {
          this.reset();
        }
        return;
      }

      // إعادة التدوير عند الخروج من أطراف الشاشة
      if (this.y < -20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      // هالة إضاءة دائرية للجزيئات الأكبر حجماً
      if (this.size > 2) {
        ctx.fillStyle = 'rgba(230, 183, 108, 0.15)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // ضبط أبعاد الكانفاس بدقة الشاشة
  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = heroSection.clientWidth;
    height = heroSection.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    if (particles.length === 0) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    }
  }

  resizeCanvas();
  window.addEventListener('resize', debounce(resizeCanvas, 150));

  // استشعار حركة الماوس فوق قسم الهيرو
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;

    mouse.targetX = curX;
    mouse.targetY = curY;
    mouse.isInside = true;

    // حساب سرعة الماوس لإطلاق ذرات ضوئية متطايرة عند الحركة السريعة
    const distMoved = Math.hypot(curX - mouse.prevX, curY - mouse.prevY);
    mouse.speed = distMoved;
    mouse.prevX = curX;
    mouse.prevY = curY;

    if (distMoved > 25 && particles.length < PARTICLE_COUNT + 15) {
      const spark = new Particle();
      spark.x = curX + (Math.random() - 0.5) * 20;
      spark.y = curY + (Math.random() - 0.5) * 20;
      spark.vx = (Math.random() - 0.5) * 1.5;
      spark.vy = (Math.random() - 0.5) * 1.5 - 0.5;
      spark.color = '#f5d199';
      spark.size = Math.random() * 2 + 1;
      spark.isSpark = true;
      spark.life = 1;
      particles.push(spark);
    }

    // Parallax خفيف على الأيقونات العائمة في الخلفية
    const centerRelX = (curX - rect.width / 2) / (rect.width / 2);
    const centerRelY = (curY - rect.height / 2) / (rect.height / 2);

    floatingItems.forEach((item) => {
      const depth = parseFloat(item.getAttribute('data-depth')) || 0.1;
      const moveX = centerRelX * depth * -45;
      const moveY = centerRelY * depth * -35;
      item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    if (ambientGlow) {
      ambientGlow.style.opacity = '1';
    }
  });

  heroSection.addEventListener('mouseleave', () => {
    mouse.isInside = false;
    mouse.targetX = -1000;
    mouse.targetY = -1000;

    if (ambientGlow) {
      ambientGlow.style.opacity = '0';
    }

    floatingItems.forEach((item) => {
      item.style.transform = `translate3d(0, 0, 0)`;
    });
  });

  // حلقة الرسوم المتحركة (60 FPS مع حماية الذاكرة)
  function animate() {
    if (!isHeroVisible) {
      animationId = requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // تنعيم حركة الهالة الضوئية خلف الماوس (Lerp)
    if (ambientGlow && mouse.isInside) {
      mouse.glowX += (mouse.targetX - mouse.glowX) * 0.12;
      mouse.glowY += (mouse.targetY - mouse.glowY) * 0.12;
      ambientGlow.style.left = `${mouse.glowX}px`;
      ambientGlow.style.top = `${mouse.glowY}px`;
    }

    // تحديث ورسم جزيئات الغبار والذهب
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();

      if (p.isSpark && p.life <= 0) {
        particles.splice(i, 1);
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  animate();

  // إيقاف المعالجة عند النزول لأسفل الصفحة للحفاظ على أفضل أداء وسلاسة
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isHeroVisible = entry.isIntersecting;
    });
  }, { threshold: 0.1 });

  observer.observe(heroSection);
}

// دالة تأخير لمعالجة الأحداث المتكررة
function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
}

// ==========================================================================
// 2. REALISTIC 3D PARALLAX SHOWCASE CONTROLLER
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
