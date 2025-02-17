import React, { useEffect, useState } from "react";
import style from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";
export default function CategorySlider() {
const [categories, setcategories] = useState([])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed:1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          autoplay: true,
          autoplaySpeed:2000,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed:2000,
        }
      }
    ]
  };

  function getCategory() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        // console.log(res.data.data);
        setcategories(res.data.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  useEffect(() => {
    getCategory()
  }, [])
  
  return (
    <>
    <div>
      <h2 className="font-bold text-blue-900 text-lg text-left mb-2"> Shop Popular Categories</h2>
    <Slider {...settings}>
      {categories?.map((category)=>
        <div className="">
          <img src={category?.image} className="w-full h-[200px] object-cover" alt="" />

          <h4 className="font-bold text-blue-900">{category.name}</h4>
        </div>
      )}

    </Slider>
    </div>
   
  
   
    </>
  );
}
