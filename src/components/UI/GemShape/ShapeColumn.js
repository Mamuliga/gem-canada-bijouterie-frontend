import React from 'react';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import i18next from 'i18next';
import { bindActionCreators } from 'redux';
import { addOrRemoveShapeId } from '../../../actions/filterActions';
import { getLocaleText } from '../../../utils/helperFunctions';

const ShapeColumn = props => {
  const {
    shape,
    filterOptions,
    handleFilterOptions,
    selectedShapeColumnIds,
    addOrRemoveShapeId,
  } = props;
  const { id, shape_name_en, shape_name_fr, image } = shape;
  const shapeFilter = {
    'gem_shape.id': {
      in: selectedShapeColumnIds,
    },
  };

  const filter = () => {
    addOrRemoveShapeId(id);
    handleFilterOptions({ ...filterOptions, ...shapeFilter }, undefined, 1);
  };

  if (!image) {
    return null;
  }

  return (
    <Col
      xs={3}
      sm={2}
      lg={2}
      xl={6}
      key={id}
      className={
        selectedShapeColumnIds.includes(id)
          ? 'clickable-card--active'
          : 'clickable-card'
      }
      onClick={filter}
    >
      <div>
        <img
          className="shape-img-size"
          src={image ? image.data && image.data.full_url : ''}
          alt={shape_name_en}
        />
        <div>
          {getLocaleText(shape_name_en, shape_name_fr)[i18next.language]}
        </div>
      </div>
    </Col>
  );
};

const mapStateToProps = state => ({
  ...state.filterReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addOrRemoveShapeId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShapeColumn);
