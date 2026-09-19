import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-shell mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">404 / signal perdu</p>
      <h1 className="mt-5 font-display text-6xl text-cream">Page introuvable.</h1>
      <p className="mx-auto mt-5 max-w-prose leading-relaxed text-cream/60">Cette route n'existe pas encore. Revenons au centre du système.</p>
      <Link href="/" className="mt-8 inline-flex rounded-sm bg-brass px-6 py-3 font-medium text-ink transition hover:-translate-y-1 hover:shadow-lg hover:shadow-brass/20">Retour à l'accueil</Link>
    </section>
  );
}
