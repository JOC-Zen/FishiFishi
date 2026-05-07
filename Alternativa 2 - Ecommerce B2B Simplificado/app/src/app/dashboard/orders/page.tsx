import { AuthService } from "@/features/auth/services/AuthService";
import { OrderService } from "@/features/orders/services/OrderService";
import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";

const statusClassMap: Record<string, string> = {
  PENDING: "badge badge-warning",
  CONFIRMED: "badge badge-info",
  PROCESSING: "badge badge-info",
  SHIPPED: "badge badge-success",
  DELIVERED: "badge badge-success",
  CANCELLED: "badge badge-error",
};

const progressMap: Record<string, number> = {
  PENDING: 1,
  CONFIRMED: 2,
  PROCESSING: 3,
  SHIPPED: 4,
  DELIVERED: 5,
  CANCELLED: 0,
};

/**
 * Orders Management Page.
 */
export default async function OrdersPage() {
  await AuthService.requireRole("ADMIN");
  const orders = await OrderService.getAllOrders();

  const statusCounts = orders.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalCount = orders.length;

  const tabs = [
    { label: "All", count: totalCount, status: "ALL" },
    { label: "Pending", count: statusCounts["PENDING"] || 0, status: "PENDING" },
    { label: "Confirmed", count: statusCounts["CONFIRMED"] || 0, status: "CONFIRMED" },
    { label: "Processing", count: statusCounts["PROCESSING"] || 0, status: "PROCESSING" },
    { label: "Shipped", count: statusCounts["SHIPPED"] || 0, status: "SHIPPED" },
    { label: "Delivered", count: statusCounts["DELIVERED"] || 0, status: "DELIVERED" },
  ];

  return (
    <>
      <TopBar title="Orders" breadcrumb={["Dashboard", "Orders"]} />

      <div style={{ padding: "var(--space-8)" }}>
        {/* Header */}
        <div className={styles["page-header"]}>
          <div className={styles["page-header__left"]}>
            <h1 className={styles["page-title"]}>Order Management</h1>
            <p className={styles["page-subtitle"]}>
              {totalCount} total orders · {statusCounts["PENDING"] || 0} pending confirmation
            </p>
          </div>
          <button className="btn btn-primary" id="new-order-btn">
            + New Order
          </button>
        </div>

        {/* Status Tabs */}
        <div className={styles.tabs}>
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              className={`${styles.tab} ${i === 0 ? styles["tab--active"] : ""}`}
            >
              {tab.label}
              <span className={styles.tab__count}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className={styles["table-wrapper"]}>
          <table className={styles["orders-table"]}>
            <thead>
              <tr>
                <th>Order</th>
                <th>Client</th>
                <th>Total</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const initials = order.clientName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
                return (
                  <tr key={order.id}>
                    <td>
                      <span className={styles["order-id"]}>ORD-{order.orderNumber}</span>
                    </td>
                    <td>
                      <div className={styles["order-client"]}>
                        <div className={styles["order-client__avatar"]}>
                          {initials}
                        </div>
                        <div className={styles["order-client__details"]}>
                          <span className={styles["order-client__name"]}>
                            {order.clientName}
                          </span>
                          <span className={styles["order-client__company"]}>
                            {order.companyName}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span className={styles["order-total"]}>
                          ${order.totalAmount.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                        <br />
                        <span className={styles["order-items-count"]}>
                          {order.itemsCount} products
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={statusClassMap[order.status] || "badge"}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles["status-progress"]}>
                        {[1, 2, 3, 4, 5].map((step) => {
                          const currentProgress = progressMap[order.status] || 0;
                          return (
                            <div
                              key={step}
                              className={`${styles["status-progress__step"]} ${
                                step < currentProgress
                                  ? styles["status-progress__step--done"]
                                  : step === currentProgress
                                  ? styles["status-progress__step--current"]
                                  : ""
                              }`}
                            />
                          );
                        })}
                      </div>
                    </td>
                    <td>
                      <span className={styles["order-date"]}>
                        {new Date(order.createdAt).toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <br />
                      <span className={styles["order-delivery"]}>
                        Tracking: {order.trackingNumber || "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "var(--space-8)" }}>
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span className={styles.pagination__info}>
              Showing {orders.length} of {totalCount} orders
            </span>
            <div className={styles.pagination__buttons}>
              <button className={styles.pagination__btn}>← Previous</button>
              <button className={`${styles.pagination__btn} ${styles["pagination__btn--active"]}`}>1</button>
              <button className={styles.pagination__btn}>Next →</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
