import React from 'react';
import type { Amenity } from '@/types/index';

interface AmenitiesGridProps {
  amenities: Amenity[];
  columns?: number;
}

export const AmenitiesGrid: React.FC<AmenitiesGridProps> = ({
  amenities,
  columns = 2,
}) => {
  return (
    <div className="px-4 py-6 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Comodidades</h2>

      <div
        className={`grid gap-4`}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {amenities.map((amenity) => (
          <div
            key={amenity.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl flex-shrink-0">{amenity.icon}</span>
            <span className="text-sm text-gray-900 font-medium">{amenity.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
