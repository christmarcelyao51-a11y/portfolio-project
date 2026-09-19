const whatsappUrl = "https://wa.me/2250564453901?text=Bonjour%20Christ%2C%20je%20souhaite%20%C3%A9changer%20sur%20un%20projet.";

export default function WhatsAppButton({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={`inline-flex items-center gap-2 rounded-full border border-[#25D366]/45 bg-[#25D366]/10 font-medium text-[#8ff0b1] transition duration-300 hover:-translate-y-1 hover:border-[#25D366] hover:bg-[#25D366] hover:text-[#062b16] ${compact ? "px-3 py-2 text-xs" : "px-5 py-3 text-sm"}`}
      aria-label="Me contacter sur WhatsApp"
    >
      <span className="grid h-5 w-5 place-items-center rounded-full bg-[#25D366] text-[10px] font-bold text-[#062b16]">W</span>
      <span>WhatsApp</span>
    </a>
  );
}
