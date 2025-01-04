import OpenAI from "openai";
import "dotenv/config";
import { engagementData } from "./engagementData";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
});

export const generateInsights = async function (analysis: any) {
  try {
    const prompt = `
      Based on the following social media engagement data, generate insights:
      ${JSON.stringify(analysis)}

      Examples:
      - Carousel posts have higher engagement than static posts.
      - Reels drive more comments compared to other formats.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content:  prompt,
        },
    ],
      max_tokens: 200,
    });

    console.log("Generated Insights:", response.choices[0]);
    return response.choices[0];
  } catch (error) {
    console.error("Error generating insights:", error);
    throw error;
  }
};

// Example usage (pass analyzed data from Step 2)
generateInsights(engagementData);
