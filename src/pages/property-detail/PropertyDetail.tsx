import React from 'react';
import Mapbox from '../../components/Mapbox';
import { Marker } from 'react-map-gl';
import Amenities from '../../components/Amenities';

const PropertyDetail = ({ property }) => {
  const handleGetDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${property.latitude},${property.longitude}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
      <div className="h-96 mb-4">
        <Mapbox latitude={property.latitude} longitude={property.longitude}>
            <Marker longitude={property.longitude} latitude={property.latitude} />
        </Mapbox>
      </div>
      <div className="my-4">
        <Amenities features={property.features} />
      </div>
      <button onClick={handleGetDirections} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get Directions
      </button>
    </div>
  );
};

export default PropertyDetail;
