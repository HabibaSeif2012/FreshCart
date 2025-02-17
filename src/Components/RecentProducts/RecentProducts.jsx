import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useProducts from '../../Hooks/useProducts'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../../Context/WishlistContext'
export default function RecentProducts() {

let {data,isError,isLoading,isFetching}= useProducts();

const [loading, setloading] = useState(false)
const [currentId, setcurrentId] = useState(0)


let {addProductToCart,setitemsNum,itemsNum}=useContext(CartContext);
let {addToWishlist,wishItems,setwishItems,removeFromWishlist,FavouritesId,setFavouritesId}=useContext(WishlistContext);

async function addToCart(id){
  setcurrentId(id)
  setloading(true);
  let response = await addProductToCart(id);
  // console.log(response);
  if(response.data.status=='success'){
    toast.success(response.data.message);
    setitemsNum(itemsNum+1)
    setloading(false)
  }else{
    toast.error(response.data.message);
    setloading(false)

  }

}
// async function addWishlist(id){
//   setcurrentId(id);
//   let res=await addToWishlist(id);
//   console.log(res);
//   if (res.data.status=='success'){
//     setWish(true);
//     toast.success(res.data.message);

//   }
//   else{
//     setWish(false);
//     toast.error("Cannot Add to Wishlist");
    
//   }

// }
// async function addWishlist(id) {
//   let res = await addToWishlist(id);

//   if (res.data.status === "success") {
//     let updatedWishlist;

//     if (Wishlist.includes(id)) {
//       // ✅ Remove item from wishlist
//       Favourites = Wishlist.filter((item) => item !== id);
//       setwishItems((prev) => prev - 1);
//       toast.error("Removed from Wishlist");
//     } else {
//       // ✅ Add item to wishlist
//       updatedWishlist = [...Wishlist, id];
//       setwishItems((prev) => prev + 1);
//       toast.success("Added to Wishlist");
//     }

//     // ✅ Update state and save to localStorage
//     setFavourites(updatedWishlist);
//     localStorage.setItem("wishList", JSON.stringify(updatedWishlist));
//   } else {
//     toast.error("Cannot Add to Wishlist");
//   }
// }

async function addWishlist(id) {
  if (FavouritesId.includes(id)) {
    await removeFromWishlist(id);
    setFavouritesId((prev) => prev.filter((item) => item !== id)); // Remove item
    toast.success("Removed from Wishlist");
  } else {
    await addToWishlist(id);
    setFavouritesId((prev) => [...prev, id]); // Add item
    toast.success("Added to Wishlist");
  }
}


  
if (isLoading){
  return <><div className='h-screen flex items-center justify-center m-auto'><span class="loader "></span></div></>
}

if (isError){
  return <div  className='m-auto p-3 bg-red-500 text-white text-xl text-center'> {error}</div>
}

 
  return <>
 <div className="flex flex-wrap py-5 px-5 h-full" >
 {data.map((product)=>
  ( <div key={product.id} className='lg:w-1/6 md:w-2/4 w-full '>
    <div className="product p-3 relative shadow-xl ">
    <button onClick={() => addWishlist(product.id)} className="absolute top-[15px] right-[15px]">
  <i className={`fa-solid fa-heart text-2xl 
    ${FavouritesId.includes(product.id) ? "text-blue-900" : "text-gray-300"} 
    cursor-pointer`}>
  </i>
</button>
     <Link to={`/productdetails/${product.id}/${product.category.name}`}>
     <img src={product.imageCover} className='w-full p-5' alt="" />
      <h3 className='text-blue-800'>{product.category.name}</h3>
      <h3 className='mb-3 text-black'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
      <div className='flex justify-between p-3'>
        <span>{product.price}EGP</span>
        <span><i className="fa-solid fa-star text-blue-800 mr-1.5"></i>{product.ratingsAverage}</span>
        </div>
     </Link>
     
      <button onClick={()=>addToCart(product.id)} className='btn w-full bg-blue-300 rounded-lg py-4 text-black cursor-pointer'> {loading&&currentId==product.id?(<i class="fa-solid fa-spinner fa-spin"></i>):("Add to Cart")}
       </button>
    </div>

  </div>)
  )
  }
 </div>
  </>
   
  
}
