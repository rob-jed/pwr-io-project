const initialState = {
  activeFilters: [],
};

function appStore(state = initialState, action) {
  switch (action.type) {
    case 'SET_ACTIVE_FILTERS':
      return Object.assign({}, state, {
        activeFilters: action.filters,
      });
    default:
      return state;
  }
};

export default appStore;
