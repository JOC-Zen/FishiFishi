"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/portal/layout.module.css";

interface PortalNavProps {
  dict: any;
}

/**
 * PortalNav — Client-side navigation links for the B2B Client Portal.
 * Handles active state styling dynamically.
 */
export default function PortalNav({ dict }: PortalNavProps) {
  const pathname = usePathname();

  const navItems = [
    { id: "nav-catalog", label: dict.sidebar.catalog, href: "/portal", icon: "🛍️" },
    { id: "nav-orders", label: dict.portal.my_orders, href: "/portal/orders", icon: "📋" },
    { id: "nav-cart", label: dict.sidebar.cart, href: "/portal/cart", icon: "🛒", badge: 3 },
    { id: "nav-account", label: dict.portal.my_account, href: "/portal/account", icon: "👤" },
  ];

  return (
    <div className={styles.navbar__nav}>
      {navItems.map((item) => {
        // Precise active route matching
        const isActive = pathname === item.href || (item.href !== "/portal" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navbar__link} ${isActive ? styles["navbar__link--active"] : ""}`}
            id={item.id}
          >
            <span className={styles["navbar__link-icon"]}>{item.icon}</span>
            <span>{item.label}</span>
            {item.badge !== undefined && (
              <span className={styles.navbar__badge}>{item.badge}</span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
