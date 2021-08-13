export default (
  state = {
    preciousAllData: [],
    semipreciousAllData: [],
    semiPreciousList: {},
  },
  action
) => {
  switch (action.type) {
    case 'SET_PRECIOUS_ALL_DATA':
      return {
        ...state,
        preciousAllData: action.payload,
      };
    case 'SET_SEMI_PRECIOUS_ALL_DATA':
      return {
        ...state,
        semipreciousAllData: action.payload,
      };
    case 'SET_SELECTED_PRECIOUS_SINGLE_DATA':
      return {
        ...state,
        preciousSingleData: action.payload,
      };
    case 'SET_SELECTED_SEMI_PRECIOUS_SINGLE_DATA':
      return {
        ...state,
        semiPreciousSingleData: action.payload,
      };
    case 'SET_GEM_TYPE':
      return {
        ...state,
        gemType: action.payload,
      };
    case 'SET_SELECTED_PRECIOUS_ALL_POST_DATA':
      return {
        ...state,
        preciousAllPostData: action.payload,
      };
    case 'SET_SELECTED_SEMI_PRECIOUS_ALL_POST_DATA':
      return {
        ...state,
        semiPreciousAllPostData: action.payload,
      };
    case 'SET_SELECTED_PRECIOUS_POST_SINGLE_DATA':
      return {
        ...state,
        preciousPostSingleData: action.payload,
      };
    case 'SET_EVENTS_DATA':
      return {
        ...state,
        eventsData: action.payload,
      };
    case 'SET_CONTACT_US_DATA':
      return {
        ...state,
        contactUsData: action.payload,
      };
    case 'SET_GEM_SHAPE_DATA':
      return {
        ...state,
        gemShapeData: action.payload,
      };
    case 'SET_GEM_COLOR_DATA':
      return {
        ...state,
        gemColorData: action.payload,
      };
    case 'SET_IS_SHOW_LOADING':
      return {
        ...state,
        isShowLoading: action.payload,
      };
    case 'ADD_TO_SEMI_PRECIOUS_LIST':
      return {
        ...state,
        semiPreciousList: {
          [action.payload.key]: action.payload.value,
          ...state.semiPreciousList,
        },
      };
    case 'SET_FROM_POST_VIEW_PAGE':
      return {
        ...state,
        fromPostViewPage: action.payload,
      };
    default:
      return state;
  }
};
