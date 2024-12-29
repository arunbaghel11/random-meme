import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // Redirect to Random Gifs UI
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  const handleForgotPasswordRedirect = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 transition-all duration-500">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md transform transition-transform duration-500 hover:scale-105">
        <h2 className="text-2xl mb-4">Log In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 w-full border rounded transition-colors duration-300 focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 w-full border rounded transition-colors duration-300 focus:border-blue-500"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded transition-transform duration-300 hover:scale-105">
          Log In
        </button>
        <GoogleLogin />
        <button
          type="button"
          onClick={handleSignupRedirect}
          className="w-full bg-gray-500 text-white p-2 rounded mt-4 transition-transform duration-300 hover:scale-105"
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={handleForgotPasswordRedirect}
          className="w-full bg-gray-500 text-white p-2 rounded mt-4 transition-transform duration-300 hover:scale-105"
        >
          Forgot Password
        </button>
      </form>
    </div>
  );
};

export default Login;