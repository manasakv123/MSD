import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserRegister() {
  
  const [user, setUser] = useState({
    username: "",
    password: "",
    phone: "",
    email: ""
  });
const navigate = useNavigate();
  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/user/register", user);
      alert(res.data?.message || "User Registered Successfully!");
       navigate("/dashboard"); 
    } catch (err) {
      const status = err.response?.status;
      if (status === 409) {
        alert("Username already exists!");
      } else {
        alert("Error: " + (err.response?.data || err.message));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Registration</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
}

export default UserRegister;