import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Container,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  CustomInput,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import CustomDropdown from '../../CustomDropdown';
import { useTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { addAFilter, removeAFilter } from '../../../../actions/filterActions';
import RangeSlider from '../../RangeSlider';

function FilterFormRight(props) {
  const { t } = useTranslation();
  const {
    filterOptions,
    addAFilter,
    handleFilterOptions,
    removeAFilter,
  } = props;
  const [selectedEnhancement, setSelectedEnhancement] = useState(
    filterOptions['enhancement']?.['eq']
  );
  const [selectedSinglePair, setSelectedSinglePair] = useState(
    filterOptions['single_or_paired']?.['eq']
  );
  const [selectedAvailability, setSelectedAvailability] = useState(
    filterOptions['availability']?.['eq']
  );
  const [isCertified, setIsCertified] = useState(
    filterOptions['certificate']?.['nnull']
  );

  const [dimensions, setDimensions] = useState({
    lengthTo: undefined,
    lengthFrom: undefined,
    widthTo: undefined,
    widthFrom: undefined,
  });

  const handleDimensionsChange = e => {
    if (!isNaN(e.target.value)) {
      const { value, name } = e.target;
      setDimensions({ ...dimensions, [name]: value });
    }
  };

  const handleSearchByLengthDimensions = () => {
    let { lengthTo, lengthFrom } = dimensions;
    lengthTo = lengthTo ? lengthTo.trim() : undefined;
    lengthFrom = lengthFrom ? lengthFrom.trim() : undefined;
    let newFilter = '';

    if (lengthTo && lengthFrom) {
      newFilter = {
        length: {
          between: [lengthTo, lengthFrom],
        },
      };
    } else if (lengthTo && !lengthFrom) {
      newFilter = {
        length: {
          gt: lengthTo,
        },
      };
    } else if (!lengthTo && lengthFrom) {
      newFilter = {
        length: {
          lt: lengthFrom,
        },
      };
    }
    if (lengthTo || lengthFrom) {
      handleFilterOptions({ ...filterOptions, ...newFilter });
      addAFilter({ ...newFilter });
    }
  };

  const handleSearchByWidthDimensions = () => {
    let { widthTo, widthFrom } = dimensions;
    widthTo = widthTo ? widthTo.trim() : undefined;
    widthFrom = widthFrom ? widthFrom.trim() : undefined;
    let newFilter = '';
    if (widthTo && widthFrom) {
      newFilter = {
        width: {
          between: [widthTo, widthFrom],
        },
      };
    } else if (widthTo && !widthFrom) {
      newFilter = {
        width: {
          gt: widthTo,
        },
      };
    } else if (!widthTo && widthFrom) {
      newFilter = {
        width: {
          lt: widthFrom,
        },
      };
    }
    if (widthTo || widthFrom) {
      handleFilterOptions({ ...filterOptions, ...newFilter });
      addAFilter({ ...newFilter });
    }
  };

  const handleSearchByEnhancement = e => {
    removeAFilter('enhancement');
    if (selectedEnhancement === e.target.value) {
      handleFilterOptions({ ...filterOptions });
      setSelectedEnhancement(null);
    } else {
      const enhancementFilter = {
        enhancement: {
          eq: e.target.value,
        },
      };
      handleFilterOptions({ ...filterOptions, ...enhancementFilter });
      addAFilter({ ...enhancementFilter });
      setSelectedEnhancement(e.target.value);
    }
  };

  const handleSearchBySinglePair = e => {
    removeAFilter('single_or_paired');
    if (selectedSinglePair === e.target.value) {
      handleFilterOptions({ ...filterOptions });
      setSelectedSinglePair(null);
    } else {
      const singlePairFilter = {
        single_or_paired: {
          eq: e.target.value,
        },
      };
      handleFilterOptions({ ...filterOptions, ...singlePairFilter });
      addAFilter({ ...singlePairFilter });
      setSelectedSinglePair(e.target.value);
    }
  };

  const handleIsCertifiedSearch = e => {
    removeAFilter('certificate');
    if (isCertified === e.target.value) {
      handleFilterOptions({ ...filterOptions });
      setIsCertified(null);
    } else {
      const certifiedFilter = {
        certificate: {
          nnull: e.target.value,
        },
      };
      handleFilterOptions({ ...filterOptions, ...certifiedFilter });
      addAFilter({ ...certifiedFilter });
      setIsCertified(e.target.value);
    }
  };

  const handleSearchByAvailability = e => {
    removeAFilter('availability');
    if (selectedAvailability === e.target.value) {
      handleFilterOptions({ ...filterOptions });
      setSelectedAvailability(null);
    } else {
      const availabilityFilter = {
        availability: {
          eq: e.target.value,
        },
      };
      handleFilterOptions({ ...filterOptions, ...availabilityFilter });
      addAFilter({ ...availabilityFilter });
      setSelectedAvailability(e.target.value);
    }
  };

  return (
    <Container fluid>
      <Row className="filter-row-margin">
        <Col
          sm={12}
          md={12}
          lg={6}
          xl={12}
          className="filter-checkbox-sm-screen"
        >
          <RangeSlider handleFilterOptions={handleFilterOptions} />
        </Col>
      </Row>
      <Row className="filter-row-margin">
        <Col
          sm={12}
          md={12}
          lg={6}
          xl={12}
          className="filter-checkbox-sm-screen"
        >
          <CustomDropdown {...props} />
        </Col>
      </Row>
      <Row className="filter-row-margin">
        <Col xs={6} md={3} lg={3} xl={6} className="filter-checkbox-sm-screen">
          <FormGroup>
            <Label for="enhancementSearch">
              {t('filter-form-right-enhancement-search-label')}
            </Label>
            <div>
              <CustomInput
                type="checkbox"
                id="enhancementSearchHeat"
                name="enhancement"
                value={'Heated'}
                label={t('filter-form-right-enhancement-heated-label')}
                onChange={handleSearchByEnhancement}
                checked={selectedEnhancement === 'Heated'}
              />
              <CustomInput
                type="checkbox"
                id="enhancementSearchUnheat"
                name="enhancement"
                value={'Unheated'}
                label={t('filter-form-right-enhancement-unheated-label')}
                onChange={handleSearchByEnhancement}
                checked={selectedEnhancement === 'Unheated'}
              />
            </div>
          </FormGroup>
        </Col>
        <Col xs={6} md={3} lg={3} xl={6} className="filter-checkbox-sm-screen">
          <FormGroup>
            <Label for="singlePairSearch">
              {t('filter-form-right-single-pair-single-pair-label')}
            </Label>
            <div>
              <CustomInput
                type="checkbox"
                id="singlePairSearchSingle"
                name="availability"
                label={t('filter-form-right-single-pair-single-label')}
                value={'single'}
                onChange={handleSearchBySinglePair}
                checked={selectedSinglePair === 'single'}
              />
              <CustomInput
                type="checkbox"
                id="singlePairSearchPair"
                name="availability"
                value="pair"
                label={t('filter-form-right-single-pair-matched-label')}
                onChange={handleSearchBySinglePair}
                checked={selectedSinglePair === 'pair'}
              />
              <CustomInput
                type="checkbox"
                id="singlePairSearchLot"
                name="availability"
                value="lot"
                label={t('filter-form-right-single-pair-lot-label')}
                onChange={handleSearchBySinglePair}
                checked={selectedSinglePair === 'lot'}
              />
            </div>
          </FormGroup>
        </Col>
      </Row>
      <Row className="filter-row-margin">
        <Col className="filter-checkbox-sm-screen">
          <Label>{t('filter-form-right-dimensions-label')}</Label>
          <div className="dimension-search-length">
            <Label>{t('filter-form-right-dimensions-length-label')}</Label>
            <div className="d-flex">
              <InputGroup className="dimension-search-input-between">
                <InputGroupAddon addonType="prepend">
                  <Button>
                    {t('filter-form-right-dimensions-from-label')}
                  </Button>
                </InputGroupAddon>
                <Input
                  type="text"
                  onChange={handleDimensionsChange}
                  onBlur={handleSearchByLengthDimensions}
                  name="lengthTo"
                  value={dimensions['lengthTo']}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <Button color="secondary">
                    {t('filter-form-right-dimensions-to-label')}
                  </Button>
                </InputGroupAddon>
                <Input
                  type="text"
                  onChange={handleDimensionsChange}
                  onBlur={handleSearchByLengthDimensions}
                  name="lengthFrom"
                  value={dimensions['lengthFrom']}
                />
              </InputGroup>
            </div>
          </div>
          <>
            <Label for="enhancementSearch">
              {t('filter-form-right-dimensions-width-label')}
            </Label>
            <div className="d-flex">
              <InputGroup className="dimension-search-input-between">
                <InputGroupAddon addonType="prepend">
                  <Button>
                    {t('filter-form-right-dimensions-from-label')}
                  </Button>
                </InputGroupAddon>
                <Input
                  type="text"
                  onChange={handleDimensionsChange}
                  onBlur={handleSearchByWidthDimensions}
                  name="widthTo"
                  value={dimensions['widthTo']}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <Button color="secondary">
                    {t('filter-form-right-dimensions-to-label')}
                  </Button>
                </InputGroupAddon>
                <Input
                  type="text"
                  onChange={handleDimensionsChange}
                  onBlur={handleSearchByWidthDimensions}
                  name="widthFrom"
                  value={dimensions['widthFrom']}
                />
              </InputGroup>
            </div>
          </>
        </Col>
      </Row>
      <Row className="filter-row-margin">
        <Col
          xs={6}
          sm={4}
          md={3}
          lg={3}
          xl={6}
          className="filter-checkbox-sm-screen"
        >
          <FormGroup>
            <Label>{t('filter-form-right-certifed-search-label')}</Label>
            <CustomInput
              type="checkbox"
              id="certifySearch"
              onChange={handleIsCertifiedSearch}
              label={t('filter-form-right-certifed-search-label')}
              value={'certified'}
              checked={isCertified === 'certified'}
            />{' '}
          </FormGroup>
        </Col>
        <Col
          xs={6}
          sm={4}
          md={3}
          lg={3}
          xl={6}
          className="filter-checkbox-sm-screen"
        >
          <FormGroup>
            <Label for="AvailabilitySearch">
              {t('filter-form-right-availability-search-label')}
            </Label>
            <div>
              <CustomInput
                type="checkbox"
                id="AvailabilitySearchInouse"
                name="availability"
                label={t('filter-form-right-availability-inhouse-label')}
                value={'In House'}
                onChange={handleSearchByAvailability}
                checked={selectedAvailability === 'In House'}
              />
              <CustomInput
                type="checkbox"
                id="AvailabilitySearchOutOnMemo"
                name="availability"
                label={t('filter-form-right-availability-out-on-memo-label')}
                value={'Out On Memo'}
                onChange={handleSearchByAvailability}
                checked={selectedAvailability === 'Out On Memo'}
              />
            </div>
          </FormGroup>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = state => ({
  ...state.filterReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addAFilter,
      removeAFilter,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FilterFormRight);
