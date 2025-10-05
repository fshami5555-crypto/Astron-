import React from 'react';
import type { Page } from '../types';
import { useLocalization } from '../hooks/useLocalization';

interface HeroProps {
  setPage: (page: Page) => void;
  logoUrl: string;
  heroImageUrl: string;
}

const Hero: React.FC<HeroProps> = ({ setPage, logoUrl, heroImageUrl }) => {
  const { t } = useLocalization();

  return (
    <section>
      <div 
        className="relative h-screen bg-cover bg-center bg-fixed flex flex-col justify-center items-center text-white text-center px-4"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${heroImageUrl}')` }}
      >
        {logoUrl ? (
          <img src={logoUrl} alt="ASTREN" className="w-[600px] h-[800px] max-w-full max-h-[85vh] object-contain filter drop-shadow-lg" />
        ) : (
          <h1 className="text-7xl md:text-9xl font-bold tracking-widest astren-accent font-['El_Messiri']">
            ASTREN
          </h1>
        )}
        
        <div className="flex flex-col items-center -mt-16 md:-mt-24">
            <p className="text-xl md:text-2xl text-gray-300 tracking-wider">
            {t('heroSlogan')}
            </p>
            <button
            onClick={() => setPage('menu')}
            className="mt-6 astren-bg-accent text-black px-10 py-3 rounded-sm hover:bg-amber-500 transition-colors duration-300 font-semibold text-lg"
            >
            {t('orderNow')}
            </button>
        </div>
      </div>
      <div className="bg-[#0a0a0a] py-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl text-gray-200 mb-6">{t('heroSlogan')}</h2>
            <p className="text-gray-400 text-lg leading-relaxed">{t('heroDescription')}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;