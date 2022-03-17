import React, { createContext, useState } from "react";
import ProductsAPI from "./api/ProductsAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const state = {
    token: [token, setToken],
    ProductsAPI: ProductsAPI,
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
