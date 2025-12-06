import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import API from "./services/api";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        await API.get("/api/users/currentUser");
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkToken();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* ✅ DEFAULT → REGISTER */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
      />

      {/* ✅ LOGIN */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login setIsAuthenticated={setIsAuthenticated} />
          )
        }
      />

      {/* ✅ DASHBOARD */}
      <Route
  path="/dashboard"
  element={
    isAuthenticated ? (
      <Dashboard setIsAuthenticated={setIsAuthenticated} />
    ) : (
      <Navigate to="/login" />
    )
  }
/>
    </Routes>
  );
}

export default App;
