import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";

export default function ProductDetails() {
  let { id,category } = useParams();
  let {addProductToCart,setitemsNum,itemsNum}=useContext(CartContext);
  let {addToWishlist,wishItems,setwishItems,removeFromWishlist,FavouritesId,setFavouritesId}=useContext(WishlistContext);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishList')) || []);
  
  
  const [CartDetails, setCartDetails] = useState(null)
  const [product, setproduct] = useState([])
  const [relatedProducts, setrelatedProducts] = useState([])
  const [currentId, setcurrentId] = useState(0)
  const [loading, setloading] = useState(false)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:1000,
    
  };
  async function addWishlist(id) {
    // setCurrentId(id);
  
    let res = await addToWishlist(id);
    if (res.data.status === 'success') {
      let updatedWishlist = [...wishlist];
  
      if (wishlist.includes(id)) {
        // Remove item if already in wishlist
        updatedWishlist = updatedWishlist.filter(item => item !== id);
        // console.log(updatedWishlist)
        toast.error('Removed from Wishlist');
      } else {
        // Add item if not in wishlist
        updatedWishlist.push(id);
        setwishItems(wishItems+1)
        toast.success(res.data.message);
      }
  
      setWishlist(updatedWishlist);
      localStorage.setItem('wishList', JSON.stringify(updatedWishlist));
  
    } else {
      toast.error('Cannot Add to Wishlist');
    }
  }

  async function addToCart(id){
    setcurrentId(id);
    setloading(true);
    let response = await addProductToCart(id);
    if(response.data.status=='success'){
          // console.log(response);
          setitemsNum(itemsNum+1)
          setloading(false);
      toast.success(response.data.message)
    }else{
      setloading(false);
      toast.error(response.data.message)
    }
  
  }

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setproduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getAllproducts(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then(
      (res)=>{
        let related=res.data.data.filter((product)=>product.category.name==category)
        setrelatedProducts(related)
      }).catch((err) => {console.log(err);})
  }

  useEffect(()=>{
    getProduct(id);
    getAllproducts();
  },[id,category])
  return (
    <>
     <div className="flex flex-wrap py-5 px-5 items-center">
      <div className="lg:w-1/4 md:w-2/4 w-full ">

      <Slider {...settings}>
        {product?.images?.map((src)=> <img src={src}/>)}
      </Slider>
    
      </div>
      <div className="lg:w-3/4 md:w-2/4 w-full p-3">
      <h3 className="font-bold text-2xl text-blue-950 text-left">{product?.title}</h3>
      <h3 className="mt-2 text-lg text-left">{product?.description}</h3>
      <h3 className="text-slate-500 text-left">{product?.category?.name}</h3>

      <div className='flex justify-between mt-1'>
        <span className="font-bold">{product?.price} EGP</span>
        <span><i className="fa-solid fa-star text-blue-800 mr-1.5"></i>{product?.ratingsAverage}</span>
        </div>
        <button onClick={()=>addToCart(product.id)} className='btn w-full mt-5 bg-blue-300 rounded-lg py-4 text-black cursor-pointer'>{loading&&currentId==product.id?(<i class="fa-solid fa-spinner fa-spin"></i>):("Add to Cart")}</button>
      </div>
    </div>

     <div className="flex flex-wrap py-5 px-5 h-full" >
 {relatedProducts.length>0?relatedProducts.map((product)=>
  ( <div key={product.id} className='w-full lg:w-1/6 md:w-1/4'>
    <div className="product p-3 relative">
    <button onClick={() => addWishlist(product.id)} className="absolute top-[15px] right-[15px]">
  <i className={`fa-solid fa-heart text-2xl 
    ${FavouritesId.includes(product.id) ? "text-blue-900" : "text-gray-300"} 
    cursor-pointer`}>
  </i>
</button>
     <Link to={`/productdetails/${product.id}/${product.category.name}`} >
     <img src={product.imageCover} className='w-full p-5' alt="" />
      <h3 className='text-blue-800'>{product.category.name}</h3>
      <h3 className='mb-3 text-black'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
      <div className='flex justify-between p-3'>
        <span>{product.price}EGP</span>
        <span><i className="fa-solid fa-star text-blue-800 mr-1.5"></i>{product.ratingsAverage}</span>
        </div>
     </Link>
     
      <button onClick={()=>addToCart(product.id) } className='btn w-full bg-blue-300 rounded-lg py-4 text-black cursor-pointer'>{loading&&currentId==product.id?(<i class="fa-solid fa-spinner fa-spin"></i>):("Add to Cart")}</button>
    </div>

  </div>)
  ):<><div className='h-screen m-auto flex items-center justify-center'><span class="loader "></span></div></>
  }
 </div>
  
    </>
  );
}
