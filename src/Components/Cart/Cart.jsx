import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";



export default function Cart() {
  let { getCart , removeItem , updateItemCount , clearUserCart , setNumberCartItem} = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cartDetails, setCartDetails] = useState(null);
  let navigate = useNavigate()
  async function getProducts() {
    let response = await getCart();
    if (response?.data?.status === "success") {
      setCartDetails(response.data.data);
      setIsLoading(false);
    }
    else{
      setIsLoading(false)
    }
  }
  async function clearCart(){
    let response = await clearUserCart()
    
    
    if (response?.data?.message === 'success') {
      toast.success("The Items has been cleared", {
        duration: 2000,
        position: "top-center",
        style: { backgroundColor: "green", textAlign:"center" ,color :"white"},
        success: {background : "white"}
      });
      setNumberCartItem(0)
      navigate('/')
    }
  }
  async function deleteItem (productId){
    let response = await removeItem(productId)
    setCartDetails(response.data.data);
    
    if (response?.data?.status === 'success') {
      toast.success("The Item has been removed", {
        duration: 2000,
        position: "top-center",
        style: { backgroundColor: "green", textAlign:"center" ,color :"white"},
        success: {background : "white"}
      });
      setNumberCartItem(response.data.numOfCartItems)
      
    }
   
  }

  async function updateCountItem(productId , count) {
    let response = await updateItemCount(productId , count)
    setCartDetails(response.data.data);

    
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="bg-main-light p-4 container mt-5 mb-4">
      <Helmet>
        <title>Cart Details</title>
      </Helmet>
      {isLoading?<div className="text-center">
            <i className="fas fa-spinner fa-spin fa-2x text-main"></i>
          </div>:cartDetails === null ? <div className="container"><div className="text-center fw-bolder fs-3">No Items In Your Cart </div></div>: <>
            <h3>Shop Cart : </h3>
            <h6 className="text-main">
              Total Cart Price : {cartDetails?.totalCartPrice} EGP
            </h6>
            {cartDetails.products.map((product , index)=> <div key={index} className="row align-items-center border-bottom py-2 my-2" >
              <div className="col-md-1">
                
                  <img src={product.product.imageCover} className="w-100" alt="" />
                  
              </div>
              <div  className="descCart col-md-11 d-flex justify-content-between">
                  <div> 
                      <h6>{product.product.title}</h6>
                      <h6 className="text-main">price: {product.price} EGP</h6>
                      <button onClick={()=> deleteItem(product.product._id)} className="btn m-0 p-0"><i className="fa-regular fa-trash-can text-main"></i> Remove Item</button>
                  </div>

                  <div>
                    <button onClick={()=> updateCountItem(product.product._id , product.count + 1)} className="btn border-main btn-sm">+</button>
                    <span className="mx-2">{product.count}</span>
                    <button disabled={product.count <= 1 ? true : false} onClick={()=>updateCountItem(product.product._id , product.count - 1) } className="btn border-main btn-sm">-</button>
                  </div>
                 

              </div>
            </div>)}
            <div className="buttonsCart d-flex me-5 justify-content-center">
            <button className="btn btn-success btn-outline-dark w-25 ">
              <Link className="text-white" to={'/checkout'}>
                CheckOut
              </Link>
            </button>
            <button onClick={clearCart} className="btn ms-5 btn-danger btn-outline-dark w-25 text-white ">
                Clear Cart
            </button>
            </div>
          </>}
         
         
        
      </div>
    </>
  );
}
