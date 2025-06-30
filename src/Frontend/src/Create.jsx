import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./create.css";


const Create = () => {
  const [activeTab, setActiveTab] = useState("photo");

  const [photo, setPhoto] = useState(null);
  const [transformedImage, setTransformedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);

    setPhoto(null);
    setSelectedFile(null);
    setAdditionalDetails("");
    setTransformedImage(null);
    setIsLoading(false);

  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 8) {
      alert("Please upload an image smaller than 8MB.");
      return;
    }

    setSelectedFile(file);
    const imageURL = URL.createObjectURL(file);
    setPhoto(imageURL);
    setTransformedImage(null);
  };

  const handleKeyDown = (event, tabName) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleTabClick(tabName);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <nav className="navbar">
        <div
          className="navbar-left"
          onClick={() => navigate("/")}
          tabIndex={0}
          role="link"
          aria-label="Navigate to Home"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") navigate("/");
          }}
        >
          <div className="logo-circle-dark" aria-hidden="true">
            G
          </div>
          <span className="logo-text">GhibliCraft</span>
        </div>

        <ul className="navbar-menu">
          <li>
            <Link
              to="/"
              className={isActive("/") ? "nav-link active" : "nav-link"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/create"
              className={isActive("/create") ? "nav-link active" : "nav-link"}
            >
              Create
            </Link>
          </li>
          <li>
            <a href="/#features" className="nav-link">
              Features
            </a>
          </li>
          <li>
            <a href="/#gallery" className="nav-link">
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
          className="btn-create"
          onClick={() => navigate("/create")}
          aria-label="Navigate to Create page"
        >
          Create
        </button>
      </nav>

      <div className="tabs-container" role="tablist" aria-label="Create Options">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "photo"}
          tabIndex={activeTab === "photo" ? 0 : -1}
          className={`tab-btn ${activeTab === "photo" ? "active-tab" : ""}`}
          onClick={() => handleTabClick("photo")}
          onKeyDown={(e) => handleKeyDown(e, "photo")}
          id="tab-photo"
          aria-controls="tabpanel-photo"
        >
          Photo to Art
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "text"}
          tabIndex={activeTab === "text" ? 0 : -1}
          className={`tab-btn ${activeTab === "text" ? "active-tab" : ""}`}
          onClick={() => handleTabClick("text")}
          onKeyDown={(e) => handleKeyDown(e, "text")}
          id="tab-text"
          aria-controls="tabpanel-text"
        >
          Text to Art
        </button>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h2>
              <span className="footer-logo">G</span> Ghibli AI
            </h2>
            <p>
              Inspired by the magical words of Studio Ghibli. This is a fan
              project and not affiliated with Studio Ghibli Inc.
            </p>
          </div>
          <div className="footer-column">
            <h3>Links</h3>
            <ul>
              <li>Home</li>
              <li>Create</li>
              <li>Features</li>
              <li>Gallery</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Features</h3>
            <ul>
              <li>Photo to Ghibli Art</li>
              <li>Text to Ghibli Art</li>
              <li>Character Generator</li>
              <li>Background Generator</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Legal</h3>
            <ul>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Create
