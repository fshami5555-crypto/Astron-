import React from 'react';
import type { Page, User } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import { CartIcon } from './icons/CartIcons';

interface HeaderProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  logoUrl?: string;
  cartItemCount: number;
  currentUser: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setPage, logoUrl, cartItemCount, currentUser, onLogout }) => {
  const { language, setLanguage, t } = useLocalization();

  const navLinks: { page: Page; labelKey: keyof typeof import('../constants').TRANSLATIONS.en }[] = [
    { page: 'menu', labelKey: 'navMenu' },
    { page: 'about', labelKey: 'navAbout' },
    { page: 'gallery', labelKey: 'navGallery' },
    { page: 'contact', labelKey: 'navContact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm shadow-md shadow-black/20">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {language === 'ar' ? (
          <>
            {/* Left Side: Logo */}
            <div className="flex-1 flex justify-start">
              <div className="font-['El_Messiri'] cursor-pointer" onClick={() => setPage('home')}>
                {logoUrl ? (
                  <img src={logoUrl} alt="ASTREN Logo" className="h-10 max-w-[150px] object-contain" />
                ) : (
                  <span className="text-3xl font-bold tracking-wider astren-accent">ASTREN</span>
                )}
              </div>
            </div>

            {/* Center: Order Now Button */}
            <div className="flex-1 flex justify-center">
               <button
                  onClick={() => setPage('menu')}
                  className="astren-bg-accent text-black px-6 py-2 rounded-sm hover:bg-amber-500 transition-colors duration-300 text-sm font-medium"
                >
                  {t('orderNow')}
                </button>
            </div>

            {/* Right Side: Cart, Auth, Language */}
            <div className="flex-1 flex justify-end">
                <div className="flex items-center space-x-4">
                    <button onClick={() => setPage('cart')} className="relative text-gray-300 hover:astren-accent transition-colors duration-300">
                        <CartIcon />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                    {currentUser ? (
                        <div className="relative group">
                            <div className="flex items-center cursor-pointer p-2 rounded-lg bg-gray-900/50">
                                <div className="flex-col text-right px-2">
                                    <span className="text-sm font-semibold text-white">{t('customer')} #{currentUser.id}</span>
                                    <span className="text-xs astren-accent">{currentUser.loyaltyPoints} {t('loyaltyPoints')}</span>
                                </div>
                                <svg className="w-8 h-8 text-gray-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                            </div>
                            <div className="absolute left-0 rtl:right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">{currentUser.phone}</div>
                                <button onClick={onLogout} className="block w-full text-left rtl:text-right px-4 py-2 text-sm text-red-400 hover:bg-gray-800">{t('logout')}</button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setPage('auth')} className="text-gray-300 hover:astren-accent transition-colors duration-300">{t('login')}</button>
                    )}
                    {/* FIX: Simplified language toggle button text. Since we are in the 'ar' block, the button should always show 'EN'. This resolves the TypeScript error and simplifies the logic. */}
                    <button onClick={toggleLanguage} className="text-gray-300 hover:astren-accent transition-colors duration-300">
                        EN
                    </button>
                </div>
            </div>
          </>
        ) : (
          <>
            {/* English Layout */}
            <div className="font-['El_Messiri'] cursor-pointer" onClick={() => setPage('home')}>
              {logoUrl ? (
                <img src={logoUrl} alt="ASTREN Logo" className="h-10 max-w-[150px] object-contain" />
              ) : (
                <span className="text-3xl font-bold tracking-wider astren-accent">ASTREN</span>
              )}
            </div>
            <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ page, labelKey }) => (
                <li key={page}>
                <button
                    onClick={() => setPage(page)}
                    className={`text-lg transition-colors duration-300 ${
                    currentPage === page ? 'astren-accent' : 'text-gray-300 hover:astren-accent'
                    }`}
                >
                    {t(labelKey)}
                </button>
                </li>
            ))}
            </ul>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPage('menu')}
                className="hidden sm:block astren-bg-accent text-black px-6 py-2 rounded-sm hover:bg-amber-500 transition-colors duration-300 text-sm font-medium"
              >
                {t('orderNow')}
              </button>
              <button onClick={() => setPage('cart')} className="relative text-gray-300 hover:astren-accent transition-colors duration-300">
                <CartIcon />
                {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                    </span>
                )}
              </button>
              {currentUser ? (
                 <div className="relative group">
                    <div className="flex items-center cursor-pointer p-2 rounded-lg bg-gray-900/50">
                        <div className="flex-col text-right px-2">
                            <span className="text-sm font-semibold text-white">{t('customer')} #{currentUser.id}</span>
                            <span className="text-xs astren-accent">{currentUser.loyaltyPoints} {t('loyaltyPoints')}</span>
                        </div>
                         <svg className="w-8 h-8 text-gray-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    </div>
                    <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">{currentUser.phone}</div>
                        <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800">{t('logout')}</button>
                    </div>
                </div>
              ) : (
                  <button onClick={() => setPage('auth')} className="text-gray-300 hover:astren-accent transition-colors duration-300">{t('login')}</button>
              )}
              {/* FIX: Corrected language toggle button text. Since we are in the 'en' block, the button should show 'AR'. This also resolves the TypeScript error. */}
              <button onClick={toggleLanguage} className="text-gray-300 hover:astren-accent transition-colors duration-300">
                AR
              </button>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;