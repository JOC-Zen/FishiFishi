import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import prisma from "@/shared/lib/prisma";
import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";
import { redirect } from "next/navigation";

const emojiMap: Record<string, string> = {
  "Salmón": "🐟",
  "Camarón": "🦐",
  "Pulpo": "🐙",
  "Atún": "🐟",
  "Robalo": "🐠",
  "Mariscos": "🦪",
  "Langosta": "🦞",
};

/**
 * Página de Catálogo de Productos B2B.
 */
export default async function ProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <>
      <TopBar title="Productos" breadcrumb={["Dashboard", "Productos"]} />

      <div style={{ padding: "var(--space-8)" }}>
        {/* Header */}
        <div className={styles["page-header"]}>
          <div className={styles["page-header__left"]}>
            <h1 className={styles["page-title"]}>Catálogo de Productos</h1>
            <p className={styles["page-subtitle"]}>
              {products.length} productos activos en el catálogo
            </p>
          </div>
          <button className="btn btn-primary" id="add-product-btn">
            + Nuevo Producto
          </button>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filters__search}>
            <span className={styles["filters__search-icon"]}>🔍</span>
            <input
              type="search"
              className={styles["filters__search-input"]}
              placeholder="Buscar por nombre, SKU o categoría..."
              id="product-search"
            />
          </div>
          <select className={styles.filters__select} id="category-filter">
            <option value="">Todas las categorías</option>
            <option value="salmon">Salmón</option>
            <option value="camaron">Camarón</option>
            <option value="atun">Atún</option>
            <option value="mariscos">Mariscos</option>
            <option value="langosta">Langosta</option>
          </select>
          <select className={styles.filters__select} id="sort-filter">
            <option value="name">Ordenar por nombre</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="stock">Stock disponible</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className={styles["product-grid"]}>
          {products.map((product) => (
            <article key={product.id} className={styles["product-card"]}>
              <div className={styles["product-card__image"]}>
                {emojiMap[product.category] || "🐟"}
                <span className={styles["product-card__status"]}>
                  <span className={`badge ${product.status === "ACTIVE" ? "badge-success" : "badge-error"}`}>
                    {product.status === "ACTIVE" ? "Activo" : "Inactivo"}
                  </span>
                </span>
              </div>
              <div className={styles["product-card__body"]}>
                <span className={styles["product-card__category"]}>
                  {product.category}
                </span>
                <h3 className={styles["product-card__name"]}>{product.name}</h3>
                <span className={styles["product-card__sku"]}>
                  {product.sku}
                </span>
                <div className={styles["product-card__pricing"]}>
                  <span className={styles["product-card__price"]}>
                    ${product.basePrice.toNumber().toFixed(2)}
                  </span>
                  <span className={styles["product-card__unit"]}>
                    / {product.unit}
                  </span>
                </div>
                <div className={styles["product-card__footer"]}>
                  <span className={styles["product-card__stock"]}>
                    Stock: <strong>{product.stock.toNumber()}</strong> {product.unit}
                  </span>
                  <span className={styles["product-card__min-order"]}>
                    Mín: {product.minOrderQuantity.toNumber()} {product.unit}
                  </span>
                </div>
              </div>
            </article>
          ))}
          {products.length === 0 && (
            <div className={styles["empty-state"]}>
              <p>No hay productos en el catálogo.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
