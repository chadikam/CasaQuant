import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faBehance, faInstagram } from '@fortawesome/free-brands-svg-icons';
import avgPriceChart from './assets/exp.png';
import priceperm from './assets/download.png';
import PredictionForm from './components/PredictionForm';



function App() {
  const [showPredictionForm, setShowPredictionForm] = useState(false);
  const scrollToSection = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const element = document.getElementById(targetId);
    element.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScroll = () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(26, 26, 26, 0.8)';
    } else {
      navbar.style.background = 'transparent';
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo" onClick={() => setShowPredictionForm(false)} style={{ cursor: 'pointer' }}>CasaQuant</div>
        <div className="nav-links">
          {!showPredictionForm && (
            <>
              <a href="#features" onClick={scrollToSection}>Features</a>
              <a href="#how-it-works" onClick={scrollToSection}>How it Works</a>
              <a href="#analysis" onClick={scrollToSection}>Market Analysis</a>
            </>
          )}
        </div>
      </nav>

      {!showPredictionForm ? (
        <>
          <section className="hero">
            <div className="hero-content">
              <h1>Know What Your Home is Worth — Instantly</h1>
              <p>Using advanced AI models to help you make informed decisions about buying or renting properties with 88% accuracy.</p>
              <button className="cta-button" onClick={() => setShowPredictionForm(true)}>Get Started</button>
            </div>
          </section>

          <section className="features" id="features">
            <h2>Why Choose Our Platform</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <h3>88% Accuracy</h3>
                <p>Our AI model has been trained on millions of data points to ensure highly accurate predictions</p>
              </div>
              <div className="feature-card">
                <h3>Real-Time Updates</h3>
                <p>Get instant price predictions based on current market conditions</p>
              </div>
              <div className="feature-card">
                <h3>Comprehensive Analysis</h3>
                <p>Consider multiple factors including location, amenities, and market trends</p>
              </div>
            </div>
          </section>

          <section className="how-it-works" id="how-it-works">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Enter Property Details</h3>
                <p>Provide basic information about the property you're interested in</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>AI Analysis</h3>
                <p>Our model analyzes the data using advanced machine learning algorithms</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Get Your Prediction</h3>
                <p>Receive a detailed price prediction with confidence intervals</p>
              </div>
            </div>
          </section>

          <section className="analysis" id="analysis">
            <h2>Market Analysis</h2>
            <div className="analysis-grid">
              <div className="analysis-item">
                <div className="analysis-image">
                  <img src={avgPriceChart} alt="Average Price per m² Chart" className="chart-image" />
                </div>
                <div className="analysis-content">
                  <h3>Premium Real Estate Markets</h3>
                  <p>Discover the most prestigious real estate markets across the country. Our data reveals the cities where property values have reached exceptional heights, reflecting their strong economies, high quality of life, and sustained market demand.</p>
                </div>
              </div>
              <div className="analysis-item">
                <div className="analysis-image">
                  <img src={priceperm} alt="Average Price per m² Chart" className="chart-image" />
                </div>
                <div className="analysis-content">
                  <h3>Price per Square Meter Analysis</h3>
                  <p>Compare property values across different cities based on price per square meter. This metric provides a standardized way to evaluate real estate prices, helping you make informed decisions about property investments in different locations.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="cta">
            <h2>Ready to Get Started?</h2>
            <p>Try our AI-powered house price predictor today</p>
            <button className="cta-button" onClick={() => setShowPredictionForm(true)}>Predict Now</button>
          </section>
        </>
      ) : (
          <PredictionForm />
  
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/chadi-kammoun/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faLinkedin} size="1x" />
              <div>LinkedIn</div>
            </a>
            <a href="https://github.com/chadikam" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faGithub} size="1x" />
              <div>GitHub</div>
            </a>
            <a href="https://www.behance.net/chadi-kammoun" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faBehance} size="1x" />
              <div>Behance</div>
            </a>
            <a href="https://www.instagram.com/chadikammoun/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faInstagram} size="1x" />
              <div>Instagram</div>
            </a>
          </div>

          <div className="footer-contact">
            <a href="mailto:kammounchadi@gmail.com" className="email-link">kammounchadi@gmail.com</a>
          </div>

          <div className="footer-copyright">
            <p>© 2025 Chadi Kammoun. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
