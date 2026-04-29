import educationCsv from "./education.csv?raw";
import experienceCsv from "./experience.csv?raw";
import teachingCsv from "./teaching.csv?raw";
import publicationsBib from "./publications.bib?raw";
import personalProfile from "./personal_profile.txt?raw";

import { parseCsv, parseBib, parseMonth } from "@/lib/parsers";
import type { CsvRow, BibEntry } from "@/lib/parsers";

export const profile = personalProfile.replace(/\s+/g, " ").trim();

export type EduRow = CsvRow & {
  startdate: string;
  enddate: string;
  degree: string;
  institute: string;
  city: string;
  country: string;
  link: string;
  notes: string;
  thesis: string;
  inresume: string;
};

export type ExpRow = CsvRow & {
  startdate: string;
  enddate: string;
  title: string;
  institute: string;
  city: string;
  country: string;
  link: string;
  description: string;
  bibtex: string;
  inresume: string;
};

export type TeachRow = CsvRow & {
  startdate: string;
  enddate: string;
  title: string;
  institute: string;
  city: string;
  country: string;
  link: string;
  description: string;
  bibtex: string;
  inresume: string;
};

export const education = parseCsv(educationCsv) as EduRow[];
export const experience = parseCsv(experienceCsv) as ExpRow[];
export const teaching = parseCsv(teachingCsv) as TeachRow[];
export const publications: BibEntry[] = parseBib(publicationsBib);

/** Split teaching into courses vs supervised students. */
export function splitTeaching(rows: TeachRow[]) {
  const supervisions: TeachRow[] = [];
  const courses: TeachRow[] = [];
  for (const r of rows) {
    const t = r.title.toLowerCase();
    if (/supervisor|supervis/.test(t)) supervisions.push(r);
    else courses.push(r);
  }
  return { courses, supervisions };
}

/** Combined sorted timeline of education + experience (most recent first). */
export type TimelineItem = {
  kind: "education" | "experience";
  start: string;
  end: string;
  startSort: number;
  endSort: number;
  title: string;
  institute: string;
  city: string;
  country: string;
  link: string;
  notes: string;
  inresume: boolean;
};

export const timeline: TimelineItem[] = [
  ...education
    .filter((e) => e.inresume === "y")
    .map<TimelineItem>((e) => ({
      kind: "education",
      start: e.startdate,
      end: e.enddate,
      startSort: parseMonth(e.startdate),
      endSort: parseMonth(e.enddate),
      title: e.degree,
      institute: e.institute,
      city: e.city,
      country: e.country,
      link: e.link,
      notes: [e.notes, e.thesis ? `Thesis: ${e.thesis}` : ""].filter(Boolean).join(" · "),
      inresume: true,
    })),
  ...experience
    .filter((e) => e.inresume === "y")
    .map<TimelineItem>((e) => ({
      kind: "experience",
      start: e.startdate,
      end: e.enddate,
      startSort: parseMonth(e.startdate),
      endSort: parseMonth(e.enddate),
      title: e.title,
      institute: e.institute,
      city: e.city,
      country: e.country,
      link: e.link,
      notes: e.description,
      inresume: true,
    })),
].sort((a, b) => b.endSort - a.endSort || b.startSort - a.startSort);

export const skills: { name: string; level: number; group: "tech" | "research" | "creative" }[] = [
  { name: "Quantum compilation", level: 95, group: "research" },
  { name: "Python", level: 95, group: "tech" },
  { name: "Quantum software stacks", level: 90, group: "tech" },
  { name: "Machine learning", level: 80, group: "research" },
  { name: "Algorithm design", level: 90, group: "research" },
  { name: "Rust / C++", level: 60, group: "tech" },
  { name: "Scientific writing", level: 90, group: "creative" },
  { name: "Public speaking", level: 80, group: "creative" },
];

export const languages = [
  { name: "English", level: 5, label: "Professional" },
  { name: "Dutch", level: 5, label: "Native" },
  { name: "German", level: 3, label: "Intermediate" },
  { name: "Finnish", level: 1, label: "Beginner" },
];

export const hobbies = [
  { name: "Puzzling", icon: "🧩" },
  { name: "Baking", icon: "🧁" },
  { name: "Swimming", icon: "🏊‍♀️" },
  { name: "Knitting", icon: "🧶" },
  { name: "Beat Saber", icon: "🎮" },
  { name: "Miniature painting", icon: "🎨" },
];

export const contacts = {
  email: "arianne.vandegriend@helsinki.fi",
  github: "https://github.com/aerylia",
  linkedin: "https://linkedin.com/in/aerylia",
  orcid: "https://orcid.org/0000-0001-5946-0958",
};
