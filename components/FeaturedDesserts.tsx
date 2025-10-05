import React from 'react';
import type { MenuItem, Page } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import SectionHeader from './SectionHeader';

interface FeaturedDessertsProps {
  menuItems: MenuItem[];
  setPage: (page: Page) => void;
  featuredDessertIds: string[];
}

const FeaturedDesserts: React.FC<FeaturedDessertsProps> = ({ menuItems, setPage, featuredDessertIds }) => {
  const { t, language } = useLocalization();

  const featuredDesserts = featuredDessertIds.map(id => menuItems.find(item => item.id === id)).filter(Boolean) as MenuItem[];

  if (featuredDesserts.length < 3) {
    return null; // Don't render if not configured
  }

  const DessertCard = ({ item }: { item: MenuItem }) => (
    <div className="group text-center flex flex-col items-center">
      <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6">
        <div className="absolute inset-0 rounded-full bg-gray-800 transform transition-transform duration-500 group-hover:scale-105" />
        <img
          src={item.image}
          alt={item.name[language]}
          className="absolute inset-0 w-full h-full object-cover rounded-full p-2 transform transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-100 mb-2">{item.name[language]}</h3>
      <p className="text-gray-400 text-sm max-w-xs">{item.description[language]}</p>
    </div>
  );

  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-6">
        <SectionHeader title={t('featuredDessertsTitle')} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {featuredDesserts.map((dessert, index) => (
            <DessertCard key={`${dessert.id}-${index}`} item={dessert} />
          ))}
        </div>
        <div className="text-center mt-16">
            <button
                onClick={() => setPage('menu')}
                className="astren-bg-accent text-black px-10 py-3 rounded-sm hover:bg-amber-500 transition-colors duration-300 font-semibold text-lg"
            >
                {t('viewAllDesserts')}
            </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDesserts;
