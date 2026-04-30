import { useMemo, useState } from "react";
import { timeline } from "@/data";
import type { TimelineCategory } from "@/data";
import { formatMonth } from "@/lib/parsers";

const ALL_CATEGORIES: TimelineCategory[] = [
  "research",
  "software engineering",
  "internship",
  "education",
  "teaching",
  "side gig",
];

// Categories visible by default — side gigs are opt-in.
const DEFAULT_ON: TimelineCategory[] = [
  "research",
  "software engineering",
  "internship",
  "education",
  "teaching",
];

const CAT_COLOR: Record<TimelineCategory, string> = {
  research: "var(--lilac)",
  "software engineering": "var(--mint)",
  internship: "var(--coral)",
  education: "var(--rose)",
  teaching: "var(--peach, var(--rose))",
  "side gig": "var(--muted-foreground)",
};

export function Timeline() {
  const [enabled, setEnabled] = useState<Set<TimelineCategory>>(
    () => new Set(DEFAULT_ON),
  );

  const counts = useMemo(() => {
    const m: Record<TimelineCategory, number> = {
      research: 0, "software engineering": 0, internship: 0, education: 0, teaching: 0, "side gig": 0,
    };
    for (const t of timeline) m[t.category]++;
    return m;
  }, []);

  const visible = timeline.filter((t) => enabled.has(t.category));

  const toggle = (c: TimelineCategory) => {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  return (
    <section id="timeline" className="py-20">
      <div className="container mx-auto max-w-5xl px-6">
        <p className="font-mono text-sm text-[var(--mint)] codetag mb-3">
          02 · career && education
        </p>
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
          <span className="squiggle">Where I&rsquo;ve been</span>, and what I was doing there
        </h2>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground mr-1">
            filter:
          </span>
          {ALL_CATEGORIES.map((c) => {
            const on = enabled.has(c);
            const color = CAT_COLOR[c];
            return (
              <button
                key={c}
                onClick={() => toggle(c)}
                aria-pressed={on}
                className="rounded-full border px-3 py-1.5 font-mono text-xs transition"
                style={{
                  borderColor: on ? color : "color-mix(in oklab, var(--border) 100%, transparent)",
                  background: on
                    ? `color-mix(in oklab, ${color} 15%, transparent)`
                    : "transparent",
                  color: on ? color : "var(--muted-foreground)",
                  opacity: on ? 1 : 0.55,
                }}
              >
                <span
                  className="inline-block h-2 w-2 rounded-full mr-1.5 align-middle"
                  style={{ background: color }}
                />
                {c} <span className="opacity-60">· {counts[c]}</span>
              </button>
            );
          })}
        </div>

        <ol className="relative ml-3 border-l-2 border-dashed border-[var(--lilac)]/40 pl-6 md:pl-10 space-y-6">
          {visible.map((t, i) => {
            const dotColor = CAT_COLOR[t.category];
            return (
              <li key={`${t.start}-${t.title}-${i}`} className="relative">
                <span
                  className="absolute -left-[2.05rem] md:-left-[2.85rem] top-2 grid h-5 w-5 place-items-center rounded-full border-2 border-background"
                  style={{ backgroundColor: dotColor }}
                  aria-hidden
                />
                <div className="group rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm transition hover:-translate-y-0.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg md:text-xl font-display font-semibold">
                      {t.title}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {formatMonth(t.start)} → {formatMonth(t.end)}
                    </span>
                  </div>
                  <div
                    className="mt-1 font-mono text-xs uppercase tracking-wider"
                    style={{ color: dotColor }}
                  >
                    {t.category}
                  </div>
                  <p className="mt-2 text-sm md:text-base">
                    {t.link ? (
                      <a
                        href={t.link}
                        target="_blank"
                        rel="noreferrer"
                        className="underline-offset-4 hover:underline"
                      >
                        {t.institute}
                      </a>
                    ) : (
                      t.institute
                    )}
                    {t.city && (
                      <span className="text-muted-foreground"> · {t.city}, {t.country}</span>
                    )}
                  </p>
                  {t.notes && (
                    <p className="mt-2 text-sm text-foreground/80">{t.notes}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {visible.length === 0 && (
          <p className="mt-6 text-center text-muted-foreground font-mono text-sm">
            // no entries match — toggle a filter back on
          </p>
        )}
      </div>
    </section>
  );
}
