import { createServerFn } from "@tanstack/react-start";

const SCHOLAR_URL =
  "https://scholar.google.com/citations?user=erfYRsAAAAAJ&hl=en";

// Fallback values (last known) — used when Scholar blocks the request.
const FALLBACK = { hIndex: 7, citations: 296, i10: 6 };

export const getScholarStats = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const res = await fetch(SCHOLAR_URL, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });
      if (!res.ok) return { ...FALLBACK, source: "fallback" as const };
      const html = await res.text();
      // The profile page has 3 stats (citations, h-index, i10-index), each with
      // an "All" and "Since YYYY" column. We pull the "All" values.
      const matches = Array.from(
        html.matchAll(/gsc_rsb_std["']*>(\d+)</g),
      ).map((m) => parseInt(m[1], 10));
      if (matches.length < 6) return { ...FALLBACK, source: "fallback" as const };
      return {
        citations: matches[0],
        hIndex: matches[2],
        i10: matches[4],
        source: "scholar" as const,
      };
    } catch {
      return { ...FALLBACK, source: "fallback" as const };
    }
  },
);
