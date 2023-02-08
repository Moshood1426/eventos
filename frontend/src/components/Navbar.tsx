import React from "react";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav_container">
        <div className="nav_logo">
          <span>eventos</span>
        </div>
        <div className="nav_items">
          <div>
            <input
              type="text"
              placeholder="search for an event"
              className="form_input nav_form_input"
            />
          </div>
          <p>Create an Event</p>
          <p>Register</p>
          <p>Log in</p>
        </div>
        <div className="nav_menu">
          <span className="nav_menu__burger"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
