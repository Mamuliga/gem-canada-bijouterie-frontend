import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTranslation } from 'react-i18next';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { addAFilter } from '../../actions/filterActions';
import { Label } from 'reactstrap';

const RangeSlider = props => {
  const [value, setValue] = useState([0, 50]);
  const { t } = useTranslation();
  const { addAFilter, filterOptions } = props;

  const handleOnAfterChange = () => {
    const caratWeightFilter = {
      carat_weight: {
        between: [value[0], value[1]],
      },
    };
    addAFilter({ ...caratWeightFilter });
    props.handleFilterOptions({ ...filterOptions, ...caratWeightFilter });
  };

  const handleChange = value => {
    setValue(value);
  };

  return (
    <div className="slider-container">
      <Label className="mr-sm-2">
        {t('filter-form-right-carat-weight-label')}
      </Label>
      <div className="slider-container-range">
        <Range
          defaultValue={[0, 50]}
          onChange={handleChange}
          step={0.01}
          max={50}
          onAfterChange={handleOnAfterChange}
        />
        <div className="range-slider-show-values">
          <div>
            {t('react-slider-min')}{' '}
            <h4 className="range-slider-left-align">
              {parseFloat(value[0]).toFixed(2)}
            </h4>
          </div>
          <div>
            {t('react-slider-max')}{' '}
            <h4 className="range-slider-right-align">
              {parseFloat(value[1]).toFixed(2)}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  ...state.apiReducer,
  ...state.filterReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addAFilter,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RangeSlider);
