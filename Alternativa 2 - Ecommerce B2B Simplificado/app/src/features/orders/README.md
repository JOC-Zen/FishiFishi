# Feature: Orders

Module responsible for the complete B2B wholesale order workflow.

## Responsibilities
- Shopping cart / order request
- Order history
- Status tracking (pending, confirmed, processing, shipped, delivered)
- Quote generation

## Structure
```
orders/
├── components/  → UI Components (OrderTable, OrderDetail, CartSummary, etc.)
├── services/    → Business logic and API calls
├── store/       → Global module state
└── styles/      → CSS Modules for components in this module
```
