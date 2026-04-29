import { contacts, profile } from "@/data";
import avatar from "@/assets/avatar.jpg";

export function Hero() {
  return (
    <section id="about" className="relative pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container mx-auto max-w-5xl px-6">
        <p className="font-mono text-sm text-[var(--mint)] codetag mb-4">
          00 · hello_world()
        </p>
        <div className="grid items-center gap-10 md:grid-cols-[260px_1fr]">
          <div className="relative mx-auto md:mx-0">
            <div
              className="absolute -inset-3 blob bg-[var(--lilac)]/30 blur-2xl"
              aria-hidden
            />
            <div className="relative blob overflow-hidden border-2 border-[var(--rose)]/40 sticker w-56 h-56 md:w-64 md:h-64">
              <img
                src={avatar}
                alt="Portrait of Arianne Meijer - van de Griend"
                width={512}
                height={512}
                className="h-full w-full object-cover"
              />
            </div>
            {/* circuit traces */}
            <svg
              aria-hidden
              className="pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 text-[var(--mint)]"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M10 80 L40 80 L40 50 L70 50 L70 20 L95 20" />
              <circle cx="10" cy="80" r="3" fill="currentColor" />
              <circle cx="95" cy="20" r="3" fill="currentColor" />
            </svg>
          </div>

          <div>
            <h1 className="text-4xl md:text-6xl font-display font-semibold leading-[1.05]">
              <span className="squiggle">Arianne</span>{" "}
              <span className="text-[var(--rose)]">Meijer</span>
              <span className="text-muted-foreground"> — </span>
              <span className="text-[var(--lilac)]">van de Griend</span>
            </h1>
            <p className="mt-4 font-mono text-sm md:text-base text-[var(--mint)]">
              quantum_software_engineer · postdoc · creative nerd
            </p>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-foreground/85">
              {profile}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/cv_arianne_en.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--rose)] px-5 py-2.5 font-mono text-sm font-medium text-[var(--primary-foreground)] sticker hover:translate-y-[-2px] transition"
                download
              >
                ↓ Download CV
              </a>
              <a
                href={`mailto:${contacts.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 font-mono text-sm hover:border-[var(--mint)] transition"
              >
                ✉ email
              </a>
              <a
                href={contacts.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 font-mono text-sm hover:border-[var(--lilac)] transition"
              >
                ⌥ github
              </a>
              <a
                href={contacts.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 font-mono text-sm hover:border-[var(--rose)] transition"
              >
                in linkedin
              </a>
              <a
                href={contacts.orcid}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 font-mono text-sm hover:border-[var(--mint)] transition"
              >
                ⓘ orcid
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
