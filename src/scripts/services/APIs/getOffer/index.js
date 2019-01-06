import { API } from '../';

function getOffer(id) {
  return API.get(`/get_car/${id}`);
}

export default getOffer;
