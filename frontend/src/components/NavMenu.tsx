import React from "react";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  const actions = [
    { id: 1, title: "Marketplace", to: "/explore" },
    { id: 2, title: "Favorites", to: "/create-quiz" },
    { id: 3, title: "Create Event", to: "/" },
    { id: 4, title: "History", to: "/" },
  ];

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
