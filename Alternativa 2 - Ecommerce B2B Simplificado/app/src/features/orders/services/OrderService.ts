import prisma from "@/shared/lib/prisma";

export type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: number;
  clientId: string;
  clientName: string;
  companyName: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: Date;
  itemsCount: number;
  trackingNumber: string | null;
  items?: OrderItem[];
}

/**
 * OrderService
 * Manages B2B orders with DB fallback.
 */
export class OrderService {
  static async getAllOrders(): Promise<Order[]> {
    try {
      const dbOrders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          client: true,
          _count: { select: { items: true } },
        },
      });
      return dbOrders.map((o: any) => ({
        id: o.id,
        orderNumber: o.orderNumber,
        clientId: o.clientId,
        clientName: o.client.name,
        companyName: o.client.companyName || "N/A",
        status: o.status as OrderStatus,
        totalAmount: o.totalAmount.toNumber(),
        createdAt: o.createdAt,
        itemsCount: o._count.items,
        trackingNumber: o.trackingNumber,
      }));
    } catch (error) {
      console.warn("[OrderService] DB error. Returning mock orders.");
      return [
        { id: "1", orderNumber: 2847, clientId: "c1", clientName: "Juan Gutierrez", companyName: "Northern Fishery", status: "CONFIRMED", totalAmount: 12450, createdAt: new Date(), itemsCount: 5, trackingNumber: null },
        { id: "2", orderNumber: 2846, clientId: "c2", clientName: "Ana Lopez", companyName: "Marea Restaurant", status: "PROCESSING", totalAmount: 8230, createdAt: new Date(), itemsCount: 3, trackingNumber: "SHP-1024" },
      ];
    }
  }

  static async getClientOrders(clientId: string): Promise<Order[]> {
    try {
      const dbOrders = await prisma.order.findMany({
        where: { clientId },
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { items: true } } },
      });
      return dbOrders.map((o: any) => ({
        id: o.id,
        orderNumber: o.orderNumber,
        clientId: o.clientId,
        clientName: "", // Not needed for self-view
        companyName: "",
        status: o.status as OrderStatus,
        totalAmount: o.totalAmount.toNumber(),
        createdAt: o.createdAt,
        itemsCount: o._count.items,
        trackingNumber: o.trackingNumber,
      }));
    } catch (error) {
      return (await this.getAllOrders()).filter(o => o.clientId === clientId);
    }
  }
}
