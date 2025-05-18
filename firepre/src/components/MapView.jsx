import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { useEffect, useState, useCallback, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../contexts/ThemeContext';

// Fixing missing default marker icon issue in Leaflet + Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

// Map tile URL options for light and dark modes
const LIGHT_MAP = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const DARK_MAP = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

function ThemeUpdater() {
  const map = useMap();
  const { darkMode } = useTheme();
  const tileLayerRef = useRef();
  
  useEffect(() => {
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }
    
    // Create a new tile layer with the current theme
    const tileLayer = L.tileLayer(darkMode ? DARK_MAP : LIGHT_MAP, {
      attribution: darkMode 
        ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
    // Add the new layer to the map
    tileLayer.addTo(map);
    tileLayerRef.current = tileLayer;
    
  }, [map, darkMode]);
  
  return null;
}

function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 13);
      onLocationSelect(e.latlng);
    },
    locationerror(e) {
      console.error("Location error:", e.message);
      alert("Unable to find your location. Please make sure location services are enabled in your browser and you have given permission.");
    }
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  return position === null ? null : (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const newPos = e.target.getLatLng();
          setPosition(newPos);
          onLocationSelect(newPos);
        },
      }}
    >
      <Popup>
        <b>Selected Location</b><br />
        Latitude: {position.lat.toFixed(4)}<br />
        Longitude: {position.lng.toFixed(4)}
      </Popup>
    </Marker>
  );
}

// Current Location Button Component
function LocateControl({ onLocationUpdate }) {
  const map = useMap();
  const [loading, setLoading] = useState(false);
  const { darkMode } = useTheme();
  
  const handleLocate = useCallback(() => {
    setLoading(true);
    
    map.once('locationfound', () => {
      setLoading(false);
    });
    
    map.once('locationerror', (e) => {
      setLoading(false);
      console.error("Location error:", e.message);
      alert("Unable to find your location. Please make sure location services are enabled in your browser and you have given permission.");
    });
    
    map.locate({
      setView: true,
      maxZoom: 16
    });
  }, [map]);

  // Style for the locate button
  const buttonStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 1000,
    backgroundColor: darkMode ? '#1E1E1E' : 'white',
    border: `2px solid ${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
    borderRadius: '4px',
    padding: '8px 12px',
    boxShadow: `0 2px 5px ${darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)'}`,
    cursor: loading ? 'default' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: loading ? 0.7 : 1,
    transition: 'all 0.2s ease',
    outline: 'none'
  };

  // Add hover styles 
  const [isHovering, setIsHovering] = useState(false);
  
  const hoverStyle = isHovering && !loading ? {
    backgroundColor: darkMode ? '#333333' : '#f8f8f8',
    transform: 'scale(1.05)',
    boxShadow: darkMode ? '0 3px 7px rgba(0,0,0,0.7)' : '0 3px 7px rgba(0,0,0,0.4)'
  } : {};

  return (
    <button 
      onClick={handleLocate} 
      style={{...buttonStyle, ...hoverStyle}}
      disabled={loading}
      title="Show my location"
      aria-label="Show my location"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {loading ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={darkMode ? "#E0E0E0" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </svg>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={darkMode ? "#4CAF50" : "#0066CC"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7.05 11.5 7.35 11.76a1 1 0 0 0 1.3 0C13 21.5 20 15.4 20 10a8 8 0 0 0-8-8z"></path>
            <circle cx="12" cy="10" r="3" fill={darkMode ? "#4CAF50" : "#0066CC"}></circle>
          </svg>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: darkMode ? '#E0E0E0' : '#333' }}>My Location</span>
        </div>
      )}
    </button>
  );
}

export default function MapView({ onLocationChange }) {
  const [location, setLocation] = useState({
    lat: 20.5937,
    lng: 78.9629,
  });
  const { darkMode } = useTheme();

  const handleLocationSelect = (latlng) => {
    setLocation(latlng);
    onLocationChange?.(latlng);
  };

  return (
    <div style={{ 
      height: '600px', 
      width: '100%', 
      borderRadius: '10px', 
      overflow: 'hidden', 
      boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.15)', 
      position: 'relative',
      border: darkMode ? '1px solid rgba(255,255,255,0.1)' : 'none'
    }}>
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url={darkMode ? DARK_MAP : LIGHT_MAP}
        />
        <ThemeUpdater />
        <LocationMarker onLocationSelect={handleLocationSelect} />
        <LocateControl onLocationUpdate={handleLocationSelect} />
      </MapContainer>
    </div>
  );
}
