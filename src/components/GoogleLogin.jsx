import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      navigate("/"); // Redirect to Random Gifs UI
    } catch (error) {
      alert(error.message);
    }
  };

  return <button onClick={handleGoogleLogin} className="w-full bg-red-500 text-white p-2 rounded mt-4 transition-transform duration-300 hover:scale-105">Login with Google</button>;
};

export default GoogleLogin;