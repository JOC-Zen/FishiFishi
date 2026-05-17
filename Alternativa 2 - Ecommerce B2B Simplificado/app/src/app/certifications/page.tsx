"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "../page.module.css";
import Header from "@/shared/components/Header";
import Footer from "@/shared/components/Footer";

export default function CertificationsPage() {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55, ease: "easeOut" },
  };

  const certifications = [
    {
      name: "HACCP",
      fullTitle: "Hazard Analysis Critical Control Point",
      desc: "Our processing plants strictly operate under HACCP protocols. This preventive food safety system monitors every phase of processing, ensuring that biological, chemical, and physical hazards are completely mitigated.",
      badge: (
        <svg width="120" height="80" viewBox="0 0 60 40" fill="none">
          <path d="M30 5L10 12v10c0 8 6 13 20 18 14-5 20-10 20-18V12L30 5z" stroke="#0B1F33" strokeWidth="1.5" />
          <text x="30" y="25" textAnchor="middle" fill="#0B1F33" fontSize="8" fontWeight="700" fontFamily="Montserrat, sans-serif">HACCP</text>
        </svg>
      ),
    },
    {
      name: "FDA COMPLIANT",
      fullTitle: "U.S. Food & Drug Administration",
      desc: "We are fully registered with the United States FDA. Every single export shipment strictly conforms to all relevant import specifications, sanitary standards, and labeling requirements.",
      badge: (
        <svg width="120" height="80" viewBox="0 0 70 40" fill="none">
          <rect x="5" y="8" width="60" height="24" rx="3" stroke="#0B1F33" strokeWidth="1.5" />
          <text x="35" y="24" textAnchor="middle" fill="#0B1F33" fontSize="12" fontWeight="700" fontFamily="Montserrat, sans-serif">FDA</text>
        </svg>
      ),
    },
    {
      name: "SENASICA",
      fullTitle: "Servicio Nacional de Sanidad, Inocuidad y Calidad Agroalimentaria",
      desc: "Certified by Mexico's federal authority for agriculture and fisheries, SENASICA ensures our facilities fulfill the highest national standards for sanitation, hygiene, and safe biological processing practices.",
      badge: (
        <svg width="120" height="80" viewBox="0 0 90 40" fill="none">
          <circle cx="16" cy="20" r="10" stroke="#2E7D32" strokeWidth="1.5" />
          <path d="M12 20l3 3 6-8" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="55" y="24" textAnchor="middle" fill="#2E7D32" fontSize="9" fontWeight="700" fontFamily="Montserrat, sans-serif">SENASICA</text>
        </svg>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <Header activeLink="certifications" />

      <main>
        {/* HERO HEADER FOR CERTIFICATIONS */}
        <section className={styles.duo} style={{ padding: "80px 0 60px 0" }}>
          <div className={styles.duo__inner} style={{ gap: "40px" }}>
            <motion.div className={styles.duo__block} {...fadeUp}>
              <span className={styles.duo__label}>UNCOMPROMISING STANDARDS</span>
              <h2 className={styles.duo__heading}>Committed to Quality &amp; Safety</h2>
              <p style={{ color: "#6B7280", marginTop: "16px", fontSize: "14px", lineHeight: "1.7" }}>
                At La Cañada Seafood, quality is not just a checkbox; it is the cornerstone of our company legacy. We implement strict quality control from raw materials harvesting up to global cold-chain distribution.
              </p>
              <p style={{ color: "#6B7280", marginTop: "12px", fontSize: "14px", lineHeight: "1.7" }}>
                Our certifications assure partners worldwide that they are receiving premium seafood produced under the most stringent international standards.
              </p>
            </motion.div>
            <motion.div className={styles.duo__block} {...fadeUp} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className={styles.duo__certs} style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
                {/* HACCP SVG Icon */}
                <div className={styles.duo__certBadge}>
                  <svg width="70" height="50" viewBox="0 0 60 40" fill="none">
                    <path d="M30 5L10 12v10c0 8 6 13 20 18 14-5 20-10 20-18V12L30 5z" stroke="#0B1F33" strokeWidth="1.5" />
                    <text x="30" y="26" textAnchor="middle" fill="#0B1F33" fontSize="8" fontWeight="700" fontFamily="Montserrat, sans-serif">HACCP</text>
                  </svg>
                </div>
                {/* FDA SVG Icon */}
                <div className={styles.duo__certBadge}>
                  <svg width="80" height="50" viewBox="0 0 70 40" fill="none">
                    <rect x="5" y="8" width="60" height="24" rx="3" stroke="#0B1F33" strokeWidth="1.5" />
                    <text x="35" y="24" textAnchor="middle" fill="#0B1F33" fontSize="12" fontWeight="700" fontFamily="Montserrat, sans-serif">FDA</text>
                  </svg>
                </div>
                {/* SENASICA SVG Icon */}
                <div className={styles.duo__certBadge}>
                  <svg width="100" height="50" viewBox="0 0 90 40" fill="none">
                    <circle cx="16" cy="20" r="10" stroke="#2E7D32" strokeWidth="1.5"/>
                    <path d="M12 20l3 3 6-8" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <text x="55" y="24" textAnchor="middle" fill="#2E7D32" fontSize="9" fontWeight="700" fontFamily="Montserrat, sans-serif">SENASICA</text>
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* DETAILED STANDARD ITEMS */}
        <section className={styles.solutions} style={{ background: "#F9FAFB", padding: "100px 0" }}>
          <div className={styles.solutions__inner}>
            <motion.div className={styles.solutions__header} {...fadeUp} style={{ textAlign: "center", marginBottom: "60px" }}>
              <span className={styles.solutions__label}>OUR CREDENTIALS</span>
              <h2 className={styles.solutions__heading}>Certified Safety &amp; Tracing</h2>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px", maxWidth: "800px", margin: "0 auto" }}>
              {certifications.map((c, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  style={{
                    background: "#FFFFFF",
                    padding: "40px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
                    border: "1px solid #E5E7EB",
                    display: "flex",
                    gap: "30px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flexShrink: 0 }}>
                    {c.badge}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0B1F33", marginBottom: "4px" }}>{c.name}</h3>
                    <h4 style={{ fontSize: "12px", fontWeight: "600", color: "#1D5C8C", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "12px" }}>{c.fullTitle}</h4>
                    <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: "1.6" }}>{c.desc}</p>
                  </div>
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
                Looking for audit reports<br />or phytosanitary logs?
              </h2>
              <p className={styles.ctaBanner__sub}>We provide full traceability records upon request.</p>
            </div>
            <Link href="mailto:sales@lacanadaseafood.com" className={styles.ctaBanner__btn}>
              REQUEST DOCUMENTATION
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
