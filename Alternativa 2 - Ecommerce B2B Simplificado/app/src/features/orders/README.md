# Feature: Orders

Módulo responsable del flujo completo de pedidos mayoristas B2B.

## Responsabilidades
- Carrito de compras / solicitud de pedido
- Historial de pedidos
- Seguimiento de estado (pendiente, confirmado, enviado, entregado)
- Generación de cotizaciones

## Estructura
```
orders/
├── components/  → Componentes UI (OrderTable, OrderDetail, CartSummary, etc.)
├── services/    → Lógica de negocio y llamadas a API
├── store/       → Estado global del módulo
└── styles/      → CSS Modules para los componentes de este módulo
```
