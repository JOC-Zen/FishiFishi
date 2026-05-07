/**
 * Domain Entity: B2B Order.
 * Represents a purchase order from a wholesale client.
 */

export type OrderStatus =
  | "pending"     // Received, awaiting confirmation
  | "confirmed"   // Confirmed by the seller
  | "processing"  // Being prepared / packed
  | "shipped"     // Shipped
  | "delivered"   // Delivered
  | "cancelled";  // Cancelled

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  /** Applied unit price (with volume discount already applied) */
  unitPrice: number;
  /** quantity * unitPrice */
  subtotal: number;
}

export interface Order {
  id: string;
  /** ID of the client who placed the order */
  clientId: string;
  clientName: string;
  items: OrderItem[];
  /** Sum of all item subtotals */
  totalAmount: number;
  status: OrderStatus;
  /** Client notes (special instructions, etc.) */
  notes?: string;
  /** Delivery address */
  shippingAddress: string;
  /** Estimated delivery date */
  estimatedDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Data required to create a new order.
 */
export type CreateOrderInput = Pick<Order, "clientId" | "items" | "notes" | "shippingAddress">;
