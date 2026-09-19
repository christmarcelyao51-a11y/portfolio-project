/**
 * The one bold motif of the design: a thin animated thread, echoing the
 * traceability lines the owner works with day to day (cashew delivery
 * codes routed through processing units to SAP). Used once per section
 * boundary — never scattered as generic decoration.
 */
export default function TraceThread({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      className={`h-10 w-full ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M0 30 C 200 5, 300 55, 500 30 S 800 5, 1000 30 S 1150 45, 1200 30"
        fill="none"
        stroke="#3E8E6E"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        className="thread-path"
      />
    </svg>
  );
}
