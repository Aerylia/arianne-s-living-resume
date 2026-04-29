import { publications, timeline } from "@/data";

function Stat({
  value,
  label,
  color,
}: {
  value: string | number;
  label: string;
  color: string;
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
    </div>
  );
}

export function Stats() {
  const yearsInQuantum = new Date().getFullYear() - 2019;
  const countries = new Set(timeline.map((t) => t.country.trim())).size;
  const pubCount = publications.length;
  const venueCount = new Set(
    publications.map((p) => p.venue.toLowerCase()).filter(Boolean),
  ).size;

  return (
    <section className="py-10">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Stat value={`${yearsInQuantum}+`} label="years in quantum" color="var(--rose)" />
          <Stat value={pubCount} label="publications" color="var(--mint)" />
          <Stat value={venueCount} label="venues" color="var(--lilac)" />
          <Stat value={countries} label="countries lived in" color="var(--coral)" />
        </div>
      </div>
    </section>
  );
}
