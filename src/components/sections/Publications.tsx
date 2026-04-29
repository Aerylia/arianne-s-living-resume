import { useMemo, useState } from "react";
import { publications } from "@/data";

function Sparkline() {
  const counts = useMemo(() => {
    const byYear: Record<number, number> = {};
    for (const p of publications) {
      if (!p.year) continue;
      byYear[p.year] = (byYear[p.year] ?? 0) + 1;
    }
    const years = Object.keys(byYear)
      .map(Number)
      .sort((a, b) => a - b);
    if (years.length === 0) return null;
    const min = years[0];
    const max = years[years.length - 1];
    const data: { year: number; count: number }[] = [];
    for (let y = min; y <= max; y++) data.push({ year: y, count: byYear[y] ?? 0 });
    return data;
  }, []);

  if (!counts) return null;
  const maxCount = Math.max(...counts.map((d) => d.count), 1);

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5">
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          papers per year
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {counts[0].year}–{counts[counts.length - 1].year}
        </span>
      </div>
      <div className="flex items-end gap-2 h-20">
        {counts.map((d) => (
          <div key={d.year} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-md"
              style={{
                height: `${(d.count / maxCount) * 100}%`,
                minHeight: d.count ? 4 : 0,
                background: "linear-gradient(180deg, var(--rose), var(--lilac))",
              }}
              title={`${d.year}: ${d.count}`}
            />
            <span className="font-mono text-[10px] text-muted-foreground">
              {String(d.year).slice(-2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Publications() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [copied, setCopied] = useState<string | null>(null);

  const cats = useMemo(() => {
    const set = new Set(publications.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q) ||
        String(p.year).includes(q)
      );
    });
  }, [query, cat]);

  const copy = async (key: string, raw: string) => {
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <section id="publications" className="py-20">
      <div className="container mx-auto max-w-5xl px-6">
        <p className="font-mono text-sm text-[var(--mint)] codetag mb-3">
          04 · publications.bib
        </p>
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">
          <span className="squiggle">Things I&rsquo;ve written</span>
        </h2>

        <div className="grid gap-4 md:grid-cols-[2fr_1fr] mb-6">
          <Sparkline />
          <div className="rounded-2xl border border-border bg-card/60 p-5 flex flex-col justify-center">
            <div className="font-display text-3xl">
              {publications.length}
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              total entries in publications.bib
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search title, author, year…"
            className="flex-1 min-w-[200px] rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-mono outline-none focus:border-[var(--mint)]"
          />
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-3 py-1.5 font-mono text-xs transition ${
                  cat === c
                    ? "border-[var(--rose)] bg-[var(--rose)]/15 text-[var(--rose)]"
                    : "border-border text-muted-foreground hover:border-[var(--mint)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <ul className="space-y-3">
          {filtered.map((p) => (
            <li
              key={p.key}
              className="rounded-2xl border border-border bg-card/60 p-5 transition hover:border-[var(--lilac)]"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <span className="font-mono text-xs text-[var(--mint)]">
                  [{p.key}] {p.year || "n.d."}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {p.category}
                </span>
              </div>
              <h3 className="text-lg font-display font-semibold leading-snug">
                {p.title || "(untitled)"}
              </h3>
              {p.authors && (
                <p
                  className="mt-1 text-sm text-foreground/85"
                  dangerouslySetInnerHTML={{
                    __html: p.authors.replace(
                      /(Arianne[^,]*Meijer[^,]*van de Griend|Adriana[^,]*Meijer[^,]*van de Griend)/gi,
                      "<strong style='color:var(--rose)'>$1</strong>",
                    ),
                  }}
                />
              )}
              {p.venue && (
                <p className="mt-1 text-sm italic text-muted-foreground">
                  {p.venue}
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {p.doi && (
                  <a
                    href={`https://doi.org/${p.doi}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs hover:border-[var(--mint)]"
                  >
                    DOI
                  </a>
                )}
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs hover:border-[var(--lilac)]"
                  >
                    PDF / link
                  </a>
                )}
                <button
                  onClick={() => copy(p.key, p.raw)}
                  className="rounded-full border border-[var(--rose)]/50 bg-[var(--rose)]/10 px-3 py-1 font-mono text-xs text-[var(--rose)] hover:bg-[var(--rose)]/20"
                >
                  {copied === p.key ? "✓ copied" : "Copy BibTeX"}
                </button>
              </div>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-mono text-sm py-10">
            // no results — try another query
          </p>
        )}
      </div>
    </section>
  );
}
