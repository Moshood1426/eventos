import React from "react";
import { Navbar } from "../../components";
// import actions from "../../utils/actions";
import { Outlet, NavLink } from "react-router-dom";

const SharedLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
};

export default SharedLayout;
