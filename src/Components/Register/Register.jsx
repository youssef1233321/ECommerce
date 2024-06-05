import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast  from "react-hot-toast";
import { Helmet } from "react-helmet";


export default function Register() {
  const [isLoading, setLoading] = useState(false);
  const [msgError , setMsgError] = useState('');
  let navigate = useNavigate();
  async function handleRegister(values) {
    setLoading(true);
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      values
    ).catch((err)=>{
      setLoading(false); 
      setMsgError(`${err.response.data.message} `)
      
    })

    if (data.message === "success") {
      setLoading(false)
      toast.success("Register completed", {
        duration: 2000,
        position: "top-center",
        style: { backgroundColor: "green", textAlign:"center" ,color :"white"},
        success: {background : "white"}
      });
      navigate("/login");
    }
    else  {
      setLoading(false)
    }
  }
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be Greater Than or equal 3 Letters")
      .max(15, "Name must be less or equal than 15 Letters"),
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid "),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z@0-9]{5,20}$/,
        "password must start with 1 letter capital from 5 to 20 letter lowercase or numbers"
      ),
    rePassword: Yup.string()
      .required("Re-Password is required")
      .oneOf([Yup.ref("password")], "Password doesnt match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(01)[0125][0-9]{8}$/, "Phone Must Be EG Phone Number"),
  });
  // function validate(values) {
  //   let errors = {};

  //   if (!values.name) {
  //     errors.name = "Name is Required";
  //   } else if (values.name.length < 3) {
  //     errors.name = "Name must be greater than 3 or equal 3 letters";
  //   } else if (values.name.length > 15) {
  //     errors.name = "Name must be less than 10 or equal 10 letters";
  //   }
  //   if (!values.email) {
  //     errors.email = "Email is Required";
  //   } else if (
  //     !/^[A-Z0-9._]{4,30}@[(yahoo)(hotmail)(gmail)]\.[A-Z]{2,4}$/i.test(
  //       values.email
  //     )
  //   ) {
  //     errors.email = "email is invalid";
  //   }
  //   if (!values.password) {
  //     errors.password = "password is Required";
  //   } else if (!/^[A-Z][a-z0-9]{6,10}$/.test(values.password)) {
  //     errors.password =
  //       "password must be start with 1 capital then lowercase letter or numbers";
  //   }
  //   if (!values.rePassword) {
  //     errors.rePassword = "Re-password is Required";
  //   } else if (values.rePassword !== values.password) {
  //     errors.rePassword = "Re-Password doesnt match with password";
  //   }
  //   if (!values.phone) {
  //     errors.phone = "phone number is Required";
  //   } else if (!/^(01)[1520][0-9]{8}$/.test(values.phone)) {
  //     errors.phone = "Phone must be EG Phone Number";
  //   }

  //   return errors;
  // }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <>
    <Helmet>
      <title>Register</title>
     </Helmet>
      <div className="w-75 mx-auto py-4 mt-5">
        <h3>Register :</h3>
        <form onSubmit={formik.handleSubmit}>
          {msgError !== ''?<div className="alert alert-danger">
              {msgError}
              </div> : null }
            
          
          <label htmlFor="name">Name :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-2"
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            id="name"
            name="name"
          />
          {formik.errors.name && formik.touched.name && (
            <div className="alert alert-danger">{formik.errors.name}</div>
          )}

          <label htmlFor="email">Email :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-2"
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            id="email"
            name="email"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="alert alert-danger">{formik.errors.email}</div>
          )}
          <label htmlFor="password">Password :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-2"
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            id="password"
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="alert alert-danger">{formik.errors.password}</div>
          )}
          <label htmlFor="rePassword">Re-Password :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-2"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            type="password"
            id="rePassword"
            name="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          )}
          <label htmlFor="phone">Phone Number :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-2"
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="tel"
            id="phone"
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          )}
          {isLoading ? (
            <button className="btn bg-main text-white ">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white "
            >
              Sign Up
            </button>
          )}
        </form>
      </div>
    </>
  );
}
