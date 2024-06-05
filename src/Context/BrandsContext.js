import axios from "axios";
import { createContext } from "react";

export let brandsContext = createContext();

export function BrandsContextProvider(props) {
  async function getAllBrands() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    return data.data;
  }

  return (
    <brandsContext.Provider value={{ getAllBrands }}>
      {props.children}
    </brandsContext.Provider>
  );
}
