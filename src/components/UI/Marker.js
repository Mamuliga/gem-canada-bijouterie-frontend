import React from 'react';

const Marker = () => {
  const handleLocationClick = () => {
    window.open(
      'https://www.google.lk/maps/place/755-620+Rue+Cathcart,+Montréal,+QC+H3A+1L9,+Canada/@45.5031714,-73.5706126,17z/data=!3m1!4b1!4m5!3m4!1s0x4cc91a44ff081a8d:0x37141ea02d9cefca!8m2!3d45.5031677!4d-73.5684239'
    );
  };
  return (
    <div onClick={handleLocationClick} className="contact-us-map-place">
      <strong>Bijouterie Et Joyaux International</strong>
      <div className="contact-us-map-marker">o</div>
    </div>
  );
};

export default Marker;
