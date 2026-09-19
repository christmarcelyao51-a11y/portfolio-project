import Link from "next/link";
import { getProjects, getSkills, type Project, type Skill } from "@/lib/api";
import ActivityPanel from "@/components/ActivityPanel";
import TraceThread from "@/components/TraceThread";
import ProjectCard from "@/components/ProjectCard";
import SkillBar from "@/components/SkillBar";
import SkillGlobe from "@/components/SkillGlobe";
import TechVisual from "@/components/TechVisual";
import AmbientBackdrop from "@/components/AmbientBackdrop";
import CodeTerminal from "@/components/CodeTerminal";
import ArchitectureMap from "@/components/ArchitectureMap";
import ImpactProof from "@/components/ImpactProof";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroMetrics from "@/components/HeroMetrics";
import WorkflowSection from "@/components/WorkflowSection";
import CredibilitySection from "@/components/CredibilitySection";

async function safeGetProjects(): Promise<Project[]> {
  try {
    const data = await getProjects();
    return data.results.filter((p) => p.featured).slice(0, 3);
  } catch {
    return [];
  }
}

async function safeGetSkills(): Promise<Skill[]> {
  try {
    const data = await getSkills();
    return data.results;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [projects, skills] = await Promise.all([safeGetProjects(), safeGetSkills()]);

  return (
    <>
      <section className="page-shell relative mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
        <AmbientBackdrop />
        <div className="glow-orb pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-signal/10 blur-3xl" />
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-start">
          <div className="relative">
            <p className="reveal-item inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-body text-xs uppercase tracking-[0.2em] text-signal">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
              Abidjan, Côte d'Ivoire
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-cream md:text-7xl">
              Christ Marcel
              <br />
              <span className="italic text-brass">automatise</span>
              <span className="block text-cream/90">le travail réel.</span>
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-cream/70">
              Développeur Python/Django. Je construis des outils qui relient le terrain à la
              donnée — de la traçabilité cashew à l'analytique SAP — et des applications web
              modernes de bout en bout.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/projets" className="shine-sweep rounded-sm bg-brass px-6 py-3 font-body font-medium text-ink transition duration-300 hover:-translate-y-1 hover:bg-brass/90 hover:shadow-[0_12px_30px_rgba(199,154,69,0.2)]">
                Voir les projets
              </Link>
              <Link href="/contact" className="rounded-sm border border-white/20 px-6 py-3 text-cream transition duration-300 hover:-translate-y-1 hover:border-brass hover:text-brass">
                Me contacter
              </Link>
              <WhatsAppButton compact />
            </div>
            <HeroMetrics />
          </div>
          <div className="space-y-4">
            <TechVisual />
            <ActivityPanel />
          </div>
        </div>
      </section>

      <TraceThread />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <CodeTerminal />
          <ArchitectureMap />
        </div>
        <div className="mt-8 overflow-hidden border-y border-white/10 py-4">
          <div className="tech-marquee flex w-max gap-8 font-mono text-xs uppercase tracking-[0.25em] text-cream/35">
            <span>Python</span><span>•</span><span>Django</span><span>•</span><span>AppSheet</span><span>•</span><span>API design</span><span>•</span><span>AI workflows</span>
            <span>Python</span><span>•</span><span>Django</span><span>•</span><span>AppSheet</span><span>•</span><span>API design</span><span>•</span><span>AI workflows</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <ImpactProof />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <WorkflowSection />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-signal">Une approche orientée impact</p>
          <h2 className="mt-3 font-display text-3xl text-cream md:text-4xl">Des systèmes qui transforment les opérations.</h2>
          <p className="mt-4 leading-relaxed text-cream/65">Je pars d'un problème concret, je clarifie le flux de travail, puis je construis une solution mesurable : moins de saisie manuelle, plus de visibilité et des décisions plus rapides.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["01 / Observer", "Comprendre les équipes, les contraintes et les données disponibles avant de coder."],
            ["02 / Automatiser", "Connecter Python, Django, AppSheet et les outils IA dans un flux cohérent."],
            ["03 / Mesurer", "Suivre les résultats avec des indicateurs simples, lisibles et actionnables."],
          ].map(([title, text]) => (
            <article key={title} className="tech-card rounded-xl border border-white/10 bg-panel/50 p-6 hover:border-signal/50">
              <h3 className="font-mono text-sm text-brass">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-cream/65">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <CredibilitySection />
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 py-12 sm:grid-cols-3">
        {[
          ["06+", "années à construire"],
          ["24/7", "automatisations fiables"],
          ["∞", "idées à transformer"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-panel/60 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-signal/50">
            <p className="font-display text-4xl text-brass">{value}</p>
            <p className="mt-2 text-sm text-cream/55">{label}</p>
          </div>
        ))}
      </section>

      {projects.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-3xl text-cream">Projets en avant</h2>
          <div className="mt-8">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Stack opérationnelle</p>
              <h2 className="mt-3 font-display text-3xl text-cream">Compétences</h2>
            </div>
            <span className="hidden font-mono text-xs text-cream/35 sm:block">scroll / click to explore</span>
          </div>
          <SkillGlobe skills={skills} />
          {skills.length > 0 && <div className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-2">
            {skills.map((s) => <SkillBar key={s.id} skill={s} />)}
          </div>}
        </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-8">
        <div className="relative overflow-hidden rounded-2xl border border-brass/25 bg-panel/70 p-8 md:p-12">
          <div className="cursor-beam absolute left-0 top-0 h-px w-1/3 bg-brass shadow-[0_0_20px_#c79a45]" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Signal reçu / collaboration</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl text-cream md:text-4xl">Vous avez un flux métier à rendre plus intelligent ?</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-cream/65">Je transforme les tâches répétitives, les données dispersées et les idées d'outils en systèmes clairs, documentés et faciles à utiliser.</p>
          <Link href="/contact" className="mt-7 inline-flex rounded-sm border border-brass/60 px-5 py-3 text-sm text-brass transition hover:bg-brass hover:text-ink">Démarrer une discussion →</Link>
        </div>
      </section>
    </>
  );
}
