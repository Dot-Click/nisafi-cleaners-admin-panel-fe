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
  console.log("images", images);
  return (
    <Col span={24}>
      <Carousel
        autoPlay={autoPlay}
        selectedItem={currentSlide}
        onChange={updateCurrentSlide}
        dynamicHeight
        // width={800}
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
