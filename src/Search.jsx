import { useState } from "react";

export default function SearchTrips({ userUsername }) {
  const [q, setQ] = useState({ destination: "", travelDate: "", travelTime: "" });
  const [trips, setTrips] = useState([]);
  const [msg, setMsg] = useState("");

  const onChange = (e) => setQ({ ...q, [e.target.name]: e.target.value });

  const search = async (e) => {
    e.preventDefault();
    const url = new URL("http://localhost:8080/driver/trips/search");
    url.searchParams.set("destination", q.destination);
    url.searchParams.set("travelDate", q.travelDate);
    url.searchParams.set("travelTime", q.travelTime);

    const res = await fetch(url);
    const data = await res.json();
    setTrips(data);
  };

  const book = async (tripId) => {
    const res = await fetch("http://localhost:9501/bookings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userUsername, tripId }),
    });
    const data = await res.json();
    setMsg(data.message || "Booked!");
  };

  return (
    <div className="content" style={{ maxWidth: 900, margin: "120px auto" }}>
      <h2>Find a Ride</h2>
      <form onSubmit={search}>
        <input name="destination" placeholder="Enter Destination" value={q.destination} onChange={onChange} required />
        <input type="date" name="travelDate" value={q.travelDate} onChange={onChange} required />
        <input type="time" name="travelTime" value={q.travelTime} onChange={onChange} required />
        <button type="submit">Search</button>
      </form>

      <div style={{ marginTop: 20 }}>
        {trips.map(t => (
          <div key={t.id} style={{ display: "grid", gridTemplateColumns: "160px 1fr auto", gap: 16, alignItems: "center", padding: 12, border: "1px solid #eee", borderRadius: 12, marginBottom: 12 }}>
            {t.carImagePath ? (
              <img src={`http://localhost:9501${t.carImagePath}`} alt="car" style={{ width: 160, height: 100, objectFit: "cover", borderRadius: 8 }} />
            ) : (
              <div style={{ width: 160, height: 100, background: "#f3f3f3", borderRadius: 8 }} />
            )}
            <div style={{ textAlign: "left" }}>
              <div><b>{t.driverName}</b> • {t.phone}</div>
              <div>{t.carDetails}</div>
              <div>Destination: <b>{t.destination}</b></div>
              <div>Date: {t.travelDate} • Time: {t.travelTime} • Seats: {t.capacity}</div>
            </div>
            <button onClick={() => book(t.id)}>Book</button>
          </div>
        ))}
      </div>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </div>
  );
}
