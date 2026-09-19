/**
 * Server-side data fetching helpers.
 *
 * These run in Next.js Server Components / Route Handlers, never in the
 * browser — so the API base URL and any admin-only calls never reach
 * client-side JS. Public read endpoints are fetched at request/build time;
 * nothing here holds a long-lived credential in client state.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string;
  tech_stack_list: string[];
  role: string;
  live_url: string;
  repo_url: string;
  featured: boolean;
  media_items: { id: number; media_type: "image" | "video"; file: string; caption: string }[];
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

export interface Profile {
  full_name: string;
  headline: string;
  bio: string;
  location: string;
  avatar: string | null;
  email: string;
  github_url: string;
  linkedin_url: string;
}

async function apiGet<T>(path: string, revalidateSeconds = 60): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) {
    throw new Error(`Échec de la requête API: ${path} (${res.status})`);
  }
  return res.json();
}

export const getProfile = () => apiGet<Profile>("/profile/");
export const getProjects = () => apiGet<{ results: Project[] }>("/projects/");
export const getProjectBySlug = async (slug: string) => {
  const data = await apiGet<{ results: Project[] }>(`/projects/?slug=${slug}`);
  return data.results.find((p) => p.slug === slug) ?? null;
};
export const getSkills = () => apiGet<{ results: Skill[] }>("/skills/");
