/**
 * إعدادات وتخصيص قالب صالون الحلاقة والعناية الشخصية (Barber Shop & Salon Template)
 */
const BARBER_CONFIG = {
  brand: {
    nameAr: "ذا جنتلمان | صالون ونادي العناية بالرجل",
    nameEn: "The Gentleman Lounge & Grooming Club",
    sloganAr: "إطلالة كلاسيكية ولمسة عصرية بأيدي أمهر مصففي الشعر",
    rating: "4.96",
    reviewsCount: "1,200+"
  },
  contact: {
    whatsapp: "201000000000",
    phone: "+20 100 000 0000",
    addressAr: "ميدان الكوربة، مصر الجديدة، القاهرة",
    workingHoursAr: "يومياً من 11:00 صباحاً حتى 11:00 مساءً (الجمعة من 1:00 ظهراً)",
    currency: "ج.م"
  },
  categories: [
    { id: "hair", nameAr: "قص وتصفيف الشعر", icon: "scissors" },
    { id: "beard", nameAr: "حلاقة وتحديد اللحية", icon: "user" },
    { id: "spa", nameAr: "العناية بالبشرة والمساج", icon: "spa" },
    { id: "vip", nameAr: "باقات كبار الشخصيات والعريس", icon: "crown" }
  ],
  services: [
    {
      id: "srv-1",
      categoryId: "hair",
      nameAr: "قصة شعر ملكية مخصصة (Signature Haircut)",
      descAr: "استشارة شكل الوجه، غسيل معالج بالزيوت العطرية، قص دقيق، تدليك فروة الرأس، وتصفيف بمنتجات إيطالية فاخرة.",
      price: 180,
      duration: "35 دقيقة",
      badge: "الأكثر طلباً 🔥"
    },
    {
      id: "srv-2",
      categoryId: "beard",
      nameAr: "طقوس حلاقة اللحية بالفوطة الساخنة (Hot Towel Shave)",
      descAr: "حلاقة كلاسيكية بموس الحلاقة المعقم، فوطة بخار ساخنة مع خلاصة الأوكالبتوس، وتحديد دقيق مع زيت تغذية اللحية.",
      price: 120,
      duration: "25 دقيقة",
      badge: "استرخاء تام 💈"
    },
    {
      id: "srv-3",
      categoryId: "spa",
      nameAr: "جلسة هيدرافيشال لتنظيف البشرة العميق (HydraFacial)",
      descAr: "تنظيف مسام بالموجات فوق الصوتية، إزالة الرؤوس السوداء، ماسك الطين البركاني المغذي، وترطيب بحمض الهيالورونيك.",
      price: 320,
      duration: "45 دقيقة",
      badge: "نضارة فورية ✨"
    },
    {
      id: "srv-4",
      categoryId: "hair",
      nameAr: "جلسة علاج البروتين أو الكيراتين للشعر",
      descAr: "تنعيم وتغذية ألياف الشعر الجاف ببروتين طبيعي خالٍ من الفورمالين يمنح شعرك حيوية ولمعاناً لمدة شهور.",
      price: 450,
      duration: "60 دقيقة"
    },
    {
      id: "srv-5",
      categoryId: "vip",
      nameAr: "باقة العريس المتكاملة (Groom VIP Experience)",
      descAr: "تشمل قصة شعر ملكية، عناية كاملة باللحية، تنظيف بشرة هيدرافيشال، باديكير علاجي، مساج أكتاف ورقبة، وضيافة مشروب فاخر.",
      price: 950,
      duration: "120 دقيقة",
      badge: "يوم العمر 👑"
    }
  ],
  barbers: [
    {
      nameAr: "كابتن زياد فؤاد",
      titleAr: "خبير قصات كلاسيكية ومدير الصالون",
      experience: "12 سنة خبرة",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    },
    {
      nameAr: "أندريه سمير",
      titleAr: "أخصائي تحديد لحية وعناية بالبشرة",
      experience: "8 سنوات خبرة",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
      nameAr: "عمر خيري",
      titleAr: "مصفف قصات تريند وفيدنج حديث",
      experience: "6 سنوات خبرة",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    }
  ]
};
