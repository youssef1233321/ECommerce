import React, { useContext, useEffect, useState } from "react";
import styles from "./WishList.module.css";
import { wishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";


export default function WishList() {
  let { getWishList , delWishList} = useContext(wishListContext);
  let {addToCart , setNumberCartItem} = useContext(cartContext)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getAllWishList() {
    let { data } = await getWishList();
    if (data?.status === "success") {
      setProducts(data.data);
      setLoading(false);
      
    }
  }
  async function removeWishList(productId){
    let response = await delWishList(productId)
    if (response.data.status === 'success'){
      await getAllWishList()
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
  useEffect(() => {
    getAllWishList();
  }, []);
  
  return (
    <>
    <Helmet>
    <title>WishList</title>
   </Helmet>
      <div className="container mt-5">
        {loading ? <div className="text-center mt-5" >
          <i className="fas fa-spinner fa-spin fa-2x text-main mt-5"></i>
        </div>:<><div className="d-flex justify-content-center">
          <h2 className="wishListHead h1 text-center mb-5 py-2 fw-bolder">WishList</h2>
        </div>

        {products.map((ele) => (
          <div key={ele._id} className="rowWishList row my-3 align-items-center py-2 px-1">
            <div className="col-lg-3  containPhotoWishlist">
              <img src={ele.imageCover} height={400} className=" photoWishlist" alt="" />
            </div>
            <div className="col-lg-9  descWishlist  ">
                <div className="d-flex justify-content-between">
                    <p className="fs-4 fw-semibold text-primary">{ele.title}</p>
                    <span className="text-primary fs-5 fw-semibold">{ele.price} EGP</span>
                </div>
                <p className="fw-semibold">Brand : <span className="fw-lighter ">{ele.brand.name}</span> </p>
                <p className="fw-semibold">Category : <span className="fw-lighter "> {ele.category.name}</span> </p>
                <p className="fw-semibold">SubCategory : <span className="fw-lighter ">{ele.subcategory[0].name}</span> </p>
                <div className="d-flex flex-column align-items-lg-end divButtons ">
                  <button onClick={()=> addProduct(ele._id)} className="btn bg-main text-white ">+ Add To Cart</button>
                  <button onClick={()=> removeWishList(ele._id)} className="btn btn-danger  mt-3">Remove</button>
                </div>
                <span className="fw-semibold">Available Quantity : <span className="fw-lighter">{ele.quantity}</span> </span>
                <div className="d-flex mt-3 ">
                <div className=" py-2 px-3 border border-1 border-black rounded-4 " >
                <i className="fa-solid fa-check me-2 text-primary"></i>
                <span>IN STOCK</span>
                </div>
                </div>
                
                
            </div>
          </div>
        ))}</>}
        
      </div>
    </>
  );
}
