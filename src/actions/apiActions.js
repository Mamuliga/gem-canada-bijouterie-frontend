export const setPreciousAllData = payload => dispatch => {
  dispatch({
    type: 'SET_PRECIOUS_ALL_DATA',
    payload,
  });
};
export const setSemiPreciousAllData = payload => dispatch => {
  dispatch({
    type: 'SET_SEMI_PRECIOUS_ALL_DATA',
    payload,
  });
};

export const setSelectedPreciousSingleData = payload => dispatch => {
  dispatch({
    type: 'SET_SELECTED_PRECIOUS_SINGLE_DATA',
    payload,
  });
};

export const setSelectedSemiPreciousSingleData = payload => dispatch => {
  dispatch({
    type: 'SET_SELECTED_SEMI_PRECIOUS_SINGLE_DATA',
    payload,
  });
};
export const setGemType = payload => dispatch => {
  dispatch({
    type: 'SET_GEM_TYPE',
    payload,
  });
};

export const setSelectedPreciousPostAllData = payload => dispatch => {
  dispatch({
    type: 'SET_SELECTED_PRECIOUS_ALL_POST_DATA',
    payload,
  });
};

export const setSelectedSemiPreciousPostAllData = payload => dispatch => {
  dispatch({
    type: 'SET_SELECTED_SEMI_PRECIOUS_ALL_POST_DATA',
    payload,
  });
};

export const setSelectedPreciousPostSingleData = payload => dispatch => {
  dispatch({
    type: 'SET_SELECTED_PRECIOUS_POST_SINGLE_DATA',
    payload,
  });
};

export const setEventsData = payload => dispatch => {
  dispatch({
    type: 'SET_EVENTS_DATA',
    payload,
  });
};

export const setContactUsData = payload => dispatch => {
  dispatch({
    type: 'SET_CONTACT_US_DATA',
    payload,
  });
};

export const setGemShapeData = payload => dispatch => {
  dispatch({
    type: 'SET_GEM_SHAPE_DATA',
    payload,
  });
};

export const setGemColorData = payload => dispatch => {
  dispatch({
    type: 'SET_GEM_COLOR_DATA',
    payload,
  });
};

export const setIsShowLoading = payload => dispatch => {
  dispatch({
    type: 'SET_IS_SHOW_LOADING',
    payload,
  });
};

export const addToSemiPreciuosList = (key, value) => dispatch => {
  dispatch({
    type: 'ADD_TO_SEMI_PRECIOUS_LIST',
    payload: { key, value },
  });
};

export const setFromPostViewPage = payload => dispatch => {
  dispatch({
    type: 'SET_FROM_POST_VIEW_PAGE',
    payload,
  });
};
