import Link from "next/link";
import type { Project } from "@/lib/api";

export default function ProjectCard({ project }: { project: Project }) {
  const cover = project.media_items.find((m) => m.media_type === "image");
  return (
    <Link
      href={`/projets/${project.slug}`}
      className="reveal-item group block border-b border-white/10 py-8 transition-all duration-500 hover:-translate-y-1 hover:border-brass/40 hover:bg-white/[0.025]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center">
        <div className="aspect-video w-full shrink-0 overflow-hidden rounded-sm bg-panel shadow-lg shadow-black/20 md:w-64">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover.file} alt={project.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          ) : (
            <div className="flex h-full items-center justify-center text-cream/30">{project.title[0]}</div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-2xl text-cream transition-colors group-hover:text-brass">{project.title}</h3>
          <p className="mt-2 max-w-prose text-cream/70">{project.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            <span className="text-signal">{project.tech_stack_list.join(" · ")}</span>
            {project.role && <span className="border-l border-white/15 pl-3 text-cream/40">{project.role}</span>}
          </div>
        </div>
        <span className="hidden font-mono text-xs text-brass transition-transform group-hover:translate-x-1 md:block">Ouvrir →</span>
      </div>
    </Link>
  );
}
