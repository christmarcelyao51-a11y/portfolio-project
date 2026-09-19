import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileNav from "@/components/MobileNav";

const links = [
  { href: "/projets", label: "Projets" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="relative z-20 border-b border-white/10 bg-ink/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="group flex items-center gap-3 font-display text-lg tracking-tight text-cream">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brass/50 text-sm text-brass transition duration-300 group-hover:rotate-12 group-hover:border-brass">
            CM
          </span>
          <span>Christ Marcel</span>
        </Link>
        <div className="flex items-center gap-4">
        <span className="hidden rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-signal lg:inline-flex">available / 2026</span>
        <WhatsAppButton compact />
        <nav className="hidden items-center gap-4 text-sm text-cream/70 sm:gap-7 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="relative py-2 transition-colors hover:text-brass after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-brass after:transition-all hover:after:w-full">
              {l.label}
            </Link>
          ))}
        </nav>
        <MobileNav />
        </div>
      </div>
    </header>
  );
}
