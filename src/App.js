import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Calendar } from "react-calendar";
import { useState, useContext } from "react";
<<<<<<< HEAD
=======
import { UserContext } from "./context/user.context";
>>>>>>> refs/remotes/origin/main
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserContext } from "./context/user.context";

function App() {
  const { loggedUser } = useContext(UserContext);

  return (
    <div className="App">
      <ToastContainer />
      {/* {loggedUser && <Navbar />} */}
      <Navbar></Navbar>
      <Routes>
        <Route path={"/"} element={<Calendar />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
