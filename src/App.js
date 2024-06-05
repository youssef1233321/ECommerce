import "./App.css";
import Home from "./Components/Home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

import Brands from "./Components/Brands/Brands";
import NotFound from "./Components/NotFound/NotFound";
import { useState } from "react";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProtectedRouteLogin from "./Components/ProtectedRouteLogin/ProtectedRouteLogin";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { CartContextProvider } from "./Context/CartContext";
import CheckOut from "./Components/CheckOut/CheckOut";
import { Offline } from "react-detect-offline";
import { CategoryContextProvider } from "./Context/CategoryContext";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import SubCategory from "./Components/SubCategory/SubCategory";
import { BrandsContextProvider } from "./Context/BrandsContext";
import { WishListContextProvider } from "./Context/WishListContext";
import WishList from "./Components/WishList/WishList";
import Orders from "./Components/Orders/Orders";
import { OrdersContextProvider } from "./Context/Orders";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import { AuthenticationContextProvider } from "./Context/Authentication";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";

function App() {
  const [userData, setUserData] = useState(null);

  function saveUserData() {
    if (localStorage.getItem("userToken") !== null) {
      let encodedToken = localStorage.getItem("userToken");
      let decodedToken = jwtDecode(encodedToken);
      setUserData(decodedToken);
    } else {
      setUserData(null);
    }
  }

  function signOut() {
    setUserData(null);
    localStorage.clear();
  }

  let routers = createBrowserRouter([
    {
      path: "",
      element: (
        <Layout
          userData={userData}
          saveUserData={saveUserData}
          signOut={signOut}
        />
      ),
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "Products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "product-details/:myId",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "Categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "category-details/:myId",
          element: (
            <ProtectedRoute>
              <CategoryDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "sub-category/:myId",
          element: (
            <ProtectedRoute>
              <SubCategory />
            </ProtectedRoute>
          ),
        },
        {
          path: "Brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "favourite",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },

        {
          path: "Cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "Login",
          element: (
            <ProtectedRouteLogin>
              <Login toast={toast} saveUserData={saveUserData} />
            </ProtectedRouteLogin>
          ),
        },
        {
          path: "Register",
          element: (
            <ProtectedRouteLogin>
              <Register toast={toast} />
            </ProtectedRouteLogin>
          ),
        },
        {
          path: "reset-password",
          element: (
            <ProtectedRouteLogin>
              <ForgotPassword saveUserData={saveUserData} toast={toast} />
            </ProtectedRouteLogin>
          ),
        },
        {
          path: "ChangePassword",
          element: (
            <ProtectedRoute>
              <ChangePassword saveUserData={saveUserData} />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <CartContextProvider>
        <CategoryContextProvider>
          <BrandsContextProvider>
            <WishListContextProvider>
              <OrdersContextProvider>
                <AuthenticationContextProvider>
                  <Offline>
                    <div className="network">
                      <i className="fa-solid fa-wifi"></i> your network is
                      disconnected
                    </div>
                  </Offline>
                  <Toaster />
                  <RouterProvider router={routers}></RouterProvider>
                </AuthenticationContextProvider>
              </OrdersContextProvider>
            </WishListContextProvider>
          </BrandsContextProvider>
        </CategoryContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
