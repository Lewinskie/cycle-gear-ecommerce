import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const BtnRender = ({ product }) => {
  return (
    <div className="row_btn">
      <Link id="btn_buy" to="#!">
        <Button sx={{ color: "white" }}>Buy</Button>
      </Link>
      <Link id="btn_view" to={`/detail/${product._id}`}>
        <Button sx={{ color: "white" }}>View</Button>
      </Link>
    </div>
  );
};

export default BtnRender;
