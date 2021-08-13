export default (
  state = {
    filterOptions: {},
    selectedShapeColumnIds: [],
    sortOption: {
      sort: '-total_price',
    },
  },
  action
) => {
  switch (action.type) {
    case 'ADD_A_FIILTER':
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          ...action.payload,
        },
      };
    case 'REMOVE_A_FILTER':
      if (state.filterOptions) {
        delete state.filterOptions[action.payload];
      }
      return {
        ...state,
      };
    case 'REMOVE_ALL_FILTERS':
      delete state.filterOptions;
      return {
        ...state,
        filterOptions: {},
        selectedShapeColumnIds: [],
        selectedSemiPreciousTypeId: null,
      };
    case 'SET_SORT_OPTIONS':
      return {
        ...state,
        sortOption: action.payload,
      };
    case 'ADD_OR_REMOVE_SHAPE_ID':
      if (state.selectedShapeColumnIds.includes(action.payload)) {
        state.selectedShapeColumnIds.splice(
          state.selectedShapeColumnIds.indexOf(action.payload),
          1
        );
        if (!state.selectedShapeColumnIds.length) {
          delete state.filterOptions['gem_shape.id'];
        } else {
          state.filterOptions['gem_shape.id'] = {
            in: state.selectedShapeColumnIds,
          };
        }
      } else {
        state.selectedShapeColumnIds.push(action.payload);
        state.filterOptions['gem_shape.id'] = {
          in: state.selectedShapeColumnIds,
        };
      }

      return {
        ...state,
        selectedShapeColumnIds: [...state.selectedShapeColumnIds],
        ...state.filterOptions,
      };

    case 'SET_SELECTED_SEMI_PRECIOUS_TYPE_ID':
      return {
        ...state,
        selectedSemiPreciousTypeId: action.payload,
      };

    default:
      return state;
  }
};
