
import React from 'react';
import type { GalleryImage } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import SectionHeader from './SectionHeader';

interface GalleryProps {
  images: GalleryImage[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const { t, language } = useLocalization();

  return (
    <div className="py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <SectionHeader title={t('galleryTitle')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="overflow-hidden rounded-lg shadow-lg shadow-black/40">
              <img 
                src={image.src} 
                alt={image.alt[language]} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
