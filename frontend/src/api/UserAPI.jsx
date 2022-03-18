import { useEffect, useState } from "react";
import axios from "axios";

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });

          setIsLogged(true);

          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          setCart(res.data.cart);

          console.log(token);
        } catch (error) {
          alert(error.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  const addCart = async (product) => {
    // CHECK IF USER IS LOGGED IN TO PROCEED ADDING ITEM TO CART
    if (!isLogged) return alert("Please Login to continue shopping");

    // THIS IS TO CHECK IF THE PRODUCT IS ALREADY ADDED TO CART
    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      await axios.patch(
        "/user/addcart",
        {
          cart: [...cart, { ...product, quantity: 1 }],
        },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      alert("this product has been added to cart");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
  };
};

export default UserAPI;
