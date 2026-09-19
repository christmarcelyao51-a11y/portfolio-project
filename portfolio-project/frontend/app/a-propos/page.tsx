import { getProfile, type Profile } from "@/lib/api";
import TechVisual from "@/components/TechVisual";
import AmbientBackdrop from "@/components/AmbientBackdrop";
import CodeTerminal from "@/components/CodeTerminal";
import ArchitectureMap from "@/components/ArchitectureMap";
import ImpactProof from "@/components/ImpactProof";

export const metadata = { title: "À propos — Christ Marcel" };

async function safeGetProfile(): Promise<Profile | null> {
  try {
    return await getProfile();
  } catch {
    return null;
  }
}

export default async function AboutPage() {
  const profile = await safeGetProfile();

  return (
    <section className="page-shell relative mx-auto max-w-5xl px-6 py-16">
      <AmbientBackdrop position="left" />
      <p className="text-xs uppercase tracking-[0.2em] text-signal">Parcours & méthode</p>
      <h1 className="mt-3 font-display text-4xl text-cream md:text-5xl">À propos</h1>
      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-center">
        <div>
          <p className="max-w-prose text-lg leading-relaxed text-cream/80">
            {profile?.bio ||
              "Développeur Python/Django basé en Côte d'Ivoire, je conçois des outils d'automatisation pour des besoins métier concrets — traçabilité agro-industrielle, intégration SAP, et applications web modernes."}
          </p>
          {profile?.location && <p className="mt-6 text-signal">{profile.location}</p>}
        </div>
        <TechVisual compact />
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {["Comprendre le terrain", "Modéliser la donnée", "Livrer simplement"].map((title, index) => (
          <div key={title} className="tech-card rounded-xl border border-white/10 bg-panel/60 p-5 hover:border-brass/50">
            <span className="font-mono text-xs text-brass">0{index + 1}</span>
            <h2 className="mt-8 font-display text-xl text-cream">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-cream/55">Une approche pragmatique, documentée et pensée pour durer.</p>
          </div>
        ))}
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <CodeTerminal />
        <ArchitectureMap />
      </div>
      <div className="code-atmosphere mt-14 min-h-56 overflow-hidden rounded-2xl border border-signal/20 p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">engineering mindset</p>
        <p className="mt-5 max-w-xl font-display text-3xl text-cream">Construire peu, mais construire juste.</p>
      </div>
      <div className="mt-14">
        <ImpactProof />
      </div>
      <div className="mt-10 flex flex-wrap gap-6 text-cream/70">
        {profile?.github_url && <a href={profile.github_url} className="hover:text-brass">GitHub</a>}
        {profile?.linkedin_url && <a href={profile.linkedin_url} className="hover:text-brass">LinkedIn</a>}
        {profile?.email && <a href={`mailto:${profile.email}`} className="hover:text-brass">{profile.email}</a>}
      </div>
      <div className="mt-14 grid gap-6 border-t border-white/10 pt-10 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-signal">Ce que je cherche à résoudre</p>
          <p className="mt-4 leading-relaxed text-cream/65">Les informations qui dorment dans des fichiers, les opérations qui dépendent d'une seule personne et les équipes qui manquent de visibilité sur leurs propres données.</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-signal">Ce que vous obtenez</p>
          <p className="mt-4 leading-relaxed text-cream/65">Une solution progressive, compréhensible par les équipes et suffisamment robuste pour évoluer avec le métier.</p>
        </div>
      </div>
    </section>
  );
}
