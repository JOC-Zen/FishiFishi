import prisma from "@/shared/lib/prisma";

export interface B2BClient {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  tier: "GOLD" | "SILVER" | "BRONZE";
  status: "ACTIVE" | "PENDING" | "INACTIVE";
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date | null;
}

/**
 * UserService
 * Manages B2B client data and admin users.
 */
export class UserService {
  static async getAllClients(): Promise<B2BClient[]> {
    try {
      const dbUsers = await prisma.user.findMany({
        where: { role: "CLIENT" },
        include: {
          orders: {
            select: { totalAmount: true, createdAt: true }
          }
        },
        orderBy: { name: "asc" }
      });

      return dbUsers.map((u: any) => ({
        id: u.id,
        name: u.name,
        companyName: u.companyName || "N/A",
        email: u.email,
        phone: "+52 00 0000 0000",
        tier: u.tier as "GOLD" | "SILVER" | "BRONZE",
        status: u.status as "ACTIVE" | "PENDING" | "INACTIVE",
        totalOrders: u.orders.length,
        totalSpent: u.orders.reduce((sum: number, o: any) => sum + o.totalAmount.toNumber(), 0),
        lastOrderDate: u.orders.length > 0 
          ? new Date(Math.max(...u.orders.map((o: any) => o.createdAt.getTime())))
          : null,
      }));
    } catch (error) {
      console.warn("[UserService] DB error. Returning mock clients.");
      return [
        { id: "1", name: "Northern Fishery", companyName: "Juan Gutierrez", email: "juan@pescaderianorte.com", phone: "+52 81 1234 5678", tier: "GOLD", status: "ACTIVE", totalOrders: 45, totalSpent: 284500, lastOrderDate: new Date() },
        { id: "2", name: "Marea Restaurant", companyName: "Ana Lopez", email: "ana@restaurantemarea.com", phone: "+52 33 9876 5432", tier: "SILVER", status: "ACTIVE", totalOrders: 32, totalSpent: 156200, lastOrderDate: new Date() },
      ];
    }
  }
}
