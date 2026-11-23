import React from 'react';
import { Property } from '@/types';
import { PropertyCard } from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
  columns?: 1 | 2 | 3;
  gap?: 'sm' | 'md' | 'lg';
  onPropertyClick: (id: string) => void;
  onSaveProperty?: (id: string) => void;
  savedProperties?: string[];
}

const gapClasses = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
};

const columnsClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
};

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  columns = 1,
  gap = 'md',
  onPropertyClick,
  onSaveProperty,
  savedProperties = [],
}) => {
  return (
    <div
      className={`grid ${columnsClasses[columns]} ${gapClasses[gap]} px-4 py-4`}
    >
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onClick={() => onPropertyClick(property.id)}
          onSave={onSaveProperty}
          isSaved={savedProperties.includes(property.id)}
        />
      ))}
    </div>
  );
};
