/**
 * Domain Entity: B2B Product Catalog Item.
 * Includes support for volume-based tiered pricing,
 * a fundamental feature of the wholesale model.
 */

export type ProductStatus = "active" | "draft" | "discontinued";

/**
 * Volume-based price tier.
 * Example: starting at 100 units, the unit price drops to $8.50
 */
export interface PriceTier {
  minQuantity: number;
  unitPrice: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  /** Base unit price (before volume discounts) */
  basePrice: number;
  /** Tiered prices sorted by ascending minimum quantity */
  priceTiers: PriceTier[];
  /** Unit of measure (kg, unit, box, etc.) */
  unit: string;
  /** Current available stock */
  stock: number;
  /** Minimum order quantity */
  minOrderQuantity: number;
  imageUrl?: string;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Data required to create a new product.
 */
export type CreateProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;

/**
 * Editable product fields.
 */
export type UpdateProductInput = Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>;
