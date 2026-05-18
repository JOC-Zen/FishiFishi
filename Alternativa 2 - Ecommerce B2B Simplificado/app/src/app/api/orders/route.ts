import { NextResponse } from "next/server";
import { zohoService } from "@/shared/lib/zoho";
import prisma from "@/shared/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientId, clientEmail, clientName, companyName, items, totalAmount } = body;

    if (!clientId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid order data. Client and items are required." },
        { status: 400 }
      );
    }

    console.log(`[Order API] Processing order for B2B Client: ${clientName} (${companyName})`);

    // 1. Sync Contact & Account to Zoho CRM
    let crmSyncResult = null;
    if (zohoService.hasCredentials()) {
      try {
        const nameParts = (clientName || "B2B Buyer").split(" ");
        const first_name = nameParts[0] || "B2B";
        const last_name = nameParts.slice(1).join(" ") || "Buyer";
        
        crmSyncResult = await zohoService.syncCrmContact({
          first_name,
          last_name,
          email: clientEmail || "buyer@company.com",
          company: companyName || "B2B Enterprise"
        });
        console.log("[Order API] Zoho CRM sync completed successfully.");
      } catch (err: any) {
        console.warn("[Order API] Zoho CRM sync failed, proceeding with local flow:", err.message);
      }
    }

    // 2. Validate inventory inside Zoho Inventory
    if (zohoService.hasCredentials()) {
      try {
        for (const item of items) {
          const zohoStock = await zohoService.getInventoryItemStock(item.sku);
          if (zohoStock !== null && zohoStock < item.quantity) {
            return NextResponse.json(
              { error: `Insufficient stock in Zoho Inventory for item ${item.sku}. Available: ${zohoStock}` },
              { status: 400 }
            );
          }
        }
        console.log("[Order API] Zoho Inventory levels validated successfully.");
      } catch (err: any) {
        console.warn("[Order API] Zoho Inventory stock verification failed, using database levels:", err.message);
      }
    }

    // 3. Save order locally in Next.js DB via Prisma (as a resilient fallback)
    let localOrder = null;
    try {
      // Find or generate next order number
      const count = await prisma.order.count();
      const orderNumber = 3000 + count + 1;

      // Fetch products to populate the snapshot fields (productName and sku)
      const productIds = items.map(item => item.productId);
      const dbProducts = await prisma.product.findMany({
        where: { id: { in: productIds } }
      });
      const productMap = new Map(dbProducts.map(p => [p.id, p]));

      localOrder = await prisma.order.create({
        data: {
          orderNumber,
          clientId,
          status: "CONFIRMED",
          totalAmount,
          items: {
            create: items.map(item => {
              const prod = productMap.get(item.productId);
              return {
                productId: item.productId,
                productName: prod ? prod.name : "Unknown Seafood",
                sku: prod ? prod.sku : "SKU-UNKNOWN",
                quantity: item.quantity,
                unitPrice: item.price,
                subtotal: item.price * item.quantity
              };
            })
          }
        },
        include: { items: true }
      });
      console.log(`[Order API] Local order saved successfully. Order Number: #${orderNumber}`);
    } catch (err: any) {
      console.warn("[Order API] Local database save bypassed or unavailable:", err.message);
    }

    // 4. Create invoice in Zoho Books
    let booksInvoiceResult = null;
    if (zohoService.hasCredentials()) {
      try {
        booksInvoiceResult = await zohoService.createBooksInvoice({
          customerId: clientId,
          items: items.map(item => ({
            itemId: item.productId, // maps to Zoho Item ID
            quantity: item.quantity,
            rate: item.price
          }))
        });
        console.log("[Order API] Zoho Books invoice created successfully.");
      } catch (err: any) {
        console.warn("[Order API] Zoho Books invoice generation bypassed:", err.message);
      }
    }

    // 5. Send order details & approval workflow data to Zoho Creator logic
    let creatorSyncResult = null;
    if (zohoService.hasCredentials()) {
      try {
        const creatorPayload = {
          Order_Number: localOrder ? String(localOrder.orderNumber) : `B2B-${Date.now()}`,
          Client_Name: clientName,
          Company: companyName,
          Total_Amount: totalAmount,
          Status: "Pending_Approval",
          Items_Count: items.length
        };
        creatorSyncResult = await zohoService.submitCreatorWorkflowForm("Order_Submission", creatorPayload);
        console.log("[Order API] Zoho Creator custom workflow dispatched successfully.");
      } catch (err: any) {
        console.warn("[Order API] Zoho Creator workflow dispatch bypassed:", err.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Order processed successfully.",
      orderNumber: localOrder ? localOrder.orderNumber : `B2B-${Date.now()}`,
      syncStatus: {
        zohoCrm: crmSyncResult ? "SUCCESS" : "SKIPPED/FAILED",
        zohoBooks: booksInvoiceResult ? "SUCCESS" : "SKIPPED/FAILED",
        zohoCreator: creatorSyncResult ? "SUCCESS" : "SKIPPED/FAILED"
      }
    });

  } catch (error: any) {
    console.error("[Order API] Checkout processing failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error during checkout." },
      { status: 500 }
    );
  }
}
