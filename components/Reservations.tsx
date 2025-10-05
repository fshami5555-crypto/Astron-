
import React, { useState } from 'react';
import type { Order, CartItem, Currency } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import SectionHeader from './SectionHeader';

interface CheckoutProps {
  // FIX: The `addOrder` prop type was incorrect. It required `pointsAwarded`, which is handled
  // by the parent component. Omitting `pointsAwarded` aligns the types and fixes the error.
  addOrder: (order: Omit<Order, 'id' | 'items' | 'totalPrice' | 'userId' | 'pointsAwarded'>) => void;
  cart: CartItem[];
  currency: Currency;
}

const Checkout: React.FC<CheckoutProps> = ({ addOrder, cart, currency }) => {
  const { t, language } = useLocalization();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });

  const totalPrice = cart.reduce((total, item) => total + item.price[currency] * item.quantity, 0);

  const formatPrice = (price: number) => {
    return `${currency === 'usd' ? '$' : ''}${price.toFixed(2)}${currency === 'jod' ? ' JOD' : ''}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(cart.length === 0) {
        alert("Your cart is empty. Please add items before placing an order.");
        return;
    }
    addOrder(formData);
  };

  return (
    <div className="py-20 bg-black">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionHeader title={t('checkoutTitle')} />
        <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-[#0a0a0a] p-8 rounded-lg border border-gray-800">
                <h3 className="text-2xl astren-accent mb-4">Your Information</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">{t('resFormName')}</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition" />
                    </div>
                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">{t('resFormEmail')}</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition" />
                    </div>
                    <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">{t('resFormPhone')}</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition" />
                    </div>
                    <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">{t('resFormDate')}</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition" />
                    </div>
                    <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-2">{t('resFormTime')}</label>
                    <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition" />
                    </div>
                    <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">{t('resFormMessage')}</label>
                    <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition"></textarea>
                    </div>
                    <div className="md:col-span-2">
                    <button type="submit" className="w-full astren-bg-accent text-black px-6 py-3 rounded-md hover:bg-amber-500 transition-colors duration-300 font-semibold">
                        {t('checkoutFormSubmit')}
                    </button>
                    </div>
                </form>
            </div>
             <div className="bg-[#0a0a0a] p-8 rounded-lg border border-gray-800">
                <h3 className="text-2xl astren-accent mb-4">Order Summary</h3>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-gray-300">
                            <div className="flex items-center">
                                <img src={item.image} alt={item.name[language]} className="w-12 h-12 object-cover rounded-md mr-4"/>
                                <div>
                                    <p className="font-semibold">{item.name[language]}</p>
                                    <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <p>{formatPrice(item.price[currency] * item.quantity)}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-6 border-t border-gray-700 pt-4">
                     <div className="flex justify-between text-xl font-bold text-white">
                        <span>Total</span>
                        <span>{formatPrice(totalPrice)}</span>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;