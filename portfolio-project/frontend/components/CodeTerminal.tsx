const lines = [
  ["keyword", "def"],
  ["function", " automate_workflow"],
  ["plain", "(data):"],
  ["plain", "    validated = validate(data)"],
  ["plain", "    result = pipeline.run(validated)"],
  ["keyword", "    return"],
  ["string", " result.status"],
];

export default function CodeTerminal() {
  return (
    <div className="code-terminal overflow-hidden rounded-xl border border-white/10 bg-[#0a100e] shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6259]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e6b84d]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#4fc46d]" />
        </div>
        <span className="font-mono text-[10px] text-cream/35">workflow.py</span>
      </div>
      <div className="p-5 font-mono text-xs leading-7">
        {lines.map(([kind, text], index) => (
          <div key={`${text}-${index}`} className="code-line" style={{ animationDelay: `${index * 90}ms` }}>
            <span className="mr-5 inline-block w-4 text-right text-cream/20">{index + 1}</span>
            <span className={kind === "keyword" ? "text-brass" : kind === "function" ? "text-signal" : kind === "string" ? "text-[#d6c481]" : "text-cream/70"}>{text}</span>
          </div>
        ))}
        <div className="mt-4 border-t border-white/10 pt-3 text-signal"><span className="text-cream/30">$</span> pipeline ready <span className="cursor-blink">_</span></div>
      </div>
    </div>
  );
}
