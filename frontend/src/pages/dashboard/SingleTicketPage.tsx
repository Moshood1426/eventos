import React, { useEffect } from "react";

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
  useEffect(() => {}, []);

  return <div>Single Ticket</div>;
};

export default SingleTicketPage;
