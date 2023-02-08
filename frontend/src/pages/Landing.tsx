import React from "react";
import { Navbar } from "../components";
import { ReactComponent as ReactLogo } from "../assets/images/arrow-right.svg"

const Landing = () => {
  return (
    <div>
      <Navbar />
      <div className="intro">
        <div className="intro_img">
          <img
            src={require("../assets/images/landing-banner.jpg")}
            alt=""
            className="intro_img_content"
          />
        </div>
        <div className="intro_img_filter"></div>
        <div className="intro_content">
          <h1 className="intro_header">
            Let’s get you a seat at that amazing event
          </h1>
          <p className="intro_sub_header">
            Start exploring event
            <ReactLogo />
          </p>
        </div>
      </div>
      Landing here
    </div>
  );
};

export default Landing;
