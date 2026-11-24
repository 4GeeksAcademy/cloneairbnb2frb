import React from 'react';
import Link from 'next/link';
import { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
  onSave?: (id: string) => void;
  isSaved?: boolean;
  href?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onClick,
  onSave,
  isSaved = false,
  href,
}) => {
  const imageUrl = property.image || (property.images?.[0] ?? '');
  const link = href || `/rooms/${property.id}`;

  const content = (
    <div
      onClick={onClick}
      className="cursor-pointer hover:opacity-90 transition-opacity"
    >
      <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-square">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Sin imagen</span>
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave?.(property.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <svg
            className={`w-6 h-6 ${
              isSaved ? 'fill-red-500 text-red-500' : 'text-gray-900'
            }`}
            fill={isSaved ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
          {property.title}
        </h3>
        <p className="text-xs text-gray-600 mt-1">{property.location}</p>
        {property.dates && (
          <p className="text-xs text-gray-600 mt-1">
            {property.dates.from} – {property.dates.to}
          </p>
        )}
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-semibold text-gray-900">
            {property.price}
            {property.currency || '€'} en total
          </p>
          {property.rating && (
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-900">
                ⭐ {property.rating}
              </span>
              {property.reviewCount && (
                <span className="text-xs text-gray-600">
                  ({property.reviewCount})
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return href ? (
    <Link href={link} className="block">
      {content}
    </Link>
  ) : (
    content
  );
};
