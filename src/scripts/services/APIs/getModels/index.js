import { API } from '../';

function getModels() {
  return API.get('/models');
}

export default getModels;
