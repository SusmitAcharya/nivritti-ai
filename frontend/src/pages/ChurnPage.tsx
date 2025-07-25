import React, { useEffect, useState } from "react";
import api from "../utils/api";

const ChurnPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/churn")
      .then(res => setUsers(res.data.users))
      .catch(err => console.error("Churn API error:", err));
  }, []);

  return (
    <div>
      <h2>Churn Predictions</h2>
      <ul>
        {users.slice(0, 10).map((u: any, i) => (
          <li key={i}>
            ID: {u.user_id} — Churn Prob: {(u.churn_probability * 100).toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChurnPage;
