import React from 'react';
import Icon from './AppIcon'; // Assuming AppIcon is in src/components/

const MapboxView = ({ properties }) => {
  // In a real implementation, this component would initialize a Mapbox GL JS map,
  // use the 'properties' prop to add markers/pins to the map,
  // and handle map events like clicks on markers.

  // For this mock-up, we will display a static image and a message.
  // The pins are conceptually represented.

  return (
    <div className="relative h-full w-full bg-gray-300 rounded-lg overflow-hidden shadow-lg">
      <img
        src="/assets/images/stock/map_placeholder.png" // A generic map image stored in public assets
        alt="Map view of properties"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4">
        <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-2xl">
            <Icon name="Map" size={48} className="mx-auto text-primary mb-3" />
            <h3 className="text-xl font-bold text-gray-800">Interactive Map View</h3>
            <p className="text-sm text-gray-600 mt-1">
              This is where an interactive Mapbox map of the <strong>{properties?.length || 0}</strong> listed properties would appear.
            </p>
            <p className="text-xs text-gray-500 mt-3">
              (Live map integration is disabled in this environment.)
            </p>
        </div>
      </div>
      {/* You could also conceptually map pins onto this static image if you had coordinates */}
      {/* {properties.map(prop => (
          // This is purely for visual concept, styling would need to be precise
          <div key={prop.id} style={{ position: 'absolute', top: `${prop.mockY}%`, left: `${prop.mockX}%` }}>
             <Icon name="MapPin" className="text-red-500" />
          </div>
      ))} */}
    </div>
  );
};

export default MapboxView;
