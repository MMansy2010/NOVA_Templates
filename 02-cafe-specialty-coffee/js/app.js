/**
 * منطق وتفاعلية قالب الكافيه والقهوة المختصة (Brew & Bean)
 */

let activeCat = 'espresso';

document.addEventListener('DOMContentLoaded', () => {
  renderTabs();
  renderDrinks();
  renderAmbiance();
  initContactLinks();
});

function initContactLinks() {
  document.querySelectorAll('.js-cafe-name').forEach(el => el.textContent = CAFE_CONFIG.brand.nameAr);
  document.querySelectorAll('.js-cafe-address').forEach(el => el.textContent = CAFE_CONFIG.contact.addressAr);
  document.querySelectorAll('.js-cafe-hours').forEach(el => el.textContent = CAFE_CONFIG.contact.workingHoursAr);
}

function renderTabs() {
  const container = document.getElementById('categoryBar');
  if (!container) return;

  container.innerHTML = CAFE_CONFIG.categories.map(cat => `
    <button class="cat-pill ${cat.id === activeCat ? 'active' : ''}" onclick="selectCategory('${cat.id}')">
      <i class="fa-solid fa-${cat.icon}" style="margin-left: 6px;"></i> ${cat.nameAr}
    </button>
  `).join('');
}

function selectCategory(id) {
  activeCat = id;
  renderTabs();
  renderDrinks();
}

function renderDrinks() {
  const container = document.getElementById('drinksGrid');
  if (!container) return;

  const items = CAFE_CONFIG.products.filter(p => p.categoryId === activeCat);
  container.innerHTML = items.map(d => `
    <div class="drink-card">
      <div class="drink-img-wrap">
        <img src="${d.image}" alt="${d.nameAr}" loading="lazy">
        ${d.badge ? `<span class="drink-badge">${d.badge}</span>` : ''}
      </div>
      <div class="drink-body">
        ${d.origin ? `<div class="drink-origin"><i class="fa-solid fa-earth-africa"></i> ${d.origin}</div>` : ''}
        <h3 class="drink-title">${d.nameAr}</h3>
        <p class="drink-desc">${d.descAr}</p>
        <div class="drink-footer">
          <span class="drink-price">${d.price} ${CAFE_CONFIG.contact.currency}</span>
          <button class="btn-cafe-primary" onclick="quickOrder('${d.nameAr}', ${d.price})">
            <i class="fa-brands fa-whatsapp"></i> طلب الآن
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderAmbiance() {
  const container = document.getElementById('ambianceGrid');
  if (!container) return;

  container.innerHTML = CAFE_CONFIG.ambianceFeatures.map(a => `
    <div class="ambiance-box">
      <div class="ambiance-icon"><i class="fa-solid ${a.icon}"></i></div>
      <h3>${a.titleAr}</h3>
      <p>${a.descAr}</p>
    </div>
  `).join('');
}

function quickOrder(itemName, price) {
  const msg = `مرحباً، أود طلب كافيه:\n• *${itemName}* (${price} ${CAFE_CONFIG.contact.currency})\nيرجى إفادتي بوقت الاستلام أو التوصيل. شكراً لك! ☕`;
  window.open(`https://wa.me/${CAFE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
}

function openReserveModal() {
  const m = document.getElementById('reserveModal');
  if (m) m.classList.add('open');
}

function closeReserveModal() {
  const m = document.getElementById('reserveModal');
  if (m) m.classList.remove('open');
}

function submitReservation(e) {
  e.preventDefault();
  const name = document.getElementById('resName').value;
  const count = document.getElementById('resCount').value;
  const time = document.getElementById('resTime').value;
  const note = document.getElementById('resNote').value;

  const msg = `*طلب حجز طاولة في: ${CAFE_CONFIG.brand.nameAr}*\n--------------------\n• الاسم: ${name}\n• عدد الأفراد: ${count}\n• الموعد: ${time}\n• ملاحظة: ${note || 'لا يوجد'}\n--------------------\nيرجى تأكيد الحجز وإرسال الموقع.`;
  window.open(`https://wa.me/${CAFE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  closeReserveModal();
}
