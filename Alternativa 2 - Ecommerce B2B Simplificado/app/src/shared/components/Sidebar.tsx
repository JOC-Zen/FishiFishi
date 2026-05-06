"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

/**
 * Definición de los items de navegación del sidebar.
 * Cada item tiene un icono (emoji por ahora, reemplazable por SVG),
 * una etiqueta, una ruta, y opcionalmente un badge con contador.
 */
interface NavItem {
  icon: string;
  label: string;
  href: string;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: "General",
    items: [
      { icon: "📊", label: "Dashboard", href: "/dashboard" },
      { icon: "📦", label: "Productos", href: "/dashboard/products" },
      { icon: "🛒", label: "Pedidos", href: "/dashboard/orders", badge: 3 },
      { icon: "👥", label: "Clientes", href: "/dashboard/clients" },
    ],
  },
  {
    title: "Gestión",
    items: [
      { icon: "📋", label: "Inventario", href: "/dashboard/inventory" },
      { icon: "💰", label: "Precios", href: "/dashboard/pricing" },
      { icon: "🚚", label: "Envíos", href: "/dashboard/shipping" },
    ],
  },
  {
    title: "Sistema",
    items: [
      { icon: "⚙️", label: "Configuración", href: "/dashboard/settings" },
    ],
  },
];

import { useSession, signOut } from "next-auth/react";

/**
 * Sidebar — Componente de navegación lateral principal.
 */
export default function Sidebar() {
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

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <Link href="/dashboard" className={styles.sidebar__logo}>
        <span className={styles["sidebar__logo-icon"]}>🐟</span>
        <span className={styles["sidebar__logo-text"]}>FishiFishi</span>
      </Link>

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
              {user?.name || "Cargando..."}
            </span>
            <span className={styles["sidebar__user-role"]}>
              {user?.role === "ADMIN" ? "Administrador" : "Cliente B2B"}
            </span>
          </div>
        </div>
        <button 
          className="btn btn-ghost btn-sm" 
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{ marginTop: "var(--space-3)", width: "100%", justifyContent: "flex-start", paddingLeft: "var(--space-1)" }}
        >
          🚪 Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
