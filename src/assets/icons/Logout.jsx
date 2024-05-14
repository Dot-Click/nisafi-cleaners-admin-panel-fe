import React from "react";

const Logout = ({ size = 20, fill = "#9DB2CE" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox={`0 0 ${size} ${size}`}
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M3 0a3 3 0 00-3 3v14a3 3 0 003 3h6a3 3 0 003-3V3a3 3 0 00-3-3H3zm10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L15.586 11H7a1 1 0 010-2h8.586l-2.293-2.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Logout;
