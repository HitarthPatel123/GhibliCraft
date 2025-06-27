import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import './style.css'

const features = [
  {
    icon: "🎨",
    title: "Studio Ghibli Artistic Style",
    description:
      "Transform your photos with the unique artistic style of Studio Ghibli.",
  },
  {
    icon: "🤖",
    title: "AI powered",
    description: "State-of-the-art AI model trained on Ghibli images.",
  },
  {
    icon: "⚡",
    title: "Fast Results",
    description: "Get your transformed images fast in just seconds.",
  },
  {
    icon: "🔐",
    title: "Privacy-first",
    description:
      "All your photos are private and securely processed on the client.",
  },
];

const galleryImages = [
  {
    id: 1,
    src: "https://media.assettype.com/outlookbusiness/2025-03-30/0z250yc9/k43GMz63400x400.jpg?w=400&auto=format%2Ccompress&fit=max&format=webp&dpr=1.0",
    alt: "Gallery image",
  },
  {
    id: 2,
    src: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202503/ghibli-311110129-3x4.jpeg?VersionId=AjvFRkruNGH5Xsoe31k5Sw123NZGCtNZ",
    alt: "Gallery image",
  },
  {
    id: 3,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcaJuue18b4Ax9AYrCUQx8PvMZAU3_8K7nkA&s",
    alt: "Gallery image",
  },
  {
    id: 4,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv-_Vz1NY5mQAK468vySpDOzTYLRMF2UcFig&s",
    alt: "Gallery image",
  },
  {
    id: 5,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw9jPY5-scbGAlDmLn2tLPkh_pnsCEKlhyMw&s",
    alt: "Gallery image",
  },
  {
    id: 6,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUkTwHOv_TrlsPYxxJp27XDdCa8j-F6TAsQ&s",
    alt: "Gallery image",
  },
];

const faqs = [
  {
    question: "How does Ghibli AI work?",
    answer:
      "Ghibli AI uses advanced deep learning to transform your photos into images in the Studio Ghibli artistic style.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes, all photo transformations are processed securely to respect your privacy.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "At present only PNG Format is supported. However with few tweaks other format like JPG, JPEG and WEBP could also be supported.",
  },
  {
    question: "Can I use the images for commercial purposes?",
    answer:
      "Images generated may be for personal use only. Please respect Studio Ghibli's copyright and licensing.",
  },
];

function Home() {
  const navigate = useNavigate();

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar blue-navbar">
        <div className="navbar-left">
          <div onClick={reloadPage} className="logo-circle-dark" style={{ cursor: "pointer" }}>G</div>
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

      <section className="hero-section blue-background" id="home">
        <h1 className="headline dark-headline">
          Transform Your Photos into <br />
          Ghibli Art with GhibliCraft
        </h1>
        <p className="subheading dark-subheading">
          Experience the magic of Studio Ghibli's artistic style with our
          AI-powered Ghibli image generator tool.
        </p>
        <button className="btn-try dark-button" onClick={() => navigate("/create")}>Try Ghibli AI</button>
      </section>

      <section className="features-section blue-background" id="features">
        <h2 className="features-heading dark-headline">Ghibli AI Features</h2>
        <div className="features-grid">
          {features.map(({ icon, title, description }, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">{icon}</div>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-description">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gallery-section blue-background" id="gallery">
        <h2 className="features-heading dark-headline">
          Magical Ghibli AI Transformations Gallery
        </h2>
        <div className="gallery-grid">
          {galleryImages.map(({ id, src, alt }) => (
            <div key={id} className="gallery-image-wrapper">
              <img src={src} alt={alt} className="gallery-image" />
            </div>
          ))}
        </div>
      </section>

      <section
        className="faq-section"
        style={{ padding: "2rem", backgroundColor: "#e6f0f7" }}
        id="faq"
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: "1.8rem",
            marginBottom: "2rem",
          }}
        >
          Frequently Asked Questions about Ghibli AI
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {faqs.map(({ question, answer }, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "rgba(0, 50, 100, 0.1) 0px 7px 29px 0px",
                padding: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontWeight: "700",
                  marginBottom: "0.75rem",
                  color: "#103554",
                }}
              >
                {question}
              </h3>
              <p style={{ color: "#4a6e8a", lineHeight: "1.5rem" }}>{answer}</p>
            </div>
          ))}
        </div>
      </section>

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
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><Link to="/create">Create</Link></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#faq">FAQ</a></li>
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