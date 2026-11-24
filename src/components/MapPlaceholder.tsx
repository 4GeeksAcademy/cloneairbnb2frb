import React from 'react';

interface MapPlaceholderProps {
  isVisible: boolean;
  onClose?: () => void;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Mapa</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Cerrar mapa"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Map Area */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center overflow-hidden">
        <div className="text-center px-6">
          <svg
            className="w-20 h-20 text-blue-300 mx-auto mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
          </svg>
          <p className="text-gray-600 font-medium mb-2">Área de mapa</p>
          <p className="text-sm text-gray-500">
            Los marcadores de alojamientos aparecerían aquí
          </p>
        </div>
      </div>

      {/* Footer info */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <p className="text-xs text-gray-600 text-center">
          Componente visual simulado - Sin servicio de mapas integrado
        </p>
      </div>
    </div>
  );
};
