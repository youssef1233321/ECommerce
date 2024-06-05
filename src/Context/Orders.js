import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export let ordersContext = createContext();
export function OrdersContextProvider(props){
    
  function addUserDataa() {
    if (localStorage.getItem("userToken") !== null) {
      let encodedToken = localStorage.getItem("userToken");
      let decodedToken = jwtDecode(encodedToken);
      return decodedToken
    }
  }

     async function getUserOrders (userId){
        let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
          return response;
    } 

      

    return <ordersContext.Provider value={{getUserOrders , addUserDataa}}>
        {props.children}
    </ordersContext.Provider>
}