import { DataAPIClient } from "@datastax/astra-db-ts";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import OpenAI from "openai";
import fs from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import "dotenv/config";
import { log } from "console";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
});

const dbClient = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
const db = dbClient.db(process.env.ASTRA_DB_API!);

console.log("db conected", db.id);

const createDBCollection = async function () {
  const response = await db.createCollection(process.env.ASTRA_DB_COLLECTION!, {
    vector: {
      dimension: 1536,
      metric: "dot_product",
    },
  });
  console.log(response);
};

const loadSampleData = async function () {
  const dbCollection = await db.collection(process.env.ASTRA_DB_COLLECTION!);
  console.log("collection loaded", dbCollection);
};

// Function to load engagement data from a JSON file into the database
const loadEngagementData = async function () {
  try {
    // Read engagement data from a JSON file
    const data = fs.readFileSync("scripts/engagementData.json", "utf-8");
    const engagementData = JSON.parse(data);

    // Get the database collection
    const dbCollection = await db.collection(process.env.ASTRA_DB_COLLECTION!);

    // Insert each record into the database collection
    for (const record of engagementData) {
      await dbCollection.insertOne(record);
    }

    console.log("Engagement data successfully uploaded!");
  } catch (error) {
    console.error("Error uploading engagement data:", error);
  }
};

(async () => {
  await createDBCollection(); // Create collection if not already created
  await loadEngagementData(); // Load engagement data
})();
