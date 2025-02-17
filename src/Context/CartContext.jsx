import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    const [CartId, setCartId] = useState(0)
    const [itemsNum, setitemsNum] = useState(0)
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function getLoggedUserCartItems() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) =>{  
        setitemsNum(res.data.numOfCartItems)

        setCartId(res.data.data._id) 
        localStorage.setItem("userId",res.data.data.cartOwner);
        // console.log(localStorage.getItem("userId"));
        return res
      }
       
    )
      .catch((err) => err);
  }
  function getUserCartQuantity(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function clearUserCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }
  function checkOut(cartId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      { shippingAddress: formData },  { headers},
      )
      .then((res) => res)
      .catch((err) => err);
  }
useEffect(()=>{getLoggedUserCartItems()
  setitemsNum(itemsNum)
},[])
  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCartItems,
        getUserCartQuantity,
        deleteCartItem,
        clearUserCart,
        checkOut,
        CartId,
        setitemsNum,
        itemsNum,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
