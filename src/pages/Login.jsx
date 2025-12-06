import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("All fields are mandatory");
      return;
    }

    try {
      const res = await API.post("/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.accessToken);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="bg-[#1e1e1e] p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Login
        </h2>

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
          onClick={handleLogin}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition font-semibold"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm text-gray-300">
          New user?{" "}
          <Link
            to="/"
            className="text-red-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
