import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css';
import MapComponent from './MapComponent';
import SearchBar from './SearchBar';
import RadiusSelector from './RadiusSelector';
import { getRecentSearches, cleanupOldSearches } from '../services/firebase-service';

function HomePage({ onSearch, selectedRadius, setSelectedRadius }) {
  const [recentSearches, setRecentSearches] = useState([]);

  // Default to downtown Honolulu (96813)
  const defaultLocation = {
    lat: 21.3099,
    lng: -157.8581,
    name: 'Honolulu, HI 96813'
  };

  useEffect(() => {
    const loadRecent = async () => {
      // Clean up searches older than 7 days (NF1)
      await cleanupOldSearches();
      const searches = await getRecentSearches();
      setRecentSearches(searches);
    };
    loadRecent();
  }, []);

  const handleRecentClick = (search) => {
    const location = {
      lat: search.lat,
      lng: search.lng,
      name: search.name,
      cityState: search.cityState,
    };
    onSearch(location, search.radius);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="home-page">
      <MapComponent
        center={[defaultLocation.lat, defaultLocation.lng]}
        zoom={13}
        showSpecies={false}
        selectedRadius={selectedRadius}
      />

      <div className="home-search-overlay">
        <SearchBar
          onSearch={onSearch}
          selectedRadius={selectedRadius}
        />
        <RadiusSelector
          selectedRadius={selectedRadius}
          setSelectedRadius={setSelectedRadius}
        />

        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <h4 className="recent-searches-title">Recent Searches</h4>
            <ul className="recent-searches-list">
              {recentSearches.slice(0, 5).map((search) => (
                <li key={search.id}>
                  <button
                    className="recent-search-item"
                    onClick={() => handleRecentClick(search)}
                  >
                    <span className="recent-search-name">
                      {search.cityState || search.name}
                    </span>
                    <span className="recent-search-meta">
                      {search.radius} mi &middot; {search.speciesCount} species &middot; {formatDate(search.createdAt)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
