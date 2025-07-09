"use server";

import fs from "fs/promises";
import path from "path";
import Papa from "papaparse";

interface LeadRow {
  company_name: string;
  // Add more fields if needed for type safety
  [key: string]: string | undefined;
}

export async function getLeadByCompany(companyName: string) {
  const filePath = path.join(process.cwd(), "src", "app", "data", "leads.csv");

  try {
    const file = await fs.readFile(filePath, "utf8");

    const parsed = Papa.parse<LeadRow>(file, {
      header: true,
      skipEmptyLines: true,
    });

    const match = parsed.data.find(
      (row) =>
        row.company_name?.toLowerCase().trim() ===
        companyName.toLowerCase().trim()
    );

    return match || null;
  } catch (err) {
    console.error("Error reading CSV:", err);
    return null;
  }
}
