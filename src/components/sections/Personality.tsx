import { hobbies } from "@/data";

export function Personality() {
  return (
    <section id="personality" className="py-20">
      <div className="container mx-auto max-w-5xl px-6">
        <p className="font-mono text-sm text-[var(--mint)] codetag mb-3">
          05 · personality.exe
        </p>
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-10">
          <span className="squiggle">Outside the (non-existent) box</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] items-start">
          <blockquote className="relative rounded-3xl border border-border bg-card/70 p-8 sticker-lilac">
            <span
              aria-hidden
              className="absolute -top-4 -left-2 md:-top-6 md:-left-3 font-display text-[8rem] md:text-[10rem] text-[var(--rose)]/70 leading-none select-none"
            >
              &ldquo;
            </span>
            <p className="font-display text-xl md:text-2xl leading-snug">
              Do not try and think outside the box, that&rsquo;s impossible.
              Instead, only try to realize the truth&hellip;{" "}
              <span className="text-[var(--rose)]">There is no box.</span>
            </p>
            <footer className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              — Spoonboy, paraphrased · The Matrix (1999)
            </footer>
            <p className="mt-5 text-sm text-foreground/80">
              I love to challenge myself both creatively and intellectually.
              I particularly enjoy combining established techniques in new ways.
            </p>
          </blockquote>

          <div>
            <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Hobbies
            </h3>
            <ul className="grid grid-cols-2 gap-3">
              {hobbies.map((h, i) => (
                <li
                  key={h.name}
                  className={`flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 transition hover:-translate-y-0.5 ${
                    i % 3 === 0 ? "sticker" : i % 3 === 1 ? "sticker-mint" : "sticker-lilac"
                  }`}
                >
                  <span className="text-2xl" aria-hidden>{h.icon}</span>
                  <span className="font-medium">{h.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
