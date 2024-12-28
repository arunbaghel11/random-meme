import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import Random from "./components/Random";
import Tag from "./components/Tag";

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Protect the main UI */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="w-full h-screen flex flex-col background relative items-center overflow-x-hidden">
                <h1 className="bg-white rounded-lg uppercase w-11/12 text-center mt-[40px] ml-[15px] py-2 px-10 text-4xl font-bold ">
                  Random Gifs
                </h1>
                <div className="flex flex-col w-full items-center gap-y-10 mt-[30px]">
                  <Random />
                  <Tag />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
}