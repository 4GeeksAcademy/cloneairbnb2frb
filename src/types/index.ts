/**
 * Type definitions for Airbnb Clone
 * Coherent across Inicio, Catálogo, and Detalle views
 */

/**
 * Core property/accommodation data
 * Used in PropertyCard, PropertyGrid, PropertyCarousel, and DetailHeader
 */
export interface Property {
  id: string;
  title: string;
  type: string; // e.g., "Alojamiento entero: apartamento en París, Francia"
  location: string; // e.g., "París, Francia"
  image?: string; // Single image for Inicio carousel
  images?: string[]; // Multiple images for Catálogo gallery and Detalle mosaico
  price: number; // Total price in cents or units
  currency?: string; // e.g., "€", default: "€"
  rating?: number; // e.g., 4.8
  reviewCount?: number; // e.g., 42
  guestCount?: number; // Max guests
  cancellationInfo?: string; // e.g., "0 € hoy · Cancelación gratuita antes del 21 de enero"
  dates?: {
    from: string; // e.g., "22 ene"
    to: string;   // e.g., "24 ene"
  };
}

/**
 * Host information
 * Used in HostInfo component (Detalle view)
 */
export interface Host {
  id: string;
  name: string;
  image: string; // Avatar/photo URL
  description?: string;
  responseTime?: string; // e.g., "Responde en 1 hora"
  responseRate?: number; // e.g., 100 (percentage)
}

/**
 * Amenity/feature of a property
 * Used in AmenitiesGrid component (Detalle view)
 */
export interface Amenity {
  id: string;
  name: string; // e.g., "WiFi", "Cocina", "Lavadora"
  icon?: string; // Icon name or emoji
}

/**
 * Search and filter state
 * Used across Catálogo view
 */
export interface FilterState {
  searchQuery?: string;
  sortOrder?: 'asc' | 'desc'; // Price sort: ascending/descending
  priceRange?: {
    min: number;
    max: number;
  };
  dates?: {
    from: string;
    to: string;
  };
  guestCount?: number;
}

/**
 * Category for filtering (Inicio, Catálogo views)
 * Used in CategoryFilter component
 */
export interface Category {
  id: string;
  name: string; // e.g., "Todo", "Alojamientos", "Hoteles"
  icon?: string; // Icon name or emoji
}

/**
 * Booking/reservation state
 * Used in BookingCard component (Detalle view)
 */
export interface BookingState {
  guestCount: number;
  checkInDate?: string;
  checkOutDate?: string;
  totalPrice: number;
}

/**
 * Navigation tab state
 * Used in BottomNavigation component
 */
export type NavigationTab = 'explore' | 'favorites' | 'login';

/**
 * Catalog page response/state
 * Convenience type for Catálogo view data
 */
export interface CatalogState {
  properties: Property[];
  filters: FilterState;
  resultCount: number;
  savedPropertyIds?: string[];
}

/**
 * Detail page data
 * Convenience type for Detalle view combining all sections
 */
export interface RoomDetail extends Property {
  host?: Host;
  amenities?: Amenity[];
  description?: string;
  rules?: string[];
  cancellationPolicy?: string;
}
