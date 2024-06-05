import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Products.module.css";
import { categoryContext } from "../../Context/CategoryContext";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import InputColor from "react-input-color";
import { LuSettings2 } from "react-icons/lu";
import { wishListContext } from "../../Context/WishListContext";
import { Helmet } from "react-helmet";


export default function Products() {
  let { getAllProducts } = useContext(categoryContext);
  let { addToCart, setNumberCartItem } = useContext(cartContext);
  let [products, setProducts] = useState([]);
  let divElement = useRef()
  let { addWishList } = useContext(wishListContext);
  function filterOpen(){
   
    if(divElement.current.children[0].children[1].style.display === "none"){
      divElement.current.children[0].children[1].style.display = "block"
    }
    else {
      divElement.current.children[0].children[1].style.display = "none"
    }
    
  }

  const [filteredProducts, setFilteredProducts] = useState(null);
  const [color, setColor] = useState({});
  const [sortProducts, setSortProducts] = useState(null);

  const [loading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = sortProducts === null? 
  filteredProducts === null?
  products.slice(itemOffset, endOffset):
  filteredProducts.slice(itemOffset, endOffset):
  filteredProducts === null? 
  products.sort((a,b)=>{ if(sortProducts ==="Name"){
    return a.title.localeCompare(b.title)}
    else if(sortProducts === "Min Price"){
      return a.price - b.price
    }
    else if (sortProducts === "Max Price"){
      return b.price - a.price
    }
  }).slice(itemOffset, endOffset):
  filteredProducts.sort((a,b) => { if(sortProducts ==="Name"){
    return a.title.localeCompare(b.title)}
    else if(sortProducts === "Min Price"){
      return a.price - b.price
    }
    else if (sortProducts === "Max Price"){
      return b.price - a.price
    }}).slice(itemOffset, endOffset)

  
    
  const pageCount =
    filteredProducts === null
      ? Math.ceil(products.length / itemsPerPage)
      : Math.ceil(filteredProducts.length / itemsPerPage);

  function filterProduct(cat) {
    let data = products.filter((product) => product.category.name === cat);
    setFilteredProducts(data);
  
  }

  

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  async function addProducts() {
    let response = await getAllProducts();
    setProducts(response);
    setLoading(false);

    
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

  useEffect(() => {
    addProducts();
  }, []);

  return (
    <>
     <Helmet>
      <title>Products</title>
     </Helmet>
      {loading ? (
        <div className="container">
          <div className="text-center mt-5">
            <i className="fas fa-spinner fa-spin fa-2x text-main mt-5"></i>
          </div>
        </div>
      ) : (
        <>
          <div className=" mt-4 row productRow  mx-0 ">
            <div className="col-lg-2  px-0 mx-0">
              <div ref={divElement}>
                <div className="position-relative">
                <button onClick={filterOpen} className="btn btn-dark mt-2 ms-1 "><LuSettings2/> Filter</button>
                <aside className=" asideProduct position-absolute ">
                <h4 className="pt-3 fw-bolder h3">Filter By:</h4>
                <hr />
                <h5 className="h4 fw-semibold ">Categories</h5>
                <hr />
                <ul className="list-unstyled fs-5 fw-semibold my-4">
                  <li>
                    <div className="form-check">
                      <input
                        onClick={(e) => filterProduct(e.target.value)}
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="Women's Fashion"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Women's Fashion
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        onClick={(e) => filterProduct(e.target.value)}
                        value="Men's Fashion"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Men's Fashion
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                        onClick={(e) => filterProduct(e.target.value)}
                        value="Electronics"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault3"
                      >
                        Electronics
                      </label>
                    </div>
                  </li>
                </ul>
                <hr />
                <div className="d-flex align-items-center my-4 ">
                  <h5 className="h4 fw-semibold">Colors</h5>
                  <div className="ms-4">
                    <InputColor initialValue="#e4e6f2ff" onChange={setColor} />
                  </div>
                </div>
                <hr />

                <h5 className="h4 fw-semibold">Sort By</h5>
                <hr />
                <ul className="list-unstyled fs-5 fw-semibold my-4">
                  <li>
                    <div className="form-check">
                      <input
                        onClick={(e) => setSortProducts(e.target.value)}
                        value="Name"
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefaul"
                        id="flexRadioDefault4"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault4"
                      >
                        Name
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        onClick={(e) => setSortProducts(e.target.value)}
                        value="Min Price"
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefaul"
                        id="flexRadioDefault5"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault5"
                      >
                        Min Price
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        onClick={(e) => setSortProducts(e.target.value)}
                        value="Max Price"
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefaul"
                        id="flexRadioDefault6"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault6"
                      >
                        Max Price
                      </label>
                    </div>
                  </li>
                </ul>
              </aside>
             </div>
            </div>
            </div>
            
            <div className="col-lg-8   justify-content-between mx-0  ">
              <div
                className="container productContainer mt-4 row gy-4"
                style={{ backgroundColor: color.rgba }}
              >
                {currentItems?.map((ele) => {
                  return (
                    <div key={ele._id} className="col-md-3 ">
                      <div className="product px-2 py-3 bg-body-secondary cursor-pointer">
                        <Link to={"/product-details/" + ele._id}>
                          <img className="w-100" src={ele.imageCover} alt="" />
                          <span className="text-main fw-bold font-sm">
                            {ele.category.name}
                          </span>
                          <h3 className="h6 fw-bolder">
                            {ele.title.split(" ").slice(0, 2).join(" ")}
                          </h3>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">{ele.price} EGP</span>
                            <span>
                              <i className="fas fa-star rating-color"></i>
                              {ele.ratingsAverage}
                            </span>
                          </div>
                        </Link>
                        <div>
                          <button
                            onClick={() => addProduct(ele._id)}
                            className="btn bg-main text-white w-100"
                          >
                            + Add Cart
                          </button>
                          <button
                            onClick={() => addWishLists(ele._id)}
                            className="btn mt-2 bg-danger text-white w-100"
                          >
                            + Add To Favourite
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={
                    <div className="divArrow">
                      <i className="arrrowRight fa-solid fa-arrow-right"></i>
                    </div>
                  }
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel={
                    <div className="divArrow">
                      <i className="arrowLeft fa-solid fa-arrow-left"></i>
                    </div>
                  }
                  renderOnZeroPageCount={null}
                  containerClassName={"pagination"}
                  pageClassName={"page-item"}
                  activeClassName={"activePagination"}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
