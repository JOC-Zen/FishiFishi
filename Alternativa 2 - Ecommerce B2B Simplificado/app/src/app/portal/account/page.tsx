import styles from "./page.module.css";

/**
 * My Account Page for B2B Client Portal.
 * Displays profile, company data, discount tier, and benefits.
 */
export default function AccountPage() {
  return (
    <>
      {/* Header */}
      <div className={styles["account-header"]}>
        <h1 className={styles["account-title"]}>👤 My Account</h1>
        <p className={styles["account-subtitle"]}>
          Manage your profile, billing information, and preferences
        </p>
      </div>

      <div className={styles["account-layout"]}>
        {/* ---- Profile Card ---- */}
        <div className={styles["profile-card"]}>
          <div className={styles["profile-card__avatar"]}>JG</div>
          <h2 className={styles["profile-card__name"]}>Juan Gutierrez</h2>
          <p className={styles["profile-card__company"]}>Northern Fishery</p>
          <div className={styles["profile-card__tier"]}>⭐ Gold Tier</div>

          <div className={styles["profile-card__stats"]}>
            <div className={styles["profile-card__stat"]}>
              <div className={styles["profile-card__stat-value"]}>45</div>
              <div className={styles["profile-card__stat-label"]}>Orders</div>
            </div>
            <div className={styles["profile-card__stat"]}>
              <div className={styles["profile-card__stat-value"]}>$284k</div>
              <div className={styles["profile-card__stat-label"]}>Purchased</div>
            </div>
            <div className={styles["profile-card__stat"]}>
              <div className={styles["profile-card__stat-value"]}>15%</div>
              <div className={styles["profile-card__stat-label"]}>Discount</div>
            </div>
            <div className={styles["profile-card__stat"]}>
              <div className={styles["profile-card__stat-value"]}>2 yrs</div>
              <div className={styles["profile-card__stat-label"]}>Member</div>
            </div>
          </div>
        </div>

        {/* ---- Sections ---- */}
        <div className={styles["account-sections"]}>
          {/* Personal Data */}
          <section className={styles.section}>
            <div className={styles.section__header}>
              <h3 className={styles.section__title}>📝 Personal Information</h3>
              <button className={styles["section__edit-btn"]} id="edit-personal">
                ✏️ Edit
              </button>
            </div>
            <div className={styles["form-grid"]}>
              <div className={styles["form-field"]}>
                <label className={styles["form-field__label"]}>Full Name</label>
                <div className={styles["form-field__value"]}>Juan Gutierrez</div>
              </div>
              <div className={styles["form-field"]}>
                <label className={styles["form-field__label"]}>Email Address</label>
                <div className={styles["form-field__value"]}>juan@pescaderianorte.com</div>
              </div>
              <div className={styles["form-field"]}>
                <label className={styles["form-field__label"]}>Phone Number</label>
                <div className={styles["form-field__value"]}>+52 81 1234 5678</div>
              </div>
              <div className={styles["form-field"]}>
                <label className={styles["form-field__label"]}>Position</label>
                <div className={styles["form-field__value"]}>Purchasing Manager</div>
              </div>
            </div>
          </section>

          {/* Company Data */}
          <section className={styles.section}>
            <div className={styles.section__header}>
              <h3 className={styles.section__title}>🏢 Company Information</h3>
              <button className={styles["section__edit-btn"]} id="edit-company">
                ✏️ Edit
              </button>
            </div>
            <div className={styles["form-grid"]}>
              <div className={styles["form-field"]}>
                <label className={styles["form-field__label"]}>Business Name</label>
                <div className={styles["form-field__value"]}>Northern Fishery S.A. de C.V.</div>
              </div>
              <div className={styles["form-field"]}>
                <label className={styles["form-field__label"]}>Tax ID (RFC)</label>
                <div className={styles["form-field__value"]}>PNO180523ABC</div>
              </div>
              <div className={styles["form-field"]}>
                <label className={styles["form-field__label"]}>Company Phone</label>
                <div className={styles["form-field__value"]}>+52 81 8765 4321</div>
              </div>
              <div className={styles["form-field"]}>
                <label className={styles["form-field__label"]}>Website</label>
                <div className={styles["form-field__value"]}>www.pescaderianorte.com</div>
              </div>
              <div className={`${styles["form-field"]} ${styles["form-field--full"]}`}>
                <label className={styles["form-field__label"]}>Delivery Address</label>
                <div className={styles["form-field__value"]}>
                  1024 Constitution Ave, Downtown, Monterrey, Nuevo Leon, 64000
                </div>
              </div>
            </div>
          </section>

          {/* Tier and Benefits */}
          <section className={styles.section}>
            <div className={styles.section__header}>
              <h3 className={styles.section__title}>⭐ Your Gold Tier</h3>
            </div>

            <div className={styles["tier-benefits"]}>
              <div className={styles["tier-benefit"]}>
                <span className={styles["tier-benefit__icon"]}>💰</span>
                <span className={styles["tier-benefit__text"]}>Discount on base price</span>
                <span className={styles["tier-benefit__value"]}>15%</span>
              </div>
              <div className={styles["tier-benefit"]}>
                <span className={styles["tier-benefit__icon"]}>🚚</span>
                <span className={styles["tier-benefit__text"]}>Free shipping on orders over</span>
                <span className={styles["tier-benefit__value"]}>$5,000</span>
              </div>
              <div className={styles["tier-benefit"]}>
                <span className={styles["tier-benefit__icon"]}>📅</span>
                <span className={styles["tier-benefit__text"]}>Credit terms</span>
                <span className={styles["tier-benefit__value"]}>30 days</span>
              </div>
              <div className={styles["tier-benefit"]}>
                <span className={styles["tier-benefit__icon"]}>👤</span>
                <span className={styles["tier-benefit__text"]}>Dedicated account manager</span>
                <span className={styles["tier-benefit__value"]}>✓</span>
              </div>
              <div className={styles["tier-benefit"]}>
                <span className={styles["tier-benefit__icon"]}>🚀</span>
                <span className={styles["tier-benefit__text"]}>Priority delivery</span>
                <span className={styles["tier-benefit__value"]}>✓</span>
              </div>
              <div className={styles["tier-benefit"]}>
                <span className={styles["tier-benefit__icon"]}>🆕</span>
                <span className={styles["tier-benefit__text"]}>Early access to new products</span>
                <span className={styles["tier-benefit__value"]}>✓</span>
              </div>
            </div>

            {/* Tier Progress */}
            <div className={styles["tier-progress"]}>
              <div className={styles["tier-progress__label"]}>
                <span>Progress towards next tier</span>
                <span>Gold (current)</span>
              </div>
              <div className={styles["tier-progress__bar"]}>
                <div className={styles["tier-progress__fill"]} style={{ width: "85%" }} />
              </div>
              <p className={styles["tier-progress__hint"]}>
                You have completed 45 of 50 orders to maintain your Gold tier. Just 5 more to go!
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
