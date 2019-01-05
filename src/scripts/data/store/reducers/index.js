const initialState = {
  activeFilters: [],
  storeItems: null,
  storeModels: null,
  isLoaderActive: false,
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
    case 'SET_STORE_MODELS':
      return Object.assign({}, state, {
        storeModels: action.models,
      });
    case 'TOGGLE_LOADER':
      return Object.assign({}, state, {
        isLoaderActive: action.state,
      });
    default:
      return state;
  }
};

export default appStore;
