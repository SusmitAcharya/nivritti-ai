import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Forecast: React.FC = () => {
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:8000/forecast')
      .then(response => {
        setForecastData(response.data.forecast);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load forecast data');
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales Forecast</h1>
      {loading && <p>Loading forecast...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Predicted Sales</th>
            </tr>
          </thead>
          <tbody>
            {forecastData.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.predicted_sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
