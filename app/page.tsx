"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [analytics, setAnalytics] = useState<any>([]);

  useEffect(() => {
    async function fetchAnalytics() {
      const res = await fetch("/api/analytics");
      const data = await res.json();
      // console.log(data)
      console.log("data Type", typeof data);
      setAnalytics(data);

      // console.log(analytics)
    }

    fetchAnalytics();
  }, []);

  if (!analytics) return <p>Loading...</p>;
  {
    console.log(analytics);
  }

  return (
    <div>
      <h1>Social Media Analytics</h1>

      <h2>Engagement Metrics:</h2>
      <ul>{/* {data} */}</ul>

      <h2>Insights:</h2>
      <p>
        {analytics.map((ele) => (
          <div>
            {ele.post_type} : {ele.engagement_rate}
          </div>
        ))}
      </p>
    </div>
  );
}
