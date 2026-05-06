import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";

/**
 * Página de Configuración del sistema.
 * Permite editar datos de la empresa, notificaciones y preferencias.
 */
export default function SettingsPage() {
  return (
    <>
      <TopBar title="Configuración" breadcrumb={["Dashboard", "Configuración"]} />
      <div style={{ padding: "var(--space-8)" }}>
        <div className={styles["page-header"]}>
          <h1 className={styles["page-title"]}>Configuración</h1>
          <p className={styles["page-subtitle"]}>Administra tu cuenta y preferencias del sistema</p>
        </div>

        <div className={styles["settings-layout"]}>
          {/* Side Nav */}
          <nav className={styles["settings-nav"]}>
            <button className={`${styles["settings-nav__item"]} ${styles["settings-nav__item--active"]}`}>🏢 Empresa</button>
            <button className={styles["settings-nav__item"]}>🔔 Notificaciones</button>
            <button className={styles["settings-nav__item"]}>🔐 Seguridad</button>
            <button className={styles["settings-nav__item"]}>💳 Facturación</button>
            <button className={styles["settings-nav__item"]}>🔗 Integraciones</button>
            <button className={styles["settings-nav__item"]}>⚠️ Zona Peligro</button>
          </nav>

          {/* Content */}
          <div className={styles["settings-panel"]}>
            {/* Company Info */}
            <section className={styles["settings-section"]}>
              <h2 className={styles["settings-section__title"]}>Información de la Empresa</h2>
              <p className={styles["settings-section__desc"]}>Datos generales que aparecen en facturas y comunicaciones.</p>
              <div className={styles["form-grid"]}>
                <div className={styles["form-group"]}>
                  <label htmlFor="company-name">Nombre de la Empresa</label>
                  <input id="company-name" type="text" defaultValue="Mariscos Reyes S.A. de C.V." />
                </div>
                <div className={styles["form-group"]}>
                  <label htmlFor="rfc">RFC</label>
                  <input id="rfc" type="text" defaultValue="MRE201015ABC" />
                </div>
                <div className={styles["form-group"]}>
                  <label htmlFor="email-company">Email de Contacto</label>
                  <input id="email-company" type="email" defaultValue="ventas@mariscosreyes.com" />
                </div>
                <div className={styles["form-group"]}>
                  <label htmlFor="phone-company">Teléfono</label>
                  <input id="phone-company" type="tel" defaultValue="+52 81 1234 5678" />
                </div>
                <div className={`${styles["form-group"]} ${styles["form-group--full"]}`}>
                  <label htmlFor="address">Dirección Fiscal</label>
                  <textarea id="address" defaultValue={"Av. Constitución 1024, Col. Centro\nMonterrey, Nuevo León, CP 64000"} />
                </div>
              </div>
              <div className={styles.actions}>
                <button className="btn btn-secondary">Cancelar</button>
                <button className="btn btn-primary">Guardar Cambios</button>
              </div>
            </section>

            {/* Notifications */}
            <section className={styles["settings-section"]}>
              <h2 className={styles["settings-section__title"]}>Notificaciones</h2>
              <p className={styles["settings-section__desc"]}>Configura qué alertas quieres recibir.</p>
              <ToggleRow label="Nuevos pedidos" desc="Recibir alerta cuando un cliente realice un pedido" active />
              <ToggleRow label="Stock bajo" desc="Alertar cuando un producto baje del 20% de stock" active />
              <ToggleRow label="Pagos recibidos" desc="Notificar al recibir un pago de cliente" active />
              <ToggleRow label="Nuevos clientes" desc="Aviso cuando se registre un cliente nuevo" active={false} />
              <ToggleRow label="Reportes semanales" desc="Resumen semanal de ventas por email" active />
            </section>

            {/* Danger Zone */}
            <section className={`${styles["settings-section"]} ${styles["danger-zone"]}`}>
              <h2 className={styles["settings-section__title"]}>Zona de Peligro</h2>
              <p className={styles["settings-section__desc"]}>Acciones irreversibles. Procede con precaución.</p>
              <div style={{ display: "flex", gap: "var(--space-3)" }}>
                <button className="btn btn-secondary">Exportar Todos los Datos</button>
                <button className="btn btn-secondary" style={{ borderColor: "var(--color-error)", color: "var(--color-error)" }}>
                  Eliminar Cuenta
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

function ToggleRow({ label, desc, active }: { label: string; desc: string; active: boolean }) {
  return (
    <div className={styles["toggle-row"]}>
      <div className={styles["toggle-row__info"]}>
        <span className={styles["toggle-row__label"]}>{label}</span>
        <span className={styles["toggle-row__desc"]}>{desc}</span>
      </div>
      <button className={`${styles.toggle} ${active ? styles["toggle--active"] : ""}`} aria-label={`Toggle ${label}`} />
    </div>
  );
}
