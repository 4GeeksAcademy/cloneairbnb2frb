import React from 'react';

interface BookingCardProps {
  price: number;
  currency: string;
  onReserve?: () => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  price,
  currency,
  onReserve,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-md mx-auto shadow-lg z-30">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900">{currency}{price}</span>
          <span className="text-sm text-gray-600">por noche</span>
        </div>

        <button
          onClick={onReserve}
          className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          Reservar
        </button>
      </div>
    </div>
  );
};
