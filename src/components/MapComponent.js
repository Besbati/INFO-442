import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet';
import '../styles/MapComponent.css';
import 'leaflet/dist/leaflet.css';
import SpeciesMarker from './SpeciesMarker';

function MapUpdater({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);

  return null;
}

function MapComponent({
  center,
  zoom = 10,
  showSpecies = false,
  speciesData = [],
  selectedRadius = 5,
  searchLocation = null,
  onSpeciesClick = null,
  selectedSpeciesId = null
}) {
  const [mapType, setMapType] = useState('satellite');
  const [hoveredButton, setHoveredButton] = useState(false);

  const toggleMapType = () => {
    setMapType(mapType === 'satellite' ? 'street' : 'satellite');
  };

  // Convert miles to meters for the circle radius (1 mile = 1609.34 meters)
  const radiusInMeters = selectedRadius * 1609.34;

  // Tile layer URLs
  const satelliteUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  const streetUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  return (
    <div className="map-wrapper">
      <MapContainer
        center={center}
        zoom={zoom}
        className="map-container"
        zoomControl={true}
      >
        <MapUpdater center={center} zoom={zoom} />

        <TileLayer
          attribution={mapType === 'satellite'
            ? '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
          url={mapType === 'satellite' ? satelliteUrl : streetUrl}
        />

        {searchLocation && (
          <Circle
            center={[searchLocation.lat, searchLocation.lng]}
            radius={radiusInMeters}
            pathOptions={{
              color: '#000',
              fillColor: 'transparent',
              fillOpacity: 0,
              weight: 3
            }}
          />
        )}

        {showSpecies && speciesData.map((species) => (
          <SpeciesMarker
            key={species.id}
            species={species}
            onClick={onSpeciesClick}
            isSelected={selectedSpeciesId === species.id}
          />
        ))}
      </MapContainer>

      <button
        className={`map-type-toggle ${hoveredButton ? 'hovered' : ''}`}
        onClick={toggleMapType}
        onMouseEnter={() => setHoveredButton(true)}
        onMouseLeave={() => setHoveredButton(false)}
        title={`Switch to ${mapType === 'satellite' ? 'street' : 'satellite'} view`}
      >
        {mapType === 'satellite' ? (
          <div className="map-preview street-preview">
            <div className="road-line"></div>
            <div className="road-line"></div>
          </div>
        ) : (
          <div className="map-preview satellite-preview">
            <div className="terrain-pattern"></div>
          </div>
        )}
      </button>
    </div>
  );
}

export default MapComponent;
