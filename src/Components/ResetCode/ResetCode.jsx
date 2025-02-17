import React, { useContext, useState } from 'react'
import style from './ResetCode.module.css'
import { UserContext } from '../../Context/UserContext'
import { Formik, useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ResetCode() {
  let navigate = useNavigate();

  const [isLoading, setisLoading] = useState(false);


  let myValidation = yup.object().shape({
     resetCode: yup
       .string()
       .required("resetCode is required"),
  });
   let formik = useFormik({
     //the same object that the backend needs
     initialValues: {
       resetCode: "",
     },
     validationSchema: myValidation, //validation schema that compares the yup objcet with the formik object that the user writes
     //function that will be called when we submit the form
     onSubmit: resetCode,
   });
 
async function resetCode(values){
   let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{resetCode:values.resetCode,}).then((res)=>res
   ).catch((err)=>err);
   console.log(data)
   if(data.status=='Success'){
    toast.success('Reset Code Verified Successfully');
    navigate('/repass');
   }
}

 
  return <>


<form
          onSubmit={formik.handleSubmit}
          className="w-[50%] mx-auto shadow-2xl shadow-blue-900 p-5 rounded-xl bg-blue-300 "
        >
          <div>
            <div className="flex justify-start items-center">
              <label
                htmlFor="email"
                className=" mt-4 text-left text-black font-bold "
              >
                Enter Reset Code
              </label>
            </div>

            <input
              type="text"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="resetCode"
              id="resetCode"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border-blue-950 text-gray-900 text-sm rounded-lg focus:border-blue-900 w-full p-2.5  "
              placeholder="name@google.com"
            />

            {formik.errors.resetCode && formik.touched.resetCode ? (
              <div
                role="alert"
                className="mt-4 relative flex w-full p-3 text-sm text-white bg-red-600 rounded-md"
              >
                <span className="text-fa-medium">{formik.errors.resetCode}</span>
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="bg-blue-100 mt-3.5 p-3 rounded-2xl text-black font-bold cursor-pointer"
          >
            Repassword
          </button>

          </form>
  </>
   
  
}

