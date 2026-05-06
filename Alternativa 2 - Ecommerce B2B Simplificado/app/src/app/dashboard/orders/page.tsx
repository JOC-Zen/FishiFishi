import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import prisma from "@/shared/lib/prisma";
import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";
import { redirect } from "next/navigation";

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
 * Página de gestión de Pedidos B2B.
 */
export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  const [orders, counts] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        client: true,
        _count: { select: { items: true } },
      },
    }),
    prisma.order.groupBy({
      by: ["status"],
      _count: true,
    }),
  ]);

  const totalCount = orders.length;
  const statusCounts = counts.reduce((acc, curr) => {
    acc[curr.status] = curr._count;
    return acc;
  }, {} as Record<string, number>);

  const tabs = [
    { label: "Todos", count: totalCount, status: "ALL" },
    { label: "Pendientes", count: statusCounts["PENDING"] || 0, status: "PENDING" },
    { label: "Confirmados", count: statusCounts["CONFIRMED"] || 0, status: "CONFIRMED" },
    { label: "En proceso", count: statusCounts["PROCESSING"] || 0, status: "PROCESSING" },
    { label: "Enviados", count: statusCounts["SHIPPED"] || 0, status: "SHIPPED" },
    { label: "Entregados", count: statusCounts["DELIVERED"] || 0, status: "DELIVERED" },
  ];

  return (
    <>
      <TopBar title="Pedidos" breadcrumb={["Dashboard", "Pedidos"]} />

      <div style={{ padding: "var(--space-8)" }}>
        {/* Header */}
        <div className={styles["page-header"]}>
          <div className={styles["page-header__left"]}>
            <h1 className={styles["page-title"]}>Gestión de Pedidos</h1>
            <p className={styles["page-subtitle"]}>
              {totalCount} pedidos en total · {statusCounts["PENDING"] || 0} pendientes de confirmación
            </p>
          </div>
          <button className="btn btn-primary" id="new-order-btn">
            + Nuevo Pedido
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
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Progreso</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const initials = order.client.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
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
                            {order.client.name}
                          </span>
                          <span className={styles["order-client__company"]}>
                            {order.client.companyName}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span className={styles["order-total"]}>
                          ${order.totalAmount.toNumber().toLocaleString("es-MX", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                        <br />
                        <span className={styles["order-items-count"]}>
                          {order._count.items} productos
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
                        {new Date(order.createdAt).toLocaleDateString("es-MX", { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <br />
                      <span className={styles["order-delivery"]}>
                        Entrega: {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString("es-MX") : "Pendiente"}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "var(--space-8)" }}>
                    No se encontraron pedidos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span className={styles.pagination__info}>
              Mostrando {orders.length} de {totalCount} pedidos
            </span>
            <div className={styles.pagination__buttons}>
              <button className={styles.pagination__btn}>← Anterior</button>
              <button className={`${styles.pagination__btn} ${styles["pagination__btn--active"]}`}>1</button>
              <button className={styles.pagination__btn}>Siguiente →</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
