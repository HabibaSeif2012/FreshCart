import React, { useContext, useEffect, useState } from "react";
import style from "./Allorders.module.css";
import { OrdersContext } from "../../Context/OrdersContext";
import { CartContext } from "../../Context/CartContext";
import error from "../../assets/error.svg";
export default function Allorders() {
  let { getAllOrders } = useContext(OrdersContext);
  const [orders, setorders] = useState([])
 let userId=localStorage.getItem('userId');
  // console.log(userId);
async function getOrders(userId){
let {data} =await getAllOrders(userId);
console.log(data);
setorders(data);

}


  useEffect(() => {
    getOrders(userId);
  }, []);

  return (
    <>
    <div className="flex flex-wrap p-5 my-5 gap-2 container mx-auto">
    {orders?.map((order)=><>
  <div className=" sm:w-full md:w-1/2 lg:w-1/4 p-4 bg-blue-300 border border-gray-200 rounded-lg shadow-lg sm:p-8 ">
  <h5 className="mb-4 text-2xl font-medium text-white ">Orders</h5>
  <div className="flex items-baseline text-white">
    <span className="text-5xl font-extrabold tracking-tight text-blue-950">{order.totalOrderPrice}</span>
    <span className="text-3xl font-semibold">EGP</span>
  </div>
   <div className="felx justify-center items-center">
   <h4 className="mt-4 text-2xl font-medium text-blue-950 text-left" >User Details:</h4>
   <ul className="text-left text-white">
    <li><span className="font-extrabold text-blue-950">Email:</span> {order.user.email}</li>
    <li><span className="font-extrabold text-blue-950">Name:</span> {order.user.name}</li>
    <li><span className="font-extrabold text-blue-950">Phone: </span>{order.user.phone}</li>
   </ul>
   <div className="text-left text-white ">
    <span><span className="font-extrabold text-blue-950">City:</span>{order.shippingAddress.city}</span>
    <span className="ml-2.5"><span className="font-extrabold text-blue-950">Details:</span>{order.shippingAddress.details}</span>

   </div>

   </div>
   <div className="flex flex-wrap py-5 px-5 my-5 gap-4">
   {order.cartItems.map((item)=><>
  
    <div className="w-1/4 flex flex-wrap justify-center items-start">
  
   <img src={item.product.imageCover} alt="" className="w-full px-1.5" />
  
    <h4 className="text-white"><span className="text-blue-950 font-bold mr-1">Price:</span>{item.price} EGP</h4>
   
    </div>


  
   </>)
   }
    </div>
 


{order.isDelivered?<><span className="text-white font-bold">
      Deliverd:</span>  <i className="fa-solid fa-square-check text-lg text-blue-950 ml-2"></i></>:<><span className="text-white font-bold" > Deliverd:</span> <i className="fa-solid fa-xmark text-lg text-blue-950 ml-2"></i></>}
      {
        order.isPaid?<><span className="text-white font-bold ms-3">
      Paid:</span>  <i className="fa-solid fa-square-check text-lg text-blue-950 ml-2"></i></>:<><span className="text-white font-bold " > Paid:</span> <i className="fa-solid fa-xmark text-lg text-blue-950 ml-2"></i></>
      }
</div>
</>)}
    </div>




     
    </>
  );
}
