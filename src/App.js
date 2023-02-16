import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import AddProject from './pages/AddProject';
import ProjectDetail from './pages/ProjectDetail';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Signup from './pages/Signup';
import Login from './pages/Login';
import IsPrivate from './components/IsPrivate';
import { Calendar } from 'react-calendar';

function App() {
  return (
    <div className="App">
    <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path={'/'} element={<Calendar/>}/>
        <Route path={'/signup'} element={<Signup/>}/>
        <Route path={'/login'} element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
