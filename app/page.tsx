"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [analytics, setAnalytics] = useState<any>(null);
  

  useEffect(() => {
    async function fetchAnalytics() {
      const res = await fetch("/api/analytics");
      const data = await res.json();
      console.log(data)
      setAnalytics(data);
    }

    fetchAnalytics();
  }, []);

  if (!analytics) return <p>Loading...</p>;

  return (
    <div>
      <h1>Social Media Analytics</h1>

      <h2>Engagement Metrics:</h2>
      <ul>
        {/* {data} */}
      </ul>

      <h2>Insights:</h2>
      <p>{analytics.insights}</p>
    </div>
  );
}
