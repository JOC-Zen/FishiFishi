import type { Metadata } from "next";
import Sidebar from "@/shared/components/Sidebar";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Dashboard — FishiFishi B2B",
  description: "FishiFishi B2B platform control panel.",
};

/**
 * Dashboard Layout.
 * Wraps all pages within /dashboard with
 * the sidebar and main content structure.
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
