import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import SlideCard from "./SliderCard/SlideCard";
import { SliderData } from "../utils/products";

const SliderHome = () => {
  const settings = { nav: false, infinite: true, slidesToShow: 1, slidesToScroll: 1, autoplay: true };

  return (
    <section className="homeSlide">
      <Container>
        <Slider {...settings}>
          {SliderData.map((slide, index) => <SlideCard key={index} title={slide.title} cover={slide.cover} desc={slide.desc} />)}
        </Slider>
      </Container>
    </section>
  );
};

export default SliderHome;
