import { getProjects, type Project } from "@/lib/api";
import TechVisual from "@/components/TechVisual";
import AmbientBackdrop from "@/components/AmbientBackdrop";
import ArchitectureMap from "@/components/ArchitectureMap";
import ProjectExplorer from "@/components/ProjectExplorer";

export const metadata = { title: "Projets — Christ Marcel" };

async function safeGetProjects(): Promise<Project[]> {
  try {
    const data = await getProjects();
    return data.results;
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await safeGetProjects();

  return (
    <section className="page-shell relative mx-auto max-w-6xl px-6 py-16">
      <AmbientBackdrop />
      <p className="text-xs uppercase tracking-[0.2em] text-signal">Sélection de travaux</p>
      <h1 className="mt-3 font-display text-4xl text-cream md:text-5xl">Projets</h1>
      <p className="mt-3 max-w-prose text-cream/70">
        Une sélection de ce que j'ai construit : automatisation métier, applications web,
        outils no-code.
      </p>
      <div className="mt-10 grid gap-8 md:grid-cols-[0.65fr_1fr] md:items-end">
        <TechVisual compact />
        <div className="grid grid-cols-2 gap-3 text-xs uppercase tracking-widest text-cream/45">
          <div className="rounded-lg border border-white/10 p-4"><span className="block text-2xl text-brass">{projects.length}</span> projets publiés</div>
          <div className="rounded-lg border border-white/10 p-4"><span className="block text-2xl text-brass">03</span> domaines métier</div>
        </div>
      </div>
      <div className="mt-10">
        {projects.length === 0 ? (
          <p className="text-cream/50">Aucun projet publié pour le moment.</p>
        ) : (
          <ProjectExplorer projects={projects} />
        )}
      </div>
      <div className="mt-16 grid gap-4 border-t border-white/10 pt-10 md:grid-cols-3">
        {[
          ["Automatisation", "Réduire les actions manuelles et sécuriser les opérations répétitives."],
          ["Applications métier", "Créer des interfaces adaptées au terrain, aux équipes et aux vrais usages."],
          ["Data & IA", "Transformer les données disponibles en signaux utiles pour décider plus vite."],
        ].map(([title, text]) => (
          <div key={title} className="tech-card rounded-xl border border-white/10 bg-panel/50 p-5 hover:border-signal/50">
            <h2 className="font-display text-xl text-cream">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/60">{text}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <ArchitectureMap />
      </div>
    </section>
  );
}
