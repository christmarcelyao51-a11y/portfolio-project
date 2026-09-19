"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Skill } from "@/lib/api";

const fallbackSkills = [
  { id: 1, name: "Python", category: "Backend", proficiency: 92 },
  { id: 2, name: "Django", category: "Backend", proficiency: 88 },
  { id: 3, name: "AppSheet", category: "No-code", proficiency: 84 },
  { id: 4, name: "IA & automatisation", category: "Intelligence", proficiency: 86 },
  { id: 5, name: "API & data", category: "Architecture", proficiency: 82 },
  { id: 6, name: "Frontend", category: "Interface", proficiency: 76 },
];

export default function SkillGlobe({ skills }: { skills: Skill[] }) {
  const items = useMemo(() => (skills.length ? skills : fallbackSkills), [skills]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const dragStart = useRef<number | null>(null);
  const rotationStart = useRef(0);
  const active = items[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (dragStart.current === null) {
        setRotation((current) => current + 0.35);
      }
    }, 40);
    return () => window.clearInterval(timer);
  }, []);

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + items.length) % items.length);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientX;
    rotationStart.current = rotation;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    setRotation(rotationStart.current + (event.clientX - dragStart.current) * 0.7);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart.current !== null && Math.abs(event.clientX - dragStart.current) < 8) {
      move(1);
    }
    dragStart.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div className="skill-globe-panel overflow-hidden rounded-2xl border border-signal/25 bg-panel/60 p-5 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div
          className="relative mx-auto aspect-square w-full max-w-[19rem] cursor-grab touch-none select-none active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="application"
          aria-label="Globe interactif des compétences. Faites glisser pour le faire tourner."
        >
          <div
            className="skill-globe absolute inset-4 z-10 rounded-full border border-signal/60 bg-[radial-gradient(circle_at_35%_30%,rgba(199,154,69,0.32),rgba(20,32,25,0.2)_35%,rgba(13,21,18,0.95)_72%)] shadow-[0_0_70px_rgba(62,142,110,0.2)]"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="globe-meridian globe-meridian-a" />
            <div className="globe-meridian globe-meridian-b" />
            <div className="globe-equator" />
            <span className="globe-label globe-label-python">PY</span>
            <span className="globe-label globe-label-api">API</span>
            <span className="globe-label globe-label-ai">AI</span>
            <div className="absolute inset-5 rounded-full border border-dashed border-cream/20" />
            <div className="absolute inset-12 rounded-full border border-signal/30" />
            <span className="absolute left-[28%] top-[24%] h-2 w-2 rounded-full bg-brass shadow-[0_0_16px_#c79a45]" />
            <span className="absolute right-[22%] top-[38%] h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_12px_#3e8e6e]" />
            <span className="absolute bottom-[26%] left-[36%] h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_12px_#3e8e6e]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">skill map</span>
              <strong className="mt-2 block font-display text-3xl text-cream">{active.proficiency}%</strong>
            </div>
          </div>
          {items.map((skill, index) => {
            const angle = (index / items.length) * 360;
            return (
              <button
                key={skill.id}
                type="button"
                aria-label={`Afficher ${skill.name}`}
                onPointerDown={(event) => event.stopPropagation()}
                onPointerUp={(event) => {
                  event.stopPropagation();
                  setActiveIndex(index);
                }}
                onClick={() => setActiveIndex(index)}
                className={`skill-orbit absolute left-1/2 top-1/2 z-20 h-9 w-9 rounded-full border font-mono text-[9px] transition duration-300 ${index === activeIndex ? "border-brass bg-brass text-ink shadow-[0_0_20px_rgba(199,154,69,0.5)]" : "border-signal/50 bg-ink text-signal hover:border-brass"}`}
                style={{ transform: `rotate(${angle}deg) translateY(-${Math.min(145, 105 + items.length * 4)}px) rotate(-${angle}deg) translate(-50%, -50%)` }}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            );
          })}
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Explorateur de compétences</p>
          <h2 className="mt-3 font-display text-3xl text-cream md:text-4xl">Fais tourner la carte.</h2>
          <p className="mt-4 max-w-prose leading-relaxed text-cream/60">Clique sur un point du globe ou fais défiler la liste pour voir comment chaque compétence s&apos;intègre dans un projet réel.</p>
          <div className="mt-6 rounded-xl border border-white/10 bg-ink/60 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-brass">{active.category}</p>
                <h3 className="mt-2 font-display text-2xl text-cream">{active.name}</h3>
              </div>
              <span className="font-mono text-2xl text-signal">{active.proficiency}%</span>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="skill-progress h-full rounded-full bg-gradient-to-r from-signal via-brass to-cream" style={{ width: `${active.proficiency}%` }} />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <button type="button" onClick={() => move(-1)} className="rounded border border-white/15 px-4 py-2 font-mono text-xs text-cream/70 transition hover:border-brass hover:text-brass">← précédent</button>
            <button type="button" onClick={() => move(1)} className="rounded border border-white/15 px-4 py-2 font-mono text-xs text-cream/70 transition hover:border-brass hover:text-brass">suivant →</button>
          </div>
          <div className="mt-5 flex snap-x gap-2 overflow-x-auto pb-2" aria-label="Liste des compétences">
            {items.map((skill, index) => (
              <button
                key={skill.id}
                type="button"
                onPointerUp={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`shrink-0 snap-start rounded-full border px-3 py-2 text-xs transition ${index === activeIndex ? "border-brass bg-brass text-ink" : "border-white/10 text-cream/55 hover:border-signal"}`}
              >
                {skill.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
