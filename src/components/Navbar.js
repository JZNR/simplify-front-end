import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user.context";

function Navbar() {
  const { loggedUser, logout } = useContext(UserContext);

  return (
    <div>
      <ul>
        <li>
          <NavLink to="/calendar">Calendar</NavLink>
        </li>
        <li>
          <NavLink to="/notes">Notes</NavLink>
        </li>

        <li>
          <NavLink to="/profile">My Profile</NavLink>
        </li>
        <li>
          {" "}
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
