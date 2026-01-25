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

// Feature card header components with real-estate focus
const FeatureHeader1 = () => (
  <div className="feature-header" style={{ background: 'linear-gradient(135deg, rgba(139, 156, 145, 0.08) 0%, rgba(122, 140, 158, 0.04) 100%)' }}>
    <motion.div 
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: 60,
        height: 60,
        borderRadius: '12px',
        background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-slate) 100%)',
        opacity: 0.15,
      }}
    />
    <span style={{ position: 'absolute', fontSize: '2rem' }}>📍</span>
  </div>
);

const FeatureHeader2 = () => (
  <div className="feature-header" style={{ background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.08) 0%, rgba(139, 156, 145, 0.04) 100%)' }}>
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: 50,
        height: 50,
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent-warm) 0%, transparent 70%)',
        opacity: 0.2,
      }}
    />
    <span style={{ position: 'absolute', fontSize: '2rem' }}>📊</span>
  </div>
);

const FeatureHeader3 = () => (
  <div className="feature-header" style={{ background: 'linear-gradient(135deg, rgba(122, 140, 158, 0.08) 0%, rgba(139, 156, 145, 0.04) 100%)' }}>
    <motion.div
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: 45,
        height: 45,
        borderRadius: '12px',
        border: '2px solid var(--accent-slate)',
        opacity: 0.2,
      }}
    />
    <span style={{ position: 'absolute', fontSize: '2rem' }}>🏡</span>
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
      title: "Location Intelligence",
      description: "Deep analysis of neighborhood trends, accessibility, and regional market dynamics that influence property value. Proximity to services, infrastructure quality, and area desirability create measurable price differences even within the same city.",
      header: <FeatureHeader1 />,
    },
    {
      title: "Market Context", 
      description: "Compare your property against similar listings and recent transactions to understand its competitive position. Our model learns from actual sale and rental prices, not asking prices, giving you a realistic market perspective.",
      header: <FeatureHeader2 />,
    },
    {
      title: "Transparent Methodology",
      description: "Clear explanations of the factors driving your valuation, from property features to local market conditions. You'll see which characteristics have the strongest influence on estimated price, helping you understand value beyond the final number.",
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
          {showPredictionForm ? (
            <NavbarButton
              variant="secondary"
              onClick={() => setShowPredictionForm(false)}
              style={{ marginLeft: 'auto' }}
            >
              ← Back to Home
            </NavbarButton>
          ) : (
            <NavItems items={navItems} />
          )}
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
            {!showPredictionForm ? (
              <>
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
              </>
            ) : (
              <NavbarButton
                variant="secondary"
                onClick={() => {
                  setShowPredictionForm(false);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full"
              >
                ← Back to Home
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
              <motion.span 
                className="hero-badge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                Tunisia Property Insights
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                Understand the True Value of Your Property
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Make confident real estate decisions with data-driven insights. 
                CasaQuant analyzes location, market trends, and property characteristics 
                to provide reliable valuations you can trust.
              </motion.p>
              <motion.div
                className="hero-stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
              >
                <div className="hero-stat">
                  <span className="stat-value">88%</span>
                  <span className="stat-label">Accuracy</span>
                  <span className="stat-description">Mean Absolute Percentage Error on test data</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-value">24</span>
                  <span className="stat-label">Regions</span>
                  <span className="stat-description">All governorates covered</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-value">5,000+</span>
                  <span className="stat-label">Properties Analyzed</span>
                  <span className="stat-description">Training dataset size</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <NoiseButton 
                  onClick={() => setShowPredictionForm(true)}
                  gradientColors={["#3ecfcf", "#34d399", "#5ee0e0"]}
                >
                  Get Your Valuation →
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
              Data-Driven Real Estate Intelligence
            </motion.h2>
            <motion.p 
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Unlike simple price-per-meter calculators, CasaQuant analyzes the relationship between location, property characteristics, and market conditions. Our model identifies patterns in thousands of real transactions to estimate value based on multiple factors, not averages alone.
            </motion.p>
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
              Your Valuation Journey
            </motion.h2>
            <motion.p 
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              A guided experience that helps you understand your property's value through data and context
            </motion.p>
            <div className="steps">
              {[
                { num: "1", title: "Describe Your Property", desc: "Share key details about location, size, and characteristics that shape value." },
                { num: "2", title: "Market Context Analysis", desc: "We analyze comparable properties and regional trends to establish context." },
                { num: "3", title: "Comprehensive Valuation", desc: "Receive a detailed estimate with price range, confidence level, and key drivers." },
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
                    whileHover={{ scale: 1.05 }}
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
              Tunisia Real Estate Market Overview
            </motion.h2>
            <motion.p 
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Understanding regional price variations helps you assess whether a property is competitively priced. Tunisia's real estate market shows significant geographic diversity, with coastal areas commanding premium prices and inland regions offering more accessible entry points.
            </motion.p>
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
                  <img src={avgPriceChart} alt="Regional Price Comparison" />
                </div>
                <div className="analysis-content">
                  <span className="analysis-badge">Market Snapshot</span>
                  <h3>Regional Price Dynamics</h3>
                  <p>Property values vary significantly across Tunisia's governorates. Coastal areas and major urban centers command premium prices due to higher demand, better infrastructure, and economic activity. Inland regions offer more affordable entry points while secondary cities show emerging growth potential.</p>
                  <div className="analysis-interpretation">
                    <h4>What this shows:</h4>
                    <ul>
                      <li>Tunis, Ariana, and coastal governorates consistently show higher average prices</li>
                      <li>Price differences reflect accessibility, services, and employment opportunities</li>
                      <li>Regional variations can exceed 200% for comparable properties</li>
                    </ul>
                  </div>
                  <div className="analysis-insights">
                    <div className="insight">
                      <span className="insight-label">Highest avg price</span>
                      <span className="insight-value">Northern regions</span>
                    </div>
                    <div className="insight">
                      <span className="insight-label">Growing markets</span>
                      <span className="insight-value">Secondary cities</span>
                    </div>
                  </div>
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
                  <img src={priceperm} alt="Price Per Square Meter Analysis" />
                </div>
                <div className="analysis-content">
                  <span className="analysis-badge">Investment Insight</span>
                  <h3>Price Per Square Meter Trends</h3>
                  <p>Standardized pricing metrics reveal true value across different property types and locations. Price per square meter removes size bias, allowing direct comparison between properties. Use this benchmark to identify whether a property is competitively priced relative to its market segment.</p>
                  <div className="analysis-interpretation">
                    <h4>How to use this:</h4>
                    <ul>
                      <li>Compare properties of different sizes within the same area</li>
                      <li>Identify value outliers that may represent opportunities or overpricing</li>
                      <li>Consider that premium locations can justify 50-100% higher rates per m²</li>
                    </ul>
                  </div>
                  <div className="analysis-insights">
                    <div className="insight">
                      <span className="insight-label">Avg price/m²</span>
                      <span className="insight-value">Varies by region</span>
                    </div>
                    <div className="insight">
                      <span className="insight-label">Key factor</span>
                      <span className="insight-value">Location premium</span>
                    </div>
                  </div>
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
              Ready to Value Your Property?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Get a comprehensive valuation based on location, features, and market insights.
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
                Start Your Valuation →
              </NoiseButton>
            </motion.div>
          </section>
        </>
      ) : (
        <PredictionForm onBackToHome={() => setShowPredictionForm(false)} />
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
