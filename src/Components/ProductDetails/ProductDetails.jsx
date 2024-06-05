import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from 'react-slick';
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";



export default function ProductDetails() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  let { myId } = useParams();
  let [product, setProduct] = useState([]);
  let [isLoading , setIsLoading] = useState(false)
  let {addToCart ,setNumberCartItem} = useContext(cartContext);

  async function addProduct (productId) {
   let response = await addToCart(productId)
   if(response?.data?.status === 'success'){
    setNumberCartItem(response.data.numOfCartItems)
    toast.success(response?.data?.message, {
      duration: 2000,
      position: "top-center",
      style: { backgroundColor: "green", textAlign:"center" ,color :"white"},
      success: {background : "white"}
    });
   }
   else{
    toast.error('Failed to add product to your cart',{
      duration: 2000,
      position: "top-center",
      style: { backgroundColor: "red", textAlign:"center" ,color :"white"},
      success: {background : "white"}
    } )
   }
  }

  async function getProductDetails() {
    setIsLoading(true)
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${myId}`
    );
    setProduct(data.data);
    setIsLoading(false)
  }
  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
     <Helmet>
      <title>Product Details</title>
     </Helmet>
      <div className="container mt-5">
      
        <div className="row justify-content-center py-3 align-items-center  ">
          {isLoading? <div className="text-center"><i className="fas fa-spinner fa-spin fa-2x text-main"></i></div>:<><div className="col-md-4">
          <Slider {...settings}>
              {product?.images?.map((item , index) => <img key={index}  src={item}/>)}
          </Slider>
            
          </div>
          <div className="col-md-8 bg-body-secondary containProductDetails">
            <div className=" h-100 descProductDetails d-flex  flex-column justify-content-center">
              <h3 className="fw-bolder">{product.title}</h3>
              <p className="fw-bold mt-2">{product.description}</p>
              <div>
                <span>{product.price} EGP</span>
                <span>
                  <i className="fas fa-star rating-color"></i>
                  {product.ratingsAverage}
                </span>
              </div>
              <div className="mt-3"> 
                <button onClick={()=> addProduct(product._id)} className="btn bg-main text-white w-100">+ Add Cart</button>
              </div>
            </div>
          </div></>}
          
        </div>
      </div>
    </>
  );
}
