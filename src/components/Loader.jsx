import React from "react";
import "./Loader.css"; // Import the CSS file for styles
import "./GlobalStyle.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <p className="loader-text">Generating an epic response... 🚀</p>
    </div>
  );
};

export default Loader;
