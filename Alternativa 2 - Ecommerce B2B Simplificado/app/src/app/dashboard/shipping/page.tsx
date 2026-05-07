import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";
import { redirect } from "next/navigation";

const mockShipments = [
  { id: "SHP-1024", orderId: "ORD-2845", client: "Costa Distributors", origin: "Central Warehouse", destination: "Mexico City, Roma District", carrier: "FedEx", carrierEmoji: "📦", status: "in_transit", progress: 3, totalSteps: 4, eta: "May 7, 2026", etaLabel: "Tomorrow", weight: "48 kg" },
  { id: "SHP-1023", orderId: "ORD-2846", client: "Marea Restaurant", origin: "Central Warehouse", destination: "Guadalajara, Downtown", carrier: "DHL", carrierEmoji: "🚛", status: "preparing", progress: 1, totalSteps: 4, eta: "May 7, 2026", etaLabel: "Tomorrow", weight: "22 kg" },
  { id: "SHP-1022", orderId: "ORD-2847", client: "Northern Fishery", origin: "Central Warehouse", destination: "Monterrey, Valle District", carrier: "Estafeta", carrierEmoji: "📮", status: "in_transit", progress: 2, totalSteps: 4, eta: "May 8, 2026", etaLabel: "In 2 days", weight: "35 kg" },
  { id: "SHP-1021", orderId: "ORD-2843", client: "La Perla Cevicheria", origin: "Central Warehouse", destination: "Cancun, Hotel Zone", carrier: "FedEx", carrierEmoji: "📦", status: "delivered", progress: 4, totalSteps: 4, eta: "May 5, 2026", etaLabel: "Delivered", weight: "15 kg" },
  { id: "SHP-1020", orderId: "ORD-2842", client: "Grand Marina Hotel", origin: "Central Warehouse", destination: "Los Cabos, BCS", carrier: "DHL", carrierEmoji: "🚛", status: "in_transit", progress: 3, totalSteps: 4, eta: "May 6, 2026", etaLabel: "Today", weight: "62 kg" },
  { id: "SHP-1019", orderId: "ORD-2841", client: "Don Pedro Seafood", origin: "Central Warehouse", destination: "Monterrey, Cumbres", carrier: "Estafeta", carrierEmoji: "📮", status: "delivered", progress: 4, totalSteps: 4, eta: "May 4, 2026", etaLabel: "Delivered", weight: "28 kg" },
];

const statusMap: Record<string, { label: string; badge: string }> = {
  preparing: { label: "Preparing", badge: "badge badge-warning" },
  in_transit: { label: "In Transit", badge: "badge badge-info" },
  delivered: { label: "Delivered", badge: "badge badge-success" },
};

export default async function ShippingPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  const inTransit = mockShipments.filter((s) => s.status === "in_transit").length;
  const preparing = mockShipments.filter((s) => s.status === "preparing").length;
  const delivered = mockShipments.filter((s) => s.status === "delivered").length;

  return (
    <>
      <TopBar title="Shipping" breadcrumb={["Dashboard", "Shipping"]} />
      <div style={{ padding: "var(--space-8)" }}>
        <div className={styles["page-header"]}>
          <div className={styles["page-header__left"]}>
            <h1 className={styles["page-title"]}>Logistics & Shipping</h1>
            <p className={styles["page-subtitle"]}>Real-time delivery tracking</p>
          </div>
          <button className="btn btn-primary" id="create-shipment-btn">+ Create Shipment</button>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.stat__label}>In Transit</span>
            <span className={styles.stat__value} style={{ color: "var(--color-aqua)" }}>{inTransit}</span>
            <span className={styles.stat__sub}>active shipments en route</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.stat__label}>Preparing</span>
            <span className={styles.stat__value} style={{ color: "var(--color-warning)" }}>{preparing}</span>
            <span className={styles.stat__sub}>pending dispatch</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.stat__label}>Delivered (Week)</span>
            <span className={styles.stat__value} style={{ color: "var(--color-success)" }}>{delivered}</span>
            <span className={styles.stat__sub}>completed deliveries</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.stat__label}>Active Total Weight</span>
            <span className={styles.stat__value}>
              {mockShipments.filter((s) => s.status !== "delivered").reduce((sum, s) => sum + parseInt(s.weight), 0)} kg
            </span>
            <span className={styles.stat__sub}>in pending shipments</span>
          </div>
        </div>

        <div className={styles["shipments-section"]}>
          <div className={styles["shipments-header"]}>
            <h2 className={styles["shipments-title"]}>Active Shipments</h2>
          </div>
          <table className={styles["shipments-table"]}>
            <thead>
              <tr><th>Tracking</th><th>Route</th><th>Client</th><th>Carrier</th><th>Status</th><th>ETA</th></tr>
            </thead>
            <tbody>
              {mockShipments.map((s) => (
                <tr key={s.id}>
                  <td><span className={styles["tracking-id"]}>{s.id}</span><br /><span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)" }}>{s.orderId}</span></td>
                  <td><div className={styles["shipment-route"]}><span className={styles["shipment-route__from"]}>{s.origin}</span><span className={styles["shipment-route__arrow"]}>→</span><span className={styles["shipment-route__to"]}>{s.destination}</span></div></td>
                  <td style={{ fontWeight: 500 }}>{s.client}</td>
                  <td><div className={styles.carrier}><div className={styles.carrier__logo}>{s.carrierEmoji}</div><span className={styles.carrier__name}>{s.carrier}</span></div></td>
                  <td><span className={statusMap[s.status].badge}>{statusMap[s.status].label}</span></td>
                  <td><div className={styles.eta}><span className={styles.eta__date}>{s.eta}</span><span className={styles.eta__label}>{s.etaLabel}</span></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
