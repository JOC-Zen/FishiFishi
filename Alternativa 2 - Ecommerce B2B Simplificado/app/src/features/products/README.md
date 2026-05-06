# Feature: Products

Módulo responsable de toda la lógica relacionada con el catálogo de productos B2B.

## Responsabilidades
- Listado y búsqueda de productos
- Detalle de producto con precios escalonados por volumen
- Gestión de inventario (admin)
- Categorización y filtrado

## Estructura
```
products/
├── components/  → Componentes UI específicos (ProductCard, ProductGrid, etc.)
├── services/    → Lógica de negocio y llamadas a API
├── store/       → Estado global del módulo (Zustand slice)
└── styles/      → CSS Modules para los componentes de este módulo
```
