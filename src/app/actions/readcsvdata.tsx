"use server";

import fs from "fs";
import path from "path";
import papa from "papaparse";

export async function readCsvData() {
  const filePath = path.join(process.cwd(), "src", "app", "data", "leads.csv");

  const file = fs.readFileSync(filePath, "utf8");

  const parsed = papa.parse(file, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data; // returns an array of objects
}
