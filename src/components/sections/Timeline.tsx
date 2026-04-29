import { timeline } from "@/data";
import { formatMonth } from "@/lib/parsers";

export function Timeline() {
  return (
    <section id="timeline" className="py-20">
      <div className="container mx-auto max-w-5xl px-6">
        <p className="font-mono text-sm text-[var(--mint)] codetag mb-3">
          02 · career && education
        </p>
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-10">
          <span className="squiggle">A timeline</span>, traced like a circuit
        </h2>

        <ol className="relative ml-3 border-l-2 border-dashed border-[var(--lilac)]/40 pl-6 md:pl-10 space-y-6">
          {timeline.map((t, i) => {
            const dotColor =
              t.kind === "education" ? "var(--mint)" : "var(--rose)";
            return (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[2.05rem] md:-left-[2.85rem] top-2 grid h-5 w-5 place-items-center rounded-full border-2 border-background"
                  style={{ backgroundColor: dotColor }}
                  aria-hidden
                />
                <div
                  className={`group rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm transition hover:-translate-y-0.5 ${
                    t.kind === "education" ? "sticker-mint" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg md:text-xl font-display font-semibold">
                      {t.title}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {formatMonth(t.start)} → {formatMonth(t.end)}
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-xs uppercase tracking-wider"
                       style={{ color: dotColor }}>
                    {t.kind}
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
      </div>
    </section>
  );
}
