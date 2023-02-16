import React from "react";
import { Link } from "react-router-dom";
import { toggleClientIsUser } from "../store/auth/auth.actions";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Navbar: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <nav className="nav">
      <div className="nav_container">
        <Link to="/" className="nav_logo">
          <span>eventos</span>
        </Link>
        {user ? (
          <span className="nav_profile">{user.name[0]}</span>
        ) : (
          <>
            <div className="nav_items">
              <div>
                <input
                  type="text"
                  placeholder="search for an event"
                  className="form_input nav_form_input"
                />
              </div>

              <p onClick={() => dispatch(toggleClientIsUser(false))}>
                <Link to="/register">Create an Event</Link>
              </p>
              <p onClick={() => dispatch(toggleClientIsUser(false))}>
                <Link to="/register">Register</Link>
              </p>
              <p onClick={() => dispatch(toggleClientIsUser(true))}>
                <Link to="/register">Log in</Link>
              </p>
            </div>
            <div className="nav_menu">
              <span className="nav_menu__burger"></span>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
