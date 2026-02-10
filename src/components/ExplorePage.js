import React, { useState, useEffect } from 'react';
import '../styles/ExplorePage.css';
import MapComponent from './MapComponent';
import BreakdownList from './BreakdownList';
import { fetchSpeciesInRadius } from '../services/inaturalist';

function ExplorePage({ searchLocation, selectedRadius, setSelectedRadius, onSearch }) {
  const [speciesData, setSpeciesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Default to downtown Honolulu if no search location
  const defaultLocation = {
    lat: 21.3099,
    lng: -157.8581,
    name: 'Honolulu, HI 96813'
  };

  const currentLocation = searchLocation || defaultLocation;

  useEffect(() => {
    const loadSpecies = async () => {
      if (!currentLocation) return;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchSpeciesInRadius(
          currentLocation.lat,
          currentLocation.lng,
          selectedRadius
        );
        setSpeciesData(data);
      } catch (err) {
        console.error('Error fetching species:', err);
        setError('Failed to load species data');
      } finally {
        setLoading(false);
      }
    };

    loadSpecies();
  }, [currentLocation, selectedRadius]);

  const handleSpeciesClick = (species) => {
    setSelectedSpecies(species);
  };

  return (
    <div className="explore-page">
      <MapComponent
        center={[currentLocation.lat, currentLocation.lng]}
        zoom={11}
        showSpecies={true}
        speciesData={speciesData}
        selectedRadius={selectedRadius}
        searchLocation={currentLocation}
        onSpeciesClick={handleSpeciesClick}
        selectedSpeciesId={selectedSpecies?.id}
      />

      <BreakdownList
        speciesData={speciesData}
        isVisible={showBreakdown}
        setIsVisible={setShowBreakdown}
        selectedSpecies={selectedSpecies}
        setSelectedSpecies={setSelectedSpecies}
        loading={loading}
        locationName={currentLocation?.cityState || currentLocation?.name}
      />

      {loading && !showBreakdown && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading species data...</p>
        </div>
      )}

      {error && (
        <div className="error-indicator">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default ExplorePage;
