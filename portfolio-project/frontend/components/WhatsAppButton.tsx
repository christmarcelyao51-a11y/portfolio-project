const whatsappUrl = "https://wa.me/2250564453901?text=Bonjour%20Christ%2C%20je%20souhaite%20%C3%A9changer%20sur%20un%20projet.";

type WhatsAppButtonProps = {
  compact?: boolean;
  floating?: boolean;
};

export default function WhatsAppButton({ compact = false, floating = false }: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={`${floating ? "fixed bottom-5 right-5 z-40 h-14 w-14 justify-center rounded-full p-2 shadow-[0_12px_35px_rgba(37,211,102,0.28)] sm:bottom-7 sm:right-7" : "rounded-full"} inline-flex items-center gap-2 border border-[#25D366]/45 bg-[#25D366]/10 font-medium text-[#8ff0b1] transition duration-300 hover:-translate-y-1 hover:border-[#25D366] hover:bg-[#25D366] hover:text-[#062b16] ${compact ? "px-3 py-2 text-xs" : floating ? "" : "px-5 py-3 text-sm"}`}
      aria-label="Me contacter sur WhatsApp"
      title="Me contacter sur WhatsApp"
    >
      <img src="/icons/whatsapp.png" alt="" aria-hidden="true" className={floating ? "h-9 w-9" : "h-5 w-5"} />
      {!floating && <span>WhatsApp</span>}
    </a>
  );
}
