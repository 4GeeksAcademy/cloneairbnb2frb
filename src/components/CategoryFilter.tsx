import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory?: string;
  onSelectCategory: (category: string) => void;
  scrollable?: boolean;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory = 'Todo',
  onSelectCategory,
  scrollable = true,
}) => {
  return (
    <div
      className={`bg-white px-4 py-3 border-b border-gray-200 ${
        scrollable ? 'overflow-x-auto' : ''
      }`}
    >
      <div className="flex gap-3 pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
