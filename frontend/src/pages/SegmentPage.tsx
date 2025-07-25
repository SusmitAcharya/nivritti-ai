import React, { useEffect, useState } from "react";
import api from "../utils/api";

const SegmentPage = () => {
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    api.get("/segments")
      .then(res => setSegments(res.data.customers))
      .catch(err => console.error("Segment API error:", err));
  }, []);

  return (
    <div>
      <h2>Customer Segments</h2>
      <ul>
        {segments.slice(0, 10).map((item: any, i) => (
          <li key={i}>ID: {item.customer_id} — Segment: {item.segment}</li>
        ))}
      </ul>
    </div>
  );
};

export default SegmentPage;