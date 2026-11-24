import React from 'react';

interface GuestCounterProps {
  guestCount: number;
  onGuestCountChange: (count: number) => void;
  maxGuests: number;
  cancellationInfo: string;
}

export const GuestCounter: React.FC<GuestCounterProps> = ({
  guestCount,
  onGuestCountChange,
  maxGuests,
  cancellationInfo,
}) => {
  const handleGuestIncrement = () => {
    if (guestCount < maxGuests) {
      onGuestCountChange(guestCount + 1);
    }
  };

  const handleGuestDecrement = () => {
    if (guestCount > 1) {
      onGuestCountChange(guestCount - 1);
    }
  };

  return (
    <div className="px-4 py-6 border-b border-gray-200">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-900">Huéspedes</span>
          <div className="flex items-center gap-3 border border-gray-300 rounded-lg p-1">
            <button
              onClick={handleGuestDecrement}
              disabled={guestCount === 1}
              className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Disminuir huéspedes"
            >
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
                  d="M20 12H4"
                />
              </svg>
            </button>

            <span className="w-6 text-center font-semibold text-gray-900">
              {guestCount}
            </span>

            <button
              onClick={handleGuestIncrement}
              disabled={guestCount === maxGuests}
              className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Aumentar huéspedes"
            >
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-600">{cancellationInfo}</p>
      </div>
    </div>
  );
};
