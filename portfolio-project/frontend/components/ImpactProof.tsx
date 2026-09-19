const proofPoints = [
  { value: "01", title: "Problème réel", text: "Je pars d'une friction métier observée sur le terrain, pas d'une technologie à placer." },
  { value: "02", title: "Solution utile", text: "Chaque interface simplifie une décision, une saisie ou un flux opérationnel précis." },
  { value: "03", title: "Impact visible", text: "Le résultat se lit dans le temps gagné, la qualité des données et la fiabilité du suivi." },
];

export default function ImpactProof() {
  return (
    <section className="impact-proof relative overflow-hidden rounded-2xl border border-white/10 bg-panel/70 p-6 md:p-10">
      <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-signal/10 blur-3xl" />
      <div className="relative">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Pourquoi ce portfolio mérite votre attention</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl text-cream md:text-4xl">Du code qui sert une décision.</h2>
          </div>
          <span className="rounded-full border border-brass/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-brass">case study / 2026</span>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {proofPoints.map((point) => (
            <article key={point.value} className="proof-card rounded-xl border border-white/10 bg-ink/50 p-5 transition duration-300 hover:-translate-y-1 hover:border-signal/60">
              <span className="font-mono text-xs text-brass">{point.value}</span>
              <h3 className="mt-7 font-display text-xl text-cream">{point.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/60">{point.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
