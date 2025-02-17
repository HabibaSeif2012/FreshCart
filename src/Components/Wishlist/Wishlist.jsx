import React, { useContext, useEffect, useState } from 'react'
import style from './Wishlist.module.css'
import { WishlistContext } from '../../Context/WishlistContext'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function Wishlist() {
  let {getLoggedWishList,removeFromWishlist,wishItems,setwishItems}=useContext(WishlistContext);
  const [WishList, setWishList] = useState([]);

 async function getWishlist(){
   let res=await getLoggedWishList();
   console.log(res);
   if (res.data.status=='success'){
    setWishList(res.data.data);
   }else{
    return <>
    <h1>Error 404</h1>
    </>
   }
  }
  async function removeProduct(productId){
    let res= await removeFromWishlist(productId);
    console.log(res);
    if(res.data.status=='success'){
      setWishList(res.data.data);
      toast.success(res.data.message);
      setwishItems(wishItems-1)
      getWishlist();

    }
    else{
      toast.error("Cannot remove product from wishlist");
    }
  }
  useEffect(()=>{
    getWishlist();
    console.log(WishList);

  },[])


  return <>
<div className='flex flex-wrap justify-center items-center gap-2 relative mt-5 p-5'>
 {WishList?.length>0?WishList.map((wish)=><>
<div className="lg:w-1/3 md:w-2/1  flex flex-col border border-blue-400 rounded-lg shadow-md md:flex-row p-10 gap-3 bg-blue-300" >
<Link key={wish.id} to={`/productdetails/${wish.id}/${wish?.category?.name}`} >

    <img className="object-cover w-full lg:rounded-2xl md:rounded-lg md:rounded-s-lg" src={wish.imageCover} alt=""/>
   
</Link>
<div className="flex flex-col justify-between p-4 leading-normal mt-2">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{wish.title}</h5>
        <p className="mb-3 font-normal  text-black">{wish?.description}</p>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{wish.price} EGP</h5>
        <button onClick={()=>removeProduct(wish.id)} className=' px-10 py-5 rounded-xl bg-blue-300 cursor-pointer'>Remove</button>
    </div>
</div>



 </>
 ):<><div className='h-screen flex items-center justify-center m-auto'><span class="loader "></span></div></>

 }
 </div>


  
  
  
  </>
   
  
}
