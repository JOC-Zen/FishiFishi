import { AuthService } from "@/features/auth/services/AuthService";
import { OrderService } from "@/features/orders/services/OrderService";
import styles from "./page.module.css";

const progressSteps = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered"];

/**
 * Client Portal My Orders Page.
 */
export default async function ClientOrdersPage() {
  const session = await AuthService.requireRole("CLIENT");
  const orders = await OrderService.getClientOrders(session.user.id);

  const totalOrders = orders.length;
  const activeOrders = orders.filter(o => o.status !== "DELIVERED").length;
  const deliveredOrders = orders.filter(o => o.status === "DELIVERED").length;
  const totalSpent = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const progressMap: Record<string, number> = {
    PENDING: 0,
    CONFIRMED: 1,
    PROCESSING: 2,
    SHIPPED: 3,
    DELIVERED: 4,
  };

  return (
    <>
      {/* Header */}
      <div className={styles["orders-header"]}>
        <div>
          <h1 className={styles["orders-title"]}>📋 My Orders</h1>
          <p className={styles["orders-subtitle"]}>
            History and tracking for all your B2B orders
          </p>
        </div>
        <button className={styles["reorder-btn"]} id="quick-reorder-btn">
          🔄 Repeat Last Order
        </button>
      </div>

      {/* Stats */}
      <div className={styles["orders-stats"]}>
        <div className={styles["stat-card"]}>
          <div className={`${styles["stat-card__value"]} ${styles["stat-card__value--accent"]}`}>{totalOrders}</div>
          <div className={styles["stat-card__label"]}>Total Orders</div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={`${styles["stat-card__value"]} ${styles["stat-card__value--aqua"]}`}>{activeOrders}</div>
          <div className={styles["stat-card__label"]}>In Progress</div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={`${styles["stat-card__value"]} ${styles["stat-card__value--success"]}`}>{deliveredOrders}</div>
          <div className={styles["stat-card__label"]}>Delivered</div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={`${styles["stat-card__value"]} ${styles["stat-card__value--warning"]}`}>
            ${(totalSpent / 1000).toFixed(1)}k
          </div>
          <div className={styles["stat-card__label"]}>Total Purchased</div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles["tab--active"]}`}>
          All <span className={styles.tab__count}>{totalOrders}</span>
        </button>
        <button className={styles.tab}>
          Active <span className={styles.tab__count}>{activeOrders}</span>
        </button>
        <button className={styles.tab}>
          Delivered <span className={styles.tab__count}>{deliveredOrders}</span>
        </button>
      </div>

      {/* Order List */}
      <div className={styles["order-list"]}>
        {orders.map((order) => {
          const progress = progressMap[order.status] ?? 0;
          return (
            <div key={order.id} className={styles["order-card"]}>
              {/* Header */}
              <div className={styles["order-card__header"]}>
                <div>
                  <div className={styles["order-card__id"]}>ORD-{order.orderNumber}</div>
                  <div className={styles["order-card__date"]}>
                    {new Date(order.createdAt).toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
                <span className={`${styles["order-card__status"]} ${styles[`order-card__status--${order.status.toLowerCase()}`]}`}>
                  {order.status}
                </span>
              </div>

              {/* Progress Bar */}
              {order.status !== "DELIVERED" && (
                <>
                  <div className={styles.progress}>
                    {progressSteps.map((_, i) => (
                      <div
                        key={i}
                        className={`${styles.progress__step} ${
                          i < progress ? styles["progress__step--done"] : 
                          i === progress ? styles["progress__step--active"] : ""
                        }`}
                      />
                    ))}
                  </div>
                  <div className={styles.progress__labels}>
                    {progressSteps.map((step, i) => (
                      <span
                        key={step}
                        className={`${styles.progress__label} ${
                          i < progress ? styles["progress__label--done"] :
                          i === progress ? styles["progress__label--active"] : ""
                        }`}
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* Items Preview Placeholder */}
              <div className={styles["order-card__items"]}>
                <div className={styles["order-card__item"]}>
                   <span className={styles["order-card__item-qty"]}>{order.itemsCount} products in this order</span>
                </div>
              </div>

              {/* Footer */}
              <div className={styles["order-card__footer"]}>
                <div>
                  <span className={styles["order-card__total-label"]}>Total: </span>
                  <span className={styles["order-card__total"]}>
                    ${order.totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className={styles["order-card__actions"]}>
                  {order.trackingNumber && (
                    <button className={styles["order-card__action"]}>
                      🚚 Track ({order.trackingNumber})
                    </button>
                  )}
                  <button className={`${styles["order-card__action"]} ${styles["order-card__action--primary"]}`}>
                    🔄 Repeat Order
                  </button>
                  <button className={styles["order-card__action"]}>
                    📄 Invoice
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {orders.length === 0 && (
          <div style={{ textAlign: "center", padding: "var(--space-12)" }}>
            <p>You haven&apos;t placed any orders yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
