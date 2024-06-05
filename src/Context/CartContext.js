import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export function CartContextProvider(props) {

    const [cartId , setCarId] = useState(null)
    const [numberCartItem , setNumberCartItem] = useState(0)

    async function getLoggedUserCart(){
        let response = await getCart() 
        if(response?.data?.status === 'success'){
        setCarId(response.data.data._id)
        setNumberCartItem(response.data.numOfCartItems)
        }
     }
    useEffect(()=>{
           getLoggedUserCart()
    },[])
  let headers = { token: localStorage.getItem("userToken") };

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }
  function getCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  function removeItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((err) => err);
  }
  function updateItemCount(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            count
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  function clearUserCart (){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers
    }).then((response) => response)
    .catch((err) => err);
  }

  function onlinePayment(cartId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
            shippingAddress
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }
   function cashPayment(cartId , shippingAddress){
    return  axios.post (`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
      shippingAddress
    },{
      headers
    }).then((response) => { setNumberCartItem(0); return response})
    .catch((err) => err);
    
  }

  return (
    <cartContext.Provider value={{cartId, numberCartItem,clearUserCart, onlinePayment,addToCart, getCart, removeItem ,updateItemCount , setNumberCartItem , cashPayment , getLoggedUserCart }}>
      {props.children}
    </cartContext.Provider>
  );
}
