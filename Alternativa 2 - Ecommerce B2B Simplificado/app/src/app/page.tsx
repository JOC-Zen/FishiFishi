"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

/**
 * Home Page (Landing + Login) for FishiFishi B2B.
 */
export default function Home() {
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
        setError("Invalid credentials. Please try again.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.landing}>
      {/* ---- Left Panel: Branding ---- */}
      <section className={styles.landing__brand}>
        <div className={styles.landing__logo}>
          <div className={styles["landing__logo-icon"]}>🐟</div>
          <h1 className={styles.landing__title}>FishiFishi</h1>
          <p className={styles.landing__subtitle}>
            Your B2B platform for wholesale orders. Manage inventory,
            volume pricing, and orders in one place.
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
          <h2 className={styles["landing__form-title"]}>Sign In</h2>
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
              Email Address
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
              Password
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
              Remember me
            </label>
            <a href="#" className={styles["landing__form-link"]}>
              Forgot your password?
            </a>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <div className={styles["landing__form-divider"]}>
            or continue with
          </div>

          <button type="button" className="btn btn-secondary">
            Request access as a new client
          </button>
        </form>

        <p
          className={styles["landing__form-register"]}
          style={{ marginTop: "var(--space-8)" }}
        >
          Don&apos;t have an account?{" "}
          <a href="#">Contact sales</a>
        </p>
      </aside>
    </main>
  );
}
