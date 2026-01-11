import React from "react";

function Card({ image, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        w-[80px] h-[160px]
        lg:w-[150px] lg:h-[250px]
        rounded-2xl
        overflow-hidden
        cursor-pointer
        transition-all duration-300

        ${
          isSelected
            ? "border-4 border-cyan-400 scale-105 shadow-2xl shadow-cyan-500/60"
            : "bg-[#020220] border-2 border-[#0000ff66] hover:border-white hover:scale-105 hover:shadow-blue-600/60"
        }
      `}
    >
      <img
        src={image}
        alt="assistant"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default Card;
