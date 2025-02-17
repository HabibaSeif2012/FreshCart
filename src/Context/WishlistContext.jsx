import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishlistContext = createContext();
export default function WishlistContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  const [FavouritesId, setFavouritesId] = useState([])
//  const [wishListfav, setwishListfav] = useState( localStorage.getItem('wishList', JSON.stringify(updatedWishlist)));
const [wishItems, setwishItems] = useState(0)
  function addToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
       { productId: productId }, { headers },
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getLoggedWishList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) =>
        { setFavouritesId(res.data.data.map((item) => item.id)) ;
            setwishItems(res.data.count) ;
            return res
        } )
      .catch((err) => err);
  }
  function removeFromWishlist(productId) {
   return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers,}).then((res) => res).catch((err) => err);
  }
  useEffect(()=>{
    getLoggedWishList()
    setwishItems(wishItems)
    // setwishListfav(wishListfav)
  },[])

  return (
    <WishlistContext.Provider value={{ getLoggedWishList, addToWishlist,removeFromWishlist,wishItems,setwishItems ,FavouritesId,setFavouritesId}}>
      {props.children}
    </WishlistContext.Provider>
  );
}
