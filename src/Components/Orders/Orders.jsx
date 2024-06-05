import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Orders.module.css";
import { ordersContext } from "../../Context/Orders";
import { jwtDecode } from "jwt-decode";
import logo from "../../assets/image/completed-task_1632670 (1).png";
import { PiCubeThin } from "react-icons/pi";
import { IoMdExit, IoIosArrowForward } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet";

export default function Orders() {
  let userData = localStorage.getItem("userToken");
  let decodedToken = jwtDecode(userData);
  const userId = decodedToken.id;
  let { getUserOrders } = useContext(ordersContext);
  const [ordersData, setOrdersData] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = orderDetails?.cartItems?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orderDetails?.cartItems?.length / itemsPerPage);
  let [date, setDate] = useState(null);
  let [date2, setDate2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query , setQuery] = useState('')
  let divEl = useRef(null);
  

  function changeColor (i){
    for(let item of divEl.current.children ){
      item.style.backgroundColor = 'white'
    }
    
    divEl.current.children[i].style.backgroundColor = '#c8faea';
  }
  function clearColor(){
    for(let item of divEl.current.children ){
      item.style.backgroundColor = 'white'
    }
  }

  
  let filterOrders = ordersData?.filter((ele)=> ele.id.toString().includes(query.toString()))
  

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % orderDetails?.cartItems?.length;
    setItemOffset(newOffset);
  };

  async function getData() {
    let response = await getUserOrders(userId);
    setOrdersData(response.data);
   
    setLoading(false);
  }

  function getDate(data, count) {
    let days = new Date(data);
    let day = days.getDate() + count;
    let month = days.getUTCMonth() + 1;
    let year = days.getFullYear();
    let fullDate = `${year}-${month}-${day}`;
    setDate(fullDate);
  }
  function getDate2(data) {
    let days = new Date(data);
    let day = days.getDate() ;
    let month = days.getUTCMonth() + 1;
    let year = days.getFullYear();
    let fullDate = `${year}-${month}-${day}`;
    setDate2(fullDate);
  }

  useEffect(() => {
    getData();
  }, []);

  

  return (
    <>
     <Helmet>
    <title>Orders</title>
   </Helmet>
      <div className="container">
        {loading ? (
          <div className="text-center mt-5">
            <i className="fas fa-spinner fa-spin fa-2x text-main mt-5"></i>
          </div>
        ) : (
          <>
            {" "}
            <section className="mt-5">
              <i className="fa-solid fa-house-laptop  text-primary  "></i>{" "}
              <span className="mx-2">Home</span>
              <i className="fa-solid fa-chevron-right  mx-2 "></i>
              <i className="fa-solid fa-tags text-primary ms-2 "></i>
              <span className="mx-2">Orders</span>
            </section>
            <div className="row">
              <div className="col-md-6">
                <div className="me-2 mt-3">
                  <section>
                    <h3>Orders</h3>
                    <div className="mx-auto position-relative">
                      <button className="iconSearch border-0 rounded-start-3 z-0  h-100">
                        <i className=" fa fa-search "></i>
                      </button>
                      <input
                        type="text"
                        onChange={(e)=> setQuery(e.target.value)}
                        value={query}
                        className="form-control w-100 ps-5"
                        placeholder="Search By Orders ID"
                      />
                    </div>
                    <div className="divOngoing w-100 p-2 text-center ">
                      <span className="ongoing">Ongoing</span>
                    </div>
                  </section>
                <div className="divRef" ref={divEl}>
                  {filterOrders?.map((ele , index) => (
                    <div
                      onClick={() => {
                        setOrderDetails(ele);
                        getDate(ele.createdAt, 2);
                        getDate2(ele.createdAt);
                        changeColor(index)
                      }}
                      key={ele.id}
                      
                      className="rowOrders mx-auto my-4 border-bottom border-1 border-primary  row align-items-center divOngoing"
                      
                    >
                      <div className="photoContain ms-2 my-2 col-md-2 p-2 bg-dark rounded-3">
                        <div className="bg-dark photoContainer d-flex justify-content-center ">
                          <img src={logo} className="imageOrders w-100" alt="" />
                        </div>
                      </div>
                      <div className="col-md-7 descOrder">
                        <p className="h6">Order #ID{ele.id}</p>
                        <span>
                          Total :{" "}
                          {ele?.totalOrderPrice +
                            Math.round(ele?.totalOrderPrice * 0.01) +
                            50}{" "}
                          EGP
                        </span>
                      </div>
                      <div className="col-md-2 methodOrder d-flex align-items-center ">
                        <span className="border border-1 rounded-3 px-3 py-1 fw-bolder">
                          {ele.paymentMethodType}
                        </span>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
              {orderDetails !== null ? (
                <div className="col-md-6 ">
                  <div className="ms-2 ">
                    <div className="d-flex flex-wrap  justify-content-between align-items-center">
                      <PiCubeThin className="shape fw-bolder text-primary fs-1 rounded-3 " />
                      <h3 className="h5  mb-0 ">Order ID {orderDetails?.id}</h3>
                      <span className="shape py-1 px-2 rounded-3 fs-5  ">
                        Order In Transit{" "}
                      </span>
                      <div>
                        <button className="btn btn-success me-3 buttonShip ">
                          Ready To Ship <IoMdExit />
                        </button>

                        <button onClick={()=>{ setOrderDetails(null)
                          clearColor()
                        }} 
                        className="btn btn-success">
                          <IoIosArrowForward />
                        </button>
                      </div>
                    </div>
                    <h5 className="mt-4 fw-bolder">Order Tracking</h5>
                    <div className="d-flex justify-content-between mt-3">
                      <h5 className="fw-bolder">Product In Transit</h5>
                      <span className="text-dark-emphasis">
                        Estimated delivery{" "}
                        <span className="fw-bolder">2 Days</span>
                      </span>
                    </div>
                    <div className="d-flex justify-content-around mt-4 ">
                      <div className=" circle circleOne">
                        <FaCircleCheck className="text-success" />
                      </div>
                      <div className="circle circleTwo">
                        <FaCircleCheck className="text-success" />
                      </div>
                      <div className="circle circleThree">
                        <FaRegCircle className="whiteCircle" />
                      </div>
                      <div>
                        <FaRegCircle className="whiteCircle" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-around mt-3">
                      <div className="text-center">
                        <h5>Packaged</h5>
                        <span></span>
                      </div>

                      <div className="text-center">
                        <h5>Sent Out</h5>
                        <span></span>
                      </div>
                      <div className="text-center">
                        <h5>In Transit</h5>
                        <span>Waiting...</span>
                      </div>
                      <div className="text-center">
                        <h5>Delivered</h5>
                        <span>Waiting...</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-around mt-5">
                      <div className="d-flex flex-column">
                        <span>Order Date</span>
                        <span>{date2}</span>
                      </div>
                      <div className="d-flex flex-column">
                        <span>Delivery Date</span>
                        <span>{date}</span>
                      </div>
                      <div className="d-flex flex-column ">
                        <span>Courier</span>
                        <span>
                          <i className="fa-brands fa-fedex"></i> Fedex
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        <span>Address</span>
                        <span>123 goodwill...</span>
                      </div>
                    </div>
                    <div className="mt-5">
                      <h4 className="fw-b">Order Summary</h4>
                      <div
                        className="px-4 py-2 my-3"
                        style={{ backgroundColor: "#f7f7f7" }}
                      >
                        <div className=" my-1  d-flex justify-content-between">
                          <h6>Sub total</h6>
                          <span>{orderDetails?.totalOrderPrice}</span>
                        </div>
                        <div className="my-1  d-flex justify-content-between">
                          <h6>Tax</h6>
                          <span>
                            {Math.round(orderDetails?.totalOrderPrice * 0.01)}
                          </span>
                        </div>
                        <div className="my-1 d-flex justify-content-between">
                          <h6>Shipping</h6>
                          <span>50</span>
                        </div>
                        <hr />
                        <div className="my-1 d-flex justify-content-between">
                          <h6>Total Amount</h6>
                          <span>
                            {orderDetails?.totalOrderPrice +
                              Math.round(orderDetails?.totalOrderPrice * 0.01) +
                              50}
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr />

                    <div>
                      <h5>Order Info</h5>
                      {currentItems?.map((ele) => (
                        <div
                          key={ele._id}
                          className="row align-items-center  py-2"
                        >
                          <div className="col-md-2">
                            <div>
                              <img
                                className="w-100"
                                src={ele.product.imageCover}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div>
                              <h5>
                                {ele.product.title
                                  .split(" ")
                                  .slice(0, 2)
                                  .join(" ")}
                              </h5>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="d-flex flex-column ">
                              <span className="mb-2">{ele.price} EGP</span>
                              <span>Qty : {ele.count}</span>
                            </div>
                          </div>
                        </div>
                      ))}

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
              ) : null}
            </div>{" "}
          </>
        )}
      </div>
    </>
  );
}
