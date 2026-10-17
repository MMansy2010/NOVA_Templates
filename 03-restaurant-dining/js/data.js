/**
 * إعدادات وتخصيص قالب المطاعم الفاخرة والعائلية (Restaurant Dining Template)
 */
const RESTAURANT_CONFIG = {
  brand: {
    nameAr: "فيرانزا جريل آند بيسترو",
    nameEn: "Veranza Italian & Oriental Grill",
    sloganAr: "أطباق متوسطية ومشويات حطب بأعلى معايير الشيف العالمي",
    rating: "4.9",
    reviewsCount: "2,100+"
  },
  contact: {
    whatsapp: "201000000000",
    phone: "+20 100 000 0000",
    currency: "ج.م"
  },
  branches: [
    { nameAr: "فرع التجمع الخامس", address: "شارع التسعين الشمالي، مول فيرانزا", phone: "+20 100 000 0001", hours: "12:00 م - 1:00 ص" },
    { nameAr: "فرع الشيخ زايد", address: "وصلة دهشور، ممشى كابيتال بيزنس بارك", phone: "+20 100 000 0002", hours: "12:00 م - 1:00 ص" },
    { nameAr: "فرع المعادي", address: "شارع دجلة 213، هادئ وعائلي", phone: "+20 100 000 0003", hours: "1:00 م - 12:00 منتصف الليل" }
  ],
  deliveryPartners: [
    { name: "طلبات Talabat", icon: "fa-motorcycle", url: "https://talabat.com" },
    { name: "المنيوز elmenus", icon: "fa-burger", url: "https://elmenus.com" },
    { name: "هنقرستيشن HungerStation", icon: "fa-clock", url: "https://hungerstation.com" }
  ],
  categories: [
    { id: "signature", nameAr: "أطباق الشيف المميزة", icon: "crown" },
    { id: "grill", nameAr: "مشويات اللحم والحطب", icon: "fire" },
    { id: "pasta-pizza", nameAr: "الباستا الإيطالية والبيتزا", icon: "pizza-slice" },
    { id: "appetizers", nameAr: "المقبلات والشوربات", icon: "bowl-rice" },
    { id: "desserts", nameAr: "الحلويات والمشروبات", icon: "martini-glass" }
  ],
  dishes: [
    {
      id: "dish-1",
      categoryId: "signature",
      nameAr: "ستيك ريب آي بلاك أنجوس (Black Angus Ribeye)",
      descAr: "قطعة لحم 350 جرام مشوية على خشب الأرز تقدم مع صوص المشروم البري بالكمأة وبطاطس بيوريه مخملية.",
      price: 580,
      badge: "توقيع الشيف 🏆",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
      isSpicy: false,
      isChefSpecial: true
    },
    {
      id: "dish-2",
      categoryId: "signature",
      nameAr: "ريش ضاني مشوية متبلة بالأعشاب المتوسطية",
      descAr: "4 قطع ريش طرية متبلة بخل البلسميك والروزماري وزيت الزيتون البكر مع خضار سوتيه مدخن.",
      price: 520,
      badge: "الأكثر طلباً 🔥",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      isChefSpecial: true
    },
    {
      id: "dish-3",
      categoryId: "pasta-pizza",
      nameAr: "تاجلياتيل بالكمأة السوداء والمشروم (Truffle Pasta)",
      descAr: "باستا طازجة محضرة يدوياً يومياً مع صوص الكريمة الإيطالية الغنية وزيت الكمأة البيضاء وجبن البارميزان المعتق 24 شهراً.",
      price: 340,
      badge: "أصيل 🇮🇹",
      image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281122?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "dish-4",
      categoryId: "pasta-pizza",
      nameAr: "بيتزا نابوليتانا مارغريتا بوفالا",
      descAr: "مخبوزة بفرن الحطب الحجري، صلصة طماطم سان مارزانو، جبنة موتزاريلا دي بوفالا طازجة وأوراق ريحان عطرة.",
      price: 240,
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "dish-5",
      categoryId: "grill",
      nameAr: "كباب وريش فيرانزا الملكي مشكل",
      descAr: "سيخ كباب بلدي، شيش طاووق متبل بالزعفران، وقطعة كفتة محشوة جبن مدخن مع خبز البيواز والبصل المشوي.",
      price: 460,
      badge: "وجبة مشبعة 🍢",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "dish-6",
      categoryId: "appetizers",
      nameAr: "مقبلات المازة المتوسطية المشكلة",
      descAr: "حمص باللحم المفروم والصنوبر، متبل باذنجان مدخن، ورق عنب بدبس الرمان، وكرات كبة مقرمشة.",
      price: 190,
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "dish-7",
      categoryId: "desserts",
      nameAr: "تيراميسو ماسكاربوني الكلاسيكي (Authentic Tiramisu)",
      descAr: "بسكويت سافوياردي مغموس بالإسبريسو الطازج وطبقات كريمة ماسكاربوني غنية مع بودرة كاكاو فالمورنا.",
      price: 135,
      badge: "حلوى إيطالية ☕",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80"
    }
  ]
};
