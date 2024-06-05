import React, { useContext, useEffect, useState } from "react";
import styles from "./CategoryDetails.module.css";
import { categoryContext } from "../../Context/CategoryContext";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function CategoryDetails() {
  const [data, setData] = useState([]);
  const [dataSub, setDataSub] = useState([]);
  const [loading, setLoading] = useState(true);
  let { myId } = useParams();
  let { getCatDetails, getSubCat } = useContext(categoryContext);
  async function addCatDetails() {
    let response = await getCatDetails(myId);
    setData(response);
  }
  
  async function addSubCat() {
    let response = await getSubCat(myId);
    setDataSub(response);
   
  }
  useEffect(() => {
    async function getAll(){
      await addCatDetails();
      await addSubCat();
      setLoading(false);
    }
    
   
    getAll()
  }, []);
  return (
    <>
    <Helmet>
    <title>Sub Category</title>
   </Helmet>
      <div className="container mt-5 brandsContainer py-3 px-4">
        {loading ? (
          <div className="text-center ">
            <i className="fas fa-spinner fa-spin fa-2x text-main "></i>
          </div>
        ) : (
          <>
            <div className="main pb-3 catDetailsItem  bg-dark w-50 mx-auto">
              <div>
                <img className="w-100 catDetailsPic" height={500} src={data.image} alt="" />
              </div>
              <div className="text-center mt-3 text-white">
                <h2 className="h3 catDetailsTitle fw-bolder">{data.name}</h2>
              </div>
            </div>
            <div className="row justify-content-center gy-3 my-3">
              {dataSub.map((data) => (
                <div key={data._id} className="col-md-4">
                  <div>
                    <Link to={`/sub-category/${data._id}`}>
                      <button className="btn btn-dark w-100 py-4">
                        {data.name}
                      </button>
                    </Link>
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
