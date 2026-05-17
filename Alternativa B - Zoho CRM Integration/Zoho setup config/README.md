# 🧩 La Cañada Seafood — Arquitectura Híbrida Zoho CRM (Alternativa B)

Este módulo define la estrategia de integración dual para La Cañada Seafood, separando la experiencia del comprador de la gestión administrativa dentro de Zoho CRM.

## 🏗️ Visión General de la Arquitectura

### 1. Portal del Comprador (E-commerce Externo) — "Enriquecimiento del CRM"
El portal público (basado en Next.js y alojado en Netlify) actúa como la fuente de datos que alimenta el CRM.
- **Flujo**: Cliente -> La Cañada Seafood Portal -> Zoho CRM API.
- **Acciones**:
  - Sincronización de **Leads/Contactos** al registrarse.
  - Creación automática de **Sales Orders** (Pedidos de Venta) al finalizar una compra.
  - Actualización de **Intereses de Productos** (enriquecimiento de perfiles).
- **Tecnología**: Integración Server-to-Server vía OAuth 2.0.

### 2. Portal de Admin (Gestión Interna) — "Módulos Integrados en Zoho"
Las herramientas administrativas se incrustan directamente en la interfaz de Zoho CRM mediante Widgets.
- **Flujo**: Admin -> Zoho CRM UI -> La Cañada Seafood Widget.
- **Acciones**:
  - Gestión avanzada de **Precios Escalonados** (Tiered Pricing) que Zoho nativamente no maneja con tanta flexibilidad.
  - Visualización de **Dashboard de Inventario** con estética La Cañada Seafood.
  - Aprobación rápida de pedidos B2B.
- **Tecnología**: Zoho JS SDK (Client-side).

---

## 🛠️ Componentes de Integración

### Para el Portal de Admin (Widget)
- `zoho-sdk-bridge.ts`: Puente para que el widget "hable" con la sesión activa de Zoho.
- `next.config.zoho.mjs`: Configuración para exportación estática.
- `manifest.json`: Definición del widget para el CRM.

### Para el Portal de Comprador (Server-side)
- `zoho-api-client.ts`: Cliente para realizar llamadas seguras desde el servidor (API Routes) de Next.js hacia Zoho CRM.

---

## 🚀 Hoja de Ruta de Implementación
1. **Configuración de OAuth**: Registrar La Cañada Seafood en la consola de APIs de Zoho.
2. **Mapeo de Datos**: Definir cómo los campos de `Product.ts` y `Order.ts` de La Cañada Seafood se mapean a los campos de Zoho.
3. **Sincronización de Stock**: Implementar un webhook o polling para que el portal de comprador refleje el stock real de Zoho.

---
*Diseñado para maximizar la potencia de Zoho CRM sin comprometer la experiencia premium de La Cañada Seafood.*
