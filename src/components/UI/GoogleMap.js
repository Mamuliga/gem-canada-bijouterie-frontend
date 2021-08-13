import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const GoogleMap = () => {
  const zoom = 13;
  const center = {
    lat: 45.5032313,
    lng: -73.5705317,
  };

  return (
    <div className="contact-us-google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBaAT7awx2m8iWTwxrKoi5igvmKeGWizH4' }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <Marker lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
