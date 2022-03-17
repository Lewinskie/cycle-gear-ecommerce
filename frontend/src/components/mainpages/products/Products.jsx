import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../../utils/productitem/ProductItem";
import Loading from "../../utils/loading/Loading";

const Products = () => {
  // STATE CONTAINING TOKEN AND PRODUCTSAPI FROM UTILS AND GLOBALCONTEXT
  const state = useContext(GlobalState);
  const [products] = state.ProductsAPI.products;

  return (
    <>
      <div className="products">
        {products.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </div>
      {products.length === 0 && <Loading />}
    </>
  );
};

export default Products;
