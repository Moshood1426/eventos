import React, { useEffect } from "react";
import { SingleTicket } from "../../components";
import { getFavEvents } from "../../store/event/event.action";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Favorites = () => {
  const { favEvents } = useAppSelector((state) => state.event);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFavEvents());
  }, []);

  return (
    <div>
      <h4 className="tickets_header">Favorite Events</h4>
      <div className="tickets_container">
        <div className="tickets_content">
          <div>
            {favEvents.length < 1 ? (
              <span>User currently has no favorite events</span>
            ) : (
              favEvents.map((item, index) => {
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

export default Favorites;
