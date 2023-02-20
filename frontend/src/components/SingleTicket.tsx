import React from "react";
import { useAppSelector } from "../store/hooks";

interface SingleTicketProps {
  number: number;
  title: string;
  date: string;
  venue: string;
  location: string;
  price: number;
  host: string;
  imgPath: any;
}

const SingleTicket: React.FC<SingleTicketProps> = (props) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="single_ticket">
      <h5 className="single_ticket_number">{props.number}.</h5>
      <div className="single_ticket_details">
        <h5 className="single_ticket_title">{props.title}</h5>
        <p className="single_ticket_date">{props.date}</p>
        <p className="single_ticket_venue">
          {props.venue} - {props.location}
        </p>
        <p className="single_ticket_price">Starts from ${props.price}</p>
        <div>
          {}
        </div>
      </div>
      <div className="single_ticket_imgDiv">
        <img src={props.imgPath} alt={props.title} />
      </div>
    </div>
  );
};

export default SingleTicket;
