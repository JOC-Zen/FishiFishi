import { OrderService } from "@/features/orders/services/OrderService";
import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Order Detail Page - Dashboard
 */
export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const order = await OrderService.getOrderById(id);

  if (!order) {
    notFound();
  }

  const statusLabels: Record<string, string> = {
    PENDING: "Pending Approval",
    CONFIRMED: "Confirmed",
    PROCESSING: "Processing",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
  };

  const statusBadgeMap: Record<string, string> = {
    PENDING: "badge-warning",
    CONFIRMED: "badge-info",
    PROCESSING: "badge-info",
    SHIPPED: "badge-success",
    DELIVERED: "badge-success",
    CANCELLED: "badge-error",
  };

  return (
    <>
      <TopBar title={`Order ORD-${order.orderNumber}`} breadcrumb={["Dashboard", "Orders", `ORD-${order.orderNumber}`]} />

      <div className={styles.container}>
        {/* Header with Actions */}
        <div className={styles.header}>
          <div className={styles.header__left}>
            <Link href="/dashboard/orders" className={styles.subtitle}>
              ← Back to Orders
            </Link>
            <h1 className={styles.title}>Order ORD-{order.orderNumber}</h1>
            <div className={styles.subtitle}>
              Placed on {new Date(order.createdAt).toLocaleDateString("en-US", { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
              })}
            </div>
          </div>
          <div className={styles.actions}>
            <button className="btn btn-secondary">📄 Export PDF</button>
            <button className="btn btn-primary">✏️ Edit Status</button>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Main Column: Items */}
          <div className={styles.main_col}>
            <div className={styles.card}>
              <h2 className={styles.card__title}>📦 Order Items</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th style={{ textAlign: 'right' }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className={styles.product}>
                          <span className={styles.product__name}>{item.productName}</span>
                          <span className={styles.product__id}>SKU-{item.productId.slice(0,8).toUpperCase()}</span>
                        </div>
                      </td>
                      <td>${item.unitPrice.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>
                        ${item.subtotal.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.summary}>
                <div className={styles.summary__row}>
                  <span className={styles.summary__label}>Subtotal</span>
                  <span className={styles.summary__value}>${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className={styles.summary__row}>
                  <span className={styles.summary__label}>Shipping</span>
                  <span className={styles.summary__value}>$0.00</span>
                </div>
                <div className={`${styles.summary__row} ${styles["summary__row--total"]}`}>
                  <span className={styles.summary__label}>Total</span>
                  <span className={styles.summary__value}>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.card__title}>💬 Order Notes</h2>
              <p className={styles.subtitle}>No special instructions provided for this order.</p>
            </div>
          </div>

          {/* Sidebar Column: Status & Client */}
          <div className={styles.side_col}>
            <div className={styles.card}>
              <h2 className={styles.card__title}>⚖️ Order Status</h2>
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <span className={`badge ${statusBadgeMap[order.status]}`}>
                  {statusLabels[order.status]}
                </span>
              </div>
              <div className={styles.info_item}>
                <span className={styles.info_label}>Tracking Number</span>
                <span className={styles.info_value}>{order.trackingNumber || "Not assigned yet"}</span>
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.card__title}>👤 Client Information</h2>
              <div className={styles.info_group}>
                <div className={styles.info_item}>
                  <span className={styles.info_label}>Contact Name</span>
                  <span className={styles.info_value}>{order.clientName}</span>
                </div>
                <div className={styles.info_item}>
                  <span className={styles.info_label}>Company</span>
                  <span className={styles.info_value}>{order.companyName}</span>
                </div>
                <div className={styles.info_item}>
                  <span className={styles.info_label}>Shipping Address</span>
                  <span className={styles.info_value}>
                    123 Business Way, Industrial Park<br/>
                    Suite 400, Monterrey, NL
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.card__title}>🕒 History</h2>
              <div className={styles.timeline}>
                <div className={`${styles.timeline_item} ${styles["timeline_item--done"]}`}>
                  <div className={styles.timeline_dot}></div>
                  <div className={styles.timeline_content}>
                    <span className={styles.timeline_title}>Order Placed</span>
                    <span className={styles.timeline_date}>{new Date(order.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <div className={`${styles.timeline_item} ${order.status !== 'PENDING' ? styles["timeline_item--done"] : styles["timeline_item--active"]}`}>
                  <div className={styles.timeline_dot}></div>
                  <div className={styles.timeline_content}>
                    <span className={styles.timeline_title}>Confirmed</span>
                    <span className={styles.timeline_date}>
                      {order.status !== 'PENDING' ? "Updated by Admin" : "Awaiting approval"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
