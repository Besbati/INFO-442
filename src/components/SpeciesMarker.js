import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Icon types with their colors
const getIconForCategory = (category, isSelected = false) => {
  const iconColors = {
    'Mammalia': '#DC143C', // red
    'Aves': '#00008B', // dark blue
    'Actinopterygii': '#87CEEB', // light blue
    'Insecta': '#9370DB', // purple
    'Reptilia': '#FF8C00', // orange
    'Plantae': '#228B22' // green
  };

  const iconSymbols = {
    'Mammalia': '🐱',
    'Aves': '🐦',
    'Actinopterygii': '🐟',
    'Insecta': '🐛',
    'Reptilia': '🐢',
    'Plantae': '🌿'
  };

  const color = iconColors[category] || '#808080';
  const symbol = iconSymbols[category] || '●';
  const size = isSelected ? 36 : 30;
  const border = isSelected ? 'border: 3px solid #fff;' : '';

  const svgIcon = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" fill="${color}" stroke="${isSelected ? '#fff' : 'none'}" stroke-width="${isSelected ? '3' : '0'}"/>
      <text x="${size/2}" y="${size/2}" text-anchor="middle" dy=".3em" font-size="16" fill="white">${symbol}</text>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: 'species-marker-icon',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
  });
};

function SpeciesMarker({ species, onClick, isSelected }) {
  const handleClick = () => {
    if (onClick) {
      onClick(species);
    }
  };

  // Use the taxon's location if available, otherwise use a default or random offset
  const position = species.location || [species.lat, species.lng];

  return (
    <Marker
      position={position}
      icon={getIconForCategory(species.category, isSelected)}
      eventHandlers={{
        click: handleClick,
      }}
    >
      <Popup>
        <div className="species-popup">
          <div className="popup-image">
            {species.photoUrl ? (
              <img src={species.photoUrl} alt={species.commonName} />
            ) : (
              <div className="popup-no-image">Picture not available</div>
            )}
          </div>
          <h3 className="popup-title">{species.commonName}</h3>
          <p className="popup-scientific-name">{species.scientificName}</p>
          <p className="popup-conservation-status">
            <strong>Conservation Status:</strong> {species.conservationStatusText}
          </p>
        </div>
      </Popup>
    </Marker>
  );
}

export default SpeciesMarker;
