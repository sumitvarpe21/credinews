import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./api";
import RatingForm from "./RatingForm";
import Reviews from "./Reviews";
import CredibilityChart from "./CredibilityChart";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    api.get(`news/articles/${id}/`)
      .then(res => setArticle(res.data))
      .catch(() => setArticle(null));
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-1">{article.title}</h2>
      <p className="text-gray-500 mb-6">
        Check credibility and community reviews
      </p>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">

      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <p className="text-gray-600 mt-2">{article.summary}</p>

      <div className="flex gap-3 mt-4">
        <a href="#credibility" className="text-indigo-600 hover:underline">View Credibility</a>
        <a href="#reviews" className="text-indigo-600 hover:underline">View Reviews</a>
      </div>
    </div>

    <div id="credibility" className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-2">
        Credibility Analysis
      </h3>

      <div className="flex gap-4 mt-3">
        <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
          AI Score: {article.ai_score}
        </span>

        <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm">
          Final Score: {article.final_score}
        </span>
      </div>

        <div className="mt-4">
          <CredibilityChart
            ai={article.ai_score}
            community={article.community_score || 40}
            source={article.source_trust || 80}
          />
        </div>
      </div>

      <div id="reviews" className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-2">Community Feedback</h3>
        <p className="text-sm text-gray-600 mt-1 mb-4">Share your rating or read what others think about this article.</p>
        <RatingForm articleId={article.id} />
        <Reviews articleId={article.id} />
      </div>
    </div>
  );
}

export default ArticleDetail;
