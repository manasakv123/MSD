import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DriverRegister() {
  const navigate = useNavigate();
  const [driver, setDriver] = useState({
    username: "",
    password: "",
    phone: "",
    email: ""
  });

  const handleChange = e => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/driver/register", driver);
      alert(res.data?.message || "Driver Registered Successfully!");
      navigate("/driver/login");
    } catch (err) {
      if (err.response?.status === 409) {
        alert("Username already exists!");
      } else {
        alert("Error: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Driver Registration</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
}

export default DriverRegister;
