import { AuthService } from "@/features/auth/services/AuthService";
import { ProductService } from "@/features/products/services/ProductService";
import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";
import Link from "next/link";

const emojiMap: Record<string, string> = {
  "Salmon": "🐟", "Shrimp": "🦐", "Octopus": "🐙", "Tuna": "🐟",
  "Sea Bass": "🐠", "Shellfish": "🦪", "Lobster": "🦞",
};

/**
 * B2B Product Catalog Page.
 */
export default async function ProductsPage() {
  await AuthService.requireRole("ADMIN");
  const products = await ProductService.getAllProducts();

  return (
    <>
      <TopBar title="Products" breadcrumb={["Dashboard", "Products"]} />

      <div style={{ padding: "var(--space-8)" }}>
        {/* Header */}
        <div className={styles["page-header"]}>
          <div className={styles["page-header__left"]}>
            <h1 className={styles["page-title"]}>Product Catalog</h1>
            <p className={styles["page-subtitle"]}>
              {products.length} active products in the catalog
            </p>
          </div>
          <button className="btn btn-primary" id="add-product-btn">
            + New Product
          </button>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filters__search}>
            <span className={styles["filters__search-icon"]}>🔍</span>
            <input
              type="search"
              className={styles["filters__search-input"]}
              placeholder="Search by name, SKU, or category..."
              id="product-search"
            />
          </div>
          <select className={styles.filters__select} id="category-filter">
            <option value="">All categories</option>
            <option value="salmon">Salmon</option>
            <option value="shrimp">Shrimp</option>
            <option value="tuna">Tuna</option>
            <option value="shellfish">Shellfish</option>
            <option value="lobster">Lobster</option>
          </select>
          <select className={styles.filters__select} id="sort-filter">
            <option value="name">Sort by name</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="stock">Available stock</option>
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
                    {product.status === "ACTIVE" ? "Active" : "Inactive"}
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
                    ${product.basePrice.toFixed(2)}
                  </span>
                  <span className={styles["product-card__unit"]}>
                    / {product.unit}
                  </span>
                </div>
                <div className={styles["product-card__footer"]}>
                  <span className={styles["product-card__stock"]}>
                    Stock: <strong>{product.stock}</strong> {product.unit}
                  </span>
                  <span className={styles["product-card__min-order"]}>
                    Min: {product.minOrderQuantity} {product.unit}
                  </span>
                </div>
                <div className={styles["product-card__actions"]}>
                  <Link href={`/dashboard/products/${product.id}`} className="btn btn-ghost btn-sm" id={`edit-${product.id}`}>✏️ Edit</Link>
                  <button className="btn btn-ghost btn-sm" id={`delete-${product.id}`}>🗑️ Delete</button>
                </div>
              </div>
            </article>
          ))}
          {products.length === 0 && (
            <div className={styles["empty-state"]}>
              <p>No products in the catalog.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
