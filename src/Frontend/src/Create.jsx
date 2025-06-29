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
    </div>
  )
}

export default Create
