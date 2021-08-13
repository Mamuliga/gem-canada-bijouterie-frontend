import React from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import {
  getLocaleText,
  addHyphenWhenEmpty,
  // getRoundedNumber,
} from '../../../utils/helperFunctions';
import { useTranslation } from 'react-i18next';
import { CardImg, Row } from 'reactstrap';
import { Table } from 'reactstrap';
import YouTube from 'react-youtube';
import i18next from 'i18next';
import { setFromPostViewPage } from '../../../actions/apiActions';
import { bindActionCreators } from 'redux';
import Inquiry from '../../UI/Inquiry';
import Availability from '../../UI/Availability';

const PostViewPage = props => {
  const opts = {
    height: '500',
    width: '800',
  };
  const { t } = useTranslation();
  const {
    lot_number,
    carat_weight,
    gem_color,
    length,
    width,
    depth,
    gem_shape,
    certificate,
    enhancement,
    availability,
    origin,
    // total_price,
    certificate_type,
    gem_pic,
    video_url,
    no_of_pieces,
    single_or_paired,
    // price_per_carat,
    gem_variety,
    // force_price_per_carat,
    sold_out,
  } = props.location.state ? props.location.state.post : {};

  // const adjustedTotalPrice = total_price * 2;
  // const adjustedPricePerCarat = adjustedTotalPrice / carat_weight;
  const fromLotNumberSearch = props.location.state
    ? props.location.state.fromLotNumberSearch
    : null;
  const category_name_en = gem_variety?.category_name_en;
  const category_name_fr = gem_variety?.category_name_fr;

  const { push } = useHistory();

  const handleBackButtonLink = () => {
    if (fromLotNumberSearch) {
      push('/');
    } else {
      props.setFromPostViewPage(true);
      props.history.goBack();
    }
  };

  const youTubeGetID = url => {
    if (!url) {
      return undefined;
    }
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_-]/i)[0] : url[0];
  };

  if (!props.location.state) {
    return <Redirect to="/" />;
  }

  // const getPricePerCaratOrPricePerPiece = () => {
  //   if (
  //     no_of_pieces === 1 ||
  //     single_or_paired === 'paired' ||
  //     force_price_per_carat
  //   ) {
  //     return (
  //       <tr>
  //         <td>{t('Price/ct')}</td>
  //         <td>{getRoundedNumber(adjustedPricePerCarat)} CAD </td>
  //       </tr>
  //     );
  //   }

  //   return (
  //     <tr>
  //       <td>{t('Price/pcs')}</td>
  //       <td>
  //         {getRoundedNumber(
  //           parseFloat(adjustedTotalPrice / no_of_pieces).toFixed(2)
  //         )}{' '}
  //         CAD
  //       </td>
  //     </tr>
  //   );
  // };

  const getNoOfPieces = () => {
    if (no_of_pieces > 1) {
      return (
        <tr>
          <td>{t('post-detail-no-pcs')}</td>
          <td>{addHyphenWhenEmpty(no_of_pieces)}</td>
        </tr>
      );
    }
  };

  const getSinglePairNoOfPieces = () => {
    return (
      <tr>
        <td>{t('filter-form-right-single-pair-single-pair-label')}</td>
        <td>
          {single_or_paired === 'single'
            ? t('filter-form-right-single-pair-single-label')
            : single_or_paired === 'pair'
            ? t('filter-form-right-single-pair-matched-label')
            : single_or_paired === 'lot'
            ? t('filter-form-right-single-pair-lot-label')
            : addHyphenWhenEmpty(single_or_paired)}
        </td>
      </tr>
    );
  };
  return (
    <div className="main-container-post">
      <div className="post-title">
        {
          getLocaleText(category_name_en, category_name_fr)[
            i18next.languages[0]
          ]
        }
      </div>
      <div className="post-view-back-button-link">
        <button
          type="button"
          className="btn btn-link"
          onClick={handleBackButtonLink}
        >
          {fromLotNumberSearch
            ? t('post-view-page-back-to-home')
            : t('post-view-page-back-to-gallery')}
        </button>
      </div>
      <Row className="post-datail-row">
        <div className="detail-table col-sm-12 col-md-6 col-lg-6">
          <Table striped>
            <tbody>
              <tr>
                <td>{t('Lot-Number')}</td>
                <td>{addHyphenWhenEmpty(lot_number)}</td>
              </tr>
              <tr>
                <td>{t('Weight')}</td>
                <td>
                  {addHyphenWhenEmpty(parseFloat(carat_weight).toFixed(2))} CT
                </td>
              </tr>
              <tr>
                <td>{t('Gem-Color')}</td>
                <td>
                  {addHyphenWhenEmpty(
                    getLocaleText(
                      gem_color?.gem_color_en,
                      gem_color?.gem_color_fr
                    )[i18next.languages[0]]
                  )}
                </td>
              </tr>
              <tr>
                <td>{t('Gem-Shape')}</td>
                <td>
                  {addHyphenWhenEmpty(
                    getLocaleText(
                      gem_shape?.shape_name_en,
                      gem_shape?.shape_name_fr
                    )[i18next.languages[0]]
                  )}
                </td>
              </tr>
              <tr>
                <td>{t('Measurements')}</td>
                <td>
                  {addHyphenWhenEmpty(parseFloat(length).toFixed(2))} x{' '}
                  {addHyphenWhenEmpty(parseFloat(width).toFixed(2))} x{' '}
                  {addHyphenWhenEmpty(parseFloat(depth).toFixed(2))} mm
                </td>
              </tr>
              <tr>
                <td>{t('Enhancement')}</td>
                <td>
                  {enhancement === 'Heated'
                    ? t('filter-form-right-enhancement-heated-label')
                    : enhancement === 'Unheated'
                    ? t('filter-form-right-enhancement-unheated-label')
                    : addHyphenWhenEmpty(enhancement)}
                </td>
              </tr>
              {getSinglePairNoOfPieces()}
              {getNoOfPieces()}
              <tr>
                <td>{t('Availablity')}</td>
                <td>
                  <Availability
                    availability={availability}
                    sold_out={sold_out}
                  />
                </td>
              </tr>
              <tr>
                <td>{t('Origin')}</td>
                <td>
                  {origin === 'Africa'
                    ? t('filter-form-right-origin-africa-label')
                    : origin === 'Ethiopia'
                    ? t('filter-form-right-origin-ethiopia-label')
                    : addHyphenWhenEmpty(origin)}
                </td>
              </tr>
              {/* {getPricePerCaratOrPricePerPiece()}
              <tr>
                <td>{t('Total-Price')}</td>
                <td>
                  {addHyphenWhenEmpty(
                    parseFloat(adjustedTotalPrice).toFixed(2)
                  )}{' '}
                  CAD
                </td>
              </tr> */}
              <tr>
                <td>{t('Certificate-Type')}</td>
                <td>
                  {certificate_type === 'n/a' ? (
                    certificate_type
                  ) : certificate_type ? (
                    <a href={`${certificate ? certificate.data.full_url : ''}`}>
                      {certificate_type}{' '}
                    </a>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
          <Inquiry
            lotNumber={lot_number}
            label={t('post-detail-inquiry-button')}
            color="secondary"
            className="post-view-inquiry-button"
          />
        </div>
        <div className="card-image col-sm-12 col-md-6 col-lg-6">
          <div className="gem-image">
            <CardImg
              className="post-view-image"
              top
              src={gem_pic && gem_pic.data.full_url}
              alt={''}
            />
          </div>
        </div>
      </Row>
      <Row className="post-datail-row">
        <div className="col-sm-12 col-md-6 col-lg-6">
          {certificate && (
            <div className="gem-certificate-container">
              <iframe
                className="gem-certificate"
                src={certificate.data.full_url}
                title={'gem-certificate'}
              ></iframe>
            </div>
          )}
        </div>
        {youTubeGetID(video_url) && (
          <div className="col-sm-12 col-md-6 col-lg-6 gem-video">
            <YouTube
              videoId={youTubeGetID(video_url)}
              opts={opts}
              ontainerClassName={'youtubeContainer'}
            />
          </div>
        )}
      </Row>
    </div>
  );
};

const mapStateToProps = state => ({
  ...state.apiReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setFromPostViewPage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PostViewPage);
