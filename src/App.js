import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useState, useContext } from "react";
import { UserContext } from "./context/user.context";
import CustomCalendar from "./components/CustomCalendar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { loggedUser } = useContext(UserContext);

  return (
    <div className="App">
      <ToastContainer />
      {/* {loggedUser && <Navbar />} */}
      <Routes>
        <Route path={"/"} element={<CustomCalendar />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
