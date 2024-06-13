import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Image, Col } from "antd";
import { baseURL } from "../../configs/axiosConfig";

const ReactCarousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const updateCurrentSlide = (index) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };
  return (
    // className="!h-[600px]"
    <Col span={12} className="min-h-[550px] !object-fill">
      <Carousel
        autoPlay={autoPlay}
        selectedItem={currentSlide}
        onChange={updateCurrentSlide}
        dynamicHeight={false}
        // dynamicHeight
        width={"100%"}
        className="!object-contain"
      >
        {images?.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index}`} />
        ))}
      </Carousel>
    </Col>
  );
};
// <img key={index} src={baseURL + image} alt={`Slide ${index}`} />

export default ReactCarousel;
