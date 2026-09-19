const logos = {
  Python: "/icons/python.svg",
  Django: "/icons/django.svg",
  Flutter: "/icons/flutter.svg",
  HTML: "/icons/html.svg",
  CSS: "/icons/css.svg",
  "Node.js": "/icons/nodejs.svg",
  AppSheet: "/icons/appsheet.svg",
} as const;

export type TechName = keyof typeof logos;

export default function TechLogo({ name, size = "md" }: { name: TechName; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-5 w-5", md: "h-7 w-7", lg: "h-10 w-10" };
  return <img src={logos[name]} alt={`${name} logo`} className={`${sizes[size]} object-contain`} />;
}
