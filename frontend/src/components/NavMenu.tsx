import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const NavMenu = () => {
  const consumerActions = [
    { id: 1, title: "Marketplace", to: "/" },
    { id: 2, title: "Favorites", to: "/favorites" },
    { id: 3, title: "My Tickets", to: "/my-tickets" },
    { id: 4, title: "Profile", to: "/profile" },
  ];

  const creatorActions = [
    { id: 1, title: "Stats", to: "/" },
    { id: 2, title: "Create Event", to: "/create-event" },
    { id: 3, title: "My Events", to: "/my-events" },
    { id: 4, title: "Profile", to: "/profile" },
  ];

  const { user } = useAppSelector((state) => state.auth);
  const actions = user?.role === "creator" ? creatorActions : consumerActions;

  return (
    <div className="actions">
      <div className="actions-container">
        {actions.map((item) => {
          return (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "actions-item active-actions-item" : "actions-item"
              }
            >
              {item.title}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default NavMenu;
