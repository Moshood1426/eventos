import React from "react";
import SingleRecentEvent from "./SingleRecentEvent";
import Recent1 from "../assets/images/recent1.jpg";
import Recent2 from "../assets/images/recent2.jpg";
import Recent3 from "../assets/images/recent3.jpg";

const RecentEvents = () => {
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

  return (
    <div className="recent">
      <h4>Our Recent Events</h4>
      <div className="recent_events">
        {recentEventData.map((item) => {
          return <SingleRecentEvent key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default RecentEvents;
