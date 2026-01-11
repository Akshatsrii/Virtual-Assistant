import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { userDataContext } from "./context/UserContext";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Customize from "./pages/Customize";
import Customize2 from "./pages/Customize2";


function App() {
  // ✅ SAFE context usage (prevents crash)
  const context = useContext(userDataContext);
  const userData = context?.userData;
  const loading = context?.loading;

  // ✅ Wait until auth check finishes
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* ================= HOME ================= */}
      <Route
        path="/"
        element={
          userData?.assistantName && userData?.assistantImage ? (
            <Home />
          ) : userData ? (
            <Navigate to="/customize" />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      {/* ================= SIGN UP ================= */}
      <Route
        path="/signup"
        element={
          !userData ? <SignUp /> : <Navigate to="/" />
        }
      />

      {/* ================= SIGN IN ================= */}
      <Route
        path="/signin"
        element={
          !userData ? <SignIn /> : <Navigate to="/" />
        }
      />

      {/* ================= CUSTOMIZE ================= */}
      <Route
        path="/customize"
        element={
          userData ? <Customize /> : <Navigate to="/signin" />
        }
      />
      <Route path="/customize2" element={<Customize2 />} />

    </Routes>
  );
}

export default App;
