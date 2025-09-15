import { useState } from "react";
import axios from "axios";

function DriverTripDetails() {
  const driverId = localStorage.getItem("driverId");
  const [trip, setTrip] = useState({
    carDetails: "",
    carImageUrl: "",
    capacity: "",
    destination: "",
    date: "",
    time: ""
  });

  const handleChange = e => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8080/driver/${driverId}/trip`, {
        ...trip,
        capacity: parseInt(trip.capacity, 10)
      });
      alert(res.data?.message || "Trip details saved!");
    } catch (err) {
      alert("Error saving trip: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Trip Details</h2>
      <input type="text" name="carDetails" placeholder="Car Details" onChange={handleChange} required />
      <input type="text" name="carImageUrl" placeholder="Car Image URL" onChange={handleChange} />
      <input type="number" name="capacity" placeholder="Capacity" onChange={handleChange} required />
      <input type="text" name="destination" placeholder="Destination" onChange={handleChange} required />
      <input type="date" name="date" onChange={handleChange} required />
      <input type="time" name="time" onChange={handleChange} required />
      <button type="submit">Save Trip</button>
    </form>
  );
}

export default DriverTripDetails;
