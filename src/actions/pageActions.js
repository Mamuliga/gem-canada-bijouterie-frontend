export const setCurrentPage = payload => dispatch => {
  dispatch({
    type: 'SET_CURRENT_PAGE',
    payload,
  });
};

export const setTotalPages = payload => dispatch => {
  dispatch({
    type: 'SET_TOTAL_PAGES',
    payload,
  });
};
