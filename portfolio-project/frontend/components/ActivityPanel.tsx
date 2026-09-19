const entries = [
  { tag: "traçabilité", detail: "Fichiers de livraison cashew triés et répartis par n° CCA — Python/openpyxl" },
  { tag: "intégration", detail: "Synchronisation SAP Analytics Cloud — poids en temps réel depuis 6 unités" },
  { tag: "contenu", detail: "Pipeline vidéo FootViralX — script → miniature → publication" },
  { tag: "produit", detail: "Ebook IT publié sur Chariow, paiement → livraison automatisés via n8n" },
];

export default function ActivityPanel() {
  return (
    <div className="reveal-item relative rounded-sm border border-white/10 bg-panel/80 font-body text-sm shadow-2xl shadow-black/20 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-signal" />
          <span className="text-cream/60">Ce que j'automatise, concrètement</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-cream/30">live log</span>
      </div>
      <ul className="divide-y divide-white/5">
        {entries.map((e, index) => (
          <li key={e.tag} className="group px-4 py-4 transition-colors hover:bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-cream/30">0{index + 1}</span>
              <p className="text-brass">{e.tag}</p>
            </div>
            <p className="mt-1 text-cream/80">{e.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
