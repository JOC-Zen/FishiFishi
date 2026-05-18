# 🧩 La Cañada Seafood — Hybrid Zoho CRM Architecture (Alternative B)

This module defines the dual integration strategy for La Cañada Seafood, separating the buyer experience from administrative management within Zoho CRM.

## 🏗️ Architectural Overview

### 1. Buyer Portal (External E-commerce) — "CRM Enrichment"
The public portal (Next.js based and hosted on Netlify) acts as the data source feeding the CRM.
- **Flow**: Client -> La Cañada Seafood Portal -> Zoho CRM API.
- **Actions**:
  - Synchronization of **Leads/Contacts** upon registration.
  - Automatic creation of **Sales Orders** upon checkout.
  - Update of **Product Interests** (profile enrichment).
- **Technology**: Server-to-Server integration via OAuth 2.0.

### 2. Admin Portal (Internal Management) — "Integrated Modules in Zoho"
Administrative tools are embedded directly into the Zoho CRM interface via Widgets.
- **Flow**: Admin -> Zoho CRM UI -> La Cañada Seafood Widget.
- **Actions**:
  - Advanced management of **Tiered Pricing** that Zoho does not natively handle with such flexibility.
  - Visualization of the **Inventory Dashboard** with La Cañada Seafood aesthetics.
  - Quick approval of B2B orders.
- **Technology**: Zoho JS SDK (Client-side).

---

## 🛠️ Integration Components

### For the Admin Portal (Widget)
- `zoho-sdk-bridge.ts`: Bridge for the widget to "talk" with the active Zoho session.
- `next.config.zoho.mjs`: Configuration for static export.
- `manifest.json`: Widget definition for the CRM.

### For the Buyer Portal (Server-side)
- `zoho-api-client.ts`: Client to perform secure calls from the Next.js server (API Routes) to Zoho CRM.

---

## 🚀 Implementation Roadmap
1. **OAuth Configuration**: Register La Cañada Seafood in the Zoho API Console.
2. **Data Mapping**: Define how the fields of `Product.ts` and `Order.ts` from La Cañada Seafood map to Zoho fields.
3. **Stock Synchronization**: Implement a webhook or polling so the buyer portal reflects real-time stock levels from Zoho.

---
*Designed to maximize Zoho CRM capabilities without compromising the premium experience of La Cañada Seafood.*
