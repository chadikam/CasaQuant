import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faBehance, faInstagram } from '@fortawesome/free-brands-svg-icons';
import avgPriceChart from './assets/exp.png';
import priceperm from './assets/download.png';
import PredictionForm from './components/PredictionForm';
import { BackgroundRippleEffect } from './components/ui/BackgroundRippleEffect';
import { NoiseButton } from './components/ui/NoiseButton';
import { BentoGrid, BentoGridItem } from './components/ui/BentoGrid';
import { GlowingOrb, FloatingParticles } from './components/ui/GlowingOrb';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from './components/ui/ResizableNavbar';

// Feature card header components with animated gradients
const FeatureHeader1 = () => (
  <div className="feature-header" style={{ background: 'linear-gradient(135deg, rgba(62, 207, 207, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%)' }}>
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{
        width: 60,
        height: 60,
        borderRadius: '16px',
        background: 'linear-gradient(135deg, var(--accent) 0%, var(--success) 100%)',
        opacity: 0.2,
      }}
    />
    <span style={{ position: 'absolute', fontSize: '2rem' }}>📊</span>
  </div>
);

const FeatureHeader2 = () => (
  <div className="feature-header" style={{ background: 'linear-gradient(135deg, rgba(94, 224, 224, 0.1) 0%, rgba(62, 207, 207, 0.05) 100%)' }}>
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: 50,
        height: 50,
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
        opacity: 0.3,
      }}
    />
    <span style={{ position: 'absolute', fontSize: '2rem' }}>⚡</span>
  </div>
);

const FeatureHeader3 = () => (
  <div className="feature-header" style={{ background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.1) 0%, rgba(62, 207, 207, 0.05) 100%)' }}>
    <motion.div
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: 45,
        height: 45,
        borderRadius: '12px',
        border: '2px solid var(--accent)',
        opacity: 0.3,
      }}
    />
    <span style={{ position: 'absolute', fontSize: '2rem' }}>🎯</span>
  </div>
);

function App() {
  const [showPredictionForm, setShowPredictionForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const scrollToSection = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const element = document.getElementById(targetId);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      title: "88% Accuracy",
      description: "Our model is trained on extensive market data to deliver reliable predictions you can trust.",
      header: <FeatureHeader1 />,
    },
    {
      title: "Real-Time Analysis", 
      description: "Get instant valuations based on current market conditions and comparable properties.",
      header: <FeatureHeader2 />,
    },
    {
      title: "Multi-Factor Model",
      description: "We analyze location, size, amenities, and market trends for comprehensive estimates.",
      header: <FeatureHeader3 />,
    },
  ];

  const navItems = !showPredictionForm ? [
    { name: "Features", link: "#features", onClick: scrollToSection },
    { name: "Process", link: "#how-it-works", onClick: scrollToSection },
    { name: "Insights", link: "#analysis", onClick: scrollToSection },
  ] : [];

  return (
    <div className="App">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo onClick={() => setShowPredictionForm(false)} />
          <NavItems items={navItems} />
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo onClick={() => setShowPredictionForm(false)} />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu 
            isOpen={isMobileMenuOpen} 
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => {
                  item.onClick(e);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.name}
              </a>
            ))}
            {!showPredictionForm && (
              <NavbarButton
                variant="primary"
                onClick={() => {
                  setShowPredictionForm(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full"
              >
                Get Estimate
              </NavbarButton>
            )}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {!showPredictionForm ? (
        <>
          <section className="hero">
            {/* Interactive background */}
            <BackgroundRippleEffect gridSize={24} />
            <FloatingParticles count={15} />
            <GlowingOrb 
              size={500} 
              color="rgba(62, 207, 207, 0.12)" 
              blur={100}
              className="hero-orb-1"
              style={{ top: '10%', left: '60%' }}
            />
            <GlowingOrb 
              size={300} 
              color="rgba(52, 211, 153, 0.08)" 
              blur={80}
              className="hero-orb-2"
              style={{ bottom: '20%', left: '20%' }}
            />
            
            <motion.div 
              className="hero-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Know What Your Property is Worth
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                AI-powered real estate valuation for Tunisia. 
                Get accurate price predictions based on market data and property features.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <NoiseButton 
                  onClick={() => setShowPredictionForm(true)}
                  gradientColors={["#3ecfcf", "#34d399", "#5ee0e0"]}
                >
                  Get Estimate →
                </NoiseButton>
              </motion.div>
            </motion.div>
          </section>

          <section className="features" id="features">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Why CasaQuant
            </motion.h2>
            <BentoGrid>
              {features.map((feature, i) => (
                <BentoGridItem
                  key={i}
                  title={feature.title}
                  description={feature.description}
                  header={feature.header}
                  icon={feature.icon}
                />
              ))}
            </BentoGrid>
          </section>

          <section className="how-it-works" id="how-it-works">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              How It Works
            </motion.h2>
            <div className="steps">
              {[
                { num: "1", title: "Enter Details", desc: "Provide basic information about the property you're evaluating." },
                { num: "2", title: "AI Analysis", desc: "Our model processes your data against market patterns." },
                { num: "3", title: "Get Results", desc: "Receive your price estimate in seconds." },
              ].map((step, i) => (
                <motion.div 
                  className="step" 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="step-number"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {step.num}
                  </motion.div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="analysis" id="analysis">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Market Insights
            </motion.h2>
            <div className="analysis-grid">
              <motion.div 
                className="analysis-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="analysis-image">
                  <img src={avgPriceChart} alt="Average Price Analysis" />
                </div>
                <div className="analysis-content">
                  <h3>Regional Price Analysis</h3>
                  <p>Explore property values across Tunisia's major markets. Our data reveals pricing patterns and investment opportunities.</p>
                </div>
              </motion.div>
              <motion.div 
                className="analysis-item"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="analysis-image">
                  <img src={priceperm} alt="Price per Square Meter" />
                </div>
                <div className="analysis-content">
                  <h3>Price per Square Meter</h3>
                  <p>Compare standardized property values across cities to make informed investment decisions.</p>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="cta">
            <FloatingParticles count={10} />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Get your property valuation in under a minute.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <NoiseButton 
                onClick={() => setShowPredictionForm(true)}
                gradientColors={["#34d399", "#3ecfcf", "#5ee0e0"]}
              >
                Start Estimate →
              </NoiseButton>
            </motion.div>
          </section>
        </>
      ) : (
        <PredictionForm />
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/chadi-kammoun/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faLinkedin} />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/chadikam" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faGithub} />
              <span>GitHub</span>
            </a>
            <a href="https://www.behance.net/chadi-kammoun" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faBehance} />
              <span>Behance</span>
            </a>
            <a href="https://www.instagram.com/chadikammoun/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faInstagram} />
              <span>Instagram</span>
            </a>
          </div>
          <a href="mailto:kammounchadi@gmail.com" className="email-link">
            kammounchadi@gmail.com
          </a>
          <div className="footer-copyright">
            © 2025 Chadi Kammoun
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
