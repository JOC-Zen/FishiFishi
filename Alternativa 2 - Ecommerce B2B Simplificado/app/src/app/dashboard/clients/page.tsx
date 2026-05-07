import { AuthService } from "@/features/auth/services/AuthService";
import { UserService } from "@/features/users/services/UserService";
import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";

const tierLabels: Record<string, string> = { GOLD: "Gold", SILVER: "Silver", BRONZE: "Bronze" };

/**
 * B2B Clients Page.
 */
export default async function ClientsPage() {
  await AuthService.requireRole("ADMIN");
  const clients = await UserService.getAllClients();

  const activeClients = clients.filter((c) => c.status === "ACTIVE");
  const pendingClients = clients.filter((c) => c.status === "PENDING");

  return (
    <>
      <TopBar title="Clients" breadcrumb={["Dashboard", "Clients"]} />

      <div style={{ padding: "var(--space-8)" }}>
        {/* Header */}
        <div className={styles["page-header"]}>
          <div className={styles["page-header__left"]}>
            <h1 className={styles["page-title"]}>B2B Clients</h1>
            <p className={styles["page-subtitle"]}>
              Manage your wholesale clients and their pricing tiers
            </p>
          </div>
          <button className="btn btn-primary" id="add-client-btn">
            + New Client
          </button>
        </div>

        {/* Stats Row */}
        <div className={styles["stats-row"]}>
          <div className={styles["stat-card"]}>
            <div className={`${styles["stat-card__icon"]} ${styles["stat-card--active"]}`}>
              ✅
            </div>
            <div className={styles["stat-card__info"]}>
              <span className={styles["stat-card__value"]}>{activeClients.length}</span>
              <span className={styles["stat-card__label"]}>Active Clients</span>
            </div>
          </div>
          <div className={styles["stat-card"]}>
            <div className={`${styles["stat-card__icon"]} ${styles["stat-card--pending"]}`}>
              ⏳
            </div>
            <div className={styles["stat-card__info"]}>
              <span className={styles["stat-card__value"]}>{pendingClients.length}</span>
              <span className={styles["stat-card__label"]}>Pending Approval</span>
            </div>
          </div>
          <div className={styles["stat-card"]}>
            <div className={`${styles["stat-card__icon"]} ${styles["stat-card--total"]}`}>
              💰
            </div>
            <div className={styles["stat-card__info"]}>
              <span className={styles["stat-card__value"]}>
                ${(clients.reduce((s, c) => s + c.totalSpent, 0) / 1000).toFixed(0)}k
              </span>
              <span className={styles["stat-card__label"]}>Total Revenue</span>
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
              placeholder="Search by name or company..."
              id="client-search"
            />
          </div>
          <select className={styles.filters__select} id="tier-filter">
            <option value="">All Tiers</option>
            <option value="GOLD">Gold</option>
            <option value="SILVER">Silver</option>
            <option value="BRONZE">Bronze</option>
          </select>
          <select className={styles.filters__select} id="status-filter">
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>

        {/* Client Grid */}
        <div className={styles["clients-grid"]}>
          {clients.map((client) => {
            const initials = client.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
            return (
              <article key={client.id} className={styles["client-card"]}>
                <div className={styles["client-card__header"]}>
                  <div className={`${styles["client-card__avatar"]} ${styles[`client-card__avatar--${client.tier.toLowerCase()}`]}`}>
                    {initials}
                  </div>
                  <div className={styles["client-card__info"]}>
                    <span className={styles["client-card__name"]}>
                      {client.name}
                    </span>
                    <span className={styles["client-card__company"]}>
                      {client.companyName}
                    </span>
                  </div>
                  <span className={`${styles["client-card__tier"]} ${styles[`client-card__tier--${client.tier.toLowerCase()}`]}`}>
                    {tierLabels[client.tier]}
                  </span>
                </div>

                <div className={styles["client-card__details"]}>
                  <div className={styles["client-card__detail"]}>
                    <span className={styles["client-card__detail-label"]}>Orders</span>
                    <span className={styles["client-card__detail-value"]}>{client.totalOrders}</span>
                  </div>
                  <div className={styles["client-card__detail"]}>
                    <span className={styles["client-card__detail-label"]}>Total Purchased</span>
                    <span className={styles["client-card__detail-value"]}>${client.totalSpent.toLocaleString("en-US")}</span>
                  </div>
                  <div className={styles["client-card__detail"]}>
                    <span className={styles["client-card__detail-label"]}>Last Order</span>
                    <span className={styles["client-card__detail-value"]}>
                      {client.lastOrderDate ? client.lastOrderDate.toLocaleDateString("en-US") : "—"}
                    </span>
                  </div>
                  <div className={styles["client-card__detail"]}>
                    <span className={styles["client-card__detail-label"]}>Status</span>
                    <span className={styles["client-card__detail-value"]}>
                      <span className={client.status === "ACTIVE" ? "badge badge-success" : "badge badge-warning"}>
                        {client.status}
                      </span>
                    </span>
                  </div>
                </div>

                <div className={styles["client-card__footer"]}>
                  <span className={styles["client-card__contact"]}>
                    {client.email}
                  </span>
                  <div className={styles["client-card__actions"]}>
                    <button className="btn btn-ghost btn-sm">View</button>
                    <button className="btn btn-ghost btn-sm">Edit</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
