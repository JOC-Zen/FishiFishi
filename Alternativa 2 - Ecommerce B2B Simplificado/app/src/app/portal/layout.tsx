import type { Metadata } from "next";
import styles from "./layout.module.css";
import { getDictionary } from "@/shared/i18n/server";
import Logo from "@/shared/components/Logo";
import ThemeToggle from "@/shared/components/ThemeToggle";
import PortalNav from "@/shared/components/PortalNav";

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
          <Logo variant="main" size="sm" href="/portal" />
        </div>

        <PortalNav dict={dict} />

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
