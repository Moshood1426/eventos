import gsap from "gsap";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, toggleClientIsUser } from "../store/auth/auth.actions";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Navbar: React.FC = () => {
  const [displayLogout, setDisplayLogout] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const userRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (displayLogout) {
      gsap.from(userRef.current, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        autoAlpha: 0,
      });
    }
  }, [displayLogout]);

  return (
    <nav className="nav">
      <div className="nav_container">
        <Link to="/" className="nav_logo">
          <span>eventos</span>
        </Link>
        {user ? (
          <div className="user_icon">
            <span
              className="nav_profile"
              onClick={() => setDisplayLogout(!displayLogout)}
            >
              {user.name[0]}
            </span>
            {displayLogout && (
              <div className="user_icon_options" ref={userRef}>
                <p className="dropdown_name">{user?.name}</p>
                <p>Profile</p>
                <p
                  onClick={() => {
                    dispatch(signOut());
                    navigate("/landing");
                  }}
                >
                  Log out
                </p>
              </div>
            )}
          </div>
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
