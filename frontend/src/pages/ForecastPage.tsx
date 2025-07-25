import React, { useEffect, useState } from "react";
import api from "../utils/api";

const ForecastPage = () => {
  const [forecast, setForecast] = useState<number[]>([]);

  useEffect(() => {
    api.get("/forecast")
      .then(res => setForecast(res.data.predicted_sales))
      .catch(err => console.error("Forecast API error:", err));
  }, []);

  return (
    <div>
      <h2>Sales Forecast</h2>
      <ul>
        {forecast.slice(0, 10).map((val, i) => (
          <li key={i}>Day {i + 1}: {val}</li>
        ))}
      </ul>
    </div>
  );
};

export default ForecastPage;
