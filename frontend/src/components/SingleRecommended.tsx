import React, { useEffect } from "react";
import { ReactComponent as RightArrow } from "../assets/images/arrow-right.svg";

interface SingleRecommendedProps {
  title: any;
  img: any;
  category: any;
  active: boolean;
  onHover: () => any;
}

const SingleRecommended: React.FC<SingleRecommendedProps> = (props) => {
  
  useEffect(() => {

  }, [])

  return (
    <div
      className={`single_recommended ${props.active && "span2"}`}
      onMouseEnter={() => props.onHover()}
    >
      <div
        className={`single_recommended_overlay ${
          props.active && "overlay_dark"
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
