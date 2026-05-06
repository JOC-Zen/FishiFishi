/**
 * Entidad de dominio: Producto del catálogo B2B.
 * Incluye soporte para precios escalonados por volumen,
 * algo fundamental en el modelo mayorista.
 */

export type ProductStatus = "active" | "draft" | "discontinued";

/**
 * Precio escalonado por volumen.
 * Ejemplo: a partir de 100 unidades, el precio unitario baja a $8.50
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
  /** Precio base unitario (sin descuento por volumen) */
  basePrice: number;
  /** Precios escalonados ordenados de menor a mayor cantidad mínima */
  priceTiers: PriceTier[];
  /** Unidad de medida (kg, unidad, caja, etc.) */
  unit: string;
  /** Stock disponible actual */
  stock: number;
  /** Cantidad mínima de pedido */
  minOrderQuantity: number;
  imageUrl?: string;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Datos para crear un producto nuevo.
 */
export type CreateProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;

/**
 * Datos editables de un producto existente.
 */
export type UpdateProductInput = Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>;
