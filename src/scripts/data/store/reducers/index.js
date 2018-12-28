const initialState = {
  activeFilters: [],
  storeItems: null,
};

function appStore(state = initialState, action) {
  switch (action.type) {
    case 'SET_ACTIVE_FILTERS':
      return Object.assign({}, state, {
        activeFilters: action.filters,
      });
    case 'SET_STORE_ITEMS':
      return Object.assign({}, state, {
        storeItems: action.items,
      });
    default:
      return state;
  }
};

export default appStore;
