// app/api/companies/route.ts

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // adjust path if needed

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("company_data"); // 👈 Note capital 'C'
    const companies = await db.collection("data").find({}).toArray();
    // console.log("Fetched companies:", companies);

    return NextResponse.json({ companies });
  } catch (error) {
    console.error("Mongo Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
