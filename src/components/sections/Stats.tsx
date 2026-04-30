import { publications } from "@/data";

// Static snapshot from Google Scholar — update manually when needed.
// Source: https://scholar.google.com/citations?user=erfYRsAAAAAJ&hl=en
const SCHOLAR = { hIndex: 7, citations: 296 };

function Stat({
  value,
  label,
  color,
  hint,
}: {
  value: string | number;
  label: string;
  color: string;
  hint?: string;
}) {
  return (
    <div
      className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm"
      style={{ boxShadow: `4px 4px 0 0 ${color}` }}
    >
      <div className="font-display text-4xl font-semibold" style={{ color }}>
        {value}
      </div>
      <div className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      {hint && (
        <div className="mt-1 font-mono text-[10px] text-muted-foreground/70">
          {hint}
        </div>
      )}
    </div>
  );
}

export function Stats() {
  const yearsInQuantum = new Date().getFullYear() - 2019;
  const pubCount = publications.length;
  const venueCount = new Set(
    publications.map((p) => p.venue.toLowerCase()).filter(Boolean),
  ).size;
  // Hardcoded: Netherlands, United Kingdom, Finland — 3 countries lived in.
  const countries = 3;

  return (
    <section className="py-10">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <Stat value={`${yearsInQuantum}+`} label="years in quantum" color="var(--rose)" />
          <Stat value={pubCount} label="publications" color="var(--mint)" />
          <Stat value={venueCount} label="venues" color="var(--lilac)" />
          <Stat value={countries} label="countries lived in" color="var(--coral)" />
          <Stat
            value={SCHOLAR.hIndex}
            label="h-index"
            color="var(--mint)"
            hint={`${SCHOLAR.citations} citations · scholar`}
          />
        </div>
      </div>
    </section>
  );
}
