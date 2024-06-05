import React from "react";
import styles from "./Footer.module.css";
import { BsShop } from "react-icons/bs";

export default function Footer() {
  return (
    <>
      <div className="bg-dark text-white py-5 footerMain ">
        <div className="container containerFooter   px-0">
          <BsShop className="fs-1 " />

          <div className="d-flex flex-column align-items-center">
            <span>
              <span className="fs-5 fw-bolder">&copy;</span> 2024 E-Commerce
              Website Powered By
            </span>
            <span className="text-primary fw-bolder">FreeShoppify</span>
          </div>

          <ul className="mb-0 ms-0 me-0 ps-0">
            <li className=" d-flex align-items-center listSocial   ">
              <a
                className="nav-link"
                href="https://www.facebook.com/YoussefAhmedPh/"
                target="_blank"
              >
                <i className="fab me-2 fa-facebook  "></i>
              </a>
              <a
                className="nav-link"
                href="https://github.com/youssef1233321"
                target="_blank"
              >
                <i className=" fa-brands mx-2 fa-github"></i>
              </a>
              <a
                className="nav-link"
                href="https://www.instagram.com/youssefaahmed12/"
                target="_blank"
              >
                <i className="fab mx-2 fa-instagram"></i>
              </a>

              <a
                className="nav-link"
                href="https://www.linkedin.com/in/yousssef-abourehab-876318218/"
                target="_blank"
              >
                <i className="fab mx-2 fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
