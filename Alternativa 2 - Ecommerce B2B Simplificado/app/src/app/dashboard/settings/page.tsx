import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";
import { redirect } from "next/navigation";

/**
 * System Settings Page.
 */
export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  return (
    <>
      <TopBar title="Settings" breadcrumb={["Dashboard", "Settings"]} />
      <div style={{ padding: "var(--space-8)" }}>
        <div className={styles["page-header"]}>
          <h1 className={styles["page-title"]}>Settings</h1>
          <p className={styles["page-subtitle"]}>Manage your account and system preferences</p>
        </div>

        <div className={styles["settings-layout"]}>
          {/* Side Nav */}
          <nav className={styles["settings-nav"]}>
            <button className={`${styles["settings-nav__item"]} ${styles["settings-nav__item--active"]}`}>🏢 Company</button>
            <button className={styles["settings-nav__item"]}>🔔 Notifications</button>
            <button className={styles["settings-nav__item"]}>🔐 Security</button>
            <button className={styles["settings-nav__item"]}>💳 Billing</button>
            <button className={styles["settings-nav__item"]}>🔗 Integrations</button>
            <button className={styles["settings-nav__item"]}>⚠️ Danger Zone</button>
          </nav>

          {/* Content */}
          <div className={styles["settings-panel"]}>
            {/* Company Info */}
            <section className={styles["settings-section"]}>
              <h2 className={styles["settings-section__title"]}>Company Information</h2>
              <p className={styles["settings-section__desc"]}>General data that appears on invoices and communications.</p>
              <div className={styles["form-grid"]}>
                <div className={styles["form-group"]}>
                  <label htmlFor="company-name">Company Name</label>
                  <input id="company-name" type="text" defaultValue="Mariscos Reyes S.A. de C.V." />
                </div>
                <div className={styles["form-group"]}>
                  <label htmlFor="tax-id">Tax ID</label>
                  <input id="tax-id" type="text" defaultValue="MRE201015ABC" />
                </div>
                <div className={styles["form-group"]}>
                  <label htmlFor="email-company">Contact Email</label>
                  <input id="email-company" type="email" defaultValue="sales@mariscosreyes.com" />
                </div>
                <div className={styles["form-group"]}>
                  <label htmlFor="phone-company">Phone</label>
                  <input id="phone-company" type="tel" defaultValue="+52 81 1234 5678" />
                </div>
                <div className={`${styles["form-group"]} ${styles["form-group--full"]}`}>
                  <label htmlFor="address">Business Address</label>
                  <textarea id="address" defaultValue={"1024 Constitution Ave, Downtown\nMonterrey, Nuevo Leon, 64000"} />
                </div>
              </div>
              <div className={styles.actions}>
                <button className="btn btn-secondary">Cancel</button>
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </section>

            {/* Notifications */}
            <section className={styles["settings-section"]}>
              <h2 className={styles["settings-section__title"]}>Notifications</h2>
              <p className={styles["settings-section__desc"]}>Configure which alerts you want to receive.</p>
              <ToggleRow label="New orders" desc="Get alerted when a client places an order" active />
              <ToggleRow label="Low stock" desc="Alert when a product drops below 20% stock" active />
              <ToggleRow label="Payments received" desc="Notify when a client payment is received" active />
              <ToggleRow label="New clients" desc="Alert when a new client registers" active={false} />
              <ToggleRow label="Weekly reports" desc="Weekly sales summary via email" active />
            </section>

            {/* Danger Zone */}
            <section className={`${styles["settings-section"]} ${styles["danger-zone"]}`}>
              <h2 className={styles["settings-section__title"]}>Danger Zone</h2>
              <p className={styles["settings-section__desc"]}>Irreversible actions. Proceed with caution.</p>
              <div style={{ display: "flex", gap: "var(--space-3)" }}>
                <button className="btn btn-secondary">Export All Data</button>
                <button className="btn btn-secondary" style={{ borderColor: "var(--color-error)", color: "var(--color-error)" }}>
                  Delete Account
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
