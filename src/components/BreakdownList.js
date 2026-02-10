import React, { useState } from 'react';
import '../styles/BreakdownList.css';

const categoryDisplayNames = {
  'Mammalia': 'Mammal',
  'Aves': 'Bird',
  'Actinopterygii': 'Fish',
  'Insecta': 'Insect',
  'Reptilia': 'Reptile',
  'Plantae': 'Plant'
};

const endangermentColors = {
  'EX': '#000000',
  'EW': '#00008B',
  'CR': '#8B0000',
  'EN': '#FF8C00',
  'VU': '#FFD700',
  'NT': '#90EE90',
  'LC': '#228B22'
};

function BreakdownList({ speciesData, isVisible, setIsVisible, selectedSpecies, setSelectedSpecies, loading, locationName }) {
  const [expandedCategories, setExpandedCategories] = useState({});

  // Group species by category
  const groupedSpecies = speciesData.reduce((acc, species) => {
    const category = species.category || 'Unknown';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(species);
    return acc;
  }, {});

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedSpecies).sort();

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSpeciesClick = (species) => {
    setSelectedSpecies(species);
  };

  return (
    <>
      <button
        className="breakdown-toggle"
        onClick={() => setIsVisible(!isVisible)}
      >
        <span className={`arrow ${isVisible ? 'left' : 'right'}`}>→</span>
      </button>

      <div className={`breakdown-list ${isVisible ? 'visible' : ''}`}>
        <div className="breakdown-header">
          <h2>Endangered Species</h2>
          {locationName && <p className="location-info">{locationName}</p>}
        </div>

        {loading ? (
          <div className="breakdown-loading">
            <p>Loading species...</p>
          </div>
        ) : speciesData.length === 0 ? (
          <div className="breakdown-empty">
            <p>No known endangered species exist in the selected region.</p>
          </div>
        ) : (
          <div className="breakdown-content">
            {sortedCategories.map((category) => {
              const species = groupedSpecies[category];
              const isExpanded = expandedCategories[category];
              const displayName = categoryDisplayNames[category] || category;

              return (
                <div key={category} className="category-section">
                  <button
                    className="category-button"
                    onClick={() => toggleCategory(category)}
                  >
                    <span className="category-name">{displayName}</span>
                    <span className="category-count">{species.length}</span>
                    <span className={`category-arrow ${isExpanded ? 'up' : 'down'}`}>▼</span>
                  </button>

                  {isExpanded && (
                    <div className="species-list">
                      {species.map((sp) => (
                        <div
                          key={sp.id}
                          className={`species-card ${selectedSpecies?.id === sp.id ? 'selected' : ''}`}
                          onClick={() => handleSpeciesClick(sp)}
                        >
                          <div className="species-image">
                            {sp.photoUrl ? (
                              <img src={sp.photoUrl} alt={sp.commonName} />
                            ) : (
                              <div className="no-image">Picture not available</div>
                            )}
                          </div>
                          <div className="species-content">
                            <h3 className="species-common-name">{sp.commonName}</h3>
                            <p className="species-scientific-name">{sp.scientificName}</p>
                            <p className="species-description">{sp.description}</p>
                            <div className="species-status">
                              <span
                                className="status-indicator"
                                style={{ backgroundColor: endangermentColors[sp.conservationStatus] || '#808080' }}
                              ></span>
                              <span className="status-text">{sp.conservationStatusText}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default BreakdownList;
