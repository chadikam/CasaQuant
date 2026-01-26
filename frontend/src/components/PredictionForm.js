import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PredictionForm.css';
import './PredictionFormAdditions.css';
import tunisiaRegions from '../assets/tunisia_regions_data.js';
import { predictHousePrice, initializePredictor } from '../utils/modelInference.js';

const PredictionForm = ({ onBackToHome }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const sectionRefs = useRef({});
  const [formData, setFormData] = useState({
    purpose: '',
    category: '',
    city: '',
    region: '',
     rooms: 1,
    bathrooms: 1,
    size: ''
  });
  const [regionSearch, setRegionSearch] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [availableRegions, setAvailableRegions] = useState([]);
  const [errors, setErrors] = useState({});
  const [citySearch, setCitySearch] = useState('');
  
  // City options for the dropdown
  const cityOptions = useMemo(() => [
    { value: 0, name: 'Ariana' },
    { value: 1, name: 'Ben Arous' },
    { value: 2, name: 'Bizerte' },
    { value: 3, name: 'Béja' },
    { value: 4, name: 'Gabès' },
    { value: 5, name: 'Gafsa' },
    { value: 6, name: 'Jendouba' },
    { value: 7, name: 'Kairouan' },
    { value: 8, name: 'Kasserine' },
    { value: 9, name: 'Kébili' },
    { value: 10, name: 'La Manouba' },
    { value: 11, name: 'Le Kef' },
    { value: 12, name: 'Mahdia' },
    { value: 13, name: 'Monastir' },
    { value: 14, name: 'Médenine' },
    { value: 15, name: 'Nabeul' },
    { value: 16, name: 'Sfax' },
    { value: 17, name: 'Sidi Bouzid' },
    { value: 18, name: 'Siliana' },
    { value: 19, name: 'Sousse' },
    { value: 20, name: 'Tataouine' },
    { value: 21, name: 'Tozeur' },
    { value: 22, name: 'Tunis' },
    { value: 23, name: 'Zaghouan' }
  ], []);

  // Update available regions when city changes
  useEffect(() => {
    if (formData.city !== '') {
      setAvailableRegions(tunisiaRegions[formData.city] || []);
      // Reset region selection when city changes
      setFormData(prev => ({ ...prev, region: '' }));
      setRegionSearch('');
      setIsRegionDropdownOpen(true);
    } else {
      setAvailableRegions([]);
      setIsRegionDropdownOpen(false);
    }
  }, [formData.city]);
  
  // Filter cities based on search input
  useEffect(() => {
    if (citySearch.trim() === '') {
      setFilteredCities(cityOptions);
    } else {
      const filtered = cityOptions.filter(city => 
        city.name.toLowerCase().includes(citySearch.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  }, [citySearch, cityOptions]);
  
  // Initialize filtered cities on component mount
  useEffect(() => {
    setFilteredCities(cityOptions);
  }, [cityOptions]);

  // Preload the ONNX model on component mount
  useEffect(() => {
    initializePredictor().catch(error => {
      console.error('Failed to preload model:', error);
    });
  }, []);

  const totalSteps = 5;

  const scrollToSection = (stepNum) => {
    const section = sectionRefs.current[stepNum];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentStep(stepNum);
    }
  };

  const validateAllSteps = () => {
    const newErrors = {};
    
    if (formData.purpose === '') newErrors.purpose = 'Please select a purpose';
    if (formData.category === '') newErrors.category = 'Please select a category';
    if (formData.city === '') newErrors.city = 'Please select a city';
    if (formData.region === '') newErrors.region = 'Please select a region';
    if (formData.size === '' || parseFloat(formData.size) <= 0) newErrors.size = 'Please enter a valid size';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionError, setPredictionError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all steps before submission
    if (validateAllSteps()) {
      setIsLoading(true);
      setPredictionError(null);
      
      try {
        // Use local model inference
        const inputData = {
          category: parseInt(formData.category),
          type: formData.purpose === 1 ? 1 : 0,
          city: parseInt(formData.city),
          region: parseInt(formData.region),
          room_count: parseInt(formData.rooms),
          bathroom_count: parseInt(formData.bathrooms),
          size: parseFloat(formData.size)
        };

        const predictedPrice = await predictHousePrice(inputData);
        setPredictedPrice(predictedPrice);
        setShowResults(true);
      } catch (error) {
        console.error('Prediction error:', error);
        setPredictionError('Failed to get prediction. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('Form has validation errors');
    }
  };
  
  const handleReset = () => {
    setCurrentStep(1);
    setShowResults(false);
    setFormData({
      purpose: '',
      category: '',
      city: '',
      region: '',
      rooms: 1,
      bathrooms: 1,
      size: ''
    });
    setPredictedPrice(null);
    setPredictionError(null);
    setErrors({});
    setCitySearch('');
    setRegionSearch('');
  };

  const renderProgressBar = () => {
    if (showResults) return null;
    
    const steps = [
      { num: 1, label: 'Purpose' },
      { num: 2, label: 'Type' },
      { num: 3, label: 'Location' },
      { num: 4, label: 'Rooms' },
      { num: 5, label: 'Size' }
    ];
    
    return (
      <div className="progress-bar">
        {steps.map((s, index) => (
          <React.Fragment key={s.num}>
            <div 
              className={`progress-step ${s.num <= currentStep ? 'active' : ''} ${completedSteps.includes(s.num) ? 'completed' : ''}`}
              onClick={() => scrollToSection(s.num)}
              style={{ cursor: 'pointer' }}
            >
              <div className={`step-circle ${s.num <= currentStep ? 'active' : ''} ${completedSteps.includes(s.num) ? 'completed' : ''}`}>
                {completedSteps.includes(s.num) ? (
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span>{s.num}</span>
                )}
              </div>
              <span className="step-label">{s.label}</span>
            </div>
            {index < steps.length - 1 && <div className="step-line" />}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderForm = () => {
    if (showResults) {
      // Show results (keep existing results rendering)
      const pricePerMeter = predictedPrice ? Math.round(predictedPrice / parseFloat(formData.size)) : 0;
      const cityName = cityOptions.find(c => c.value === formData.city)?.name || '';
      const propertyTypeName = ['Apartment', 'Office', 'Shared Housing', 'Vacation Rental', 'Commercial', 'House/Villa'][formData.category] || '';
      const purposeType = formData.purpose === 1 ? 'purchase' : 'rental';
      
      return (
        <>
          {/* Results Page Title, Subtitle, and Privacy Badge */}
          <div className="prediction-title-section" style={{ marginBottom: '2.5rem' }}>
            <h1 className="prediction-title">Property Valuation Tool</h1>
            <p className="prediction-subtitle">
              Get a data-informed estimate based on location, property features, and current market conditions across Tunisia.
            </p>
            <div className="privacy-badge" style={{ margin: '0 auto 0.5rem auto' }}>
              <svg className="shield-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L3 3v4c0 3.5 2 6.5 5 8 3-1.5 5-4.5 5-8V3l-5-2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
              <span>Your information is used only for valuation and is not stored</span>
            </div>
          </div>

          <div className="result-content-split">
            {/* Left Panel - Valuation & Interpretation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="result-left-content"
            >
              <div className="result-header">
              <span className="result-badge">Valuation Complete</span>
              <h2>Property Valuation</h2>
              <p className="result-meta">
                {propertyTypeName} • {cityName} • {formData.size}m² • {formData.rooms} bed / {formData.bathrooms} bath
              </p>
            </div>
            
            <div className="result-price-section">
              <div className="result-label">Estimated {purposeType === 'purchase' ? 'Market Value' : 'Monthly Rent'}</div>
              <div className="predicted-price">
                {isLoading ? (
                  'Analyzing...'
                ) : predictionError ? (
                  <span style={{ color: 'var(--error)' }}>{predictionError}</span>
                ) : (
                  `${predictedPrice?.toLocaleString()} TND`
                )}
              </div>
              <div className="price-range">
                <span>Range: {predictedPrice ? `${Math.round(predictedPrice * 0.9).toLocaleString()} - ${Math.round(predictedPrice * 1.1).toLocaleString()} TND` : '—'}</span>
              </div>
              <div className="price-per-meter">
                <span className="ppm-label">Price per m²:</span>
                <span className="ppm-value">{pricePerMeter.toLocaleString()} TND/m²</span>
              </div>
            </div>

            <div className="result-interpretation">
              <h3>What this means</h3>
              <p>
                This estimate is based on analysis of similar {propertyTypeName.toLowerCase()} properties in {cityName}, adjusted for size and features. The 10% range accounts for factors we can't measure directly, such as property condition, exact street location, view quality, and recent renovations.
              </p>
              <div className="interpretation-note">
                <strong>Confidence context:</strong> Our model performs best in areas with higher transaction density. Estimates for common property types in major cities (Tunis, Sfax, Sousse) tend to be more precise than rural or unique property configurations.
              </div>
            </div>
          </motion.div>
          
          {/* Right Panel - Key Factors */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="result-right-content"
          >
            <div className="result-factors">
              <h3>Key Factors Influencing This Estimate</h3>
              <div className="factors-grid">
                <div className="factor-card">
                  <span className="factor-icon">📍</span>
                  <div className="factor-content">
                    <h4>Location</h4>
                    <p>Governorate and delegation establish baseline market prices. {cityName} has specific demand patterns affecting value.</p>
                  </div>
                </div>
                <div className="factor-card">
                  <span className="factor-icon">📐</span>
                  <div className="factor-content">
                    <h4>Property Size</h4>
                    <p>{formData.size}m² places this in the {parseFloat(formData.size) > 150 ? 'larger' : parseFloat(formData.size) > 80 ? 'medium' : 'compact'} category, affecting market positioning.</p>
                  </div>
                </div>
                <div className="factor-card">
                  <span className="factor-icon">🏠</span>
                  <div className="factor-content">
                    <h4>Property Type</h4>
                    <p>{propertyTypeName} properties have distinct pricing patterns compared to other categories in this region.</p>
                  </div>
                </div>
                <div className="factor-card">
                  <span className="factor-icon">🛏️</span>
                  <div className="factor-content">
                    <h4>Configuration</h4>
                    <p>{formData.rooms} bedrooms and {formData.bathrooms} bathrooms match specific buyer/renter segments.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="result-actions" style={{ marginTop: '2rem' }}>
              <button className="return-button" onClick={handleReset}>
                Value Another Property
              </button>
            </div>
          </motion.div>
          </div>
        </>
      );
    }

    // Show all form steps at once
    return (
      <div className="all-steps-form">
        {/* Step 1: Purpose */}
        <div className="form-section" ref={el => sectionRefs.current[1] = el}>
          <h3 className="form-section-title">
            <span className="form-step-number">1</span>
            <span className="form-section-text">
              <span className="form-section-main">What brings you here today?</span>
              <span className="form-section-subtitle">Choose whether you're buying or renting</span>
            </span>
          </h3>
          <div className="purpose-buttons">
            <button
              className={`purpose-button ${formData.purpose === 1 ? 'active' : ''}`}
              onClick={() => {
                setFormData({ ...formData, purpose: 1 });
                if (errors.purpose) setErrors({ ...errors, purpose: '' });
                if (!completedSteps.includes(1)) setCompletedSteps([...completedSteps, 1]);
              }}
              type="button"
            >
              Buying
            </button>
            <button
              className={`purpose-button ${formData.purpose === 0 ? 'active' : ''}`}
              onClick={() => {
                setFormData({ ...formData, purpose: 0 });
                if (errors.purpose) setErrors({ ...errors, purpose: '' });
                if (!completedSteps.includes(1)) setCompletedSteps([...completedSteps, 1]);
              }}
              type="button"
            >
              Renting
            </button>
          </div>
          {errors.purpose && <div className="error-message">{errors.purpose}</div>}
        </div>

        {/* Step 2: Property Type */}
        <div className="form-section" ref={el => sectionRefs.current[2] = el}>
          <h3 className="form-section-title">
            <span className="form-step-number">2</span>
            <span className="form-section-text">
              <span className="form-section-main">What type of property?</span>
              <span className="form-section-subtitle">Select the property category</span>
            </span>
          </h3>
          <select
            value={formData.category}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value ? Number(e.target.value) : '' });
              if (errors.category) setErrors({ ...errors, category: '' });
              if (e.target.value && !completedSteps.includes(2)) setCompletedSteps([...completedSteps, 2]);
            }}
            className={`form-select ${errors.category ? 'error' : ''}`}
          >
            <option value="" disabled>Select property type</option>
            <option value="0">Apartment</option>
            <option value="1">Office Space</option>
            <option value="2">Shared Housing</option>
            <option value="3">Vacation Rental</option>
            <option value="4">Commercial Property</option>
            <option value="5">House / Villa</option>
          </select>
          {errors.category && <div className="error-message">{errors.category}</div>}
        </div>

        {/* Step 3: Location */}
        <div className="form-section" ref={el => sectionRefs.current[3] = el}>
          <h3 className="form-section-title">
            <span className="form-step-number">3</span>
            <span className="form-section-text">
              <span className="form-section-main">Where is the property located?</span>
              <span className="form-section-subtitle">Select governorate and delegation</span>
            </span>
          </h3>
          <div className="location-inputs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <select
                value={formData.city}
                onChange={(e) => {
                  setFormData({ ...formData, city: e.target.value ? Number(e.target.value) : '' });
                  if (errors.city) setErrors({ ...errors, city: '' });
                }}
                className={`form-select ${errors.city ? 'error' : ''}`}
              >
                <option value="" disabled>Select governorate</option>
                {cityOptions.map((city) => (
                  <option key={city.value} value={city.value}>{city.name}</option>
                ))}
              </select>
              {errors.city && <div className="error-message">{errors.city}</div>}
            </div>
            
            <div className="form-group">
              <select
                value={formData.region}
                onChange={(e) => {
                  setFormData({ ...formData, region: e.target.value ? Number(e.target.value) : '' });
                  if (errors.region) setErrors({ ...errors, region: '' });
                  if (e.target.value && !completedSteps.includes(3)) setCompletedSteps([...completedSteps, 3]);
                }}
                className={`form-select ${errors.region ? 'error' : ''}`}
                disabled={!formData.city && formData.city !== 0}
              >
                <option value="" disabled>Select delegation</option>
                {availableRegions.map((region) => (
                  <option key={region.value} value={region.value}>{region.name}</option>
                ))}
              </select>
              {errors.region && <div className="error-message">{errors.region}</div>}
            </div>
          </div>
        </div>

        {/* Step 4: Rooms */}
        <div className="form-section" ref={el => sectionRefs.current[4] = el}>
          <h3 className="form-section-title">
            <span className="form-step-number">4</span>
            <span className="form-section-text">
              <span className="form-section-main">Tell us about the space</span>
              <span className="form-section-subtitle">Number of bedrooms and bathrooms</span>
            </span>
          </h3>
          <div className="room-inputs-inline">
            <div className="number-input-compact">
              <label>Bedrooms</label>
              <div className="stepper-compact">
                <button type="button" onClick={() => { setFormData({ ...formData, rooms: Math.max(1, formData.rooms - 1) }); if (!completedSteps.includes(4)) setCompletedSteps([...completedSteps, 4]); }}>−</button>
                <span>{formData.rooms}</span>
                <button type="button" onClick={() => { setFormData({ ...formData, rooms: formData.rooms + 1 }); if (!completedSteps.includes(4)) setCompletedSteps([...completedSteps, 4]); }}>+</button>
              </div>
            </div>
            <div className="number-input-compact">
              <label>Bathrooms</label>
              <div className="stepper-compact">
                <button type="button" onClick={() => { setFormData({ ...formData, bathrooms: Math.max(1, formData.bathrooms - 1) }); if (!completedSteps.includes(4)) setCompletedSteps([...completedSteps, 4]); }}>−</button>
                <span>{formData.bathrooms}</span>
                <button type="button" onClick={() => { setFormData({ ...formData, bathrooms: formData.bathrooms + 1 }); if (!completedSteps.includes(4)) setCompletedSteps([...completedSteps, 4]); }}>+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 5: Size */}
        <div className="form-section" ref={el => sectionRefs.current[5] = el}>
          <h3 className="form-section-title">
            <span className="form-step-number">5</span>
            <span className="form-section-text">
              <span className="form-section-main">How large is the property?</span>
              <span className="form-section-subtitle">Enter the size in square meters</span>
            </span>
          </h3>
          <div className="size-input">
            <input
              type="number"
              value={formData.size}
              onChange={(e) => {
                setFormData({ ...formData, size: e.target.value });
                if (errors.size) setErrors({ ...errors, size: '' });
                if (e.target.value && parseFloat(e.target.value) > 0 && !completedSteps.includes(5)) setCompletedSteps([...completedSteps, 5]);
              }}
              placeholder="Enter size"
              min="1"
              className={errors.size ? 'error' : ''}
            />
            <span className="size-suffix">m²</span>
          </div>
          {errors.size && <div className="error-message">{errors.size}</div>}
        </div>

        {/* Submit Button */}
        <div className="form-submit-section">
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Get Valuation'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="prediction-form-container">
      {onBackToHome && (
        <button
          type="button"
          className="prediction-mobile-back"
          onClick={onBackToHome}
          aria-label="Back to home"
        >
            ←
        </button>
      )}
      
      {/* Prediction Page Title, Subtitle, and Privacy Badge */}
      {!showResults && (
        <div className="prediction-title-section">
          <h1 className="prediction-title">Property Valuation Tool</h1>
          <p className="prediction-subtitle">
            Get a data-informed estimate based on location, property features, and current market conditions across Tunisia.
          </p>
          <div className="privacy-badge" style={{ margin: '0 auto 0.5rem auto' }}>
            <svg className="shield-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L3 3v4c0 3.5 2 6.5 5 8 3-1.5 5-4.5 5-8V3l-5-2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            <span>Your information is used only for valuation and is not stored</span>
          </div>
        </div>
      )}

      {/* Progress Steps */}
      {renderProgressBar()}

      <div className="form-container">
        <form onSubmit={handleSubmit} className="prediction-form">
          {renderForm()}
        </form>
      </div>
    </div>
  );
}

export default PredictionForm;
