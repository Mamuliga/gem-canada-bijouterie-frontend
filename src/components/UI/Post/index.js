import React from 'react';
import { connect } from 'react-redux';
import { Card, Container, Row, Col } from 'reactstrap';
import Loading from '../Loading';
import PostCard from './PostCard';
import { getLocaleText } from '../../../utils/helperFunctions';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { getFIlteredSemiPreciousPostDataApi } from '../../../utils/api';
import {
  setIsShowLoading,
  setSelectedSemiPreciousPostAllData,
} from '../../../actions/apiActions';
import logger from '../../../utils/logger';
import {
  addAFilter,
  setSelectedSemiPreciousTypeId,
  removeAFilter,
} from '../../../actions/filterActions';
import { PRECIOUS, SEMI_PRECIOUS } from '../../../utils/constant';
import { setTotalPages } from '../../../actions/pageActions';

const Post = props => {
  const {
    isShowLoading,
    preciousAllPostData,
    semiPreciousAllPostData,
    semiPreciousTypes,
    setIsShowLoading,
    setSelectedSemiPreciousPostAllData,
    setSelectedSemiPreciousTypeId,
    selectedSemiPreciousTypeId,
    addAFilter,
    filterOptions,
    sortOption,
    currentPage,
    gemType,
    setTotalPages,
    removeAFilter,
    preciousSingleData,
    semiPreciousSingleData,
  } = props;

  let allPostData = [];
  let title = '';
  if (
    gemType === PRECIOUS &&
    Array.isArray(preciousAllPostData) &&
    preciousAllPostData[0]
  ) {
    const { category_name_en, category_name_fr } = preciousSingleData;
    allPostData = preciousAllPostData;
    title = getLocaleText(category_name_en, category_name_fr)[
      i18next.language
    ];
  } else if (
    gemType === SEMI_PRECIOUS &&
    Array.isArray(semiPreciousAllPostData) &&
    semiPreciousAllPostData[0]
  ) {
    const {
      semi_precious_type_en,
      semi_precious_type_fr,
    } = semiPreciousSingleData;
    allPostData = semiPreciousAllPostData;
    title = getLocaleText(semi_precious_type_en, semi_precious_type_fr)[
      i18next.language
    ];
  }

  const getSemiPreciousData = (filterOption = filterOptions) => {
    logger.info('getFilteredGemPostDataApi');
    setIsShowLoading(true);
    getFIlteredSemiPreciousPostDataApi(filterOption, sortOption, currentPage)
      .then(res => {
        setIsShowLoading(false);
        setTotalPages(res.meta.page_count);
        setSelectedSemiPreciousPostAllData(res.data);
      })
      .catch(_err => {
        setTotalPages(null);
        setIsShowLoading(false);
        setSelectedSemiPreciousPostAllData(null);
      });
  };

  const { t } = useTranslation();

  const handleSemiPreciousLinkButtonClick = id => {
    const semiPreciousButtonClick = () => {
      let semiPreciousLinkFiter = {};
      if (selectedSemiPreciousTypeId === id) {
        removeAFilter('gem_variety.id');
        setSelectedSemiPreciousTypeId(null);
      } else {
        setSelectedSemiPreciousTypeId(id);
        semiPreciousLinkFiter = {
          'gem_variety.id': {
            eq: id,
          },
        };
        addAFilter({ ...semiPreciousLinkFiter });
      }
      getSemiPreciousData({ ...filterOptions, ...semiPreciousLinkFiter });
    };
    return semiPreciousButtonClick;
  };

  return (
    <Card className="category-view">
      <div className="post-title">{title}</div>

      {semiPreciousTypes.length > 1 ? (
        <Row className="semi-precious-buttons-container">
          {semiPreciousTypes.map(semiPreciousType => (
            <Col
              className="semi-precious-buttons"
              key={semiPreciousType.id}
              xs={12}
              md={4}
              lg={3}
            >
              <button
                className={
                  selectedSemiPreciousTypeId === semiPreciousType.id
                    ? 'btn btn-primary'
                    : 'btn btn-outline-primary'
                }
                style={{ width: '100%' }}
                onClick={handleSemiPreciousLinkButtonClick(semiPreciousType.id)}
              >
                {
                  getLocaleText(
                    semiPreciousType.category_name_en,
                    semiPreciousType.category_name_fr
                  )[i18next.language]
                }
              </button>
            </Col>
          ))}
        </Row>
      ) : null}
      {!isShowLoading ? (
        <Container className="container-post-card">
          <Row>
            {allPostData.length ? (
              allPostData.map(post => (
                <PostCard post={post} {...props} key={post.id} title={title} />
              ))
            ) : (
              <div className="post-no-products">
                {t('no-products-available')}
              </div>
            )}
          </Row>
        </Container>
      ) : (
        <Loading />
      )}
    </Card>
  );
};

const mapStateToProps = state => ({
  ...state.apiReducer,
  ...state.filterReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setIsShowLoading,
      setSelectedSemiPreciousPostAllData,
      addAFilter,
      setSelectedSemiPreciousTypeId,
      setTotalPages,
      removeAFilter,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Post);
