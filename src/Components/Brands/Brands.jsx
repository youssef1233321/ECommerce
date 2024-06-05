import React, { useContext, useEffect, useState } from "react";
import styles from "./Brands.module.css";
import { brandsContext } from "../../Context/BrandsContext";
import { Helmet } from "react-helmet";

export default function Brands() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let { getAllBrands } = useContext(brandsContext);
  async function addAllBrands() {
    let response = await getAllBrands();
    setData(response);
    setLoading(false);
  }
  useEffect(() => {
    addAllBrands();
  }, []);

  return (
    <>
    <Helmet>
    <title>Brands</title>
   </Helmet>
      <div className="container mt-5 brandsContainer py-3 px-4">
        {loading ? (
          <div className="text-center ">
            <i className="fas fa-spinner fa-spin fa-2x text-main "></i>
          </div>
        ) : (
          <>
            
            <h2 className=" mainH position-relative py-3 fw-bolder d-flex justify-content-center align-items-center mb-3">
              <span className="rounded-4 w-100 h-100 position-absolute bg-dark opacity-25 start-0 "></span>
              The Brands We Have
            </h2>
            <div className="row gy-3">
              {data.map((ele) => (
                <div className="col-md-3">
                  <div className="item">
                    <img className="w-100" src={ele.image} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
