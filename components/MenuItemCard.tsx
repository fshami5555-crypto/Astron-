
import React from 'react';
import type { MenuItem, Currency } from '../types';
import { useLocalization } from '../hooks/useLocalization';

interface MenuItemCardProps {
  item: MenuItem;
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  currency: Currency;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSelectItem, onAddToCart, currency }) => {
  const { language, t } = useLocalization();
  
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the detail view
    onAddToCart(item);
  };

  return (
    <div 
      className="bg-black border border-gray-800 rounded-lg overflow-hidden shadow-lg shadow-black/30 flex flex-col transition-transform duration-300 hover:scale-105 hover:border-amber-600/50"
    >
      <div 
        onClick={() => onSelectItem(item)}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={`View details for ${item.name[language]}`}
      >
        <img src={item.image} alt={item.name[language]} className="w-full h-48 object-cover" />
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-100">{item.name[language]}</h3>
            <p className="text-xl astren-accent font-semibold whitespace-nowrap">
              {currency === 'usd' ? '$' : ''}{item.price[currency].toFixed(2)}{currency === 'jod' ? ' JOD' : ''}
            </p>
          </div>
          <p className="text-gray-400 text-sm mb-4 flex-grow">{item.description[language]}</p>
        </div>
      </div>
      <div className="px-6 pb-4 mt-auto">
        <button
            onClick={handleAddToCartClick}
            className="w-full text-center text-sm astren-accent border astren-border-accent rounded-full px-4 py-2 hover:astren-bg-accent hover:text-black transition-colors duration-300"
        >
            {t('addToCart')}
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;