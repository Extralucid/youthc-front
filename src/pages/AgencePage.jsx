import { useState, useEffect } from 'react';
import MapView from '../components/map/MapView';
import MapFilters from '../components/map/MapFilters';
import './AgencePage.css';

// Mock data - replace with your API call
const mockMarkers = [
  { id: 1, name: 'Location A', lat: 51.505, lng: -0.09, category: 'restaurant', active: true },
  { id: 2, name: 'Location B', lat: 51.51, lng: -0.1, category: 'hotel', active: true },
  { id: 3, name: 'Location C', lat: 51.515, lng: -0.12, category: 'museum', active: false },
];

const categories = [
  { id: 'restaurant', name: 'Restaurants' },
  { id: 'hotel', name: 'Hotels' },
  { id: 'museum', name: 'Museums' }
];

const AgencePage = () => {
  const [filteredMarkers, setFilteredMarkers] = useState(mockMarkers);
  const [userLocation, setUserLocation] = useState(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const handleFilterChange = (filters) => {
    let results = [...mockMarkers];
    
    // Apply category filter
    if (filters.category !== 'all') {
      results = results.filter(m => m.category === filters.category);
    }
    
    // Apply active filter
    if (filters.activeOnly) {
      results = results.filter(m => m.active);
    }
    
    // Apply radius filter (if we have user location)
    if (userLocation && filters.radius) {
      results = results.filter(marker => {
        const distance = getDistance(
          userLocation.lat,
          userLocation.lng,
          marker.lat,
          marker.lng
        );
        return distance <= filters.radius;
      });
    }
    
    setFilteredMarkers(results);
  };

  // Helper function to calculate distance between coordinates
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  return (
      <div className="map-page-container">
        <MapFilters 
          categories={categories} 
          onFilterChange={handleFilterChange} 
        />
        <div className="map-container">
          <MapView markers={filteredMarkers} />
        </div>
      </div>
  );
};

export default AgencePage;