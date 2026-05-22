# Feature: Products

Module responsible for all logic related to the B2B product catalog.

## Responsibilities
- Product listing and search
- Product details with tiered volume pricing
- Inventory management (admin)
- Categorization and filtering

## Structure
```
products/
├── components/  → Specific UI Components (ProductCard, ProductGrid, etc.)
├── services/    → Business logic and API calls
├── store/       → Global module state (Zustand slice)
└── styles/      → CSS Modules for components in this module
```
