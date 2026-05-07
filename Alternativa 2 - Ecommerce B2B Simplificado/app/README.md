# 🐟 FishiFishi B2B — Premium Seafood Ecommerce

FishiFishi B2B is a state-of-the-art ecommerce platform designed specifically for the seafood wholesale industry. Built with a focus on high-performance, resilience, and a premium "Deep Ocean" aesthetic.

## 🚀 Key Features

- **Dynamic Dashboard**: Real-time insights into orders, inventory, and client activity.
- **Smart Catalog**: B2B product management with category-specific mapping and tiered pricing.
- **Resilient Architecture**: Automatic fallback to local mock data if the database connection is interrupted.
- **Secure Authentication**: NextAuth.js integration with JWT-based sessions and role-based access control.
- **Professional Logistics**: Real-time shipment tracking and inventory level alerts.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma v7](https://www.prisma.io/) with PostgreSQL Driver Adapter
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling**: Vanilla CSS Modules (Zero-dependency, high performance)

## 📁 Project Structure

```text
src/
├── app/              # Routes, Layouts and Server Components
├── core/             # Core business logic and providers
├── features/         # Module-specific logic (Orders, Products, etc.)
├── shared/           # Reusable components, hooks, and libraries
│   ├── components/   # UI System components
│   └── lib/          # Utilities (Prisma client, Auth options)
└── types/            # Global TypeScript definitions
```

## ⚙️ Deployment & Configuration

### Prerequisites
- Node.js 20+
- PostgreSQL (Optional, fallback data included)

### Environment Variables
Create a `.env` file in the root:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/fishifishi"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Installation
```bash
npm install
npx prisma generate
npm run dev
```

## 🛡️ Resilience & Demo Mode
The application includes a **Database Fallback Mechanism**. If `DATABASE_URL` is not provided or unreachable, the system will automatically serve pre-configured mock data for:
- Product Catalog
- Order History
- Client Database
- Inventory Levels

This ensures the UI can be showcased and explored even without a live backend environment.

---
*Built with ❤️ for FishiFishi by Antigravity.*
