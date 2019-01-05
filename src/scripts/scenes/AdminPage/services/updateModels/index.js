import store from 'data/store';
import { setStoreModels } from 'data/store/actions';
import { getModels } from 'services/APIs';

function updateModels() {
  const { dispatch } = store;

  getModels()
    .then((response) => {
      if (!response || response.error) {
        return;
      }

      dispatch(setStoreModels(response));
    });
}

export default updateModels;
