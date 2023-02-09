import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  setClientIsUser?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  return (
    <nav className="nav">
      <div className="nav_container">
        <Link to="/" className="nav_logo">
          <span>eventos</span>
        </Link>
        <div className="nav_items">
          <div>
            <input
              type="text"
              placeholder="search for an event"
              className="form_input nav_form_input"
            />
          </div>
          <p
            onClick={() =>
              props.setClientIsUser && props.setClientIsUser(false)
            }
          >
            <Link to="/register">Create an Event</Link>
          </p>
          <p
            onClick={() =>
              props.setClientIsUser && props.setClientIsUser(false)
            }
          >
            <Link to="/register">Register</Link>
          </p>
          <p
            onClick={() => props.setClientIsUser && props.setClientIsUser(true)}
          >
            <Link to="/register">Log in</Link>
          </p>
        </div>
        <div className="nav_menu">
          <span className="nav_menu__burger"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
