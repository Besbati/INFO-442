import React, { useState, useRef, useEffect } from 'react';
import '../styles/Navigation.css';
import SearchBar from './SearchBar';
import RadiusSelector from './RadiusSelector';

function Navigation({ currentPage, setCurrentPage, onSearch, selectedRadius, setSelectedRadius, showSearchInNav, searchLocation }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <nav className="navigation">
      <div className="nav-content">
        <div className="nav-left">
          <h1 className="site-name">Know Before You Go</h1>
        </div>

        {showSearchInNav && (
          <div className="nav-search">
            <SearchBar
              onSearch={onSearch}
              selectedRadius={selectedRadius}
              inNavBar={true}
              searchLocation={searchLocation}
            />
            <RadiusSelector
              selectedRadius={selectedRadius}
              setSelectedRadius={setSelectedRadius}
              compact={true}
            />
          </div>
        )}

        <div className="nav-right">
          <button
            className={`nav-button ${currentPage === 'explore' ? 'active' : ''} ${hoveredItem === 'explore' ? 'hovered' : ''}`}
            onClick={() => handleNavClick('explore')}
            onMouseEnter={() => setHoveredItem('explore')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Explore
          </button>
          <button
            className={`nav-button ${currentPage === 'faq' ? 'active' : ''} ${hoveredItem === 'faq' ? 'hovered' : ''}`}
            onClick={() => handleNavClick('faq')}
            onMouseEnter={() => setHoveredItem('faq')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Endangerment
          </button>
          <button
            className={`nav-button ${currentPage === 'about' ? 'active' : ''} ${hoveredItem === 'about' ? 'hovered' : ''}`}
            onClick={() => handleNavClick('about')}
            onMouseEnter={() => setHoveredItem('about')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            About Us
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
