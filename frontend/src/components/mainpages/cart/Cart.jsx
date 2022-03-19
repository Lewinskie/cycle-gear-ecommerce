import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import PaypalButton from "./PaypalButton";

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.UserAPI.cart;
  const [total, setTotal] = useState(0);
  const [token] = state.token;

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);

  const addToCart = async () => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  //INCREMENT PRODUCT FUNCTION
  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    addToCart();
  };
  //DECREMENT PRODUCT FUNCTION
  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        //THIS IS TO PREVENT THE QUANTITY FROM GOING TO BELOW 1
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    addToCart();
  };

  //REMOVE PRODUCT
  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
      addToCart();
    }
  };

  const transactionSuccess = async (payment) => {
    console.log(payment);
  };

  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", fontSize: "4rem" }}>Cart Empty!</h2>
    );
  }
  return (
    <div>
      {cart.map((product) => (
        <div className="detail cart" key={product._id}>
          <img src={product.images.url} alt="" className="img_container" />
          <div className="box_detail">
            <h2>{product.title}</h2>

            <h3>${product.price * product.quantity}</h3>
            <p>{product.description}</p>
            <p>{product.content}</p>
            <div className="amount">
              <button onClick={() => decrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}> + </button>
            </div>
            <div className="delete" onClick={() => removeProduct(product._id)}>
              x
            </div>
          </div>
        </div>
      ))}
      <div className="total">
        <h3>Total: ksh {total}</h3>
        <PaypalButton total={total} transactionSuccess={transactionSuccess} />
      </div>
    </div>
  );
};
// const client = {
//   sandbox:
//     "AR4XrdlyBXnAwEG52_6BQVFeH8ClU0JRJDPQxAU2Za0M_K_P-WupShtYQqjjcAuUHGd3YzLRdcqGocAP",
//   production: "YOUR-PRODUCTION-APP-ID",
// };

export default Cart;
