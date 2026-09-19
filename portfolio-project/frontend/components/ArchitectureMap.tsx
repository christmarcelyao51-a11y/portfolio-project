export default function ArchitectureMap() {
  return (
    <div className="architecture-map relative overflow-hidden rounded-xl border border-signal/20 bg-panel/60 p-5">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-signal/60 to-transparent" />
      <div className="relative z-10 grid grid-cols-3 items-center gap-3 text-center font-mono text-[10px] uppercase tracking-wider">
        <div className="architecture-node rounded-lg border border-brass/40 bg-ink/90 p-4 text-brass">Terrain<br /><span className="text-cream/40">input</span></div>
        <div className="architecture-node rounded-lg border border-signal/50 bg-ink/90 p-4 text-signal">Python API<br /><span className="text-cream/40">process</span></div>
        <div className="architecture-node rounded-lg border border-white/20 bg-ink/90 p-4 text-cream">Dashboard<br /><span className="text-cream/40">decision</span></div>
      </div>
      <p className="mt-6 text-xs leading-relaxed text-cream/50">Un flux simple : capter la donnée au bon endroit, la fiabiliser, puis la rendre utile à l'équipe.</p>
    </div>
  );
}
