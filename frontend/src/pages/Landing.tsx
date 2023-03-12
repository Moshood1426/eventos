import React, { useEffect, useState, useRef } from "react";
import { Footer, Navbar, RecentEvents } from "../components";
import { ReactComponent as ReactLogo } from "../assets/images/arrow-right.svg";
import gsap from "gsap";
import Recent1 from "../assets/images/recent1.jpg";
import { SingleRecommended } from "../components";
import Marquee from "react-fast-marquee";
import { RiCalendarEventLine } from "react-icons/ri";
import { reccommendedData, categories } from "../utils/data";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const overlayRef = useRef(null);
  const [categoryImg, setCategoryImg] = useState(Recent1);
  const [activeCategoryId, setActiveCategoryId] = useState(1);
  const [isActive, setIsActive] = useState([1, 4]);

  const navigate = useNavigate();

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.to(".landing", { visibility: "visible" });

    gsap.from(".creator_content", {
      y: 30,
      autoAlpha: 0,
      scrollTrigger: {
        trigger: ".creator_content",
        start: "top 70%",
        toggleActions: "restart none none reverse",
      },
    });

    gsap.from(".category_list_item", {
      y: 30,
      autoAlpha: 0,
      stagger: .1,
      scrollTrigger: {
        trigger: ".category_list_item",
        start: "top 70%",
        toggleActions: "restart none none reverse",
      },
    });
  }, []);

  useEffect(() => {
    const category = categories.find((item) => item.id === activeCategoryId);
    if (category) setCategoryImg(category?.img);

    gsap.fromTo(
      ".category_img",
      {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        autoAlpha: 0,
      },
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
        autoAlpha: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".category_img",
          start: "top 70%",
        },
      }
    );
  }, [activeCategoryId]);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(overlayRef.current, {
      height: "0%",
      duration: ".85",
      ease: "power1.inOut",
    })
      .to(".intro_header", {
        clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
        duration: ".85",
      })
      .to(".intro_sub_header", {
        autoAlpha: 1,
        y: 10,
      });
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
          <p
            className="intro_sub_header"
            onClick={() => navigate("/all-events")}
          >
            Start exploring event
            <ReactLogo />
          </p>
        </div>
      </div>

      <div className="horizontal_text">
        <Marquee speed={30} gradient={false} delay={2.5}>
          <span>
            <RiCalendarEventLine />
            Get the latest events from eventos
          </span>
          <span>
            <RiCalendarEventLine />
            Get the latest events from eventos
          </span>
        </Marquee>
      </div>

      <RecentEvents />

      <div className="category">
        <h4>Explore Category</h4>
        <div className="category_container">
          <div className="category_items">
            <ul>
              {categories.map((item) => {
                return (
                  <div className="category_list_item" key={item.id}>
                    <li
                      key={item.id}
                      className={item.id === activeCategoryId ? "active" : ""}
                      onMouseEnter={() => setActiveCategoryId(item.id)}
                      onClick={() =>
                        navigate(`/all-events?category=${item.category}`)
                      }
                      // onMouseLeave={() => setActiveCategoryId(1)}
                    >
                      {item.title}
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
          <div className="category_img">
            <img src={categoryImg} alt="current img" />
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
                active={isActive.includes(item.id) ? true : false}
                onHover={() =>
                  item.id === 2 || item.id === 3
                    ? setIsActive([2, 3])
                    : setIsActive([1, 4])
                }
              />
            );
          })}
        </div>
      </div>

      <div className="creator">
        <p className="creator_content">
          You can also put your events out there for our exciting visitiors.
        </p>
        <button className="btn" onClick={() => navigate("/register")}>
          Become a creator
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
