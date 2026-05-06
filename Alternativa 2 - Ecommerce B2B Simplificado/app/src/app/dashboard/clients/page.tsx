import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";

/** Datos mock de clientes B2B */
const mockClients = [
  {
    id: "1",
    name: "Pescadería del Norte",
    contact: "Juan Gutiérrez",
    initials: "PN",
    email: "juan@pescaderianorte.com",
    phone: "+52 81 1234 5678",
    tier: 1 as const,
    status: "active" as const,
    totalOrders: 45,
    totalSpent: 284500,
    lastOrder: "Hoy",
  },
  {
    id: "2",
    name: "Restaurante Marea",
    contact: "Ana López",
    initials: "RM",
    email: "ana@restaurantemarea.com",
    phone: "+52 33 9876 5432",
    tier: 2 as const,
    status: "active" as const,
    totalOrders: 32,
    totalSpent: 156200,
    lastOrder: "Hace 2 días",
  },
  {
    id: "3",
    name: "Distribuidora Costa",
    contact: "Roberto Díaz",
    initials: "DC",
    email: "roberto@distcosta.com",
    phone: "+52 55 4567 8901",
    tier: 1 as const,
    status: "active" as const,
    totalOrders: 78,
    totalSpent: 523000,
    lastOrder: "Ayer",
  },
  {
    id: "4",
    name: "Super Fresco S.A.",
    contact: "María Torres",
    initials: "SF",
    email: "maria@superfresco.com",
    phone: "+52 81 2345 6789",
    tier: 2 as const,
    status: "active" as const,
    totalOrders: 21,
    totalSpent: 89400,
    lastOrder: "Hace 3 días",
  },
  {
    id: "5",
    name: "Cevichería La Perla",
    contact: "Carlos Mendoza",
    initials: "LP",
    email: "carlos@laperla.com",
    phone: "+52 33 6789 0123",
    tier: 3 as const,
    status: "active" as const,
    totalOrders: 12,
    totalSpent: 42300,
    lastOrder: "Hace 1 semana",
  },
  {
    id: "6",
    name: "Hotel Grand Marina",
    contact: "Sofía Herrera",
    initials: "HG",
    email: "sofia@grandmarina.com",
    phone: "+52 55 3456 7890",
    tier: 1 as const,
    status: "active" as const,
    totalOrders: 56,
    totalSpent: 412800,
    lastOrder: "Hace 2 días",
  },
  {
    id: "7",
    name: "Marisquería Don Pedro",
    contact: "Pedro Ramírez",
    initials: "DP",
    email: "pedro@donpedro.com",
    phone: "+52 81 5678 9012",
    tier: 3 as const,
    status: "pending" as const,
    totalOrders: 0,
    totalSpent: 0,
    lastOrder: "—",
  },
  {
    id: "8",
    name: "Sushi Express MX",
    contact: "Kenji Tanaka",
    initials: "SE",
    email: "kenji@sushiexpress.mx",
    phone: "+52 33 7890 1234",
    tier: 2 as const,
    status: "pending" as const,
    totalOrders: 0,
    totalSpent: 0,
    lastOrder: "—",
  },
];

const tierLabels: Record<number, string> = { 1: "Gold", 2: "Silver", 3: "Bronze" };

/**
 * Página de Clientes B2B.
 * Muestra tarjetas de cada cliente con detalles de compras y nivel de pricing.
 */
export default function ClientsPage() {
  const activeClients = mockClients.filter((c) => c.status === "active");
  const pendingClients = mockClients.filter((c) => c.status === "pending");

  return (
    <>
      <TopBar title="Clientes" breadcrumb={["Dashboard", "Clientes"]} />

      <div style={{ padding: "var(--space-8)" }}>
        {/* Header */}
        <div className={styles["page-header"]}>
          <div className={styles["page-header__left"]}>
            <h1 className={styles["page-title"]}>Clientes B2B</h1>
            <p className={styles["page-subtitle"]}>
              Gestiona tus clientes mayoristas y sus niveles de precios
            </p>
          </div>
          <button className="btn btn-primary" id="add-client-btn">
            + Nuevo Cliente
          </button>
        </div>

        {/* Stats Row */}
        <div className={styles["stats-row"]}>
          <div className={styles["stat-card"]}>
            <div className={`${styles["stat-card__icon"]} ${styles["stat-card__icon--active"]}`}>
              ✅
            </div>
            <div className={styles["stat-card__info"]}>
              <span className={styles["stat-card__value"]}>{activeClients.length}</span>
              <span className={styles["stat-card__label"]}>Clientes Activos</span>
            </div>
          </div>
          <div className={styles["stat-card"]}>
            <div className={`${styles["stat-card__icon"]} ${styles["stat-card__icon--pending"]}`}>
              ⏳
            </div>
            <div className={styles["stat-card__info"]}>
              <span className={styles["stat-card__value"]}>{pendingClients.length}</span>
              <span className={styles["stat-card__label"]}>Pendientes de Aprobación</span>
            </div>
          </div>
          <div className={styles["stat-card"]}>
            <div className={`${styles["stat-card__icon"]} ${styles["stat-card__icon--total"]}`}>
              💰
            </div>
            <div className={styles["stat-card__info"]}>
              <span className={styles["stat-card__value"]}>
                ${(mockClients.reduce((s, c) => s + c.totalSpent, 0) / 1000).toFixed(0)}k
              </span>
              <span className={styles["stat-card__label"]}>Ingresos Totales</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filters__search}>
            <span className={styles["filters__search-icon"]}>🔍</span>
            <input
              type="search"
              className={styles["filters__search-input"]}
              placeholder="Buscar por nombre o empresa..."
              id="client-search"
            />
          </div>
          <select className={styles.filters__select} id="tier-filter">
            <option value="">Todos los niveles</option>
            <option value="1">Gold</option>
            <option value="2">Silver</option>
            <option value="3">Bronze</option>
          </select>
          <select className={styles.filters__select} id="status-filter">
            <option value="">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="pending">Pendientes</option>
          </select>
        </div>

        {/* Client Grid */}
        <div className={styles["clients-grid"]}>
          {mockClients.map((client) => (
            <article key={client.id} className={styles["client-card"]}>
              <div className={styles["client-card__header"]}>
                <div
                  className={`${styles["client-card__avatar"]} ${
                    styles[`client-card__avatar--tier${client.tier}`]
                  }`}
                >
                  {client.initials}
                </div>
                <div className={styles["client-card__info"]}>
                  <span className={styles["client-card__name"]}>
                    {client.name}
                  </span>
                  <span className={styles["client-card__company"]}>
                    {client.contact}
                  </span>
                </div>
                <span
                  className={`${styles["client-card__tier"]} ${
                    styles[`client-card__tier--${client.tier}`]
                  }`}
                >
                  {tierLabels[client.tier]}
                </span>
              </div>

              <div className={styles["client-card__details"]}>
                <div className={styles["client-card__detail"]}>
                  <span className={styles["client-card__detail-label"]}>
                    Pedidos
                  </span>
                  <span className={styles["client-card__detail-value"]}>
                    {client.totalOrders}
                  </span>
                </div>
                <div className={styles["client-card__detail"]}>
                  <span className={styles["client-card__detail-label"]}>
                    Total Comprado
                  </span>
                  <span className={styles["client-card__detail-value"]}>
                    ${client.totalSpent.toLocaleString("es-MX")}
                  </span>
                </div>
                <div className={styles["client-card__detail"]}>
                  <span className={styles["client-card__detail-label"]}>
                    Último Pedido
                  </span>
                  <span className={styles["client-card__detail-value"]}>
                    {client.lastOrder}
                  </span>
                </div>
                <div className={styles["client-card__detail"]}>
                  <span className={styles["client-card__detail-label"]}>
                    Estado
                  </span>
                  <span className={styles["client-card__detail-value"]}>
                    <span
                      className={
                        client.status === "active"
                          ? "badge badge-success"
                          : "badge badge-warning"
                      }
                    >
                      {client.status === "active" ? "Activo" : "Pendiente"}
                    </span>
                  </span>
                </div>
              </div>

              <div className={styles["client-card__footer"]}>
                <span className={styles["client-card__contact"]}>
                  {client.email}
                </span>
                <div className={styles["client-card__actions"]}>
                  <button className="btn btn-ghost btn-sm">Ver</button>
                  <button className="btn btn-ghost btn-sm">Editar</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
