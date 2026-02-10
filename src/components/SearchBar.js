import React, { useState } from 'react';
import '../styles/SearchBar.css';
import { geocodeAddress } from '../services/geocoding';

function SearchBar({ onSearch, selectedRadius, inNavBar = false, searchLocation = null }) {
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchInput.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const location = await geocodeAddress(searchInput);

      if (!location) {
        setError('Please enter a valid address or zip code');
        setTimeout(() => setError(null), 8000);
        setIsLoading(false);
        return;
      }

      onSearch(location, selectedRadius);
      setIsLoading(false);
    } catch (err) {
      setError('Please enter a valid address or zip code');
      setTimeout(() => setError(null), 8000);
      setIsLoading(false);
    }
  };

  return (
    <div className={`search-container ${inNavBar ? 'in-nav' : ''}`}>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Enter zipcode or address..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          type="submit"
          className="search-submit"
          disabled={isLoading}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="2"/>
            <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </form>

      {searchLocation && inNavBar && (
        <div className="search-results-info">
          Showing results for {searchLocation.cityState || searchLocation.name}
        </div>
      )}

      {error && (
        <div className="error-message">
          <div className="error-icon">!</div>
          <div className="error-content">
            <div className="error-title">Error!</div>
            <div className="error-text">{error}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
