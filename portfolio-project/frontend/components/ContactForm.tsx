"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContactMessage, type ContactResult } from "@/lib/actions";

const initialState: ContactResult | null = null;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-sm bg-brass px-6 py-3 font-body font-medium text-ink transition duration-300 hover:-translate-y-1 hover:bg-brass/90 hover:shadow-[0_12px_30px_rgba(199,154,69,0.2)] disabled:cursor-wait disabled:opacity-50"
    >
      {pending ? "Envoi…" : "Envoyer"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContactMessage, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {/* Honeypot field — hidden from real visitors, catches basic bots.
          Not relied on as the sole defence: server-side throttling is. */}
      <input type="text" name="company_website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm text-cream/70">Nom</label>
          <input
            id="name"
            name="name"
            required
            maxLength={120}
            className="mt-1 w-full rounded-sm border border-white/15 bg-panel px-4 py-3 text-cream transition focus:border-brass focus:bg-panel2 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-cream/70">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            className="mt-1 w-full rounded-sm border border-white/15 bg-panel px-4 py-3 text-cream transition focus:border-brass focus:bg-panel2 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="text-sm text-cream/70">Sujet</label>
        <input
          id="subject"
          name="subject"
          required
          maxLength={160}
          className="mt-1 w-full rounded-sm border border-white/15 bg-panel px-4 py-3 text-cream transition focus:border-brass focus:bg-panel2 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm text-cream/70">Message</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={6}
          className="mt-1 w-full rounded-sm border border-white/15 bg-panel px-4 py-3 text-cream transition focus:border-brass focus:bg-panel2 focus:outline-none"
        />
      </div>

      <SubmitButton />

      {state && (
        <p className={state.ok ? "text-signal" : "text-brass"} role="status">
          {state.message}
        </p>
      )}
    </form>
  );
}
