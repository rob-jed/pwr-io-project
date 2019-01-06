import { API } from '../';

function getStoreItems() {
  return API.get('/car_list');
}

export default getStoreItems;
