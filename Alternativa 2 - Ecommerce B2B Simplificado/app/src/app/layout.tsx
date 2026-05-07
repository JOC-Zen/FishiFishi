import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import "@/shared/styles/components.css";

export const metadata: Metadata = {
  title: "FishiFishi B2B — Wholesale Commerce Platform",
  description:
    "Simplified B2B platform for wholesale order management, inventory, and volume-based pricing.",
};

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
