import { useEffect, useState } from "react";
import api from "./api";

function Reviews({ articleId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get(`ratings/list/${articleId}/`)
      .then(res => setReviews(res.data));
  }, [articleId]);

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-3">Community Reviews</h4>
      <div className="space-y-3">
        {reviews.map(r => (
          <div key={r.id} className="bg-gray-50 border rounded-lg p-4 mb-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">{r.username}</span>
              <span className="text-yellow-500">⭐ {r.score}</span>
            </div>

            <p className="text-gray-600 text-sm mt-2">
              {r.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
