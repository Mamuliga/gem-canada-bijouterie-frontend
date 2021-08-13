import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  FormGroup,
  Label,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { sortItems } from '../../utils/filterForm';
import { bindActionCreators } from 'redux';
import { setSortOptions } from '../../actions/filterActions';

const CustomDropdown = props => {
  const { t } = useTranslation();
  const {
    setSortOptions,
    handleFilterOptions,
    filterOptions,
    sortOption,
  } = props;

  const getSelectedSortOption = () => {
    const selectedItem = sortItems.filter(item => item.key === sortOption.sort);
    return selectedItem ? selectedItem[0] : sortItems[0];
  };
  
  const [selectedItem, setSelectedItem] = useState(getSelectedSortOption());

  const handleDropdownClick = item => {
    const dropDownClick = () => {
      const symbol = item.order === 'asc' ? '' : '-';
      const sortOption = {
        sort: `${symbol}${item.value}`,
      };
      setSelectedItem(item);
      setSortOptions(sortOption);
      handleFilterOptions(filterOptions, sortOption, 1);
    };
    return dropDownClick;
  };

  return (
    <FormGroup>
      <Label for="searchByLotNumber" className="mr-sm-2">
        {t('filter-form-right-sort-label')}
      </Label>
      <UncontrolledDropdown>
        <DropdownToggle tag="a" caret>
          {t(selectedItem.label)}
        </DropdownToggle>
        <DropdownMenu>
          {sortItems.map(item => (
            <DropdownItem
              key={item.key}
              value={item.key}
              onClick={handleDropdownClick(item)}
            >
              {t(item.label)}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </FormGroup>
  );
};

const mapStateToProps = state => ({
  ...state.filterReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSortOptions,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomDropdown);
