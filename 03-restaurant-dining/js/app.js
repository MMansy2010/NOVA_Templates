/**
 * تفاعلية قالب المطعم (Veranza Dining)
 */

let activeCat = 'signature';

document.addEventListener('DOMContentLoaded', () => {
  renderCatTabs();
  renderDishes();
  renderBranches();
  renderDeliveryPartners();
});

function renderCatTabs() {
  const container = document.getElementById('catTabs');
  if (!container) return;

  container.innerHTML = RESTAURANT_CONFIG.categories.map(c => `
    <button class="cat-btn ${c.id === activeCat ? 'active' : ''}" onclick="filterCat('${c.id}')">
      <i class="fa-solid fa-${c.icon}" style="margin-left: 6px;"></i> ${c.nameAr}
    </button>
  `).join('');
}

function filterCat(id) {
  activeCat = id;
  renderCatTabs();
  renderDishes();
}

function renderDishes() {
  const container = document.getElementById('dishesGrid');
  if (!container) return;

  const items = RESTAURANT_CONFIG.dishes.filter(d => d.categoryId === activeCat);
  container.innerHTML = items.map(d => `
    <div class="dish-card">
      <div class="dish-img-wrap">
        <img src="${d.image}" alt="${d.nameAr}" loading="lazy">
        ${d.badge ? `<span class="dish-badge">${d.badge}</span>` : ''}
      </div>
      <div class="dish-body">
        <h3 class="dish-name">${d.nameAr}</h3>
        <p class="dish-desc">${d.descAr}</p>
        <div class="dish-footer">
          <span class="dish-price">${d.price} ${RESTAURANT_CONFIG.contact.currency}</span>
          <button class="btn-crimson" onclick="orderDish('${d.nameAr}', ${d.price})">
            <i class="fa-solid fa-utensils"></i> اطلب الآن
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderBranches() {
  const container = document.getElementById('branchesGrid');
  if (!container) return;

  container.innerHTML = RESTAURANT_CONFIG.branches.map(b => `
    <div class="branch-card">
      <h3><i class="fa-solid fa-location-dot" style="color: var(--crimson-primary); margin-left: 8px;"></i> ${b.nameAr}</h3>
      <p><strong>العنوان:</strong> ${b.address}</p>
      <p><strong>الهاتف:</strong> ${b.phone}</p>
      <p><strong>ساعات العمل:</strong> ${b.hours}</p>
      <a href="https://wa.me/${RESTAURANT_CONFIG.contact.whatsapp}?text=${encodeURIComponent('مرحباً أود الاستفسار عن ' + b.nameAr)}" target="_blank" style="color: var(--gold-accent); font-weight: 700; text-decoration: none; display: inline-block; margin-top: 10px;">
        <i class="fa-brands fa-whatsapp"></i> تواصل مع الفرع
      </a>
    </div>
  `).join('');
}

function renderDeliveryPartners() {
  const container = document.getElementById('deliveryPartners');
  if (!container) return;

  container.innerHTML = RESTAURANT_CONFIG.deliveryPartners.map(p => `
    <a href="${p.url}" target="_blank" class="partner-item">
      <i class="fa-solid ${p.icon}" style="color: var(--crimson-primary); font-size: 1.2rem;"></i>
      <span>اطلب عبر ${p.name}</span>
    </a>
  `).join('');
}

function orderDish(name, price) {
  const msg = `مرحباً، أود طلب طبق من المنيو:\n• *${name}* (${price} ${RESTAURANT_CONFIG.contact.currency})\nيرجى إفادتي بإمكانية التوصيل أو الاستلام. شكراً لك! 🍽️`;
  window.open(`https://wa.me/${RESTAURANT_CONFIG.contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
}

function openTableModal() {
  const m = document.getElementById('tableModal');
  if (m) m.classList.add('open');
}

function closeTableModal() {
  const m = document.getElementById('tableModal');
  if (m) m.classList.remove('open');
}

function submitTableBooking(e) {
  e.preventDefault();
  const name = document.getElementById('guestName').value;
  const branch = document.getElementById('bookingBranch').value;
  const count = document.getElementById('guestCount').value;
  const time = document.getElementById('bookingTime').value;
  const seating = document.getElementById('seatingArea').value;

  const msg = `*طلب حجز طاولة في: ${RESTAURANT_CONFIG.brand.nameAr}*\n--------------------\n• الفرع: ${branch}\n• الاسم: ${name}\n• عدد الضيوف: ${count}\n• الموعد: ${time}\n• منطقة الجلوس: ${seating}\n--------------------\nيرجى إفادتي بتأكيد الحجز.`;
  window.open(`https://wa.me/${RESTAURANT_CONFIG.contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  closeTableModal();
}
