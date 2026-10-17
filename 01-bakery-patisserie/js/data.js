/**
 * إعدادات وتخصيص قالب المخبز والحلويات (Bakery & Patisserie Template)
 * يمكن لأي عميل أو مبرمج تعديل هذه البيانات بسهولة لإنشاء موقع كامل في دقائق!
 */
const BAKERY_CONFIG = {
  brand: {
    nameAr: "لو دوريه باتيسري ومخبز فاخر",
    nameEn: "Le Doré Artisan Bakery & Patisserie",
    sloganAr: "مخبوزات فرنسية أصيلة بحب يومياً منذ الفجر",
    sloganEn: "Authentic French viennoiserie & handcrafted pastries baked fresh at dawn",
    logoIcon: "croissant",
    sinceYear: "2018",
    rating: "4.9",
    reviewsCount: "1,450+"
  },
  contact: {
    whatsapp: "201000000000", // رقم الواتساب بدون علامة +
    phone: "+20 100 000 0000",
    email: "bonjour@ledore-bakery.com",
    addressAr: "شارع النزهة، مصر الجديدة، القاهرة (بجوار كافيه دي باريس)",
    addressEn: "El Nozha St, Heliopolis, Cairo",
    googleMapsUrl: "https://maps.google.com",
    workingHoursAr: "يومياً من 7:00 صباحاً حتى 11:30 مساءً",
    workingHoursEn: "Daily from 7:00 AM to 11:30 PM",
    currency: "ج.م",
    deliveryFee: 30,
    freeDeliveryThreshold: 450
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com"
  },
  categories: [
    { id: "all", nameAr: "كل الأصناف", icon: "sparkles" },
    { id: "viennoiserie", nameAr: "الكرواسون والفينوازري", icon: "croissant" },
    { id: "cakes", nameAr: "التورت والكعكات الملكية", icon: "cake" },
    { id: "bread", nameAr: "الخبز الحرفي والساوردو", icon: "loaf" },
    { id: "macarons", nameAr: "الماكرون والحلويات الفرنسية", icon: "cookie" },
    { id: "catering", nameAr: "بوكسات الجمعات والمناسبات", icon: "gift" }
  ],
  products: [
    {
      id: "prod-1",
      categoryId: "viennoiserie",
      nameAr: "كرواسون الزبدة الملكي (Pur Beurre)",
      nameEn: "Classic French Butter Croissant",
      descAr: "طبقات هشة ذهبية محشوة بزبدة بريتاني الفرنسية بنكهة غنية تذوب بالفم.",
      price: 65,
      oldPrice: 75,
      badge: "الأكثر طلباً 🔥",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
      isFreshDaily: true,
      prepTime: "طازج يومياً 7 ص",
      allergens: ["غلوتين", "حليب", "بيض"]
    },
    {
      id: "prod-2",
      categoryId: "viennoiserie",
      nameAr: "كرواسون الفستق والكريمة الفاخرة",
      nameEn: "Pistachio Praliné Croissant",
      descAr: "محشو بكريمة الفستق الحلبي الإيطالي الغني مع حبات الفستق المحمص ورقائق الذهب الغذائي.",
      price: 110,
      badge: "توقيع الشيف ⭐",
      image: "https://images.unsplash.com/photo-1623334044303-2510e609b7f3?auto=format&fit=crop&w=800&q=80",
      isFreshDaily: true,
      allergens: ["مكسرات", "غلوتين", "حليب"]
    },
    {
      id: "prod-3",
      categoryId: "viennoiserie",
      nameAr: "دانش التوت الأحمر والفانيليا البوربون",
      nameEn: "Raspberry Bourbon Vanilla Danish",
      descAr: "عجينة البف بيستري المقرمشة مع كسترد فانيليا مدغشقر وتوت العليق الطازج.",
      price: 95,
      badge: "موسمي 🍓",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      allergens: ["غلوتين", "حليب"]
    },
    {
      id: "prod-4",
      categoryId: "cakes",
      nameAr: "تورتة شوكولاتة الترافل البلجيكية (8 أفراد)",
      nameEn: "Belgian Chocolate Truffle Entremet",
      descAr: "موس شوكولاتة كالي باوت 70% مع طبقة براوني مقرمشة وغاناش الجلاسيه اللامع.",
      price: 490,
      oldPrice: 550,
      badge: "الأعلى تقييماً 🏆",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      allergens: ["حليب", "بيض", "صويا"]
    },
    {
      id: "prod-5",
      categoryId: "cakes",
      nameAr: "تورتة البافلوفا مع الفواكه البرية",
      nameEn: "Wild Berries Pavlova Torte",
      descAr: "قاعدة مارينج فرنسي هش وخفيف مغطى بكريمة الماسكاربوني المخفوقة والفراولة والتوت.",
      price: 440,
      badge: "خفيف ومنعش 🫐",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
      allergens: ["بيض", "حليب"]
    },
    {
      id: "prod-6",
      categoryId: "cakes",
      nameAr: "تارت الليمون والميرانغ المحروق",
      nameEn: "Lemon Meringue Tart",
      descAr: "بسكويت سابليه مقرمش محشو بكريمة ليمون صقلية الحامضة ومزين بقمم الميرانغ الذهبية.",
      price: 125,
      badge: "كلاسيك باريسي 🍋",
      image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80",
      allergens: ["غلوتين", "بيض", "حليب"]
    },
    {
      id: "prod-7",
      categoryId: "bread",
      nameAr: "خبز الساوردو الحرفي بالتخمير البطيء 36 ساعة",
      nameEn: "Artisan Country Sourdough Loaf",
      descAr: "مخبوز من دقيق عضوي بالخميرة الطبيعية، قشرة مقرمشة ولب طري متخمر بسهولة هضم فائقة.",
      price: 85,
      badge: "عضوي 100% 🌾",
      image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80",
      allergens: ["غلوتين"]
    },
    {
      id: "prod-8",
      categoryId: "bread",
      nameAr: "خبز الباجيت الفرنسي التقليدي (Baguette)",
      nameEn: "Traditional French Baguette",
      descAr: "الباجيت الأصلي على طريقة مخابز باريس، ذهبي ومقرمش من الخارج وطري من الداخل.",
      price: 35,
      badge: "يومي طازج 🥖",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      allergens: ["غلوتين"]
    },
    {
      id: "prod-9",
      categoryId: "macarons",
      nameAr: "علبة ماكرون باريس الملكية (12 قطعة)",
      nameEn: "Royale Paris Macaron Gift Box (12 pcs)",
      descAr: "تشكيلة نكهات مختارة: فستق، فانيليا تاهيتي، كراميل مملح، لافندر وتوت، وشوكولاتة غانا.",
      price: 280,
      badge: "هدية فاخرة 🎁",
      image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80",
      allergens: ["لوز", "بيض", "حليب"]
    },
    {
      id: "prod-10",
      categoryId: "catering",
      nameAr: "بوكس الجمعات الصباحية (Morning Gathering Box)",
      nameEn: "Breakfast & Morning Gathering Box",
      descAr: "يحتوي على 16 قطعة ميني كرواسون مشكل (جبن، فستق، زعتر، كلاسيك) + 6 ميني دوناتس أو تارت.",
      price: 520,
      oldPrice: 600,
      badge: "الأوفر للمجموعات ✨",
      image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=800&q=80",
      allergens: ["غلوتين", "مكسرات", "حليب", "بيض"]
    }
  ],
  features: [
    {
      icon: "fa-seedling",
      titleAr: "زبدة فرنسية ودقيق عضوي",
      descAr: "نستورد أجود المكونات الطبيعية بنسبة 100% دون أي ملونات أو مواد حافظة صناعية."
    },
    {
      icon: "fa-fire-burner",
      titleAr: "خبز على 3 دفعات يومياً",
      descAr: "تخرج مخبوزاتنا طازجة ومقرمشة 3 مرات باليوم في السابعة صباحاً، والواحدة ظهراً، والخامسة مساءً."
    },
    {
      icon: "fa-award",
      titleAr: "بإشراف شيف شريك معتمد",
      descAr: "وصفات معتمدة ومتقنة مستوحاة من أعرق مدارج الباتيسري الكلاسيكية في باريس."
    },
    {
      icon: "fa-truck-fast",
      titleAr: "توصيل سريع مبرد بعناية",
      descAr: "تغليف حراري محكم يحفظ هشاشة الكرواسون وبرودة التورت لتصلك بنفس جودة المتجر."
    }
  ],
  testimonials: [
    {
      name: "سارة عبد الرحمن",
      role: "عميلة دائمة",
      comment: "أفضل كرواسون فستق ذقته في مصر بدون مبالغة، الهشاشة والزبدة موزونة بنسبة 100% وتغليف الطلب يفتح النفس!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "كريم المنشاوي",
      role: "منظم فعاليات",
      comment: "طلبنا بوكس الجمعات لإفطار شركة لـ 40 فرد، الإقبال كان خيالي وكل الزملاء سألوا عن اسم المخبز. دقة في الموعد وجودة راقية.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "د. هبة الشافعي",
      role: "عاشقة للمخبوزات الصحية",
      comment: "خبز الساوردو عندهم هو الوحيد اللي معدتي بترتاح معاه. التخمير البطيء واضح وطعم الحموضة الطبيعية رائع جداً.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    }
  ]
};
