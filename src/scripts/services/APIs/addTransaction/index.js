import { API } from '../';

function addTransaction(requestData) {
  return API.post('/add_transaction', requestData);
}

export default addTransaction;
