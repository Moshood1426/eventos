import React, { useEffect } from "react";
import { SingleTicket } from "../../components";
import { getUserEvents } from "../../store/event/event.action";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const MyEvents = () => {
  const { userEvents } = useAppSelector((state) => state.event);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserEvents());
  }, []);

  return (
    <div>
      <h4 className="tickets_header">My Events</h4>
      <div className="tickets_container">
        <div className="tickets_content">
          <div>
            {userEvents.length < 1 ? (
              <span>User currently has no events</span>
            ) : (
              userEvents.map((item, index) => {
                return (
                  <SingleTicket
                    key={item.id}
                    {...item}
                    price={item.price!}
                    number={index + 1}
                    isFavorite={true}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
