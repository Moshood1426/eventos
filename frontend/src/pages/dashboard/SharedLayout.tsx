import React from "react";
import { Footer, Navbar } from "../../components";
// import actions from "../../utils/actions";
import { Outlet } from "react-router-dom";
import { NavMenu } from "../../components";

const SharedLayout: React.FC<{
  displayNavMenu?: boolean;
  displayFooter?: boolean;
}> = ({ displayNavMenu, displayFooter }) => {
  return (
    <div>
      <Navbar />
      {displayNavMenu && <NavMenu />}
      <div className="outlet-container">
        <Outlet />
      </div>
      {displayFooter && <Footer />}
    </div>
  );
};

export default SharedLayout;
