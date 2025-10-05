import type { MenuItem, GalleryImage, SiteContent, SocialLink, User } from './types';
import { MenuCategory } from './types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: { en: 'Seared Scallops', ar: 'اسكالوب محمر' },
    description: { en: 'With saffron risotto and a citrus glaze.', ar: 'مع ريزوتو بالزعفران وصلصة حمضيات.' },
    price: { usd: 28, jod: 19.80 },
    category: MenuCategory.Appetizers,
    image: 'https://picsum.photos/id/1060/400/300',
  },
  {
    id: '2',
    name: { en: 'Burrata Caprese', ar: 'بوراتا كابريزي' },
    description: { en: 'Heirloom tomatoes, fresh burrata, basil, and balsamic reduction.', ar: 'طماطم كرزية، جبنة بوراتا طازجة، ريحان، وخل بلسميك.' },
    price: { usd: 22, jod: 15.60 },
    category: MenuCategory.Appetizers,
    image: 'https://picsum.photos/id/1080/400/300',
  },
  {
    id: '3',
    name: { en: 'Wagyu Beef Filet', ar: 'فيليه لحم الواغيو' },
    description: { en: '8oz filet, truffle mashed potatoes, grilled asparagus.', ar: 'فيليه 8 أونصات، بطاطا مهروسة بالكمأة، هليون مشوي.' },
    price: { usd: 75, jod: 53.25 },
    category: MenuCategory.MainCourses,
    image: 'https://picsum.photos/id/699/400/300',
  },
  {
    id: '4',
    name: { en: 'Pan-Seared Salmon', ar: 'سلمون مشوي' },
    description: { en: 'Crispy skin salmon with a lemon-dill sauce and quinoa salad.', ar: 'سلمون مقرمش مع صلصة الليمون والشبت وسلطة الكينوا.' },
    price: { usd: 45, jod: 31.95 },
    category: MenuCategory.MainCourses,
    image: 'https://picsum.photos/id/324/400/300',
  },
  {
    id: '5',
    name: { en: 'Chocolate Lava Cake', ar: 'كيكة الحمم البركانية بالشوكولاتة' },
    description: { en: 'Molten chocolate center served with vanilla bean ice cream.', ar: 'قلب شوكولاتة سائل يقدم مع آيس كريم الفانيليا.' },
    price: { usd: 18, jod: 12.78 },
    category: MenuCategory.Desserts,
    image: 'https://picsum.photos/id/202/400/300',
  },
  {
    id: '6',
    name: { en: 'Deconstructed Tiramisu', ar: 'تيراميسو مفكك' },
    description: { en: 'Espresso-soaked ladyfingers, mascarpone cream, cocoa powder.', ar: 'أصابع الست المشبعة بالإسبريسو، كريمة الماسكاربوني، مسحوق الكاكاو.' },
    price: { usd: 16, jod: 11.36 },
    category: MenuCategory.Desserts,
    image: 'https://picsum.photos/id/431/400/300',
  },
  {
    id: '7',
    name: { en: 'Golden Hour Elixir', ar: 'إكسير الساعة الذهبية' },
    description: { en: 'A sophisticated blend of elderflower, gin, and sparkling wine.', ar: 'مزيج راقٍ من زهرة البيلسان والجين والنبيذ الفوار.' },
    price: { usd: 20, jod: 14.20 },
    category: MenuCategory.Drinks,
    image: 'https://picsum.photos/id/102/400/300',
  },
];

export const INITIAL_GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g1', src: 'https://picsum.photos/id/292/800/600', alt: { en: 'A beautifully plated dish', ar: 'طبق مزين بشكل جميل' } },
  { id: 'g2', src: 'https://picsum.photos/id/312/800/600', alt: { en: 'Elegant restaurant interior', ar: 'ديكور المطعم الأنيق' } },
  { id: 'g3', src: 'https://picsum.photos/id/433/800/600', alt: { en: 'A vibrant cocktail', ar: 'كوكتيل زاهي الألوان' } },
  { id: 'g4', src: 'https://picsum.photos/id/988/800/600', alt: { en: 'Chef preparing a meal', ar: 'الشيف يحضر وجبة' } },
  { id: 'g5', src: 'https://picsum.photos/id/1025/800/600', alt: { en: 'Cozy dining area', ar: 'منطقة طعام مريحة' } },
  { id: 'g6', src: 'https://picsum.photos/id/1060/800/600', alt: { en: 'Fresh ingredients on display', ar: 'مكونات طازجة معروضة' } },
];

export const INITIAL_SITE_CONTENT: SiteContent = {
  logoUrl: 'https://i.ibb.co/Swvdgyjz/11.png',
  heroImage: 'https://i.ibb.co/bggjhdTk/image.png',
  featuredDishIds: ['1', '3', '4'],
  featuredDessertIds: ['5', '6', '5'],
  address: { en: '123 Luxury Lane, Metropolis, 10101', ar: '123 شارع الفخامة، متروبوليس، 10101' },
  phone: '0788078118',
  email: 'contact@astren.info',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617942125021!2d-73.987844084594!3d40.74844097932824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v16282062 Empire%20State%20Building',
  notificationSettings: {
    enabled: true,
    text: {
      en: 'We are now available on Talabat!',
      ar: 'نحن متواجدون الآن على طلبات!',
    },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Talabat_logo.svg/2560px-Talabat_logo.svg.png',
    backgroundColor: '#EA580C', // Tailwind orange-600
    frequencyMinutes: 0, 
  },
};

export const INITIAL_USERS: User[] = [
  { id: 1, phone: '1234567890', password: 'password123', loyaltyPoints: 150 },
];

export const SOCIAL_LINKS: SocialLink[] = [
    { id: 's1', name: 'Instagram', url: 'https://www.instagram.com/astrenrest/' },
    { id: 's3', name: 'Facebook', url: 'https://web.facebook.com/Astrenrest#' },
];

export const TRANSLATIONS = {
  en: {
    // Header
    navHome: 'Home',
    navMenu: 'Menu',
    navAbout: 'About',
    navGallery: 'Gallery',
    navContact: 'Contact',
    navAdmin: 'Admin Panel',
    orderNow: 'Order Now',
    login: 'Login',
    logout: 'Logout',
    // Hero
    heroSlogan: 'An Elevated Culinary Experience',
    heroDescription: 'At ASTREN, we blend artistry with flavor, crafting unforgettable moments on every plate. Our philosophy is simple: source the finest ingredients, honor culinary traditions, and innovate with passion. Welcome to a dining experience beyond the ordinary.',
    // Featured Dishes
    featuredDishesTitle: 'Our Signature Dishes',
    featuredDessertsTitle: 'Sweet Endings',
    viewFullMenu: 'View Full Menu',
    viewAllDesserts: 'View All Desserts',
    // Menu
    menuTitle: 'Our Menu',
    addToCart: 'Add to Cart',
    getPairingSuggestion: 'Get Pairing Suggestion',
    generatingSuggestion: 'Generating...',
    pairingSuggestion: 'Pairing Suggestion',
    backToMenu: 'Back to Menu',
    usd: 'USD',
    jod: 'JOD',
    // About
    aboutTitle: 'The Story of ASTREN',
    aboutP1: 'ASTREN was born from a vision to create a sanctuary where culinary art and refined ambiance converge. Our name, derived from the stars, reflects our aspiration to deliver an experience that is both transcendent and timeless.',
    aboutP2: 'Our culinary team, led by a world-renowned chef, is dedicated to innovation while respecting the essence of classic flavors. We believe in the power of food to connect people, and every dish we create is a testament to this belief.',
    // Gallery
    galleryTitle: 'A Glimpse Into Our World',
    // Contact
    contactTitle: 'Get In Touch',
    contactFormName: 'Your Name',
    contactFormEmail: 'Your Email',
    contactFormMessage: 'Your Message',
    contactFormSubmit: 'Send Message',
    ourLocation: 'Our Location',
    // Checkout Page (was Order Page)
    checkoutTitle: 'Complete Your Order',
    resFormName: 'Full Name',
    resFormEmail: 'Email Address',
    resFormPhone: 'Phone Number',
    resFormDate: 'Pickup/Delivery Date',
    resFormTime: 'Pickup/Delivery Time',
    resFormMessage: 'Special Requests (Optional)',
    checkoutFormSubmit: 'Place Order',
    // Cart
    cartTitle: 'Your Cart',
    cartEmpty: 'Your cart is empty.',
    cartItem: 'Item',
    cartQuantity: 'Quantity',
    cartPrice: 'Price',
    cartSubtotal: 'Subtotal',
    cartTotal: 'Total',
    proceedToCheckout: 'Proceed to Checkout',
    // Auth
    authLoginTitle: 'Login',
    authSignupTitle: 'Create Account',
    authPhone: 'Phone Number',
    authPassword: 'Password',
    authLoginButton: 'Login',
    authSignupButton: 'Sign Up',
    authToggleToSignup: "Don't have an account? Sign Up",
    authToggleToLogin: 'Already have an account? Login',
    // Admin
    adminTitle: 'Admin Control Panel',
    menu: 'Menu',
    viewOrders: 'View Orders',
    manageContent: 'Manage Content',
    manageImages: 'Manage Images',
    signatureDishes: 'Signature Dishes',
    adminHeroImage: 'Hero Image',
    loyalty: 'Loyalty',
    customer: 'Customer',
    loyaltyPoints: 'Loyalty Points',
    approvePoints: 'Approve Points',
    pointsAwarded: 'Points Awarded',
    notifications: 'Notifications',
  },
  ar: {
    // Header
    navHome: 'الرئيسية',
    navMenu: 'قائمة الطعام',
    navAbout: 'من نحن',
    navGallery: 'المعرض',
    navContact: 'اتصل بنا',
    navAdmin: 'لوحة التحكم',
    orderNow: 'اطلب الآن',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    // Hero
    heroSlogan: 'تجربة طهي راقية',
    heroDescription: 'في أسترين، نمزج الفن بالنكهة، لنصنع لحظات لا تُنسى في كل طبق. فلسفتنا بسيطة: استخدام أجود المكونات، احترام تقاليد الطهي، والابتكار بشغف. أهلاً بكم في تجربة طعام تتجاوز المألوف.',
    // Featured Dishes
    featuredDishesTitle: 'أطباقنا المميزة',
    featuredDessertsTitle: 'نهايات حلوة',
    viewFullMenu: 'عرض القائمة الكاملة',
    viewAllDesserts: 'عرض كل الحلويات',
    // Menu
    menuTitle: 'قائمتنا',
    addToCart: 'أضف إلى السلة',
    getPairingSuggestion: 'اقترح مشروباً',
    generatingSuggestion: 'جاري الإنشاء...',
    pairingSuggestion: 'اقتراح المشروب',
    backToMenu: 'العودة للقائمة',
    usd: 'دولار أمريكي',
    jod: 'دينار أردني',
    // About
    aboutTitle: 'قصة أسترين',
    aboutP1: 'وُلد أسترين من رؤية لإنشاء ملاذ يلتقي فيه فن الطهي والأجواء الراقية. اسمنا، المشتق من النجوم، يعكس طموحنا لتقديم تجربة سماوية وخالدة.',
    aboutP2: 'فريق الطهاة لدينا، بقيادة شيف عالمي، مكرس للابتكار مع احترام جوهر النكهات الكلاسيكية. نؤمن بقوة الطعام في ربط الناس، وكل طبق نصنعه هو شهادة على هذا الإيمان.',
    // Gallery
    galleryTitle: 'لمحة من عالمنا',
    // Contact
    contactTitle: 'تواصل معنا',
    contactFormName: 'اسمك',
    contactFormEmail: 'بريدك الإلكتروني',
    contactFormMessage: 'رسالتك',
    contactFormSubmit: 'إرسال الرسالة',
    ourLocation: 'موقعنا',
    // Checkout Page
    checkoutTitle: 'أكمل طلبك',
    resFormName: 'الاسم الكامل',
    resFormEmail: 'البريد الإلكتروني',
    resFormPhone: 'رقم الهاتف',
    resFormDate: 'تاريخ الاستلام/التوصيل',
    resFormTime: 'وقت الاستلام/التوصيل',
    resFormMessage: 'طلبات خاصة (اختياري)',
    checkoutFormSubmit: 'إتمام الطلب',
    // Cart
    cartTitle: 'سلة التسوق',
    cartEmpty: 'سلة التسوق فارغة.',
    cartItem: 'الصنف',
    cartQuantity: 'الكمية',
    cartPrice: 'السعر',
    cartSubtotal: 'المجموع الفرعي',
    cartTotal: 'المجموع الكلي',
    proceedToCheckout: 'متابعة لإتمام الطلب',
    // Auth
    authLoginTitle: 'تسجيل الدخول',
    authSignupTitle: 'إنشاء حساب جديد',
    authPhone: 'رقم الهاتف',
    authPassword: 'كلمة المرور',
    authLoginButton: 'دخول',
    authSignupButton: 'تسجيل',
    authToggleToSignup: 'ليس لديك حساب؟ سجل الآن',
    authToggleToLogin: 'لديك حساب بالفعل؟ تسجيل الدخول',
    // Admin
    adminTitle: 'لوحة تحكم المسؤول',
    menu: 'القائمة',
    viewOrders: 'عرض الطلبات',
    manageContent: 'إدارة المحتوى',
    manageImages: 'إدارة الصور',
    signatureDishes: 'الأطباق المميزة',
    adminHeroImage: 'صورة الهيرو',
    loyalty: 'الولاء',
    customer: 'عميل',
    loyaltyPoints: 'نقاط الولاء',
    approvePoints: 'الموافقة على النقاط',
    pointsAwarded: 'تم منح النقاط',
    notifications: 'الإشعارات',
  }
};