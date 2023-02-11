import React from "react";

interface SingleTicketProps {
  number: number;
  title: string;
  date: string;
  venue: string;
  location: string;
  price: { category1: number };
  moderator: string;
  img: any;
}

const SingleTicket: React.FC<SingleTicketProps> = (props) => {
  return (
    <div className="single_ticket">
      <h5 className="single_ticket_number">{props.number}.</h5>
      <div className="single_ticket_details">
        <h5 className="single_ticket_title">{props.title}</h5>
        <p className="single_ticket_date">{props.date}</p>
        <p className="single_ticket_venue">
          {props.venue} - {props.location}
        </p>
        <p className="single_ticket_price">
          Starts from ${props.price.category1}
        </p>
        <p className="single_ticket_moderator">{props.moderator}</p>
      </div>
      <div className="single_ticket_imgDiv">
        <img src={props.img} alt={props.title} />
      </div>
    </div>
  );
};

export default SingleTicket;
