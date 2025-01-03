import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
});

export const generateInsights = async function (analysis: any) {
  try {
    const prompt = `
      Based on the following social media engagement data, generate insights:
      ${JSON.stringify(analysis, null, 2)}

      Examples:
      - Carousel posts have higher engagement than static posts.
      - Reels drive more comments compared to other formats.
    `;

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 200,
    });

    console.log("Generated Insights:", response.choices[0].text);
    return response.choices[0].text;
  } catch (error) {
    console.error("Error generating insights:", error);
    throw error;
  }
};

// Example usage (pass analyzed data from Step 2)
generateInsights([
  { postType: "carousel", averageLikes: 120, averageComments: 45 },
  { postType: "reels", averageLikes: 200, averageComments: 80 },
  { postType: "static", averageLikes: 90, averageComments: 30 },
]);
