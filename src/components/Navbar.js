import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user.context";

function Navbar() {
  const { loggedUser, logout } = useContext(UserContext);

  return (
    <div className="nav-bar">
      <ul>
        <img src="logo.svg" className="logo" />
        <li>
          <img src="calendarIcon.svg" className="icon-nav-bar" />{" "}
          <NavLink to="/calendar">Calendar</NavLink>
        </li>
        <li>
          <img src="notesIcon.svg" className="icon-nav-bar" />{" "}
          <NavLink to="/notes">Notes</NavLink>
        </li>
        <div className="line"></div>
        <li className="my-profile">
          <div className="picture-my-profile">
            <img src="person.png" />
          </div>
          <NavLink to="/profile">My Profile</NavLink>
        </li>
        <li>
          {" "}
          <button onClick={logout}>
            <img className="me-3" src="iconLogOut.svg" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
