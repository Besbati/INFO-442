# Know Before You Go

A location-based web application that helps travelers learn about endangered species near the places they visit. Built with React and integrated with the iNaturalist API.

## Features

- **Location Search**: Search by address or ZIP code to find endangered species within a customizable radius
- **Interactive Map**: Explore species on an interactive map with satellite and street view options
- **Species Information**: View detailed information about each species including:
  - Common and scientific names
  - Conservation status (based on IUCN categories)
  - Description and characteristics
  - Taxonomic category (Mammals, Birds, Fish, Insects, Reptiles, Plants)
- **Educational Resources**: Learn about endangerment levels and how to protect wildlife
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18
- **Mapping**: Leaflet & React-Leaflet
- **APIs**:
  - iNaturalist API for species data
  - Nominatim (OpenStreetMap) for geocoding
- **Styling**: Custom CSS with design specifications

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/          # React components
│   ├── Navigation.js    # Navigation bar
│   ├── HomePage.js      # Home page with search
│   ├── ExplorePage.js   # Explore page with map and species
│   ├── MapComponent.js  # Leaflet map integration
│   ├── SpeciesMarker.js # Map markers for species
│   ├── BreakdownList.js # Species breakdown sidebar
│   ├── SearchBar.js     # Search functionality
│   ├── RadiusSelector.js# Radius selection dropdown
│   ├── FAQPage.js       # FAQ and endangerment info
│   └── AboutPage.js     # About the project
├── services/            # API services
│   ├── inaturalist.js   # iNaturalist API integration
│   └── geocoding.js     # Geocoding service
├── styles/              # CSS files
└── App.js               # Main app component
```

## API Integration

### iNaturalist API

The app uses the iNaturalist API to fetch species observations:
- Endpoint: `/v1/observations/species_counts`
- Filters: `threatened=true`, `rank=species`, `verifiable=true`
- Rate limit: ~60 requests/minute
- No API key required

### Geocoding

Uses Nominatim (OpenStreetMap) for address to coordinate conversion:
- Free and open-source
- No API key required
- User-Agent header included as required

## Design Specifications

- **Color Scheme**:
  - Forest Green (#228B22) - Primary accent
  - White (#FFFFFF) - Backgrounds
  - Black (#000000) - Text
  - Light Green (#90EE90) - Selected states
- **Typography**: System fonts for fast loading
- **Interactions**: Hover states, smooth transitions, responsive feedback

## Conservation Status Levels

- **EX**: Extinct
- **EW**: Extinct in the Wild
- **CR**: Critically Endangered
- **EN**: Endangered
- **VU**: Vulnerable
- **NT**: Near Threatened
- **LC**: Least Concern

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (one-way operation)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This project was built as part of an educational initiative to support UN SDG 15: Life on Land.

## License

This project is for educational purposes.

## Acknowledgments

- iNaturalist for providing species observation data
- OpenStreetMap/Nominatim for geocoding services
- Leaflet for mapping functionality
- All the citizen scientists contributing to conservation data
