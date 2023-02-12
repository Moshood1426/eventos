import React, { useEffect } from "react";
import { SingleRecentEvent } from "../../components";
import recent1 from "../../assets/images/recent1.jpg";
import Recent1 from "../../assets/images/recent1.jpg";
import Recent2 from "../../assets/images/recent2.jpg";
import Recent3 from "../../assets/images/recent3.jpg";

const SingleTicketPage = () => {
  const ticketData = {
    id: 2,
    title: "The Sweet Spot Borlesque",
    date: "Fri, Feb 3. 7:00pm",
    venue: "Old Trafford Stadium",
    location: "England, LA",
    price: {
      category1: 36,
    },
    moderator: "The Manchester United Grp",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna
       aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing 
       elit, sed do eiusmod tempor incididunt ut labore et dolore 
       magna aliqua.`,
  };

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
  useEffect(() => {}, []);

  return (
    <div className="single_ticketPg">
      <div className="single_ticketPg_header">
        <div>
          <h4 className="single_ticketPg_title">{ticketData.title}</h4>
          <p className="single_ticketPg_date">{ticketData.date}</p>
        </div>

        <div className="single_ticketPg_price">
          <span className="single_ticketPg_amt">
            ${ticketData.price.category1}/ticket
          </span>
          <span className="single_ticketPg_price_action">Get Ticket</span>
        </div>
      </div>

      <div className="single_ticketPg_content">
        <div className="single_ticketPg_description">
          <span className="single_ticketPg_subTitle">Description</span>
          <p>{ticketData.description}</p>
        </div>

        <div className="single_ticketPg_location">
          <span className="single_ticketPg_subTitle">Location</span>
          <p className="single_ticketPg_venue">
            {" "}
            {ticketData.venue} - {ticketData.location}
          </p>
        </div>
      </div>

      <div className="single_ticketPg_imgDiv">
        <img src={recent1} alt="" />
      </div>

      <div className="single_ticketPg_recent recent">
        <h4>Other Recent Events</h4>
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

      <div className="creator single_ticketPg_creator">
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

export default SingleTicketPage;
