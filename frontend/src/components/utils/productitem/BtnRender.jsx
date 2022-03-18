import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { GlobalState } from "../../../GlobalState";

const BtnRender = ({ product }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.UserAPI.isAdmin;

  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <Link id="btn_buy" to="#!">
            <Button sx={{ color: "white" }}>Delete</Button>
          </Link>
          <Link id="btn_view" to={`/edit_product/${product._id}`}>
            <Button sx={{ color: "white" }}>Edit</Button>
          </Link>
        </>
      ) : (
        <>
          <Link id="btn_buy" to="#!">
            <Button sx={{ color: "white" }}>Buy</Button>
          </Link>
          <Link id="btn_view" to={`/detail/${product._id}`}>
            <Button sx={{ color: "white" }}>View</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default BtnRender;
