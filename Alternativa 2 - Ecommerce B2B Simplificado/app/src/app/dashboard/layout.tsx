import type { Metadata } from "next";
import Sidebar from "@/shared/components/Sidebar";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Dashboard — FishiFishi B2B",
  description: "Panel de control de la plataforma B2B FishiFishi.",
};

/**
 * Layout del Dashboard.
 * Envuelve todas las páginas dentro de /dashboard con
 * la barra lateral y la estructura principal.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.layout__main}>
        {children}
      </div>
    </div>
  );
}
