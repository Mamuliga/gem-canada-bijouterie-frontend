import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Row, Card } from 'reactstrap';
import CategoryCard from '../../UI/CategoryCard';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import Loading from '../../UI/Loading';
import { getLocaleText } from '../../../utils/helperFunctions';
import { getCategoryDataApi } from '../../../utils/api';
import { getSemiPreciousCategoryDataApi } from '../../../utils/api';
import logger from '../../../utils/logger';
import { bindActionCreators } from 'redux';
import {
  setPreciousAllData,
  setSemiPreciousAllData,
  setSelectedPreciousSingleData,
  setSelectedSemiPreciousSingleData,
  setGemType,
} from '../../../actions/apiActions';
import { addAFilter, removeAllFilters } from '../../../actions/filterActions';
import SemiPreciousCard from '../../UI/SemiPreciousCard';
import { PRECIOUS, SEMI_PRECIOUS } from '../../../utils/constant';
import { Helmet } from 'react-helmet';

function HomePage(props) {
  const [loading, setLoading] = useState(false);
  const {
    setPreciousAllData,
    setSemiPreciousAllData,
    setSelectedPreciousSingleData,
    preciousAllData = [],
    semipreciousAllData = [],
    addAFilter,
    setSelectedSemiPreciousSingleData,
    setGemType,
    removeAllFilters,
  } = props;

  const sortUsingOrderNumber = (a, b) => a.order_number - b.order_number;

  const callApi = () => {
    if (!preciousAllData.length) {
      setLoading(true);
      getCategoryDataApi()
        .then(res => {
          logger.info('getCategoryDataApi', res);
          setLoading(false);
          res.data.sort(sortUsingOrderNumber);
          setPreciousAllData(res.data);
        })
        .catch(err => {
          logger.error('getCategoryDataApi', err);
          setLoading(false);
          setPreciousAllData([]);
        });
    }
  };

  const callSemiApi = () => {
    if (!semipreciousAllData.length) {
      setLoading(true);
      getSemiPreciousCategoryDataApi()
        .then(res => {
          logger.info('getSemiPreciousCategoryDataApi', res);
          setLoading(false);
          setSemiPreciousAllData(res.data);
        })
        .catch(err => {
          logger.error('getSemiPreciousCategoryDataApi', err);
          setLoading(false);
          setSemiPreciousAllData([]);
        });
    }
  };

  useEffect(callApi, []);
  useEffect(callSemiApi, []);

  const { t } = useTranslation();

  const { push } = useHistory();

  const handlePreciousCardClick = (preciousSingleData, title) => {
    const pushToPage = () => {
      const filterOption = {
        'gem_variety.id': {
          eq: preciousSingleData.id,
        },
      };
      removeAllFilters();
      addAFilter({ ...filterOption });
      setGemType(PRECIOUS);
      push({
        pathname: `/category/${title}`,
        state: { preciousSingleData, gemType: PRECIOUS, title },
      });

      setSelectedPreciousSingleData(preciousSingleData);
    };
    return pushToPage;
  };

  const handleSemiPreciousCardClick = (semiPreciousSingleData, title) => {
    const pushToPage = () => {
      const filterOption = {
        'semi_precious_type.id': {
          eq: semiPreciousSingleData.id,
        },
      };
      removeAllFilters();
      addAFilter({ ...filterOption });
      setGemType(SEMI_PRECIOUS);
      push({
        pathname: `/category/${title}`,
        state: { semiPreciousSingleData, gemType: SEMI_PRECIOUS, title },
      });
      setSelectedSemiPreciousSingleData(semiPreciousSingleData);
    };
    return pushToPage;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Helmet
        title={`Home - Bijouterie Joyaux - Natural Gems, Precious, Semi Precious Stones`} 
        meta={[
          {
            name: 'keywords',
            content: `gemstones, wholesale gemstones, gemstone wholesale, gemstone dealer, gem dealer, wholesale gemstone dealer, fine gems dealer, vente de pirre précieuse, grossiste pierre précieuse, marchand de pierres précieuses`,
          },
        ]}
      />
      <Container className="main-container">
        <h2 className="precoius">{t('home-page-precious-title')}</h2>
        <Card className="card-stone">
          <Container className="container-card">
            <Row className="row-view-center">
              {preciousAllData.map(category => {
                const {
                  id,
                  category_name_fr,
                  category_name_en,
                  category_image,
                } = category;
                const title = getLocaleText(category_name_en, category_name_fr)[
                  i18next.language
                ];
                return (
                  <CategoryCard
                    onCardClick={handlePreciousCardClick(category, title)}
                    src={
                      category_image
                        ? category_image.data && category_image.data.full_url
                        : ''
                    }
                    title={title}
                    key={id}
                  />
                );
              })}
            </Row>
          </Container>
        </Card>
        <h2 className="semi-precoius">{t('home-page-semi-precious-title')}</h2>
        <Card className="card-stone">
          <Container className="container-card">
            <Row className="row-view-center">
              {semipreciousAllData.map(category => {
                const {
                  id,
                  semi_precious_type_fr,
                  semi_precious_type_en,
                  semi_precious_image,
                } = category;
                const title = getLocaleText(
                  semi_precious_type_en,
                  semi_precious_type_fr
                )[i18next.language];
                return (
                  <SemiPreciousCard
                    onCardClick={handleSemiPreciousCardClick(category, title)}
                    src={
                      semi_precious_image
                        ? semi_precious_image.data &&
                          semi_precious_image.data.full_url
                        : ''
                    }
                    title={title}
                    key={id}
                    semiPreciousId={id}
                  />
                );
              })}
            </Row>
          </Container>
        </Card>
      </Container>
    </div>
  );
}

const mapStateToProps = state => ({
  ...state.apiReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPreciousAllData,
      setSemiPreciousAllData,
      setSelectedPreciousSingleData,
      addAFilter,
      setSelectedSemiPreciousSingleData,
      setGemType,
      removeAllFilters,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
