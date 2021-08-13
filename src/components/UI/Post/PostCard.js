import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardImg, Col, Tooltip } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { setSelectedPreciousPostSingleData } from '../../../actions/apiActions';
import { bindActionCreators } from 'redux';
import {
  addHyphenWhenEmpty,
  // getRoundedNumber,
} from '../../../utils/helperFunctions';
import Inquiry from '../Inquiry';

const PostCard = props => {
  const { setSelectedPreciousPostSingleData, post, title } = props;
  const {
    length,
    width,
    depth,
    carat_weight,
    // total_price,
    gem_pic,
    sold_out,
    id,
    // no_of_pieces,
    // single_or_paired,
    // price_per_carat,
    lot_number,
    // force_price_per_carat,
  } = post;

  const { push } = useHistory();
  const { t } = useTranslation();

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  // const adjustedTotalPrice = total_price * 2;
  // const adjustedPricePerCarat = adjustedTotalPrice / carat_weight;

  const handleCardClick = () => {
    const pushToPage = () => {
      setSelectedPreciousPostSingleData(post);
      push({
        pathname: `/category/${title}/${lot_number}`,
        state: { post },
      });
    };
    return pushToPage;
  };

  if (post) {
    // const getPricePerCtOrPricePerPcs = () => {
    //   if (
    //     no_of_pieces === 1 ||
    //     single_or_paired === 'paired' ||
    //     force_price_per_carat
    //   ) {
    //     return (
    //       <>
    //         <div className="post-detail-key">{t('post-price-ct')}</div>
    //         <div className="post-detail-value">
    //           {getRoundedNumber(adjustedPricePerCarat)} CAD
    //         </div>
    //       </>
    //     );
    //   }

    //   return (
    //     <>
    //       <div className="post-detail-key">{t('post-price-pcs')}</div>
    //       <div className="post-detail-value">
    //         {getRoundedNumber(
    //           parseFloat(adjustedTotalPrice / no_of_pieces).toFixed(2)
    //         )}{' '}
    //         CAD
    //       </div>
    //     </>
    //   );
    // };

    return (
      <Col xs={12} sm={3} md={4} lg={3} xl={3} id="post-view-clickable-card">
        <Card onClick={handleCardClick()} className="post-view">
          <div className="post-card">
            <div className="post-card-image-container">
              <Tooltip
                placement="top"
                isOpen={tooltipOpen}
                target={`postToolTip${id}`}
                toggle={toggle}
              >
                {t('post-card-tool-tip-text')}
              </Tooltip>
              <CardImg
                top
                width="100%"
                src={gem_pic && gem_pic.data.full_url}
                alt={''}
                id={`postToolTip${id}`}
              />
              {sold_out && (
                <div className="post-sold-out">{t('post-card-sold-out')}</div>
              )}
            </div>
            <div className="post-card-detail-container">
              <div>
                <div className="post-detail-key">{t('post-carat_weight')}</div>
                <div className="post-detail-value">
                  {addHyphenWhenEmpty(parseFloat(carat_weight).toFixed(2))}{' '}
                  {t('post-CT')}
                </div>
              </div>
              <div>
                <div className="post-detail-key">{t('post-dimensions')}</div>
                <div className="post-detail-value">
                  {addHyphenWhenEmpty(parseFloat(length).toFixed(2))}x
                  {addHyphenWhenEmpty(parseFloat(width).toFixed(2))}x
                  {addHyphenWhenEmpty(parseFloat(depth).toFixed(2))} mm
                </div>
              </div>
              {/* {getPricePerCtOrPricePerPcs()} */}
              {/* <div>
                <div className="post-detail-key">{t('post-total-price')}</div>
                <div className="post-detail-value">
                  {addHyphenWhenEmpty(parseFloat(adjustedTotalPrice).toFixed(2))} CAD
                </div>
              </div> */}
              <div>
                <div>
                  <Inquiry
                    lotNumber={lot_number}
                    label="Inquiry"
                    className="post-card-inquiry-button"
                    color="primary"
                    hideChatIcon
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Col>
    );
  }
  return null;
};

const mapStateToProps = state => ({
  ...state.apiReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSelectedPreciousPostSingleData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
