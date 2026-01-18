import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = () => {
        api.post("auth/login/", { username, password })
      .then(res => {
        localStorage.setItem("token", res.data.access);
        localStorage.setItem("username", username); // 👈 store username
        navigate("/");
      })
      .catch(() => alert("Invalid credentials"));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">Login to CrediNews</h1>
        <p className="text-gray-600 text-center mb-6">Access your account to rate and review news articles.</p>
        <h2 className="text-lg font-semibold mb-4">Login</h2>
        <input
          className="border p-3 rounded w-full mb-3"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="border p-3 rounded w-full mb-3"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
          onClick={loginUser}
        >
          Login
        </button>
        <p className="text-center mt-4">
          Don't have an account? <a href="/register" className="text-indigo-600 hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
