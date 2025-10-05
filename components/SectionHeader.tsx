
import React from 'react';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-semibold tracking-wide text-gray-100">{title}</h2>
      <div className="mt-4 w-24 h-1 astren-bg-accent mx-auto"></div>
    </div>
  );
};

export default SectionHeader;
