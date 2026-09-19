"use server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export interface ContactResult {
  ok: boolean;
  message: string;
}

/**
 * Server Action for the contact form. Runs on the server, so:
 * - the visitor's browser never talks to the Django API directly for writes
 * - basic shape/length validation happens before the network call
 * - Django's own throttling (contact_form: 5/hour per IP) is the real backstop
 */
export async function submitContactMessage(
  _prevState: ContactResult | null,
  formData: FormData
): Promise<ContactResult> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !subject || message.length < 10) {
    return { ok: false, message: "Merci de remplir tous les champs (message : 10 caractères min)." };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/contact/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
      cache: "no-store",
    });

    if (res.status === 429) {
      return { ok: false, message: "Trop de tentatives. Réessaie plus tard." };
    }
    if (res.status === 502) {
      return { ok: false, message: "Message enregistré, mais l’envoi email a échoué. Réessaie plus tard." };
    }
    if (!res.ok) {
      return { ok: false, message: "Une erreur est survenue. Réessaie dans un instant." };
    }
    return { ok: true, message: "Message envoyé — merci, je reviens vers toi rapidement." };
  } catch {
    return { ok: false, message: "Impossible de contacter le serveur pour le moment." };
  }
}
