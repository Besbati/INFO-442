import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ExplorePage from './components/ExplorePage';
import FAQPage from './components/FAQPage';
import AboutPage from './components/AboutPage';
import './firebase'; // Imports and initializes Firebase


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchLocation, setSearchLocation] = useState(null);
  const [selectedRadius, setSelectedRadius] = useState(5);

  const handleSearch = (location, radius) => {
    setSearchLocation(location);
    setSelectedRadius(radius);
    setCurrentPage('explore');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onSearch={handleSearch}
            selectedRadius={selectedRadius}
            setSelectedRadius={setSelectedRadius}
          />
        );
      case 'explore':
        return (
          <ExplorePage
            searchLocation={searchLocation}
            selectedRadius={selectedRadius}
            setSelectedRadius={setSelectedRadius}
            onSearch={handleSearch}
          />
        );
      case 'faq':
        return <FAQPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onSearch={handleSearch} />;
    }
  };

  return (
    <div className="App">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSearch={handleSearch}
        selectedRadius={selectedRadius}
        setSelectedRadius={setSelectedRadius}
        showSearchInNav={currentPage !== 'home'}
        searchLocation={searchLocation}
      />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
