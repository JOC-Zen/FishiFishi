import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "@/shared/styles/globals.css";
import "@/shared/styles/components.css";
import { getDictionary } from "@/shared/i18n/server";
import { I18nProvider } from "@/shared/i18n/I18nProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "La Cañada Seafood — Worldwide Seafood Trading",
  description:
    "Premium Mexican seafood exporters. Suppliers of the finest quality seafood from Mexico to the world.",
};

import { Providers } from "./providers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { dict, locale } = await getDictionary();

  return (
    <html lang={locale} className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <I18nProvider dict={dict} locale={locale}>
          <Providers>{children}</Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
