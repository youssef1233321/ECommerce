import React, { useEffect, useState } from "react";
import styles from "./CategorySlider.module.css";
import Slider from "react-slick";
import axios from "axios";
export default function CategorySlider({cat}) {
  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    dots: true,
    initialSlide:0,
    infinite: true,
    speed: 1000,
    fade:true,
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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots:false,
          arrows:false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots:false,
          arrows:false
        }
      }
    ]
  };
  
  
  return (
    <>
    <div className="slider-container catSlider ">
      <Slider {...settings} className="my-5">
        {cat?.map((cat) => (
          <div className="px-2" key={cat._id}>
            <img className=" mx-auto catSlideImg"  height={500} src={cat.image} />
            <h2 className="h6 pt-2 text-center fw-bold">{cat.name}</h2>
          </div>
        ))}
      </Slider>
      </div>
    </>
  );
}
