import OpenAI from "openai";
import "dotenv/config";
import { engagementData } from "@/scripts/engagementData";

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
        { role: "system", content: "You are a helpful assistant. Help me analysie the following data into a beautiful user readable and summarised format, Just tell me which content attracts higher engament followed by other post formats " },
        {
            role: "user",
            content:  prompt,
        },
    ],
      max_tokens: 200,
    });

    console.log("Generated Insights:", response.choices[0]);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating insights:", error);
    throw error;
  }
};

// Example usage (pass analyzed data from Step 2)
generateInsights(engagementData);
