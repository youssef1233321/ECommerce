import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let wishListContext = createContext();
export function WishListContextProvider(props) {
  let headers = { token: localStorage.getItem("userToken") };
   function addWishList(productId) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`
      ,{
        productId
      },{
        headers
      }
    ).then((response) => response)
    .catch((err) => err);
  }
   function getWishList() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`
      ,{
        headers
      }
    ).then((response) => response)
    .catch((err) => err);
  }
   function delWishList(productId) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`
      ,{
        headers
      }
    ).then((response) => response)
    .catch((err) => err);
  }
  
  return (
    <wishListContext.Provider value={{addWishList , getWishList , delWishList}}>
      {props.children}
    </wishListContext.Provider>
  );
}
