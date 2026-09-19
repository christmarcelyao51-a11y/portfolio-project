import type { Skill } from "@/lib/api";

export default function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div className="reveal-item">
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-cream/90">{skill.name}</span>
        <span className="text-cream/40">{skill.proficiency}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-1.5 rounded-full bg-gradient-to-r from-signal to-brass transition-all duration-1000 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, skill.proficiency))}%` }}
        />
      </div>
    </div>
  );
}
