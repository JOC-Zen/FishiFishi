"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "../page.module.css";
import Header from "@/shared/components/Header";
import Footer from "@/shared/components/Footer";

export default function ProductsPage() {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55, ease: "easeOut" },
  } as const;

  const products = [
    { name: "SHRIMP", desc: "Premium Vannamei shrimp: headless, head-on, peeled, and custom specifications.", img: "/images/product-shrimp.png" },
    { name: "SEA CUCUMBER", desc: "Highly prized Mexican Sea Cucumber, processed under strict sanitary standards.", img: "/images/product-sea-cucumber.png" },
    { name: "FISH MAW", desc: "Top grade dried and frozen fish maw from select wild-caught Mexican species.", img: "/images/product-fish-maw.png" },
    { name: "CRAB", desc: "Versatile crab selections including Blue Crab and premium processed crabmeat.", img: "/images/product-crab.png" },
    { name: "FISH", desc: "Wild-caught premium fish filets: Grouper, Snapper, Sea Bass, and more.", img: "/images/product-fish.png" },
    { name: "OTHER SEAFOOD", desc: "Diverse Mexican seafood exports including Octopus, Squid, and Lobster.", img: "/images/product-other-seafood.png" },
  ];

  return (
    <div className={styles.page}>
      <Header activeLink="products" />

      <main>
        {/* PRODUCTS LIST */}
        <section className={styles.products} style={{ padding: "80px 0 100px 0" }}>
          <div className={styles.products__inner}>
            <motion.div className={styles.products__header} {...fadeUp} style={{ marginBottom: "60px" }}>
              <span className={styles.products__label}>OUR SEAFOOD PORTFOLIO</span>
              <h2 className={styles.products__heading}>Premium Seafood, Responsibly Sourced</h2>
              <p style={{ color: "#6B7280", marginTop: "16px", maxWidth: "600px", fontSize: "14px", lineHeight: "1.6" }}>
                Explore our export-ready catalog. All products are processed in certified facilities, utilizing top-tier IQF flash-freezing technology to preserve maximum freshness.
              </p>
            </motion.div>

            <div className={styles.products__grid}>
              {products.map((p, i) => (
                <motion.div
                  key={i}
                  className={styles.products__card}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className={styles.products__cardImage}>
                    <Image src={p.img} alt={p.name} fill className={styles.products__cardImg} />
                  </div>
                  <h3 className={styles.products__cardName}>{p.name}</h3>
                  <p className={styles.products__cardDesc}>{p.desc}</p>
                  <Link href="/login" className={styles.products__cardBtn} aria-label={`View ${p.name}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className={styles.products__ctaWrap} style={{ marginTop: "80px" }}>
              <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 30px auto" }}>
                <h4 style={{ fontSize: "18px", fontWeight: "700", color: "#0B1F33", marginBottom: "8px" }}>Looking for live pricing and placing orders?</h4>
                <p style={{ color: "#6B7280", fontSize: "14px" }}>Register or login to our B2B Ecommerce portal to request quotes and view live inventory.</p>
              </div>
              <Link href="/login" className={styles.products__cta}>
                ENTER B2B PORTAL <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className={styles.ctaBanner}>
          <div className={styles.ctaBanner__inner}>
            <div>
              <h2 className={styles.ctaBanner__heading}>
                Need custom packaging<br />or private label?
              </h2>
              <p className={styles.ctaBanner__sub}>Let&apos;s discuss customized B2B solutions.</p>
            </div>
            <Link href="mailto:sales@lacanadaseafood.com" className={styles.ctaBanner__btn}>CONTACT OUR SALES TEAM</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
