import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import Marquee from "react-fast-marquee";

const Footer = () => {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  return (
    <div className="footer">
      <div className="footer_top">
        <div className="footer_title">
          <span>eventos</span>
        </div>
        <div className="footer_sub_title">
          <Marquee speed={30} gradient={false}>
            <p>Thanks for checking out our events.😊</p>
            <p>Thanks for checking out our events.👍</p>
          </Marquee>
        </div>
      </div>

  
    </div>
  );
};

export default Footer;
