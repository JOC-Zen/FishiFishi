import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";

/** Datos mock de inventario */
const mockInventory = [
  { id: "1", name: "Filete de Salmón Premium", sku: "SAL-FIL-001", emoji: "🐟", category: "Salmón", stock: 12, maxStock: 100, unit: "kg", inWeek: 50, outWeek: 38, lastUpdate: "Hace 2h" },
  { id: "2", name: "Camarón Jumbo (16/20)", sku: "CAM-JUM-002", emoji: "🦐", category: "Camarón", stock: 25, maxStock: 80, unit: "kg", inWeek: 40, outWeek: 55, lastUpdate: "Hace 1h" },
  { id: "3", name: "Pulpo Fresco Entero", sku: "PUL-FRE-001", emoji: "🐙", category: "Pulpo", stock: 18, maxStock: 50, unit: "kg", inWeek: 20, outWeek: 32, lastUpdate: "Hace 3h" },
  { id: "4", name: "Atún Aleta Amarilla", sku: "ATU-ALE-001", emoji: "🐟", category: "Atún", stock: 45, maxStock: 60, unit: "kg", inWeek: 30, outWeek: 15, lastUpdate: "Hace 30 min" },
  { id: "5", name: "Filete de Robalo", sku: "ROB-FIL-001", emoji: "🐠", category: "Robalo", stock: 30, maxStock: 50, unit: "kg", inWeek: 25, outWeek: 20, lastUpdate: "Hace 1h" },
  { id: "6", name: "Ostión Fresco", sku: "OST-FRE-001", emoji: "🦪", category: "Mariscos", stock: 60, maxStock: 100, unit: "docena", inWeek: 40, outWeek: 40, lastUpdate: "Hace 4h" },
  { id: "7", name: "Almeja Chocolata", sku: "ALM-FRE-001", emoji: "🐚", category: "Mariscos", stock: 40, maxStock: 60, unit: "kg", inWeek: 20, outWeek: 20, lastUpdate: "Hoy, 8:00 AM" },
  { id: "8", name: "Langosta de Cola", sku: "LAN-COL-001", emoji: "🦞", category: "Langosta", stock: 8, maxStock: 30, unit: "kg", inWeek: 10, outWeek: 22, lastUpdate: "Hace 5h" },
];

function getStockLevel(stock: number, max: number): "healthy" | "warning" | "critical" {
  const pct = (stock / max) * 100;
  if (pct > 50) return "healthy";
  if (pct > 20) return "warning";
  return "critical";
}

/**
 * Página de Inventario.
 * Muestra el estado de stock con barras visuales y movimientos de entrada/salida.
 */
export default function InventoryPage() {
  const criticalItems = mockInventory.filter((i) => getStockLevel(i.stock, i.maxStock) === "critical").length;
  const warningItems = mockInventory.filter((i) => getStockLevel(i.stock, i.maxStock) === "warning").length;
  const totalStock = mockInventory.reduce((s, i) => s + i.stock, 0);

  return (
    <>
      <TopBar title="Inventario" breadcrumb={["Dashboard", "Inventario"]} />

      <div style={{ padding: "var(--space-8)" }}>
        {/* Header */}
        <div className={styles["page-header"]}>
          <div className={styles["page-header__left"]}>
            <h1 className={styles["page-title"]}>Control de Inventario</h1>
            <p className={styles["page-subtitle"]}>
              Monitorea niveles de stock y movimientos de entrada/salida
            </p>
          </div>
          <div className={styles["page-header__actions"]}>
            <button className="btn btn-secondary" id="export-inventory-btn">
              📥 Exportar
            </button>
            <button className="btn btn-primary" id="add-stock-btn">
              + Registrar Entrada
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className={styles.summary}>
          <div className={styles["summary-card"]}>
            <span className={styles["summary-card__label"]}>Total en Stock</span>
            <span className={styles["summary-card__value"]}>{totalStock}</span>
            <span className={styles["summary-card__sub"]}>unidades en {mockInventory.length} productos</span>
          </div>
          <div className={styles["summary-card"]}>
            <span className={styles["summary-card__label"]}>Stock Crítico</span>
            <span className={styles["summary-card__value"]} style={{ color: "var(--color-error)" }}>
              {criticalItems}
            </span>
            <span className={styles["summary-card__sub"]}>productos por debajo del 20%</span>
          </div>
          <div className={styles["summary-card"]}>
            <span className={styles["summary-card__label"]}>Stock Bajo</span>
            <span className={styles["summary-card__value"]} style={{ color: "var(--color-warning)" }}>
              {warningItems}
            </span>
            <span className={styles["summary-card__sub"]}>productos entre 20% y 50%</span>
          </div>
          <div className={styles["summary-card"]}>
            <span className={styles["summary-card__label"]}>Entradas esta Semana</span>
            <span className={styles["summary-card__value"]} style={{ color: "var(--color-success)" }}>
              +{mockInventory.reduce((s, i) => s + i.inWeek, 0)}
            </span>
            <span className={styles["summary-card__sub"]}>unidades recibidas</span>
          </div>
        </div>

        {/* Table */}
        <div className={styles["table-section"]}>
          <div className={styles["table-header"]}>
            <h2 className={styles["table-header__title"]}>Productos en Inventario</h2>
            <div className={styles["table-header__filters"]}>
              <div className={styles["table-header__search"]}>
                <span className={styles["table-header__search-icon"]}>🔍</span>
                <input
                  type="search"
                  className={styles["table-header__search-input"]}
                  placeholder="Buscar producto..."
                  id="inventory-search"
                />
              </div>
              <select className={styles["table-header__select"]} id="stock-level-filter">
                <option value="">Todos los niveles</option>
                <option value="critical">Crítico</option>
                <option value="warning">Bajo</option>
                <option value="healthy">Normal</option>
              </select>
            </div>
          </div>

          <table className={styles["inv-table"]}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Stock Actual</th>
                <th>Nivel</th>
                <th>Movimiento Semanal</th>
                <th>Última Actualización</th>
              </tr>
            </thead>
            <tbody>
              {mockInventory.map((item) => {
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
                        <span className={styles.movement__in}>↑ +{item.inWeek} entrada</span>
                        <span className={styles.movement__out}>↓ -{item.outWeek} salida</span>
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
