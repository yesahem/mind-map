import { NextRequest, NextResponse } from "next/server";
// import { analyzeData } from "../../../scripts/analyzeData";
import { generateInsights } from "@/scripts/generateInsights";
import { engagementData } from "@/scripts/engagementData";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // Analyze data
    // const analysis = await analyzeData();

    // Generate insights
    const insights = await generateInsights(engagementData);
    const analysedData = insights.replace(/^```json\n|```$/g, "").trim();
    //     return NextResponse.json({analysedData})
    return new NextResponse(analysedData);
  } catch (error) {
    // console.error("Error in API:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}
