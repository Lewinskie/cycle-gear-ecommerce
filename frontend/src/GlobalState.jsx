import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const accessToken = async () => {
    const res = await axios.get("/user/access_token");

    setToken(res.data.accesstoken);
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) accessToken();
  }, []);

  const state = {
    token: [token, setToken],
    ProductsAPI: ProductsAPI(),
    UserAPI: UserAPI(token),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
