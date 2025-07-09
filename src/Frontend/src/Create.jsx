import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./create.css";


const Create = () => {
  const [activeTab, setActiveTab] = useState("photo");

  // States for Photo to Art Feature
  const [photo, setPhoto] = useState(null);
  const [transformedImage, setTransformedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // States for Text to Art Feature
  const [textPrompt, setTextPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Analog Film");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isTextLoading, setIsTextLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);

    setPhoto(null);
    setSelectedFile(null);
    setAdditionalDetails("");
    setTransformedImage(null);
    setIsLoading(false);

    setTextPrompt("");
    setSelectedStyle("Analog Film");
    setGeneratedImage(null);
    setIsTextLoading(false);
  };

  // Basic Transformations
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

  // Connecting With Backend for Photo to Art 
  const handleTransform = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setTransformedImage(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("prompt", additionalDetails || "");

      const API_URL = "http://localhost:8080/api/v1/generate";

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Network response was not ok. Status: ${response.status}. Message: ${errorText}`
        );
      }

      const resultBlob = await response.blob();
      const resultURL = URL.createObjectURL(resultBlob);
      setTransformedImage(resultURL);

      alert("Transformation completed!");
    } catch (error) {
      console.error("Error generating image:", error);
      alert(
        "Failed to transform image. Please try again. Please Ensure you enter .png file and size should be less than 8KB."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Connecting With Backend for Text to Art
  const handleTextGenerate = async () => {
    if (!textPrompt.trim()) {
      alert("Please enter a text description to generate art.");
      return;
    }

    setIsTextLoading(true);
    setGeneratedImage(null);

    const payload={textPrompt,selectedStyle}

    try {
      const API_URL = "http://localhost:8080/api/v1/generate-from-text";
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Network response was not ok. Status: ${response.status}. Message: ${errorText}`
        );
      }

      const resultBlob = await response.blob();
      const resultURL = URL.createObjectURL(resultBlob);
      setGeneratedImage(resultURL);

      alert("Image generated successfully!");
    } catch (error) {
      console.error("Error generating image from text:", error);
      alert("Failed to generate image from text. Please try again.");
    } finally {
      setIsTextLoading(false);
    }
  };

  return (
    <div>
      {/* Navbar */}
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

      {/* Tabs */}
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
      
      <div className="create-content">
        {/* Photo to Art Tab */}
        {activeTab === "photo" && (
          <>
            <section
              id="tabpanel-photo"
              role="tabpanel"
              aria-labelledby="tab-photo"
              className="left-panel"
            >
              <h3>Photo to Ghibli Art</h3>

              <label
                htmlFor="file-upload"
                className="upload-box"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    document.getElementById("file-upload").click();
                  }
                }}
              >
                {photo ? (
                  <img
                    src={photo}
                    alt="Uploaded preview"
                    className="uploaded-preview"
                    aria-live="polite"
                  />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="upload-icon"
                      width="48"
                      height="48"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12v8m0 0l-3-3m3 3l3-3m-6-9h6a2 2 0 0 1 2 2v1H6v-1a2 2 0 0 1 2-2z"
                      />
                    </svg>
                    <p className="upload-text">
                      Drag and drop a photo, or click to browse
                    </p>
                    <button
                      type="button"
                      className="btn-browse"
                      onClick={() => document.getElementById("file-upload").click()}
                    >
                      Browse
                    </button>
                  </>
                )}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  aria-label="Upload image file"
                />
              </label>

              <label htmlFor="details-textarea" className="details-label">
                Additional Details (optional)
              </label>
              <textarea
                id="details-textarea"
                placeholder="Provide any extra details or prompts here..."
                className="details-textarea"
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                rows={4}
              ></textarea>

              <button
                className="btn-transform"
                onClick={handleTransform}
                disabled={!photo || isLoading}
                aria-disabled={!photo || isLoading}
                aria-live="polite"
              >
                {isLoading ? "Transforming..." : "Transform to Ghibli Art"}
              </button>
            </section>

            <section className="right-panel" aria-live="polite" aria-atomic="true">
              {isLoading ? (
                <div className="art-preview-box">Processing your image, please wait...</div>
              ) : transformedImage ? (
                <>
                  <img
                    src={transformedImage}
                    alt="Ghibli style transformed art"
                    className="generated-art"
                  />
                  <a
                    href={transformedImage}
                    download="ghibli-art.png"
                    className="btn-download"
                    style={{
                      display: "inline-block",
                      marginTop: "1rem",
                      textDecoration: "none",
                      padding: "8px 16px",
                      backgroundColor: "#4caf50",
                      color: "white",
                      borderRadius: "4px",
                      fontWeight: "bold",
                    }}
                    aria-label="Download transformed image"
                  >
                    Download Image
                  </a>
                </>
              ) : (
                <div className="art-preview-box">
                  Upload a photo and click "Transform to Ghibli Art" to see your transformed art here.
                </div>
              )}
            </section>
          </>
        )}

        {/* Text to Art Tab */}
        {activeTab === "text" && (
          <section
            id="tabpanel-text"
            role="tabpanel"
            aria-labelledby="tab-text"
            style={{
              width: "800px",
              margin: "0 auto",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <h3 style={{ alignSelf: "flex-start" }}>Text to Ghibli Art</h3>

            <textarea
              value={textPrompt}
              onChange={(e) => setTextPrompt(e.target.value)}
              placeholder="Generate Ghibli art from your text description"
              aria-label="Text description to generate Ghibli art"
              rows={8}
              style={{
                width: "100%",
                padding: "1rem",
                fontSize: "1rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                resize: "vertical",
                boxSizing: "border-box",
                backgroundColor: "#f0f0f0",
                color: "#333",
              }}
            />

            <label
              htmlFor="style-select"
              style={{ alignSelf: "flex-start", fontWeight: "bold" }}
            >
              Ghibli Style
            </label>
            <select
              id="style-select"
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            >

              <option value="Analog Film">Analog Film</option>
              <option value="Anime">Anime</option>
              <option value="Cinematic">Cinematic</option>
              <option value="Comic Book">Comic Book</option>
              <option value="Digital Art">Digital Art</option>
            </select>

            <button
              type="button"
              onClick={handleTextGenerate}
              disabled={!textPrompt.trim() || isTextLoading}
              aria-disabled={!textPrompt.trim() || isTextLoading}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#103554",
                color: "white",
                fontSize: "1rem",
                borderRadius: "6px",
                border: "none",
                cursor:
                  !textPrompt.trim() || isTextLoading ? "not-allowed" : "pointer",
              }}
              aria-live="polite"
            >
              {isTextLoading ? "Generating..." : "Generate"}
            </button>

            {generatedImage && (
              <>
                <img
                  src={generatedImage}
                  alt="Generated Ghibli style art"
                  style={{
                    marginTop: "1rem",
                    maxWidth: "100%",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                />
                <a
                  href={generatedImage} 
                  download="generated-ghibli-art.png"
                  style={{
                    marginTop: "0.5rem",
                    textDecoration: "none",
                    padding: "8px 16px",
                    backgroundColor: "#4caf50",
                    color: "white",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    display: "inline-block",
                  }}
                  aria-label="Download generated image"
                >
                  Download Image
                </a>
              </>
            )}
          </section>
        )}
      </div>
      
      {/* Footer */}
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
