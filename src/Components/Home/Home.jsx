import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import axios from "axios";
import { Helmet } from "react-helmet";
import { categoryContext } from "../../Context/CategoryContext";
import Footer from "../Footer/Footer";
import { cartContext } from "../../Context/CartContext";



export default function Home() {
  let { getCategories } = useContext(categoryContext);
  let {getLoggedUserCart} = useContext(cartContext);
  let [cat , setCat] = useState([])
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  async function getCat (){
    let { data } = await getCategories();
    setCat(data)

  }
 
  async function getProducts() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    setProducts(data.data);
    
  }
 
  useEffect(() => {
    async function getAll(){
      return (await getProducts(),
      await getCat(),
      await getLoggedUserCart(),
      setLoading(false))
    }
    
     getAll()
   
  }, [])

  return (
    <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    
      {loading  ? (

        <div className="container text-center mt-5" >
          <i className="fas fa-spinner fa-spin fa-2x text-main mt-5"></i>
        </div>
      ) : (
        <>
        <div className="container mt-4">
          <MainSlider />
          <CategorySlider cat = {cat} />
          <FeaturedProducts products={products} />
          </div>
           <Footer/>
        </>
      )}
      
    </>
  );
}
