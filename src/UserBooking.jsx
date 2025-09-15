import { useState } from "react";
import "./Dashboard.css";
import MatchedDrivers from "./MatchDriver";

export default function UserBookingForm() {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("userUsername");
  const [form, setForm] = useState({
    pickupPoint: "",
    dropPoint: "",
    date: "",
    time: "",
    passengers: 1,
    vehicleType: ""
  });
  const [matches, setMatches] = useState([]);
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const updateBooking = async (e) => {
    e.preventDefault();
    if (!userId) { setMsg("User not logged in"); return; }
    const res = await fetch(`http://localhost:8080/user/updateBooking/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (!res.ok) { setMsg(data.message || "Error"); return; }
    setMsg(data.message || "Request saved");

    // fetch exact matches
    const url = new URL("http://localhost:9501/driver/match");
    url.searchParams.set("destination", form.dropPoint);
    url.searchParams.set("date", form.date);
    url.searchParams.set("time", form.time);
    const r = await fetch(url);
    const list = await r.json();
    setMatches(list);
  };

  return (
    <div className="content" style={{ maxWidth: 900, margin: "120px auto" }}>
      <h2>Find a Ride</h2>
      <p>Signed in as: <b>{username}</b></p>

      <form onSubmit={updateBooking}>
        <input name="pickupPoint" placeholder="Pickup location" value={form.pickupPoint} onChange={onChange} required />
        <input name="dropPoint" placeholder="Drop / Destination" value={form.dropPoint} onChange={onChange} required />
        <input type="date" name="date" value={form.date} onChange={onChange} required />
        <input type="time" name="time" value={form.time} onChange={onChange} required />
        <input type="number" name="passengers" placeholder="Passengers" min="1" max="10" value={form.passengers} onChange={onChange} required />
        <select name="vehicleType" value={form.vehicleType} onChange={onChange} required>
          <option value="">Select vehicle type</option>
          <option value="car">Car</option>
          <option value="suv">SUV</option>
          <option value="van">Van</option>
          <option value="bike">Bike</option>
        </select>

        <button type="submit">Search Drivers</button>
      </form>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}

      <MatchedDrivers drivers={matches} userId={userId} onBooked={(m) => setMsg(m)} />
    </div>
  );
}
