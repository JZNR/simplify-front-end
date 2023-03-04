import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useState, useContext } from "react";
import { UserContext } from "./context/user.context";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CalendarPage from "./pages/CalendarPage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Profile from "./pages/Profile";
import IsPrivate from "./components/IsPrivate";

function App() {
  const { loggedUser } = useContext(UserContext);

  return (
    <div className="App">
      <ToastContainer />
      <div className="h-100">
        <Row>
          {loggedUser && (
            <Col xs={2}>
              {" "}
              <Navbar />
            </Col>
          )}
          <Col>
            <Routes>
              <Route 
              path={"/login"} 
              element={<Login />} />
              <Route 
              path={"/signup"} 
              element={<Signup />} />
              <Route
                path={"/calendar"}
                element={<IsPrivate><CalendarPage/></IsPrivate>}
              />
                <Route
                path={"/"}
                element={<IsPrivate><CalendarPage/></IsPrivate>}
              />
              <Route 
              path={"/profile"} 
              element={<IsPrivate> <Profile /> </IsPrivate>} />
            </Routes>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
