import React from 'react';
import type { SiteContent } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import SectionHeader from './SectionHeader';

interface ContactProps {
  siteContent: SiteContent;
}

const Contact: React.FC<ContactProps> = ({ siteContent }) => {
  const { t, language } = useLocalization();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Message sent! (This is a demo)');
    e.currentTarget.reset();
  };

  return (
    <div className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <SectionHeader title={t('contactTitle')} />
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-[#0a0a0a] p-8 rounded-lg border border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">{t('contactFormName')}</label>
                <input type="text" id="name" required className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">{t('contactFormEmail')}</label>
                <input type="email" id="email" required className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">{t('contactFormMessage')}</label>
                <textarea id="message" rows={5} required className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition"></textarea>
              </div>
              <button type="submit" className="w-full astren-bg-accent text-black px-6 py-3 rounded-md hover:bg-amber-500 transition-colors duration-300 font-semibold">
                {t('contactFormSubmit')}
              </button>
            </form>
          </div>
          <div className="space-y-8 rtl:text-right">
            <div>
              <h3 className="text-2xl astren-accent mb-2">{t('ourLocation')}</h3>
              <p className="text-gray-300">{siteContent.address[language]}</p>
            </div>
            <div>
              <h3 className="text-2xl astren-accent mb-2">Contact</h3>
              <p className="text-gray-300">Phone: {siteContent.phone}</p>
              <p className="text-gray-300">Email: {siteContent.email}</p>
            </div>
            <div className="h-64 rounded-lg overflow-hidden border-2 astren-border-accent">
              <iframe
                src={siteContent.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Restaurant Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;