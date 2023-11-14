import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./Components/User/User";
import Landing from './Components/Landing/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Forgot from './Components/Auth/Forgot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
