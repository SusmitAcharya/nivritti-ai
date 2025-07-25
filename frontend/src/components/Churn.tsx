import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Churn: React.FC = () => {
  const [churnData, setChurnData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:8000/churn')
      .then(response => {
        setChurnData(response.data.churn);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load churn predictions');
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Churn Prediction</h1>
      {loading && <p>Loading churn predictions...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">User ID</th>
              <th className="border px-4 py-2">Churn Probability</th>
            </tr>
          </thead>
          <tbody>
            {churnData.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.user_id}</td>
                <td className="border px-4 py-2">{item.churn_probability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
