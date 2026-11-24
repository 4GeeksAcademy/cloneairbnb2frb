'use client';

import { useState, useEffect } from 'react';
import { Property, NavigationTab } from '@/types';
import {
  SearchBar,
  CategoryFilter,
  PropertyCarousel,
  BottomNavigation,
} from '@/components';
import { mockProperties, mockCategories } from '@/lib/mockData';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todo');
  const [activeTab, setActiveTab] = useState<NavigationTab>('explore');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  // Simulate async data loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setProperties(mockProperties);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter properties based on search query and category
  useEffect(() => {
    let filtered = properties;

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (prop) =>
          prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prop.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'Todo') {
      // Map category to search pattern
      const categoryPatterns: { [key: string]: string } = {
        'Alojamientos': 'Alojamiento',
        'Hoteles': 'Hotel',
      };
      const pattern = categoryPatterns[selectedCategory] || selectedCategory;

      filtered = filtered.filter((prop) =>
        prop.type.toLowerCase().includes(pattern.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  }, [searchQuery, selectedCategory, properties]);

  const handleSaveProperty = (id: string) => {
    setSavedPropertyIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <main className="bg-white min-h-screen pb-28">
      {/* Search Bar */}
      <SearchBar
        onSearch={setSearchQuery}
        placeholder="Empieza a buscar"
        navigateTo="/catalog"
      />

      {/* Category Filter */}
      <CategoryFilter
        categories={mockCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        scrollable
      />

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin">
            <svg
              className="w-8 h-8 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Properties Carousel Sections */}
      {!loading && filteredProperties.length > 0 && (
        <>
          <PropertyCarousel
            title="Descubre experiencias cerca de ti"
            properties={filteredProperties.slice(0, 3)}
            onSaveProperty={handleSaveProperty}
            savedProperties={savedPropertyIds}
            showMoreLink
            onShowMore={() => setSelectedCategory('Todo')}
          />

          <PropertyCarousel
            title="Quédate en París"
            properties={filteredProperties.slice(3)}
            onSaveProperty={handleSaveProperty}
            savedProperties={savedPropertyIds}
            showMoreLink
            onShowMore={() => setSelectedCategory('Todo')}
          />
        </>
      )}

      {/* Empty State */}
      {!loading && filteredProperties.length === 0 && (
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
          <p className="text-gray-500 text-sm">
            No se encontraron alojamientos
          </p>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </main>
  );
}
