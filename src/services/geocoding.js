// Geocoding service using Nominatim (OpenStreetMap)
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

/**
 * Convert an address or ZIP code to latitude/longitude coordinates
 * @param {string} address - Address or ZIP code to geocode
 * @returns {Promise<Object|null>} Location object with lat, lng, and name, or null if not found
 */
export const geocodeAddress = async (address) => {
  try {
    // Detect if input is just a ZIP code (5 digits or 5+4 format)
    const zipCodePattern = /^\d{5}(-\d{4})?$/;
    const isZipCode = zipCodePattern.test(address.trim());

    let searchQuery = address;

    // If it's a ZIP code, append USA to ensure we search in the United States
    if (isZipCode) {
      searchQuery = `${address}, USA`;
    }

    // Build query parameters
    const params = new URLSearchParams({
      q: searchQuery,
      format: 'json',
      limit: '5', // Get more results to filter
      addressdetails: '1',
      countrycodes: 'us' // Restrict to United States
    });

    const url = `${NOMINATIM_URL}?${params}`;

    console.log('Geocoding:', searchQuery, 'with country filter: us');

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'KnowBeforeYouGo/1.0' // Nominatim requires a User-Agent
      }
    });

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      // Filter results to only US locations
      const usResults = data.filter(result =>
        result.address &&
        (result.address.country_code === 'us' ||
         result.address.country === 'United States' ||
         result.display_name.includes('United States'))
      );

      if (usResults.length > 0) {
        const result = usResults[0];

        // Extract city and state from address details
        const address = result.address || {};
        const city = address.city || address.town || address.village || address.county || '';
        const state = address.state || '';
        const cityState = city && state ? `${city} - ${state}` : result.display_name;

        return {
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          name: result.display_name,
          cityState: cityState
        };
      }
    }

    return null;

  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
};

/**
 * Reverse geocode coordinates to an address
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<string|null>} Address string or null if not found
 */
export const reverseGeocode = async (lat, lng) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'KnowBeforeYouGo/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Reverse geocoding API error: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.display_name) {
      return data.display_name;
    }

    return null;

  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return null;
  }
};
