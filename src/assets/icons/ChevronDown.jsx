import React from "react";

const ChevronDown = ({ size = 18, fill = "#3D3C42" }) => {
  return (
    <svg
      width={size}
      height={size - 4}
      viewBox={`0 0 ${size} ${size - 4}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.99023 8L8.49023 12.5L12.9902 8"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronDown;
