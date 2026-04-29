## Goal

A single-page personal living resume that holds a **uniform tension between feminine/creative/playful and techy/nerdy/logical** — every section should feel like both halves are present, not alternating. Dark-mode pastel-punk palette, infographics used with intent, content sourced from your existing CSV/.bib/PDF.

## Visual identity: "soft circuit"

- **Background:** deep aubergine-ink `#15101F` with a faint blueprint grid + subtle hand-drawn doodle marks (sparkles, arrows, asterisks) scattered as decoration.
- **Pastel-on-dark accents:** dusty rose `#F4B6C2`, mint `#9EE6CB`, lilac `#C9B6F4`, electric coral `#FF7A6B`, soft cream text `#FBF7F2`.
- **Type pairing (the juxtaposition itself):**
  - Display headings: a chunky rounded display serif (*Fraunces*) — the feminine/creative side.
  - Section labels & data: monospace (*JetBrains Mono*) — the techy side.
  - Body: *Inter*.
  - Headings get a hand-drawn squiggle underline; section labels look like code comments (`// 02 · experience`).
- **Shapes:** soft 16–24px radii cards with sticker-style offset shadows in the accent colors; circuit-trace lines connecting some elements (timeline, hero).
- **Motion:** scroll fade-ins, gentle hover tilt on cards, bars/counters animating in. Respects `prefers-reduced-motion`.

## Page structure (single page, sticky top nav)

```text
[ sticky nav: About · Skills · Timeline · Teaching · Publications · Personality · CV ]

┌─ Hero ────────────────────────────────────────────────────────┐
│  photo (rounded blob) │ Arianne Meijer - van de Griend         │
│  with circuit-trace    │ Quantum Software Engineer · Postdoc   │
│  decoration            │ short tagline from personal_profile   │
│                        │ contact icon row · [Download CV]      │
└───────────────────────────────────────────────────────────────┘

┌─ About ─ short prose + 4 mini-stat tiles ─────────────────────┐
│  e.g. years in quantum · papers · talks · countries lived in   │

┌─ Skills & Languages (purposeful infographic) ─────────────────┐
│  pastel skill bars (Quantum compilation, Python, ML, …)        │
│  language proficiency dots (EN pro, NL native, DE int, FI beg) │

┌─ Career & Education timeline ─────────────────────────────────┐
│  vertical timeline merging both, color-coded, click to expand  │
│  notes/thesis/supervisors                                       │

┌─ Teaching ─ TWO sub-sections ─────────────────────────────────┐
│  · Courses taught   (card grid from teaching.csv)              │
│  · Students supervised (separate list/grid; thesis + role)     │

┌─ Publications ────────────────────────────────────────────────┐
│  search · filters (year, venue type, keyword)                  │
│  per-entry: title, authors (you bolded), venue, year, links    │
│  buttons: [DOI] [PDF] [Copy BibTeX]                            │
│  small infographic header: papers per year sparkline           │

┌─ Personality ─────────────────────────────────────────────────┐
│  the Spoonboy/Matrix quote, displayed as a pull-quote          │
│  hobby tiles: Puzzling · Baking · Swimming · Knitting ·        │
│               Beat Saber · Miniature painting (with icons)     │

┌─ Footer ─ contact, ORCID + QR, "made with ♥" ─────────────────┘
```

## Where infographics earn their place

Used only where they add real signal — not decoration:

1. **About stats tiles** — quick scannable career-at-a-glance numbers.
2. **Skill bars + language dots** — direct port of the CV's bar chart.
3. **Career timeline** — the chronology IS the infographic; circuit-trace spine, color dot per role type.
4. **Publications-per-year sparkline** above the publications list — at-a-glance research output.
5. **Hobby tiles** — icon + label grid (no bars), playful counterpoint to the data-heavy sections above.

Everything else stays as clean typographic content so the infographics don't feel like clutter.

## Teaching section split

Parsed from `teaching.csv`. I'll add a `type` distinction (course vs supervision); if the CSV doesn't already separate them, I'll heuristically split (e.g. rows mentioning a thesis/student name → supervision) and you can adjust the data file after.

- **Courses taught:** card grid — course name, role, institution, term, level.
- **Students supervised:** list — student name, thesis title, level (BSc/MSc/PhD), year, your role (main/co-supervisor).

## Content sources (bundled)

- `education.csv`, `experience.csv`, `teaching.csv`, `publications.bib`, `personal_profile.txt`, `cv_arianne_en.pdf`, `ORCID_QR_code.png` — copied into `src/data/` (and `public/` for the PDF/QR).
- BibTeX parsed in-browser; "Copy BibTeX" button copies the original entry.

## Removed / changed from prior plan

- **No "Pocket card" button** — only [Download CV] in the hero.
- Palette is now **dark mode** by default (single theme; we can add a light toggle later if you want).
- Infographics scoped to the 5 purposeful uses above — no decorative charts.

## Technical notes

- TanStack Start, single route at `/` (`src/routes/index.tsx`), section components under `src/components/sections/`.
- `papaparse` for CSVs, small bibtex parser for `.bib`.
- Tailwind v4 theme tokens extended in `src/styles.css` for the dark pastel palette; Google Fonts (Fraunces, Inter, JetBrains Mono) loaded in `__root.tsx` head.
- No backend, no DB — pure static.

## What I still need from you (optional)

- A photo for the hero (otherwise stylized avatar placeholder, easy to swap).
- If you spot any miscategorised teaching entry after I split it, just edit `src/data/teaching.csv`.
