import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarsCanvas } from "./canvas";
import { EarthCanvas } from "./canvas";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://backend-5mro.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (response.ok) {
        localStorage.setItem("savedEmail", form.email);
        localStorage.setItem("savedPassword", form.password);

        alert("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login", { replace: true }), 500);
      } else {
        setError(data.message || "Registration failed. Please try again.");

        if (data.redirectTo === "login") {
          alert("User already exists! Redirecting to login...");
          setTimeout(() => navigate("/login", { replace: true }), 500);
        }
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setError("An error occurred. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full">
  <StarsCanvas /> {/* Stars should be at the very back */}
  <div className="absolute inset-0 w-full h-full">
    <EarthCanvas /> {/* Earth should be on top of the stars */}
  </div>
</div>

      {/* Centered Registration Form */}
      <div className="relative z-10 bg-black bg-opacity-70 p-8 rounded-lg shadow-lg w-[90%] sm:w-[400px] text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-left text-sm">Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-white bg-gray-800"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-left text-sm">Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-white bg-gray-800"
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
              className="w-full p-2 border border-gray-300 rounded-md text-white bg-gray-800"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="mt-4">
          <p>Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:underline"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
