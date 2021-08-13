import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import Post from '../../UI/Post/index';
import FilterFormLeft from '../../UI/FilterForms/FilterFormLeft/index';
import FilterFormRight from '../../UI/FilterForms/FilterFormRight/index';
import {
  getFilteredGemPostDataApi,
  getSemiPreciousListCategoryDataApi,
} from '../../../utils/api';
import logger from '../../../utils/logger';
import { bindActionCreators } from 'redux';
import {
  setSelectedPreciousPostAllData,
  setIsShowLoading,
  setSelectedSemiPreciousSingleData,
  setSelectedSemiPreciousPostAllData,
  addToSemiPreciuosList,
  setFromPostViewPage,
} from '../../../actions/apiActions';
import { PRECIOUS, SEMI_PRECIOUS, META_DATA } from '../../../utils/constant';
import { setTotalPages, setCurrentPage } from '../../../actions/pageActions';
import { getLocaleText } from '../../../utils/helperFunctions';
import i18next from 'i18next';
import { Helmet } from 'react-helmet';

function CategoryDetailPage(props) {
  const {
    setSelectedPreciousPostAllData,
    setSelectedSemiPreciousSingleData,
    isShowLoading,
    setIsShowLoading,
    setSelectedSemiPreciousPostAllData,
    semiPreciousList,
    addToSemiPreciuosList,
    totalPageCount,
    currentPage,
    filterOptions,
    sortOption,
    setTotalPages,
    setCurrentPage,
    setFromPostViewPage,
    fromPostViewPage,
    preciousSingleData,
    semiPreciousSingleData,
    gemType,
  } = props;

  let id;
  let title;
  let semiPreciousTypes = [];
  const categoryName = decodeURI(props.match.params.categoryName).trim();
  const metaData = META_DATA.filter(category => category.name === `${categoryName}${i18next.language === 'fr' ? '-fr': ''}`)[0] || {};

  if (gemType === PRECIOUS && preciousSingleData) {
    const {
      id: preciousId,
      category_name_en,
      category_name_fr,
    } = preciousSingleData;
    id = preciousId;
    title = getLocaleText(category_name_en, category_name_fr)[i18next.language];
  } else if (semiPreciousSingleData) {
    const {
      id: semiPreciousId,
      semi_precious_type_en,
      semi_precious_type_fr,
    } = semiPreciousSingleData;
    id = semiPreciousId;
    title = getLocaleText(semi_precious_type_en, semi_precious_type_fr)[
      i18next.language
    ];
    semiPreciousTypes = (semiPreciousList && semiPreciousList[id]) || [];
  }

  const handlePaginationClick = ({ selected }) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleFilterOptions(filterOptions, sortOption, selected + 1);
  };

  const callSemiListApi = () => {
    if (gemType === SEMI_PRECIOUS && !semiPreciousList[id]) {
      getSemiPreciousListCategoryDataApi(id)
        .then(res => {
          logger.info('getSemiPreciousListCategoryDataApi', res);
          addToSemiPreciuosList(id, res.data);
        })
        .catch(err => {
          logger.error('getSemiPreciousListCategoryDataApi', err);
          addToSemiPreciuosList('', '');
        });
    }
  };

  const handleFilterOptions = (
    filterOpt = filterOptions,
    sortOpt = sortOption,
    curPage = currentPage
  ) => {
    if (!fromPostViewPage) {
      setIsShowLoading(true);
      setCurrentPage(curPage);
      getFilteredGemPostDataApi(filterOpt, sortOpt, gemType, curPage)
        .then(res => {
          logger.info('getFilteredGemPostDataApi handle filter options', res);
          setIsShowLoading(false);
          const respData = [];
          res.data.forEach(data => {
            respData.push(data);
          });
          if (gemType === PRECIOUS) {
            setTotalPages(res.meta.page_count);
            setSelectedPreciousPostAllData(res.data);
          } else {
            setTotalPages(res.meta.page_count);
            setSelectedSemiPreciousPostAllData(res.data);
          }
        })
        .catch(err => {
          logger.error('getFilteredGemPostDataApiError', err);
          setIsShowLoading(false);
          setSelectedPreciousPostAllData(null);
          setSelectedSemiPreciousSingleData(null);
          setTotalPages(0);
        });
    } else {
      setFromPostViewPage(false);
    }
  };

  useEffect(handleFilterOptions, []);
  useEffect(callSemiListApi, []);

  if (!props.location.state) {
    return <Redirect to="/" />;
  }

  if (props.location.state.title !== title) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Helmet 
        title={`${metaData.name} - Bijouterie Joyaux - Natural Gems, Precious, Semi Precious Stones`} 
        meta={[
          {
            name: 'keywords',
            content: metaData.keywords,
          },
          {
            name: 'description',
            content: metaData.description,
          },
        ]}
      />
      <Row>
        <Col
          className="order-sm-1 order-md-1 order-lg-1 order-xl-1"
          sm={12}
          md={12}
          lg={12}
          xl={2}
        >
          <FilterFormLeft
            {...props}
            categoryId={id}
            handleFilterOptions={handleFilterOptions}
          />
        </Col>
        <Col
          className="order-sm-2 order-md-2 order-lg-2 order-xl-3"
          sm={12}
          md={12}
          lg={12}
          xl={3}
        >
          <FilterFormRight
            {...props}
            categoryId={id}
            handleFilterOptions={handleFilterOptions}
          />
        </Col>
        <Col
          className="order-sm-3 order-md-3 order-lg-3 order-xl-2"
          sm={12}
          md={12}
          lg={12}
          xl={7}
        >
          <Post
            {...props}
            loading={isShowLoading}
            semiPreciousTypes={semiPreciousTypes}
            title={title}
          />
        </Col>
      </Row>
      <div className="category-detail-pagination-container">
        {totalPageCount > 1 && (
          <nav>
            <ReactPaginate
              previousClassName={'pagination-previous-next-hide'}
              nextClassName={'pagination-previous-next-hide'}
              breakLabel={'...'}
              breakClassName={'pagination-break'}
              pageCount={totalPageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePaginationClick}
              containerClassName={'pagination'}
              pageClassName={'pagination-button'}
              activeClassName={'pagination-button--active'}
              initialPage={currentPage - 1}
              forcePage={currentPage - 1}
              disableInitialCallback
            />
          </nav>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  ...state.apiReducer,
  ...state.filterReducer,
  ...state.pageReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSelectedPreciousPostAllData,
      setIsShowLoading,
      setSelectedSemiPreciousSingleData,
      setSelectedSemiPreciousPostAllData,
      addToSemiPreciuosList,
      setTotalPages,
      setCurrentPage,
      setFromPostViewPage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailPage);
