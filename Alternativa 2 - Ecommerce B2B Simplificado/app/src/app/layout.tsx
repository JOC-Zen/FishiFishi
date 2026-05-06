import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import "@/shared/styles/components.css";

export const metadata: Metadata = {
  title: "FishiFishi B2B — Plataforma de Comercio Mayorista",
  description:
    "Plataforma B2B simplificada para la gestión de pedidos mayoristas, inventario y precios por volumen.",
};

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
