import { Image } from "antd";
import React from "react";

const CustomAvatar = ({ name, imgUrl, size }) => {
  return (
    <Image
      preview={false}
      src={imgUrl}
      width={size}
      // height={size}
      className={`rounded-full !object-contain`}
      fallback={`https://placehold.co/180x180/6BC3E6/white?text=${name
        ?.charAt(0)
        ?.toUpperCase()}`}
    />
  );
};

export default CustomAvatar;
