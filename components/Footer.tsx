import React from 'react';
import type { SocialLink } from '../types';
import { InstagramIcon, TiktokIcon, FacebookIcon } from './icons/SocialIcons';
import { useLocalization } from '../hooks/useLocalization';

interface FooterProps {
    socialLinks: SocialLink[];
    logoUrl?: string;
    onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ socialLinks, logoUrl, onAdminClick }) => {
    const { t } = useLocalization();
    
    const getIcon = (name: string) => {
        switch(name.toLowerCase()) {
            case 'instagram': return <InstagramIcon />;
            case 'tiktok': return <TiktokIcon />;
            case 'facebook': return <FacebookIcon />;
            default: return null;
        }
    }

  return (
    <footer className="bg-black border-t border-gray-800 py-8 mt-16">
      <div className="container mx-auto px-6 text-center text-gray-500">
        {logoUrl && (
          <div className="mb-4 flex justify-center">
            <img src={logoUrl} alt="ASTREN Logo" className="h-12 object-contain" />
          </div>
        )}
        <div className="flex justify-center space-x-6 mb-4">
          {socialLinks.map(link => (
             <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:astren-accent transition-colors duration-300">
                {getIcon(link.name)}
            </a>
          ))}
        </div>
        <p className="mb-2">&copy; {new Date().getFullYear()} ASTREN. All Rights Reserved.</p>
        <button onClick={onAdminClick} className="text-sm text-gray-600 hover:astren-accent transition-colors duration-300">
          {t('navAdmin')}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
