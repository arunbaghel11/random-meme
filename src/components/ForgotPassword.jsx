import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      alert("Password reset email sent!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 transition-all duration-500">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md transform transition-transform duration-500 hover:scale-105">
        <h2 className="text-2xl mb-4">Reset Password</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 w-full border rounded transition-colors duration-300 focus:border-blue-500"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded transition-transform duration-300 hover:scale-105">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;