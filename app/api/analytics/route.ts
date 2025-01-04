import { NextRequest, NextResponse } from "next/server";
// import { analyzeData } from "../../../scripts/analyzeData";
import { generateInsights } from "@/scripts/generateInsights";
import { engagementData } from "@/scripts/engagementData";

export async function GET(req: NextRequest) {
  try {
    // Analyze data
    // const analysis = await analyzeData();

    // Generate insights
    const insights = await generateInsights(engagementData);

    return NextResponse.json({insights });
  } catch (error) {
    // console.error("Error in API:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
