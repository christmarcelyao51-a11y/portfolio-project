"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/api";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectExplorer({ projects }: { projects: Project[] }) {
  const technologies = useMemo(
    () => ["Tous", ...Array.from(new Set(projects.flatMap((project) => project.tech_stack_list)))],
    [projects],
  );
  const [activeTechnology, setActiveTechnology] = useState("Tous");
  const filteredProjects = activeTechnology === "Tous"
    ? projects
    : projects.filter((project) => project.tech_stack_list.includes(activeTechnology));

  return (
    <>
      <div className="mb-5 flex gap-2 overflow-x-auto pb-2" aria-label="Filtrer les projets par technologie">
        {technologies.map((technology) => (
          <button
            key={technology}
            type="button"
            onClick={() => setActiveTechnology(technology)}
            className={`shrink-0 rounded-full border px-4 py-2 font-mono text-xs transition ${activeTechnology === technology ? "border-brass bg-brass text-ink" : "border-white/10 text-cream/55 hover:border-signal hover:text-signal"}`}
          >
            {technology}
          </button>
        ))}
      </div>
      {filteredProjects.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-panel/40 p-6 text-cream/50">Aucun projet pour cette technologie.</p>
      ) : (
        filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)
      )}
    </>
  );
}
