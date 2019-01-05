import { API } from '../';

function createEmployee(requestData) {
  return API.post('/register', requestData);
}

export default createEmployee;
