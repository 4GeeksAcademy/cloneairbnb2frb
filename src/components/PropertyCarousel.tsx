import React from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import { PropertyCard } from './PropertyCard';

interface PropertyCarouselProps {
  properties: Property[];
  title?: string;
  onPropertyClick?: (id: string) => void;
  onSaveProperty?: (id: string) => void;
  savedProperties?: string[];
  showMoreLink?: boolean;
  onShowMore?: () => void;
}

export const PropertyCarousel: React.FC<PropertyCarouselProps> = ({
  properties,
  title,
  onPropertyClick,
  onSaveProperty,
  savedProperties = [],
  showMoreLink = true,
  onShowMore,
}) => {
  return (
    <div className="bg-white py-6">
      <div className="px-4 flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {showMoreLink && (
          <button
            onClick={onShowMore}
            className="text-gray-900 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="overflow-x-auto px-4 pb-2">
        <div className="flex gap-4 pb-2">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex-shrink-0 w-56"
            >
              <Link href={`/rooms/${property.id}`}>
                <PropertyCard
                  property={property}
                  onSave={onSaveProperty}
                  isSaved={savedProperties.includes(property.id)}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
