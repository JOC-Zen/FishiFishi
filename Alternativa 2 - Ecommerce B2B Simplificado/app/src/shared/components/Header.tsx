"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "@/app/page.module.css";
import { useTranslation } from "@/shared/i18n/I18nProvider";

interface HeaderProps {
  activeLink?: "home" | "about" | "products" | "certifications" | "none";
}

const navTranslations: Record<string, Record<string, string>> = {
  en: {
    home: "HOME",
    about: "ABOUT US",
    products: "PRODUCTS",
    certifications: "CERTIFICATIONS",
    ecommerce: "ECOMMERCE",
    contact: "CONTACT SALES"
  },
  es: {
    home: "INICIO",
    about: "NOSOTROS",
    products: "PRODUCTOS",
    certifications: "CERTIFICACIONES",
    ecommerce: "ECOMMERCE",
    contact: "CONTACTAR VENTAS"
  }
};

export default function Header({ activeLink = "none" }: HeaderProps) {
  const { dict, locale } = useTranslation();

  const handleLanguageChange = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=2592000`; // 30 days
    window.location.reload();
  };

  const nav = navTranslations[locale] || navTranslations.en;

  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector("header");
      if (header) {
        if (window.scrollY > 10) {
          header.classList.add("header--scrolled");
        } else {
          header.classList.remove("header--scrolled");
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Link href="/" className={styles.header__logo}>
          <div className={styles.header__logoMark}>
            <span className={styles.header__logoInitials}>LC</span>
          </div>
          <div className={styles.header__logoText}>
            <span className={styles.header__logoTitle}>LA CAÑADA</span>
            <span className={styles.header__logoSub}>SEAFOOD</span>
          </div>
        </Link>

        <nav className={styles.header__nav}>
          <Link
            href="/"
            className={`${styles.header__link} ${
              activeLink === "home" ? styles["header__link--active"] : ""
            }`}
          >
            {nav.home}
          </Link>
          <Link
            href="/about"
            className={`${styles.header__link} ${
              activeLink === "about" ? styles["header__link--active"] : ""
            }`}
          >
            {nav.about}
          </Link>
          <Link
            href="/products"
            className={`${styles.header__link} ${
              activeLink === "products" ? styles["header__link--active"] : ""
            }`}
          >
            {nav.products}
          </Link>
          <Link
            href="/certifications"
            className={`${styles.header__link} ${
              activeLink === "certifications" ? styles["header__link--active"] : ""
            }`}
          >
            {nav.certifications}
          </Link>
          <Link href="/login" className={styles.header__link}>
            {nav.ecommerce}
          </Link>
        </nav>

        <div className={styles.header__actions}>
          <Link href="/#contact" className={styles.header__cta}>
            {nav.contact}
          </Link>
          
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button 
              onClick={() => handleLanguageChange("en")}
              style={{
                fontFamily: "'Montserrat', var(--font-montserrat, sans-serif)",
                fontWeight: 700,
                fontSize: "10px",
                color: locale === "en" ? "#0B1F33" : "#9CA3AF",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 2px",
                borderBottom: locale === "en" ? "2px solid #0B1F33" : "2px solid transparent",
                transition: "all var(--transition-fast)"
              }}
            >
              EN
            </button>
            <span style={{ color: "#E5E7EB", fontSize: "10px", fontWeight: 700 }}>|</span>
            <button 
              onClick={() => handleLanguageChange("es")}
              style={{
                fontFamily: "'Montserrat', var(--font-montserrat, sans-serif)",
                fontWeight: 700,
                fontSize: "10px",
                color: locale === "es" ? "#0B1F33" : "#9CA3AF",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 2px",
                borderBottom: locale === "es" ? "2px solid #0B1F33" : "2px solid transparent",
                transition: "all var(--transition-fast)"
              }}
            >
              ES
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
