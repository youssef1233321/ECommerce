import React, { useEffect } from "react";
import styles from './ECommerce.module.css';
import { useNavigate } from "react-router-dom";

export default function ECommerce() {
  let navigate = useNavigate();
  useEffect(()=>{
    navigate('/')
  },[])
  return (
    <>
     
    </>
  );
}
