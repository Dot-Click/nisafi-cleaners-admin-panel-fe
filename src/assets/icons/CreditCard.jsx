import React from "react";

const CreditCard = ({ size = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox={`0 0 ${size * 1.15} ${size * 0.9}`}
    >
      <path
        fill="#9DB2CE"
        d="M3.841.619A3.841 3.841 0 000 4.46v1.746h22.35V4.46A3.842 3.842 0 0018.51.62H3.841zm18.51 6.984H0v5.937a3.841 3.841 0 003.841 3.841H18.51a3.842 3.842 0 003.841-3.841V7.603zm-6.287 5.588h2.794a.698.698 0 110 1.397h-2.794a.698.698 0 010-1.397z"
      ></path>
    </svg>
  );
};

export default CreditCard;
