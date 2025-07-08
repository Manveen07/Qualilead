import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { company_name, score_reason } = await req.json();

    if (!company_name || !score_reason) {
      return NextResponse.json(
        { error: "Missing company_name or score_reason" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("company_data");
    const collection = db.collection("data");

    const result = await collection.updateOne(
      { company_name },
      { $set: { score_reason } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    console.log("Score reason updated for company:", company_name);
    // Optionally, you can return the updated

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MongoDB Update Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
