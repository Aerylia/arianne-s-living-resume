import { useEffect, useState } from "react";
import { publications, timeline } from "@/data";
import { getScholarStats } from "@/server/scholar.functions";

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

  const [hIndex, setHIndex] = useState<number | null>(null);
  const [hSource, setHSource] = useState<"scholar" | "fallback" | null>(null);

  useEffect(() => {
    let cancelled = false;
    getScholarStats()
      .then((s) => {
        if (cancelled) return;
        setHIndex(s.hIndex);
        setHSource(s.source);
      })
      .catch(() => {
        if (cancelled) return;
        setHIndex(7);
        setHSource("fallback");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-10">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <Stat value={`${yearsInQuantum}+`} label="years in quantum" color="var(--rose)" />
          <Stat value={pubCount} label="publications" color="var(--mint)" />
          <Stat value={venueCount} label="venues" color="var(--lilac)" />
          <Stat value={countries} label="countries lived in" color="var(--coral)" />
          <Stat
            value={hIndex ?? "…"}
            label="h-index"
            color="var(--mint)"
            hint={hSource === "scholar" ? "live · scholar" : "cached"}
          />
        </div>
      </div>
    </section>
  );
}
