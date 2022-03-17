import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const ProductItem = ({ product }) => {
  return (
    <div className="product_card">
      <img src={product.images.url} alt="" />
      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
      <div className="row_btn">
        <Link id="btn_buy" to="#!">
          <Button sx={{ color: "white" }}>Buy</Button>
        </Link>
        <Link id="btn_view" to={`/detail/${product._id}`}>
          <Button sx={{ color: "white" }}>View</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
