# FishiFishi B2B Portal: Technical Specification & Architecture

**Prepared for:** FishiFishi Executive Team  
**Subject:** Technical Logic and Module Integration  
**Version:** 1.0.0  
**Language:** English  

---

## 1. Executive Summary
FishiFishi B2B is a premium, resilient ecommerce platform designed for the wholesale seafood industry. The system follows a **Feature-based Modular Architecture**, decoupling business logic from the UI to ensure scalability, high performance, and visual excellence. This document outlines the internal logic and inter-module communications that power the platform.

## 2. Architectural Overview
The application is built on **Next.js 15 (App Router)** with a strict separation of concerns:

- **`/app`**: Routing and UI Layouts.
- **`/features`**: Encapsulated business logic (Services, Stores, Types).
- **`/core`**: Global entities and error handling.
- **`/shared`**: Reusable UI components, utilities, and infrastructure (Prisma, Auth).

## 3. Core Modules & Logic

### 3.1. Authentication & Security (Auth Module)
The security layer uses **NextAuth.js** with JWT-based sessions.
- **Role-Based Access Control (RBAC)**: Logic is enforced at both the Middleware and Service levels.
    - **ADMIN**: Access to `/dashboard` (Metrics, Inventory control, Client approval).
    - **CLIENT**: Access to `/portal` (Catalog, Cart, Order history).
- **Session Persistence**: Sessions are managed via encrypted JWT tokens, containing the user's Role, Tier, and Status.

### 3.2. Product & Catalog Management (Products Module)
The heart of the B2B experience is the dynamic catalog.
- **Dynamic Pricing Engine**: Prices are not static. The `ProductService` and `PricingPage` calculate real-time prices based on the client's **Tier** (Gold, Silver, Bronze).
    - *Logic*: `EffectivePrice = BasePrice * (1 - TierDiscount)`.
- **Inventory Tracking**: Stock levels are monitored with a color-coded "Health" system (Healthy > 50%, Warning 20-50%, Critical < 20%).
- **SKU Management**: Each product is mapped to a unique SKU and category, used for global search and filtering.

### 3.3. Order Fulfillment Lifecycle (Orders Module)
Handles the B2B transactional workflow:
1. **Request**: Client adds items to the cart and submits a "Purchase Request".
2. **Confirmation**: Admin reviews and confirms the order, locking the pricing.
3. **Processing**: Warehouse prepares the stock (Inventory Module interaction).
4. **Logistics**: Shipping details and tracking numbers are assigned.
5. **Delivery**: Final status update and invoice generation.

### 3.4. User & Client Management (Users Module)
B2B clients are treated as company entities rather than individual users.
- **Tiering Logic**: Clients are automatically categorized into Bronze, Silver, or Gold based on their purchase volume and order frequency.
- **Profile Management**: Stores company data, tax IDs, and delivery preferences.

## 4. Resilience Strategy: Database Fallback
A unique feature of FishiFishi B2B is its **Zero-Downtime Mock Fallback**.
- **The "Try-Catch-Mock" Pattern**: Every Service (`ProductService`, `OrderService`) is wrapped in a resilience layer. 
- **Logic**: If the PostgreSQL database (Prisma) becomes unreachable, the system automatically catches the error and serves a pre-configured set of **Mock Objects**.
- **Result**: The UI remains fully functional and navigable, allowing for demos and uninterrupted browsing even during maintenance.

## 5. Multilingual & Geo-IP Engine
The platform is designed for a global market.
- **Detection**: The middleware analyzes the `x-nf-geo-country` (Netlify) or `x-vercel-ip-country` headers.
- **Mapping**: Countries identified as Spanish-speaking (MX, ES, AR, etc.) trigger the `es` locale; all others default to `en`.
- **Dictionary System**: Centralized JSON dictionaries ensure that 100% of the UI (from button labels to error messages) is translated without hardcoding strings.

## 6. Technology Stack
| Component | Technology |
| :--- | :--- |
| **Framework** | Next.js 15.1 (App Router) |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | NextAuth.js (v4) |
| **State** | Zustand (v5) |
| **Styling** | Vanilla CSS Modules |
| **Deployment** | Netlify + Edge Functions |

---
*End of Documentation*
