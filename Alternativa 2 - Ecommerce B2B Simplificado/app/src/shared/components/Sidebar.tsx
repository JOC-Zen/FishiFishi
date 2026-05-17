"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import { useSession, signOut } from "next-auth/react";
import Logo from "./Logo";

/**
 * Sidebar — Main lateral navigation component.
 */
export default function Sidebar({ dict }: { dict: any }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  const navigation = [
    {
      title: "General",
      items: [
        { icon: "📊", label: dict.sidebar.dashboard, href: "/dashboard" },
        { icon: "📦", label: dict.sidebar.products, href: "/dashboard/products" },
        { icon: "🛒", label: dict.sidebar.orders, href: "/dashboard/orders", badge: 3 },
        { icon: "👥", label: dict.sidebar.clients, href: "/dashboard/clients" },
      ],
    },
    {
      title: "Management",
      items: [
        { icon: "📋", label: dict.sidebar.inventory, href: "/dashboard/inventory" },
        { icon: "💰", label: dict.sidebar.pricing, href: "/dashboard/pricing" },
        { icon: "🚚", label: dict.sidebar.shipping, href: "/dashboard/shipping" },
      ],
    },
    {
      title: "System",
      items: [
        { icon: "⚙️", label: dict.sidebar.settings, href: "/dashboard/settings" },
      ],
    },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div style={{ padding: "var(--space-4)", display: "flex", justifyContent: "center" }}>
        <Logo variant="negative" href="/dashboard" />
      </div>

      {/* Navigation */}
      <nav className={styles.sidebar__nav}>
        {navigation.map((section) => (
          <div key={section.title}>
            <span className={styles["sidebar__section-label"]}>
              {section.title}
            </span>
            {section.items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" &&
                  pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.sidebar__link} ${
                    isActive ? styles["sidebar__link--active"] : ""
                  }`}
                >
                  <span className={styles["sidebar__link-icon"]}>
                    {item.icon}
                  </span>
                  {item.label}
                  {item.badge && (
                    <span className={styles["sidebar__link-badge"]}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div className={styles.sidebar__footer}>
        <div className={styles.sidebar__user}>
          <div className={styles.sidebar__avatar}>{initials}</div>
          <div className={styles["sidebar__user-info"]}>
            <span className={styles["sidebar__user-name"]}>
              {user?.name || dict.common.loading}
            </span>
            <span className={styles["sidebar__user-role"]}>
              {user?.role === "ADMIN" ? "Administrator" : "B2B Client"}
            </span>
          </div>
        </div>
        <button 
          className="btn btn-ghost btn-sm" 
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{ marginTop: "var(--space-3)", width: "100%", justifyContent: "flex-start", paddingLeft: "var(--space-1)" }}
        >
          🚪 {dict.auth.sign_out}
        </button>
      </div>
    </aside>
  );
}
