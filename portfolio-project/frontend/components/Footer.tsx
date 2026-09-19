import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import TechLogo, { type TechName } from "@/components/TechLogo";

const footerLinks = [
  { href: "/", label: "Accueil" },
  { href: "/projets", label: "Projets" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 overflow-hidden border-t border-white/10 bg-ink/80">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/70 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3 text-cream">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-brass/50 font-display text-sm text-brass transition duration-300 group-hover:rotate-12 group-hover:border-brass">
                CM
              </span>
              <span className="font-display text-xl">Christ Marcel</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-cream/55">
              Je transforme les idées et les processus complexes en expériences digitales utiles, solides et élégantes.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <WhatsAppButton compact />
              <a
                href="mailto:christmarcelyao51@gmail.com"
                className="rounded-full border border-white/15 px-3 py-2 text-xs text-cream/65 transition hover:border-brass/60 hover:text-brass"
              >
                Email
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brass">Navigation</p>
            <nav className="mt-5 flex flex-col items-start gap-3 text-sm text-cream/60">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:translate-x-1 hover:text-cream">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brass">Stack & disponibilité</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {(["Python", "Django", "AppSheet"] as TechName[]).map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-cream/60">
                  <TechLogo name={item} size="sm" />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-signal">
              <span className="h-2 w-2 animate-pulse rounded-full bg-signal shadow-[0_0_12px_#3e8e6e]" />
              Disponible pour de nouveaux projets
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-cream/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Christ Marcel. Tous droits réservés.</span>
          <span className="font-mono tracking-wide">Conçu avec précision · Abidjan, CI</span>
        </div>
      </div>
    </footer>
  );
}
