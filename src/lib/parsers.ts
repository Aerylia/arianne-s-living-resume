import Papa from "papaparse";

export type CsvRow = Record<string, string>;

export function parseCsv(text: string): CsvRow[] {
  const result = Papa.parse<CsvRow>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase(),
  });
  return result.data
    .map((row) => {
      const out: CsvRow = {};
      for (const [k, v] of Object.entries(row)) {
        out[k] = (v ?? "").toString().trim();
      }
      return out;
    })
    .filter((row) => Object.values(row).some((v) => v));
}

/** Parse a date like "01/2024" or "current"/"now" into a sortable number (yyyymm). */
export function parseMonth(s: string): number {
  const v = (s ?? "").trim().toLowerCase();
  if (!v || v === "current" || v === "now" || v === "present") return 999912;
  const m = v.match(/^(\d{1,2})\/(\d{4})$/);
  if (m) return parseInt(m[2], 10) * 100 + parseInt(m[1], 10);
  const y = v.match(/^(\d{4})$/);
  if (y) return parseInt(y[1], 10) * 100 + 12;
  return 0;
}

export function formatMonth(s: string): string {
  const v = (s ?? "").trim().toLowerCase();
  if (!v) return "";
  if (v === "current" || v === "now" || v === "present") return "Present";
  const m = v.match(/^(\d{1,2})\/(\d{4})$/);
  if (!m) return s;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(m[1], 10) - 1] ?? ""} ${m[2]}`;
}

/* ------------------ BibTeX parser ------------------ */

export type BibEntry = {
  type: string;
  key: string;
  fields: Record<string, string>;
  raw: string;
  year: number;
  title: string;
  authors: string;
  venue: string;
  doi?: string;
  url?: string;
  category: "Published" | "Preprint" | "Thesis" | "Other";
};

function stripBraces(s: string): string {
  let out = s.trim();
  while (
    (out.startsWith("{") && out.endsWith("}")) ||
    (out.startsWith('"') && out.endsWith('"'))
  ) {
    out = out.slice(1, -1).trim();
  }
  return out;
}

function cleanLatex(s: string): string {
  return s
    .replace(/\\textbf\{([^}]*)\}/g, "$1")
    .replace(/\\emph\{([^}]*)\}/g, "$1")
    .replace(/\\textit\{([^}]*)\}/g, "$1")
    .replace(/\\&/g, "&")
    .replace(/\{\\'([aeiouAEIOU])\}/g, "$1")
    .replace(/\{([^{}]*)\}/g, "$1")
    .replace(/\\\\/g, " ")
    .replace(/~/g, " ")
    .replace(/--/g, "–")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseBib(text: string): BibEntry[] {
  const entries: BibEntry[] = [];
  // Match @type{key, ... } where braces are balanced.
  const re = /@(\w+)\s*\{\s*([^,]+),/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const type = m[1].toLowerCase();
    const key = m[2].trim();
    const startBrace = text.indexOf("{", m.index);
    let depth = 1;
    let i = startBrace + 1;
    while (i < text.length && depth > 0) {
      const c = text[i];
      if (c === "{") depth++;
      else if (c === "}") depth--;
      i++;
    }
    const body = text.slice(startBrace + 1, i - 1);
    const raw = text.slice(m.index, i);
    // Skip the key part; parse remaining fields.
    const afterKey = body.slice(body.indexOf(",") + 1);
    const fields = parseFields(afterKey);
    const yearNum = parseInt(fields.year ?? "0", 10) || 0;
    const venue =
      fields.journal ||
      fields.booktitle ||
      fields.publisher ||
      fields.eprinttype ||
      fields.note ||
      "";
    let category: BibEntry["category"] = "Published";
    const note = (fields.note ?? "").toLowerCase();
    if (type === "online" || fields.eprint || /arxiv/i.test(venue) || /preprint/i.test(note)) {
      category = "Preprint";
    }
    if (/thesis/i.test(note) || /thesis/i.test(type)) category = "Thesis";
    if (!fields.year) category = "Other";
    entries.push({
      type,
      key,
      fields,
      raw,
      year: yearNum,
      title: cleanLatex(fields.title ?? ""),
      authors: cleanLatex(fields.author ?? fields.authors ?? ""),
      venue: cleanLatex(venue),
      doi: fields.doi,
      url: fields.url_paper || fields.url || (fields.doi ? `https://doi.org/${fields.doi}` : undefined),
      category,
    });
    re.lastIndex = i;
  }
  return entries.sort((a, b) => b.year - a.year);
}

function parseFields(body: string): Record<string, string> {
  const out: Record<string, string> = {};
  let i = 0;
  while (i < body.length) {
    // skip whitespace and commas
    while (i < body.length && /[\s,]/.test(body[i])) i++;
    if (i >= body.length) break;
    // read key
    let k = "";
    while (i < body.length && /[A-Za-z0-9_-]/.test(body[i])) {
      k += body[i];
      i++;
    }
    while (i < body.length && body[i] !== "=") i++;
    if (body[i] !== "=") break;
    i++; // skip =
    while (i < body.length && /\s/.test(body[i])) i++;
    // read value: braces, quotes, or bare
    let val = "";
    if (body[i] === "{") {
      let depth = 1;
      i++;
      while (i < body.length && depth > 0) {
        if (body[i] === "{") depth++;
        else if (body[i] === "}") {
          depth--;
          if (depth === 0) break;
        }
        val += body[i];
        i++;
      }
      i++; // closing }
    } else if (body[i] === '"') {
      i++;
      while (i < body.length && body[i] !== '"') {
        val += body[i];
        i++;
      }
      i++;
    } else {
      while (i < body.length && body[i] !== ",") {
        val += body[i];
        i++;
      }
    }
    if (k) out[k.toLowerCase().trim()] = stripBraces(val).trim();
  }
  return out;
}
