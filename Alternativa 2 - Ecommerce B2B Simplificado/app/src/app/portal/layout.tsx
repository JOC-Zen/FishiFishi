import type { Metadata } from "next";
import Link from "next/link";
import styles from "./layout.module.css";
import { getDictionary } from "@/shared/i18n/server";
import Logo from "@/shared/components/Logo";
import ThemeToggle from "@/shared/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Client Portal — La Cañada Seafood",
  description: "B2B shopping portal for La Cañada Seafood wholesale clients.",
};

/**
 * B2B Client Portal Layout.
 * Horizontal navigation bar + main content.
 */
export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dict } = await getDictionary();

  return (
    <div className={styles.portal}>
      {/* ---- Navbar ---- */}
      <nav className={styles.navbar}>
        <div style={{ padding: "0 var(--space-4)" }}>
          <Logo variant="negative" href="/portal" />
        </div>

        <div className={styles.navbar__nav}>
          <Link href="/portal" className={styles.navbar__link} id="nav-catalog">
            <span className={styles["navbar__link-icon"]}>🛍️</span>
            <span>{dict.sidebar.catalog}</span>
          </Link>
          <Link href="/portal/orders" className={styles.navbar__link} id="nav-orders">
            <span className={styles["navbar__link-icon"]}>📋</span>
            <span>{dict.portal.my_orders}</span>
          </Link>
          <Link href="/portal/cart" className={styles.navbar__link} id="nav-cart">
            <span className={styles["navbar__link-icon"]}>🛒</span>
            <span>{dict.sidebar.cart}</span>
            <span className={styles.navbar__badge}>3</span>
          </Link>
          <Link href="/portal/account" className={styles.navbar__link} id="nav-account">
            <span className={styles["navbar__link-icon"]}>👤</span>
            <span>{dict.portal.my_account}</span>
          </Link>
        </div>

        <div className={styles.navbar__right}>
          <ThemeToggle />
          <div className={styles.navbar__user}>
            <div className={styles.navbar__avatar}>JG</div>
            <div>
              <div className={styles.navbar__username}>Juan Gutierrez</div>
              <div className={styles.navbar__tier}>⭐ Gold</div>
            </div>
          </div>
        </div>
      </nav>

      {/* ---- Content ---- */}
      <main className={styles.portal__content}>
        {children}
      </main>
    </div>
  );
}
