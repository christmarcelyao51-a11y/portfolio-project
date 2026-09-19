import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LanguageIconField from "@/components/LanguageIconField";

export const metadata: Metadata = {
  title: "Christ Marcel — Développeur Python/Django & automatisation",
  description:
    "Portfolio de Christ Marcel : automatisation, intégration SAP, applications web — Côte d'Ivoire.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-body bg-ink text-cream antialiased">
        <LanguageIconField />
        <Nav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
