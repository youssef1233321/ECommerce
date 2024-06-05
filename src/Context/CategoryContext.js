import axios from "axios";
import { createContext, useState } from "react";

export let categoryContext = createContext();

export function CategoryContextProvider(props) {
  
  async function getCategories() {
     let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
   return data
  }
  async function getCatDetails(myId) {
    let {data} = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${myId}`
    );
    return data.data
  }
  async function getSubCat(myId){
    let{data} = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${myId}/subcategories`
    );
    return data.data
  }
  async function getSpceficSubCat(myId){
    let {data} = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/subcategories/${myId}`
    );
    return data.data
  }
  async function getAllProducts() {
    let {data} = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    return data.data
  }
  
  
  return (
    <categoryContext.Provider value={{getCategories ,getCatDetails , getSubCat , getSpceficSubCat , getAllProducts}}>
      {props.children}
    </categoryContext.Provider>
  );
}
