"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/projets", label: "Projets" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button type="button" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream">
        <span className="font-mono text-sm">{open ? "×" : "≡"}</span>
      </button>
      {open && (
        <nav className="mobile-menu absolute inset-x-4 top-[4.5rem] rounded-xl border border-signal/25 bg-panel/95 p-4 shadow-2xl backdrop-blur-xl">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block border-b border-white/10 px-3 py-3 text-sm text-cream/75 last:border-0 hover:text-brass">{link.label}</Link>)}
        </nav>
      )}
    </div>
  );
}
