import React from "react";

const Bell = ({ size = 19, fill = "#4B4B4B" }) => {
  const height = Math.round(size * 1.1);

  return (
    <svg
      width={size}
      height={height}
      viewBox={`0 0 ${size} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.27207 19H11.2638C11.2638 20.1 10.3656 21 9.26791 21C8.1702 21 7.27207 20.1 7.27207 19ZM18.2492 17V18H0.286621V17L2.28246 15V9C2.28246 5.9 4.27831 3.2 7.27207 2.3V2C7.27207 0.9 8.1702 0 9.26791 0C10.3656 0 11.2638 0.9 11.2638 2V2.3C14.2575 3.2 16.2534 5.9 16.2534 9V15L18.2492 17ZM14.2575 9C14.2575 6.2 12.0621 4 9.26791 4C6.47373 4 4.27831 6.2 4.27831 9V16H14.2575V9Z"
        fill={fill}
      />
    </svg>
  );
};

export default Bell;
