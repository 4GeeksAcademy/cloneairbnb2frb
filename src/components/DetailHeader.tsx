import React from 'react';

interface DetailHeaderProps {
  onBackClick?: () => void;
  onShare?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
}

export const DetailHeader: React.FC<DetailHeaderProps> = ({
  onBackClick,
  onShare,
  onSave,
  isSaved = false,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-40 px-4 py-4 flex items-center justify-between border-b border-gray-200 max-w-md mx-auto">
      <button
        onClick={onBackClick}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Volver"
      >
        <svg
          className="w-6 h-6 text-gray-900"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="flex items-center gap-2">
        <button
          onClick={onShare}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Compartir"
        >
          <svg
            className="w-6 h-6 text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </button>

        <button
          onClick={onSave}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label={isSaved ? 'Quitar de favoritos' : 'Agregar a favoritos'}
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
    </div>
  );
};
