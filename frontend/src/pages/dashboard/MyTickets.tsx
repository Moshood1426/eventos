import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserTickets } from "../../store/sales/sales.actions";

const MyTickets = () => {
  const { tickets } = useAppSelector((state) => state.sales);
  const { isLoading } = useAppSelector((state) => state.generalUI);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserTickets());
  }, []);

  if (isLoading) {
    return (
      <div>
        <h4 className="tickets_header">My Tickets</h4>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <h4 className="tickets_header">My Tickets</h4>
      <div className="single_ticket_container">
        <div className="single_ticket_content">
          <span className="single_ticket_content_num">S/N</span>
          <h5 className="single_ticket_content_title">Title</h5>
          <p className="single_ticket_content_qty">Qty</p>
          <p className="single_ticket_content_price">
            Price/<span>item</span>
          </p>
        </div>
      </div>
      {tickets.length < 1 ? (
        <p>User has no valid tickets</p>
      ) : (
        tickets.map((item, index) => {
          return (
            <div className="single_ticket_container">
              <div className="single_ticket_content">
                <span className="single_ticket_content_num">{index + 1}</span>
                <h5
                  className="single_ticket_content_title"
                  onClick={() => navigate(`/single-event/${item.event.id}`)}
                >
                  {item.event.title}
                </h5>
                <p className="single_ticket_content_qty">{item.numOfTickets}</p>
                <p className="single_ticket_content_price">
                  {item.totalOrderAmount}/<span>{item.event.price}</span>
                </p>
              </div>
              <div className="single_ticket_status">
                <p>status - {item.status}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyTickets;
