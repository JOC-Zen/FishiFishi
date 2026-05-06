/**
 * Entidad de dominio: Pedido B2B.
 * Representa una orden de compra de un cliente mayorista.
 */

export type OrderStatus =
  | "pending"     // Recibido, esperando confirmación
  | "confirmed"   // Confirmado por el vendedor
  | "processing"  // En preparación / empaque
  | "shipped"     // Enviado
  | "delivered"   // Entregado
  | "cancelled";  // Cancelado

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  /** Precio unitario aplicado (ya con descuento por volumen) */
  unitPrice: number;
  /** quantity * unitPrice */
  subtotal: number;
}

export interface Order {
  id: string;
  /** ID del cliente que hizo el pedido */
  clientId: string;
  clientName: string;
  items: OrderItem[];
  /** Suma de todos los subtotales */
  totalAmount: number;
  status: OrderStatus;
  /** Notas del cliente (instrucciones especiales, etc.) */
  notes?: string;
  /** Dirección de entrega */
  shippingAddress: string;
  /** Fecha estimada de entrega */
  estimatedDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Datos para crear un nuevo pedido.
 */
export type CreateOrderInput = Pick<Order, "clientId" | "items" | "notes" | "shippingAddress">;
