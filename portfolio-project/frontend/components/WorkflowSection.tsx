const steps = [
  ["01", "Observer", "Comprendre le terrain, les irritants et la donnée disponible."],
  ["02", "Modéliser", "Dessiner un flux simple avant de choisir les bons outils."],
  ["03", "Construire", "Développer une solution fiable avec Python, Django ou AppSheet."],
  ["04", "Mesurer", "Livrer des indicateurs clairs et améliorer le système en continu."],
];

export default function WorkflowSection() {
  return (
    <section className="workflow-section">
      <div className="mb-8 max-w-2xl">
        <p className="section-kicker">Méthode de livraison</p>
        <h2 className="mt-3 font-display text-3xl text-cream md:text-4xl">Du problème métier au système utile.</h2>
        <p className="mt-4 leading-relaxed text-cream/60">Une démarche lisible, documentée et orientée résultat à chaque étape.</p>
      </div>
      <div className="relative grid gap-3 md:grid-cols-4">
        <div className="workflow-line" />
        {steps.map(([number, title, text]) => (
          <article key={number} className="workflow-card">
            <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-brass/50 bg-ink font-mono text-xs text-brass">{number}</span>
            <h3 className="mt-5 font-display text-xl text-cream">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/55">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
