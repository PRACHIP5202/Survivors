import axios from 'axios';

// Using OpenStreetMap's Nominatim API for reverse geocoding (free and doesn't require API key)
export async function getLocationName(lat, lon) {
  try {
    const response = await axios.get(
      'https://nominatim.openstreetmap.org/reverse',
      {
        params: {
          lat,
          lon,
          format: 'json',
          zoom: 10, // Adjust this for different levels of detail (higher = more detail)
          'accept-language': 'en', // Force English language results
        },
        headers: {
          'User-Agent': 'FirePreApp/1.0' // Nominatim requires a user agent
        }
      }
    );

    // Format the location name based on available data
    const address = response.data.address;
    
    // Try to get the best name for the location
    // Prioritize city/town/village, then county/state, then country
    const locationName = 
      address.city || 
      address.town || 
      address.village || 
      address.county || 
      address.state_district || 
      address.state || 
      address.country || 
      'Unknown location';
      
    return locationName;
  } catch (error) {
    console.error('Error fetching location name:', error);
    return 'Unknown location';
  }
}
