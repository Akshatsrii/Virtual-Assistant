import React, { useContext, useState } from "react";
import bg from "../assets/authBg.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext"; // ✅ FIXED

function SignUp() {
  const navigate = useNavigate();

  // ✅ SAFE CONTEXT ACCESS
  const { serverUrl, setUserData } =
    useContext(userDataContext) || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    if (!serverUrl) {
      alert("Server not ready, refresh page");
      return;
    }

    try {
      setLoading(true);

      // ✅ FIX: store response
      const res = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );

      // ✅ set user in context
      setUserData?.(res.data.user);

      navigate("/customize");

    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSignUp}
        className="
          w-full max-w-[460px]
          rounded-2xl
          bg-black/25
          border border-white/20
          shadow-2xl shadow-black/40
          px-8 py-10
          flex flex-col gap-6
        "
      >
        {/* TITLE */}
        <h1 className="text-center text-3xl font-bold text-white">
          Register to{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Virtual Assistant
          </span>
        </h1>

        {/* NAME */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            w-full h-[52px] rounded-full
            bg-transparent
            border border-white/30
            text-white placeholder-gray-300
            px-5 outline-none
            focus:border-cyan-400
            focus:ring-2 focus:ring-cyan-400/40
            transition-all duration-200
          "
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full h-[52px] rounded-full
            bg-transparent
            border border-white/30
            text-white placeholder-gray-300
            px-5 outline-none
            focus:border-cyan-400
            focus:ring-2 focus:ring-cyan-400/40
            transition-all duration-200
          "
        />

        {/* PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full h-[52px] rounded-full
              bg-transparent
              border border-white/30
              text-white placeholder-gray-300
              px-5 pr-12 outline-none
              focus:border-cyan-400
              focus:ring-2 focus:ring-cyan-400/40
              transition-all duration-200
            "
          />

          {showPassword ? (
            <IoEyeOff
              onClick={() => setShowPassword(false)}
              className="
                absolute right-4 top-1/2 -translate-y-1/2
                text-white text-xl cursor-pointer
                hover:text-cyan-400 transition
              "
            />
          ) : (
            <IoEye
              onClick={() => setShowPassword(true)}
              className="
                absolute right-4 top-1/2 -translate-y-1/2
                text-white text-xl cursor-pointer
                hover:text-cyan-400 transition
              "
            />
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full h-[52px]
            rounded-full
            bg-gradient-to-r from-blue-500 to-cyan-400
            text-white font-semibold text-lg
            shadow-lg shadow-blue-500/30
            hover:scale-[1.03]
            active:scale-[0.97]
            transition-all duration-200
            disabled:opacity-60
          "
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* FOOTER */}
        <p className="text-center text-gray-300 text-sm">
          Already have an account?{" "}
          <span
            className="text-cyan-400 cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
