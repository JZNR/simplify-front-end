import logo from './logo.svg';
import './App.css';
import ListProjects from './pages/ListProjects';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import AddProject from './pages/AddProject';
import ProjectDetail from './pages/ProjectDetail';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Signup from './pages/Signup';
import Login from './pages/Login';
import IsPrivate from './components/IsPrivate';

function App() {
  return (
    <div className="App">
    <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path={'/'} element={<ListProjects/>}/>
        <Route path={'/projects'} element={<ListProjects/>}/>
        <Route path={'/projects/add'} element={<IsPrivate> <AddProject/> </IsPrivate>}/>
        <Route path={'/projects/:projectId'} element={<ProjectDetail/>}/>
        <Route path={'/signup'} element={<Signup/>}/>
        <Route path={'/login'} element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
