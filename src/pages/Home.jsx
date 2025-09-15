import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Make sure your CSS file is correctly linked

function Home() {
  const navigate = useNavigate();

  const go = (action) => {
    // This function navigates to a new route based on the action (register or login)
    navigate(`/role?action=${action}`);
  };

  return (
    <div className="homepage-container">
      {/* The background slider container. It holds multiple "slide" elements.
        The animation for continuous scrolling is applied via CSS.
      */}
      <div className="background-slider">
        {/* First set of unique images */}
        <div className="slide bike"></div>
        <div className="slide car"></div>
        <div className="slide van"></div>
        <div className="slide main"></div> {/* Assuming 'main' refers to the bike image */}
        
        {/* Duplicate the entire set of images. This is crucial for creating
          a seamless, continuous scrolling effect. When the first set
          moves out of view, the second set takes its place without a visible jump.
        */}
        <div className="slide bike"></div>
        <div className="slide car"></div>
        <div className="slide van"></div>
        <div className="slide main"></div>
      </div>

      {/* New overlay div to dull the background images */}
      <div className="background-overlay"></div>
      
      {/* The central card element, positioned above the scrolling background and overlay.
        It contains the title and action buttons.
      */}
      <div className="card">
        <h1 className="title">🚗 Gadi Dundo</h1>
        <div className="button-group">
          {/* Button to navigate to the registration page */}
          <button className="btn register" onClick={() => go("register")}>
            Register
          </button>
          {/* Button to navigate to the login page */}
          <button className="btn login" onClick={() => go("login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
