import { contacts } from "@/data";

const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#timeline", label: "timeline" },
  { href: "#teaching", label: "teaching" },
  { href: "#publications", label: "publications" },
  { href: "#personality", label: "personality" },
];

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="container mx-auto max-w-5xl px-6 py-3 flex items-center justify-between gap-4">
        <a href="#about" className="font-display text-base font-semibold font-mono">
          <span className="text-[var(--rose)]">arianne</span>
          <span className="text-[var(--mint)]">.</span>
          <span className="text-[var(--lilac)]">meijer</span>
        </a>
        <ul className="hidden md:flex items-center gap-1 font-mono text-xs">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/cv_arianne_en.pdf"
          download
          className="rounded-full bg-[var(--rose)] px-3 py-1.5 font-mono text-xs text-[var(--primary-foreground)] hover:opacity-90"
        >
          ↓ CV
        </a>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-12">
      <div className="container mx-auto max-w-5xl px-6 grid gap-8 md:grid-cols-[1fr_auto] items-center">
        <div>
          <p className="font-display text-lg">
            Let&rsquo;s build something{" "}
            <span className="text-[var(--rose)]">weird</span> and{" "}
            <span className="text-[var(--mint)]">rigorous</span>.
          </p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            <a href={`mailto:${contacts.email}`} className="hover:text-foreground">
              {contacts.email}
            </a>
            {" · "}
            <a href={contacts.github} className="hover:text-foreground" target="_blank" rel="noreferrer">
              github/aerylia
            </a>
            {" · "}
            <a href={contacts.linkedin} className="hover:text-foreground" target="_blank" rel="noreferrer">
              linkedin/aerylia
            </a>
          </p>
          <p className="mt-4 font-mono text-[10px] text-muted-foreground">
            // hand-coded with love · {new Date().getFullYear()}
          </p>
        </div>
        <a href={contacts.orcid} target="_blank" rel="noreferrer" className="block">
          <img
            src="/orcid-qr.png"
            alt="ORCID QR code"
            width={96}
            height={96}
            loading="lazy"
            className="rounded-xl border border-border bg-cream p-1"
          />
        </a>
      </div>
    </footer>
  );
}
