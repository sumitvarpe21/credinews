import { useState } from "react";
import api from "./api";

function RatingForm({ articleId, onSubmitted }) {
  const [score, setScore] = useState(5);
  const [review, setReview] = useState("");

  const submitRating = () => {
    api.post("ratings/add/", {
      article: articleId,
      score,
      review
    }).then(res => {
      alert("Rating submitted");
      onSubmitted && onSubmitted(res.data.final_score);
      setReview("");
    }).catch(() => alert("Login required"));
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border mb-4">
      <h5 className="font-semibold mb-3">Rate this article</h5>
      <div className="flex items-center gap-4 mb-3">
        <label className="text-sm font-medium">Score:</label>
        <select
          value={score}
          onChange={e => setScore(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {[1,2,3,4,5].map(n => <option key={n}>{n} ⭐</option>)}
        </select>
      </div>
      <textarea
        placeholder="Write a short review (optional)"
        value={review}
        onChange={e => setReview(e.target.value)}
        className="border rounded w-full p-2 mb-3"
        rows="3"
      />
      <button
        onClick={submitRating}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Submit Rating
      </button>
    </div>
  );
}

export default RatingForm;
