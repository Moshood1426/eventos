import React from "react";
import { Navbar } from "../../components";
// import actions from "../../utils/actions";
import { Outlet } from "react-router-dom";
import { NavMenu } from "../../components"

const SharedLayout = () => {
  return (
    <div>
      <Navbar />
      <NavMenu />
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
};

export default SharedLayout;
