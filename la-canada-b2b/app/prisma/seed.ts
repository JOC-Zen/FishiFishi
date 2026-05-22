import { PrismaClient, UserRole, UserStatus, UserTier, ProductStatus, OrderStatus } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting seed...");

  // ---- Clean up ----
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.priceTier.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // ---- Create Users ----
  const admin = await prisma.user.create({
    data: {
      email: "admin@lacanadaseafood.com",
      password: "admin123", // In production use bcrypt
      name: "Admin Reyes",
      companyName: "Mariscos Reyes",
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      tier: UserTier.GOLD,
      phone: "+52 81 1234 5678",
    },
  });

  const client1 = await prisma.user.create({
    data: {
      email: "cliente@pescaderia.com",
      password: "cliente123",
      name: "Juan Gutiérrez",
      companyName: "Pescadería del Norte",
      role: UserRole.CLIENT,
      status: UserStatus.ACTIVE,
      tier: UserTier.GOLD,
      phone: "+52 81 5555 1234",
    },
  });

  console.log("Users created:", { admin: admin.email, client: client1.email });

  // ---- Create Products ----
  const products = [
    { sku: "SAL-FIL-001", name: "Filete de Salmón Premium", category: "Salmón", basePrice: 285.0, unit: "kg", stock: 120, minOrder: 5 },
    { sku: "CAM-JUM-002", name: "Camarón Jumbo (16/20)", category: "Camarón", basePrice: 420.0, unit: "kg", stock: 85, minOrder: 10 },
    { sku: "PUL-FRE-001", name: "Pulpo Fresco Entero", category: "Pulpo", basePrice: 350.0, unit: "kg", stock: 50, minOrder: 3 },
    { sku: "ATU-ALE-001", name: "Atún Aleta Amarilla", category: "Atún", basePrice: 520.0, unit: "kg", stock: 45, minOrder: 5 },
  ];

  for (const p of products) {
    const product = await prisma.product.create({
      data: {
        sku: p.sku,
        name: p.name,
        category: p.category,
        basePrice: p.basePrice,
        unit: p.unit,
        stock: p.stock,
        minOrderQuantity: p.minOrder,
        status: ProductStatus.ACTIVE,
        // Add default tiers
        priceTiers: {
          create: [
            { minQuantity: 10, unitPrice: p.basePrice * 0.95 }, // 5% off
            { minQuantity: 50, unitPrice: p.basePrice * 0.90 }, // 10% off
          ],
        },
      },
    });
    console.log(`Product created: ${product.name}`);
  }

  // ---- Create a sample Order ----
  const salmon = await prisma.product.findUnique({ where: { sku: "SAL-FIL-001" } });
  
  if (salmon) {
    await prisma.order.create({
      data: {
        clientId: client1.id,
        totalAmount: 2850.00, // Manual for now to avoid Decimal conversion issues in seed
        status: OrderStatus.CONFIRMED,
        notes: "Urgente para el fin de semana",
        items: {
          create: {
            productId: salmon.id,
            productName: salmon.name,
            sku: salmon.sku,
            quantity: 10,
            unitPrice: 285.00,
            subtotal: 2850.00,
          },
        },
      },
    });
    console.log("Sample order created.");
  }

  console.log("Seed finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
