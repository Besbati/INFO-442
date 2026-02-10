// iNaturalist API service
const BASE_URL = 'https://api.inaturalist.org/v1';

// Helper function to add delay between requests to respect rate limits
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Convert miles to kilometers (iNaturalist API uses km)
const milesToKm = (miles) => miles * 1.60934;

// Map conservation status codes to display text
const conservationStatusMap = {
  'EX': 'Extinct (EX)',
  'EW': 'Extinct in the Wild (EW)',
  'CR': 'Critically Endangered (CR)',
  'EN': 'Endangered (EN)',
  'VU': 'Vulnerable (VU)',
  'NT': 'Near Threatened (NT)',
  'LC': 'Least Concern (LC)',
  'DD': 'Data Deficient (DD)',
  'NE': 'Not Evaluated (NE)'
};

// Display names for categories
const categoryDisplayNames = {
  'Mammalia': 'mammal',
  'Aves': 'bird',
  'Actinopterygii': 'fish',
  'Insecta': 'insect',
  'Reptilia': 'reptile',
  'Plantae': 'plant'
};

// Helper to determine the category from taxon
const getTaxonCategory = (taxon) => {
  const ancestors = taxon.ancestor_ids || [];
  const ancestorNames = (taxon.ancestors || []).map(a => a.name);

  // Check for major taxonomic groups
  if (ancestorNames.includes('Mammalia') || taxon.name === 'Mammalia') return 'Mammalia';
  if (ancestorNames.includes('Aves') || taxon.name === 'Aves') return 'Aves';
  if (ancestorNames.includes('Actinopterygii') || taxon.name === 'Actinopterygii') return 'Actinopterygii';
  if (ancestorNames.includes('Insecta') || taxon.name === 'Insecta') return 'Insecta';
  if (ancestorNames.includes('Reptilia') || taxon.name === 'Reptilia') return 'Reptilia';
  if (ancestorNames.includes('Plantae') || taxon.name === 'Plantae') return 'Plantae';

  // Fallback based on iconic taxon
  if (taxon.iconic_taxon_name) {
    const iconicMap = {
      'Mammalia': 'Mammalia',
      'Aves': 'Aves',
      'Actinopterygii': 'Actinopterygii',
      'Insecta': 'Insecta',
      'Reptilia': 'Reptilia',
      'Plantae': 'Plantae',
      'Amphibia': 'Reptilia', // Group with reptiles for simplicity
      'Mollusca': 'Insecta', // Group with insects for simplicity
      'Arachnida': 'Insecta' // Group with insects for simplicity
    };
    return iconicMap[taxon.iconic_taxon_name] || 'Unknown';
  }

  return 'Unknown';
};

// Helper to get conservation status from taxon
const getConservationStatus = (taxon) => {
  if (taxon.conservation_status) {
    return {
      code: taxon.conservation_status.status || 'NE',
      text: conservationStatusMap[taxon.conservation_status.status] || 'Not Evaluated'
    };
  }

  // Try to get from conservation statuses array
  if (taxon.conservation_statuses && taxon.conservation_statuses.length > 0) {
    const status = taxon.conservation_statuses[0];
    return {
      code: status.status || 'NE',
      text: conservationStatusMap[status.status] || 'Not Evaluated'
    };
  }

  return {
    code: 'NE',
    text: 'Not Evaluated'
  };
};

// Generate random location within radius for display (since exact locations may not be available)
const generateLocationNearCenter = (lat, lng, radiusKm) => {
  // Random angle
  const angle = Math.random() * 2 * Math.PI;
  // Random distance (up to radius)
  const distance = Math.random() * radiusKm;

  // Convert to lat/lng offset
  const latOffset = (distance / 111) * Math.cos(angle); // 111 km per degree latitude
  const lngOffset = (distance / (111 * Math.cos(lat * Math.PI / 180))) * Math.sin(angle);

  return [lat + latOffset, lng + lngOffset];
};

/**
 * Fetch species observed in a radius around a location
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} radiusMiles - Radius in miles
 * @returns {Promise<Array>} Array of species data
 */
export const fetchSpeciesInRadius = async (lat, lng, radiusMiles) => {
  try {
    const radiusKm = milesToKm(radiusMiles);

    // Build query parameters
    // We'll get all species first, then filter for conservation status
    // This gives us species actually observed in this location
    // Note: We don't use order_by to ensure consistent results across different radii
    // (ordering by observations_count causes different species to appear when radius changes)
    const params = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
      radius: radiusKm.toString(),
      rank: 'species',
      quality_grade: 'research', // Only research-grade observations
      verifiable: 'true',
      per_page: '500' // Increased for better coverage across all radii
    });

    const url = `${BASE_URL}/observations/species_counts?${params}`;

    console.log('Fetching from iNaturalist:', url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`iNaturalist API error: ${response.status}`);
    }

    const data = await response.json();

    console.log('iNaturalist response:', data);
    console.log('Total results before filtering:', data.results?.length || 0);

    // Process the results and filter for conservation status
    const species = [];

    if (data.results && data.results.length > 0) {
      for (let i = 0; i < data.results.length; i++) {
        const result = data.results[i];
        const taxon = result.taxon;

        if (!taxon) continue;

        const conservationStatus = getConservationStatus(taxon);

        // Filter: Only include species with meaningful conservation status
        // Skip species that are "Not Evaluated" or "Least Concern"
        if (conservationStatus.code === 'NE' || conservationStatus.code === 'LC') {
          continue;
        }

        // Skip if no conservation status information
        if (!taxon.conservation_status && (!taxon.conservation_statuses || taxon.conservation_statuses.length === 0)) {
          continue;
        }

        // Require at least 2 observations to filter out likely misidentifications
        if (result.count < 2) {
          continue;
        }

        const category = getTaxonCategory(taxon);
        const location = generateLocationNearCenter(lat, lng, radiusKm);

        // Get a better description
        let description = taxon.wikipedia_summary;
        if (!description || description.length < 20) {
          const categoryName = categoryDisplayNames[category] || category.toLowerCase();
          description = `${taxon.preferred_common_name || taxon.name} is a threatened ${categoryName} species. ${result.count} observation${result.count !== 1 ? 's' : ''} recorded in this area.`;
        } else {
          // Truncate long descriptions
          description = description.substring(0, 200) + (description.length > 200 ? '...' : '');
        }

        species.push({
          id: taxon.id,
          commonName: taxon.preferred_common_name || taxon.name,
          scientificName: taxon.name,
          category: category,
          conservationStatus: conservationStatus.code,
          conservationStatusText: conservationStatus.text,
          description: description,
          photoUrl: taxon.default_photo?.medium_url || taxon.default_photo?.url,
          photoAttribution: taxon.default_photo?.attribution,
          observationCount: result.count,
          lat: location[0],
          lng: location[1],
          location: location
        });

        // Stop after collecting 50 species with conservation status
        if (species.length >= 50) {
          break;
        }

        // Add small delay to avoid hitting rate limits
        if (i % 10 === 0) {
          await delay(100);
        }
      }
    }

    console.log(`Fetched ${species.length} threatened species (filtered from ${data.results?.length || 0} total)`);

    return species;

  } catch (error) {
    console.error('Error fetching species from iNaturalist:', error);
    throw error;
  }
};

/**
 * Fetch detailed information about a specific taxon
 * @param {number} taxonId - The iNaturalist taxon ID
 * @returns {Promise<Object>} Detailed taxon information
 */
export const fetchTaxonDetails = async (taxonId) => {
  try {
    const url = `${BASE_URL}/taxa/${taxonId}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`iNaturalist API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const taxon = data.results[0];
      return {
        id: taxon.id,
        name: taxon.name,
        commonName: taxon.preferred_common_name,
        rank: taxon.rank,
        photos: taxon.taxon_photos?.map(tp => ({
          url: tp.photo.medium_url || tp.photo.url,
          attribution: tp.photo.attribution,
          license: tp.photo.license_code
        })) || [],
        wikipedia_summary: taxon.wikipedia_summary,
        conservation_status: taxon.conservation_status
      };
    }

    return null;

  } catch (error) {
    console.error('Error fetching taxon details from iNaturalist:', error);
    throw error;
  }
};
