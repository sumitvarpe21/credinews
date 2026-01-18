import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import ArticleList from "./ArticleList";
import NewsFeed from "./NewsFeed";
import ArticleDetail from "./ArticleDetail";
import Login from "./Login";
import Register from "./Register";
import AdminDashboard from "./AdminDashboard";
import AdminRoute from "./AdminRoute";
import MyReviews from "./MyReviews";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Navbar />

      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={token ? <NewsFeed /> : <Login />} />
          <Route path="/articles" element={<NewsFeed />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
