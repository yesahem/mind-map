"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [analytics, setAnalytics] = useState<any>([]);
  const[loading, setLoading] = useState(true)
  interface elementType {
    post_type: string;
    engagement_rate: string;
  }

  useEffect(() => {
    async function fetchAnalytics() {
      const res = await fetch("/api/analytics");
      const data = await res.json();
      // console.log(data)
      console.log("data Type", typeof data);
      setAnalytics(data);
      setLoading(false)
      // console.log(analytics)
    }

    fetchAnalytics();
  }, []);

  
  {
    console.log(analytics);
  }

  return (
    <div>
      <h1>Social Media Analytics</h1>
      <br />
      {loading ? <div>Generating Insights</div>: <p>
        {analytics.map((ele: elementType, index: number) => (
          <div key={index}>
            {ele.post_type} : {ele.engagement_rate}x more enagaging than static images        </div>
        ))}
      </p>}
    </div>
  );
}
