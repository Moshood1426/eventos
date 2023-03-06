import gsap from "gsap";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as RightArrow } from "../assets/images/arrow-right.svg";

interface SingleRecommendedProps {
  title: string;
  img: any;
  category: string;
  active: boolean;
  onHover: () => any;
}

const SingleRecommended: React.FC<SingleRecommendedProps> = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    // gsap.from(".span2", {
    //   clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    //   autoAlpha: 0,
    // });
  }, []);

  return (
    <div
      className={`single_recommended ${props.active ? "span2" : ""}`}
      onMouseEnter={() => props.onHover()}
    >
      <div
        className={`single_recommended_overlay ${
          props.active ? "overlay_dark_rd" : ""
        }`}
      ></div>
      <div className="single_recommended_img">
        <img src={props.img} alt={props.title} />
      </div>
      {props.active && (
        <div className="single_recommended_content">
          <span className="single_recommended_content_category">
            Category - {props.category}
          </span>
          <div>
            <h5>{props.title}</h5>
            <p>
              Explore <RightArrow />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleRecommended;
