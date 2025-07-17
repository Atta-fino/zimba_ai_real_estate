import React from 'react';
import Map from 'react-map-gl';

const Mapbox = ({ latitude, longitude, ...props }) => {
  return (
    <Map
      initialViewState={{
        longitude,
        latitude,
        zoom: 14
      }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      {...props}
    />
  );
};

export default Mapbox;
