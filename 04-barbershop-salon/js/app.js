/**
 * منطق وتفاعلية قالب الصالون والحلاقة (The Gentleman Lounge)
 */

document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  renderBarbers();
  initContact();
});

function initContact() {
  document.querySelectorAll('.js-barber-name').forEach(el => el.textContent = BARBER_CONFIG.brand.nameAr);
  document.querySelectorAll('.js-barber-address').forEach(el => el.textContent = BARBER_CONFIG.contact.addressAr);
  document.querySelectorAll('.js-barber-hours').forEach(el => el.textContent = BARBER_CONFIG.contact.workingHoursAr);
}

function renderServices() {
  const container = document.getElementById('servicesGrid');
  if (!container) return;

  container.innerHTML = BARBER_CONFIG.services.map(s => `
    <div class="service-card">
      <div class="srv-info">
        <h3>${s.nameAr}</h3>
        <p>${s.descAr}</p>
        <div class="srv-meta">
          <span><i class="fa-regular fa-clock"></i> ${s.duration}</span>
          ${s.badge ? `<span>${s.badge}</span>` : ''}
        </div>
      </div>
      <div class="srv-action">
        <span class="srv-price">${s.price} ${BARBER_CONFIG.contact.currency}</span>
        <button class="btn-gold" onclick="openBookingModalWithService('${s.nameAr}')">
          <i class="fa-solid fa-calendar-check"></i> احجز الموعد
        </button>
      </div>
    </div>
  `).join('');
}

function renderBarbers() {
  const container = document.getElementById('teamGrid');
  if (!container) return;

  container.innerHTML = BARBER_CONFIG.barbers.map(b => `
    <div class="barber-member-card">
      <img src="${b.image}" alt="${b.nameAr}" loading="lazy">
      <h3>${b.nameAr}</h3>
      <p>${b.titleAr}</p>
      <span>${b.experience}</span>
    </div>
  `).join('');
}

function openBookingModalWithService(serviceName = '') {
  const m = document.getElementById('bookingModal');
  const srvSelect = document.getElementById('bookService');
  if (srvSelect && serviceName) {
    srvSelect.value = serviceName;
  }
  if (m) m.classList.add('open');
}

function closeBookingModal() {
  const m = document.getElementById('bookingModal');
  if (m) m.classList.remove('open');
}

function submitBooking(e) {
  e.preventDefault();
  const service = document.getElementById('bookService').value;
  const barber = document.getElementById('bookBarber').value;
  const clientName = document.getElementById('clientName').value;
  const date = document.getElementById('bookDateTime').value;

  const msg = `*طلب حجز موعد في: ${BARBER_CONFIG.brand.nameAr}*\n--------------------\n• الخدمة المطلوبة: ${service}\n• المصفف المفضل: ${barber}\n• اسم العميل: ${clientName}\n• الموعد المفضل: ${date}\n--------------------\nيرجى تأكيد إتاحة الموعد. شكراً لكم! 💈`;
  window.open(`https://wa.me/${BARBER_CONFIG.contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  closeBookingModal();
}
