import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user.context";

function Navbar() {
  const { loggedUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="nav-bar">
      <ul>
        <img src="logo.svg" className="logo" />
        <li>
          <NavLink
            className="link"
            activeClassName="active"
            to="/calendar"
            style={{ display: "flex" }}
          >
            <img src="calendarIcon.svg" className="icon-nav-bar" /> Calendar
          </NavLink>
        </li>
        <li>
          <NavLink
            className="link"
            to="/notes"
            style={{ display: "flex" }}
            activeClassName="active"
          >
            {" "}
            <img src="notesIcon.svg" className="icon-nav-bar" /> Notes
          </NavLink>
        </li>
        <div className="line"></div>
        <li className="my-profile">
          <div className="picture-my-profile">
            <img src="person.png" />
          </div>
          <NavLink activeClassName="active" to="/profile">
            My Profile
          </NavLink>
        </li>
        <li>
          {" "}
          <button onClick={handleLogout}>
            <img className="me-3" src="iconLogOut.svg" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
