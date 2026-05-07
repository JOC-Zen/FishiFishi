import { AuthService } from "@/features/auth/services/AuthService";
import { ProductService } from "@/features/products/services/ProductService";
import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";

const emojiMap: Record<string, string> = {
  "Salmon": "🐟", "Shrimp": "🦐", "Octopus": "🐙", "Tuna": "🐟",
  "Sea Bass": "🐠", "Shellfish": "🦪", "Lobster": "🦞",
};

/**
 * B2B Pricing Page.
 */
export default async function PricingPage() {
  await AuthService.requireRole("ADMIN");
  const products = await ProductService.getAllProducts();

  const pricingTable = products.map((p) => {
    const base = p.basePrice;
    return {
      name: p.name,
      sku: p.sku,
      emoji: emojiMap[p.category] || "🐟",
      base,
      gold: base * 0.85,
      silver: base * 0.90,
      bronze: base * 0.95,
    };
  });

  return (
    <>
      <TopBar title="Pricing" breadcrumb={["Dashboard", "Pricing"]} />

      <div style={{ padding: "var(--space-8)" }}>
        {/* Header */}
        <div className={styles["page-header"]}>
          <div className={styles["page-header__left"]}>
            <h1 className={styles["page-title"]}>Volume Pricing</h1>
            <p className={styles["page-subtitle"]}>
              Configure discount tiers for your wholesale clients
            </p>
          </div>
          <button className="btn btn-primary" id="edit-pricing-btn">
            ✏️ Edit Pricing
          </button>
        </div>

        {/* Tier Cards */}
        <div className={styles.tiers}>
          <TierCard
            tier="gold"
            name="Gold"
            icon="🏆"
            discount="15%"
            description="For clients with 50+ orders or annual purchases exceeding $300,000."
            features={[
              "15% discount on base price",
              "Priority shipping",
              "Net 30 payment terms",
              "Dedicated account manager",
              "Early access to new products",
            ]}
            clientCount={3}
          />
          <TierCard
            tier="silver"
            name="Silver"
            icon="🥈"
            discount="10%"
            description="For clients with 20+ orders or annual purchases exceeding $100,000."
            features={[
              "10% discount on base price",
              "Free shipping on orders $5,000+",
              "Net 15 payment terms",
              "Priority support",
            ]}
            clientCount={3}
          />
          <TierCard
            tier="bronze"
            name="Bronze"
            icon="🥉"
            discount="5%"
            description="For newly verified clients starting their business relationship."
            features={[
              "5% discount on base price",
              "Free shipping on orders $10,000+",
              "Cash on delivery",
              "Standard support",
            ]}
            clientCount={2}
          />
        </div>

        {/* Pricing Table */}
        <div className={styles["pricing-table-section"]}>
          <div className={styles["pricing-table-header"]}>
            <h2 className={styles["pricing-table-title"]}>
              Comparative Price Table by Product
            </h2>
          </div>
          <table className={styles["pricing-table"]}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Base Price</th>
                <th>🏆 Gold (-15%)</th>
                <th>🥈 Silver (-10%)</th>
                <th>🥉 Bronze (-5%)</th>
              </tr>
            </thead>
            <tbody>
              {pricingTable.map((product) => (
                <tr key={product.sku}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                      <span>{product.emoji}</span>
                      <div>
                        <div style={{ fontWeight: 500 }}>{product.name}</div>
                        <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-mono)" }}>
                          {product.sku}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles["price-base"]}>${product.base.toFixed(2)}</span>
                  </td>
                  <td>
                    <span className={`${styles["price-tier"]} ${styles["price-tier--gold"]}`}>
                      ${product.gold.toFixed(2)}
                    </span>
                    <br />
                    <span className={styles["price-discount"]}>-${(product.base - product.gold).toFixed(2)}</span>
                  </td>
                  <td>
                    <span className={`${styles["price-tier"]} ${styles["price-tier--silver"]}`}>
                      ${product.silver.toFixed(2)}
                    </span>
                    <br />
                    <span className={styles["price-discount"]}>-${(product.base - product.silver).toFixed(2)}</span>
                  </td>
                  <td>
                    <span className={`${styles["price-tier"]} ${styles["price-tier--bronze"]}`}>
                      ${product.bronze.toFixed(2)}
                    </span>
                    <br />
                    <span className={styles["price-discount"]}>-${(product.base - product.bronze).toFixed(2)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function TierCard({
  tier, name, icon, discount, description, features, clientCount,
}: {
  tier: string; name: string; icon: string; discount: string;
  description: string; features: string[]; clientCount: number;
}) {
  return (
    <div className={`${styles["tier-card"]} ${styles[`tier-card--${tier}`]}`}>
      <div className={styles["tier-card__icon"]}>{icon}</div>
      <h3 className={styles["tier-card__name"]}>{name}</h3>
      <p className={styles["tier-card__desc"]}>{description}</p>
      <div className={styles["tier-card__discount"]}>{discount}</div>
      <p className={styles["tier-card__discount-label"]}>discount on base price</p>
      <div className={styles["tier-card__features"]}>
        {features.map((f) => (
          <div key={f} className={styles["tier-card__feature"]}>
            <span className={styles["tier-card__feature-check"]}>✓</span>
            {f}
          </div>
        ))}
      </div>
      <div className={styles["tier-card__clients"]}>
        <strong>{clientCount}</strong> clients at this tier
      </div>
    </div>
  );
}
