import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductsAPI = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data.products);
  };
  // console.log(products)

  useEffect(() => {
    getProducts();
  }, []);

  return { products: [products, setProducts] };
};

export default ProductsAPI;
