import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

function MyReviews() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("ratings/my-reviews/")
      .then(res => setArticles(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-1">My Reviewed News</h2>
      <p className="text-gray-500 mb-6">
        Track your credibility ratings and reviews
      </p>

      {articles.length === 0 && (
        <p className="text-gray-500">
          You haven't reviewed any news yet.
        </p>
      )}

      {articles.map(a => (
        <div
          key={a.id}
          onClick={() => navigate(`/article/${a.id}`)}
          className="group bg-white rounded-xl shadow-md mb-6 cursor-pointer overflow-hidden hover:shadow-xl transition duration-300"
        >
          <div className="relative">
            <img
              src={a.image_url || "https://via.placeholder.com/800x400"}
              alt={a.title}
              className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
            />

            <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
              {a.category.toUpperCase()}
            </span>
          </div>

          <div className="p-5">
            <h3 className="font-semibold text-lg leading-snug">{a.title}</h3>
            <p className="text-gray-600 text-sm mt-2">
              {a.summary.slice(0, 120)}...
            </p>

            <p className="text-indigo-600 text-xs mt-2">
              Click to view your review →
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyReviews;