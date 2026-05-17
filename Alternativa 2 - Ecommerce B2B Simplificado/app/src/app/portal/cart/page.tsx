import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

const emojiMap: Record<string, string> = {
  "Salmon": "🐟", "Shrimp": "🦐", "Octopus": "🐙", "Tuna": "🐟",
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
};

/** Mock client cart data */
const cartItems = [
  { id: "1", name: "Premium Salmon Fillet", sku: "SAL-FIL-001", category: "Salmon", basePrice: 285, discountedPrice: 242.25, unit: "kg", qty: 10 },
  { id: "2", name: "Jumbo Shrimp (16/20)", sku: "SHR-JUM-002", category: "Shrimp", basePrice: 420, discountedPrice: 357, unit: "kg", qty: 15 },
  { id: "4", name: "Yellowfin Tuna", sku: "TUN-YEL-001", category: "Tuna", basePrice: 520, discountedPrice: 442, unit: "kg", qty: 8 },
];

/**
 * B2B Client Shopping Cart Page.
 */
export default function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.discountedPrice * item.qty, 0);
  const baseTotal = cartItems.reduce((sum, item) => sum + item.basePrice * item.qty, 0);
  const totalDiscount = baseTotal - subtotal;
  const shipping = subtotal >= 5000 ? 0 : 350;
  const total = subtotal + shipping;

  return (
    <>
      {/* Header */}
      <div className={styles["cart-header"]}>
        <div>
          <h1 className={styles["cart-title"]}>🛒 My Cart</h1>
          <p className={styles["cart-count"]}>{cartItems.length} products in your cart</p>
        </div>
        <button className={styles["clear-btn"]} id="clear-cart-btn">
          🗑️ Clear Cart
        </button>
      </div>

      {/* Layout */}
      <div className={styles["cart-layout"]}>
        {/* Cart Items */}
        <div className={styles["cart-items"]}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles["cart-item"]}>
              <div className={styles["cart-item__image"]} style={{ position: "relative", width: "64px", height: "64px", background: "#F5F7FA", borderRadius: "var(--radius-md)" }}>
                <Image 
                  src={productImageMap[item.category] || "/images/product-other-seafood.png"} 
                  alt={item.name} 
                  fill 
                  style={{ objectFit: "contain", padding: "4px" }} 
                />
              </div>

              <div className={styles["cart-item__info"]}>
                <div className={styles["cart-item__name"]}>{item.name}</div>
                <div className={styles["cart-item__sku"]}>{item.sku}</div>
                <div className={styles["cart-item__pricing"]}>
                  <span className={styles["cart-item__unit-price"]}>
                    ${item.discountedPrice.toFixed(2)} / {item.unit}
                  </span>
                  <span className={styles["cart-item__original"]}>
                    ${item.basePrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className={styles["cart-item__qty"]}>
                <button className={styles["cart-item__qty-btn"]}>−</button>
                <div className={styles["cart-item__qty-value"]}>{item.qty}</div>
                <button className={styles["cart-item__qty-btn"]}>+</button>
              </div>

              <div className={styles["cart-item__subtotal"]}>
                <div className={styles["cart-item__subtotal-value"]}>
                  ${(item.discountedPrice * item.qty).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
                <button className={styles["cart-item__remove"]}>
                  ✕ Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className={styles["order-summary"]}>
          <h2 className={styles["order-summary__title"]}>Order Summary</h2>

          <div className={styles["order-summary__row"]}>
            <span className={styles["order-summary__label"]}>Subtotal (Base)</span>
            <span className={styles["order-summary__value"]}>${baseTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
          </div>

          <div className={styles["order-summary__row"]}>
            <span className={styles["order-summary__label"]}>Gold Discount (-15%)</span>
            <span className={`${styles["order-summary__value"]} ${styles["order-summary__value--discount"]}`}>
              -${totalDiscount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className={styles["order-summary__row"]}>
            <span className={styles["order-summary__label"]}>Discounted Subtotal</span>
            <span className={styles["order-summary__value"]}>${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
          </div>

          <div className={styles["order-summary__row"]}>
            <span className={styles["order-summary__label"]}>Shipping</span>
            <span className={`${styles["order-summary__value"]} ${shipping === 0 ? styles["order-summary__value--discount"] : ""}`}>
              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <hr className={styles["order-summary__divider"]} />

          <div className={styles["order-summary__total"]}>
            <span className={styles["order-summary__total-label"]}>Total</span>
            <span className={styles["order-summary__total-value"]}>
              ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className={styles["order-summary__note"]}>
            ℹ️ Free shipping on orders over $5,000 MXN
          </div>

          <button className={styles["checkout-btn"]} id="checkout-btn">
            📦 Confirm Order
          </button>

          <Link href="/portal" className={styles["continue-btn"]}>
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
