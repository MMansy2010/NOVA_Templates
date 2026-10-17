/**
 * تفاعلية قالب الشركات والخدمات (Apex Premier Solutions)
 */

document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  renderProcess();
  renderPortfolio();
  renderTestimonials();
  initBizContact();
});

function initBizContact() {
  document.querySelectorAll('.js-biz-name').forEach(el => el.textContent = BIZ_CONFIG.brand.nameAr);
  document.querySelectorAll('.js-biz-address').forEach(el => el.textContent = BIZ_CONFIG.contact.addressAr);
}

function renderServices() {
  const container = document.getElementById('servicesGrid');
  if (!container) return;

  container.innerHTML = BIZ_CONFIG.services.map(s => `
    <div class="service-box">
      <div class="srv-icon"><i class="fa-solid ${s.icon}"></i></div>
      <h3>${s.titleAr}</h3>
      <p>${s.descAr}</p>
      <ul class="srv-features-list">
        ${s.features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('')}
      </ul>
      <button class="btn-blue" onclick="requestServiceQuote('${s.titleAr}')" style="margin-top: 22px; width: 100%; justify-content: center;">
        طلب دراسة أو عرض سعر
      </button>
    </div>
  `).join('');
}

function renderProcess() {
  const container = document.getElementById('processGrid');
  if (!container) return;

  container.innerHTML = BIZ_CONFIG.processSteps.map(p => `
    <div class="step-card">
      <div class="step-num">${p.step}</div>
      <h3>${p.titleAr}</h3>
      <p>${p.descAr}</p>
    </div>
  `).join('');
}

function renderPortfolio() {
  const container = document.getElementById('portfolioGrid');
  if (!container) return;

  container.innerHTML = BIZ_CONFIG.portfolio.map(item => `
    <div class="project-card">
      <img src="${item.image}" alt="${item.titleAr}" loading="lazy">
      <div class="project-body">
        <span class="project-cat">${item.categoryAr} • ${item.clientAr}</span>
        <h3>${item.titleAr}</h3>
        <p><strong style="color: var(--blue-primary);">النتيجة والأثر:</strong> ${item.impactAr}</p>
      </div>
    </div>
  `).join('');
}

function renderTestimonials() {
  const container = document.getElementById('testimonialsGrid');
  if (!container) return;

  container.innerHTML = BIZ_CONFIG.testimonials.map(t => `
    <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 20px; padding: 26px;">
      <div style="color: #fbbf24; margin-bottom: 12px;">
        ${'<i class="fa-solid fa-star"></i>'.repeat(t.rating)}
      </div>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 16px;">"${t.comment}"</p>
      <strong style="color: #fff; font-size: 1rem; display: block;">${t.name}</strong>
      <span style="color: var(--blue-primary); font-size: 0.8rem;">${t.role}</span>
    </div>
  `).join('');
}

function requestServiceQuote(serviceName) {
  const select = document.getElementById('quoteService');
  if (select) {
    select.value = serviceName;
  }
  const sec = document.getElementById('quoteSec');
  if (sec) sec.scrollIntoView({ behavior: 'smooth' });
}

function submitQuoteRequest(e) {
  e.preventDefault();
  const company = document.getElementById('companyName').value;
  const contactPerson = document.getElementById('contactPerson').value;
  const phone = document.getElementById('clientPhone').value;
  const service = document.getElementById('quoteService').value;
  const details = document.getElementById('projectDetails').value;

  const msg = `*طلب استشارة وعرض سعر - ${BIZ_CONFIG.brand.nameAr}*\n--------------------\n• اسم المنشأة / العميل: ${company}\n• الشخص المسؤول: ${contactPerson}\n• رقم الهاتف: ${phone}\n• الخدمة المطلوبة: ${service}\n• تفاصيل المشروع: ${details || 'لا توجد تفاصيل إضافية'}\n--------------------\nيرجى التواصل معنا لتحديد موعد معاينة فنية.`;
  window.open(`https://wa.me/${BIZ_CONFIG.contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
}
