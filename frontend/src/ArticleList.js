import { useEffect, useState } from "react";
import api from "./api";
import RatingForm from "./RatingForm";
import Reviews from "./Reviews";

function credibilityBadge(score) {
  if (score >= 70) return "bg-green-500";
  if (score >= 40) return "bg-yellow-500";
  return "bg-red-500";
}

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [stats, setStats] = useState({ total: 0, avgAi: 0, avgFinal: 0 });

  useEffect(() => {
    api.get("news/articles/")
      .then(res => {
        setArticles(res.data);
        const total = res.data.length;
        const avgAi = total > 0 ? (res.data.reduce((sum, a) => sum + a.ai_score, 0) / total).toFixed(1) : 0;
        const avgFinal = total > 0 ? (res.data.reduce((sum, a) => sum + a.final_score, 0) / total).toFixed(1) : 0;
        setStats({ total, avgAi, avgFinal });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-2">Credibility Dashboard</h1>
        <p className="text-gray-600 text-center mb-8">Evaluate news credibility using AI analysis and community feedback.</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">Total Articles</h3>
            <p className="text-3xl font-bold text-indigo-600">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">Avg AI Score</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.avgAi}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">Avg Final Score</h3>
            <p className="text-3xl font-bold text-green-600">{stats.avgFinal}</p>
          </div>
        </div>

        {/* Articles Section */}
        <h2 className="text-2xl font-semibold mb-4">Articles</h2>
        <div className="space-y-6">
          {articles.map(a => (
            <div
              key={a.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500"
            >
              <h4 className="text-xl font-semibold mb-3">{a.title}</h4>

              <div className="flex flex-wrap gap-4 mb-3">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  AI Score: {a.ai_score}
                </div>
                <div className="text-2xl font-bold text-green-600">
                  Final: {a.final_score}
                </div>
                <div className={`text-white px-3 py-1 rounded-full text-sm font-medium ${credibilityBadge(a.final_score)}`}>
                  {a.final_score >= 70 ? 'High Credibility' : a.final_score >= 40 ? 'Medium Credibility' : 'Low Credibility'}
                </div>
              </div>

              <p className="text-gray-500 text-sm mb-4">
                Score computed using AI analysis, source trust, and community feedback.
              </p>

              <div>
                <RatingForm articleId={a.id} />
                <Reviews articleId={a.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticleList;
