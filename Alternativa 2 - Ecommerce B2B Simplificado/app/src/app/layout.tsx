import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import "@/shared/styles/components.css";
import { getDictionary } from "@/shared/i18n/server";
import { I18nProvider } from "@/shared/i18n/I18nProvider";

export const metadata: Metadata = {
  title: "La Cañada Seafood — Global. Trade Smart.",
  description:
    "Global B2B platform for seafood wholesale order management, inventory, and volume-based pricing.",
};

import { Providers } from "./providers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { dict, locale } = await getDictionary();

  return (
    <html lang={locale}>
      <body>
        <I18nProvider dict={dict} locale={locale}>
          <Providers>{children}</Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
