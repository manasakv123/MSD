import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <img src="/img/logo.png" alt="Gadhi Dundo Logo" className="logo-img" />
          <span className="logo-text">Gadhi Dundo</span>
        </div>
        <ul className="nav-links">
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/stories">Travel Stories</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
      </nav>

      {/* Booking Form */}
      <div className="content">
        <h2>Book Your Ride!</h2>
        
        <input type="text" placeholder="Enter Pickup Location" />
        <input type="text" placeholder="Enter Drop Location" />

        <input type="date" />
        <input type="time" />

        <input type="number" placeholder="Number of Passengers" min="1" max="10" />

        <select>
          <option value="">Select Vehicle Type</option>
          <option value="car">Car</option>
          <option value="suv">SUV</option>
          <option value="van">Van</option>
          <option value="bike">Bike</option>
        </select>

        <button>Book Ride</button>
      </div>
    </div>
  );
}

export default Dashboard;
