import React from 'react';
import { Helmet } from 'react-helmet';
import ContactUsCard from '../../UI/ContactUs';

function ContactUs() {
  return (
    <div>
      <Helmet
        title={`Contact us - Bijouterie Joyaux - Natural Gems, Precious, Semi Precious Stones`} 
        meta={[
          {
            name: 'keywords',
            content: `contact, us, gemstones, wholesale gemstones, gemstone wholesale, gemstone dealer, gem dealer, wholesale gemstone dealer, fine gems dealer, vente de pirre précieuse, grossiste pierre précieuse, marchand de pierres précieuses`,
          },
        ]}
      />
      <div className="main-container-contact">
        <ContactUsCard />
      </div>
    </div>
  );
}

export default ContactUs;
