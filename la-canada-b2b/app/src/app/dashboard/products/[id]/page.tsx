import { ProductService } from "@/features/products/services/ProductService";
import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

const emojiMap: Record<string, string> = {
  "Salmon": "🐟", "Shrimp": "🦐", "Octopus": "🐙", "Tuna": "🐟",
  "Sea Bass": "🐠", "Shellfish": "🦪", "Lobster": "🦞",
};

/**
 * Product Detail / Edit Page - Dashboard
 */
export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await ProductService.getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <TopBar title={`Edit Product: ${product.name}`} breadcrumb={["Dashboard", "Products", product.name]} />

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header__left}>
            <Link href="/dashboard/products" className={styles.subtitle}>
              ← Back to Catalog
            </Link>
            <h1 className={styles.title}>{product.name}</h1>
            <span className={styles.subtitle}>SKU: {product.sku}</span>
          </div>
          <div className={styles.actions_header}>
            <span className={`badge ${product.status === 'ACTIVE' ? 'badge-success' : 'badge-error'}`}>
              {product.status}
            </span>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Column 1: Info & Pricing */}
          <div className={styles.main_col}>
            <div className={styles.card}>
              <h2 className={styles.card__title}>📝 General Information</h2>
              <div className={styles.form_group}>
                <label className={styles.form_label}>Product Name</label>
                <input className={styles.form_input} defaultValue={product.name} />
              </div>
              <div className={styles.form_group}>
                <label className={styles.form_label}>Category</label>
                <select className={styles.form_select} defaultValue={product.category}>
                  <option value="Salmon">Salmon</option>
                  <option value="Shrimp">Shrimp</option>
                  <option value="Tuna">Tuna</option>
                  <option value="Octopus">Octopus</option>
                  <option value="Sea Bass">Sea Bass</option>
                  <option value="Lobster">Lobster</option>
                  <option value="Shellfish">Shellfish</option>
                </select>
              </div>
              <div className={styles.form_group}>
                <label className={styles.form_label}>Description</label>
                <textarea 
                  className={styles.form_textarea} 
                  rows={4} 
                  defaultValue={`Premium fresh ${product.name.toLowerCase()} sourced from sustainable fisheries. High quality, food-grade standards.`}
                />
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.card__title}>💰 Pricing & Units</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div className={styles.form_group}>
                  <label className={styles.form_label}>Base Price ($)</label>
                  <input type="number" className={styles.form_input} defaultValue={product.basePrice} />
                </div>
                <div className={styles.form_group}>
                  <label className={styles.form_label}>Selling Unit</label>
                  <input className={styles.form_input} defaultValue={product.unit} />
                </div>
              </div>
              <div className={styles.form_group}>
                <label className={styles.form_label}>Minimum Order Quantity</label>
                <input type="number" className={styles.form_input} defaultValue={product.minOrderQuantity} />
              </div>
            </div>
          </div>

          {/* Column 2: Media & Inventory */}
          <div className={styles.side_col}>
            <div className={styles.card}>
              <h2 className={styles.card__title}>🖼️ Product Image</h2>
              <div className={styles.image_preview}>
                {emojiMap[product.category] || "🐟"}
              </div>
              <button className="btn btn-secondary" style={{ width: '100%' }}>Replace Image</button>
            </div>

            <div className={styles.card}>
              <h2 className={styles.card__title}>📊 Inventory Management</h2>
              <div className={styles.form_group}>
                <label className={styles.form_label}>Stock Level ({product.unit})</label>
                <input type="number" className={styles.form_input} defaultValue={product.stock} />
              </div>
              <div className={styles.form_group}>
                <label className={styles.form_label}>Status</label>
                <select className={styles.form_select} defaultValue={product.status}>
                  <option value="ACTIVE">Active (Visible in Catalog)</option>
                  <option value="INACTIVE">Inactive (Hidden from Clients)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className="btn btn-secondary">Discard Changes</button>
          <button className="btn btn-primary">Save Product</button>
        </div>
      </div>
    </>
  );
}
