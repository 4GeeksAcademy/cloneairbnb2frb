'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DetailHeader,
  ImageGallery,
  PropertyHeader,
  HostInfo,
  AmenitiesGrid,
  BookingCard,
  GuestCounter,
} from '@/components';
import { mockProperties, mockHosts, mockAmenities } from '@/lib/mockData';
import type { Property } from '@/types/index';

interface DetailPageClientProps {
  id: string;
}

export default function DetailPageClient({ id }: DetailPageClientProps) {
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [guestCount, setGuestCount] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const found = mockProperties.find((p) => p.id === id);
      setProperty(found || null);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-pink-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Cargando alojamiento...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
        <svg
          className="w-16 h-16 text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 12a9 9 0 110 18 9 9 0 010-18z"
          />
        </svg>
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          Alojamiento no encontrado
        </h1>
        <p className="text-gray-600 mb-6">
          No pudimos encontrar el alojamiento que buscas.
        </p>
        <button
          onClick={() => router.push('/catalog')}
          className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-colors"
        >
          Volver al Catálogo
        </button>
      </div>
    );
  }

  const host = mockHosts[property.id];
  const selectedAmenities = mockAmenities.slice(0, 6);
  const images = property.images || [property.image || ''];
  const currency = property.currency || '€';
  const rating = property.rating || 4.5;
  const reviewCount = property.reviewCount || 0;
  const guestCount_max = property.guestCount || 2;
  const cancellationInfo = property.cancellationInfo || 'Cancelación gratuita';

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <DetailHeader
        onBackClick={() => router.push('/catalog')}
        onShare={() => alert('Compartir: ' + property.title)}
        onSave={() => setIsSaved(!isSaved)}
        isSaved={isSaved}
      />

      <div className="flex-1 overflow-y-auto pb-24 pt-16">
        <ImageGallery
          images={images}
          currentImageIndex={currentImageIndex}
          onImageChange={setCurrentImageIndex}
        />

        <PropertyHeader
          title={property.title}
          type={property.type}
          location={property.location}
          rating={rating}
          reviewCount={reviewCount}
        />

        {host && <HostInfo host={host} />}

        <AmenitiesGrid amenities={selectedAmenities} columns={2} />

        <GuestCounter
          guestCount={guestCount}
          onGuestCountChange={setGuestCount}
          maxGuests={guestCount_max}
          cancellationInfo={cancellationInfo}
        />
      </div>

      <BookingCard
        price={property.price}
        currency={currency}
        onReserve={() => alert(`Reserva confirmada para ${guestCount} huéspedes`)}
      />
    </div>
  );
}
