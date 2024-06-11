import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Image, Col } from "antd";

const ReactCarousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const updateCurrentSlide = (index) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };

  return (
    <Col span={18}>
      <Carousel
        autoPlay={autoPlay}
        selectedItem={currentSlide}
        onChange={updateCurrentSlide}
        dynamicHeight
        width={600}
      >
        {images?.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index}`} />
        ))}
      </Carousel>
    </Col>
  );
};

export default ReactCarousel;
