import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Container, CardTitle } from 'reactstrap';
import ShapeColumn from './ShapeColumn';
import { useTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { getGemShapeDataApi } from '../../../utils/api';
import logger from '../../../utils/logger';
import { setGemShapeData } from '../../../actions/apiActions';

const GemShape = props => {
  const { t } = useTranslation();
  const { setGemShapeData, gemShapeData } = props;
  const selectedColumns = [];

  const callApi = () => {
    if (!gemShapeData) {
      getGemShapeDataApi()
        .then(res => {
          logger.info('getGemShapeDataApi', res);
          setGemShapeData(res.data);
        })
        .catch(err => {
          logger.error('getGemShapeDataApi', err);
          setGemShapeData(null);
        });
    }
  };

  useEffect(callApi, []);

  if (gemShapeData) {
    return (
      <Container className="text-center" fluid>
        <div className="shapeCard">
          <CardTitle>{t('filter-form-left-select-gem-shape')}</CardTitle>
          <Row className='row-view-center'>
            {gemShapeData.map(shape => (
              <ShapeColumn
                key={shape.id}
                shape={shape}
                {...props}
                selectedColumns={selectedColumns}
              />
            ))}
          </Row>
        </div>
      </Container>
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
      setGemShapeData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(GemShape);
