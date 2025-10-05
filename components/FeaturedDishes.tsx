import React from 'react';
import type { MenuItem, Page } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import SectionHeader from './SectionHeader';

interface FeaturedDishesProps {
  menuItems: MenuItem[];
  setPage: (page: Page) => void;
  featuredDishIds: string[];
}

const FeaturedDishes: React.FC<FeaturedDishesProps> = ({ menuItems, setPage, featuredDishIds }) => {
  const { t, language } = useLocalization();

  const featuredDishes = featuredDishIds.map(id => menuItems.find(item => item.id === id)).filter(Boolean) as MenuItem[];
  
  if (featuredDishes.length < 3) {
    // Render placeholders or a message if not all dishes are configured
    return (
        <section className="bg-[#0a0a0a] py-24 overflow-hidden">
             <div className="container mx-auto px-6 text-center">
                <SectionHeader title={t('featuredDishesTitle')} />
                <p className="text-gray-500 mt-8">Please select 3 signature dishes in the admin panel to display them here.</p>
             </div>
        </section>
    );
  }
  
  const [leftDish, centerDish, rightDish] = featuredDishes;

  const DishCard = ({ item, className, isCenter }: { item: MenuItem; className?: string; isCenter?: boolean }) => (
    <div className={`group relative rounded-lg overflow-hidden shadow-2xl shadow-black/60 transition-all duration-500 ease-in-out ${className}`}>
      <img src={item.image} alt={item.name[language]} className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 text-white w-full">
        <h3 className={`text-2xl font-semibold ${isCenter ? 'md:text-3xl' : 'md:text-2xl'}`}>{item.name[language]}</h3>
        <p className={`mt-2 text-gray-300 text-sm h-12 overflow-hidden ${isCenter ? 'md:h-16' : 'md:h-12'}`}>{item.description[language]}</p>
        <button
          onClick={() => setPage('menu')}
          className="mt-4 text-sm astren-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {t('viewFullMenu')} &rarr;
        </button>
      </div>
    </div>
  );

  return (
    <section className="bg-[#0a0a0a] py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader title={t('featuredDishesTitle')} />
        
        <div className="relative flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-0 mt-20">
          {/* Left Dish */}
          <div className="w-full md:w-3/4 lg:w-2/5 transition-transform duration-500 hover:scale-105 lg:-mr-16 transform lg:rotate-[-6deg]">
            <DishCard item={leftDish} />
          </div>

          {/* Center Dish */}
          <div className="w-full md:w-5/6 lg:w-1/2 z-10 transition-transform duration-500 hover:scale-105">
            <DishCard item={centerDish} isCenter={true}/>
          </div>
          
          {/* Right Dish */}
           <div className="w-full md:w-3/d4 lg:w-2/5 transition-transform duration-500 hover:scale-105 lg:-ml-16 transform lg:rotate-[6deg]">
            <DishCard item={rightDish} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;