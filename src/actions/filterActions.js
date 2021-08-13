export const addAFilter = payload => dispatch => {
  resetToFirstPage(dispatch);
  dispatch({
    type: 'ADD_A_FIILTER',
    payload,
  });
};

export const removeAFilter = payload => dispatch => {
  resetToFirstPage(dispatch);
  dispatch({
    type: 'REMOVE_A_FILTER',
    payload,
  });
};

export const removeAllFilters = () => dispatch => {
  resetToFirstPage(dispatch);
  dispatch({
    type: 'REMOVE_ALL_FILTERS',
  });
};

export const setSortOptions = payload => dispatch => {
  dispatch({
    type: 'SET_SORT_OPTIONS',
    payload,
  });
};

export const addOrRemoveShapeId = payload => dispatch => {
  resetToFirstPage(dispatch);
  dispatch({
    type: 'ADD_OR_REMOVE_SHAPE_ID',
    payload,
  });
};

export const setSelectedSemiPreciousTypeId = payload => dispatch => {
  resetToFirstPage(dispatch);
  dispatch({
    type: 'SET_SELECTED_SEMI_PRECIOUS_TYPE_ID',
    payload,
  });
};

const resetToFirstPage = dispatch => {
  dispatch({
    type: 'RESET_TO_FIRST_PAGE',
  });
};
