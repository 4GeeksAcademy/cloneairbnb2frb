'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { NavigationTab } from '@/types';
import {
  SearchBar,
  ResultsHeader,
  PropertyGrid,
  MapPlaceholder,
  BottomNavigation,
} from '@/components';
import { mockProperties } from '@/lib/mockData';

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeTab, setActiveTab] = useState<NavigationTab>('explore');
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>([]);
  const [showMap, setShowMap] = useState(false);

  // Sort properties based on current order
  const sortedProperties = useMemo(() => {
    let sorted = [...mockProperties];

    if (searchQuery.trim()) {
      sorted = sorted.filter(
        (prop) =>
          prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prop.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    sorted.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    return sorted;
  }, [searchQuery, sortOrder]);

  const handleSaveProperty = (id: string) => {
    setSavedPropertyIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <main className="bg-white min-h-screen pb-28 relative">
      {/* Home Navigation Button */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center">
        <Link
          href="/"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Volver a Inicio"
        >
          <svg
            className="w-6 h-6 text-gray-900"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="sticky top-0 z-40 bg-white">
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Alojamientos en París"
          showFilters
          navigateTo={undefined}
        />
      </div>

      {/* Results Header */}
      <ResultsHeader
        resultCount={sortedProperties.length}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      {/* Map Toggle Button */}
      <div className="px-4 py-3 border-b border-gray-200 bg-white">
        <button
          onClick={() => setShowMap(true)}
          className="w-full px-4 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
          </svg>
          Mostrar mapa
        </button>
      </div>

      {/* Properties Grid */}
      {sortedProperties.length > 0 ? (
        <PropertyGrid
          properties={sortedProperties}
          columns={1}
          gap="md"
          onSaveProperty={handleSaveProperty}
          savedProperties={savedPropertyIds}
        />
      ) : (
        <div className="text-center py-12 px-4">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-500 text-sm font-medium">
            No se encontraron alojamientos
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Intenta con otros términos de búsqueda
          </p>
        </div>
      )}

      {/* Map Placeholder */}
      <MapPlaceholder
        isVisible={showMap}
        onClose={() => setShowMap(false)}
      />

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </main>
  );
}
