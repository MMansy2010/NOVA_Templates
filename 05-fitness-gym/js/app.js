/**
 * تفاعلية قالب الجيم واللياقة (IronPulse Gym)
 */

document.addEventListener('DOMContentLoaded', () => {
  renderPrograms();
  renderPricing();
  renderCoaches();
  renderFAQs();
  initGymContact();
});

function initGymContact() {
  document.querySelectorAll('.js-gym-name').forEach(el => el.textContent = GYM_CONFIG.brand.nameAr);
  document.querySelectorAll('.js-gym-address').forEach(el => el.textContent = GYM_CONFIG.contact.addressAr);
}

function renderPrograms() {
  const container = document.getElementById('programsGrid');
  if (!container) return;

  container.innerHTML = GYM_CONFIG.programs.map(p => `
    <div class="program-card">
      <img src="${p.image}" alt="${p.titleAr}" loading="lazy">
      <div class="program-body">
        <h3><i class="fa-solid ${p.icon}" style="color: var(--neon-lime);"></i> ${p.titleAr}</h3>
        <p>${p.descAr}</p>
      </div>
    </div>
  `).join('');
}

function renderPricing() {
  const container = document.getElementById('pricingGrid');
  if (!container) return;

  container.innerHTML = GYM_CONFIG.plans.map(pl => `
    <div class="plan-card ${pl.isPopular ? 'popular' : ''}">
      ${pl.badge ? `<span class="plan-badge">${pl.badge}</span>` : ''}
      <h3 class="plan-name">${pl.nameAr}</h3>
      <span class="plan-period">${pl.period}</span>
      <div class="plan-price">${pl.price} ${GYM_CONFIG.contact.currency}</div>
      <ul class="plan-features">
        ${pl.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join('')}
      </ul>
      <button class="btn-neon" onclick="subscribePlan('${pl.nameAr}', ${pl.price})" style="margin-top: auto; width: 100%; justify-content: center;">
        اشترك في هذه الباقة الآن
      </button>
    </div>
  `).join('');
}

function renderCoaches() {
  const container = document.getElementById('coachesGrid');
  if (!container) return;

  container.innerHTML = GYM_CONFIG.coaches.map(c => `
    <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 20px; overflow: hidden; text-align: center; padding-bottom: 20px;">
      <img src="${c.image}" alt="${c.nameAr}" style="width: 100%; height: 260px; object-fit: cover; margin-bottom: 14px;" loading="lazy">
      <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 4px;">${c.nameAr}</h3>
      <p style="font-size: 0.85rem; color: var(--neon-lime); margin-bottom: 4px;">${c.roleAr}</p>
      <span style="font-size: 0.78rem; color: var(--text-muted); display: block; padding: 0 14px;">${c.cert}</span>
    </div>
  `).join('');
}

function renderFAQs() {
  const container = document.getElementById('faqList');
  if (!container) return;

  container.innerHTML = GYM_CONFIG.faqs.map((faq, i) => `
    <div class="faq-item ${i === 0 ? 'active' : ''}" onclick="toggleFaq(this)">
      <div class="faq-q">
        <span>${faq.q}</span>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
      <div class="faq-a">${faq.a}</div>
    </div>
  `).join('');
}

function toggleFaq(el) {
  el.classList.toggle('active');
}

function subscribePlan(planName, price) {
  const msg = `مرحباً، أود الاشتراك في باقة:\n• *${planName}* (${price} ${GYM_CONFIG.contact.currency})\nيرجى إفادتي بطرق الدفع وتفعيل العضوية. شكراً لكم! 💪`;
  window.open(`https://wa.me/${GYM_CONFIG.contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
}

function claimFreeTrial(e) {
  e.preventDefault();
  const name = document.getElementById('trialName').value;
  const phone = document.getElementById('trialPhone').value;
  const goal = document.getElementById('trialGoal').value;

  const msg = `*طلب تجربة مجانية ليوم كامل (Free 1-Day Pass)* ⚡\n--------------------\n• الاسم: ${name}\n• الهاتف: ${phone}\n• هدفي البدني: ${goal}\n--------------------\nأود تحديد موعد الزيارة وعمل قياس InBody مجاناً.`;
  window.open(`https://wa.me/${GYM_CONFIG.contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
}
