
import React from 'react';
import { useLocalization } from '../hooks/useLocalization';
import SectionHeader from './SectionHeader';

const About: React.FC = () => {
  const { t } = useLocalization();

  return (
    <div className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <SectionHeader title={t('aboutTitle')} />
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed rtl:text-right">
            <p>{t('aboutP1')}</p>
            <p>{t('aboutP2')}</p>
          </div>
          <div>
            <img 
              src="https://picsum.photos/id/988/600/700" 
              alt="Chef at work" 
              className="rounded-lg shadow-2xl shadow-black/50 object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
