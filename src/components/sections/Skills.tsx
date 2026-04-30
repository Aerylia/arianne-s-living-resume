import { skills, languages, programmingLanguages } from "@/data";

const groupColor: Record<string, string> = {
  research: "var(--lilac)",
  soft: "var(--mint)",
  creative: "var(--rose)",
};

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto max-w-5xl px-6">
        <p className="font-mono text-sm text-[var(--mint)] codetag mb-3">
          01 · skills && languages
        </p>
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-10">
          <span className="squiggle">Things I&rsquo;m good at</span> &amp; languages I speak
        </h2>

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-5">
              Skills
            </h3>
            <ul className="space-y-4">
              {skills.map((s) => (
                <li key={s.name}>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-sm md:text-base">{s.name}</span>
                    <span
                      className="font-mono text-xs"
                      style={{ color: groupColor[s.group] }}
                    >
                      {s.group}
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary/50">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${s.level}%`,
                        background: `linear-gradient(90deg, ${groupColor[s.group]}, var(--rose))`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-5">
              Spoken languages
            </h3>
            <ul className="space-y-4">
              {languages.map((l) => (
                <li key={l.name} className="flex items-center justify-between">
                  <div>
                    <div className="text-base">{l.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {l.label}
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor:
                            i < l.level ? "var(--mint)" : "color-mix(in oklab, var(--mint) 20%, transparent)",
                        }}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mt-10 mb-5">
              Programming languages
            </h3>
            <ul className="space-y-4">
              {programmingLanguages.map((l) => (
                <li key={l.name} className="flex items-center justify-between">
                  <div>
                    <div className="text-base">{l.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {l.label}
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="h-3 w-3 rounded-sm rotate-45"
                        style={{
                          backgroundColor:
                            i < l.level ? "var(--lilac)" : "color-mix(in oklab, var(--lilac) 20%, transparent)",
                        }}
                      />
                    ))}
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
