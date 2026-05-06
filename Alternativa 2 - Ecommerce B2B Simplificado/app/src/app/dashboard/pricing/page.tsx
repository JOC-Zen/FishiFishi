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

/** Datos mock de precios por producto y tier */
const mockPricingTable = [
  { name: "Filete de Salmón Premium", sku: "SAL-FIL-001", emoji: "🐟", base: 285, gold: 242.25, silver: 256.50, bronze: 270.75 },
  { name: "Camarón Jumbo (16/20)", sku: "CAM-JUM-002", emoji: "🦐", base: 420, gold: 357.00, silver: 378.00, bronze: 399.00 },
  { name: "Pulpo Fresco Entero", sku: "PUL-FRE-001", emoji: "🐙", base: 350, gold: 297.50, silver: 315.00, bronze: 332.50 },
  { name: "Atún Aleta Amarilla", sku: "ATU-ALE-001", emoji: "🐟", base: 520, gold: 442.00, silver: 468.00, bronze: 494.00 },
  { name: "Filete de Robalo", sku: "ROB-FIL-001", emoji: "🐠", base: 310, gold: 263.50, silver: 279.00, bronze: 294.50 },
  { name: "Ostión Fresco", sku: "OST-FRE-001", emoji: "🦪", base: 180, gold: 153.00, silver: 162.00, bronze: 171.00 },
  { name: "Almeja Chocolata", sku: "ALM-FRE-001", emoji: "🐚", base: 220, gold: 187.00, silver: 198.00, bronze: 209.00 },
  { name: "Langosta de Cola", sku: "LAN-COL-001", emoji: "🦞", base: 890, gold: 756.50, silver: 801.00, bronze: 845.50 },
];

/**
 * Página de Precios B2B.
 */
export default async function PricingPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  let pricingTable: any[] = [];

  try {
    const products = await prisma.product.findMany();

    pricingTable = products.map((p: any) => {
      const base = p.basePrice.toNumber();
      return {
        name: p.name,
        sku: p.sku,
        emoji: emojiMap[p.category] || "🐟",
        base,
        gold: base * 0.85,    // 15% discount
        silver: base * 0.90,  // 10% discount
        bronze: base * 0.95,  // 5% discount
      };
    });
  } catch (error) {
    console.warn("DB not connected for Pricing. Using mock data.");
    pricingTable = [
      { name: "Filete de Salmón Premium", sku: "SAL-FIL-001", emoji: "🐟", base: 285, gold: 242.25, silver: 256.50, bronze: 270.75 },
      { name: "Camarón Jumbo (16/20)", sku: "CAM-JUM-002", emoji: "🦐", base: 420, gold: 357.00, silver: 378.00, bronze: 399.00 },
    ];
  }
  return (
    <>
      <TopBar title="Precios" breadcrumb={["Dashboard", "Precios"]} />

      <div style={{ padding: "var(--space-8)" }}>
        {/* Header */}
        <div className={styles["page-header"]}>
          <div className={styles["page-header__left"]}>
            <h1 className={styles["page-title"]}>Precios por Volumen</h1>
            <p className={styles["page-subtitle"]}>
              Configura los niveles de descuento para tus clientes mayoristas
            </p>
          </div>
          <button className="btn btn-primary" id="edit-pricing-btn">
            ✏️ Editar Precios
          </button>
        </div>

        {/* Tier Cards */}
        <div className={styles.tiers}>
          <TierCard
            tier="gold"
            name="Gold"
            icon="🏆"
            discount="15%"
            description="Para clientes con más de 50 pedidos o compras superiores a $300,000 anuales."
            features={[
              "Descuento del 15% sobre precio base",
              "Prioridad en entregas",
              "Crédito a 30 días",
              "Ejecutivo de cuenta dedicado",
              "Acceso anticipado a nuevos productos",
            ]}
            clientCount={3}
          />
          <TierCard
            tier="silver"
            name="Silver"
            icon="🥈"
            discount="10%"
            description="Para clientes con más de 20 pedidos o compras superiores a $100,000 anuales."
            features={[
              "Descuento del 10% sobre precio base",
              "Envío gratuito en pedidos +$5,000",
              "Crédito a 15 días",
              "Soporte prioritario",
            ]}
            clientCount={3}
          />
          <TierCard
            tier="bronze"
            name="Bronze"
            icon="🥉"
            discount="5%"
            description="Para nuevos clientes verificados que están empezando su relación comercial."
            features={[
              "Descuento del 5% sobre precio base",
              "Envío gratuito en pedidos +$10,000",
              "Pago contra entrega",
              "Soporte estándar",
            ]}
            clientCount={2}
          />
        </div>

        {/* Pricing Table */}
        <div className={styles["pricing-table-section"]}>
          <div className={styles["pricing-table-header"]}>
            <h2 className={styles["pricing-table-title"]}>
              Tabla Comparativa de Precios por Producto
            </h2>
          </div>
          <table className={styles["pricing-table"]}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio Base</th>
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
  tier,
  name,
  icon,
  discount,
  description,
  features,
  clientCount,
}: {
  tier: string;
  name: string;
  icon: string;
  discount: string;
  description: string;
  features: string[];
  clientCount: number;
}) {
  return (
    <div className={`${styles["tier-card"]} ${styles[`tier-card--${tier}`]}`}>
      <div className={styles["tier-card__icon"]}>{icon}</div>
      <h3 className={styles["tier-card__name"]}>{name}</h3>
      <p className={styles["tier-card__desc"]}>{description}</p>
      <div className={styles["tier-card__discount"]}>{discount}</div>
      <p className={styles["tier-card__discount-label"]}>descuento sobre precio base</p>
      <div className={styles["tier-card__features"]}>
        {features.map((f) => (
          <div key={f} className={styles["tier-card__feature"]}>
            <span className={styles["tier-card__feature-check"]}>✓</span>
            {f}
          </div>
        ))}
      </div>
      <div className={styles["tier-card__clients"]}>
        <strong>{clientCount}</strong> clientes en este nivel
      </div>
    </div>
  );
}
