import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";

const mockShipments = [
  { id: "SHP-1024", orderId: "ORD-2845", client: "Distribuidora Costa", origin: "Almacén Central", destination: "CDMX, Col. Roma", carrier: "FedEx", carrierEmoji: "📦", status: "in_transit", progress: 3, totalSteps: 4, eta: "7 may 2026", etaLabel: "Mañana", weight: "48 kg" },
  { id: "SHP-1023", orderId: "ORD-2846", client: "Restaurante Marea", origin: "Almacén Central", destination: "Guadalajara, Zona Centro", carrier: "DHL", carrierEmoji: "🚛", status: "preparing", progress: 1, totalSteps: 4, eta: "7 may 2026", etaLabel: "Mañana", weight: "22 kg" },
  { id: "SHP-1022", orderId: "ORD-2847", client: "Pescadería del Norte", origin: "Almacén Central", destination: "Monterrey, Col. Valle", carrier: "Estafeta", carrierEmoji: "📮", status: "in_transit", progress: 2, totalSteps: 4, eta: "8 may 2026", etaLabel: "En 2 días", weight: "35 kg" },
  { id: "SHP-1021", orderId: "ORD-2843", client: "Cevichería La Perla", origin: "Almacén Central", destination: "Cancún, Zona Hotelera", carrier: "FedEx", carrierEmoji: "📦", status: "delivered", progress: 4, totalSteps: 4, eta: "5 may 2026", etaLabel: "Entregado", weight: "15 kg" },
  { id: "SHP-1020", orderId: "ORD-2842", client: "Hotel Grand Marina", origin: "Almacén Central", destination: "Los Cabos, BCS", carrier: "DHL", carrierEmoji: "🚛", status: "in_transit", progress: 3, totalSteps: 4, eta: "6 may 2026", etaLabel: "Hoy", weight: "62 kg" },
  { id: "SHP-1019", orderId: "ORD-2841", client: "Marisquería Don Pedro", origin: "Almacén Central", destination: "Monterrey, Col. Cumbres", carrier: "Estafeta", carrierEmoji: "📮", status: "delivered", progress: 4, totalSteps: 4, eta: "4 may 2026", etaLabel: "Entregado", weight: "28 kg" },
];

const statusMap: Record<string, { label: string; badge: string }> = {
  preparing: { label: "En preparación", badge: "badge badge-warning" },
  in_transit: { label: "En tránsito", badge: "badge badge-info" },
  delivered: { label: "Entregado", badge: "badge badge-success" },
};

export default function ShippingPage() {
  const inTransit = mockShipments.filter((s) => s.status === "in_transit").length;
  const preparing = mockShipments.filter((s) => s.status === "preparing").length;
  const delivered = mockShipments.filter((s) => s.status === "delivered").length;

  return (
    <>
      <TopBar title="Envíos" breadcrumb={["Dashboard", "Envíos"]} />
      <div style={{ padding: "var(--space-8)" }}>
        <div className={styles["page-header"]}>
          <div className={styles["page-header__left"]}>
            <h1 className={styles["page-title"]}>Logística y Envíos</h1>
            <p className={styles["page-subtitle"]}>Seguimiento en tiempo real de entregas</p>
          </div>
          <button className="btn btn-primary" id="create-shipment-btn">+ Crear Envío</button>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.stat__label}>En Tránsito</span>
            <span className={styles.stat__value} style={{ color: "var(--color-aqua)" }}>{inTransit}</span>
            <span className={styles.stat__sub}>envíos activos en ruta</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.stat__label}>En Preparación</span>
            <span className={styles.stat__value} style={{ color: "var(--color-warning)" }}>{preparing}</span>
            <span className={styles.stat__sub}>pendientes de despacho</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.stat__label}>Entregados (Semana)</span>
            <span className={styles.stat__value} style={{ color: "var(--color-success)" }}>{delivered}</span>
            <span className={styles.stat__sub}>entregas completadas</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.stat__label}>Peso Total Activo</span>
            <span className={styles.stat__value}>
              {mockShipments.filter((s) => s.status !== "delivered").reduce((sum, s) => sum + parseInt(s.weight), 0)} kg
            </span>
            <span className={styles.stat__sub}>en envíos pendientes</span>
          </div>
        </div>

        <div className={styles["shipments-section"]}>
          <div className={styles["shipments-header"]}>
            <h2 className={styles["shipments-title"]}>Envíos Activos</h2>
          </div>
          <table className={styles["shipments-table"]}>
            <thead>
              <tr><th>Tracking</th><th>Ruta</th><th>Cliente</th><th>Transportista</th><th>Estado</th><th>ETA</th></tr>
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
