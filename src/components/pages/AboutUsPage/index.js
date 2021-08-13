import React from 'react';
import { Helmet } from 'react-helmet';
import AboutUsCard from '../../UI/AboutUsPage';

function AboutUsPage() {
  return (
    <div>
      <Helmet 
        title={`About us - Bijouterie Joyaux - Natural Gems, Precious, Semi Precious Stones`} 
        meta={[
          {
            name: 'keywords',
            content: `about, us, gemstones, wholesale gemstones, gemstone wholesale, gemstone dealer, gem dealer, wholesale gemstone dealer, fine gems dealer, vente de pirre précieuse, grossiste pierre précieuse, marchand de pierres précieuses`,
          },
        ]}
      />
      <div className="main-container-about-us">
        <AboutUsCard />
      </div>
    </div>
  );
}

export default AboutUsPage;
