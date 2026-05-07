import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import prisma from "@/shared/lib/prisma";
import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";
import { redirect } from "next/navigation";

/**
 * Dashboard Home — Main B2B panel page.
 */
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/");
  }

  // --- Fallback Data ---
  let totalOrders = 47;
  let activeProducts = 156;
  let totalClients = 23;
  let recentOrders: any[] = [];
  let totalRevenue = 248530;

  try {
    const [dbOrdersCount, dbProductsCount, dbClientsCount, dbRecentOrders, dbRevenue] = await Promise.all([
      prisma.order.count(),
      prisma.product.count({ where: { status: "ACTIVE" } }),
      prisma.user.count({ where: { role: "CLIENT" } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { client: true },
      }),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
      }),
    ]);

    totalOrders = dbOrdersCount;
    activeProducts = dbProductsCount;
    totalClients = dbClientsCount;
    recentOrders = dbRecentOrders;
    totalRevenue = dbRevenue._sum.totalAmount?.toNumber() || 0;
  } catch (error) {
    console.warn("Database not connected. Using mock data for demo.");
    recentOrders = [
      { orderNumber: 2847, client: { name: "Northern Fishery", companyName: "Juan Gutierrez" }, totalAmount: 12450, status: "CONFIRMED", createdAt: new Date() },
      { orderNumber: 2846, client: { name: "Marea Restaurant", companyName: "Ana Lopez" }, totalAmount: 8230, status: "PROCESSING", createdAt: new Date() },
    ];
  }

  return (
    <>
      <TopBar title="Dashboard" />

      <div className={styles.header} style={{ padding: "var(--space-8)", paddingBottom: 0 }}>
        <div className={styles.header__greeting}>
          <h1 className={styles.header__title}>Hello, {session?.user?.name || "User"}! 👋</h1>
          <p className={styles.header__subtitle}>
            Here is a summary of your B2B activity
          </p>
        </div>
        <div className={styles.header__date}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <div style={{ padding: "var(--space-8)" }}>
        {/* ---- Metrics ---- */}
        <div className={styles.metrics}>
          <MetricCard
            type="revenue"
            label="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            change="+12.5%"
            direction="up"
            icon="💰"
          />
          <MetricCard
            type="orders"
            label="Total Orders"
            value={totalOrders.toString()}
            change="+8 this week"
            direction="up"
            icon="🛒"
          />
          <MetricCard
            type="products"
            label="Active Products"
            value={activeProducts.toString()}
            change="3 new"
            direction="up"
            icon="📦"
          />
          <MetricCard
            type="clients"
            label="B2B Clients"
            value={totalClients.toString()}
            change="+2 pending"
            direction="up"
            icon="👥"
          />
        </div>

        {/* ---- Content Grid ---- */}
        <div className={styles["content-grid"]}>
          {/* Recent Orders */}
          <section className={styles["orders-section"]}>
            <div className={styles["section-header"]}>
              <h2 className={styles["section-title"]}>Recent Orders</h2>
              <a href="/dashboard/orders" className={styles["section-link"]}>
                View all →
              </a>
            </div>
            <table className={styles["orders-table"]}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <OrderRow
                    key={order.id || idx}
                    id={`ORD-${order.orderNumber}`}
                    client={order.client.name}
                    company={order.client.companyName || "N/A"}
                    total={`$${order.totalAmount.toLocaleString()}`}
                    status={order.status.toLowerCase()}
                    statusLabel={order.status}
                    date={new Date(order.createdAt).toLocaleDateString("en-US")}
                  />
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "var(--space-8)" }}>
                      No recent orders.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

          {/* Right Panel */}
          <div className={styles["right-panel"]}>
            {/* Activity Feed */}
            <section className={styles["activity-section"]}>
              <div className={styles["section-header"]}>
                <h2 className={styles["section-title"]}>Activity</h2>
              </div>
              <div className={styles["activity-list"]}>
                <ActivityItem
                  type="order"
                  text="New order from Marea Restaurant for $8,230"
                  time="45 min ago"
                />
                <ActivityItem
                  type="payment"
                  text="Payment received from Costa Distributors"
                  time="2h ago"
                />
                <ActivityItem
                  type="new"
                  text="New client registered: Super Fresh S.A."
                  time="3h ago"
                />
                <ActivityItem
                  type="alert"
                  text="Low stock: Salmon Fillet (12 units)"
                  time="5h ago"
                />
              </div>
            </section>

            {/* Low Stock */}
            <section className={styles["stock-section"]}>
              <div className={styles["section-header"]}>
                <h2 className={styles["section-title"]}>Low Stock</h2>
                <a href="/dashboard/inventory" className={styles["section-link"]}>
                  Inventory →
                </a>
              </div>
              <StockItem name="Salmon Fillet" sku="SAL-FIL-001" count={12} level="critical" />
              <StockItem name="Jumbo Shrimp" sku="SHR-JUM-002" count={25} level="warning" />
              <StockItem name="Fresh Octopus" sku="OCT-FRE-001" count={18} level="warning" />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   Sub-components (kept here for simplicity; can be
   extracted to shared/components if they grow in complexity)
   ============================================================ */

function MetricCard({
  type,
  label,
  value,
  change,
  direction,
  icon,
}: {
  type: string;
  label: string;
  value: string;
  change: string;
  direction: "up" | "down";
  icon: string;
}) {
  return (
    <div className={`${styles["metric-card"]} ${styles[`metric-card--${type}`]}`}>
      <div className={styles["metric-card__header"]}>
        <span className={styles["metric-card__label"]}>{label}</span>
        <span
          className={`${styles["metric-card__icon"]} ${styles[`metric-card__icon--${type}`]}`}
        >
          {icon}
        </span>
      </div>
      <span className={styles["metric-card__value"]}>{value}</span>
      <span
        className={`${styles["metric-card__change"]} ${
          styles[`metric-card__change--${direction}`]
        }`}
      >
        {direction === "up" ? "↑" : "↓"} {change}
      </span>
    </div>
  );
}

function OrderRow({
  id,
  client,
  company,
  total,
  status,
  statusLabel,
  date,
}: {
  id: string;
  client: string;
  company: string;
  total: string;
  status: string;
  statusLabel: string;
  date: string;
}) {
  const statusClassMap: Record<string, string> = {
    pending: "badge badge-warning",
    confirmed: "badge badge-info",
    processing: "badge badge-info",
    shipped: "badge badge-success",
    delivered: "badge badge-success",
    cancelled: "badge badge-error",
  };

  return (
    <tr>
      <td>
        <span className={styles["order-id"]}>{id}</span>
      </td>
      <td>
        <div className={styles["order-client"]}>
          <span className={styles["order-client__name"]}>{client}</span>
          <span className={styles["order-client__company"]}>{company}</span>
        </div>
      </td>
      <td style={{ fontWeight: 600 }}>{total}</td>
      <td>
        <span className={statusClassMap[status] || "badge"}>{statusLabel}</span>
      </td>
      <td style={{ color: "var(--color-text-secondary)" }}>{date}</td>
    </tr>
  );
}

function ActivityItem({
  type,
  text,
  time,
}: {
  type: string;
  text: string;
  time: string;
}) {
  return (
    <div className={styles["activity-item"]}>
      <div
        className={`${styles["activity-item__dot"]} ${
          styles[`activity-item__dot--${type}`]
        }`}
      />
      <div className={styles["activity-item__content"]}>
        <p className={styles["activity-item__text"]}>{text}</p>
        <span className={styles["activity-item__time"]}>{time}</span>
      </div>
    </div>
  );
}

function StockItem({
  name,
  sku,
  count,
  level,
}: {
  name: string;
  sku: string;
  count: number;
  level: "critical" | "warning";
}) {
  return (
    <div className={styles["stock-item"]}>
      <div className={styles["stock-item__info"]}>
        <span className={styles["stock-item__name"]}>{name}</span>
        <span className={styles["stock-item__sku"]}>{sku}</span>
      </div>
      <span
        className={`${styles["stock-item__count"]} ${
          styles[`stock-item__count--${level}`]
        }`}
      >
        {count} units
      </span>
    </div>
  );
}
