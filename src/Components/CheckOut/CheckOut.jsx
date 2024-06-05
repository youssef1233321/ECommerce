import React, { useContext, useState } from "react";
import styles from "./CheckOut.module.css";
import { useFormik } from "formik";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  let navigate = useNavigate();
  let { onlinePayment, cartId ,cashPayment , getLoggedUserCart } = useContext(cartContext);
  const [method , setMethod] = useState(null)

  
  async function handleSubmitt(values) {
    let response = await cashPayment(cartId, values);
   
    if (response?.data?.status === "success") {
      await getLoggedUserCart()
      navigate("/allorders")
    }
  }
  async function handleSubmit(values) {
    let response = await onlinePayment(cartId, values);

    if (response?.data?.status === "success") {
   
      window.location.href = response.data.session.url;
    }
  }
  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: method === "visa"?   handleSubmit : handleSubmitt
  });
  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>

      <div className=" formPaymentContainer py-5 mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <h3 className="text-center mb-5 text-primary fw-bolder">Payment</h3>
          <label htmlFor="details">Details:</label>
          <input
            className="my-3 form-control"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.details}
            name="details"
            id="details"
          />

          <label htmlFor="city">City:</label>
          <input
            className="my-3 form-control"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.city}
            name="city"
            id="city"
          />

          <label htmlFor="phone">Phone:</label>
          <input
            className="my-3 form-control"
            type="tel"
            onChange={formik.handleChange}
            value={formik.values.phone}
            name="phone"
            id="phone"
          />
          <div className="mt-4 d-flex justify-content-center ">
            <button onClick={()=> setMethod("visa")} type="submit" className="btn me-4 btn-success w-25 ">
              Pay Visa
            </button>
            <button onClick={()=> setMethod("cash")} type="submit" className="btn ms-4 btn-success w-25 ">
              Pay Cash
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
