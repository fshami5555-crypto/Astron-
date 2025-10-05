import { INITIAL_MENU_ITEMS, INITIAL_GALLERY_IMAGES, INITIAL_SITE_CONTENT, INITIAL_USERS, SOCIAL_LINKS } from '../constants';
import type { MenuItem, GalleryImage, SiteContent, User, Order, SocialLink } from '../types';

const STORAGE_KEY = 'astrenRestaurantData';

export interface AppData {
  menuItems: MenuItem[];
  galleryImages: GalleryImage[];
  siteContent: SiteContent;
  users: User[];
  orders: Order[];
  socialLinks: SocialLink[];
}

export const getInitialData = (): AppData => ({
  menuItems: INITIAL_MENU_ITEMS,
  galleryImages: INITIAL_GALLERY_IMAGES,
  siteContent: INITIAL_SITE_CONTENT,
  users: INITIAL_USERS,
  orders: [], // Orders are transactional and should not be seeded initially
  socialLinks: SOCIAL_LINKS,
});

export const loadState = (): AppData => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    const initialData = getInitialData();

    if (serializedState === null) {
      return initialData;
    }
    
    const storedData = JSON.parse(serializedState);

    // Merge stored data with initial data to ensure new properties are not missing
    // This provides forward compatibility if the data schema changes.
    const mergedSiteContent = {
      ...initialData.siteContent,
      ...storedData.siteContent,
      notificationSettings: {
        ...initialData.siteContent.notificationSettings,
        ...(storedData.siteContent?.notificationSettings || {}),
      }
    };

    return {
      ...initialData,
      ...storedData,
      siteContent: mergedSiteContent,
    };

  } catch (err) {
    console.error("Could not load state from localStorage. Falling back to default data.", err);
    return getInitialData();
  }
};

export const saveState = (state: AppData): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};
