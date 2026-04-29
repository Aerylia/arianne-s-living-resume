import educationCsv from "./education.csv?raw";
import experienceCsv from "./experience.csv?raw";
import teachingCsv from "./teaching.csv?raw";
import publicationsBib from "./publications.bib?raw";
import personalProfile from "./personal_profile.txt?raw";

import { parseCsv, parseBib, parseMonth } from "@/lib/parsers";
import type { CsvRow, BibEntry } from "@/lib/parsers";

export const profile = personalProfile.replace(/\s+/g, " ").trim();

export type EduRow = CsvRow & {
  startdate: string; enddate: string; degree: string; institute: string;
  city: string; country: string; link: string; notes: string; thesis: string; inresume: string;
};
export type ExpRow = CsvRow & {
  startdate: string; enddate: string; title: string; institute: string;
  city: string; country: string; link: string; description: string; bibtex: string; inresume: string;
};
export type TeachRow = ExpRow;

export const education = parseCsv(educationCsv) as EduRow[];
export const experience = parseCsv(experienceCsv) as ExpRow[];
export const teaching = parseCsv(teachingCsv) as TeachRow[];
export const publications: BibEntry[] = parseBib(publicationsBib);

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

export type TimelineCategory =
  | "research"
  | "software engineering"
  | "internship"
  | "education"
  | "teaching";

export type TimelineItem = {
  kind: "education" | "experience" | "teaching";
  category: TimelineCategory;
  start: string; end: string;
  startSort: number; endSort: number;
  title: string; institute: string; city: string; country: string;
  link: string; notes: string;
};

function categorizeExperience(title: string): TimelineCategory {
  const t = title.toLowerCase();
  if (/intern(ship)?|thesis/.test(t)) return "internship";
  if (/engineer/.test(t)) return "software engineering";
  if (/research|postdoc|phd|doctoral|scientist/.test(t)) return "research";
  if (/teach|ta\b|tutor/.test(t)) return "teaching";
  return "research";
}

export const timeline: TimelineItem[] = [
  ...education
    .filter((e) => e.inresume === "y")
    .map<TimelineItem>((e) => ({
      kind: "education",
      category: "education",
      start: e.startdate, end: e.enddate,
      startSort: parseMonth(e.startdate), endSort: parseMonth(e.enddate),
      title: e.degree, institute: e.institute, city: e.city, country: e.country,
      link: e.link,
      notes: [e.notes, e.thesis ? `Thesis: ${e.thesis}` : ""].filter(Boolean).join(" · "),
    })),
  ...experience
    .filter((e) => e.inresume === "y")
    .map<TimelineItem>((e) => ({
      kind: "experience",
      category: categorizeExperience(e.title),
      start: e.startdate, end: e.enddate,
      startSort: parseMonth(e.startdate), endSort: parseMonth(e.enddate),
      title: e.title, institute: e.institute, city: e.city, country: e.country,
      link: e.link, notes: e.description,
    })),
  ...teaching
    .filter((e) => e.inresume === "y")
    .map<TimelineItem>((e) => ({
      kind: "teaching",
      category: "teaching",
      start: e.startdate, end: e.enddate,
      startSort: parseMonth(e.startdate), endSort: parseMonth(e.enddate),
      title: e.title, institute: e.institute, city: e.city, country: e.country,
      link: e.link, notes: e.description,
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
  scholar: "https://scholar.google.com/citations?user=erfYRsAAAAAJ&hl=en",
};
