import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/api";
import TechVisual from "@/components/TechVisual";
import ArchitectureMap from "@/components/ArchitectureMap";

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  let project;
  try {
    project = await getProjectBySlug(params.slug);
  } catch {
    project = null;
  }
  if (!project) notFound();

  return (
    <article className="page-shell mx-auto max-w-4xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-signal">Étude de cas</p>
      <h1 className="mt-3 font-display text-4xl text-cream md:text-5xl">{project.title}</h1>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech_stack_list.map((tech) => (
          <span key={tech} className="rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-xs text-signal">{tech}</span>
        ))}
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_0.8fr]">
        <p className="max-w-prose whitespace-pre-line text-lg leading-relaxed text-cream/80">{project.description}</p>
        <TechVisual compact />
      </div>

      <section className="mt-14 grid gap-4 border-y border-white/10 py-10 md:grid-cols-3">
        {[
          ["01 / Contexte", project.summary || "Un besoin métier concret à rendre plus simple et plus fiable."],
          ["02 / Intervention", project.role || "Conception, automatisation et intégration de la solution."],
          ["03 / Résultat", "Un flux mieux structuré, une donnée plus lisible et une équipe plus autonome."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-xl border border-white/10 bg-panel/45 p-5">
            <p className="font-mono text-xs text-brass">{title}</p>
            <p className="mt-4 text-sm leading-relaxed text-cream/65">{text}</p>
          </div>
        ))}
      </section>
      <section className="case-study-metrics mt-8 grid gap-3 sm:grid-cols-3">
        {[
          ["AVANT", "Saisie manuelle et données dispersées"],
          ["APRÈS", "Flux centralisé et décisions plus rapides"],
          ["IMPACT", "Plus de visibilité, moins de friction"],
        ].map(([label, text]) => (
          <div key={label} className="rounded-xl border border-signal/20 bg-signal/5 p-5">
            <p className="font-mono text-[10px] tracking-[0.2em] text-brass">{label}</p>
            <p className="mt-3 text-sm leading-relaxed text-cream/65">{text}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Architecture de la solution</p>
        <h2 className="mt-3 font-display text-3xl text-cream">Du terrain vers la décision.</h2>
        <p className="mt-3 max-w-prose text-cream/60">Chaque projet est pensé comme un flux : collecter, traiter, restituer. Cette structure rend la solution plus facile à expliquer, maintenir et faire évoluer.</p>
        <div className="mt-6">
          <ArchitectureMap />
        </div>
      </section>

      {project.media_items.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {project.media_items.map((m) =>
            m.media_type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={m.id} src={m.file} alt={m.caption || project.title} className="rounded-xl border border-white/10 transition duration-500 hover:scale-[1.02] hover:border-brass/50" />
            ) : (
              <video key={m.id} src={m.file} controls className="rounded-xl border border-white/10" />
            )
          )}
        </div>
      )}

      <div className="mt-10 flex gap-4">
        {project.live_url && (
          <a href={project.live_url} className="rounded-sm bg-brass px-5 py-2 text-ink" target="_blank" rel="noreferrer noopener">
            Voir en ligne
          </a>
        )}
        {project.repo_url && (
          <a href={project.repo_url} className="rounded-sm border border-white/20 px-5 py-2 text-cream" target="_blank" rel="noreferrer noopener">
            Code source
          </a>
        )}
      </div>
    </article>
  );
}
