import React from "react";
import { ReactComponent as ReactLogo } from "../assets/images/arrow-right.svg";

interface SingleRecentEventProps {
  title: string;
  date: string;
  img: any;
  displayExtraContent: boolean;
}

const SingleRecentEvent: React.FC<SingleRecentEventProps> = (props) => {
  return (
    <div className="single_recent_event">
      <div className="single_recent_event_img">
        <img src={props.img} alt={props.title} />
      </div>
      <div
        className={`${
          props.displayExtraContent && "overlay_dark"
        } single_recent_event_overlay`}
      ></div>
      <div className="single_recent_event_content">
        <h5 className="single_recent_event_title">{props.title}</h5>
        {props.displayExtraContent && (
          <div className="extra_content">
            <p className="single_recent_event_date">{props.date}</p>
            <p className="single_recent_event_action">
              Explore <ReactLogo />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleRecentEvent;
