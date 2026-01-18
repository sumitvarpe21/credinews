import { useEffect, useState } from "react";
import api from "./api";

function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("news/admin/dashboard/")
      .then(res => setData(res.data))
      .catch(() => alert("Admin access required"));
  }, []);

  if (!data) return <p>Loading analytics...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-1">Admin Analytics Dashboard</h2>
      <p className="text-gray-500 mb-6">
        Monitor platform statistics and manage content credibility
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-indigo-600">{data.total_users}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Articles</h3>
          <p className="text-3xl font-bold text-blue-600">{data.total_articles}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Ratings</h3>
          <p className="text-3xl font-bold text-green-600">{data.total_ratings}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-700">Avg Credibility</h3>
          <p className="text-3xl font-bold text-purple-600">{data.avg_credibility}</p>
        </div>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Most Rated Articles</h3>
          <ul className="space-y-2">
            {data.most_rated_articles.map((a, i) => (
              <li key={i} className="flex justify-between">
                <span>{a.article__title}</span>
                <span className="text-gray-600">{a.count} ratings</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Low Credibility Articles</h3>
          <ul className="space-y-2">
            {data.low_credibility_articles.map((a, i) => (
              <li key={i} className="flex justify-between">
                <span>{a.title}</span>
                <span className="text-gray-600">Score: {a.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
