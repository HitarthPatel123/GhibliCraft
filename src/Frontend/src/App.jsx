import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import './style.css'


function Home() {
  const navigate = useNavigate();

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar blue-navbar">
        <div className="navbar-left">
          <div onClick={reloadPage} className="logo-circle-dark">G</div>
          <span
            className="logo-text"
            onClick={reloadPage}
            style={{ cursor: "pointer" }}
          >
            GhibliCraft
          </span>
        </div>
        <ul className="navbar-menu">
          <li>
            <a href="#home" className="nav-link active">
              Home
            </a>
          </li>
          <li>
            <Link to="/create" className="nav-link">
              Create
            </Link>
          </li>
          <li>
            <a href="#features" className="nav-link">
              Features
            </a>
          </li>
          <li>
            <a href="#gallery" className="nav-link">
              Gallery
            </a>
          </li>
          <li>
            <a href="#faq" className="nav-link">
              FAQ
            </a>
          </li>
        </ul>

        <button
          className="btn-create dark-button"
          onClick={() => navigate("/create")}
        >
          Create
        </button>
      </nav>

      
    </>
  );
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;