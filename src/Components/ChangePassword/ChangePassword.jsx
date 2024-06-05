import React, { useContext, useState } from "react";
import styles from './ChangePassword.module.css';
import { authenticationContext } from "../../Context/Authentication";
import { useFormik } from "formik"; 
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";


export default function ChangePassword({saveUserData}) {
  let {changeUserPassword} = useContext(authenticationContext)
  const [isLoading , setIsLoading] = useState(false)
  const [msgError , setMsgError] = useState('')
  let validationSchema = Yup.object({
    currentPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z@0-9]{5,20}$/,
        "password must start with 1 letter capital from 5 to 20 letter lowercase or numbers"
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z@0-9]{5,20}$/,
        "password must start with 1 letter capital from 5 to 20 letter lowercase or numbers"
      ),
    rePassword: Yup.string()
      .required("Re-Password is required")
      .oneOf([Yup.ref("password")], "Password doesnt match")
   
  });
  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: ""
    },
    validationSchema,
    onSubmit: handleChangePassword
  })
  async function handleChangePassword (values){
    setIsLoading(true)
    
    let {response} = await changeUserPassword(values)
    
    if(response?.data?.message === "fail"){
      setMsgError(response?.data?.errors.msg)
      setIsLoading(false)
    }
    else{
      
      setIsLoading(false)
      toast.success("Password has been changed", {
        duration: 2000,
        position: "top-center",
        style: { backgroundColor: "green", textAlign:"center" ,color :"white"},
        success: {background : "white"}
      });
      
      localStorage.clear();
      
      saveUserData()
      Navigate('/login')
    }
    
   
  }

  return (
    <>
     <>
    <Helmet>
      <title>Change User Password</title>
     </Helmet>
      <div className="w-75 container mx-auto py-4 mt-5">
        <h3>Change Password :</h3>
        <form onSubmit={formik.handleSubmit}>
          {msgError !== ''?<div className="alert alert-danger">
              {msgError}
              </div> : null }
            
          
          <label htmlFor="currentPassword">Current Password :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-2 "
            onChange={formik.handleChange}
            value={formik.values.currentPassword}
            type="password"
            id="currentPassword"
            name="currentPassword"
          />
          {formik.errors.currentPassword && formik.touched.currentPassword && (
            <div className="alert alert-danger">{formik.errors.currentPassword}</div>
          )}

          <label htmlFor="password">New Password :</label>
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
              Change
            </button>
          )}
        </form>
      </div>
    </>
    </>
  );
}
