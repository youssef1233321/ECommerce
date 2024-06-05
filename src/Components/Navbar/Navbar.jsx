import React, { useContext, useEffect } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/image/icons8-shopping-bag-94.png";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { useMediaQuery } from '@custom-react-hooks/all';

export default function Navbar({ userData, saveUserData, signOut }) {
  let { numberCartItem } = useContext(cartContext);
  const isWide = useMediaQuery('(max-width: 991px)');
  
  useEffect(() => {
    saveUserData();
  }, []);
  return (
    <>
      <nav className="  navbar navbar-expand-lg navbar-light   fixed-top py-1  ">
        <Link className="navbar-brand p-0" to="/">
          <img src={logo} height={70} alt="" />
        </Link>
        {isWide? userData !== null ? 
          <div className="dropstart">
            <button
              className="btn btn-primary dropdown-toggle "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Profile
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={"/changepassword"}>
                  Change Password
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={"/allorders"}>
                  Your Orders
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={"/favourite"}>
                  WishList
                </Link>
              </li>
              <li className="ps-3"> 
                <Link onClick={signOut} className="">
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>:null:null}
       
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
       
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          {userData !== null ? (
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/" aria-current="page">
                  Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="Products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="Categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="Brands">
                  Brands
                </Link>
              </li>
              <li className="nav-item  d-flex align-items-center ">
                <Link className="nav-link   " to="Cart">
                  <i className="position-relative   fa-solid fa-cart-shopping fa-lg pe-2">
                    <span className="countCart ">{numberCartItem}</span>
                  </i>
                </Link>
              </li>
            </ul>
          ) : null}

          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            {userData === null ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="Login"
                    aria-current="page"
                  >
                    Sign In
                    <span className="visually-hidden">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="Register">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </div>
        {isWide? null :userData !== null ? 
          <div className="dropstart">
            <button
              className="btn btn-primary dropdown-toggle "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Profile
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={"/changepassword"}>
                  Change Password
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={"/allorders"}>
                  Your Orders
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={"/favourite"}>
                  WishList
                </Link>
              </li>
              <li className="ps-3"> 
                <Link onClick={signOut} className="">
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
         : null}
        
        
      </nav>
    </>
  );
}
