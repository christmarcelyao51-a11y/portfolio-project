import ContactForm from "@/components/ContactForm";
import TechVisual from "@/components/TechVisual";
import AmbientBackdrop from "@/components/AmbientBackdrop";
import CodeTerminal from "@/components/CodeTerminal";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = { title: "Contact — Christ Marcel" };

export default function ContactPage() {
  return (
    <section className="page-shell relative mx-auto max-w-5xl px-6 py-16">
      <AmbientBackdrop position="left" />
      <p className="text-xs uppercase tracking-[0.2em] text-signal">Parlons de votre projet</p>
      <h1 className="mt-3 font-display text-4xl text-cream md:text-5xl">Contact</h1>
      <p className="mt-3 max-w-prose text-cream/70">
        Un projet, une idée de collaboration ? Écris-moi. Donne-moi le contexte, les outils déjà utilisés et le résultat que tu veux obtenir.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <WhatsAppButton />
        <span className="font-mono text-xs text-cream/40">Réponse rapide par message</span>
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_0.7fr]">
        <ContactForm />
        <div className="space-y-5">
          <TechVisual compact />
          <div className="rounded-xl border border-white/10 bg-panel/60 p-5 text-sm text-cream/65">
            <p className="font-mono text-xs uppercase tracking-widest text-signal">Canal ouvert</p>
            <p className="mt-3 leading-relaxed">Décris ton besoin, le contexte et le résultat attendu. Je te répondrai avec une première piste claire.</p>
          </div>
        </div>
      </div>
      <div className="mt-14 border-t border-white/10 pt-8">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">Comment ça marche</p>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {["Tu décris le besoin", "On clarifie le flux", "Je propose une solution"].map((step, index) => (
            <div key={step} className="flex gap-3 text-sm text-cream/65">
              <span className="font-mono text-brass">0{index + 1}</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <CodeTerminal />
      </div>
    </section>
  );
}
