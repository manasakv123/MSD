import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
import DriverRegister from "./pages/DriverRegister";
import Driverlogin from "./pages/Driverlogin";
import Role from "./Role";
import Dashboard from "./Dashboard";
import DriverTripDetails from "./pages/DriverTripDetails";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Other Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/role" element={<Role />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/driver/register" element={<DriverRegister />} />
        <Route path="/driver/login" element={<Driverlogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/driver/trip" element={<DriverTripDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
