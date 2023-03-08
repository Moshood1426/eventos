import gsap from "gsap";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, toggleClientIsUser } from "../store/auth/auth.actions";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { BiSearchAlt2 } from "react-icons/bi";

const Navbar: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [displayLogout, setDisplayLogout] = useState(false);
  const [displayNavMenu, setDisplayNavMenu] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const userRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (displayNavMenu) {
      gsap.from(".nav_menu_list", {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        autoAlpha: 0,
      });
    }
  }, [displayNavMenu])

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
        <Link to="/landing" className="nav_logo">
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
              <div className="nav_items_search">
                <input
                  type="text"
                  placeholder="search for an event"
                  className="form_input nav_form_input"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <BiSearchAlt2
                  className="search_icon"
                  onClick={() => navigate(`/all-events?title=${searchValue}`)}
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
              {displayNavMenu && (
                <div className="nav_menu_list">
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
              )}
              <span
                className={`nav_menu__burger ${displayNavMenu && "open"}`}
                onClick={() => setDisplayNavMenu((prevValue) => !prevValue)}
              ></span>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
