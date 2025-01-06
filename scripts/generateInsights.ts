import OpenAI from "openai";
import "dotenv/config";
import { engagementData } from "@/scripts/engagementData";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateInsights = async function (analysis: any) {
  try {
    const prompt = `
      Based on the following social media engagement data, generate insights:
      ${JSON.stringify(analysis)}

      Examples:
      - Reels posts have 20% higher engagement than static posts.
      - Reels drive 2x more comments compared to other formats.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      // stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. Help me analysie the following data into a beautiful summarised format and compare the results with other formats and then give me the results format of response i want is :[{post_type: Reels, engagement_rate: number of times more engamenet  }]in array of JSON format only no text strictly no text other than array of json , compare it with respect to static_images poost type and please trim down all he unnecessary things and return me array of objects strictly ,  tell me which content attracts higher engament followed by other post formats in JSON format The Json Response i want is of format: {post_type, engagement_rate} ",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      // max_tokens: 200,
    });

    console.log(response.choices[0].message.content);
    return response.choices[0].message.content!;
  } catch (error) {
    console.error("Error generating insights:", error);
    throw error;
  }
};

// Example usage (pass analyzed data from Step 2)
generateInsights(engagementData);
