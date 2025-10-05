export type Page = 'home' | 'menu' | 'about' | 'gallery' | 'contact' | 'checkout' | 'admin' | 'cart' | 'auth';

export type Language = 'en' | 'ar';

export type Currency = 'usd' | 'jod';

export enum MenuCategory {
  Appetizers = 'Appetizers',
  MainCourses = 'Main Courses',
  Desserts = 'Desserts',
  Drinks = 'Drinks'
}

export interface MenuItem {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  price: {
    usd: number;
    jod: number;
  };
  category: MenuCategory;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface User {
  id: number;
  phone: string;
  password?: string; // Storing password here for simplicity in this mock setup
  loyaltyPoints: number;
}

export interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message?: string;
  items: CartItem[];
  totalPrice: {
    value: number;
    currency: Currency;
  };
  userId?: string;
  pointsAwarded: boolean;
}


export interface GalleryImage {
  id: string;
  src: string;
  alt: { en: string; ar: string };
}

export interface SiteContent {
  logoUrl: string;
  heroImage: string;
  featuredDishIds: string[];
  featuredDessertIds: string[];
  address: { en: string; ar: string };
  phone: string;
  email: string;
  mapUrl: string;
  notificationSettings: {
    enabled: boolean;
    text: { en: string; ar: string };
    imageUrl: string;
    backgroundColor: string;
    frequencyMinutes: number;
  };
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
}