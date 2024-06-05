import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";


export default function Login({saveUserData}) {
  const [isLoading, setLoading] = useState(false);
  const [msgError , setMsgError] = useState('');
  let navigate = useNavigate();
  async function handleLogin(values) {
    setLoading(true);
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      values
    ).catch((err)=>{
      toast.error(`${err?.response?.data?.errors?.param} : ${err?.response?.data?.errors?.msg}` , {
        duration: 2000,
        position: "top-center",
        style: { backgroundColor: "red", textAlign:"center" ,color :"white"},
        icon:"❎",
        iconTheme: {primary:'dark' ,secondary:'blue'}
      });
      setLoading(false); 
      setMsgError(`${err.response.data.errors.param} : ${err.response.data.errors.msg}`)
      
    })
    

    if (data.message === "success") {
      localStorage.setItem('userToken' , data.token)
      setLoading(false)
      saveUserData()
      toast.success("Login completed", {
        duration: 2000,
        position: "top-center",
        style: { backgroundColor: "green", textAlign:"center" ,color :"white"},
        success: {background : "white"}
      });
      navigate("/");
    }
    else  {
      setLoading(false)
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid "),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z@0-9]{5,20}$/,
        "password must start with 1 letter capital from 5 to 20 letter lowercase or numbers"
      )
  });
  
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });
  return (
    <>
    <Helmet>
      <title>Login</title>
     </Helmet>
      <div className="w-75 mx-auto py-4 mt-5">
        <h3>Login :</h3>
        <form onSubmit={formik.handleSubmit}>
          {msgError !== ''?<div className="alert alert-danger">
              {msgError}
              </div> : null }

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
          
          {isLoading ? (
            <button className="btn bg-main text-white ">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <div className="btnLogin">
              <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white me-5 px-5 fs-3"
            >
              Sign In
            </button>
            <button className="btn btn-primary px-5 fs-3" onClick={()=> navigate('/reset-password')}>Forgot Password</button>
            </div>
            
          )}
        </form>
      </div>
    </>
  );
}
