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
- **Navbar**: Navegación global y logo.
- **PropertyCard**: Tarjeta de propiedad (imagen, nombre, precio, puntuación).
- **PropertyGrid**: Grid responsive de propiedades.

### Componentes Específicos por Vista

**Inicio**:
- `CategoryFilter`: Carrusel de categorías desplazables.

**Catálogo**:
- `ResultsHeader`: Encabezado con contador de resultados y opciones de ordenación.

**Detalle**:
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
│   ├── Navbar.tsx
│   ├── PropertyCard.tsx
│   ├── PropertyGrid.tsx
│   ├── CategoryFilter.tsx
│   ├── ResultsHeader.tsx
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

**Provisional**: Pendiente de revisar capturas de Airbnb en paso siguiente para validar layout, espaciados y proporciones.

```
Inicio
├── Navbar
├── SearchBar Héroe
├── CategoryFilter (carrusel)
└── PropertyGrid

Catálogo
├── Navbar
├── ResultsHeader
├── Filtros laterales (opcional según capturas)
├── PropertyGrid
└── MapPlaceholder (adaptable a móvil y escritorio)

Detalle
├── Navbar
├── ImageGallery
├── PropertyHeader
├── HostInfo
├── AmenitiesGrid
└── BookingCard (contador de huéspedes, precio, simulación de reserva)
```

---

## 8. Próximos Pasos

1. Inicializar proyecto Next.js 16 con TypeScript y Tailwind CSS.
2. Configurar Git en el repositorio.
3. Revisar capturas de Airbnb para validar arquitectura visual.
4. Crear estructura de carpetas y tipos.
5. Implementar componentes base.
6. Construir vistas: Inicio → Catálogo → Detalle.
