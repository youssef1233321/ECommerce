import React, { useContext, useEffect, useState } from "react";
import styles from "./SubCategory.module.css";
import { categoryContext } from "../../Context/CategoryContext";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function SubCategory() {
  let { myId } = useParams();
  const [loading, isLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  let { getSpceficSubCat, getAllProducts } = useContext(categoryContext);
  async function addSpecficSubCar() {
    let response = await getSpceficSubCat(myId);
    setData(response);
  }

  let { addToCart, setNumberCartItem } = useContext(cartContext);

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
    async function getAll() {
      let response = await getAllProducts();
      if (response.length > 0) {
        setFilterProducts(
          response.filter((ele) => ele.subcategory[0]._id === myId)
        );
      }
      await addSpecficSubCar();
      isLoading(false);
    }
    getAll();
  }, []);
  
  return (<> 
  <Helmet>
    <title>Products on Sub Category</title>
   </Helmet>
    
    <div className="container mt-5">
      {loading ? (
        <div className="text-center mt-5">
          <i className="fas fa-spinner fa-spin fa-2x text-main mt-5"></i>
        </div>
      ) : (
        <>
          <h2 className="  position-relative py-3 fw-bolder d-flex justify-content-center align-items-center">
            <span className="rounded-4 w-100 h-100 position-absolute bg-dark opacity-25 start-0 "></span>
            {data.name}
          </h2>
          {filterProducts.length === 0 ? (
            <div className="bg-dark p-4 text-white fw-bold text-center fs-1 opacity-50">
              There is no items here
            </div>
          ) : (
            <div className="row justify-content-center">
              {filterProducts.map((product) => (
                <div key={product._id} className="col-md-3">
                  <div className=" product px-2 py-3 cursor-pointer">
                    <Link to={"/product-details/" + product._id}>
                      <div className="productItem p-3">
                        <img
                          className="w-100"
                          src={product.imageCover}
                          alt=""
                        />
                        <span className="text-main fw-bold font-sm d-block mt-3">
                          {product.category.name}
                        </span>
                        <span className="text-main  fw-bold font-sm d-block">
                          {product.subcategory[0].name}
                        </span>
                        <span className="text-main  fw-bold font-sm d-block">
                          {product.brand.name}
                        </span>
                        <h3 className="h5 text-success fw-bolder">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h3>
                        <div className="d-flex justify-content-between">
                          <span className="text-muted">
                            {product.price} EGP
                          </span>
                          <span>
                            <i className="fas fa-star rating-color"></i>
                            {product.ratingsAverage}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div>
                      <button
                        onClick={() => addProduct(product._id)}
                        className="btn bg-main text-white w-100"
                      >
                        + Add Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
    </>);
  
}
