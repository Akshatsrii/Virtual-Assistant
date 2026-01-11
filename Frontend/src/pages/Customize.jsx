import React, { useContext, useRef, useState } from "react";
import Card from "../components/Card";
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";

function Customize() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // ✅ CORRECT CONTEXT VALUES
  const {
    selectedImage,
    setSelectedImage,
    setBackendImage,
  } = useContext(userDataContext);

  const [selectedSource, setSelectedSource] = useState(null);

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
  ];

  // ================= PRESET IMAGE =================
  const selectPreset = (img) => {
    setSelectedImage(img);   // ✅ store in context
    setBackendImage(null);   // no upload
    setSelectedSource("preset");
  };

  // ================= UPLOAD IMAGE =================
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setSelectedImage(previewUrl); // ✅ preview
    setBackendImage(file);        // ✅ file for backend
    setSelectedSource("upload");
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center justify-center p-6">
      <h1 className="text-white text-3xl mb-10 text-center">
        Select your <span className="text-blue-400">Assistant Image</span>
      </h1>

      {/* IMAGE GRID */}
      <div className="flex flex-wrap justify-center gap-4 max-w-[900px]">
        {images.map((img, i) => (
          <Card
            key={i}
            image={img}
            isSelected={selectedImage === img}
            onClick={() => selectPreset(img)}
          />
        ))}

        {/* UPLOAD CARD */}
        <div
          onClick={() => inputRef.current.click()}
          className={`w-[80px] h-[160px] lg:w-[150px] lg:h-[250px]
            border-2 border-dashed border-blue-400 rounded-2xl
            flex items-center justify-center cursor-pointer
            transition-all
            ${
              selectedSource === "upload"
                ? "ring-4 ring-blue-500 scale-105"
                : "hover:bg-blue-500/10"
            }
          `}
        >
          {selectedSource === "upload" && selectedImage ? (
            <img
              src={selectedImage}
              alt="uploaded"
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <RiImageAddLine className="text-blue-400 text-4xl" />
          )}
        </div>
      </div>

      {/* FILE INPUT */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleUpload}
      />

      {/* NEXT BUTTON */}
      <button
        disabled={!selectedImage}
        onClick={() => navigate("/customize2")}
        className={`mt-10 w-[160px] h-[50px] rounded-full font-semibold
          ${
            selectedImage
              ? "bg-white text-black hover:scale-105"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }
        `}
      >
        Next
      </button>
    </div>
  );
}

export default Customize;
