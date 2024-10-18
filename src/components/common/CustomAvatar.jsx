import { Image } from "antd";

const CustomAvatar = ({ name, imgUrl, size, className }) => {
  return (
    <Image
      preview={false}
      src={imgUrl}
      width={size}
      height={size}
      className={`rounded-full !object-contain bg-slate-100 ${className}`}
      fallback={`https://placehold.co/180x180/6BC3E6/white?text=${name
        ?.charAt(0)
        ?.toUpperCase()}`}
    />
  );
};

export default CustomAvatar;
