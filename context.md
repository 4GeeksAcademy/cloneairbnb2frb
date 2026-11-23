# Clon de Airbnb - Arquitectura Funcional

## 1. Objetivo y Alcance

Desarrollar una interfaz visual inspirada en Airbnb como ejercicio educativo en React y Next.js.

**Características**:
- Enfoque mobile-first (375px), escalable a escritorio.
- Datos ficticios mediante archivos estáticos.
- Interactividad simulada sin backend real.
- Componentes reutilizables con una única responsabilidad.

**Limitaciones**:
- Sin autenticación, pagos ni reservas reales.
- Búsqueda y filtrado simulados en cliente.

---

## 2. Vistas de la Aplicación

### Inicio (`/`)
Página de entrada con barra de búsqueda principal, categorías de alojamientos y propiedades destacadas.

### Catálogo (`/catalog`)
Listado de alojamientos con filtros, ordenación y mapa adaptable a móvil y escritorio.

### Detalle (`/rooms/[id]`)
Galería de imágenes, información del alojamiento, amenidades, información del anfitrión y panel de reserva simulada.

---

## 3. Componentes Principales

### Componentes Compartidos (Reutilizables)

#### **BottomNavigation** *(Nuevo)*
- **Responsabilidad**: Navegación inferior fija con pestañas de exploración, favoritos e inicio de sesión.
- **Props**:
  - `activeTab?: 'explore' | 'favorites' | 'login'` (pestaña activa)
  - `onTabChange: (tab: string) => void` (callback de cambio de pestaña)
- **Ubicación**: Fondo de la pantalla (position fixed/sticky).
- **Reutilización**: Todas las vistas (Inicio, Catálogo, Detalle).
- **Notas**: Componente global persistente en móvil.

#### **SearchBar**
- **Responsabilidad**: Barra de búsqueda simple con placeholder "Empieza a buscar".
- **Props**:
  - `onSearch: (query: string) => void` (callback de búsqueda)
  - `placeholder?: string` (default: "Empieza a buscar")
  - `showFilters?: boolean` (mostrar icono de filtros)
- **Ubicación**: Parte superior de la página, inmediatamente debajo de cualquier navbar si existe.
- **Reutilización**: Inicio, Catálogo.
- **Notas**: Barra blanca sin imagen de fondo en móvil. No es un formulario expandible.

#### **CategoryFilter**
- **Responsabilidad**: Tabs/filtros horizontales (Todo, Alojamientos, Hoteles, etc.).
- **Props**:
  - `categories: string[]` (opciones visibles: "Todo", "Alojamientos", "Hoteles")
  - `selectedCategory?: string` (categoría activa)
  - `onSelectCategory: (category: string) => void` (callback)
  - `scrollable?: boolean` (permite scroll horizontal, default true)
- **Ubicación**: Debajo de SearchBar.
- **Reutilización**: Inicio, Catálogo.
- **Notas**: Filtro de tipo de alojamiento, NO carrusel de amenidades.

#### **PropertyCard**
- **Responsabilidad**: Tarjeta individual de alojamiento con foto(s), ubicación, fechas, precio total y valoración.
- **Props**:
  - `property: Property` (datos: id, imagen(es), ubicación, fechas, precioTotal, valoracion)
  - `onClick?: () => void` (navegación a detalle)
  - `onSave?: (id: string) => void` (guardar favorito)
  - `isSaved?: boolean` (estado visual del favorito)
- **Ubicación**: Dentro de PropertyGrid o PropertyCarousel.
- **Reutilización**: Inicio, Catálogo, Detalle.
- **Notas**: Acepta múltiples imágenes (array) para renderizar galería 2x2 en Catálogo o imagen única en Inicio.

#### **PropertyGrid**
- **Responsabilidad**: Contenedor responsive para grid de tarjetas (layout vertical/columnas).
- **Props**:
  - `properties: Property[]` (array de propiedades)
  - `columns?: 1 | 2 | 3` (número de columnas, default 1 en mobile)
  - `gap?: 'sm' | 'md' | 'lg'` (espaciado entre tarjetas)
  - `onPropertyClick: (id: string) => void` (navegación a detalle)
  - `onSaveProperty?: (id: string) => void` (guardar favoritos)
  - `savedProperties?: string[]` (ids de propiedades guardadas)
- **Ubicación**: Inicio, Catálogo, Detalle.
- **Reutilización**: Varias vistas.
- **Notas**: Layout en columnas para vistas de listado/grid convencional.

#### **PropertyCarousel** *(Nuevo)*
- **Responsabilidad**: Contenedor scroll horizontal para PropertyCard.
- **Props**:
  - `properties: Property[]` (array de propiedades)
  - `title?: string` (título de la sección, ej: "Alojamientos populares")
  - `onPropertyClick: (id: string) => void` (navegación a detalle)
  - `onSaveProperty?: (id: string) => void` (guardar favoritos)
  - `savedProperties?: string[]` (ids de propiedades guardadas)
  - `showMoreLink?: boolean` (enlace "Ver más")
  - `onShowMore?: () => void` (callback para ver más)
- **Ubicación**: Múltiples secciones en Inicio y Catálogo.
- **Reutilización**: Inicio (varias secciones), Catálogo, Detalle (propiedades similares).
- **Notas**: Implementar overflow-x-auto con scroll suave en Tailwind. Alternativa horizontal a PropertyGrid.

#### **ResultsHeader** *(Nuevo - Catálogo)*
- **Responsabilidad**: Encabezado de resultados con contador y selector de ordenación por precio.
- **Props**:
  - `resultCount: number` (ej: 1.000+)
  - `sortOrder?: 'asc' | 'desc'` (orden de precio: ascendente o descendente)
  - `onSortChange?: (order: 'asc' | 'desc') => void` (callback de cambio de ordenación)
- **Ubicación**: Inmediatamente debajo de SearchBar en Catálogo.
- **Notas**: Componente de presentación. Selector de ordenación integrado directamente (sin modal).

#### **MapPlaceholder** *(Nuevo - Catálogo)*
- **Responsabilidad**: Área visual adaptable a móvil y escritorio para simulación de mapa.
- **Props**:
  - `isVisible: boolean` (mostrar/ocultar mapa)
  - `onClose?: () => void` (callback para cerrar mapa)
- **Ubicación**: Pantalla completa en móvil/escritorio cuando se activa el toggle Mapa en Catálogo.
- **Notas**: Componente visual estático sin coordenadas, marcadores ni funcionalidades geográficas.

#### **DetailHeader** *(Nuevo - Detalle)*
- **Responsabilidad**: Barra de navegación blanca superior con controles de detalle (volver, compartir, favorito).
- **Props**:
  - `onBackClick?: () => void` (callback de flecha atrás)
  - `onShare?: () => void` (callback de compartir)
  - `onSave?: () => void` (callback de guardar favorito)
  - `isSaved?: boolean` (estado visual del corazón)
- **Ubicación**: Parte superior de Detalle, encima de ImageGallery.
- **Notas**: Barra blanca de navegación. Separada visualmente de la galería de imágenes.

#### **ImageGallery** *(Nuevo - Detalle)*
- **Responsabilidad**: Mosaico de imágenes adaptable a móvil, navegable con contador visible.
- **Props**:
  - `images: string[]` (array de URLs de imágenes)
  - `currentImageIndex?: number` (índice actual de imagen, default 0)
  - `onImageChange?: (index: number) => void` (callback de cambio de imagen)
  - `showCounter?: boolean` (mostrar contador "X/Y", default true)
  - `imageCount?: number` (total de imágenes)
- **Ubicación**: Parte superior de Detalle, debajo de DetailHeader.
- **Notas**: Mosaico adaptable a móvil. Contador posicionado en esquina inferior derecha. Responsable solo de galería y navegación.

#### **PropertyHeader** *(Nuevo - Detalle)*
- **Responsabilidad**: Encabezado de propiedad con título, tipo e información de ubicación.
- **Props**:
  - `title: string` (ej: "Acogedor apartamento de 2 habitaciones renovado")
  - `type: string` (ej: "Alojamiento entero: apartamento en París, Francia")
  - `location?: string` (ubicación/dirección adicional si existe)
- **Ubicación**: Inmediatamente debajo de ImageGallery.
- **Notas**: Componente de presentación únicamente. Sin información de precios ni reserva.

#### **BookingCard** *(Nuevo - Detalle)*
- **Responsabilidad**: Panel de reserva con precio, condiciones, contador de huéspedes y botón de acción.
- **Props**:
  - `price: number` (precio total)
  - `currency?: string` (moneda, default "€")
  - `dates?: { from: string; to: string }` (ej: { from: "22", to: "24 ene" })
  - `guestCount?: number` (cantidad de huéspedes, default 1)
  - `onGuestCountChange?: (count: number) => void` (callback de cambio de huéspedes)
  - `maxGuests?: number` (máximo de huéspedes permitidos)
  - `cancellationInfo?: string` (ej: "0 € hoy · Cancelación gratuita antes del 21 de enero")
  - `onReserve?: () => void` (callback de reserva simulada)
  - `reserveLabel?: string` (texto del botón, default "Reservar")
  - `disabled?: boolean` (desactivar botón)
- **Ubicación**: Parte inferior de Detalle, fijo o sticky.
- **Notas**: Panel completo de reserva. Incluye contador de huéspedes (spinbutton) aunque no esté visible en captura.

#### **HostInfo** *(Previsto - Detalle)*
- **Responsabilidad**: Información del anfitrión (fotografía, nombre, descripción, respuesta rápida).
- **Props**:
  - `host: { name: string; image: string; description?: string; responseTime?: string }` (datos del anfitrión)
  - `onContactHost?: () => void` (callback para contactar)
- **Ubicación**: Entre PropertyHeader y AmenitiesGrid.
- **Notas**: Componente previsto en ejercicio. Pendiente de validación visual.

#### **AmenitiesGrid** *(Previsto - Detalle)*
- **Responsabilidad**: Grid de amenidades disponibles en el alojamiento.
- **Props**:
  - `amenities: Amenity[]` (array de amenidades con icono y nombre)
  - `columns?: 1 | 2 | 3 | 4` (número de columnas, default 2 en móvil)
- **Ubicación**: Entre HostInfo y BookingCard.
- **Notas**: Componente previsto en ejercicio. Pendiente de validación visual.

### Componentes Específicos por Vista

**Inicio (`/`) - Observado en captura**:
- `SearchBar`: Barra de búsqueda en la parte superior.
- `CategoryFilter`: Tabs de filtros (Todo, Alojamientos, Hoteles).
- `PropertyCarousel`: Múltiples carruseles de alojamientos por sección/categoría.
- `BottomNavigation`: Navegación inferior fija (global).
- **Nota**: Se identifica una sección de experiencias en la captura, pero queda fuera del alcance funcional de este ejercicio.
- **Jerarquía observada**:
  ```
  Pantalla
  ├── SearchBar (top)
  ├── CategoryFilter
  ├── PropertyCarousel [Sección 1]
  │   └── PropertyCard (repetido)
  ├── PropertyCarousel [Sección 2]
  │   └── PropertyCard (repetido)
  └── BottomNavigation (fixed bottom)
  ```

**Catálogo (`/catalog`)** *(Validado con captura)*:
- `SearchBar`: Barra de búsqueda con criterios contextuales (ej: "Alojamientos en París", filtros de fechas).
- `ResultsHeader`: Contador de resultados y selector de ordenación por precio.
- `PropertyGrid`: Presentación de resultados en grid vertical.
- `PropertyCard` (con múltiples imágenes): Tarjetas con galería 2x2.
- `MapPlaceholder`: Área visual de mapa (activable vía botón).
- `BottomNavigation`: Navegación inferior fija (global).
- **Jerarquía observada**:
  ```
  SearchBar (criterios contextuales)
  ├── ResultsHeader (contador + selector de ordenación)
  ├── PropertyGrid
  │   └── PropertyCard (images[], galería 2x2)
  ├── MapPlaceholder (fullscreen cuando isVisible=true)
  └── BottomNavigation (fixed bottom)
  ```

**Detalle (`/rooms/[id]`)** *(Provisional)*:
- `ImageGallery`: Galería de imágenes con navegación.
- `PropertyHeader`: Título, ubicación y puntuación.
- `HostInfo`: Información del anfitrión.
- `AmenitiesGrid`: Grid de amenidades.
- `BookingCard`: Panel lateral con contador de huéspedes, precio y simulación de reserva.

---

## 4. Usuario Objetivo

Viajero casual buscando alojamientos de forma visual e intuitiva.

**Recorrido típico**:
1. Llega a inicio (`/`)
2. Explora categorías o busca
3. Navega a catálogo (`/catalog`) con resultados
4. Aplica filtros por precio, tipo
5. Selecciona un alojamiento
6. Visualiza detalle en `/rooms/[id]`
7. Completa contador de huéspedes y simula reserva

---

## 5. Requisitos Técnicos

- **Framework**: Next.js 16 con App Router
- **Lenguaje**: TypeScript
- **UI**: React 19+
- **Estilos**: Tailwind CSS (sin librerías de componentes)
- **Navegación**: `next/link`
- **Datos**: Archivos JSON estáticos

---

## 6. Estructura de Carpetas

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Inicio)
│   ├── catalog/
│   │   └── page.tsx
│   └── rooms/
│       └── [id]/
│           └── page.tsx
├── components/
│   ├── BottomNavigation.tsx
│   ├── SearchBar.tsx
│   ├── CategoryFilter.tsx
│   ├── PropertyCard.tsx
│   ├── PropertyGrid.tsx
│   ├── PropertyCarousel.tsx
│   ├── ResultsHeader.tsx
│   ├── MapPlaceholder.tsx
│   ├── DetailHeader.tsx
│   ├── ImageGallery.tsx
│   ├── PropertyHeader.tsx
│   ├── HostInfo.tsx
│   ├── AmenitiesGrid.tsx
│   └── BookingCard.tsx
├── data/
│   └── properties.json
├── types/
│   └── index.ts
└── utils/
    └── helpers.ts
```

---

## 7. Arquitectura Visual

**Inicio** *(validado con captura 375px)*:
```
SearchBar (top)
├── CategoryFilter
├── PropertyCarousel [Sección 1]
├── PropertyCarousel [Sección 2]
└── PropertyCarousel [Sección N...]
BottomNavigation (fixed bottom)
```

**Catálogo** *(validado con captura 375px)*:
```
SearchBar (criterios contextuales)
├── ResultsHeader (contador + ordenación por precio)
├── PropertyGrid
│   └── PropertyCard (images[], galería 2x2)
├── MapPlaceholder (fullscreen cuando activo)
└── BottomNavigation (fixed bottom)
```

**Detalle** *(Validado parcialmente con captura 375px)*:
```
DetailHeader (barra blanca, controles: volver, compartir, favorito)
├── ImageGallery (mosaico adaptable a móvil, contador)
├── PropertyHeader (título, tipo, ubicación)
├── [HostInfo - previsto, no validado en captura]
├── [AmenitiesGrid - previsto, no validado en captura]
└── BookingCard (precio, fechas, contador huéspedes, botón Reservar)
```

---

## 8. Próximos Pasos

1. ✅ Inicializar proyecto Next.js 16 con TypeScript y Tailwind CSS.
2. ✅ Configurar Git en el repositorio.
3. ✅ Revisar captura de Airbnb (Inicio 375px) - **COMPLETADO**.
4. ✅ Revisar captura de Catálogo (375px) - **COMPLETADO**.
5. ✅ Revisar captura de Detalle (375px) - **COMPLETADO (parcial)**.
6. 🔲 Crear estructura de carpetas y tipos TypeScript.
6. 🔲 Implementar componentes compartidos: SearchBar, CategoryFilter, PropertyCard, PropertyGrid, PropertyCarousel, BottomNavigation.
7. 🔲 Implementar componentes específicos de Inicio.
8. 🔲 Construir vista Inicio completa.
9. 🔲 Construir vista Catálogo (una vez validada con captura).
10. 🔲 Construir vista Detalle (una vez validada con captura).
