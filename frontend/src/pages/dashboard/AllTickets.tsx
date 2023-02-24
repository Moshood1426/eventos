import React, { useEffect } from "react";
import { Loading, SingleTicket } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllEvents } from "../../store/event/event.action";
import Alert from "../../components/Alert";

const AllTickets = () => {
  const dispatch = useAppDispatch();
  const { allEvents } = useAppSelector((state) => state.event);
  const { isLoading, showAlert } = useAppSelector((state) => state.generalUI);

  useEffect(() => {
    dispatch(getAllEvents());

    //eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (allEvents.length < 1) {
    return (
      <div>
        <h4 className="tickets_header">Explore Tickets</h4>
        <span>No tickets available for purchase right now</span>
      </div>
    );
  }

  return (
    <div>
      <h4 className="tickets_header">Explore Tickets</h4>
      {showAlert && <Alert />}
      <div className="tickets_container">
        <div className="tickets_filter">
          <h5>Filters</h5>
        </div>
        <div className="tickets_content">
          <div>
            {allEvents.map((item, index) => {
              return (
                <SingleTicket
                  key={item.id}
                  {...item}
                  price={item.price!}
                  number={index + 1}
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
