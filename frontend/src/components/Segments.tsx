import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Segments: React.FC = () => {
  const [segments, setSegments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:8000/segments')
      .then(response => {
        setSegments(response.data.segments);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load customer segments');
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Segmentation</h1>
      {loading && <p>Loading segments...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Customer ID</th>
              <th className="border px-4 py-2">Segment</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.customer_id}</td>
                <td className="border px-4 py-2">{item.segment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
