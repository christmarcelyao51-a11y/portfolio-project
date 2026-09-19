import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LanguageIconField from "@/components/LanguageIconField";
import WhatsAppButton from "@/components/WhatsAppButton";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Christ Marcel — Développeur Python/Django & automatisation",
  description:
    "Portfolio de Christ Marcel, développeur Python et Django à Abidjan : automatisation métier, API, intégration SAP, AppSheet et outils IA.",
  applicationName: "Portfolio Christ Marcel",
  authors: [{ name: "Christ Marcel" }],
  creator: "Christ Marcel",
  publisher: "Christ Marcel",
  keywords: [
    "Christ Marcel",
    "développeur Python",
    "Django Côte d'Ivoire",
    "automatisation métier",
    "AppSheet",
    "intelligence artificielle",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Christ Marcel — Portfolio",
    title: "Christ Marcel — Python, Django & automatisation",
    description: "Des systèmes digitaux utiles, fiables et orientés impact.",
    images: [{ url: "/tech-dashboard.svg", width: 1200, height: 630, alt: "Portfolio tech de Christ Marcel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christ Marcel — Python, Django & automatisation",
    description: "Portfolio de Christ Marcel, développeur Python/Django basé à Abidjan.",
    images: ["/tech-dashboard.svg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-body bg-ink text-cream antialiased">
        <LanguageIconField />
        <Nav />
        <main className="relative z-10">{children}</main>
        <Footer />
        <WhatsAppButton floating />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Christ Marcel",
              jobTitle: "Développeur Python/Django & automatisation",
              url: siteUrl,
              email: "mailto:christmarcelyao51@gmail.com",
              address: { "@type": "PostalAddress", addressLocality: "Abidjan", addressCountry: "CI" },
              knowsAbout: ["Python", "Django", "AppSheet", "API design", "Automatisation", "Intelligence artificielle"],
              sameAs: ["https://github.com/christmarcelyao51-a11y"],
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
