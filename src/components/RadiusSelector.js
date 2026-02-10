import React, { useState, useRef, useEffect } from 'react';
import '../styles/RadiusSelector.css';

function RadiusSelector({ selectedRadius, setSelectedRadius, compact = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const dropdownRef = useRef(null);

  const radiusOptions = [1, 5, 10, 25, 50];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRadiusSelect = (radius) => {
    if (radius === 'custom') {
      setShowCustomInput(true);
    } else {
      setSelectedRadius(radius);
      setShowCustomInput(false);
      if (!compact) {
        setIsOpen(false);
      }
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const value = parseFloat(customValue);
    if (value && value > 0) {
      const roundedValue = Math.round(value);
      setSelectedRadius(roundedValue);
      setCustomValue('');
      setShowCustomInput(false);
    }
  };

  return (
    <div className={`radius-selector ${compact ? 'compact' : ''}`} ref={dropdownRef}>
      <button
        className="radius-button"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span>{selectedRadius} miles</span>
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
      </button>

      {isOpen && (
        <div className="radius-dropdown">
          {radiusOptions.map((radius) => (
            <div
              key={radius}
              className={`radius-option ${selectedRadius === radius ? 'selected' : ''}`}
              onClick={() => handleRadiusSelect(radius)}
            >
              {selectedRadius === radius && <span className="checkmark">✓</span>}
              <span>{radius} miles</span>
            </div>
          ))}
          <div
            className={`radius-option ${!radiusOptions.includes(selectedRadius) ? 'selected' : ''}`}
            onClick={() => handleRadiusSelect('custom')}
          >
            {!radiusOptions.includes(selectedRadius) && <span className="checkmark">✓</span>}
            <span>Custom</span>
          </div>

          {showCustomInput && (
            <form className="custom-input-container" onSubmit={handleCustomSubmit}>
              <input
                type="number"
                className="custom-input"
                placeholder="Enter miles..."
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                min="1"
                step="0.1"
                autoFocus
              />
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default RadiusSelector;
