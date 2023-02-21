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

function App() {
  const { loggedUser } = useContext(UserContext);

  return (
    <div className="App">
      <ToastContainer />
      <Container>
        {loggedUser && <Navbar />}

        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/calendar"} element={<CalendarPage />} />
          <Route path={"/signup"} element={<Signup />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
