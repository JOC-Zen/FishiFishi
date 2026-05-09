import Link from "next/link";
import React from "react";
import styles from "./Logo.module.css";

interface LogoProps {
  /** Visual variant matching brand guidelines */
  variant?: "main" | "negative" | "orange";
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS class */
  className?: string;
  /** Navigation target */
  href?: string;
}

/**
 * Logo — La Cañada Seafood brand logo component.
 *
 * Renders the logotype using the brand's serif/script font pairing
 * and an SVG quarter-sunburst icon that matches the brand sheet.
 *
 * Variants:
 * - `main`:     Navy text + Orange accent (for light backgrounds)
 * - `negative`: All white (for navy/dark backgrounds)
 * - `orange`:   All white (for orange backgrounds)
 */
export default function Logo({
  variant = "main",
  size = "md",
  className = "",
  href = "/",
}: LogoProps) {
  const variantClass = styles[`logo--${variant}`] || "";
  const sizeClass = size !== "md" ? (styles[`logo--${size}`] || "") : "";

  // Sun fill color depends on variant
  const sunFill = variant === "main" ? "#FF6A00" : "#FFFFFF";
  // Ray gap color (matches the background the logo sits on)
  const rayGap = variant === "main" ? "#FFFFFF"
    : variant === "negative" ? "#0D2438"
    : "#FF6A00";

  return (
    <Link
      href={href}
      className={`${styles.logo} ${variantClass} ${sizeClass} ${className}`.trim()}
    >
      {/* Sunburst Icon */}
      <div className={styles.logo__sun}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Quarter circle base */}
          <path
            d="M 5 100 A 95 95 0 0 1 100 5 L 100 100 Z"
            fill={sunFill}
          />
          {/* Radiating ray cutouts — 7 rays matching brand sheet */}
          <path d="M 5 100 L 8 82 L 18 88 Z" fill={rayGap} />
          <path d="M 5 100 L 15 68 L 26 76 Z" fill={rayGap} />
          <path d="M 5 100 L 28 52 L 40 62 Z" fill={rayGap} />
          <path d="M 5 100 L 42 38 L 56 50 Z" fill={rayGap} />
          <path d="M 5 100 L 58 26 L 72 40 Z" fill={rayGap} />
          <path d="M 5 100 L 74 16 L 86 30 Z" fill={rayGap} />
          <path d="M 5 100 L 88 8 L 97 20 Z" fill={rayGap} />
        </svg>
      </div>

      {/* Text */}
      <div className={styles.logo__text}>
        <span className={styles.logo__title}>La Cañada</span>
        <span className={styles.logo__subtitle}>Seafood</span>
      </div>
    </Link>
  );
}
