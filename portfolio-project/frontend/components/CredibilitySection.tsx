const badges = ["Python", "Django REST", "AppSheet", "API design", "AI workflows", "Data products"];

export default function CredibilitySection() {
  return (
    <section className="credibility-panel">
      <div>
        <p className="section-kicker">Pourquoi me choisir</p>
        <h2 className="mt-3 font-display text-3xl text-cream">Une vision produit, une exécution technique.</h2>
        <p className="mt-4 max-w-xl leading-relaxed text-cream/60">Je parle avec les utilisateurs, je sécurise les données et je rends la technologie compréhensible. Le résultat doit être adopté, pas seulement livré.</p>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          ["01", "Terrain d'abord", "Des interfaces pensées pour les usages réels."],
          ["02", "Code durable", "Des flux documentés, testables et maintenables."],
          ["03", "Impact mesuré", "Des indicateurs avant/après pour décider."],
        ].map(([number, title, text]) => (
          <div key={number} className="proof-card rounded-xl border border-white/10 bg-ink/40 p-5">
            <span className="font-mono text-xs text-signal">{number}</span>
            <h3 className="mt-4 font-display text-lg text-cream">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/55">{text}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 flex flex-wrap gap-2">
        {badges.map((badge) => <span key={badge} className="rounded-full border border-signal/25 bg-signal/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-signal">{badge}</span>)}
      </div>
    </section>
  );
}
