"use client";

import styles from "./TopBar.module.css";

interface TopBarProps {
  title: string;
  /** Breadcrumb segments, e.g. ["Dashboard", "Productos"] */
  breadcrumb?: string[];
}

/**
 * TopBar — Barra superior del dashboard con búsqueda y notificaciones.
 */
export default function TopBar({ title, breadcrumb }: TopBarProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.topbar__left}>
        {breadcrumb && breadcrumb.length > 0 ? (
          <div className={styles.topbar__breadcrumb}>
            {breadcrumb.map((segment, i) => (
              <span key={i}>
                {i > 0 && <span>/</span>}
                {segment}
              </span>
            ))}
          </div>
        ) : (
          <h1 className={styles.topbar__title}>{title}</h1>
        )}
      </div>

      <div className={styles.topbar__actions}>
        {/* Search */}
        <div className={styles.topbar__search}>
          <span className={styles["topbar__search-icon"]}>🔍</span>
          <input
            type="search"
            className={styles["topbar__search-input"]}
            placeholder="Buscar productos, pedidos..."
            id="global-search"
          />
        </div>

        {/* Notifications */}
        <button
          className={styles["topbar__icon-btn"]}
          aria-label="Notificaciones"
          id="notifications-btn"
        >
          🔔
          <span className={styles["topbar__notification-dot"]} />
        </button>

        {/* Help */}
        <button
          className={styles["topbar__icon-btn"]}
          aria-label="Ayuda"
          id="help-btn"
        >
          ❓
        </button>
      </div>
    </header>
  );
}
