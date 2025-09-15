import React, { useState } from "react";
import axios from "axios";
import './UserLogin.css';
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate(); // ✅ Create navigate function

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/user/login", credentials); // Change port if needed
      alert(res.data?.message || "User Logged In!");

      // ✅ Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      const status = err.response?.status;
      if (status === 404) {
        alert("User doesn't exist!");
      } else if (status === 401) {
        alert("Invalid password!");
      } else {
        alert("Login Failed: " + (err.response?.data || err.message));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Login</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
}

export default UserLogin;
