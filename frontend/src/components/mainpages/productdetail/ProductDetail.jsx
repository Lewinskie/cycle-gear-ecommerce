import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../../utils/productitem/ProductItem";

const ProductDetail = () => {
  const params = useParams();
  const state = useContext(GlobalState);

  const [products] = state.ProductsAPI.products;
  const [productDetail, setProductDetail] = useState([]);
  //   console.log(params);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setProductDetail(product);
      });
    }

    console.log("re render");
  }, [params.id, products]);
  if (productDetail.length === 0) return null;

  console.log(productDetail);

  return (
    <>
      <div className="detail">
        <img src={productDetail.images.url} alt="" />
        <div className="box_detail">
          <div className="row">
            <h2>{productDetail.title}</h2>
            <h6>#:id{productDetail.product_id}</h6>
          </div>
          <span>${productDetail.price}</span>
          <p>{productDetail.description}</p>
          <p>{productDetail.content}</p>
          <p>Sold: {productDetail.sold}</p>
          <Link to="/cart" className="cart">
            Buy Now
          </Link>
        </div>
      </div>
      <div>
        <h2>Related Products</h2>
        <div className="products">
          {products.map((product) => {
            return product.content === productDetail.content ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
