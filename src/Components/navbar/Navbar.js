import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <div className="d-flex justify-content-around navbar">
      <Link to="/" className="disabled">
        Home
      </Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}

export default Navbar;
