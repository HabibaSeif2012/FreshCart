import React, { useContext, useState } from "react";
import style from "./RePassword.module.css";
import { UserContext } from "../../Context/UserContext";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

export default function RePassword() {
  let navigate = useNavigate();
  let {setuserLogin}=useContext(UserContext);

  const [isLoading, setisLoading] = useState(false);

  let myValidation = yup.object().shape({
    email: yup
      .string()
      .email("email is not valid")
      .required("email is required"),
    newPassword: yup
      .string()
      .required("Password is required")
      .min(6, "password min length is 6"),
  });
  let formik = useFormik({
    //the same object that the backend needs
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: myValidation, //validation schema that compares the yup objcet with the formik object that the user writes
    //function that will be called when we submit the form
    onSubmit: handleRepass,
  });

  async function handleRepass(values) {
   let res= await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        email: values.email,
        newPassword: values.newPassword,
      })
      .then((res) => res)
      .catch((err) => err);
      console.log(res);
      setisLoading(true);
    if(res.statusText=="OK"){
      localStorage.setItem("userToken",res.data.token);
      setuserLogin(res.data.token);
      toast.success('Password Updated Successfully');
      navigate("/")
    }
   else if(res.response.data.statusMsg=="error"){
      toast.error(res.data.message)
    }
   else if(res.response.data.statusMsg=="fail"){
      toast.error(res.data.message)
    }
  }

  return (
    <>
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
              Enter Your Email
            </label>
          </div>

          <input
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            id="email"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border-blue-950 text-gray-900 text-sm rounded-lg focus:border-blue-900 w-full p-2.5  "
            placeholder="name@google.com"
          />

          {formik.errors.email && formik.touched.email ? (
            <div
              role="alert"
              className="mt-4 relative flex w-full p-3 text-sm text-white bg-red-600 rounded-md"
            >
              <span className="text-fa-medium">{formik.errors.email}</span>
            </div>
          ) : null}
        </div>
        <div>
          <div className="flex justify-start items-center">
            <label
              htmlFor="newPassword"
              className=" mt-4 text-left text-black font-bold "
            >
              New Password
            </label>
          </div>

          <input
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="newPassword"
            id="newPassword"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border-blue-950 text-gray-900 text-sm rounded-lg focus:border-blue-900 w-full p-2.5  "
            placeholder=""
          />

          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div
              role="alert"
              className="mt-4 relative flex w-full p-3 text-sm text-white bg-red-600 rounded-md"
            >
              <span className="text-fa-medium">{formik.errors.newPassword}</span>
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="bg-blue-100 mt-3.5 p-3 rounded-2xl text-black font-bold cursor-pointer"
        >
          {isLoading?<i class="fa-solid fa-spinner fa-spin"></i>:"Update Password"}
        </button>
      </form>
    </>
  );
}
