/**
 * إعدادات وتخصيص قالب الكافيه والقهوة المختصة (Specialty Coffee & Roastery)
 */
const CAFE_CONFIG = {
  brand: {
    nameAr: "برو آند بين | كافيه ومحمصة مختصة",
    nameEn: "Brew & Bean Specialty Coffee & Roastery",
    sloganAr: "حبوب بن فاخرة محصودة بعناية ومحمصة بشغف لتجربة لا تُنسى",
    sloganEn: "Artisanal specialty coffee crafted from world-class single origin beans",
    rating: "4.95",
    reviewsCount: "980+"
  },
  contact: {
    whatsapp: "201146945584",
    phone: "+20 114 694 5584",
    addressAr: "الممشى السياحي، التجمع الخامس، القاهرة الجديدة",
    addressEn: "The Promenade, New Cairo",
    workingHoursAr: "يومياً من 6:30 ص حتى 1:00 بعد منتصف الليل",
    workingHoursEn: "Daily from 6:30 AM to 1:00 AM",
    currency: "ج.م",
    wifiName: "BrewBean_Guest",
    wifiPassword: "SingleOrigin2026"
  },
  categories: [
    { id: "espresso", nameAr: "إسبريسو ومشروبات الحليب", icon: "mug-hot" },
    { id: "pourover", nameAr: "التقطير اليدوي (V60 & Chemex)", icon: "filter" },
    { id: "coldbrew", nameAr: "المشروبات الباردة والآيس كوفي", icon: "glass-water" },
    { id: "beans", nameAr: "محصول البن المنزلي (حبوب كاملة)", icon: "seedling" },
    { id: "desserts", nameAr: "حلويات القهوة الطازجة", icon: "cookie" }
  ],
  products: [
    {
      id: "cf-1",
      categoryId: "espresso",
      nameAr: "فلات وايت كورتادو مزدوج (Flat White)",
      descAr: "جرعتين إسبريسو غنية بحبوب إثيوبية مع طبقة ميكرو فوم مخملية تبرز حلاوة الحليب الطبيعي.",
      price: 70,
      badge: "الأكثر طلباً 🔥",
      image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80",
      origin: "إثيوبيا يرغاتشيفي"
    },
    {
      id: "cf-2",
      categoryId: "espresso",
      nameAr: "سبانش لاتيه بارد أو ساخن (Spanish Latte)",
      descAr: "مزيج متوازن بين الإسبريسو والحليب المكثف بنكهة الكراميل الغنية ورشة قرفة ناعمة.",
      price: 85,
      badge: "نكهة مميزة ✨",
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
      origin: "كولومبيا سوبريمو"
    },
    {
      id: "cf-3",
      categoryId: "pourover",
      nameAr: "تقطير يدوي V60 - محصول إثيوبي فاخر",
      descAr: "إيحاءات التوت الأسود، زهر الياسمين، مع حموضة فاكهية متألقة ونهاية عطرية منعشة.",
      price: 95,
      badge: "عشاق القهوة المختصة ☕",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      origin: "إثيوبيا - معالجة مجففة"
    },
    {
      id: "cf-4",
      categoryId: "pourover",
      nameAr: "كيمكس Chemex - محصول كولومبي هويلا",
      descAr: "قهوة نقية جداً بقوام حريري ناعم، بنكهات الشوكولاتة الداكنة، قصب السكر، والمكسرات المحمصة.",
      price: 100,
      badge: "توقيع الباريستا ⭐",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      origin: "كولومبيا هويلا - معالجة مغسولة"
    },
    {
      id: "cf-5",
      categoryId: "coldbrew",
      nameAr: "كولد برو منقوع 20 ساعة (Nitro Cold Brew)",
      descAr: "مستخلص بنكهة مركزة خالية من المرارة والحموضة الزائدة، يقدم مثلجاً بفقاعات النيتروجين المنعشة.",
      price: 90,
      badge: "انتعاش فائق 🧊",
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
      origin: "مزيج المحمصة الخاص"
    },
    {
      id: "cf-6",
      categoryId: "coldbrew",
      nameAr: "آيس شيكن إسبريسو بالفانيليا وحليب الشوفان",
      descAr: "إسبريسو مخفوق بالثلج مع مستخلص الفانيليا العضوية وحليب الشوفان السويدي الكريمي.",
      price: 88,
      badge: "نباتي 100% 🌿",
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
      origin: "البرازيل سانتوس"
    },
    {
      id: "cf-7",
      categoryId: "beans",
      nameAr: "كيس بن إثيوبيا غوجي (250 جرام حبوب كاملة)",
      descAr: "ارتفاع 2100م، معالجة طبيعية، إيحاءات الخوخ والبرغموت والعسل. تاريخ التحميص خلال 5 أيام.",
      price: 240,
      badge: "جديد المحمصة 🌾",
      image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=80",
      origin: "إثيوبيا غوجي"
    },
    {
      id: "cf-8",
      categoryId: "desserts",
      nameAr: "سان سباستيان تشيز كيك مع الشوكولاتة الذائبة",
      descAr: "تشيز كيك كريمي محروق السطح على الطريقة الإسبانية، يقدم دافئاً مع صوص الشوكولاتة البلجيكية.",
      price: 115,
      badge: "رفيق القهوة الأمثل 🍰",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80"
    }
  ],
  ambianceFeatures: [
    {
      icon: "fa-wifi",
      titleAr: "بيئة عمل ومذاكرة مثالية",
      descAr: "إنترنت فايبر فائق السرعة، ومقابس كهربائية بجوار كل طاولة مع إضاءة دافئة مريحة للعين."
    },
    {
      icon: "fa-music",
      titleAr: "موسيقى لو-فاي وجاز هادئة",
      descAr: "قوائم موسيقية منتقاة بعناية لتعزيز التركيز أو الاسترخاء والحديث المريح مع أصدقائك."
    },
    {
      icon: "fa-fire",
      titleAr: "محمصة مفتوحة داخل المكان",
      descAr: "شاهد خبير التحميص وهو يعتني بحبوب البن واستمتع بعبق القهوة المحمصة في الأرجاء."
    },
    {
      icon: "fa-leaf",
      titleAr: "خيارات بدائل الحليب النباتي",
      descAr: "نوفر حليب الشوفان، واللوز، وجوز الهند بدون أي تكلفة إضافية لراحتك."
    }
  ]
};
