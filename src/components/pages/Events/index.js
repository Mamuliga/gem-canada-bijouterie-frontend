import React from 'react';
// , { useEffect, useState } from 'react';
// import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import EventsCard from '../../UI/EventsCard';
// import { getLocaleText } from '../../../utils/helperFunctions';
// import Loading from '../../UI/Loading';
import { bindActionCreators } from 'redux';
import { setEventsData } from '../../../actions/apiActions';
import { Helmet } from 'react-helmet';
// import logger from '../../../utils/logger';
// import { getEventsDataApi } from '../../../utils/api';
// import i18next from 'i18next';

function Events(props) {
  // const [loading, setLoading] = useState(false);
  // const { eventsData, setEventsData } = props;
  // const callApi = () => {
  //   if (!eventsData) {
  //     setLoading(true);

  //     getEventsDataApi()
  //       .then(res => {
  //         logger.info('getEventsDataApi', res);
  //         setLoading(false);
  //         setEventsData(res.data);
  //       })
  //       .catch(err => {
  //         logger.error('getEventsDataApi', err);
  //         setLoading(false);
  //       });
  //   }
  // };

  // useEffect(callApi, []);

  // if (loading) {
  //   return <Loading />;
  // }

  // if (eventsData) {
  //   return (
  //     <Container className="main-container-event">
  //       {eventsData.map(data => {
  //         return (
  //           <EventsCard
  //             imageSrc={
  //               data.event_image
  //                 ? data.event_image.data && data.event_image.data.full_url
  //                 : ''
  //             }
  //             key={data.id}
  //             title={
  //               getLocaleText(data.event_title_en, data.event_title_fr)[
  //                 i18next.language
  //               ]
  //             }
  //             content={
  //               getLocaleText(data.event_content_en, data.event_content_fr)[
  //                 i18next.language
  //               ]
  //             }
  //             description={
  //               getLocaleText(
  //                 data.event_description_en,
  //                 data.event_description_fr
  //               )[i18next.language]
  //             }
  //           />
  //         );
  //       })}
  //     </Container>
  //   );
  // }
  // return null;
  return (
    <div>
      <Helmet
        title={`Events - Bijouterie Joyaux - Natural Gems, Precious, Semi Precious Stones`} 
        meta={[
          {
            name: 'keywords',
            content: `events, gemstones, wholesale gemstones, gemstone wholesale, gemstone dealer, gem dealer, wholesale gemstone dealer, fine gems dealer, vente de pirre précieuse, grossiste pierre précieuse, marchand de pierres précieuses`,
          },
        ]}
      />

      <EventsCard />
    </div>
  );
}

const mapStateToProps = state => ({
  ...state.apiReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setEventsData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Events);
