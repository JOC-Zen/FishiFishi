"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "../page.module.css";
import Header from "@/shared/components/Header";
import Footer from "@/shared/components/Footer";

export default function AboutPage() {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55, ease: "easeOut" },
  };

  const values = [
    {
      title: "SUSTAINABILITY",
      desc: "We strictly adhere to responsible fishing practices and international ocean conservation guidelines.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      ),
    },
    {
      title: "PREMIUM QUALITY",
      desc: "Our state-of-the-art cold chain ensures maximum freshness and standard compliance from dock to delivery.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "GLOBAL SUPPLY",
      desc: "Equipped with custom logistics expertise to seamless distribute seafood globally, on time.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <Header activeLink="about" />

      <main>
        {/* HERO/HEADER FOR INNER PAGE */}
        <section className={styles.about} style={{ padding: "80px 0 40px 0" }}>
          <div className={styles.about__inner}>
            <motion.div className={styles.about__left} {...fadeUp}>
              <div className={styles.sectionLabel}>
                <span className={styles.sectionLabel__line} />
                <span className={styles.sectionLabel__text}>ABOUT LA CAÑADA SEAFOOD</span>
              </div>
              <h2 className={styles.about__heading}>
                Experience. Quality.<br />
                Global Reach.
              </h2>
              <p className={styles.about__body}>
                With over 30 years of experience, La Cañada Seafood is a leading Mexican seafood exporter. Based in Mazatlán, Sinaloa, we bridge premium quality wild-caught and farmed products from Mexico&apos;s pristine waters to dynamic markets in North America, Europe, and Asia.
              </p>
              <p className={styles.about__body} style={{ marginTop: "16px", color: "#6B7280" }}>
                Our operations encompass sustainable aquaculture, state-of-the-art IQF freezing facilities, and a global logistics network that guarantees high quality standards at every step of the B2B supply chain.
              </p>
            </motion.div>
            <motion.div
              className={styles.about__right}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div style={{ position: "relative", width: "100%", height: "450px" }}>
                <Image src="/images/about-fisherman.jpg" alt="Maritime Heritage" fill className={styles.about__img} style={{ borderRadius: "8px", objectFit: "cover" }} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* VALUES SECTION */}
        <section className={styles.solutions} style={{ background: "#F9FAFB", padding: "100px 0" }}>
          <div className={styles.solutions__inner}>
            <motion.div className={styles.solutions__header} {...fadeUp} style={{ textAlign: "center", marginBottom: "60px" }}>
              <span className={styles.solutions__label}>OUR FOUNDATIONS</span>
              <h2 className={styles.solutions__heading}>Core Corporate Values</h2>
            </motion.div>

            <div className={styles.solutions__grid}>
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  className={styles.solutions__item}
                  {...fadeUp}
                  style={{
                    background: "#FFFFFF",
                    padding: "40px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
                    border: "1px solid #E5E7EB",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <div className={styles.solutions__icon} style={{ color: "#1D5C8C", marginBottom: "24px" }}>
                    {v.icon}
                  </div>
                  <h4 className={styles.solutions__itemTitle} style={{ fontSize: "16px", fontWeight: "700", color: "#0B1F33", marginBottom: "12px", letterSpacing: "0.05em" }}>
                    {v.title}
                  </h4>
                  <p className={styles.solutions__itemDesc} style={{ color: "#6B7280", fontSize: "14px", lineHeight: "1.6" }}>
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className={styles.ctaBanner}>
          <div className={styles.ctaBanner__inner}>
            <div>
              <h2 className={styles.ctaBanner__heading}>
                Ready to source premium<br />Mexican seafood?
              </h2>
              <p className={styles.ctaBanner__sub}>Let&apos;s build a successful partnership.</p>
            </div>
            <Link href="mailto:sales@lacanadaseafood.com" className={styles.ctaBanner__btn}>
              CONTACT OUR SALES TEAM
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
