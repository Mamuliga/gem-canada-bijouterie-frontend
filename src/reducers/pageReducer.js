export default (
  state = {
    currentPage: 1,
  },
  action
) => {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'SET_TOTAL_PAGES':
      return {
        ...state,
        totalPageCount: action.payload,
      };
    case 'RESET_TO_FIRST_PAGE':
      return {
        ...state,
        currentPage: 1,
      };
    default:
      return state;
  }
};
