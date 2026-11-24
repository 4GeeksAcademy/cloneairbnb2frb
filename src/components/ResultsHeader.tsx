import React from 'react';

interface ResultsHeaderProps {
  resultCount: number;
  sortOrder?: 'asc' | 'desc';
  onSortChange?: (order: 'asc' | 'desc') => void;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  resultCount,
  sortOrder = 'asc',
  onSortChange,
}) => {
  return (
    <div className="bg-white px-4 py-4 border-b border-gray-200 flex items-center justify-between">
      <p className="text-sm text-gray-600">
        <span className="font-semibold text-gray-900">{resultCount}</span> alojamientos
      </p>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-600">Precio:</span>
        <div className="flex gap-1">
          <button
            onClick={() => onSortChange?.('asc')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              sortOrder === 'asc'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Menor a mayor"
          >
            ↑
          </button>
          <button
            onClick={() => onSortChange?.('desc')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              sortOrder === 'desc'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Mayor a menor"
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
};
