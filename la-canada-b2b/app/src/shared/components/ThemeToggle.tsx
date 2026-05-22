"use client";

import React, { useState, useEffect } from "react";
import styles from "./ThemeToggle.module.css";

/**
 * ThemeToggle — Switches between light and dark (Navy Blue) themes.
 *
 * Persists the user's preference in localStorage and applies
 * the `data-theme` attribute to the document root element.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Avoid hydration mismatch — render placeholder until mounted
  if (!mounted) return <div style={{ width: "40px", height: "40px" }} />;

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      title={theme === "light" ? "Modo Oscuro" : "Modo Claro"}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
