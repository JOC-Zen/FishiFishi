import type { Metadata } from "next";
import Sidebar from "@/shared/components/Sidebar";
import styles from "./layout.module.css";
import { getDictionary } from "@/shared/i18n/server";

export const metadata: Metadata = {
  title: "Dashboard — FishiFishi B2B",
  description: "FishiFishi B2B platform control panel.",
};

/**
 * Dashboard Layout.
 * Wraps all pages within /dashboard with
 * the sidebar and main content structure.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dict } = await getDictionary();

  return (
    <div className={styles.layout}>
      <Sidebar dict={dict} />
      <div className={styles.layout__main}>
        {children}
      </div>
    </div>
  );
}
