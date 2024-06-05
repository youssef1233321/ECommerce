import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import VerificationInput from "react-verification-input";
import { cartContext } from "../../Context/CartContext";



export default function ForgotPassword({saveUserData}) {
  const {getLoggedUserCart} = useContext(cartContext)
  const [isLoading, setLoading] = useState(false);
  const [msgError , setMsgError] = useState('');
  const [codeForm , setCodeForm] = useState(false);
  const [resetPassword , setResetPassword] = useState(false);
  const [resetCode , setResetCode] = useState(null)
  let navigate = useNavigate();
  async function handleResetPassword(){
   
    let  data  = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      resetCode
    ).catch((err)=>{
      console.log(err);
      toast.error(`${err.statusMsg} : ${err.message}` , {
        duration: 2000,
        position: "top-center",
        style: { backgroundColor: "red", textAlign:"center" ,color :"white"},
        icon:"❎",
        iconTheme: {primary:'dark' ,secondary:'blue'}
      });
      
     
      
    })
    console.log(data);
    if (data?.data?.status === "Success"){
      
      toast.success(data.status, {
        duration: 2000,
        position: "top-center",
        style: { backgroundColor: "green", textAlign:"center" ,color :"white"},
        success: {background : "white"}
      });
      setResetPassword(true)
    }
  }
  async function handleForget(values) {
    setLoading(true);
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      values
    ).catch((err)=>{
      toast.error(`${err.statusMsg} : ${err.message}` , {
        duration: 2000,
        position: "top-center",
        style: { backgroundColor: "red", textAlign:"center" ,color :"white"},
        icon:"❎",
        iconTheme: {primary:'dark' ,secondary:'blue'}
      });
      setLoading(false); 
      setMsgError(`${err.response.data.errors.param} : ${err.response.data.errors.msg}`)
      
    })
    

    if (data.statusMsg === "success") {
     
      setLoading(false)
      saveUserData()
      toast.success(data.message, {
        duration: 2000,
        position: "top-center",
        style: { backgroundColor: "green", textAlign:"center" ,color :"white"},
        success: {background : "white"}
      });
      setCodeForm(true)
      
    }
    else  {console.log(data);
      setLoading(false)
    }
  }
  async function handleChangePassword(values) {
    let data = await axios.put( "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      values
    ).catch((err)=>{
      toast.error(`${err.statusMsg} : ${err.message}` , {
        duration: 2000,
        position: "top-center",
        style: { backgroundColor: "red", textAlign:"center" ,color :"white"},
        icon:"❎",
        iconTheme: {primary:'dark' ,secondary:'blue'}
      });
      
      setMsgError(`${err.response.data.errors.param} : ${err.response.data.errors.msg}`)
      
    })
    console.log(data);
    if(data?.statusText ==="OK"){
      toast.success("Password has been Changed" ,{ 
        duration: 2000,
        position: "top-center",
        style: { backgroundColor: "green", textAlign:"center" ,color :"white"},
        success: {background : "white"}})
      localStorage.setItem('userToken' , data?.data?.token);
      saveUserData();
      await getLoggedUserCart()
      navigate('/')
    }

  }
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid "),
      
   
  });
  let validationSchemaChange = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid "),
      newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z@0-9]{5,20}$/,
        "password must start with 1 letter capital from 5 to 20 letter lowercase or numbers"
      )
  });
  
  let formik = useFormik({
    initialValues: {
      email: "",
     
    },
    validationSchema,
    onSubmit: handleForget,
  });
  let formikChangePassword = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema:validationSchemaChange,
    
    onSubmit: handleChangePassword,
  });
 
  return (
    <>
    <div className="mt-5 container">
    <Helmet>
      <title>Forgot Password</title>
     </Helmet>
      <div className="w-75 mx-auto py-4 mt-5">
        <h3>Reset Password :</h3>
        {!codeForm?<form onSubmit={formik.handleSubmit}>
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
          
          
          {isLoading ? (
            <button className="btn bg-main text-white ">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <div className="d-flex justify-content-center">
              <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white me-5 px-5 fs-3"
            >
             Send Code
            </button>
           
            </div>
            
          )}
        </form>: !resetPassword? <form className="mt-5 bg-body-secondary p-3" >
          <label htmlFor="resetCode" className="fs-1 fw-bolder mb-3 w-100 text-center text-primary">Verify Code</label>
        <VerificationInput 
         
         onComplete={(e)=> setResetCode({"resetCode":`${e}`}) }
         autoFocus={true}
        
         id="resetCode"
         validChars="0-9"
         name="resetCode"
        classNames={ {
            container: "container containerVerify  ",
            character: "character p-0  ",
            characterInactive: "character--inactive",
            characterSelected: "character--selected",
            characterFilled: "character--filled",
        }}/>
  <div className="d-flex justify-content-center mt-4">
    <button onClick={(e)=>{ e.preventDefault(); console.log(resetCode); handleResetPassword()} }  className="btn btn-success px-5 fs-4">
      Submit
    </button>
  </div>
        </form> : <form onSubmit={formikChangePassword.handleSubmit}>
          {msgError !== ''?<div className="alert alert-danger">
              {msgError}
              </div> : null }

          <label htmlFor="email">Email :</label>
          <input
            onBlur={formikChangePassword.handleBlur}
            className="form-control my-2"
            onChange={formikChangePassword.handleChange}
            value={formikChangePassword.values.email}
            type="email"
            id="email"
            name="email"
          />
          {formikChangePassword.errors.email && formikChangePassword.touched.email && (
            <div className="alert alert-danger">{formikChangePassword.errors.email}</div>
          )}
          <label htmlFor="newPassword">New Password :</label>
          <input
            onBlur={formikChangePassword.handleBlur}
            className="form-control my-2"
            onChange={formikChangePassword.handleChange}
            value={formikChangePassword.values.newPassword}
            type="password"
            id="newPassword"
            name="newPassword"
          />
          {formikChangePassword.errors.newPassword && formikChangePassword.touched.newPassword && (
            <div className="alert alert-danger">{formikChangePassword.errors.newPassword}</div>
          )}
          
          {isLoading ? (
            <button className="btn bg-main text-white ">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <div>
              <button
              disabled={!(formikChangePassword.isValid && formikChangePassword.dirty)}
              type="submit"
              className="btn bg-main text-white ms-5 px-5 fs-3"
            >
                Submit
            </button>
            
            </div>
            
          )}
        </form> }
        
       
       

       

      </div>
    </div>
     
    </>
  );
}
