import { DataAPIClient } from "@datastax/astra-db-ts";
import "dotenv/config";

// Initialize Astra DB client
const dbClient = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
const db = dbClient.db(process.env.ASTRA_DB_API!);

export const fetchData = async function () {
  try {
    const dbCollection = await db.collection(process.env.ASTRA_DB_COLLECTION!);
    const data = await dbCollection.find({});
    console.log("Fetched Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Call the function to test
fetchData();
