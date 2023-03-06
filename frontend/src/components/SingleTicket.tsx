import React, { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { addEventAsFav, removeEventFromFav } from "../store/event/event.action";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

interface SingleTicketProps {
  id: number;
  number: number;
  title: string;
  date: string;
  venue: string;
  location: string;
  price: number;
  host: string;
  imgPath: any;
  isFavorite?: boolean;
}

const SingleTicket: React.FC<SingleTicketProps> = (props) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const ticketRef = useRef(null);

  useEffect(() => {
    gsap.from(ticketRef.current, {
      y: 20,
      autoAlpha: 0,
      stagger: 1,
      scrollTrigger: {
        trigger: ticketRef.current,
        start: "top 80%",
      },
    });
  }, []);

  const getSingleEvent = (id: number, date: string) => {
    navigate(`/single-event/${id}?date=${date}`);
  };

  const addEventToFav = (eventId: number) => {
    dispatch(addEventAsFav(eventId));
  };

  const removeEventAsFav = (eventId: number) => {
    dispatch(removeEventFromFav(eventId));
  };

  return (
    <div className="single_ticket" ref={ticketRef}>
      <h5 className="single_ticket_number">{props.number}.</h5>
      <div className="single_ticket_details">
        <h5
          className="single_ticket_title"
          onClick={() => getSingleEvent(props.id, props.date)}
        >
          {props.title}
        </h5>
        <p className="single_ticket_date">{props.date}</p>
        <p className="single_ticket_venue">
          {props.venue} - {props.location}
        </p>
        <p className="single_ticket_price">Starts from ${props.price}</p>

        {user?.role === "consumer" &&
          (props.isFavorite ? (
            <p
              className="single_ticket_removeFav"
              onClick={() => removeEventAsFav(props.id)}
            >
              Remove from favorite{" "}
              <MdFavoriteBorder className="single_ticket_fav_icon" />
            </p>
          ) : (
            <p
              className="single_ticket_addFav"
              onClick={() => addEventToFav(props.id)}
            >
              Add as favorite <MdFavorite className="single_ticket_fav_icon" />
            </p>
          ))}
      </div>
      <div className="single_ticket_imgDiv">
        <img src={props.imgPath} alt={props.title} />
      </div>
    </div>
  );
};

export default SingleTicket;
