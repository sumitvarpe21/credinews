import { useNavigate } from "react-router-dom";
import { useState } from "react";

const categories = [
  { key: "general", label: "General" },
  { key: "politics", label: "Politics" },
  { key: "business", label: "Business" },
  { key: "economy", label: "Economy" },
  { key: "education", label: "Education" },
  { key: "law", label: "Law" },
  { key: "technology", label: "Technology" },
  { key: "science", label: "Science" },
  { key: "health", label: "Health" },
  { key: "environment", label: "Environment" },
  { key: "sports", label: "Sports" },
  { key: "entertainment", label: "Entertainment" },
  { key: "world", label: "World" },
  { key: "national", label: "National" },
  { key: "other", label: "Other" },
];

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const isAdmin = username === "admin";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const selectCategory = (key) => {
    navigate(`/?category=${key}`);
    setOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${search}`);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      {/* Top bar */}
      <div className="px-6 py-3 flex justify-between items-center">
        <h1
          className="font-bold text-xl tracking-wide cursor-pointer"
          onClick={() => navigate("/")}
        >
          CrediNews
          <span className="block text-xs font-normal opacity-80">
            AI-powered News Credibility
          </span>
        </h1>

        <div className="flex items-center gap-4 relative">
          <button onClick={() => navigate("/")}>Home</button>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="bg-white/10 px-3 py-1 rounded hover:bg-white/20"
            >
              Categories ▾
            </button>

            {open && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow w-44 z-50">
                {categories.map(cat => (
                  <div
                    key={cat.key}
                    onClick={() => selectCategory(cat.key)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {cat.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {token && (
            <button
              onClick={() => navigate("/my-reviews")}
              className="hover:underline"
            >
              My Reviews
            </button>
          )}

          {isAdmin && (
            <button onClick={() => navigate("/admin")}>Admin</button>
          )}

          {token && (
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="px-6 py-2 bg-white/10 flex">
        <input
          type="text"
          placeholder="Search or paste headline..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-l-full text-black focus:outline-none"
        />
        <button
          type="submit"
          className="bg-black/20 px-5 rounded-r-full hover:bg-black/30 transition"
        >
          Search
        </button>
      </form>
    </nav>
  );
}

export default Navbar;