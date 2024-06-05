import React from "react";
import styles from "./MainSlider.module.css";
import Slider from "react-slick";
import slide1 from "../../images/slider-image-1.jpeg";
import slide2 from "../../images/slider-image-2.jpeg";
import slide3 from "../../images/slider-image-3.jpeg";
import slide4 from "../../images/grocery-banner-2.jpeg";
import slide5 from "../../images/slider-2.jpeg";

export default function MainSlider() {
  const settings = {
    arrows:false,
    dots: true,
    initialSlide: 0,
    infinite: true,
    speed: 1000,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          dots:false
        },
      },
      
    
        
      
    ],
  };
  return (
    <>
      <div className="row gx-0 py-5">
        <div className="col-md-8">
          <div className="slider-container ">
            <Slider {...settings}>
              <img className="w-100" height={400} src={slide1} alt="" />
              <img className="w-100" height={400} src={slide2} alt="" />
              <img className="w-100" height={400} src={slide3} alt="" />
            </Slider>
          </div>
        </div>
        <div className="col-md-4 mainSlider">
          <img className="" height={200} src={slide4} alt="" />
          <img className="" height={200} src={slide5} alt="" />
        </div>
      </div>
    </>
  );
}
