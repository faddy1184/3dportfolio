import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EarthCanvas, StarsCanvas } from "./canvas"; // Ensure correct path

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Autofill saved credentials from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedEmail && savedPassword) {
      setForm({ email: savedEmail, password: savedPassword });
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://3dportfolio-lime.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("token", data.token);
        if (setIsAuthenticated) setIsAuthenticated(true);
        navigate("/");
      } else {
        setError(data.message || "Login failed. Please try again.");
        
        if (data.redirectTo === "register") {
          alert("Email not registered. Redirecting to register page...");
          setTimeout(() => navigate("/register", { replace: true }), 500);
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      {/* Full-Screen Background */}
      <div className="absolute inset-0 w-full h-full">
        <StarsCanvas />
        <div className="absolute inset-0 w-full h-full">
          <EarthCanvas />
        </div>
      </div>

      {/* Centered Login Form */}
      <div className="relative z-10 bg-black bg-opacity-70 p-8 rounded-lg shadow-lg w-[90%] sm:w-[400px] text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-left text-sm">Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-left text-sm">Password:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-white"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4">
          <p>Don't have an account?</p>
          <button
            onClick={() => navigate("/register")}
            className="text-blue-400 hover:underline"
          >
            Go to Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
