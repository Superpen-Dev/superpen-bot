import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GlobalStyle.css";

const Loader = () => {
  return (
    <div className="text-center p-3">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Generating an epic response... 🚀</p>
    </div>
  );
};

export default Loader;
