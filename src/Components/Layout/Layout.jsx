import React from "react";
import style from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 min-h-screen">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
