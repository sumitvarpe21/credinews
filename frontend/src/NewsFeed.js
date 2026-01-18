import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "./api";

function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    api.get(`news/articles/${location.search}`)
      .then(res => setArticles(res.data));
  }, [location.search]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-1">Top Headlines</h2>
      <p className="text-gray-500 mb-6">
        Browse news and check credibility before believing
      </p>

      {articles.length === 0 && (
        <p className="text-gray-500">No news found.</p>
      )}

      {articles.map(a => (
        <div
          key={a.id}
          onClick={() => navigate(`/article/${a.id}`)}
          className="group bg-white rounded-xl shadow-md mb-6 cursor-pointer 
                     hover:shadow-xl transition duration-300 overflow-hidden"
        >
          <div className="relative">
            <img
              src={a.image_url || "https://via.placeholder.com/800x400"}
              alt={a.title}
              className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
            />

            <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
              {a.category.toUpperCase()}
            </span>
          </div>

          <div className="p-5">
            <h3 className="font-semibold text-lg leading-snug">
              {a.title}
            </h3>

            <p className="text-gray-600 text-sm mt-2">
              {a.summary.slice(0, 140)}...
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-indigo-600 text-xs font-medium">
                View credibility →
              </span>

              <span className={`px-3 py-1 text-xs rounded-full 
                ${a.final_score >= 70 ? 'bg-green-100 text-green-700' :
                  a.final_score >= 40 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'}`}>
                Score: {a.final_score}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsFeed;
