export default function TechVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`tech-grid group relative overflow-hidden rounded-2xl border border-signal/25 bg-panel/80 ${compact ? "h-48" : "h-72"}`}>
      <img src="/tech-dashboard.svg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-screen transition duration-700 group-hover:scale-105" />
      <div className="scan-line absolute left-0 right-0 top-0 h-px bg-signal shadow-[0_0_18px_#3e8e6e]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(62,142,110,0.16),transparent_55%)]" />
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brass/60 shadow-[0_0_35px_rgba(199,154,69,0.18)]">
        <div className="absolute inset-3 rounded-full border border-dashed border-signal/70" />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass shadow-[0_0_16px_#c79a45]" />
      </div>
      {[["18%", "25%"], ["76%", "28%"], ["22%", "74%"], ["79%", "70%"]].map(([left, top], index) => (
        <span key={`${left}-${top}`} className="data-pulse absolute h-2 w-2 rounded-full bg-signal shadow-[0_0_14px_#3e8e6e]" style={{ left, top, animationDelay: `${index * 280}ms` }} />
      ))}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-cream/45">
        <span>pipeline_status: online</span>
        <span className="text-signal">98.4%</span>
      </div>
    </div>
  );
}
