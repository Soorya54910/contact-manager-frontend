import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      alert("All fields are mandatory");
      return;
    }

    try {
      await API.post("/api/users/register", {
        username,
        email,
        password,
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("BACKEND ERROR:", err.response?.data);
    alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="bg-[#1e1e1e] p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border border-gray-600 bg-transparent text-white rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-600 bg-transparent text-white rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-600 bg-transparent text-white rounded mb-6 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition font-semibold"
        >
          Register
        </button>

        {/* ✅ LOGIN LINK */}
        <p className="text-center mt-4 text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
