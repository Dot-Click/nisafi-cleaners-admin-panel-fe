import React from "react";

const Grid = ({ size = 20, fill = "#9DB2CE" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox={`0 0 ${size * 1.25} ${size * 1.3}`}
    >
      <path
        fill={fill}
        d="M0 13a1.345 1.345 0 001.345 1.345h8.071A1.346 1.346 0 0010.761 13V2.24A1.345 1.345 0 009.416.894h-8.07A1.345 1.345 0 000 2.239V13zm0 10.761a1.345 1.345 0 001.345 1.346h8.071a1.345 1.345 0 001.345-1.346v-5.38a1.346 1.346 0 00-1.345-1.345h-8.07A1.345 1.345 0 000 18.38v5.38zm13.452 0a1.345 1.345 0 001.345 1.346h8.07a1.345 1.345 0 001.346-1.346v-10.76a1.346 1.346 0 00-1.345-1.346h-8.071A1.345 1.345 0 0013.452 13v10.761zM14.797.894a1.345 1.345 0 00-1.345 1.345v5.38a1.345 1.345 0 001.345 1.346h8.07a1.345 1.345 0 001.346-1.346V2.24A1.345 1.345 0 0022.868.894h-8.071z"
      ></path>
    </svg>
  );
};

export default Grid;
