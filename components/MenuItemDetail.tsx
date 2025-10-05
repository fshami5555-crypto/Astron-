import React, { useState, useCallback } from 'react';
import type { MenuItem, Currency } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import { getPairingSuggestion } from '../services/geminiService';

interface MenuItemDetailProps {
  item: MenuItem;
  onBack: () => void;
  currency: Currency;
}

const MenuItemDetail: React.FC<MenuItemDetailProps> = ({ item, onBack, currency }) => {
  const { language, t } = useLocalization();
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetSuggestion = useCallback(async () => {
    setIsLoading(true);
    setSuggestion(null);
    const result = await getPairingSuggestion(item, language);
    setSuggestion(result);
    setIsLoading(false);
  }, [item, language]);

  return (
    <div className="py-20 bg-black min-h-screen">
      <div className="container mx-auto px-6">
        <button onClick={onBack} className="mb-8 text-lg astren-accent hover:underline">
          &larr; {t('backToMenu')}
        </button>
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <div>
            <img 
              src={item.image.replace('400/300', '800/600')} 
              alt={item.name[language]} 
              className="w-full rounded-lg shadow-2xl shadow-black/50"
            />
          </div>
          <div className="flex flex-col h-full rtl:text-right">
            <div className="flex justify-between items-start mb-2">
                <h1 className="text-4xl md:text-5xl font-['El_Messiri'] text-gray-100">{item.name[language]}</h1>
                <p className="text-4xl astren-accent font-semibold whitespace-nowrap">
                    {currency === 'usd' ? '$' : ''}{item.price[currency].toFixed(2)}{currency === 'jod' ? ' JOD' : ''}
                </p>
            </div>
            <div className="w-24 h-1 astren-bg-accent my-4"></div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 flex-grow">
              {item.description[language]}
            </p>
            
            {item.category === 'Main Courses' && (
              <div className="mt-auto pt-4 border-t border-gray-800">
                {suggestion && !isLoading && (
                  <div className="bg-gray-900/50 p-4 rounded-md mb-4">
                    <p className="text-lg font-bold astren-accent mb-2">{t('pairingSuggestion')}</p>
                    <p className="text-sm text-gray-300">{suggestion}</p>
                  </div>
                )}
                <button
                  onClick={handleGetSuggestion}
                  disabled={isLoading}
                  className="w-full text-center text-md astren-accent border astren-border-accent rounded-full px-4 py-3 hover:astren-bg-accent hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? t('generatingSuggestion') : t('getPairingSuggestion')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetail;