import { splitTeaching, teaching } from "@/data";
import { formatMonth } from "@/lib/parsers";

export function Teaching() {
  const { courses, supervisions } = splitTeaching(teaching);

  return (
    <section id="teaching" className="py-20">
      <div className="container mx-auto max-w-5xl px-6">
        <p className="font-mono text-sm text-[var(--mint)] codetag mb-3">
          03 · teaching && supervision
        </p>
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-10">
          <span className="squiggle">Passing it on</span>
        </h2>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-mono text-sm uppercase tracking-wider text-[var(--lilac)] mb-5">
              Courses taught
            </h3>
            <ul className="space-y-3">
              {courses.map((c, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-border bg-card/60 p-4 sticker-lilac"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-medium">{c.title}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {formatMonth(c.startdate)}
                      {c.enddate && c.enddate !== c.startdate
                        ? ` – ${formatMonth(c.enddate)}`
                        : ""}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {c.institute}
                    {c.city && ` · ${c.city}`}
                  </div>
                  {c.description && (
                    <p className="mt-2 text-sm">{c.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm uppercase tracking-wider text-[var(--rose)] mb-5">
              Students supervised
            </h3>
            <ul className="space-y-3">
              {supervisions.map((s, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-border bg-card/60 p-4 sticker"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-medium">{s.title}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {formatMonth(s.startdate)}
                      {s.enddate && s.enddate !== s.startdate
                        ? ` – ${formatMonth(s.enddate)}`
                        : ""}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {s.institute}
                    {s.city && ` · ${s.city}`}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
