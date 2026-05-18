import prisma from "@/shared/lib/prisma";
import { zohoService } from "@/shared/lib/zoho";

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
    // 1. Intercept with Zoho Creator / CRM orders if credentials exist
    if (zohoService.hasCredentials()) {
      try {
        console.log("[OrderService] Fetching orders from Zoho Creator backend logic...");
        const creatorOrders = await zohoService.getCreatorRecords("Order_Submission_Report");
        if (creatorOrders && creatorOrders.length > 0) {
          return creatorOrders.map((co: any) => ({
            id: co.ID || co.id || String(co.Order_Number),
            orderNumber: Number(co.Order_Number) || 3001,
            clientId: co.Client_ID || "c1",
            clientName: co.Client_Name || "B2B Buyer",
            companyName: co.Company || "B2B Enterprise",
            status: (co.Status?.toUpperCase() || "CONFIRMED") as OrderStatus,
            totalAmount: Number(co.Total_Amount) || 0,
            createdAt: co.Added_Time ? new Date(co.Added_Time) : new Date(),
            itemsCount: Number(co.Items_Count) || 1,
            trackingNumber: co.Tracking_Number || null,
          }));
        }
      } catch (err) {
        console.warn("[OrderService] Zoho Creator fetch failed, falling back to database/mock orders:", err);
      }
    }

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

  static async getOrderById(id: string): Promise<Order | null> {
    try {
      const o = await prisma.order.findUnique({
        where: { id },
        include: {
          client: true,
          items: { include: { product: true } },
        },
      });
      if (!o) return null;
      return {
        id: o.id,
        orderNumber: o.orderNumber,
        clientId: o.clientId,
        clientName: o.client.name,
        companyName: o.client.companyName || "N/A",
        status: o.status as OrderStatus,
        totalAmount: o.totalAmount.toNumber(),
        createdAt: o.createdAt,
        itemsCount: o.items.length,
        trackingNumber: o.trackingNumber,
        items: o.items.map((i: any) => ({
          id: i.id,
          productId: i.productId,
          productName: i.product.name,
          quantity: i.quantity,
          unitPrice: i.unitPrice.toNumber(),
          subtotal: i.subtotal.toNumber(),
        })),
      };
    } catch (error) {
      const orders = await this.getAllOrders();
      const order = orders.find((o) => o.id === id);
      if (!order) return null;
      return {
        ...order,
        items: [
          { id: "i1", productId: "p1", productName: "Salmon Fillet", quantity: 10, unitPrice: 45.0, subtotal: 450.0 },
          { id: "i2", productId: "p2", productName: "Jumbo Shrimp", quantity: 5, unitPrice: 28.5, subtotal: 142.5 },
        ],
      };
    }
  }
}
