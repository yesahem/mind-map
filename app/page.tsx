"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      const res = await fetch("/api/analytics");
      const data = await res.json();
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
        {analytics.analysis.map((item: any) => (
          <li key={item.postType}>
            <strong>{item.postType}:</strong> Avg Likes: {item.averageLikes}, Avg Comments: {item.averageComments}
          </li>
        ))}
      </ul>

      <h2>Insights:</h2>
      <p>{analytics.insights}</p>
    </div>
  );
}
