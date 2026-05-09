"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useTranslation } from "@/shared/i18n/I18nProvider";
import Logo from "@/shared/components/Logo";

/**
 * Home Page (Landing + Login) for La Cañada Seafood B2B.
 */
export default function Home() {
  const { dict } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(dict.auth.invalid_credentials);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError(dict.auth.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.landing}>
      {/* ---- Left Panel: Branding ---- */}
      <section className={styles.landing__brand}>
        <div className={styles.landing__logo}>
          <Logo variant="main" />
          <p className={styles.landing__subtitle}>
            {dict.portal.catalog_subtitle}
          </p>
        </div>

        <div className={styles.landing__features}>
          <div className={styles.landing__feature}>
            <span className={styles["landing__feature-icon"]}>📦</span>
            <span>Wholesale orders with tiered pricing</span>
          </div>
          <div className={styles.landing__feature}>
            <span className={styles["landing__feature-icon"]}>📊</span>
            <span>Dashboard with real-time metrics</span>
          </div>
          <div className={styles.landing__feature}>
            <span className={styles["landing__feature-icon"]}>🔒</span>
            <span>Secure access for verified clients only</span>
          </div>
          <div className={styles.landing__feature}>
            <span className={styles["landing__feature-icon"]}>🚚</span>
            <span>Delivery tracking and integrated logistics</span>
          </div>
        </div>
      </section>

      {/* ---- Right Panel: Login ---- */}
      <aside className={styles["landing__form-panel"]}>
        <div className={styles["landing__form-header"]}>
          <h2 className={styles["landing__form-title"]}>{dict.auth.sign_in}</h2>
          <p className={styles["landing__form-desc"]}>
            Access your wholesale client account
          </p>
        </div>

        <form className={styles.landing__form} onSubmit={handleSubmit}>
          {error && (
            <div className="badge badge-error" style={{ width: "100%", marginBottom: "var(--space-4)", padding: "var(--space-2)" }}>
              {error}
            </div>
          )}

          <div className={styles["landing__form-group"]}>
            <label htmlFor="email" className="form-label">
              {dict.auth.email}
            </label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="you@company.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles["landing__form-group"]}>
            <label htmlFor="password" className="form-label">
              {dict.auth.password}
            </label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles["landing__form-footer"]}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
                cursor: "pointer",
              }}
            >
              <input type="checkbox" id="remember" />
              {dict.auth.remember_me}
            </label>
            <a href="#" className={styles["landing__form-link"]}>
              {dict.auth.forgot_password}
            </a>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg"
            disabled={isLoading}
          >
            {isLoading ? dict.common.loading : dict.auth.sign_in}
          </button>

          <div className={styles["landing__form-divider"]}>
            or continue with
          </div>

          <button type="button" className="btn btn-secondary">
            {dict.auth.request_access}
          </button>
        </form>

        <p
          className={styles["landing__form-register"]}
          style={{ marginTop: "var(--space-8)" }}
        >
          {dict.auth.no_account}{" "}
          <a href="#">{dict.auth.contact_sales}</a>
        </p>
      </aside>
    </main>
  );
}
