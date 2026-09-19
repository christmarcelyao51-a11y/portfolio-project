import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/projets`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/a-propos`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.8 },
  ];

  try {
    const { results } = await getProjects();
    routes.push(
      ...results.map((project) => ({
        url: `${siteUrl}/projets/${project.slug}`,
        lastModified: project.created_at,
        changeFrequency: "monthly" as const,
        priority: project.featured ? 0.85 : 0.6,
      })),
    );
  } catch {
    // The core routes remain available when the API is offline during build.
  }

  return routes;
}
