import { AuthService } from "@/features/auth/services/AuthService";
import { ProductService } from "@/features/products/services/ProductService";
import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";

const emojiMap: Record<string, string> = {
  "Salmon": "🐟", "Shrimp": "🦐", "Octopus": "🐙", "Tuna": "🐟",
  "Sea Bass": "🐠", "Shellfish": "🦪", "Lobster": "🦞",
};

/**
 * Inventory Control Page.
 */
export default async function InventoryPage() {
  await AuthService.requireRole("ADMIN");
  const products = await ProductService.getAllProducts();

  const inventory = products.map((p) => ({
    ...p,
    emoji: emojiMap[p.category] || "🐟",
    maxStock: 100, // Simulated max stock for percentages
    inWeek: 0, // Inbound/outbound should come from a WarehouseService later
    outWeek: 0,
    lastUpdate: "Recent",
  }));

  function getStockLevel(stock: number, max: number): "healthy" | "warning" | "critical" {
    const pct = (stock / max) * 100;
    if (pct > 50) return "healthy";
    if (pct > 20) return "warning";
    return "critical";
  }

  const criticalItems = inventory.filter((i) => getStockLevel(i.stock, i.maxStock) === "critical").length;
  const warningItems = inventory.filter((i) => getStockLevel(i.stock, i.maxStock) === "warning").length;
  const totalStock = inventory.reduce((s, i) => s + i.stock, 0);

  return (
    <>
      <TopBar title="Inventory" breadcrumb={["Dashboard", "Inventory"]} />

      <div style={{ padding: "var(--space-8)" }}>
        {/* Header */}
        <div className={styles["page-header"]}>
          <div className={styles["page-header__left"]}>
            <h1 className={styles["page-title"]}>Inventory Control</h1>
            <p className={styles["page-subtitle"]}>
              Monitor stock levels and inbound/outbound movements
            </p>
          </div>
          <div className={styles["page-header__actions"]}>
            <button className="btn btn-secondary" id="export-inventory-btn">
              📥 Export
            </button>
            <button className="btn btn-primary" id="add-stock-btn">
              + Record Inbound
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className={styles.summary}>
          <div className={styles["summary-card"]}>
            <span className={styles["summary-card__label"]}>Total in Stock</span>
            <span className={styles["summary-card__value"]}>{totalStock}</span>
            <span className={styles["summary-card__sub"]}>units across {inventory.length} products</span>
          </div>
          <div className={styles["summary-card"]}>
            <span className={styles["summary-card__label"]}>Critical Stock</span>
            <span className={styles["summary-card__value"]} style={{ color: "var(--color-error)" }}>
              {criticalItems}
            </span>
            <span className={styles["summary-card__sub"]}>products below 20%</span>
          </div>
          <div className={styles["summary-card"]}>
            <span className={styles["summary-card__label"]}>Low Stock</span>
            <span className={styles["summary-card__value"]} style={{ color: "var(--color-warning)" }}>
              {warningItems}
            </span>
            <span className={styles["summary-card__sub"]}>products between 20% and 50%</span>
          </div>
          <div className={styles["summary-card"]}>
            <span className={styles["summary-card__label"]}>Inbound This Week</span>
            <span className={styles["summary-card__value"]} style={{ color: "var(--color-success)" }}>
              +0
            </span>
            <span className={styles["summary-card__sub"]}>units received</span>
          </div>
        </div>

        {/* Table */}
        <div className={styles["table-section"]}>
          <div className={styles["table-header"]}>
            <h2 className={styles["table-header__title"]}>Inventory Products</h2>
            <div className={styles["table-header__filters"]}>
              <div className={styles["table-header__search"]}>
                <span className={styles["table-header__search-icon"]}>🔍</span>
                <input
                  type="search"
                  className={styles["table-header__search-input"]}
                  placeholder="Search product..."
                  id="inventory-search"
                />
              </div>
              <select className={styles["table-header__select"]} id="stock-level-filter">
                <option value="">All levels</option>
                <option value="critical">Critical</option>
                <option value="warning">Low</option>
                <option value="healthy">Healthy</option>
              </select>
            </div>
          </div>

          <table className={styles["inv-table"]}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Level</th>
                <th>Weekly Movement</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => {
                const level = getStockLevel(item.stock, item.maxStock);
                const pct = Math.round((item.stock / item.maxStock) * 100);

                return (
                  <tr key={item.id}>
                    <td>
                      <div className={styles["product-cell"]}>
                        <div className={styles["product-cell__emoji"]}>{item.emoji}</div>
                        <div className={styles["product-cell__info"]}>
                          <span className={styles["product-cell__name"]}>{item.name}</span>
                          <span className={styles["product-cell__sku"]}>{item.sku}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "var(--color-text-secondary)" }}>{item.category}</td>
                    <td>
                      <strong>{item.stock}</strong>
                      <span style={{ color: "var(--color-text-tertiary)" }}> / {item.maxStock} {item.unit}</span>
                    </td>
                    <td>
                      <div className={styles["stock-bar"]}>
                        <div className={styles["stock-bar__track"]}>
                          <div
                            className={`${styles["stock-bar__fill"]} ${styles[`stock-bar__fill--${level}`]}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className={styles["stock-bar__label"]}>{pct}%</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.movement}>
                        <span className={styles.movement__in}>↑ +{item.inWeek} in</span>
                        <span className={styles.movement__out}>↓ -{item.outWeek} out</span>
                      </div>
                    </td>
                    <td>
                      <span className={styles["last-update"]}>{item.lastUpdate}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
