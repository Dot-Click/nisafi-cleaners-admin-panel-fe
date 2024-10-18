import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Col } from "antd";
import { baseURL } from "../../configs/axiosConfig";

const ReactCarousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const updateCurrentSlide = (index) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };

  const imageStyle = {
    width: "100%",
    height: "550px",
    objectFit: "contain",
  };
  return (
    <Col span={12} className="min-h-[550px] !object-fill">
      <Carousel
        showStatus={false}
        autoPlay
        selectedItem={currentSlide}
        onChange={updateCurrentSlide}
        dynamicHeight={false}
        useKeyboardArrows
        transitionTime={500}
        showIndicators
        // width="600px"
      >
        {images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="!object-contain"
            width={100}
            height={100}
            style={imageStyle}
          />
        ))}
      </Carousel>
    </Col>
  );
};

export default ReactCarousel;
