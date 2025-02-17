import axios from "axios";
import { createContext } from "react";

export let OrdersContext = createContext();

export default function OrdersContextProvider(props) {
    
  function getAllOrders(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <OrdersContext.Provider value={{getAllOrders}}>
      {props.children}
    </OrdersContext.Provider>
  );
}
