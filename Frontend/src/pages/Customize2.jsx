import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { userDataContext } from "../context/UserContext";

function Customize2() {
  const navigate = useNavigate();

  const {
    serverUrl,
    userData,
    setUserData,
    backendImage,
    selectedImage,
  } = useContext(userDataContext);

  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || ""
  );
  const [loading, setLoading] = useState(false);

  // ================= SUBMIT =================
  const handleUpdateAssistant = async () => {
    if (!assistantName || (!backendImage && !selectedImage)) {
      alert("Please select an image and enter name");
      return;
    }

    try {
      setLoading(true);

      // 🔥 DEBUG (remove later)
      console.log("selectedImage:", selectedImage);
      console.log("backendImage:", backendImage);

      const formData = new FormData();
      formData.append("assistantName", assistantName);

      if (backendImage) {
        // uploaded image
        formData.append("image", backendImage);
      } else {
        // preset image (URL)
        formData.append("imageUrl", selectedImage);
      }

      const res = await axios.post(
        `${serverUrl}/api/user/assistant`,
        formData,
        {
          withCredentials: true,
        }
      );

      // 🔥 VERY IMPORTANT
      console.log("BACKEND RESPONSE:", res.data);
      setUserData(res.data);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Assistant creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col justify-center items-center p-6 relative">
      
      {/* BACK */}
      <button
        onClick={() => navigate("/customize")}
        className="absolute top-6 left-6 text-white text-2xl hover:scale-110 transition"
      >
        <IoArrowBack />
      </button>

      {/* TITLE */}
      <h1 className="text-white text-[30px] mb-[40px] text-center">
        Enter Your <span className="text-blue-300">Assistant Name</span>
      </h1>

      {/* INPUT */}
      <input
        type="text"
        placeholder="eg. Shifra"
        value={assistantName}
        onChange={(e) => setAssistantName(e.target.value)}
        className="
          w-full max-w-[600px] h-[60px]
          bg-transparent
          border-2 border-white
          text-white text-[18px]
          placeholder-gray-300
          px-[20px]
          rounded-full
          outline-none
          mb-[30px]
        "
      />

      {/* BUTTON */}
      {assistantName && (
        <button
          disabled={loading}
          onClick={handleUpdateAssistant}
          className="
            min-w-[300px] h-[60px]
            bg-white
            text-black
            text-[19px]
            font-semibold
            rounded-full
            hover:scale-105
            transition-all
            disabled:opacity-60
          "
        >
          {loading ? "Creating..." : "Finally Create Your Assistant"}
        </button>
      )}
    </div>
  );
}

export default Customize2;
