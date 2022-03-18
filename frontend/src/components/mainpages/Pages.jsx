import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./products/Products";
import ProductDetail from "./productdetail/ProductDetail";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import NotFound from "../utils/notfound/NotFound";
import { GlobalState } from "../../GlobalState";

const Pages = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.UserAPI.isLogged;

  return (
    <Routes>
      <Route path="/" exact element={<Products />} />
      <Route path="/detail/:id" exact element={<ProductDetail />} />
      <Route path="/login" element={isLogged ? <NotFound /> : <Login />} />
      <Route
        path="/register"
        element={isLogged ? <NotFound /> : <Register />}
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
