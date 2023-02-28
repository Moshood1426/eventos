import gsap from "gsap";
import React, { useState, useEffect } from "react";
import { ReactComponent as ReactLogo } from "../assets/images/arrow-right.svg";

interface SingleRecentEventProps {
  title: string;
  date: string;
  img: any;
}

const SingleRecentEvent: React.FC<SingleRecentEventProps> = (props) => {
  const [displayExtraContent, setDisplayExtraContent] = useState(false);

  useEffect(() => {
    if (displayExtraContent) {
      const tl = gsap.timeline();
      tl.from(".overlay_dark", {
        clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        duration: 0.45,
        autoAlpha: 0,
        ease: "Power2.inOut"
      })
        .from(".single_recent_event_date", {
          y: -7.5,
          duration: 0.25,
          autoAlpha: 0,
        })
        .from(".single_recent_event_action", {
          y: -7.5,
          duration: 0.25,
          autoAlpha: 0,
        });
    }
  }, [displayExtraContent]);

  return (
    <div
      className="single_recent_event"
      onMouseEnter={() => setDisplayExtraContent(true)}
      onMouseLeave={() => setDisplayExtraContent(false)}
    >
      <div className="single_recent_event_img">
        <img src={props.img} alt={props.title} />
      </div>
      <div
        className={`${
          displayExtraContent && "overlay_dark"
        } single_recent_event_overlay`}
      ></div>
      <div className="single_recent_event_content">
        <h5 className="single_recent_event_title">{props.title}</h5>
        {displayExtraContent && (
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
