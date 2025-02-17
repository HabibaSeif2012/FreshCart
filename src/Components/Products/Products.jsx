import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useProducts from '../../Hooks/useProducts'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../../Context/WishlistContext'

export default function Products() {
  
  
  let {addProductToCart,setitemsNum,itemsNum}=useContext(CartContext);
  let {addToWishlist,wishItems,setwishItems,removeFromWishlist,FavouritesId,setFavouritesId}=useContext(WishlistContext);

  let {data,isError,isLoading,isFetching}= useProducts();
  const [currentId, setcurrentId] = useState(0)
  const [loading, setloading] = useState(false)
  
  
async function addToCart(id){
  setcurrentId(id);
  setloading(true);
  let response = await addProductToCart(id);
  if(response.data.status=='success'){
    setloading(false);
    setitemsNum(itemsNum+1)

        // console.log(response);
    toast.success(response.data.message)
  }else{
    setloading(false);

    toast.error(response.data.message)
  }

}
useEffect(()=>{
 
},[])

if (isLoading){
  return <><div className='h-screen flex items-center justify-center m-auto'><span class="loader "></span></div></>
}

if (isError){
  return <div  className='m-auto p-3 bg-red-500 text-white text-xl text-center'> {error}</div>
}

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
  return <>
 <div className="flex flex-wrap py-5 px-5 h-full" >
 {data.map((product)=>
  ( <div key={product.id} className='lg:w-1/6 md:w-2/4 w-full p-5 shadow-md' >
    <div className="product p-3 relative ">
    <button onClick={() => addWishlist(product.id)} className="absolute top-[15px] right-[15px]">
  <i className={`fa-solid fa-heart text-2xl 
    ${FavouritesId.includes(product.id) ? "text-blue-900" : "text-gray-300"} 
    cursor-pointer`}>
  </i>
</button>
     <Link to={`/productdetails/${product.id}/${product.category.name}`}>
     <img src={product.imageCover} className='w-full' alt="" />
      <h3 className='text-blue-800'>{product.category.name}</h3>
      <h3 className='mb-3 text-black'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
      <div className='flex justify-between p-3'>
        <span>{product.price}EGP</span>
        <span><i className="fa-solid fa-star text-blue-800 mr-1.5"></i>{product.ratingsAverage}</span>
        </div>
     </Link>
     
      <button onClick={()=>addToCart(product.id)} className='btn w-full bg-blue-300 rounded-lg py-4 text-black cursor-pointer'>{loading&&currentId==product.id?(<i class="fa-solid fa-spinner fa-spin"></i>):("Add to Cart")}</button>
    </div>

  </div>)
  )
  }
 </div>
  </>
   
  
}
