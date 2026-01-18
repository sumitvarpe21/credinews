import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = () => {
    api.post("auth/register/", { username, password })
      .then(() => {
        alert("Registered successfully");
        navigate("/");
      })
      .catch(() => alert("User already exists"));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">Join CrediNews</h1>
        <p className="text-gray-600 text-center mb-6">Create an account to contribute to news credibility assessment.</p>
        <h2 className="text-lg font-semibold mb-4">Register</h2>
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
          onClick={registerUser}
        >
          Register
        </button>
        <p className="text-center mt-4">
          Already have an account? <a href="/" className="text-indigo-600 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
