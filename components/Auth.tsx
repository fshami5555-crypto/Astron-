
import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import SectionHeader from './SectionHeader';
import type { Page } from '../types';

interface AuthProps {
    onLogin: (phone: string, pass: string) => boolean;
    onSignup: (phone: string, pass: string) => boolean;
    setPage: (page: Page) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onSignup, setPage }) => {
  const { t } = useLocalization();
  const [isLoginView, setIsLoginView] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginView) {
      onLogin(phone, password);
    } else {
      onSignup(phone, password);
    }
  };

  const toggleView = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoginView(!isLoginView);
    setPhone('');
    setPassword('');
  };

  return (
    <div className="py-20 bg-black min-h-screen">
      <div className="container mx-auto px-6 max-w-md">
        <SectionHeader title={isLoginView ? t('authLoginTitle') : t('authSignupTitle')} />
        <div className="bg-[#0a0a0a] p-8 rounded-lg border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">{t('authPhone')}</label>
              <input 
                type="tel" 
                id="phone" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required 
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition" 
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">{t('authPassword')}</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required 
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition" 
              />
            </div>
            <button type="submit" className="w-full astren-bg-accent text-black px-6 py-3 rounded-md hover:bg-amber-500 transition-colors duration-300 font-semibold">
              {isLoginView ? t('authLoginButton') : t('authSignupButton')}
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="#" onClick={toggleView} className="text-sm astren-accent hover:underline">
              {isLoginView ? t('authToggleToSignup') : t('authToggleToLogin')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
