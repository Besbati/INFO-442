import React from 'react';
import '../styles/HomePage.css';
import MapComponent from './MapComponent';
import SearchBar from './SearchBar';
import RadiusSelector from './RadiusSelector';

function HomePage({ onSearch, selectedRadius, setSelectedRadius }) {
  // Default to downtown Honolulu (96813)
  const defaultLocation = {
    lat: 21.3099,
    lng: -157.8581,
    name: 'Honolulu, HI 96813'
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
      </div>
    </div>
  );
}

export default HomePage;
