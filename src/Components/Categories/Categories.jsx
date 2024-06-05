import React, { useContext, useEffect, useState } from "react";
import styles from "./Categories.module.css";
import axios from "axios";
import { categoryContext } from "../../Context/CategoryContext";
import { Link, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Categories() {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  let { getCategories } = useContext(categoryContext);
  async function getData() {
    let { data } = await getCategories();
    setData(data);
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
     <Helmet>
      <title>Categories</title>
     </Helmet>
      <div className="container mt-5 catContainer">
        {loading ? (
          <div className="itemSpin text-center py-3">
            <i className="fas fa-spinner fa-spin fa-2x text-main "></i>
          </div>
        ) : (
          <div className="row gy-3  mt-5 justify-content-center">
            {data.map((cat) => (
              <div key={cat._id} className="col-md-4 ">
                <div className="itemCat p-3 ">
                  <Link className="photo " to={`/category-details/${cat._id}`}>
                    <div>
                      <img
                        className="w-100 catPicture"
                        height={400}
                        src={cat.image}
                        alt=""
                      />
                    </div>
                    <div className="glow-wrap">
                      <i className="glow"></i>
                    </div>
                    <div className="text-center text-success my-4">
                      <h2 className="h4 titleCategory fw-bolder">{cat.name}</h2>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
