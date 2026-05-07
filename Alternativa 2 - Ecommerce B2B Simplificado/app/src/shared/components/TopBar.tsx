"use client";

import styles from "./TopBar.module.css";
import { useTranslation } from "@/shared/i18n/I18nProvider";

interface TopBarProps {
  title: string;
  /** Breadcrumb segments, e.g. ["Dashboard", "Products"] */
  breadcrumb?: string[];
}

/**
 * TopBar — Dashboard top bar with search and notifications.
 */
export default function TopBar({ title, breadcrumb }: TopBarProps) {
  const { dict, locale } = useTranslation();

  const handleLanguageChange = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=2592000`; // 30 days
    window.location.reload();
  };

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
        {/* Language Switcher */}
        <div className={styles.topbar__language}>
          <button 
            className={`${styles["topbar__lang-btn"]} ${locale === "en" ? styles["topbar__lang-btn--active"] : ""}`}
            onClick={() => handleLanguageChange("en")}
          >
            🇺🇸 EN
          </button>
          <button 
            className={`${styles["topbar__lang-btn"]} ${locale === "es" ? styles["topbar__lang-btn--active"] : ""}`}
            onClick={() => handleLanguageChange("es")}
          >
            🇲🇽 ES
          </button>
        </div>

        {/* Search */}
        <div className={styles.topbar__search}>
          <span className={styles["topbar__search-icon"]}>🔍</span>
          <input
            type="search"
            className={styles["topbar__search-input"]}
            placeholder={dict.common.search}
            id="global-search"
          />
        </div>

        {/* Notifications */}
        <button
          className={styles["topbar__icon-btn"]}
          aria-label="Notifications"
          id="notifications-btn"
        >
          🔔
          <span className={styles["topbar__notification-dot"]} />
        </button>

        {/* Help */}
        <button
          className={styles["topbar__icon-btn"]}
          aria-label="Help"
          id="help-btn"
        >
          ❓
        </button>
      </div>
    </header>
  );
}
