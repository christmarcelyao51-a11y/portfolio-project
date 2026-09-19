import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/api";
import TechVisual from "@/components/TechVisual";
import ArchitectureMap from "@/components/ArchitectureMap";
import WhatsAppButton from "@/components/WhatsAppButton";

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  let project;
  try {
    project = await getProjectBySlug(params.slug);
  } catch {
    project = null;
  }
  if (!project) notFound();

  return (
    <article className="page-shell relative mx-auto max-w-5xl px-6 py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Projet / étude de cas</p>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cream/40">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
          système documenté
        </span>
      </div>
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <h1 className="font-display text-4xl leading-tight text-cream md:text-6xl">{project.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/70">{project.summary}</p>
        </div>
        <TechVisual compact />
      </div>
      <div className="mt-7 flex flex-wrap gap-2">
        {project.tech_stack_list.map((tech) => (
          <span key={tech} className="rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-xs text-signal">{tech}</span>
        ))}
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
      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          ["BESOIN", "Clarifier un processus et réduire les frictions."],
          ["SOLUTION", "Un flux connecté, lisible et adapté aux utilisateurs."],
          ["IMPACT À MESURER", "Temps, qualité de donnée et adoption terrain."],
        ].map(([label, text]) => (
          <div key={label} className="rounded-xl border border-signal/20 bg-signal/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-signal/60">
            <p className="font-mono text-[10px] tracking-[0.2em] text-brass">{label}</p>
            <p className="mt-3 text-sm leading-relaxed text-cream/65">{text}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_0.75fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Le contexte</p>
          <h2 className="mt-3 font-display text-3xl text-cream">Pourquoi ce projet ?</h2>
          <p className="mt-5 whitespace-pre-line text-base leading-8 text-cream/70">{project.description}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-panel/50 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Mon intervention</p>
          <p className="mt-5 text-lg leading-relaxed text-cream/75">{project.role || "Conception, développement et intégration de la solution."}</p>
          <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm text-cream/55">
            {["Analyse du besoin", "Conception du flux", "Développement et intégration", "Transmission et amélioration"].map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <span className="font-mono text-xs text-signal">0{index + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
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
        <section className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Preuves visuelles</p>
          <h2 className="mt-3 font-display text-3xl text-cream">Le produit en situation.</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {project.media_items.map((m) =>
            m.media_type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={m.id} src={m.file} alt={m.caption || project.title} loading="lazy" decoding="async" className="rounded-xl border border-white/10 transition duration-500 hover:scale-[1.02] hover:border-brass/50" />
            ) : (
              <video key={m.id} src={m.file} controls preload="metadata" className="rounded-xl border border-white/10" />
            )
          )}
          </div>
        </section>
      )}

      <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
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
        <WhatsAppButton compact />
      </div>
    </article>
  );
}
