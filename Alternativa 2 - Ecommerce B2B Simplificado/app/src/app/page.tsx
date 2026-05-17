"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import Header from "@/shared/components/Header";
import Footer from "@/shared/components/Footer";

export default function LandingPage() {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55, ease: "easeOut" },
  };

  const products = [
    { name: "SHRIMP", desc: "Vannamei shrimp and specialties.", img: "/images/product-shrimp.png" },
    { name: "SEA CUCUMBER", desc: "Premium quality sea cucumbers.", img: "/images/product-sea-cucumber.png" },
    { name: "FISH MAW", desc: "High quality fish maw and products.", img: "/images/product-fish-maw.png" },
    { name: "CRAB", desc: "Versatile crab selections.", img: "/images/product-crab.png" },
    { name: "FISH", desc: "A variety of wild caught filets.", img: "/images/product-fish.png" },
    { name: "OTHER SEAFOOD", desc: "Diverse seafood products.", img: "/images/product-other-seafood.png" },
  ];

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <Header activeLink="home" />

      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.hero__content}>
            <motion.div
              className={styles.hero__text}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className={styles.hero__label}>PREMIUM MEXICAN SEAFOOD EXPORTERS</span>
              <h1 className={styles.hero__title}>
                Worldwide<br />
                Seafood<br />
                Trading
              </h1>
              <p className={styles.hero__subtitle}>
                Supplying the finest quality seafood<br />
                from Mexico to the world.
              </p>
              <div className={styles.hero__buttons}>
                <Link href="/login" className={styles.hero__btnPrimary}>
                  EXPLORE PRODUCTS <span>→</span>
                </Link>
                <Link href="#contact" className={styles.hero__btnSecondary}>
                  CONTACT SALES
                </Link>
              </div>
            </motion.div>
          </div>
          <div className={styles.hero__image}>
            <Image
              src="/images/hero-seafood.png"
              alt="Premium Mexican Seafood"
              fill
              className={styles.hero__img}
              priority
            />
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className={styles.about}>
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
                With over 30 years of experience, La Cañada Seafood is a leading Mexican seafood exporter. We are committed to providing premium quality products, sustainable sourcing, and reliable service to our customers worldwide.
              </p>
              <Link href="/about" className={styles.about__link}>
                LEARN MORE ABOUT US <span>→</span>
              </Link>
            </motion.div>
            <motion.div
              className={styles.about__right}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Image src="/images/about-fisherman.jpg" alt="Maritime Heritage" fill className={styles.about__img} />
            </motion.div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="products" className={styles.products}>
          <div className={styles.products__inner}>
            <motion.div className={styles.products__header} {...fadeUp}>
              <span className={styles.products__label}>OUR PRODUCTS</span>
              <h2 className={styles.products__heading}>Premium Seafood, Responsibly Sourced</h2>
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
                  <button className={styles.products__cardBtn} aria-label={`View ${p.name}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </div>
            <div className={styles.products__ctaWrap}>
              <Link href="/login" className={styles.products__cta}>
                ECOMMERCE <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* EXPORT SOLUTIONS */}
        <section id="solutions" className={styles.solutions}>
          <div className={styles.solutions__inner}>
            <motion.div className={styles.solutions__header} {...fadeUp}>
              <span className={styles.solutions__label}>EXPORT SOLUTIONS</span>
              <h2 className={styles.solutions__heading}>From Mexico to the World</h2>
            </motion.div>
            <div className={styles.solutions__grid}>
              {/* GLOBAL SHIPPING */}
              <motion.div className={styles.solutions__item} {...fadeUp}>
                <div className={styles.solutions__icon}>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 42c4 3 12 5 24 5s20-2 24-5" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M10 42V28l18-10 18 10v14" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M28 18v-8M20 14l8-4 8 4" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 42V32h8v10M30 42V32h8v10" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 46c4 2 12 4 24 4s20-2 24-4" stroke="#0B1F33" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
                  </svg>
                </div>
                <h4 className={styles.solutions__itemTitle}>GLOBAL SHIPPING</h4>
                <p className={styles.solutions__itemDesc}>Reliable worldwide shipping and logistics.</p>
              </motion.div>
              {/* FROZEN QUALITY */}
              <motion.div className={styles.solutions__item} {...fadeUp}>
                <div className={styles.solutions__icon}>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="28" y1="4" x2="28" y2="52" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="4" y1="28" x2="52" y2="28" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="11" y1="11" x2="45" y2="45" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="45" y1="11" x2="11" y2="45" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M28 10l-4 6h8l-4-6M28 46l-4-6h8l-4 6" stroke="#0B1F33" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 28l6-4v8l-6-4M46 28l-6-4v8l6-4" stroke="#0B1F33" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className={styles.solutions__itemTitle}>FROZEN QUALITY</h4>
                <p className={styles.solutions__itemDesc}>Advanced freezing technology.</p>
              </motion.div>
              {/* QUALITY CONTROL */}
              <motion.div className={styles.solutions__item} {...fadeUp}>
                <div className={styles.solutions__icon}>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28 6L10 14v14c0 12 8 18 18 22 10-4 18-10 18-22V14L28 6z" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 28l6 6 10-12" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className={styles.solutions__itemTitle}>QUALITY CONTROL</h4>
                <p className={styles.solutions__itemDesc}>Strict quality control through every step.</p>
              </motion.div>
              {/* SECURE PACKAGING */}
              <motion.div className={styles.solutions__item} {...fadeUp}>
                <div className={styles.solutions__icon}>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 18l20-10 20 10v20l-20 10-20-10V18z" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 18l20 10" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M28 28v20" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M48 18l-20 10" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M18 13l20 10" stroke="#0B1F33" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
                  </svg>
                </div>
                <h4 className={styles.solutions__itemTitle}>SECURE PACKAGING</h4>
                <p className={styles.solutions__itemDesc}>Safe and customized packaging solutions.</p>
              </motion.div>
              {/* EXPORT EXPERTS */}
              <motion.div className={styles.solutions__item} {...fadeUp}>
                <div className={styles.solutions__icon}>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="12" y="6" width="32" height="44" rx="2" stroke="#0B1F33" strokeWidth="1.5"/>
                    <line x1="20" y1="16" x2="36" y2="16" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="20" y1="22" x2="36" y2="22" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="20" y1="28" x2="30" y2="28" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M30 38l4 4 8-10" stroke="#0B1F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className={styles.solutions__itemTitle}>EXPORT EXPERTS</h4>
                <p className={styles.solutions__itemDesc}>Documentation and support for smooth operations.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* GLOBAL MARKETS + CERTIFICATIONS */}
        <section id="certifications" className={styles.duo}>
          <div className={styles.duo__inner}>
            <motion.div className={styles.duo__block} {...fadeUp}>
              <span className={styles.duo__label}>GLOBAL MARKETS</span>
              <h2 className={styles.duo__heading}>Our Products,<br />Around the World</h2>
              <Link href="#contact" className={styles.duo__link}>EXPLORE OUR MARKETS <span>→</span></Link>
              <div className={styles.duo__mapWrap}>
                <Image src="/images/world-map.png" alt="Global Markets Map" fill className={styles.duo__mapImg} />
              </div>
            </motion.div>
            <motion.div className={styles.duo__block} {...fadeUp}>
              <span className={styles.duo__label}>QUALITY &amp; CERTIFICATIONS</span>
              <h2 className={styles.duo__heading}>Committed to<br />Excellence</h2>
              <div className={styles.duo__certs}>
                <div className={styles.duo__certBadge}>
                  <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                    <path d="M30 5L10 12v10c0 8 6 13 20 18 14-5 20-10 20-18V12L30 5z" stroke="#0B1F33" strokeWidth="1.2"/>
                    <text x="30" y="26" textAnchor="middle" fill="#0B1F33" fontSize="7" fontWeight="700" fontFamily="Montserrat, sans-serif">HACCP</text>
                  </svg>
                </div>
                <div className={styles.duo__certBadge}>
                  <svg width="70" height="40" viewBox="0 0 70 40" fill="none">
                    <rect x="5" y="8" width="60" height="24" rx="3" stroke="#0B1F33" strokeWidth="1.2"/>
                    <text x="35" y="24" textAnchor="middle" fill="#0B1F33" fontSize="12" fontWeight="700" fontFamily="Montserrat, sans-serif">FDA</text>
                  </svg>
                </div>
                <div className={styles.duo__certBadge}>
                  <svg width="90" height="40" viewBox="0 0 90 40" fill="none">
                    <circle cx="16" cy="20" r="10" stroke="#2E7D32" strokeWidth="1.2"/>
                    <path d="M12 20l3 3 6-8" stroke="#2E7D32" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <text x="55" y="24" textAnchor="middle" fill="#2E7D32" fontSize="9" fontWeight="700" fontFamily="Montserrat, sans-serif">SENASICA</text>
                  </svg>
                </div>
              </div>
              <Link href="/certifications" className={styles.duo__link}>VIEW ALL CERTIFICATIONS <span>→</span></Link>
            </motion.div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section id="contact" className={styles.ctaBanner}>
          <div className={styles.ctaBanner__inner}>
            <div>
              <h2 className={styles.ctaBanner__heading}>
                Looking for a reliable<br />seafood supplier?
              </h2>
              <p className={styles.ctaBanner__sub}>Let&apos;s build a successful partnership.</p>
            </div>
            <Link href="mailto:sales@lacanadaseafood.com" className={styles.ctaBanner__btn}>CONTACT OUR SALES TEAM</Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
