import React from "react";
import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout({userData , saveUserData , signOut}) {
  return (
    <>
    <div className="pt-5 ">
      <Navbar userData={userData} saveUserData = {saveUserData} signOut = {signOut} />
        
          <Outlet></Outlet>
       
     
      </div>
    </>
  );
}
