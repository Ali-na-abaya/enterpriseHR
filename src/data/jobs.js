import Papa from "papaparse";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmNy3KgGAnp2Ka6yBWhYZTdzmxu-BLO252XtOdnyKVW5Wd5AOMFDNKBvCyRzcrIz4JUFvPwuflZ55K/pub?output=csv";

let jobsCache = [];

export async function loadJobs() {
  if (jobsCache.length) return jobsCache;

  const res = await fetch(SHEET_URL);
  const text = await res.text();
  const parsed = Papa.parse(text, { header: true });

  jobsCache = parsed.data
    .filter((row) => row["title"])
    .map((row, index) => ({
      id: index + 1,
      title: row["title"] || "",
      shortDescription: row["shortDescription"] || "",
      expect: row["expect"]
        ? row["expect"].split(";").map((s) => s.trim())
        : [],
      routine: row["routine"]
        ? row["routine"].split(";").map((s) => s.trim())
        : [],
      values: row["values"]
        ? row["values"].split(";").map((s) => s.trim())
        : [],
      conditions: row["conditions"]
        ? row["conditions"].split(";").map((s) => s.trim())
        : [],

      note: row["note"] || "",
    }));

  return jobsCache;
}

export { loadJobs as fetchJobs, jobsCache as jobs };
