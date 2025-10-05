
import React, { useState } from 'react';
import type { MenuItem, Currency } from '../types';
import { MenuCategory } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import SectionHeader from './SectionHeader';
import MenuItemCard from './MenuItemCard';

interface MenuProps {
  menuItems: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const Menu: React.FC<MenuProps> = ({ menuItems, onSelectItem, onAddToCart, currency, setCurrency }) => {
  const { t, language } = useLocalization();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(MenuCategory.Appetizers);

  const categories = Object.values(MenuCategory);

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  const getCategoryName = (category: MenuCategory) => {
    switch(category) {
      case MenuCategory.Appetizers: return language === 'ar' ? 'المقبلات' : 'Appetizers';
      case MenuCategory.MainCourses: return language === 'ar' ? 'الأطباق الرئيسية' : 'Main Courses';
      case MenuCategory.Desserts: return language === 'ar' ? 'الحلويات' : 'Desserts';
      case MenuCategory.Drinks: return language === 'ar' ? 'المشروبات' : 'Drinks';
      default: return category;
    }
  };

  return (
    <div className="py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <SectionHeader title={t('menuTitle')} />
        
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'astren-bg-accent text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {getCategoryName(category)}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-8">
            <button 
                onClick={() => setCurrency('usd')}
                className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors ${currency === 'usd' ? 'astren-bg-accent text-black' : 'bg-gray-800 text-gray-300'}`}
            >
                {t('usd')}
            </button>
            <button 
                onClick={() => setCurrency('jod')}
                className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors ${currency === 'jod' ? 'astren-bg-accent text-black' : 'bg-gray-800 text-gray-300'}`}
            >
                {t('jod')}
            </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <MenuItemCard 
              key={item.id} 
              item={item} 
              onSelectItem={onSelectItem}
              onAddToCart={onAddToCart}
              currency={currency}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;