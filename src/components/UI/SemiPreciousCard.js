import React from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { addToSemiPreciuosList } from '../../actions/apiActions';

const SemiPreciousCard = ({ src, title, onCardClick }) => {
  const { t } = useTranslation();
  return (
    <div className="gem-column-view" id="post-view-clickable-card">
      <Card onClick={onCardClick} className="category-view">
        <div className="gem-main-card">
          <CardImg
            top
            width="100%"
            src={src}
            alt={`${title} ${t('home-image-text')}`}
          />
          <CardBody className="category-body">
            <CardTitle className="card-title">{title}</CardTitle>
          </CardBody>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state.apiReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addToSemiPreciuosList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SemiPreciousCard);
