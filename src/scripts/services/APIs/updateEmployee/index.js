import { API } from '../';

function updateEmployee(body) {
  return API.post('/edit_employee', body);
}

export default updateEmployee;
