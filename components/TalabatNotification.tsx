import React from 'react';
import { useLocalization } from '../hooks/useLocalization';
import type { SiteContent } from '../types';

interface TalabatNotificationProps {
  onDismiss: () => void;
  settings: SiteContent['notificationSettings'];
}

const TalabatNotification: React.FC<TalabatNotificationProps> = ({ onDismiss, settings }) => {
  const { language } = useLocalization();
  const isRtl = language === 'ar';

  return (
    <div
      className={`fixed bottom-4 ${isRtl ? 'right-4' : 'left-4'} z-[100] transform transition-transform duration-500 ease-out`}
      style={{
        animation: 'slideInUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
      }}
    >
      <div 
        className="text-white rounded-lg shadow-2xl flex items-center p-4 max-w-xs md:max-w-md"
        style={{ backgroundColor: settings.backgroundColor }}
      >
        {settings.imageUrl && (
            <img 
              src={settings.imageUrl} 
              alt="Notification Logo" 
              className="w-16 h-auto object-contain mr-4 rtl:ml-4 rtl:mr-0" 
            />
        )}
        <p className="text-sm font-semibold flex-grow">{settings.text[language]}</p>
        <button
          onClick={onDismiss}
          className="ml-4 rtl:mr-4 rtl:ml-0 text-white/70 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <style>{`
        @keyframes slideInUp {
          from {
            transform: translateY(150%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default TalabatNotification;