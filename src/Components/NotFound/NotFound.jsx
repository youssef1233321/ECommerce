import React from "react";
import styles from './NotFound.module.css';
import photo from "../../assets/image/videoframe_7781.png";
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <>
     <Helmet>
      <title>404 Not Found</title>
     </Helmet>
      <div className="notFoundSection">
        
      </div>
    </>
  );
}
