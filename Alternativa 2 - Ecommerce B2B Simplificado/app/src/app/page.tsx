"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

/**
 * Página principal (Landing + Login) de FishiFishi B2B.
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
        setError("Credenciales inválidas. Inténtalo de nuevo.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.landing}>
      {/* ---- Panel Izquierdo: Branding ---- */}
      <section className={styles.landing__brand}>
        <div className={styles.landing__logo}>
          <div className={styles["landing__logo-icon"]}>🐟</div>
          <h1 className={styles.landing__title}>FishiFishi</h1>
          <p className={styles.landing__subtitle}>
            Tu plataforma B2B para pedidos mayoristas. Gestiona inventario,
            precios por volumen y pedidos en un solo lugar.
          </p>
        </div>

        <div className={styles.landing__features}>
          <div className={styles.landing__feature}>
            <span className={styles["landing__feature-icon"]}>📦</span>
            <span>Pedidos al por mayor con precios escalonados</span>
          </div>
          <div className={styles.landing__feature}>
            <span className={styles["landing__feature-icon"]}>📊</span>
            <span>Panel de control con métricas en tiempo real</span>
          </div>
          <div className={styles.landing__feature}>
            <span className={styles["landing__feature-icon"]}>🔒</span>
            <span>Acceso seguro exclusivo para clientes verificados</span>
          </div>
          <div className={styles.landing__feature}>
            <span className={styles["landing__feature-icon"]}>🚚</span>
            <span>Seguimiento de entregas y logística integrada</span>
          </div>
        </div>
      </section>

      {/* ---- Panel Derecho: Login ---- */}
      <aside className={styles["landing__form-panel"]}>
        <div className={styles["landing__form-header"]}>
          <h2 className={styles["landing__form-title"]}>Inicia sesión</h2>
          <p className={styles["landing__form-desc"]}>
            Accede a tu cuenta de cliente mayorista
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
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="tu@empresa.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles["landing__form-group"]}>
            <label htmlFor="password" className="form-label">
              Contraseña
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
              Recordarme
            </label>
            <a href="#" className={styles["landing__form-link"]}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

          <div className={styles["landing__form-divider"]}>
            o continúa con
          </div>

          <button type="button" className="btn btn-secondary">
            Solicitar acceso como nuevo cliente
          </button>
        </form>

        <p
          className={styles["landing__form-register"]}
          style={{ marginTop: "var(--space-8)" }}
        >
          ¿No tienes cuenta?{" "}
          <a href="#">Contacta a ventas</a>
        </p>
      </aside>
    </main>
  );
}
