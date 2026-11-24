import React from 'react';
import Link from 'next/link';
import { NavigationTab } from '@/types';

interface BottomNavigationProps {
  activeTab?: NavigationTab;
  onTabChange?: (tab: NavigationTab) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab = 'explore',
  onTabChange,
}) => {
  const tabs: Array<{ id: NavigationTab; label: string; icon: string; href?: string }> = [
    {
      id: 'explore',
      label: 'Explorar',
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      href: '/catalog',
    },
    {
      id: 'favorites',
      label: 'Favoritos',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    },
    {
      id: 'login',
      label: 'Iniciar sesión',
      icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center h-20 max-w-md mx-auto">
      {tabs.map(({ id, label, icon, href }) => {
        const button = (
          <button
            onClick={() => onTabChange?.(id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              activeTab === id
                ? 'text-red-500'
                : 'text-gray-900 hover:text-gray-600'
            }`}
          >
            <svg
              className="w-6 h-6"
              fill={activeTab === id ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={icon}
              />
            </svg>
            <span className="text-xs font-medium">{label}</span>
          </button>
        );

        return (
          <div key={id}>
            {href ? <Link href={href}>{button}</Link> : button}
          </div>
        );
      })}
    </nav>
  );
};
