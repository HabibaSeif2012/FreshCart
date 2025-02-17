import React, { useContext, useState } from "react";
import style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  let {userLogin,setuserLogin}=useContext(UserContext);
  let navigate = useNavigate(); //the hook use navigate we use it to have a programmatic navigation between components
  const [ApiError, setApiError] = useState("");
  const [isLoading, setisLoading] = useState(false);// loading button for the user
  //the function that works when we submit the form
  async function handleRegister(values) {
    setisLoading(true);//setting loading button until the response comes
    //calling API to send the data to backend
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        setisLoading(false);
        if(res.data.message=="success"){
         localStorage.setItem("userToken",res.data.token);
         setuserLogin(res.data.token);
         navigate("/");//Navigate the user to the homepage after successfully resgister
        }
        // console.log(res.data.token);//token for the user
        
      })
      .catch((err) => {
        // console.log(err.response.data.message);// error message to the user
        setApiError(err.response.data.message);
        setisLoading(false);
      });
  }

  //yup object that has all the validation
  let myValidation = yup.object().shape({
    name: yup
      .string()
      .min(3, "min length is 3 letters")
      .max(10, "max lenght is 10 letters ")
      .required("Name is required"),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "password min length is 6"),
    rePassword: yup
      .string()
      .required("Type your password again")
      .oneOf(
        [yup.ref("password")],
        "Your repassword is not the same as your password"
      ),
    phone: yup
      .string()
      .required("phone is required")
      .matches(/^01[1205][0-9]{8}$/, "Wrong phone number"),
  });
  //formik object that we will send to the backend
  let formik = useFormik({
    //the same object that the backend needs
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: myValidation, //validation schema that compares the yup objcet with the formik object that the user writes
    //function that will be called when we submit the form
    onSubmit: handleRegister,
  });

  return (
    <>
    {ApiError?<div className="mx-auto w-1/2 bg-red-500 text-white font-bold rounded-md p-3 ">
     {ApiError}
    </div>:null}
      <div className="container mx-auto my-8 ">
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
                Your email
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
                htmlFor="name"
                className=" mt-4 text-left text-black font-bold "
              >
                Your Name
              </label>
            </div>

            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border-blue-950 text-gray-900 text-sm rounded-lg focus:border-blue-900 w-full p-2.5  "
              placeholder="Alex Jordan"
            />
            {formik.errors.name && formik.touched.name ? (
              <div
                role="alert"
                className="mt-4 relative flex w-full p-3 text-sm text-white bg-red-600 rounded-md"
              >
                <span className="text-fa-medium">{formik.errors.name}</span>
              </div>
            ) : null}
          </div>
          <div>
            <div className="flex justify-start items-center">
              <label
                htmlFor="pass"
                className=" mt-4 text-left text-black font-bold "
              >
                {" "}
                Password
              </label>
            </div>

            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="pass"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border-blue-950 text-gray-900 text-sm rounded-lg focus:border-blue-900 w-full p-2.5  "
            />
            {formik.errors.password && formik.touched.password ? (
              <div
                role="alert"
                className="mt-4 relative flex w-full p-3 text-sm text-white bg-red-600 rounded-md"
              >
                <span className="text-fa-medium">{formik.errors.password}</span>
              </div>
            ) : null}
          </div>
          <div>
            <div className="flex justify-start items-center">
              <label
                htmlFor="repass"
                className=" mt-4 text-left text-black font-bold "
              >
                Repassword
              </label>
            </div>

            <input
              type="password"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="repass"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border-blue-950 text-gray-900 text-sm rounded-lg focus:border-blue-900 w-full p-2.5  "
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div
                role="alert"
                className="mt-4 relative flex w-full p-3 text-sm text-white bg-red-600 rounded-md"
              >
                <span className="text-fa-medium">
                  {formik.errors.rePassword}
                </span>
              </div>
            ) : null}
          </div>
          <div>
            <div className="flex justify-start items-center">
              <label
                htmlFor="phone"
                className=" mt-4 text-left text-black font-bold "
              >
                Phone Number
              </label>
            </div>

            <input
              type="tel"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border-blue-950 text-gray-900 text-sm rounded-lg focus:border-blue-900 w-full p-2.5  "
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div
                role="alert"
                className="mt-4 relative flex w-full p-3 text-sm text-white bg-red-600 rounded-md"
              >
                <span className="text-fa-medium">{formik.errors.phone}</span>
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="bg-blue-100 mt-3.5 p-3 rounded-2xl text-black font-bold cursor-pointer"
          >
            {isLoading? <i class="fa-solid fa-spinner fa-spin"></i>:"Submit"}
          </button>

          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-black"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Login
            </Link>
            .
          </p>
        </form>
      </div>
    </>
  );
}
