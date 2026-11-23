import React from 'react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  showFilters?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Empieza a buscar',
  showFilters = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <div className="bg-white px-4 py-3 border-b border-gray-200">
      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2.5">
        <svg
          className="w-5 h-5 text-gray-500 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleChange}
          className="bg-transparent text-gray-900 placeholder-gray-500 outline-none flex-1 text-sm"
        />
        {showFilters && (
          <svg
            className="w-5 h-5 text-gray-500 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
};
