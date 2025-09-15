import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DriverLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/driver/login", credentials);
      alert(res.data?.message || "Logged In!");
      localStorage.setItem("driverId", res.data.driverId);
      navigate("/driver/trip");
    } catch (err) {
      if (err.response?.status === 404) {
        alert("User doesn't exist!");
      } else if (err.response?.status === 401) {
        alert("Invalid password!");
      } else {
        alert("Login Failed: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Driver Login</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
}

export default DriverLogin;
