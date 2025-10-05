
import React from 'react';
import type { CartItem, Currency } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import SectionHeader from './SectionHeader';
import { TrashIcon } from './icons/CartIcons';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onCheckout: () => void;
  currency: Currency;
}

const Cart: React.FC<CartProps> = ({ cartItems, onUpdateQuantity, onCheckout, currency }) => {
  const { t, language } = useLocalization();
  const totalPrice = cartItems.reduce((total, item) => total + item.price[currency] * item.quantity, 0);

  const formatPrice = (price: number) => {
    return `${currency === 'usd' ? '$' : ''}${price.toFixed(2)}${currency === 'jod' ? ' JOD' : ''}`;
  };

  return (
    <div className="py-20 bg-black min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeader title={t('cartTitle')} />
        
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-400 text-xl">{t('cartEmpty')}</p>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6">
              {/* Cart Header */}
              <div className="hidden md:grid grid-cols-6 gap-4 text-gray-400 font-semibold mb-4 pb-2 border-b border-gray-700">
                <div className="col-span-3">{t('cartItem')}</div>
                <div className="text-center">{t('cartQuantity')}</div>
                <div className="text-right">{t('cartPrice')}</div>
                <div className="text-right">{t('cartSubtotal')}</div>
              </div>

              {/* Cart Items */}
              <div className="space-y-6">
                {cartItems.map(item => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    {/* Item Info */}
                    <div className="col-span-1 md:col-span-3 flex items-center">
                      <img src={item.image} alt={item.name[language]} className="w-20 h-20 object-cover rounded-md mr-4"/>
                      <div>
                        <p className="font-semibold text-lg text-white">{item.name[language]}</p>
                        <button onClick={() => onUpdateQuantity(item.id, 0)} className="text-red-500 hover:text-red-400 text-sm flex items-center gap-1">
                          <TrashIcon className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                    {/* Quantity Control */}
                    <div className="col-span-1 flex items-center justify-center">
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="bg-gray-700 h-8 w-8 rounded text-white">-</button>
                        <span className="w-12 text-center text-white">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="bg-gray-700 h-8 w-8 rounded text-white">+</button>
                    </div>
                    {/* Prices */}
                    <p className="col-span-1 text-right text-gray-300">{formatPrice(item.price[currency])}</p>
                    <p className="col-span-1 text-right font-semibold text-white">{formatPrice(item.price[currency] * item.quantity)}</p>
                  </div>
                ))}
              </div>
              
              {/* Cart Total */}
              <div className="mt-8 pt-4 border-t border-gray-700 flex justify-end">
                <div className="w-full max-w-sm text-white">
                    <div className="flex justify-between text-xl">
                        <span>{t('cartTotal')}:</span>
                        <span className="font-bold astren-accent">{formatPrice(totalPrice)}</span>
                    </div>
                    <button 
                        onClick={onCheckout}
                        className="w-full mt-4 astren-bg-accent text-black px-6 py-3 rounded-md hover:bg-amber-500 transition-colors duration-300 font-semibold text-lg"
                    >
                        {t('proceedToCheckout')}
                    </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;