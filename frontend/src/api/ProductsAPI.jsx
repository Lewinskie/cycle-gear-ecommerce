import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductsAPI = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return <div>products:[products,setProducts]</div>;
};

export default ProductsAPI;
