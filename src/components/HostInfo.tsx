import React from 'react';
import type { Host } from '@/types/index';

interface HostInfoProps {
  host: Host;
}

export const HostInfo: React.FC<HostInfoProps> = ({ host }) => {
  return (
    <div className="px-4 py-6 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Anfitrión</h2>

      <div className="flex items-start gap-4">
        <img
          src={host.image}
          alt={host.name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{host.name}</h3>

          <p className="text-sm text-gray-600 mb-3">{host.description}</p>

          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{host.responseTime}</span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-600 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{host.responseRate}% tasa de respuesta</span>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full mt-4 px-4 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
        Contactar anfitrión
      </button>
    </div>
  );
};
