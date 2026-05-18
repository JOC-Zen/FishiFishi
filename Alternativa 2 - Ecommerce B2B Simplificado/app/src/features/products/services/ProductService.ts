import prisma from "@/shared/lib/prisma";
import { zohoService } from "@/shared/lib/zoho";

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  basePrice: number;
  unit: string;
  stock: number;
  minOrderQuantity: number;
  status: "ACTIVE" | "INACTIVE";
}

/**
 * ProductService
 * Handles all product-related data operations with built-in database fallback.
 */
export class ProductService {
  /**
   * Fetches all products from the database or returns mock data if the DB is unavailable.
   */
  static async getAllProducts(): Promise<Product[]> {
    let products: Product[] = [];
    try {
      const dbProducts = await prisma.product.findMany({
        orderBy: { name: "asc" },
      });
      products = dbProducts.map((p: any) => ({
        id: p.id,
        sku: p.sku,
        name: p.name,
        category: p.category,
        basePrice: p.basePrice.toNumber(),
        unit: p.unit,
        stock: p.stock.toNumber(),
        minOrderQuantity: p.minOrderQuantity.toNumber(),
        status: p.status as "ACTIVE" | "INACTIVE",
      }));
    } catch (error) {
      console.warn("[ProductService] Database unreachable. Using fallback data.");
      products = [
        { id: "1", sku: "SAL-FIL-001", name: "Premium Salmon Fillet", category: "Salmon", basePrice: 285, unit: "kg", stock: 12, minOrderQuantity: 5, status: "ACTIVE" },
        { id: "2", sku: "SHR-JUM-002", name: "Jumbo Shrimp (16/20)", category: "Shrimp", basePrice: 420, unit: "kg", stock: 25, minOrderQuantity: 10, status: "ACTIVE" },
        { id: "3", sku: "OCT-FRE-001", name: "Fresh Whole Octopus", category: "Octopus", basePrice: 350, unit: "kg", stock: 18, minOrderQuantity: 3, status: "ACTIVE" },
        { id: "4", sku: "TUN-YEL-001", name: "Yellowfin Tuna", category: "Tuna", basePrice: 520, unit: "kg", stock: 45, minOrderQuantity: 5, status: "ACTIVE" },
        { id: "5", sku: "SHR-PAC-003", name: "Pacific Shrimp", category: "Shrimp", basePrice: 180, unit: "kg", stock: 60, minOrderQuantity: 20, status: "ACTIVE" },
        { id: "6", sku: "SAL-SMO-002", name: "Premium Smoked Salmon", category: "Salmon", basePrice: 450, unit: "kg", stock: 8, minOrderQuantity: 2, status: "ACTIVE" },
        { id: "7", sku: "BAS-FIL-001", name: "Fresh Sea Bass Fillet", category: "Sea Bass", basePrice: 310, unit: "kg", stock: 15, minOrderQuantity: 5, status: "ACTIVE" },
        { id: "8", sku: "LOB-TAL-001", name: "Lobster Tail", category: "Lobster", basePrice: 890, unit: "kg", stock: 3, minOrderQuantity: 2, status: "ACTIVE" },
      ];
    }

    // Intercept with Real-Time Zoho Inventory stock levels if credentials exist
    if (zohoService.hasCredentials()) {
      try {
        await Promise.all(
          products.map(async (p) => {
            const zohoStock = await zohoService.getInventoryItemStock(p.sku);
            if (zohoStock !== null) {
              p.stock = zohoStock;
            }
          })
        );
      } catch (err) {
        console.warn("[ProductService] Zoho Inventory stock sync failed, using database/mock fallback stock levels.");
      }
    }

    return products;
  }

  /**
   * Fetches a single product by SKU.
   */
  static async getProductBySku(sku: string): Promise<Product | null> {
    try {
      const p = await prisma.product.findUnique({ where: { sku } });
      if (!p) return null;
      return {
        id: p.id,
        sku: p.sku,
        name: p.name,
        category: p.category,
        basePrice: p.basePrice.toNumber(),
        unit: p.unit,
        stock: p.stock.toNumber(),
        minOrderQuantity: p.minOrderQuantity.toNumber(),
        status: p.status as "ACTIVE" | "INACTIVE",
      };
    } catch (error) {
      const all = await this.getAllProducts();
      return all.find((p) => p.sku === sku) || null;
    }
  }

  static async getProductById(id: string): Promise<Product | null> {
    try {
      const p = await prisma.product.findUnique({ where: { id } });
      if (!p) return null;
      return {
        id: p.id,
        sku: p.sku,
        name: p.name,
        category: p.category,
        basePrice: p.basePrice.toNumber(),
        unit: p.unit,
        stock: p.stock.toNumber(),
        minOrderQuantity: p.minOrderQuantity.toNumber(),
        status: p.status as "ACTIVE" | "INACTIVE",
      };
    } catch (error) {
      const all = await this.getAllProducts();
      return all.find((p) => p.id === id) || null;
    }
  }
}
