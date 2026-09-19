export default function AmbientBackdrop({ position = "right" }: { position?: "left" | "right" }) {
  return (
    <div aria-hidden="true" className={`ambient-backdrop pointer-events-none absolute ${position === "left" ? "-left-32" : "-right-32"} -top-20 h-[28rem] w-[28rem]`}>
      <img src="/tech-dashboard.svg" alt="" className="h-full w-full rounded-full object-cover opacity-20 blur-[1px]" />
      <div className="absolute inset-0 rounded-full bg-signal/20 blur-3xl" />
    </div>
  );
}
