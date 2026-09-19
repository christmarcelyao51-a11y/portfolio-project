const metrics = [
  ["30+", "workflows automatisés"],
  ["93%", "temps manuel économisé"],
  ["24/7", "flux supervisés"],
];

export default function HeroMetrics() {
  return (
    <div className="mt-9 grid max-w-2xl grid-cols-3 gap-2 border-y border-white/10 py-4 sm:gap-5">
      {metrics.map(([value, label]) => (
        <div key={label} className="metric-card">
          <strong className="font-mono text-xl text-brass sm:text-2xl">{value}</strong>
          <span className="mt-1 block text-[10px] uppercase leading-4 tracking-wider text-cream/45 sm:text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}
