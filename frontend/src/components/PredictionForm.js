import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PredictionForm.css';
import tunisiaRegions from '../assets/tunisia_regions_data.js';

const PredictionForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    purpose: '',
    category: '',
    city: '',
    region: '',
    rooms: 1,
    bathrooms: 1,
    size: ''
  });
  
  const [availableRegions, setAvailableRegions] = useState([]);
  const [errors, setErrors] = useState({});
  const [citySearch, setCitySearch] = useState('');
  const [regionSearch, setRegionSearch] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  
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

  const totalSteps = 5;

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    switch(currentStep) {
      case 1:
        if (formData.purpose === '') {
          newErrors.purpose = 'Please select a purpose';
        }
        break;
      case 2:
        if (formData.category === '') {
          newErrors.category = 'Please select a category';
        }
        break;
      case 3:
        if (formData.city === '') {
          newErrors.city = 'Please select a city';
        }
        if (formData.region === '') {
          newErrors.region = 'Please select a region';
        }
        break;
      case 4:
        // Rooms and bathrooms already have default values
        break;
      case 5:
        if (formData.size === '') {
          newErrors.size = 'Please enter the size';
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step) && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionError, setPredictionError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the final step before submission
    if (validateStep(5)) {
      setIsLoading(true);
      setPredictionError(null);
      
      try {
        const response = await fetch('http://localhost:8000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category: parseInt(formData.category),
            type: formData.purpose === 1 ? 1 : 0,
            city: parseInt(formData.city),
            region: parseInt(formData.region),
            room_count: parseInt(formData.rooms),
            bathroom_count: parseInt(formData.bathrooms),
            size: parseFloat(formData.size)
          })
        });

        if (!response.ok) {
          throw new Error('Failed to get prediction');
        }

        const result = await response.json();
        setPredictedPrice(result.predicted_price);
        setStep(6);
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

  const handleReturn = () => {
    setStep(1);
    setFormData({
      purpose: '',
      category: '',
      city: '',
      region: '',
      rooms: 1,
      bathrooms: 1,
      size: ''
    });
  };

  const renderProgressBar = () => {
    return (
      <div className="progress-bar">
        {[...Array(totalSteps)].map((_, index) => (
          <div key={index} className="progress-step">
            <div className={`step-circle ${index + 1 <= step ? 'active' : ''}`}>
              {index + 1}
            </div>
            {(index < totalSteps - 1 || index === totalSteps - 1) && (
              <div className={`step-line ${index + 1 < step ? 'active' : ''}`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="form-step"
          >
            <h2>What's your purpose?</h2>
            <div className="form-group">
              <div className="purpose-buttons">
                <button
                  className={`purpose-button ${formData.purpose === 1 ? 'active' : ''}`}
                  onClick={() => {
                    setFormData({ ...formData, purpose: 1 });
                    if (errors.purpose) {
                      setErrors({ ...errors, purpose: '' });
                    }
                  }}
                  type="button"
                >
                  Buying
                </button>
                <button
                  className={`purpose-button ${formData.purpose === 0 ? 'active' : ''}`}
                  onClick={() => {
                    setFormData({ ...formData, purpose: 0 });
                    if (errors.purpose) {
                      setErrors({ ...errors, purpose: '' });
                    }
                  }}
                  type="button"
                >
                  Renting
                </button>
              </div>
              {errors.purpose && <div className="error-message" style={{ textAlign: 'center' }}>{errors.purpose}</div>}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="form-step"
          >
            <h2>Select Property Category</h2>
            <div className="form-group">
              <select
                value={formData.category}
                onChange={(e) => {
                  setFormData({ ...formData, category: e.target.value ? Number(e.target.value) : '' });
                  if (errors.category) {
                    setErrors({ ...errors, category: '' });
                  }
                }}
                className={`form-select ${errors.category ? 'error' : ''}`}
                required
              >
                <option value="" disabled>Select a category</option>
                <option value="0">Appartements</option>
                <option value="1">Bureaux et Plateaux</option>
                <option value="2">Colocations</option>
                <option value="3">Locations de vacances</option>
                <option value="4">Magasins, Commerces et Locaux industriels</option>
                <option value="5">Maisons et Villas</option>
              </select>
              {errors.category && <div className="error-message">{errors.category}</div>}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="form-step"
          >
            <h2>Location Details</h2>
            <div className="location-inputs">
              <div className="form-group">
                <div className="search-input-container">
                  <input
                    type="text"
                    value={citySearch}
                    onChange={(e) => {
                      setCitySearch(e.target.value);
                      setIsCityDropdownOpen(true);
                      if (errors.city) {
                        setErrors({ ...errors, city: '' });
                      }
                    }}
                    onFocus={() => {
                      setIsCityDropdownOpen(true);
                      setFilteredCities(cityOptions);
                    }}
                    onBlur={(e) => {
                      // Only close if the click wasn't on a dropdown item
                      const dropdownList = e.target.parentElement.querySelector('.dropdown-list');
                      if (dropdownList && !dropdownList.contains(e.relatedTarget)) {
                        setTimeout(() => setIsCityDropdownOpen(false), 200);
                      }
                    }}
                    placeholder="Search for a city"
                    className={`search-input ${errors.city ? 'error' : ''}`}
                  />
                  {formData.city !== '' && (
                    <button 
                      className="clear-button" 
                      onClick={() => {
                        setFormData({ ...formData, city: '' });
                        setCitySearch('');
                        setIsCityDropdownOpen(true);
                      }}
                      type="button"
                    >
                      ×
                    </button>
                  )}
                </div>
                {isCityDropdownOpen && (
                  <div className="dropdown-list">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <div 
                          key={city.value} 
                          className="dropdown-item"
                          onClick={() => {
                            setFormData({ ...formData, city: city.value });
                            setCitySearch(city.name);
                            setIsCityDropdownOpen(false);
                          }}
                        >
                          {city.name}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-item no-results">No cities found</div>
                    )}
                  </div>
                )}
                {errors.city && <div className="error-message">{errors.city}</div>}
              </div>
              
              <div className="form-group">
                <div className="search-input-container">
                  <input
                    type="text"
                    value={regionSearch}
                    onChange={(e) => {
                      setRegionSearch(e.target.value);
                      setIsRegionDropdownOpen(true);
                      if (errors.region) {
                        setErrors({ ...errors, region: '' });
                      }
                    }}
                    onFocus={() => setIsRegionDropdownOpen(true)}
                    onBlur={(e) => {
                      // Only close if the click wasn't on a dropdown item
                      const dropdownList = e.target.parentElement.querySelector('.dropdown-list');
                      if (dropdownList && !dropdownList.contains(e.relatedTarget)) {
                        setTimeout(() => setIsRegionDropdownOpen(false), 200);
                      }
                    }}
                    placeholder="Search for a region"
                    className={`search-input ${errors.region ? 'error' : ''}`}
                    disabled={!formData.city}
                  />
                  {formData.region !== '' && (
                    <button 
                      className="clear-button" 
                      onClick={() => {
                        setFormData({ ...formData, region: '' });
                        setRegionSearch('');
                        setIsRegionDropdownOpen(true);
                      }}
                      type="button"
                    >
                      ×
                    </button>
                  )}
                </div>
                {isRegionDropdownOpen && formData.city !== '' && (
                  <div className="dropdown-list">
                    {availableRegions.filter(region => 
                      region.name.toLowerCase().includes(regionSearch.toLowerCase())
                    ).length > 0 ? (
                      availableRegions
                        .filter(region => 
                          region.name.toLowerCase().includes(regionSearch.toLowerCase())
                        )
                        .map((region) => (
                          <div 
                            key={region.value} 
                            className="dropdown-item"
                            onClick={() => {
                              setFormData({ ...formData, region: region.value });
                              setRegionSearch(region.name);
                              setIsRegionDropdownOpen(false);
                            }}
                          >
                            {region.name}
                          </div>
                        ))
                    ) : (
                      <div className="dropdown-item no-results">No regions found</div>
                    )}
                  </div>
                )}
                {errors.region && <div className="error-message">{errors.region}</div>}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="form-step"
          >
            <h2>Room Details</h2>
            <div className="room-inputs">
              <div className="number-input">
                <label>Rooms</label>
                <div className="stepper">
                  <button onClick={() => setFormData({ ...formData, rooms: Math.max(1, formData.rooms - 1) })}>-</button>
                  <span>{formData.rooms}</span>
                  <button onClick={() => setFormData({ ...formData, rooms: formData.rooms + 1 })}>+</button>
                </div>
              </div>
              <div className="number-input">
                <label>Bathrooms</label>
                <div className="stepper">
                  <button onClick={() => setFormData({ ...formData, bathrooms: Math.max(1, formData.bathrooms - 1) })}>-</button>
                  <span>{formData.bathrooms}</span>
                  <button onClick={() => setFormData({ ...formData, bathrooms: formData.bathrooms + 1 })}>+</button>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="form-step"
          >
            <h2>House Size</h2>
            <div className="form-group">
              <div className="size-input">
                <input
                  type="number"
                  value={formData.size}
                  onChange={(e) => {
                    setFormData({ ...formData, size: e.target.value });
                    if (errors.size) {
                      setErrors({ ...errors, size: '' });
                    }
                  }}
                  placeholder="Enter size"
                  min="1"
                  className={errors.size ? 'error' : ''}
                  required
                />
                <span className="size-suffix">m²</span>
              </div>
              {errors.size && <div className="error-message">{errors.size}</div>}
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="prediction-result"
          >
            <h2>Predicted House Price</h2>
            <div className="predicted-price">
              {isLoading ? (
                'Calculating...'
              ) : predictionError ? (
                <span style={{ color: '#ff4444' }}>{predictionError}</span>
              ) : (
                `${predictedPrice?.toLocaleString()} TND`
              )}
            </div>
            <p>This is an estimated price based on your inputs</p>
            <button className="return-button" onClick={() => window.location.reload()}>
              Back to Main Menu
            </button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="prediction-form-container">
      <div className="animated-background">
        <div className="blur-shape shape-1"></div>
        <div className="blur-shape shape-2"></div>
        <div className="blur-shape shape-3"></div>
      </div>
      
      {renderProgressBar()}
      
      <form onSubmit={handleSubmit} className="prediction-form">
        <AnimatePresence mode='wait'>
          {renderStep()}
        </AnimatePresence>
        
        {step !== 6 && (
          <div className="form-navigation">
            {step > 1 && (
              <button type="button" onClick={handleBack} className="nav-button back">
                Back
              </button>
            )}
            {step < totalSteps ? (
              <button type="button" onClick={handleNext} className="nav-button next">
                Next
              </button>
            ) : (
              <button type="submit" className="nav-button submit">
                Submit
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default PredictionForm;