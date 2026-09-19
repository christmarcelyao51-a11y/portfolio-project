import TechLogo, { type TechName } from "@/components/TechLogo";

const languages = [
  { name: "Python", tone: "python" },
  { name: "Node.js", tone: "node" },
  { name: "HTML", tone: "html" },
  { name: "CSS", tone: "css" },
  { name: "Django", tone: "django" },
  { name: "Flutter", tone: "flutter" },
  { name: "AppSheet", tone: "appsheet" },
];

export default function LanguageIconField() {
  return (
    <div className="language-field" aria-hidden="true">
      <div className="language-grid" />
      <div className="language-radar language-radar-one" />
      <div className="language-radar language-radar-two" />
      <div className="language-orbit language-orbit-one">
        {languages.slice(0, 3).map((language) => (
          <span key={language.name} className={`language-chip language-chip-${language.tone}`}>
            <strong><TechLogo name={language.name as TechName} size="sm" /></strong>
            <small>{language.name}</small>
          </span>
        ))}
      </div>
      <div className="language-orbit language-orbit-two">
        {languages.slice(3).map((language) => (
          <span key={language.name} className={`language-chip language-chip-${language.tone}`}>
            <strong><TechLogo name={language.name as TechName} size="sm" /></strong>
            <small>{language.name}</small>
          </span>
        ))}
      </div>
    </div>
  );
}
