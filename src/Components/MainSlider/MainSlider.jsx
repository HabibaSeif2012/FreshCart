import React from 'react'
import style from './MainSlider.module.css'
import slider1 from '../../assets/slider-image-1.jpeg'
import slider2 from '../../assets/slider-image-2.jpeg'
import slider3 from '../../assets/slider-image-3.jpeg'
import slider4 from '../../assets/grocery-banner.png'
import slider5 from '../../assets/grocery-banner-2.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow:1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:5000,
   
  };
  return(<>


<div className="flex flex-wrap py-5 px-5 my-5" >
<div className='lg:w-3/4 w-full md:w-2/4'>
<Slider {...settings}>
<img src={slider3} className='w-full lg:h-[400px] h-[100px] md:h-[400px]  object-cover'  alt="" />
<img src={slider4} className='w-full lg:h-[400px] h-[100px] md:h-[400px] object-cover'  alt="" />
<img src={slider5} className='w-full lg:h-[400px] h-[100px] md:h-[400px] object-cover'  alt="" />
</Slider>


</div>
<div className='lg:w-1/4 w-full md:w-2/4'>
<img src={slider2} className='w-full h-[200px]' alt="" />
<img src={slider3} className='w-full h-[200px]' alt="" />
</div>


</div>
  
</>
   
  )  
}
