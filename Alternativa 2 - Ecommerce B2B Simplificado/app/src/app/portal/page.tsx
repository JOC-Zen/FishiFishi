"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useProductStore } from "@/features/products/store/useProductStore";
import styles from "./page.module.css";

const emojiMap: Record<string, string> = {
  "Salmon": "🐟", "Shrimp": "🦐", "Octopus": "🐙", "Tuna": "🐟",
  "Sea Bass": "🐠", "Shellfish": "🦪", "Lobster": "🦞",
};

const productImageMap: Record<string, string> = {
  "Salmon": "/images/product-fish.png",
  "Salmón": "/images/product-fish.png",
  "Shrimp": "/images/product-shrimp.png",
  "Camarón": "/images/product-shrimp.png",
  "Octopus": "/images/product-other-seafood.png",
  "Pulpo": "/images/product-other-seafood.png",
  "Tuna": "/images/product-fish.png",
  "Atún": "/images/product-fish.png",
  "Sea Bass": "/images/product-fish.png",
  "Lobster": "/images/product-other-seafood.png",
  "Shellfish": "/images/product-other-seafood.png",
  "Crab": "/images/product-crab.png",
  "Sea Cucumber": "/images/product-sea-cucumber.png",
  "Fish Maw": "/images/product-fish-maw.png",
};

const categories = ["All", "Salmon", "Shrimp", "Tuna", "Octopus", "Sea Bass", "Lobster", "Shellfish"];

/** Client discount (simulated: Gold = 15%) */
const clientDiscount = 0.15;
const clientTier = "Gold";

function getStockStatus(stock: number, minOrder: number) {
  if (stock <= 0) return { label: "Out of Stock", cls: styles["product-card__stock-badge--out"] };
  if (stock < minOrder * 2) return { label: "Low Stock", cls: styles["product-card__stock-badge--low"] };
  return { label: "Available", cls: styles["product-card__stock-badge--ok"] };
}

/**
 * Client portal main page: B2B Product Catalog.
 * Shows available products with personalized pricing based on client tier.
 */
export default function CatalogPage() {
  const { 
    filteredProducts, 
    isLoading, 
    searchQuery, 
    activeCategory, 
    fetchProducts, 
    setSearchQuery, 
    setActiveCategory 
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      {/* ---- Header ---- */}
      <div className={styles["catalog-header"]}>
        <div className={styles["catalog-header__top"]}>
          <div>
            <h1 className={styles["catalog-title"]}>B2B Catalog</h1>
            <p className={styles["catalog-subtitle"]}>
              Explore our premium seafood products. Exclusive pricing for wholesale clients.
            </p>
          </div>
          <div className={styles["catalog-header__discount"]}>
            <span className={styles["catalog-header__discount-icon"]}>🏷️</span>
            <span>Your {clientTier} discount:</span>
            <span className={styles["catalog-header__discount-value"]}>-{clientDiscount * 100}%</span>
          </div>
        </div>

        {/* Categories */}
        <div className={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles["category-chip"]} ${activeCategory === cat ? styles["category-chip--active"] : ""}`}
              id={`cat-${cat.toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat !== "All" && <span>{emojiMap[cat] || "🐟"}</span>}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className={styles["filters-bar"]}>
          <div className={styles["search-box"]}>
            <span className={styles["search-box__icon"]}>🔍</span>
            <input
              type="search"
              className={styles["search-box__input"]}
              placeholder="Search products by name, SKU or category..."
              id="catalog-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className={styles["sort-select"]} id="catalog-sort">
            <option value="name">Sort by name</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="stock">Availability</option>
          </select>
        </div>
      </div>

      {/* ---- Product Grid ---- */}
      <div className={styles["product-grid"]}>
        {isLoading ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "var(--space-12)" }}>
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.map((product) => {
          const discountedPrice = product.basePrice * (1 - clientDiscount);
          const stockStatus = getStockStatus(product.stock, product.minOrderQuantity);

          return (
            <article key={product.id} className={styles["product-card"]}>
              {/* Image Area */}
              <div className={styles["product-card__image"]} style={{ position: "relative", minHeight: "160px", background: "#F5F7FA" }}>
                <Image 
                  src={productImageMap[product.category] || "/images/product-other-seafood.png"} 
                  alt={product.name} 
                  fill 
                  style={{ objectFit: "contain", padding: "12px" }} 
                />
                <div className={styles["product-card__badges"]}>
                  <span className={`${styles["product-card__stock-badge"]} ${stockStatus.cls}`}>
                    {stockStatus.label}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className={styles["product-card__body"]}>
                <span className={styles["product-card__category"]}>
                  {product.category}
                </span>
                <h3 className={styles["product-card__name"]}>{product.name}</h3>
                <span className={styles["product-card__sku"]}>{product.sku}</span>

                {/* Pricing */}
                <div className={styles["product-card__pricing"]}>
                  <span className={`${styles["product-card__price"]} ${styles["product-card__price--discounted"]}`}>
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className={styles["product-card__unit"]}>/ {product.unit}</span>
                </div>
                <span className={styles["product-card__original-price"]}>
                  Base Price: ${product.basePrice.toFixed(2)}
                </span>
                <div className={styles["product-card__discount-tag"]}>
                  ↓ {clientDiscount * 100}% {clientTier} discount
                </div>

                {/* Meta */}
                <div className={styles["product-card__meta"]}>
                  <span>Stock: <strong>{product.stock}</strong> {product.unit}</span>
                  <span>Min: {product.minOrderQuantity} {product.unit}</span>
                </div>

                {/* Actions */}
                <div className={styles["product-card__actions"]}>
                  <div className={styles["qty-control"]}>
                    <button className={styles["qty-control__btn"]}>−</button>
                    <div className={styles["qty-control__value"]}>{product.minOrderQuantity}</div>
                    <button className={styles["qty-control__btn"]}>+</button>
                  </div>
                  <button className={styles["add-to-cart-btn"]} id={`add-${product.id}`}>
                    🛒 Add
                  </button>
                </div>
              </div>
            </article>
          );
        })}
        {!isLoading && filteredProducts.length === 0 && (
          <div className={styles["empty-state"]} style={{ gridColumn: "1 / -1", textAlign: "center", padding: "var(--space-12)" }}>
            <p>No products found matching your search.</p>
          </div>
        )}
      </div>
    </>
  );
}
