import React, { useEffect, useState } from "react";
import {
  Loading,
  SingleRecentEvent,
  QuantityModal,
  RecentEvents,
  Footer,
} from "../../components";
import Recent1 from "../../assets/images/recent1.jpg";
import Recent2 from "../../assets/images/recent2.jpg";
import Recent3 from "../../assets/images/recent3.jpg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleEvent } from "../../store/event/event.action";
import Alert from "../../components/Alert";
import { deleteEvent as execDeleteEvent } from "../../store/event/event.action";
import { eventActions } from "../../store/event/event.slice";

const SingleEventPage = () => {
  const [selectQuantity, setSelectQuantity] = useState(false);
  const [date, setDate] = useState("");

  const { user } = useAppSelector((state) => state.auth);
  const { singleEvent } = useAppSelector((state) => state.event);
  const { isLoading, showAlert } = useAppSelector((state) => state.generalUI);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const editEvent = () => {
    dispatch(eventActions.setEditEvent(true));
    navigate("/create-event");
  };

  const deleteEvent = async (eventId: number) => {
    const result = await dispatch(execDeleteEvent(eventId));
    if (result) {
      navigate("/");
    }
  };

  const { eventId } = useParams();

  useEffect(() => {
    if (eventId) {
      dispatch(getSingleEvent(+eventId));
    }
    const date = new URLSearchParams(window.location.search).get("date");

    if (date) setDate(date);
    //eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!singleEvent.id && !isLoading) {
    return (
      <div className="single_ticketPg">
        <div className="single_ticketPg_recent recent">
          <div>
            {showAlert && <Alert />}
            <p>Something went wrong, try again later</p>
          </div>
        </div>

        <RecentEvents />

        <div className="creator single_ticketPg_creator">
          <p>
            You can also put your events out there for our exciting visitiors.
          </p>
          <button className="btn">Become a creator</button>
        </div>
      </div>
    );
  }

  return (
    <div className="single_ticketPg">
      {selectQuantity && (
        <QuantityModal toggleSelectQty={() => setSelectQuantity(false)} />
      )}
      <div className="single_ticketPg_header">
        <div>
          <h4 className="single_ticketPg_title">{singleEvent.title}</h4>
          <p className="single_ticketPg_date">
            {date ? date : singleEvent.date}
          </p>
        </div>

        {user?.role === "creator" ? (
          <div className="single_ticketPg_actions">
            <p
              className="single_ticketPg_actions_edit"
              onClick={() => editEvent()}
            >
              Edit Event
            </p>
            <p
              className="single_ticketPg_actions_delete"
              onClick={() => deleteEvent(singleEvent.id)}
            >
              Delete Event
            </p>
          </div>
        ) : (
          <div className="single_ticketPg_price">
            <span className="single_ticketPg_amt">
              ${singleEvent.price}/ticket
            </span>
            <span
              className="single_ticketPg_price_action"
              onClick={() => setSelectQuantity(true)}
            >
              Get Ticket
            </span>
          </div>
        )}
      </div>

      <div className="single_ticketPg_content">
        <div className="single_ticketPg_description">
          <span className="single_ticketPg_subTitle">Description</span>
          <p>{singleEvent.description}</p>
        </div>

        <div className="single_ticketPg_location">
          <span className="single_ticketPg_subTitle">Location</span>
          <p className="single_ticketPg_venue">
            {" "}
            {singleEvent.venue} - {singleEvent.location}
          </p>
        </div>
      </div>

      <div className="single_ticketPg_imgDiv">
        <img src={singleEvent.imgPath} alt="" />
      </div>

      <div className="single_ticketPg_recent ">
        <RecentEvents />
      </div>

      <div className="creator single_ticketPg_creator">
        <p>
          You can also put your events out there for our exciting visitiors.
        </p>
        <button className="btn">Become a creator</button>
      </div>
    </div>
  );
};

export default SingleEventPage;
