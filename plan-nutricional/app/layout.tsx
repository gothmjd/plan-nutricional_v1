import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plan Nutricional | Bienestar y ejercicio",
  description:
    "Consulta tu plan personalizado de alimentación, actividad física y objetivos de bienestar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
