import React from "react";
import { SingleTicket } from "../../components";
import Recent1 from "../../assets/images/recent1.jpg";

const AllTickets = () => {
  const ticketsData = [
    {
      id: 1,
      title: "The Sweet Spot Borlesque",
      date: "Fri, Feb 3. 7:00pm",
      venue: "Old Trafford Stadium",
      location: "England, LA",
      price: {
        category1: 36,
      },
      moderator: "The Manchester United Grp",
    },
    {
      id: 2,
      title: "The Sweet Spot Borlesque",
      date: "Fri, Feb 3. 7:00pm",
      venue: "Old Trafford Stadium",
      location: "England, LA",
      price: {
        category1: 36,
      },
      moderator: "The Manchester United Grp",
    },
    {
      id: 3,
      title: "The Sweet Spot Borlesque",
      date: "Fri, Feb 3. 7:00pm",
      venue: "Old Trafford Stadium",
      location: "England, LA",
      price: {
        category1: 36,
      },
      moderator: "The Manchester United Grp",
    },
  ];
  return (
    <div>
      <h4 className="tickets_header">Explore Tickets</h4>
      <div className="tickets_container">
        <div className="tickets_filter">
          <h5>Filters</h5>
        </div>
        <div className="tickets_content">
          <div>
            {ticketsData.map((item, index) => {
              return (
                <SingleTicket
                  key={item.id}
                  {...item}
                  number={index + 1}
                  img={Recent1}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTickets;
