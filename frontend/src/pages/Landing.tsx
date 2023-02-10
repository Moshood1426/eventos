import React, { useEffect, useRef } from "react";
import { Navbar } from "../components";
import { ReactComponent as ReactLogo } from "../assets/images/arrow-right.svg";
import gsap from "gsap";
import Recent1 from "../assets/images/recent1.jpg";
import Recent2 from "../assets/images/recent2.jpg";
import Recent3 from "../assets/images/recent3.jpg";
import { SingleRecentEvent, SingleRecommended } from "../components";

let firstRender = true

const Landing = () => {
  const recentEventData = [
    {
      id: 1,
      title: "French Embassy Concerts & Wine Reception",
      date: "Fri, Feb 3, 7:00pm",
      img: Recent1,
    },
    {
      id: 2,
      title: "England Embassy Concerts & Wine Reception",
      date: "Fri, Feb 3, 7:00pm",
      img: Recent2,
    },
    {
      id: 3,
      title: "Uruguay Embassy Concerts & Wine Reception",
      date: "Fri, Feb 3, 7:00pm",
      img: Recent3,
    },
  ];
  const overlayRef = useRef(null);

  const reccommendedData = [
    {
      id: 1,
      title: "French Embassy Concerts & Wine Reception",
      category: "Soccer",
      img: Recent1,
    },
    {
      id: 2,
      title: "England Embassy Concerts & Wine Reception",
      category: "Banquet",
      img: Recent2,
    },
    {
      id: 3,
      title: "Uruguay Embassy Concerts & Wine Reception",
      category: "Party",
      img: Recent3,
    },
    {
      id: 4,
      title: "Uruguay Embassy Concerts & Wine Reception",
      category: "Soccer",
      img: Recent3,
    },
  ];

  useEffect(() => {
    // if(firstRender) {
    //   firstRender = false
    //   return
    // }
    // Preventing flash from happening.
    // gsap.to("body", { css: { visibility: "visible", duration: 0} });

    // // //On load timeline
    // const tl = gsap.timeline();

    // tl.from(overlayRef.current, {
    //   height: "100%",
    //   duration: "1.1",
    //   ease: "power1.inOut",
    // })
    //   .from(".intro_header", {
    //     clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    //     duration: "1.3",
    //   })
    //   .from(".intro_sub_header", {
    //     autoAlpha: 0,
    //     y: "10px",
    //   });
    // gsap.to(".horizontal_text_content span", {
    //   xPercent: -100,
    //   duration: 8,
    //   ease: "none",
    //   repeat: -1,
    // });
  }, [overlayRef]);

  return (
    <div className="landing">
      <Navbar />
      <div className="intro">
        <div className="intro_overlay" ref={overlayRef}></div>
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
      <div className="horizontal_text">
        <div className="horizontal_text_content">
          <span>Get the latest events from eventos</span>
          <span>Get the latest events from eventos</span>
        </div>
      </div>
      <div className="recent">
        <h4>Our Recent Events</h4>
        <div className="recent_events">
          {recentEventData.map((item) => {
            return (
              <SingleRecentEvent
                key={item.id}
                {...item}
                displayExtraContent={item.id === 2 ? true : false}
              />
            );
          })}
        </div>
      </div>
      <div className="category">
        <h4>Explore Category</h4>
        <div className="category_container">
          <div className="category_items">
            <ul>
              <li className="active">Football events</li>
              <li>Conference Meetings</li>
              <li>Banquets and Parties</li>
              <li>Music Concerts</li>
            </ul>
          </div>
          <div className="category_img">
            <img src={Recent1} alt="current img" />
          </div>
        </div>
      </div>
      <div className="recommended">
        <h4>Checkout these events</h4>
        <div className="recommended_events">
          {reccommendedData.map((item) => {
            return (
              <SingleRecommended
                key={item.id}
                {...item}
                active={item.id === 2 || item.id === 3 ? true : false}
              />
            );
          })}
        </div>
      </div>

      <div className="creator">
        <p>
          You can also put your events out there for our exciting visitiors.
        </p>
        <button className="btn">Become a creator</button>
      </div>

      <div className="footer">
        <div className="footer_container">
          <span>Thanks for checking out our events</span>
          <span>Thanks for checking out our events</span>
          <span>Thanks for checking out our events</span>
          <span>Thanks for checking out our events</span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
