"use client";

import React, { useState, useEffect } from "react";
import styles from "./TopBar.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (!mounted) return <div style={{ width: "24px" }} />;

  return (
    <button
      className={styles["topbar__icon-btn"]}
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      title="Cambiar Tema"
      style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "1.2rem" }}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
