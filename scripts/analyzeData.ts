import { fetchData } from "./fetchData";

export const analyzeData = async function () {
  try {
    // Fetch data from the database
    const cursor = await fetchData();

    // Convert the cursor to an array
    const data = await cursor.toArray(); // Ensures `data` is now an array

    const postTypes = ["carousel", "reels", "static"];
    const analysis = postTypes.map((type) => {
      // Filter data by post type
      const filtered = data.filter((post: any) => post.postType === type);

      // Calculate total likes and comments for the post type
      const totalLikes = filtered.reduce((sum, post) => sum + (post.likes || 0), 0);
      const totalComments = filtered.reduce((sum, post) => sum + (post.comments || 0), 0);

      // Return analyzed data
      return {
        postType: type,
        averageLikes: filtered.length ? totalLikes / filtered.length : 0,
        averageComments: filtered.length ? totalComments / filtered.length : 0,
      };
    });

    console.log("Analyzed Data:", analysis);
    return analysis;
  } catch (error) {
    console.error("Error analyzing data:", error);
    throw error;
  }
};

// Example usage: Call the analyzeData function
analyzeData();
