import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";


export default function Checkout() {
let {checkOut,CartId}=useContext(CartContext);
let formik = useFormik({
  //the same object that the backend needs
  initialValues: {
    details: "",
    phone: "",
    city: ""
  },
  
  //function that will be called when we submit the form
  onSubmit:()=>handleCheckout(CartId,`http://localhost:5173`),
});

 async function handleCheckout(CartId,url) {
  let {data}= await checkOut(CartId,url,formik.values)
  // console.log(data);
  window.location.href= data?.session.url;
  
  }


  

  return (
    <>

      <div className="container mx-auto my-28 h-screen ">
        <form
          onSubmit={formik.handleSubmit}
          className="w-[50%] mx-auto shadow-2xl shadow-blue-900 p-5 rounded-xl bg-blue-300 "
        >
          <div>
            <div className="flex justify-start items-center">
              <label
                htmlFor="details"
                className=" mt-4 text-left text-black font-bold "
              >
                Your details
              </label>
            </div>

            <input
              type="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="details"
              id="details"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border-blue-950 text-gray-900 text-sm rounded-lg focus:border-blue-900 w-full p-2.5  "
              placeholder="Enter Your details"
            />
          </div>
          <div>
            <div className="flex justify-start items-center">
              <label
                htmlFor="phone"
                className=" mt-4 text-left text-black font-bold "
              >
                Your phone
              </label>
            </div>

            <input
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
              id="phone"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border-blue-950 text-gray-900 text-sm rounded-lg focus:border-blue-900 w-full p-2.5  "
              placeholder="Enter Your phone"
            />
          </div>
          <div>
            <div className="flex justify-start items-center">
              <label
                htmlFor="city"
                className=" mt-4 text-left text-black font-bold "
              >
                Your city
              </label>
            </div>

            <input
              type="text"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="city"
              id="city"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border-blue-950 text-gray-900 text-sm rounded-lg focus:border-blue-900 w-full p-2.5  "
              placeholder="Enter Your city"
            />
          </div>
          
            

           
        


          <button
            type="submit"
            className="bg-blue-100 mt-3.5 p-3 rounded-2xl text-black font-bold cursor-pointer"
          >
            CheckOut
          
          </button>

        
        </form>
      </div>
    </>
  );
}

