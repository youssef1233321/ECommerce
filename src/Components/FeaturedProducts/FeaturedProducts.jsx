import React, { useContext } from "react";
import styles from "./FeaturedProducts.module.css";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishListContext";
import Slider from "react-slick";


export default function FeaturedProducts({ products }) {
  let { addToCart, setNumberCartItem } = useContext(cartContext);
  let { addWishList } = useContext(wishListContext);
  let navigate = useNavigate()
  function navigator (){
    navigate('/products')
  }
  async function addWishLists(productId){
    let response = await addWishList(productId)
    if(response?.data?.status === 'success'){
      toast.success(response?.data?.message, {
        duration: 2000,
        position: "top-center",
        style: {
          backgroundColor: "green",
          textAlign: "center",
          color: "white",
        },
        success: { background: "white" },
      });
    }
    
  }

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response?.data?.status === "success") {
      setNumberCartItem(response.data.numOfCartItems);
      toast.success(response?.data?.message, {
        duration: 2000,
        position: "top-center",
        style: {
          backgroundColor: "green",
          textAlign: "center",
          color: "white",
        },
        success: { background: "white" },
      });
    } else {
      toast.error("Failed to add product to your cart", {
        duration: 2000,
        position: "top-center",
        style: { backgroundColor: "red", textAlign: "center", color: "white" },
        success: { background: "white" },
      });
    }
  }
  const settings = {
    className: "center",
    centerMode: false,
    centerPadding: "60px",
    dots: false,
    arrows: false,
    rows: 2,
    initialSlide:0,
    infinite: true,
    speed: 2000,
    fade:false,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplaySpeed: 4000,
    cssEase: "linear",
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
    <div className="my-5  w-100">
      <h3 className="fw-bolder text-center mb-0 py-3 bg-body-secondary rounded-top-4 ">Featured Products</h3>
      <div className="slider-container ">
      <Slider {...settings} className="">
      
      
        {products.map((product) => (
          <div key={product._id} className=" w-100">
            <div className="product px-2 py-3 mx-2 my-3 cursor-pointer bg-body-secondary ">
              <Link to={"/product-details/" + product._id}>
                <img className="w-100" src={product.imageCover} alt="" />
                <span className="text-main fw-bold font-sm">
                  {product.category.name}
                </span>
                <h3 className="h6 fw-bolder">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star rating-color"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
             
            </div>
          </div>
        ))}
         
      
      </Slider>
      </div>
      <footer className="d-flex justify-content-center bg-body-secondary py-3 rounded-bottom-4">
        <button onClick={navigator} className="btn py-2 btn-outline-dark fw-bolder w-50 btn-primary text-white">View All Products</button>
      </footer>
      </div>
    </>
  );
}
