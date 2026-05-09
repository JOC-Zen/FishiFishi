import Link from "next/link";
import React from "react";

interface LogoProps {
  variant?: "main" | "negative" | "orange";
  className?: string;
  href?: string;
}

export default function Logo({ variant = "main", className = "", href = "/" }: LogoProps) {
  // Determine colors based on variant
  const isNegative = variant === "negative";
  const isOrange = variant === "orange";

  const textColorLaCanada = isNegative || isOrange ? "#FFFFFF" : "#0D2438";
  const textColorSeafood = isNegative || isOrange ? "#FFFFFF" : "#FF6A00";
  const sunColor = isNegative || isOrange ? "#FFFFFF" : "#FF6A00";

  return (
    <Link 
      href={href} 
      className={className}
      style={{ 
        display: "inline-flex", 
        alignItems: "center", 
        gap: "0.5rem", 
        textDecoration: "none",
        userSelect: "none"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", position: "relative" }}>
        {/* La Cañada */}
        <span style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontWeight: 700, 
          fontSize: "1.75rem", 
          color: textColorLaCanada,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          zIndex: 2
        }}>
          La Cañada
        </span>
        {/* Seafood */}
        <span style={{ 
          fontFamily: "'Dancing Script', cursive", 
          fontWeight: 600, 
          fontSize: "1.5rem", 
          color: textColorSeafood,
          lineHeight: 0.8,
          marginRight: "0.5rem",
          marginTop: "-0.2rem",
          zIndex: 2
        }}>
          Seafood
        </span>

        {/* Sunburst SVG */}
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 100 100" 
          style={{ 
            position: "absolute", 
            right: "-25px", 
            top: "-5px",
            zIndex: 1 
          }}
        >
          <path 
            d="M 20 100 A 80 80 0 0 1 100 20 L 100 100 Z" 
            fill={sunColor} 
          />
          {/* Cutouts for sun rays */}
          <path d="M 20 100 L 10 90 L 30 80 Z" fill={isOrange ? "#FF6A00" : isNegative ? "#0D2438" : "#FFFFFF"} />
          <path d="M 20 100 L 25 70 L 40 75 Z" fill={isOrange ? "#FF6A00" : isNegative ? "#0D2438" : "#FFFFFF"} />
          <path d="M 20 100 L 45 55 L 60 65 Z" fill={isOrange ? "#FF6A00" : isNegative ? "#0D2438" : "#FFFFFF"} />
          <path d="M 20 100 L 70 45 L 85 60 Z" fill={isOrange ? "#FF6A00" : isNegative ? "#0D2438" : "#FFFFFF"} />
          <path d="M 20 100 L 90 35 L 100 50 Z" fill={isOrange ? "#FF6A00" : isNegative ? "#0D2438" : "#FFFFFF"} />
        </svg>
      </div>
    </Link>
  );
}
