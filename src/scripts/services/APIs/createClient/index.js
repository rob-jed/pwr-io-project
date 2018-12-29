import { API } from '../';

function createClient(requestData) {
  return API.post('/add_person', requestData);
}

export default createClient;
