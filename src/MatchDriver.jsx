import React from "react";

export default function MatchDriver({ drivers = [], userId, onBooked }) {

  const bookDriver = async (driverId) => {
    if (!userId) { onBooked("User not logged in"); return; }
    const res = await fetch(`http://localhost:9501/user/bookDriver/${userId}/${driverId}`, {
      method: "PUT"
    });
    const data = await res.json();
    if (res.ok) onBooked(data.message || "Booked");
    else onBooked(data.message || "Booking failed");
  };

  if (!drivers || drivers.length === 0) return <div style={{ marginTop: 20 }}>No drivers found for selected criteria.</div>;

  return (
    <div style={{ marginTop: 20 }}>
      {drivers.map(d => (
        <div key={d.id} style={{ display: "grid", gridTemplateColumns: "160px 1fr auto", gap: 12, alignItems: "center", padding: 12, border: "1px solid #eee", borderRadius: 8, marginBottom: 12 }}>
          {d.carImageUrl ? <img src={`http://localhost:8080${d.carImageUrl}`} alt="car" style={{ width: 160, height: 100, objectFit: "cover", borderRadius: 8 }} /> : <div style={{ width: 160, height: 100, background: "#f3f3f3", borderRadius: 8 }} />}
          <div style={{ textAlign: "left" }}>
            <div><b>{d.username}</b> • {d.phone}</div>
            <div>{d.carDetails}</div>
            <div>Destination: <b>{d.destination}</b></div>
            <div>Date: {d.date} • Time: {d.time} • Seats: {d.capacity}</div>
          </div>
          <div>
            <button onClick={() => bookDriver(d.id)}>Book</button>
          </div>
        </div>
      ))}
    </div>
  );
}
